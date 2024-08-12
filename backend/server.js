const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vikas@246',
    database: 'banner_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// API to get banner data
app.get('/api/banner', (req, res) => {
    const sql = 'SELECT * FROM banner LIMIT 1';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

// API to update banner data
app.post('/api/banner', (req, res) => {
    const { description, timer, link, visible } = req.body;
    const sql = 'UPDATE banner SET description = ?, timer = ?, link = ?, visible = ? WHERE id = 1';
    db.query(sql, [description, timer, link, visible], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
