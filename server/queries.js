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

const studentinfo = async (ID) => {

    const text = 'SELECT * FROM student WHERE id = $1'
    const values = [ID]

    try {
        const res = await pool.query(text, values)
        const text2 = 'with cursem_details(yr,sem) as\
                       (select year,semester from reg_dates\
                        where start_time<=now() \
                        and start_time>=all \
                        (SELECT start_time from reg_dates where start_time <=now())\
                        )\
                       SELECT * \
                       FROM takes NATURAL JOIN course, cursem_details \
                       WHERE id = $1 \
                       ORDER BY year DESC, \
                       CASE semester \
                        WHEN \'Spring\' THEN 4 \
                        WHEN \'Summer\' THEN 3 \
                        WHEN \'Fall\' THEN 2 \
                        WHEN \'Winter\' THEN 1 \
                       END'
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

const instrstudentinfo = async (inst_ID,ID) => {

    const text0 = 'SELECT * FROM instructor WHERE id = $1'
    const values0 = [inst_ID]

    try{
        const res0 = await pool.query(text, values)
        if(res0.rows.length===0){
            return {
                studentdetails: res0.rows,
                coursedetails: res0.rows
            }        
        }
        const text = 'SELECT * FROM student WHERE id = $1'
        const values = [ID]

        try {
            const res = await pool.query(text, values)
            const text2 = 'with cursem_details(yr,sem) as\
                           (select year,semester from reg_dates\
                            where start_time<=now() \
                            and start_time>=all \
                            (SELECT start_time from reg_dates where start_time <=now())\
                            )\
                           SELECT * \
                           FROM takes NATURAL JOIN course, cursem_details \
                           WHERE id = $1 \
                           ORDER BY year DESC, \
                           CASE semester \
                            WHEN \'Spring\' THEN 4 \
                            WHEN \'Summer\' THEN 3 \
                            WHEN \'Fall\' THEN 2 \
                            WHEN \'Winter\' THEN 1 \
                           END'
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
                  and start_time>=all (SELECT start_time from reg_dates where start_time<=now())'

    const values = [ID]

    try {
        const res = await pool.query(text, values)

        const text2 =  'with cursem_details(yr,sem) as\
                        (select year,semester from reg_dates\
                        where start_time<=now() \
                        and start_time>=all \
                        (SELECT start_time from reg_dates where start_time <=now()))\
                        SELECT * \
                        FROM instructor natural join teaches join course using(course_ID) natural join section, cursem_details \
                        WHERE id = $1 \
                        and (year,semester)!=(yr,sem) \
                        ORDER BY year DESC, \
                        CASE semester \
                         WHEN \'Spring\' THEN 4 \
                         WHEN \'Summer\' THEN 3 \
                         WHEN \'Fall\' THEN 2 \
                         WHEN \'Winter\' THEN 1 \
                        END'
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
                  and start_time>=all (SELECT start_time from reg_dates where start_time <=now())'

    const values = [ID]
    try{
        const res = await pool.query(text, values)
        const text1 = 'SELECT * \
                       FROM course \
                       WHERE course_id = $1'
        try {
            console.log(text)
            console.log(values)
            const res0 = await pool.query(text1, values)
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
                               and start_time>=all (SELECT start_time from reg_dates where start_time<=now())'
                const values3 = [ID]
                    try {
                        const res3 = await pool.query(text3, values3)
                        return {
                            coursedetails: res.rows,
                            coursedetails2: res0.rows,
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
    catch (err) {

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
                  and start_time>=all (SELECT start_time from reg_dates where start_time<=now()))'
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
                  and start_time>=all (SELECT start_time from reg_dates where start_time<=now())'
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
    const text = 'select * from takes where id=$1 and year=$2 and semester=$3 and course_id=$4'    
    const values = [ID,year,sem,course_id]
    try{
        const qres = await pool.query(text, values)
        console.log('Hi0')
        console.log(qres.rows)
        if((qres.rows).length===0){
            const text1 = 'select prereq_id from prereq where course_id=$1 except (select course_id from takes where id=$2)'    
            const values1 = [course_id,ID]
            console.log('HI0.5')
            try{
                const qres1 = await pool.query(text1, values1)
                console.log('HI0.75')
                if((qres1.rows).length===0){
                    const text2 = 'select * from section natural join time_slot where course_id=$1 and year=$2 and semester=$3 and sec_id=$4'    
                    console.log('HI0.8')
                    const values2 = [course_id,year,sem,sec_id]
                    try{
                        const qres2 = await pool.query(text2, values2)
                        const text3 = 'select * from takes natural join section natural join time_slot where id=$1 and year=$2 and semester=$3'    
                        const values3 = [ID,year,sem]
                        console.log(qres2.rows)
                        try{
                            const qres3 = await pool.query(text3, values3)
                            console.log('HI5')
                            console.log(qres3.rows)

                            let overlap = false;

                            (qres3.rows).forEach((item) => {
                                if  ((
                                     ((qres2.rows[0].start_hr*60+qres2.rows[0].start_min >= item.start_hr*60+item.start_min*60) &&
                                     (qres2.rows[0].start_hr*60+qres2.rows[0].start_min < item.end_hr*60+item.end_min*60 ))
                                     ||
                                     ((qres2.rows[0].end_hr*60+qres2.rows[0].end_min > item.start_hr*60+item.start_min*60) &&
                                     (qres2.rows[0].end_hr*60+qres2.rows[0].end_min <= item.end_hr*60+item.end_min*60 ))
                                     ||
                                     ((qres2.rows[0].start_hr*60+qres2.rows[0].start_min <= item.start_hr*60+item.start_min*60) &&
                                     (qres2.rows[0].end_hr*60+qres2.rows[0].end_min >= item.end_hr*60+item.end_min*60 ))
                                     )
                                     &&
                                     (
                                     qres2.rows[0].day==item.day
                                     )
                                    ) 
                                    {
                                        overlap = true;
                                    }
                            });
                            
                            if(!overlap){
                                console.log('HI6')
                                const text4 = 'insert into takes(id,course_id,sec_id,semester,year) values($1,$2,$3,$4,$5)'    
                                const values4 = [ID,course_id,sec_id,sem,year]
                                try{
                                    const res4 = await pool.query(text4, values4)
                                    res.status(200).send()
                                }
                                catch(err){
                                    console.log(err.stack)
                                }   
                            }
                            else{
                                res.status(203).send()
                            } 
                        }
                        catch(err){
                            console.log(err.stack)
                        }        
                    }
                    catch(err){
                        console.log(err.stack)
                    }    
                }
                else{
                    res.status(202).send()
                } 
            }
            catch(err){
                console.log(err.stack)
            }
        }
        else{
            res.status(201).send()
        }
    }
    catch(err){
        console.log(err.stack)
    }
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
module.exports.instrstudentinfo = instrstudentinfo;
module.exports.deptinfo = deptinfo;
module.exports.deptcourseinfo = deptcourseinfo;
module.exports.searchcourse = searchcourse;
module.exports.courseinfo = courseinfo;
module.exports.instinfo = instinfo;
module.exports.createuser = createuser;
module.exports.finduser = finduser;
module.exports.dropCourse = dropCourse;
module.exports.regCourse = regCourse;
module.exports.runningCourses = runningCourses;

