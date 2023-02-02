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

const departmentlist = () => {
    pool.query('SELECT * FROM department', (error, results) => {
        if (error) {
            throw error
        }
        return results.rows
    })
}

const courselist = (department) => {
    pool.query('SELECT * FROM course WHERE dept_name = ${department}', (error, results) => {
        if (error) {
            throw error
        }
        return results.rows
    })
}

const courselistall = () => {
    pool.query('SELECT * FROM course', (error, results) => {
        if (error) {
            throw error
        }
        return results.rows
    })
}