import bcrypt from 'bcryptjs';
import express from 'express';
import pool from '../config.js';
// import Account from '../models/account';

const router = express.Router();

router.post('/signup', (req, res) => {
    const id = parseInt(req.body.studentID);
    const pw = req.body.password;
    const fn = req.body.firstName;
    const ln = req.body.lastName;
    const age = req.body.age === '' ? null : parseInt(req.body.age);
    const maj = req.body.major === '' ? null : req.body.major;
    const club = req.body.club === '' ? null : req.body.club;
    const pn = req.body.phoneNumber === '' ? null : req.body.phoneNumber;

    // CHECK USERNAME FORMAT
    const idRegex = /^\d{8}$/;

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

        let queryString = "SELECT * FROM STUDENT WHERE student_id = ?";
        // use the connection
        connection.query(queryString, [id], (err, results, fields) => {
            if (err) throw err;

            if (results.length != 0) {
                return res.status(409).json({
                    error: "USERNAME EXISTS",
                    code: 3
                });
            }

            queryString = "INSERT INTO STUDENT SET student_id = ?, pw = ?, room_id = ?, first_name = ?, last_name = ?, age = ?, major = ?, phonenumber = ?";

            connection.query(queryString, [id, pw, null, fn, ln, age, maj, pn], (err, results, fields) => {
                if (err) throw err;
                //Add NULL preference also when registering
                queryString = "INSERT INTO preference set student_id = ?";
                connection.query(queryString, [id], (err, results, fields) => {
                    if (err) throw err;
                    connection.release();
                })
        });
        return res.json({ success: true });
      });

    });
});

/*
    ACCOUNT SIGN IN: POST /api/account/signin
    BODY SAMPLE: { "studentID": "test", "password": "test" }
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

      let queryString = "SELECT * FROM STUDENT WHERE student_id = ?";
      // use the connection
      connection.query(queryString, [req.body.studentID], (err, results, fields) => {
        // when done with the connection, release interval
        connection.release();

        // handle error after the release
        if (err) throw err;

        // CHECK ACCOUNT EXISTANCY
        if (results.length === 0) {
          return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
          });
        }

        // CHECK WHETHER THE PASSWORD IS VALID
        // if (!bcrypt.compareSync(req.body.password, results[0].Password)) {
        if (req.body.password !== results[0].pw) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // ALTER SESSION
        let session = req.session;
        session.loginInfo = {
            _id: req.body.studentID,
            username: req.body.studentID,
        };

        // RETURN SUCCESS
        return res.json({ success: true });
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
