//This file's purpose is to pre-write some of the functions in advance

import bcrypt from 'bcryptjs';
import express from 'express';
import pool from '../config.js';

const router = express.Router();

//Get Student Information, given Student ID
router.post('/getProfile', (req, res) => {
    //Extracting values from the request
    var student_id = parseInt(req.body.student_id);

    pool.getConnection((err, connection) => {
        let queryString = "SELECT * FROM student WHERE student_id = ?"
        connection.query(queryString, [student_id], (err, results, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            //If no result, return null
            if (results.length == 0) {
                connection.release();
                return res.json({exists: false, result: null});
            }
            //Return result of query
            else {
                connection.release();
                return res.json({exists: true, result: result[0]});
            }
        });
    });
})

//Set Student Information, given Student ID and student data (First Name, Last Name, Age, Major, PhoneNumber)
router.post('/updateProfile', (req, res) => {
    //Extracting variables from the request
    var student_id = parseInt(req.body.student_id);
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var age = req.body.age;
    var major = req.body.major;
    var phonennumber = req.body.phonennumber;

    pool.getConnection((err, connection) => {
        let queryString = "UPDATE student SET first_name = ?, last_name = ?, age = ?, major = ?, phonenumber = ? WHERE student_id = ?"
        connection.query(queryString, [first_name, last_name, age, major, phonenumber, student_id], (err, results, fields) => {
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

//Get Preference, given Student ID
router.post('/getPreference', (req, res) => {
    //Extracting values from the request
    var student_id = parseInt(req.body.student_id);

    pool.getConnection((err, connection) => {
        let queryString = "SELECT * FROM preference WHERE student_id = ?"
        connection.query(queryString, [student_id], (err, results, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            //If no result, return null
            if (results.length == 0) {
                connection.release();
                return res.json({exists: false, result: null});
            }
            //Return result of query
            else {
                connection.release();
                return res.json({exists: true, result: result[0]});
            }
        });
    });
})

//Set Preference, given Student ID and preference data
router.post('/updatePreference', (req, res) => {
	//Extracting variables from the request
    var student_id = parseInt(req.body.student_id);
    var smoker = req.body.smoker;
    var sleep_start_time = req.body.sleep_start_time;
    var sleep_end_time = req.body.sleep_end_time;
    var music_Preference = req.body.music_Preference;
    var hobby = req.body.hobby;
    var club = req.body.club;

	pool.getConnection((err, connection) => {
		let queryString = "SELECT * FROM preference WHERE student_id = ?"
		connection.query(queryString, [student_id], (err, results, fields) => {
			if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
			//First time entering preference - save preference using INSERT
			if (results.length == 0) {
                queryString = "INSERT INTO preference VALUES ?";
                connection.query(queryString, [[student_id, smoker, sleep_start_time, sleep_end_time, music_Preference, hobby, club]], (err, result) => {
                    if (err) {
                        connection.release();
                        console.log(err);
                        throw err;
                    }
                    connection.release();
                    return res.json({success: true});
                });
			}
            //Editing preference - save preference using UPDATE
			else if (results.length == 1) {
                queryString = "UPDATE preference SET smoker = ?, sleep_start_time = ?, sleep_end_time = ?, music_Preference = ?, hobby = ?, club = ? where student_id = ?";
                connection.query(queryString, [smoker, sleep_start_time, sleep_end_time, music_Preference, hobby, club, student_id], (err, result) => {
                    if (err) {
                        connection.release();
                        console.log(err);
                        throw err;
                    }
                    connection.release();
                    return res.json({success: true});
                });
			}
            //Error
            else {
                connection.release();
                return res.status(500).json({
                    error: "error in DB: two preferences exist for the student_id: " + student_id,
                    code: 999
                });
            }
			
		});
	});
});

//Get all dormitory information, given request
router.post('/getAllDormitory', (req, res) => {
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
router.post('/getAllRoom', (req, res) => {
    //Extract variables from the request
    var dorm_id = req.body.dorm_id;

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

//Get all comments of a room, given Room ID
router.post('/getCommentsByRoomID', (req, res) => {
    //Extract variables from the request
    var room_id = req.body.room_id;

    pool.getConnection((err, connection) => {
        let queryString = "SELECT * FROM commentary WHERE room_id = ?";
        connection.query(queryString, [room_id], (err, results, fields) => {
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

        // // when done with the connection, release interval
        // connection.release();
        //
        // // handle error after the release
        // if (err) throw err;
      });

      // SAVE IN THE DATABASE
      const password = bcrypt.hashSync(pw, 8);

      // queryString =
      // `INSERT INTO STUDENT (Student_ID, Password, First_Name, Last_Name, Age, Major, Club, Phone_Number) VALUES ("`
			// 		+ req.body.studentID + '","'
      //     + password + '","'
      //     + req.body.firstName + '","'
      //     + req.body.lastName + '","'
      //     + (req.body.age === '' ? 'NULL' : req.body.age) + '","'
      //     + (req.body.major === '' ? 'NULL' : req.body.age) + '","'
      //     + req.body.club + '");'

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
