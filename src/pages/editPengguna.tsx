import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/editPengguna.css";

const EditPengguna = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState("");

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const user = sessionStorage.getItem("user");
    const dataUser = user ? JSON.parse(user) : null;

    useEffect(() => {
        fetch(`http://localhost:3000/api/admin/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setUsername(data.username);
                setLevel(data.level);
            })
            .catch((error) => {
                console.error(error);
                setMessage("Gagal mengambil data pengguna");
                setMessageType("danger");
            });
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setMessage("");

        try {
            const response = await fetch(
                `http://localhost:3000/api/admin/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        level,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setMessageType("success");

                setTimeout(() => {
                    navigate("/pengguna");
                }, 1000);
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
        <div className="edit-pengguna-content">
            <header className="edit-pengguna-header">
                <div>
                    <h1>Edit Pengguna</h1>
                    <span>
                        Perbarui data pengguna sistem
                    </span>
                </div>
                <span>
                        {dataUser?.username || "User"}
                    </span>
            </header>
            <section className="edit-pengguna-body">
                <div className="pengguna-form-container">
                    <h2>Form Edit Pengguna</h2>
                    {message && (
                        <div
                            className={`alert alert-${messageType}`}
                            role="alert"
                        >
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="pengguna-form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="pengguna-form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Kosongkan jika tidak ingin mengubah password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                            <small>
                                Kosongkan jika password tidak ingin diubah
                            </small>
                        </div>
                        <div className="pengguna-form-group">
                            <label>Level</label>
                            <select
                                value={level}
                                onChange={(e) =>
                                    setLevel(e.target.value)
                                }
                                required
                            >
                                <option value="">
                                    Pilih Level
                                </option>

                                <option value="Admin">
                                    Admin
                                </option>

                                <option value="Petugas">
                                    Petugas
                                </option>
                            </select>
                        </div>
                        <div className="pengguna-form-action">
                            <button
                                type="button"
                                className="batal-button"
                                onClick={() =>
                                    navigate("/pengguna")
                                }
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="simpan-button"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <footer className="edit-pengguna-footer">
                Sistem Manajemen Inventaris Laboratorium IOT
            </footer>

        </div>
    );
};

export default EditPengguna;