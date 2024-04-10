const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Konfigurasi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan username Anda
    password: '', // Ganti dengan password Anda
    database: 'sistem_antrian' // Ganti dengan nama database Anda
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Terhubung ke database MySQL');
});

// Endpoint untuk mendapatkan semua transaksi
app.get('/', (req, res) => {
    db.query('SELECT * FROM Transaksi', (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

// Endpoint untuk menambahkan transaksi baru
app.post('/transaksi', (req, res) => {
    const { nama_pasien, tanggal, jam, dokter, status } = req.body;
    const sql = 'INSERT INTO Transaksi (nama_pasien, tanggal, jam, dokter, status) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nama_pasien, tanggal, jam, dokter, status], (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Transaksi berhasil ditambahkan');
    });
});

// Endpoint untuk mengupdate transaksi berdasarkan ID
app.put('/transaksi/:id', (req, res) => {
    const id = req.params.id;
    const { nama_pasien, tanggal, jam, dokter, status } = req.body;
    const sql = 'UPDATE Transaksi SET nama_pasien=?, tanggal=?, jam=?, dokter=?, status=? WHERE id=?';
    db.query(sql, [nama_pasien, tanggal, jam, dokter, status, id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Transaksi berhasil diupdate');
    });
});

// Endpoint untuk menghapus transaksi berdasarkan ID
app.delete('/transaksi/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM Transaksi WHERE id=?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Transaksi berhasil dihapus');
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
