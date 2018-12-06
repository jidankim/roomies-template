//This file's purpose is to pre-write some of the functions in advance

import bcrypt from 'bcryptjs';
import express from 'express';
import pool from '../config.js';

const router = express.Router();

//Get Student Information, given Student ID
router.post('/getprofile', (req, res) => {
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
router.post('/updateprofile', (req, res) => {
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
router.post('/getpreference', (req, res) => {
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
router.post('/updatepreference', (req, res) => {
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

    console.log(id);
    console.log(pw);
    console.log(fn);
    console.log(ln);
    console.log(age);
    console.log(maj);
    console.log(club);
    console.log(pn);
    // CHECK USERNAME FORMAT
    let idRegex = /^\d{8}$/;

    if (!idRegex.test(id)) {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        });
    }

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

/*
    ACCOUNT SIGN IN: POST /api/account/signin
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: LOGIN FAILED
*/
router.post('/signin', (req, res) => {
    if (typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    // FIND THE USER BY USERNAME

    pool.getConnection((err, connection) => {
      if (err) throw err;

      let queryString = "SELECT * FROM user_tbl WHERE Student_ID = ?";
      // use the connection
      connection.query(queryString, req.body.studentID, (err, results, fields) => {
        // when done with the connection, release interval
        connection.release();

        // handle error after the release
        if (err) throw err;

        // CHECK ACCOUNT EXISTANCY
        if (results.length == 0) {
          return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
          });
        }

        // CHECK WHETHER THE PASSWORD IS VALID
        if (!bcrpyt.compareSync(req.body.password, results[0].Password)) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // ALTER SESSION
        let session = req.session;
        session.loginInfo = {
            _id: req.body.studentID,
        };

        // RETURN SUCCESS
        return res.json({
            success: true
        });

      });

    });
    // Account.findOne({ username: req.body.username }, (err, account) => {
    //     if (err) throw err;
    //
    //     // CHECK ACCOUNT EXISTANCY
    //     if (!account) {
    //         return res.status(401).json({
    //             error: "LOGIN FAILED",
    //             code: 1
    //         });
    //     }
    //
    //     // CHECK WHETHER THE PASSWORD IS VALID
    //     if (!account.validateHash(req.body.password)) {
    //         return res.status(401).json({
    //             error: "LOGIN FAILED",
    //             code: 1
    //         });
    //     }
    //
    //     // ALTER SESSION
    //     let session = req.session;
    //     session.loginInfo = {
    //         _id: account._id,
    //         username: account.username
    //     };
    //
    //     // RETURN SUCCESS
    //     return res.json({
    //         success: true
    //     });
    // });
});

/*
    GET CURRENT USER INFO GET /api/account/getInfo
*/
router.get('./getinfo', (req, res) => {
    if (typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({ info: req.session.loginInfo });
});

/*
    LOGOUT: POST /api/account/logout
*/
router.post('/logout', (req, res) => {
    req.session.destroy(err => { if (err) throw err; });
    return res.json({ success: true });
});

export default router;
