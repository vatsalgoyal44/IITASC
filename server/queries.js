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
        // return res.rows[0];
        const text2 = 'SELECT * FROM takes WHERE id = $1'
        const values2 = [ID]
        try {
            const res2 = await pool.query(text2, values2)
            // return res.rows[0];
            return {
                studentdetails: res.rows[0],
                coursedetails: res2.rows
            }
            
        } catch (err) {
            console.log(err.stack)
        }
    } catch (err) {
        console.log(err.stack)
    }

}

module.exports.studentinfo = studentinfo;
