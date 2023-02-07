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
        const text2 = 'SELECT * FROM takes NATURAL JOIN course WHERE id = $1'
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
                  WHERE dept_name=$1 and sec_id=$2\
                  and start_time<=now() \
                  and start_time>=all (SELECT start_time from reg_dates)'
    const values = [dept_name, 1]
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

const regCourse = async(ID, course_id, year, sem, sec_id,res) =>{
    // const text = 'select * from takes where id=$1 and year=$2 and sem=$3 and course_id=$4'    
    // const values = [ID,year,sem,course_id]
    // try{
    //     const res = await pool.query(text1, values1)
    //     if(){
    //         const text1 = 'select course_id from prereq where course_id=$2 except (select course_id from takes where id=$1)'    
    //         const values1 = [ID]
    //         try{
    //             const res1 = await pool.query(text1, values1)
    //             if(){
    //                 const text2 = 'select * from section natural join time_slot where course_id=$1 and year=$2 and sem=$3 and sec_id=$4'    
    //                 const values2 = [course_id,year,sem,sec_id]
    //                 try{
    //                     const res2 = await pool.query(text2, values2)
    //                     const text3 = 'select * from takes natural join section natural join time_slot where id=$1 and year=$2 and sem=$3'    
    //                     const values3 = [ID,year,sem]
    //                     try{
    //                         const res3 = await pool.query(text3, values3)
    //                         if(){
    //                             const text4 = 'insert into takes(id,course_id,sec_id,semester,year) values($1,$2,$3,$4,$5)'    
    //                             const values4 = [ID,course_id,sec_id,sem,year]
    //                             try{
    //                                 const res4 = await pool.query(text4, values4)
    //                                 return{result : 'success'};
    //                             }
    //                             catch(err){
    //                                 console.log(err.stack)
    //                             }   
    //                         }
    //                         else{
    //                             res.status(203).send()
    //                         } 
    //                     }
    //                     catch(err){
    //                         console.log(err.stack)
    //                     }        
    //                 }
    //                 catch(err){
    //                     console.log(err.stack)
    //                 }    
    //             }
    //             else{
    //                 res.status(202).send()
    //             } 
    //         }
    //         catch(err){
    //             console.log(err.stack)
    //         }
    //     }
    //     else{
    //         res.status(201).send()
    //     }
    // }
    // catch(err){
    //     console.log(err.stack)
    // }
}

const runningCourses = async() => {
    const text = 'SELECT * FROM section NATURAL JOIN reg_dates NATURAL JOIN course \
                  WHERE start_time<=now() AND start_time >= all(SELECT start_time from reg_dates)'
    const values = []
    try{
        const res = await pool.query(text, values)
        console.log(res);
        return res.rows;
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
module.exports.deptinfo = deptinfo;
module.exports.deptcourseinfo = deptcourseinfo;
module.exports.searchcourse = searchcourse;
module.exports.courseinfo = courseinfo;
module.exports.instinfo = instinfo;
module.exports.createuser = createuser;
// module.exports.updateToken = updateToken;
module.exports.finduser = finduser;
module.exports.dropCourse = dropCourse;
module.exports.regCourse = regCourse;
module.exports.runningCourses = runningCourses;

