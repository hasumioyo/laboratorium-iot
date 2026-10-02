    import express from "express";
    import cors from "cors";
    import db from "./db";

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

    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
    })
