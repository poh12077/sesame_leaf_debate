var express = require('express')
var app = express()
const mariadb = require('mariadb');

const bodyParser = require('body-parser');
const multer = require('multer');
const form_data = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(form_data.array());

const pool = mariadb.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '8246',
    connectionLimit: 5,
    database: 'test'
});

app.get('/test.html', function (req, res) {
    res.sendFile(__dirname + "/test.html")
})

app.post('/upload', async (req, res) => {
    try {
    let conn;
    let sql;
    let column = req.body.column;
    if (column == 'one') {
        sql = "update question set one = one +1";
    }else if ( column=='two'){
        sql = "update question set two = two +1";
    }
        conn = await pool.getConnection();
        const rows = await conn.query(sql);
        console.log("success");
    } catch (e) {
        console.log("fail");
    }

});

app.listen(8080, function () {
    console.log("start! express server on port 8080")
})
