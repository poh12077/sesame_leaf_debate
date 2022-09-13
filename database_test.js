
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '8246',
    connectionLimit: 5,
    database: 'test'
});

async function main(){
    try{
        let sql="select * from students";
        let conn = await pool.getConnection();
        let rows = await conn.query(sql);
        console.log(rows);
    }catch(e){

    }
}

main();