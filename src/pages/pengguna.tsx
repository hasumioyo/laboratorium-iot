import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/pengguna.css";

interface dataPengguna {
    id: number;
    username: string;
    level: string;
}

const Pengguna = () => {
    const navigate = useNavigate();

    const [pengguna, setPengguna] = useState<dataPengguna[]>([]);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const user = sessionStorage.getItem("user");
    const dataUser = user ? JSON.parse(user) : null;

    useEffect(() => {

        fetch("http://localhost:3000/api/admin")
            .then((response) => response.json())
            .then((data) => {
                setPengguna(data);
            })
            .catch((error) => {
                console.error(error);
                setMessage("Gagal mengambil data pengguna");
                setMessageType("danger");
            });

    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/admin/${id}`,
                {
                    method: "DELETE"
                }
            );
            const data = await response.json();
            if (response.ok) {
                setPengguna(
                    pengguna.filter(
                        (user) => user.id !== id
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
            setMessage(
                "Terjadi kesalahan saat menghapus pengguna"
            );
            setMessageType("danger");
        }
    };

    return (
        <div className="pengguna-content">
            <header className="pengguna-header">
                <div>
                    <h1>Manajemen Pengguna</h1>
                </div>
                     <span>
                        {dataUser?.username || "User"}
                    </span>
            </header>
            <section className="pengguna-body">
                <div className="pengguna-title">
                    <h2>Data Pengguna</h2>
                    <button className="tambah-button" onClick={() => navigate("/pengguna/tambah")}>
                        + Tambah Pengguna
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
                    <table className="pengguna-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Username</th>
                                <th>Level</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pengguna.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.level}</td>
                                    <td>
                                        <button className="edit-button" onClick={() => navigate( `/pengguna/edit/${user.id}`)}>
                                            Edit
                                        </button>
                                        <button className="delete-button" data-bs-toggle="modal" data-bs-target="#deleteUserModal" onClick={() => setDeleteId(user.id)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <div
                className="modal fade"
                id="deleteUserModal"
                tabIndex={-1}
                aria-labelledby="deleteUserModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteUserModalLabel">Konfirmasi Hapus</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body text-center">
                            <i className="fas fa-user-times text-danger fs-2 mb-3"></i>
                            <h5>Yakin ingin menghapus pengguna ini?</h5>
                            <p className="text-muted mb-0">Data pengguna yang dihapus tidak dapat dikembalikan.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Batal
                            </button>
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
            <footer className="pengguna-footer">
                Sistem Manajemen Inventaris Laboratorium IOT
            </footer>
        </div>
    );
};

export default Pengguna;