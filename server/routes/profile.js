//This file's purpose is to pre-write some of the functions in advance

import bcrypt from 'bcryptjs';
import express from 'express';
import pool from '../config.js';

const router = express.Router();

//Get Student Information, given Student ID
router.get('/getProfile', (req, res) => {
    //Extracting values from the request
    var student_id = parseInt(req.session.loginInfo.username);

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
                return res.json({exists: true, result: results[0]});
            }
        });
    });
})

//Update Student Information, given Student ID and student data (First Name, Last Name, Age, Major, PhoneNumber, pw)
router.put('/updateProfile', (req, res) => {
    //Extracting variables from the request
    var student_id = parseInt(req.session.loginInfo.username);
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var age = req.body.age;
    var major = req.body.major;
    var phone_number = req.body.phonenumber;
    var pw = req.body.pw;

    pool.getConnection((err, connection) => {
        let queryString = "UPDATE student SET first_name = ?, last_name = ?, age = ?, major = ?, phonenumber = ?, pw = ? WHERE student_id = ?"
        connection.query(queryString, [first_name, last_name, age, major, phone_number, pw, student_id], (err, results, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            connection.release();
            return res.json({success : true, result: req.body});
        });
    });
});

//Get Preference, given Student ID
router.get('/getPreference', (req, res) => {
    //Extracting values from the request
    var student_id = parseInt(req.session.loginInfo.username);

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
                return res.json({exists: true, result: results[0]});
            }
        });
    });
})

//Set Preference, given Student ID and preference data
router.put('/updatePreference', (req, res) => {
	//Extracting variables from the request
    var student_id = parseInt(req.session.loginInfo.username);
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
            //Editing preference - save preference using UPDATE
			if (results.length == 1) {
                queryString = "UPDATE preference SET smoker = ?, sleep_start_time = ?, sleep_end_time = ?, music_Preference = ?, hobby = ?, club = ? where student_id = ?";
                connection.query(queryString, [smoker, sleep_start_time, sleep_end_time, music_Preference, hobby, club, student_id], (err, result) => {
                    if (err) {
                        connection.release();
                        console.log(err);
                        throw err;
                    }
                    connection.release();
                    return res.json({success: true, result: req.body});
                });
			}
            //Error
            else {
                connection.release();
                return res.status(500).json({
                    error: "error in DB: no preferences exist for the student_id: " + student_id,
                    code: 999
                });
            }

		});
	});
});

//Move student into a room, given Student ID and Room ID
router.put('/moveIntoRoom', (req, res) => {
    //Extract variables from the request
    var student_id = parseInt(req.session.loginInfo.username);
    console.log("body_id from server");
    console.log(req.body);
    var room_id = req.body.room_id;
    console.log(room_id);

    pool.getConnection((err, connection) => {
        let queryString = "UPDATE student SET room_id = ? WHERE student_id = ?";
        connection.query(queryString, [room_id, student_id], (err, results, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            connection.release();
            return res.json({success: true, result: room_id});
        });
    });
});

//Move student out of a room, given Student ID
router.put('/moveOutOfRoom', (req, res) => {
    //Extract variables from the request
    var student_id = parseInt(req.session.loginInfo.username);

    pool.getConnection((err, connection) => {
        let queryString = "UPDATE student SET room_id = NULL WHERE student_id = ?";
        connection.query(queryString, [student_id], (err, results, fields) => {
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

export default router;
