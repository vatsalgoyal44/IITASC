const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ezpz2',
  host: 'localhost',
  database: 'lab4',
  password: '1234ezpz',
  port: 5433,
})

const finduser = async (username) => {
    const text = "SELECT * FROM user_password WHERE id = $1"
    const values = [username]

    try {
        const res = await pool.query(text, values)
        return res.rows[0]
        
    } catch (err) {
        console.log(err.stack)
    }

}

// const departmentlist = () => {
//     pool.query('SELECT * FROM department', (error, results) => {
//         if (error) {
//             throw error
//         }
//         return results.rows
//     })
// }

// const courselist = (department) => {
//     pool.query('SELECT * FROM course WHERE dept_name = ${department}', (error, results) => {
//         if (error) {
//             throw error
//         }
//         return results.rows
//     })
// }

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

const createuser = async (user) => {
    const text = "INSERT INTO user_password (id, hashed_password, token) VALUES ($1, $2, $3) RETURNING id, token"
    const values = [user.username, user.password, user.token]

    try {
        const res = await pool.query(text, values)
        return res.rows[0]
        
    } catch (err) {
        console.log(err.stack)
    }
}

const updateToken = async (id, token) => {
    const text = "UPDATE user_password SET token = $2 WHERE id = $1 RETURNING id, token"
    const values = [id, token]

    try {
        const res = await pool.query(text, values)
        console.log(res)
        return res.rows[0]
        
    } catch (err) {
        console.log(err.stack)
    }
}

module.exports.studentinfo = studentinfo;
module.exports.createuser = createuser;
module.exports.updateToken = updateToken;
module.exports.finduser = finduser;

