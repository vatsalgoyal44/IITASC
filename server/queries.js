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

const studentinfo = async (ID) => {

    const text = 'SELECT * FROM student WHERE id = $1'
    const values = [ID]

    try {
        const res = await pool.query(text, values)
        console.log(res.rows[0])
        return res.rows[0];
        const text = 'SELECT * FROM takes WHERE id = $1'
        const values = [ID]
      } catch (err) {
        console.log(err.stack)
      }
      

    // pool.query('SELECT * FROM student WHERE id = 1', (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     console.log(results.rows)
    //     return results.rows[0]
    // })
}

module.exports.studentinfo = studentinfo;
