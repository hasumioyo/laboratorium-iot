import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";

interface dataInventaris {
    id: number;
    nama_barang: string;
    kategori: string;
    jumlah: number;
    kondisi: string;
    lokasi: string;
    tanggal_masuk: string;
    petugas: string;
}

const Dashboard = () => {
    const navigate = useNavigate();

    const [inventaris, setInventaris] = useState<dataInventaris[]>([]);

    const user = sessionStorage.getItem("user");
    const dataUser = user ? JSON.parse(user) : null;

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }

        fetch("http://localhost:3000/api/inventaris")
            .then((response) => response.json())
            .then((data) => {
                setInventaris(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [navigate, user]);

    const totalBarang = inventaris.reduce(
        (total, barang) => total + barang.jumlah,
        0
    );

    const baikBarang = inventaris
        .filter((barang) => barang.kondisi === "Baik")
        .reduce(
            (total, barang) => total + barang.jumlah,
            0
        );

    const tidakbaikBarang = inventaris
        .filter((barang) => barang.kondisi === "Tidak Baik")
        .reduce(
            (total, barang) => total + barang.jumlah,
            0
        );

    const jenisJumlahBarang = inventaris.length;

    // Barang dengan jumlah 3 atau kurang
    const barangSedikit = inventaris.filter(
        (barang) => barang.jumlah <= 3
    );

    return (
        <section className="dashboard-container">
            <main className="dashboard-content">
                <header className="dashboard-header">
                    <h1>Dashboard</h1>
                    <span>
                        {dataUser?.username || "User"}
                    </span>
                </header>
                <section className="dashboard-body">
                    <h2>Ringkasan Inventaris</h2>
                    <div className="card-container">
                        <div className="dashboard-card blue">
                            <p>Total Barang</p>
                            <h3>{totalBarang}</h3>
                        </div>
                        <div className="dashboard-card green">
                            <p>Barang Kondisi Baik</p>
                            <h3>{baikBarang}</h3>
                        </div>
                        <div className="dashboard-card red">
                            <p>Barang Tidak Baik</p>
                            <h3>{tidakbaikBarang}</h3>
                        </div>
                        <div className="dashboard-card cyan">
                            <p>Jenis Barang</p>
                            <h3>{jenisJumlahBarang}</h3>
                        </div>
                    </div>
                    <section className="stok-section">
                        <div className="stok-header">
                            <h2>Barang dengan Stok Sedikit</h2>
                            <button onClick={() => navigate("/inventaris")}>Lihat Semua</button>
                        </div>
                        {barangSedikit.length === 0 ? (
                            <div className="stok-empty">Semua stok barang masih mencukupi.</div>
                        ) : (
                            <div className="stok-list">
                                {barangSedikit.map(
                                    (barang) => (
                                        <div className="stok-item" key={barang.id}>
                                            <div className="stok-info">
                                                <h3>{barang.nama_barang}</h3>
                                                <p>{barang.kategori}{" • "}{barang.lokasi}</p>
                                            </div>
                                            <div className="stok-jumlah">
                                                <span>{barang.jumlah}</span>
                                                <small>unit tersisa</small>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </section>
                </section>
                <footer className="dashboard-footer">
                    Sistem Manajemen Inventaris Laboratorium IOT
                </footer>

            </main>

        </section>
    );
};

export default Dashboard;