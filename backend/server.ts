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
        const [rows] = await db.query(`
            SELECT
                inventaris.id,
                inventaris.nama_barang,
                inventaris.kategori,
                inventaris.jumlah,
                inventaris.kondisi,
                inventaris.lokasi,
                inventaris.tanggal_masuk,
                admin.username AS petugas
            FROM inventaris
            LEFT JOIN admin ON inventaris.petugas = admin.id
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal mengambil data inventaris"
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

app.get("/api/inventaris/:id", async (req, res) => {
    const {id} = req.params;

    try{
        const [rows] : any = await db.query(
            'SELECT * FROM inventaris WHERE id = ?', 
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Data inventaris tidak ditemukan"
            });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Gagal mengambil data inventaris"
        })
    }
});

app.put("/api/inventaris/:id", async (req, res) => {
    const {id} = req.params;

    const {
        nama_barang, 
        kategori, 
        jumlah, 
        kondisi, 
        lokasi, 
        tanggal_masuk, 
        petugas
    } = req.body;


    try{
         await db.query(
            `UPDATE inventaris SET nama_barang = ?, kategori = ?, jumlah = ?, kondisi = ?, lokasi = ?, tanggal_masuk = ?, petugas = ? WHERE id = ?`,
            [nama_barang, kategori, jumlah, kondisi, lokasi, tanggal_masuk, petugas, id]
        );
         res.json({
            message: "Data inventaris berhasil diperbarui"
        });

    } catch (error) {
        console.error("UPDATE ERROR : ", error);

        res.status(500).json({
            message: "Gagal memperbarui data inventaris"
        })
    }
}); 


app.delete("/api/inventaris/:id", async (req, res) => {
    const {id} = req.params;

    try {
        await db.query(
            `DELETE FROM INVENTARIS WHERE id = ?`, [id]
        );

        res.json({
            message: "Data inventaris berhasil dihapus"
        })
    } catch (error) {
        console.error("DELETE ERROR : ", error);

        res.status(500).json({
            message: "Gagal menghapus data inventaris"
        })
    }
})


app.get("/api/admin", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT id, username, level FROM admin"
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal mengambil data pengguna"
        });
    }
});

app.post("/api/admin", async (req, res) => {
    const {
        username,
        password,
        level
    } = req.body;
    try {
        const prefix = level === "Admin"
            ? "AD"
            : "PT";

        const [rows]: any = await db.query(
            `SELECT id FROM admin WHERE id LIKE ? ORDER BY id DESC LIMIT 1`,
            [`${prefix}%`]
        );
        let nomor = 1;
        if (rows.length > 0) {
            const idTerakhir = rows[0].id;
            const angkaTerakhir = parseInt(
                idTerakhir.substring(3),
                10
            );
            nomor = angkaTerakhir + 1;
        }

        const idBaru =
            prefix + String(nomor).padStart(3, "0");
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        await db.query(
            `INSERT INTO admin (id, username, password, level) VALUES (?, ?, ?, ?)`,
            [idBaru, username, hashedPassword, level]
        );
        res.json({
            message: "Pengguna berhasil ditambahkan",
            id: idBaru
        });

    } catch (error) {
        console.error("ADD USER ERROR:", error);
        res.status(500).json({
            message: "Gagal menambahkan pengguna"
        });
    }
});

app.get("/api/admin/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [rows]: any = await db.query(
            "SELECT id, username, level FROM admin WHERE id = ?",
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({
                message: "Pengguna tidak ditemukan"
            });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal mengambil data pengguna"
        });
    }
}); 

app.put("/api/admin/:id", async (req, res) => {

    const { id } = req.params;

    const {
        username,
        password,
        level
    } = req.body;

    try {
        if (password) {
            const hashedPassword = await bcrypt.hash(
                password,
                10
            );
            await db.query(`UPDATE admin SET username = ?, password = ?, level = ?WHERE id = ?`,
                [username, hashedPassword, level, id]
            );
        } else {
            await db.query(`UPDATE admin SET username = ?, level = ? WHERE id = ?`,
                [username, level, id]
            );
        }
        res.json({
            message: "Pengguna berhasil diperbarui"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal memperbarui pengguna"
        });
    }
});

app.delete("/api/admin/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.query(
            "DELETE FROM admin WHERE id = ?",
            [id]
        );
        res.json({
            message: "Pengguna berhasil dihapus"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Gagal menghapus pengguna"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
