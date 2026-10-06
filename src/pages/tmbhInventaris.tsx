import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TambahInventaris = () => {
    const navigate = useNavigate();

    const [nama_barang, setNamaBarang] = useState("");
    const [kategori, setKategori] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [kondisi, setKondisi] = useState("");
    const [lokasi, setLokasi] = useState("");
    const [tanggal_masuk, setTanggalMasuk] = useState("");
    const [petugas, setPetugas] = useState("");

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/inventaris", 
            {
                method: "POST",
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
            alert(data.message);
            navigate("/inventaris");
        } else {
            alert(data.message);
        };
    }

    return (
        <section>
            <h1>Tambah Barang</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nama Barang</label>
                    <input type="text"  value={nama_barang} onChange={(e) => setNamaBarang(e.target.value)} required/>
                </div>
                <div>
                    <label>Kategori</label>
                    <select value={kategori} onChange={(e) => setKategori(e.target.value)} required>
                        <option value="">Pilih Kategori</option>
                        <option value="Mikrokontroler">Mikrokontroler</option>
                        <option value="Sensor">Sensor</option>
                        <option value="Akuator">Akuator</option>
                    </select>
                </div>
                <div>
                    <label>Jumlah</label>
                    <input type="number"  value={jumlah} onChange={(e) => setJumlah(e.target.value)} required/>
                </div>
                <div>
                    <label>Kondisi</label>
                    <select value={kondisi} onChange={(e) => setKondisi(e.target.value)} required>
                        <option value="">Pilih Kondisi</option>
                        <option value="Baik">Baik</option>
                        <option value="Tidak Baik">Tidak Baik</option>
                    </select>
                </div>
                <div>
                    <label>Lokasi</label>
                    <input type="text"  value={lokasi} onChange={(e) => setLokasi(e.target.value)} required/>
                </div>
                <div>
                    <label>Tanggal Masuk</label>
                    <input type="date"  value={tanggal_masuk} onChange={(e) => setTanggalMasuk(e.target.value)} required/>
                </div>
                <div>
                    <label>Petugas</label>
                    <input type="text"  value={petugas} onChange={(e) => setPetugas(e.target.value)} required/>
                </div>
                <button type="submit">Simpan</button>
            </form>
        </section>
    )
}

export default TambahInventaris;