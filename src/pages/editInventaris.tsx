import React, { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import "../css/editInventaris.css"

const EditInventaris = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); 
    
    const [nama_barang, setNamaBarang] = useState("");
    const [kategori, setKategori] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [kondisi, setKondisi] = useState("");
    const [lokasi, setLokasi] = useState("");
    const [tanggal_masuk, setTanggalMasuk] = useState("");
    const [petugas, setPetugas] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/api/inventaris/${id}`).then((response) => response.json()).then((data) => {
            setNamaBarang(data.nama_barang);
            setKategori(data.kategori);
            setJumlah(String(data.jumlah));
            setKondisi(data.kondisi);
            setLokasi(data.lokasi);
            setTanggalMasuk(data.tanggal_masuk.slice(0,10));
            setPetugas(data.petugas);
        })
        .catch((error) => {
            console.error(error)
        })
    }, [id]);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/inventaris/${id}`, 
            {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    nama_barang, kategori, jumlah: Number(jumlah), kondisi, lokasi, tanggal_masuk, petugas
                }),
            }
        );
        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Data:", data);
        
        if(response.ok) {
            setMessage(data.message);
            setMessageType("success");
            setTimeout(() => {
                navigate("/inventaris");
            }, 1500)
        } else {
            setMessage(data.message);
            setMessageType("danger");
        };
    }
    return (
        <div className="edit-content">

            <header className="edit-header">
                <h1>Edit Barang</h1>
                <span>
                    Edit Data Inventaris Laboratorium IOT
                </span>
            </header>

            <section className="edit-body">

                <div className="edit-form-container">

                    <div className="edit-form-title">
                        <h2>Form Edit Barang</h2>
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
                        <div className="edit-form-group">
                            <label>Nama Barang</label>
                            <input type="text" value={nama_barang} onChange={(e) => setNamaBarang(e.target.value)} required/>
                        </div>
                        <div className="edit-form-group">
                            <label>Kategori</label>
                            <select value={kategori} onChange={(e) => setKategori(e.target.value)} required>
                                <option value="">Pilih Kategori</option>
                                <option value="Mikrokontroler">Mikrokontroler</option>
                                <option value="Sensor">Sensor</option>
                                <option value="Aktuator">Aktuator</option>
                            </select>
                        </div>
                        <div className="edit-form-group">
                            <label>Jumlah</label>
                            <input type="number" min="1" value={jumlah} onChange={(e) => setJumlah(e.target.value)} required/>
                        </div>
                        <div className="edit-form-group">
                            <label>Kondisi</label>
                            <select value={kondisi} onChange={(e) => setKondisi(e.target.value)} required>
                                <option value="">Pilih Kondisi</option>
                                <option value="Baik">Baik</option>
                                <option value="Tidak Baik">Tidak Baik</option>
                            </select>
                        </div>
                        <div className="edit-form-group">
                            <label>Lokasi</label>
                            <input type="text" value={lokasi} onChange={(e) => setLokasi(e.target.value)} required/>
                        </div>
                        <div className="edit-form-group">
                            <label>Tanggal Masuk</label>
                            <input type="date" value={tanggal_masuk} onChange={(e) => setTanggalMasuk(e.target.value)} required/>
                        </div>
                        <div className="edit-form-group">
                            <label>Petugas</label>
                            <input type="text" value={petugas} onChange={(e) => setPetugas(e.target.value)} required/>
                        </div>

                        <div className="edit-form-action">
                            <button type="button" className="edit-batal-button" onClick={() => navigate("/inventaris")}>
                                Batal
                            </button>
                            <button type="submit" className="edit-simpan-button">Simpan Perubahan</button>
                        </div>
                    </form>
                </div>
            </section>
            <footer className="edit-footer">
                Sistem Manajemen Inventaris Laboratorium IOT
            </footer>

        </div>
    )
}

export default EditInventaris;