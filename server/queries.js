const config = require('./config');
const Pool = require('pg').Pool
const pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port,
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

const instinfo = async (ID) => {

    const text = 'SELECT * FROM instructor WHERE id = $1'
    const values = [ID]

    try {
        const res = await pool.query(text, values)
        // return res.rows[0];
        const text2 = 'SELECT * FROM teaches WHERE id = $1'
        const values2 = [ID]
        try {
            const res2 = await pool.query(text2, values2)
            // return res.rows[0];
            return {
                instructordetails: res.rows[0],
                coursedetails: res2.rows
            }
            
        } catch (err) {
            console.log(err.stack)
        }
    } catch (err) {
        console.log(err.stack)
    }

}

const courseinfo = async (ID) => {

    const text = 'SELECT * FROM course WHERE course_id = $1'
    const values = [ID]
    try {
        const res = await pool.query(text, values)
        const text2 = 'SELECT * FROM prereq WHERE course_id = $1'
        const values2 = [ID]
        try {
            const res2 = await pool.query(text2, values2)
            const text3 = 'SELECT * FROM teaches WHERE course_id = $1'
            const values3 = [ID]
                try {
                    const res3 = await pool.query(text3, values3)
                    return {
                        coursedetails: res.rows[0],
                        prereqdetails: res2.rows,
                        instructordetails: res3.rows
                    }

                } catch (err) {
                    console.log(err.stack)
                }
        } catch (err) {
            console.log(err.stack)
        }
    } catch (err) {
        console.log(err.stack)
    }

}


const createuser = async (user, token) => {
    const text = "INSERT INTO user_password (id, hashed_password) VALUES ($1, $2) RETURNING id"
    const values = [user.username, user.password]

    try {
        const res = await pool.query(text, values)
        res.rows[0].token = token
        return res.rows[0]
        
    } catch (err) {
        console.log(err.stack)
    }
}

const searchcourse = async (keystring) => {

    const text = 'SELECT * FROM course WHERE course_id ILIKE $1'
    const values = ['%'+keystring+'%']
    
    try {
        const res = await pool.query(text, values)
        
        const text2 = "SELECT * FROM section WHERE course_id ILIKE $1"
        const values2 = ['%'+keystring+'%']
        
        try {
            const res2 = await pool.query(text2, values2)
            return {
                courses: res.rows,
                section: res2.rows
            }
        } catch (err) {
            console.log(err.stack)
        }
    } catch (err) {
        console.log(err.stack)
    }

}

const dropCourse = async(ID, course_id, year, sem) =>{
    const text = 'DELETE FROM takes WHERE id = $1 and course_id = $2 and year = $3 and semester = $4'
    const values = [ID, course_id, year, sem]

    try{
        const res = await pool.query(text, values)
        return res;
    }
    catch(err){
        console.log(err.stack)
    }
}

// const updateToken = async (id, token) => {
//     const text = "UPDATE user_password SET token = $2 WHERE id = $1 RETURNING id, token"
//     const values = [id, token]

//     try {
//         const res = await pool.query(text, values)
//         console.log(res)
//         return res.rows[0]
        
//     } catch (err) {
//         console.log(err.stack)
//     }
// }

module.exports.studentinfo = studentinfo;
module.exports.searchcourse = searchcourse;
module.exports.courseinfo = courseinfo;
module.exports.instinfo = instinfo;
module.exports.createuser = createuser;
// module.exports.updateToken = updateToken;
module.exports.finduser = finduser;
module.exports.dropCourse = dropCourse;

