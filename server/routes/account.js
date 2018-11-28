import express from 'express';
import pool from './config.js';
// import Account from '../models/account';

const router = express.Router();

/*
    ACCOUNT SIGNUP: POST /api/account/signup
    BODY SAMPLE: { "studentID": "test", "password": "test" }
    ERROR CODES:
        1: BAD USERNAME
        2: BAD PASSWORD
        3: USERNAME EXISTS
*/
router.post('/signup', (req, res) => {
    // CHECK USERNAME FORMAT
    let usernameRegex = /^\d{9}$/;

    if (!usernameRegex.test(req.body.studentID)) {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        });
    }

    // CHECK PASS LENGTH
    if (req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    // CHECK USER EXISTANCE

    pool.getConnection((err, connection) => {
      if (err) throw err;

      let queryString = "SELECT * FROM user_tbl WHERE Student_ID = ?";
      // use the connection
      connection.query(queryString, req.body.studentID, (err, results, fields) => {
        // when done with the connection, release interval
        connection.release();

        // handle error after the release
        if (err) throw err;

        if (results.length() != 0) {
          return res.status(409).json({
            error: "USERNAME EXISTS",
            code: 3
          });
        }
      });

      let queryString =
      `INSERT INTO user_tbl (Student_ID, First_Name, Last_Name, Age, Major, Club, Phone_Number, Room_ID) VALUES ("`
					+ req.body.studentID + '","'
          + req.body.firstName + '","'
          + req.body.lastName + '","'
          + (req.body.age == null ? 'NULL' : req.body.age) + '","'
          + (req.body.major == null ? 'NULL' : req.body.age) + '","'
          + req.body.club + '","'
          + req.body.roomID + '","'
					+ req.body.password + '");';


    })
    // Account.findOne({ username: req.body.username }, (err, exists) => {
    //     if (err) throw err;
    //     if (exists) {
    //         return res.status(409).json({
    //             error: "USERNAME EXISTS",
    //             code: 3
    //         });
    //     }
    //
    //     // CREATE ACCOUNT
    //     let account = new Account({
    //         username: req.body.username,
    //         password: req.body.password
    //     });
    //
    //     account.password = account.generateHash(account.password);
    //
    //     // SAVE IN THE DATABASE
    //     account.save( err => {
    //         if (err) throw err;
    //         return res.json({ success: true });
    //     });
    // });
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
    Account.findOne({ username: req.body.username }, (err, account) => {
        if (err) throw err;

        // CHECK ACCOUNT EXISTANCY
        if (!account) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // CHECK WHETHER THE PASSWORD IS VALID
        if (!account.validateHash(req.body.password)) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // ALTER SESSION
        let session = req.session;
        session.loginInfo = {
            _id: account._id,
            username: account.username
        };

        // RETURN SUCCESS
        return res.json({
            success: true
        });
    });
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
