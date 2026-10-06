import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


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
    const [inventaris, setInventaris] = useState<dataInventaris[]>([]);
    useEffect(() => {

        fetch("http://localhost:3000/api/inventaris").then((response) => response.json()).then((data) => {setInventaris(data);
            }).catch((error) => {console.error(error);
            });
    }, []);

    return (
        <>
        <section>
            <h1>Manajemen Inventaris</h1>
            <button onClick={() => navigate("/inventaris/tambah")}>Tambah Barang</button>

            <table>
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
                    </tr>
                    <tbody>
                    {inventaris.map((barang, index) => (
                        <tr key={barang.id}>
                        <td>{index + 1}</td>
                        <td>{barang.nama_barang}</td>
                        <td>{barang.kategori}</td>
                        <td>{barang.jumlah}</td>
                        <td>{barang.kondisi}</td>
                        <td>{barang.lokasi}</td>
                        <td>{new Date(barang.tanggal_masuk).toLocaleDateString("id-ID").replaceAll("/", "-")}</td>
                        <td>{barang.petugas}</td>
                        </tr>
                    ))}
                    </tbody>
                </thead>
            </table>
        </section>
        </>
    )
}

export default Inventaris;