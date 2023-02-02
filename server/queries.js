const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ezpz2',
  host: 'localhost',
  database: 'lab4',
  password: '1234ezpz',
  port: 5433,
})

const finduser = (username) => {
    pool.query('SELECT * FROM users WHERE username = ${username}', (error, results) => {
        if (error) {
            throw error
        }
        return results.rows[0]
    })
    
}