import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/tmbhPengguna.css";

const TambahPengguna = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [level, setLevel] = useState("");

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const user = sessionStorage.getItem("user");
    const dataUser = user ? JSON.parse(user) : null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await fetch(
                "http://localhost:3000/api/admin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        level
                    })
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
        <div className="tambah-pengguna-content">
            <header className="tambah-pengguna-header">
                <div>
                    <h1>Tambah Pengguna</h1>
                    <span>Tambahkan pengguna baru ke sistem</span>
                </div>
                <span>
                        {dataUser?.username || "User"}
                    </span>
            </header>
            <section className="tambah-pengguna-body">
                <div className="pengguna-form-container">
                    <h2>Form Tambah Pengguna</h2>
                    {message && (
                        <div
                            className={`alert alert-${messageType}`}
                            role="alert"
                        >
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="pengguna-form-group">
                            <label>Username</label>
                            <input type="text" placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" required/>
                        </div>
                        <div className="pengguna-form-group">
                            <label>Password</label>
                            <input type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <div className="pengguna-form-group">
                            <label>Level</label>
                            <select value={level} onChange={(e) => setLevel(e.target.value)}required>
                                <option value="">Pilih Level </option>
                                <option value="Admin">Admin</option>
                                <option value="Petugas">Petugas</option>
                            </select>
                        </div>
                        <div className="pengguna-form-action">
                            <button type="button" className="batal-button" onClick={() => navigate("/pengguna")}>
                                Batal
                            </button>
                            <button type="submit" className="simpan-button">Simpan</button>
                        </div>
                    </form>
                </div>
            </section>
            <footer className="tambah-pengguna-footer">
                Sistem Manajemen Inventaris Laboratorium IOT
            </footer>
        </div>
    );
};

export default TambahPengguna;