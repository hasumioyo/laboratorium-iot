import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/inventaris.css"


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

const Inventaris = () => {
    const navigate = useNavigate();
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); 

    const user = sessionStorage.getItem("user");
    const dataUser = user ? JSON.parse(user) : null;

    const [inventaris, setInventaris] = useState<dataInventaris[]>([]);
    useEffect(() => {

        fetch("http://localhost:3000/api/inventaris").then((response) => response.json()).then((data) => {setInventaris(data);
            }).catch((error) => {console.error(error);
            });
    }, []);

    const handleDelete = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:3000/api/inventaris/${id}`,
            {
                method: "DELETE",
            }
        );
        const data = await response.json();
        if (response.ok) {

                setInventaris(
                    inventaris.filter(
                        (barang) => barang.id !== id
                    )
                );

                setMessage(data.message);
                setMessageType("success");

            } else {

                setMessage(data.message);
                setMessageType("danger");

            }
    } catch (error) {
        console.error(error);

    }
};

    return (
        <>
        <div className="inventaris-content">
            <header className="inventaris-header">
                <h1>Manajemen Inventaris</h1>
                <span>
                        {dataUser?.username || "User"}
                    </span>
            </header>
        <section className="inventaris-body">
            <div className="inventaris-title">
                <h2>Data Barang</h2>
                <button className="tambah-button" onClick={() => navigate("/inventaris/tambah")}>
                    + Tambah Barang
                </button>
            </div>
            {message && (
                        <div
                            className={`alert alert-${messageType}`}
                            role="alert"
                        >
                            {message}
                        </div>
            )}
            <div className="table-container">
                <table className="inventaris-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Barang</th>
                            <th>Kategori</th>
                            <th>Jumlah</th>
                            <th>Kondisi</th>
                            <th>Lokasi</th>
                            <th>Tanggal Masuk</th>
                            <th>Petugas</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventaris.map((barang, index) => (
                            <tr key={barang.id}>
                                <td>{index + 1}</td>
                                <td>{barang.nama_barang}</td>
                                <td>{barang.kategori}</td>
                                <td>{barang.jumlah}</td>
                                <td>{barang.kondisi}</td>
                                <td>{barang.lokasi}</td>
                                <td>
                                    {new Date(barang.tanggal_masuk)
                                        .toLocaleDateString("id-ID")
                                        .replaceAll("/", "-")}
                                </td>
                                <td>{barang.petugas}</td>
                                <td>
                                    <button className="edit-button" onClick={() => navigate(`/inventaris/edit/${barang.id}`)}>Edit</button>
                                   <button className="delete-button" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setDeleteId(barang.id)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </section>
                    <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="deleteModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="deleteModalLabel">Konfirmasi Hapus</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body text-center">
                                    <i className="fas fa-trash text-danger fs-2 mb-3"></i>
                                    <h5>Yakin ingin menghapus data ini?</h5>
                                    <p className="text-muted mb-0">
                                        Data yang sudah dihapus tidak dapat
                                        dikembalikan.
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => {
                                            if (deleteId !== null) {
                                                handleDelete(deleteId);
                                            }
                                        }}
                                    >
                                        Hapus
                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>
            <footer className="inventaris-footer">
                Sistem Manajemen Inventaris Laboratorium IOT
            </footer>
        </div>
        </>
    )
}

export default Inventaris;