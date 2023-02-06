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
    //beware of dept_name in both course and instructor
    const text = 'SELECT * \
                  FROM instructor natural join teaches join course using(course_ID) natural join section natural join reg_dates \
                  WHERE id = $1 \
                  and start_time<=now() \
                  and start_time>=all (SELECT start_time from reg_dates) \
                  ORDER BY course_id ASC'
    const values = [ID]

    try {
        const res = await pool.query(text, values)
        const text2 = 'SELECT * \
                       FROM instructor natural join teaches join course using(course_ID) natural join section natural join reg_dates \
                       WHERE id = $1 \
                       and start_time<=now() \
                       and start_time<some (SELECT start_time from reg_dates)\
                       ORDER BY start_time DESC, course_id ASC'
        const values2 = [ID]
        try {
            const res2 = await pool.query(text2, values2)
            const text3 = 'SELECT * \
                           FROM instructor where id=$1'
            const values3 = [ID]
            try {
                const res3 = await pool.query(text3, values3)
                return {
                            instructordetails: res3.rows,
                            thissemcourses: res.rows,
                            prevsemcourses: res2.rows
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

const courseinfo = async (ID) => {
    const text = 'SELECT * \
                  FROM course natural join section natural join reg_dates \
                  WHERE course_id = $1 \
                  and start_time<=now() \
                  and start_time>=all (SELECT start_time from reg_dates)'

    const values = [ID]
    try {
        console.log(text)
        console.log(values)
        const res = await pool.query(text, values)
        console.log(res)
        const text2 = 'SELECT * \
                       FROM prereq join course on (prereq_id=course.course_id)\
                       WHERE prereq.course_id = $1'
        const values2 = [ID]
        try {
            const res2 = await pool.query(text2, values2)
            console.log(res2)
            const text3 = 'SELECT * FROM teaches natural join section natural join reg_dates natural join instructor \
                           WHERE course_id = $1 \
                           and start_time<=now() \
                           and start_time>=all (SELECT start_time from reg_dates)'
            const values3 = [ID]
                try {
                    const res3 = await pool.query(text3, values3)
                    return {
                        coursedetails: res.rows,
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

const deptinfo = async () => {
    //be careful of building while natural join department and section
    const text = 'SELECT A.dept_name \
                  FROM department A \
                  WHERE exists \
                  (select * from department as B natural join course join section using(course_ID) natural join reg_dates \
                  WHERE A.dept_name=B.dept_name \
                  and start_time<=now() \
                  and start_time>=all (SELECT start_time from reg_dates))'
    try {
        console.log(text)
        const res = await pool.query(text)
        console.log(res)
        return {
            deptdetails: res.rows
        }
    } catch (err) {
        console.log(err.stack)
    }

}

const deptcourseinfo = async (dept_name) => {
    //be careful of building while natural join department and section
    const text = 'SELECT * \
                  FROM course natural join section natural join reg_dates \
                  WHERE dept_name=$1 \
                  and start_time<=now() \
                  and start_time>=all (SELECT start_time from reg_dates)'
    const values = [dept_name]
    try {
        console.log(text)
        console.log(values)
        const res = await pool.query(text,values)
        console.log(res)
        return {
            courses: res.rows
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
module.exports.deptinfo = deptinfo;
module.exports.deptcourseinfo = deptcourseinfo;
module.exports.searchcourse = searchcourse;
module.exports.courseinfo = courseinfo;
module.exports.instinfo = instinfo;
module.exports.createuser = createuser;
// module.exports.updateToken = updateToken;
module.exports.finduser = finduser;

