var mariadb = require('mariadb');

const pool = mariadb.createPool({
	host: '127.0.0.1',
	port: 3306,
	user: 'msa',
	password: 'msa1234!',
	connectionLimit: 5
})

async function getBoardList() {
	let conn, rows;
	try {
		conn = await pool.getConnection();
		conn.query('USE msa')
		rows = await conn.query('SELECT * FROM board')
	}
	catch (err) { throw err; }
	finally {
		if (conn) conn.end()
	}
	return rows
}

module.exports = { getBoardList, }
