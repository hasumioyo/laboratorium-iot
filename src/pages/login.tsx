import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); 
    const navigate = useNavigate();

    const handleLogin = async(e: React.FormEvent) =>{
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            
            const data = await response.json();

           if (response.ok) {
                setMessage("Login berhasil!");
                setMessageType("success");

                sessionStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);

            } else {
                setMessage(data.message);
                setMessageType("danger");
            }

        } catch (error) {
            console.error(error);

            setMessage(
                "Tidak dapat terhubung ke server"
            );

            setMessageType("danger");
        }
    };

    return (
        <>
        <div className="login-container">
            <div className="login-box">
                <h1>DATA INVENTARIS</h1>
                <p>LABORATORIUM IOT</p>
                {message && (
                    <div
                        className={`alert alert-${messageType}`}
                        role="alert"
                    >
                        {message}
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <div className="login-group">
                        <label>Username</label>
                        <input type="text" placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div className="login-group">
                        <label>Password</label>
                        <input type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button type="submit">Login</button>
                </form>

            </div>

        </div>
        </>
    );
};

export default Login;