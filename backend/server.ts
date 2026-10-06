import express from "express";
import cors from "cors";
import db from "./db";
import bcrypt from "bcryptjs";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "database berhasil berjalan!"
    });
})

app.get("/test", (req, res) => {
    res.send("SERVER BARU BERHASIL");
});

app.get("/api/test-db", async(req, res) => {
    try {
        const [rows] = await db.query("SELECT 1 AS connected");
        res.json({
            message: "Database berhasil connect!",
            data: rows,
        });
            
        } catch (error) {
            console.error("Database error", error);
            res.status(500).json({
                message: "Database gagal hubung",
            });
        }
});

app.post("/api/login", async(req, res) => {
    const {username, password} = req.body;
    try {
        const [rows]: any = await db.query(
            'SELECT * FROM admin WHERE username = ?',
            [username]
        );

        if(rows.length === 0) {
            return res.status(401).json({
                message : "Username tidak ditemukan"
            })
        }

        const admin = rows[0];

        const cocok = await bcrypt.compare(
            password, admin.password
        );

        if (!cocok) {
            return res.status(401).json({
                message: "Password salah"
            })
        }

        res.json({
            message: "Login Berhasil",
            user: {
                id: admin.id,
                username: admin.username,
                level: admin.level
            }
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message : "Terjadi kesalahan server"
        })
    }
});

app.get("/api/inventaris", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM inventaris"
        );
        res.json(rows);
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message: "gagal mengambil data inventaris"
        });
    }
});

app.post("/api/inventaris", async (req, res) => {
    const {
        nama_barang,
        kategori,
        jumlah,
        kondisi,
        lokasi,
        tanggal_masuk,
        petugas
    } = req.body;

    try {
        await db.query(
            `INSERT INTO inventaris (nama_barang, kategori, jumlah, kondisi, lokasi, tanggal_masuk, petugas) VALUES(?, ?, ?, ?, ?, ?, ?)`,
            [nama_barang, kategori, jumlah, kondisi, lokasi, tanggal_masuk, petugas]
        );
        res.json({
            message: "Data inventaris berhasil menambahkan"
        });
    } catch (error) {
        console.error("ERROR INSERT", error);

        res.status(500).json({
            message: "Gagal menambahkan data inventaris",
            error: String(error)
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
