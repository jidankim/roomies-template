//This file's purpose is to pre-write some of the functions in advance

import bcrypt from 'bcryptjs';
import express from 'express';
import pool from '../config.js';

const router = express.Router();

//Get all dormitory information, given request
router.get('/getAllDormitory', (req, res) => {
    pool.getConnection((err, connection) => {
        let queryString = "SELECT * FROM dormitory"
        connection.query(queryString, [], (err, results, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            connection.release();
            return res.json({results: results});
        });
    });
});

//Get all room information, given Dormitory ID
router.get('/:dormName', (req, res) => {
    //Extract variables from the request
    var dorm_id = req.params.dorm_id;

    pool.getConnection((err, connection) => {
        let queryString = "SELECT * FROM room WHERE dorm_id = ?";
        connection.query(queryString, [dorm_id], (err, results, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            connection.release();
            return res.json({results: results});
        });
    });
});

//Move student into a room, given Student ID and Room ID
router.post('/moveIntoRoom', (req, res) => {
    //Extract variables from the request
    var student_id = req.body.student_id;
    var room_id = req.body.room_id;

    pool.getConnection((err, connection) => {
        let queryString = "UPDATE student SET room_id = ? WHERE student_id = ?";
        connection.query(queryString, [room_id, student_id], (err, results, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            connection.release();
            return res.json({success: true});
        });
    });
});

//Get all information and comments of a room, given Room ID
router.get('/:RoomID', (req, res) => {
    //Extract variables from the request
    var room_id = req.params.room_id;

    pool.getConnection((err, connection) => {
        let queryString = "SELECT * FROM room WHERE room_id = ?";
        connection.query(queryString, [room_id], (err, roomInfo, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            let queryString = "SELECT * FROM commentary WHERE room_id = ? ORDER BY date";
            connection.query(queryString, [room_id], (err, comments, fields) => {
                if (err) {
                    connection.release();
                    console.log(err);
                    throw err;
                }
                connection.release();
                return res.json({roomInfo: roomInfo[0], comments: comments});
            });
        });
    });
});

//Get comments of a student, given Student ID
router.post('/getCommentsByStudentID', (req, res) => {
    //Extract variables from the request
    var student_id = req.body.student_id;

    pool.getConnection((err, connection) => {
        let queryString = "SELECT * FROM commentary WHERE student_id = ?";
        connection.query(queryString, [student_id], (err, results, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            connection.release();
            return res.json({results: results});
        });
    });
});

//Update a comment, given Comment ID and Comment Text
router.post('/updateComment', (req, res) => {
    //Extract variables from the request
    var comment_id = req.body.comment_id;
    var comment_txt = req.body.comment_txt;

    pool.getConnection((err, connection) => {
        let queryString = "UPDATE commentary SET comment_txt = ? WHERE comment_id = ?";
        connection.query(queryString, [comment_txt, comment_id], (err, results) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            connection.release();
            return res.json({success = true});
        });
    });
});

//Delete a comment, given Comment ID
router.post('/deleteComment', (req, res) => {
    //Extract variables from the request
    var comment_id = req.body.comment_id;

    pool.getConnection((err, connection) => {
        let queryString = "DELETE FROM commentary WHERE comment_id = ?";
        connection.query(queryString, [comment_id], (err, results) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            connection.release();
            return res.json({success = true});
        });
    });
});

//Search students with a matching criteria, given search criteria data (First Name, Last Name, Age (with age conditions >=, >, =, <, <=), Major)
router.get('/studentSearchResults', (req, res) => {
    //Assumes req.params = {major = "Computer Science", age = 23, age_condition = ">="} or {first_name = "Andrew"}, etc...
    var conditions = req.params;

    if (Object.keys(conditions).length == 0) {
        return res.status(999).json({
            error: "must have at least one condition!",
            code = 999
        });
    }

    pool.getConnection((err, connection) => {
        let queryString = "SELECT * FROM student WHERE ";
        let params = [];
        let addAnd = false;
        //Add to the query condition using the req.params
        if (conditions.first_name !== undefined) {
            if (addAnd) queryString += " AND ";
            queryString += "first_name = ?";
            addAnd = true;
            params.push(conditions.first_name);
        }
        if (conditions.last_name !== undefined) {
            if (addAnd) queryString += " AND ";
            queryString += "last_name = ?";
            addAnd = true;
            params.push(conditions.last_name);
        }
        if (conditions.major !== undefined) {
            if (addAnd) queryString += " AND ";
            queryString += "major = ?";
            addAnd = true;
            params.push(conditions.major);
        }
        if (conditions.age !== undefined) {
            if (addAnd) queryString += " AND ";
            if (conditions.age_condition !== undefined) {
                queryString = queryString + "age " + conditions.age_condition + " ?";
            }
            else {
                queryString += "age = ?";
            }
            addAnd = true;
            params.push(conditions.age);
        }
        console.log(queryString);

        connection.query(queryString, params, (err, results, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            connection.release();
            return res.json({results: results});
        });
    });
});

//Search students with a matching preference, given search criteria data (Smoker, Sleep Start Time, Sleep End Time, Music Preference, Hobby, Club)
router.get('/preferenceSearchResults', (req, res) => {
    //Assumes req.params = {smoker = "N", hobby = "Game"} or {sleep_start_time = "00:00:00", sleep_end_time = "08:00:00"}, etc...
    var conditions = req.params;

    if (Object.keys(conditions).length == 0) {
        return res.status(999).json({
            error: "must have at least one condition!",
            code = 999
        });
    }

    pool.getConnection((err, connection) => {
        let queryString = "SELECT * FROM student WHERE student_id IN (SELECT student_id FROM preference WHERE ";
        let params = [];
        let addAnd = false;

        if (conditions.first_name !== undefined) {
            if (addAnd) queryString += " AND ";
            queryString += "first_name = ?";
            addAnd = true;
            params.push(conditions.first_name);
        }

        connection.query(queryString, params, (err, results, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            connection.release();
            return res.json({results: results});
        });
    });
});

//Change password, given Student ID, old password (not encrypted), and new password (not encrypted)
router.post('/changePassword', (req, res) => {
    //Extract variable
    var student_id = req.body.student_id;
    var old_pw = req.body.old_pw;
    var new_pw = req.body.new_pw;

    const password = bcrypt.hashSync(new_pw, 8);
});

router.post('/signup', (req, res) => {
    /*
    const id = parseInt(req.body.studentID);
    const pw = req.body.password;
    const fn = req.body.firstName;
    const ln = req.body.lastName;
    const age = req.body.age === '' ? null : req.body.age;
    const maj = req.body.major === '' ? null : req.body.major;
    const club = req.body.club === '' ? null : req.body.club;
    const pn = req.body.phoneNumber === '' ? null : req.body.phoneNumber;

    // CHECK PASS LENGTH
    if (pw.length < 4 || typeof pw !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    // CHECK USER EXISTANCE

    pool.getConnection((err, connection) => {
      if (err) throw err;

      let queryString = "SELECT * FROM STUDENT WHERE Student_ID = ?";
      // use the connection
      connection.query(queryString, [id], (err, results, fields) => {
        if (err) throw err;

        if (results.length != 0) {
          return res.status(409).json({
            error: "USERNAME EXISTS",
            code: 3
          });
        }
      });

      // SAVE IN THE DATABASE
      const password = bcrypt.hashSync(pw, 8);

      queryString =
        `INSERT INTO STUDENT SET
        Student_ID = ?, Password = ?, First_Name = ?, Last_Name = ?,
        Age = ?, Major = ?, Club = ?, Phone_Number = ?`;

      connection.query(queryString, [id, pw, fn, ln, age, maj, club, pn], (err, results, fields) => {
        connection.release();

        if (err) throw err;

        return res.json({ success: true });
      });


    });
    */
});

export default router;
