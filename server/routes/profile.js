//This file's purpose is to pre-write some of the functions in advance

import bcrypt from 'bcryptjs';
import express from 'express';
import pool from '../config.js';

const router = express.Router();

//Get Student Information, given Student ID
router.get('/:studentID', (req, res) => {
    //Extracting values from the request
    var student_id = parseInt(req.params.studentID);

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
    var student_id = parseInt(req.params.studentID);
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
router.get('/getPreference', (req, res) => {
    //Extracting values from the request
    var student_id = parseInt(req.session.logininfo.username);

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
    var student_id = parseInt(req.session.logininfo.username);
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

export default router;
