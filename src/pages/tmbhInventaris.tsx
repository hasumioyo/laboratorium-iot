import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/tmbhInventaris.css";

const TambahInventaris = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const user = sessionStorage.getItem("user");
    const dataUser = user ? JSON.parse(user) : null;

    const [nama_barang, setNamaBarang] = useState("");
    const [kategori, setKategori] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [kondisi, setKondisi] = useState("");
    const [lokasi, setLokasi] = useState("");
    const [tanggal_masuk, setTanggalMasuk] = useState("");
    const [petugas, setPetugas] = useState("");

    const [daftarPetugas, setDaftarPetugas] = useState<
        {
            id: string;
            username: string;
            level: string;
        }[]
    >([]);

    // Ambil daftar Petugas
    useEffect(() => {
        fetch("http://localhost:3000/api/admin")
            .then((response) => response.json())
            .then((data) => {
                const petugas = data.filter(
                    (user: {
                        id: string;
                        username: string;
                        level: string;
                    }) => user.level === "Petugas"
                );

                setDaftarPetugas(petugas);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:3000/api/inventaris",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nama_barang,
                        kategori,
                        jumlah: Number(jumlah),
                        kondisi,
                        lokasi,
                        tanggal_masuk,
                        petugas,
                    }),
                }
            );

            const data = await response.json();

            console.log("Status:", response.status);
            console.log("Data:", data);

            if (response.ok) {
                setMessage(data.message);
                setMessageType("success");

                setTimeout(() => {
                    navigate("/inventaris");
                }, 1500);
            } else {
                setMessage(data.message);
                setMessageType("danger");
            }
        } catch (error) {
            console.error(error);

            setMessage("Tidak dapat terhubung ke server");
            setMessageType("danger");
        }
    };

    return (
        <div className="tambah-content">

            <header className="tambah-header">
                <h1>Tambah Barang</h1>

                <span>
                    {dataUser?.username || "User"}
                </span>
            </header>

            <section className="tambah-body">

                <div className="form-container">

                    <div className="form-title">
                        <h2>Form Tambah Barang</h2>
                    </div>

                    {message && (
                        <div
                            className={`alert alert-${messageType}`}
                            role="alert"
                        >
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nama Barang</label>
                            <input type="text" value={nama_barang} onChange={(e) => setNamaBarang(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label>Kategori</label>
                            <select value={kategori} onChange={(e) => setKategori(e.target.value)} required>
                                <option value="">Pilih Kategori</option>
                                <option value="Mikrokontroler">Mikrokontroler</option>
                                <option value="Sensor">Sensor</option>
                                <option value="Aktuator">Aktuator</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Jumlah</label>
                            <input type="number" min="1" value={jumlah} onChange={(e) => setJumlah(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label>Kondisi</label>
                            <select value={kondisi} onChange={(e) => setKondisi(e.target.value)} required>
                                <option value=""> Pilih Kondisi</option>
                                <option value="Baik">Baik</option>
                                <option value="Tidak Baik">Tidak Baik</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Lokasi</label>
                            <select value={lokasi} onChange={(e) => setLokasi(e.target.value)}required>
                                <option value="">Pilih Lokasi</option>
                                <option value="Ruang Praktikum">Ruang Praktikum</option>
                                <option value="Laboratorium IoT 1">Laboratorium IoT 1</option>
                                <option value="Laboratorium IoT 2">Laboratorium IoT 2</option>
                                <option value="Gudang Peralatan">Gudang Peralatan</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tanggal Masuk</label>
                            <input type="date"value={tanggal_masuk}onChange={(e) =>setTanggalMasuk(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label>Petugas</label>
                            <select value={petugas}onChange={(e) => setPetugas(e.target.value)} required>
                                <option value=""> Pilih Petugas</option>
                                {daftarPetugas.map((user) => (
                                    <option
                                        key={user.id}
                                        value={user.id}
                                    >
                                        {user.username}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-action">
                            <button type="button" className="batal-button"onClick={() =>navigate("/inventaris")}>Batal</button>
                            <button type="submit" className="simpan-button">Simpan </button>
                        </div>
                    </form>
                </div>
            </section>
            <footer className="tambah-footer">
                Sistem Manajemen Inventaris Laboratorium IOT
            </footer>
        </div>
    );
};

export default TambahInventaris;