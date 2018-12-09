//This file's purpose is to pre-write some of the functions in advance

import bcrypt from 'bcryptjs';
import express from 'express';
import pool from '../config.js';

const router = express.Router();

//Get all comments written so far, ordered by most recently written (uses JOIN query)
router.get('/getAllComments', (req, res) => {
    pool.getConnection((err, connection) => {
        let queryString = "SELECT commentary.date, commentary.room_id, commentary.comment_txt, student.first_name, student.last_name FROM commentary JOIN student ON commentary.student_id = student.student_id ORDER BY commentary.date DESC";
        connection.query(queryString, [], (err, results, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            connection.release();
            return res.json({comments: results});
        });
    });
});

//Get comments of a student, given Student ID
router.get('/getCommentsByStudentID', (req, res) => {
    //Extract variables from the request
    var student_id = parseInt(req.session.loginInfo.username);

    pool.getConnection((err, connection) => {
        let queryString = "SELECT * FROM commentary WHERE student_id = ?";
        connection.query(queryString, [student_id], (err, results, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            connection.release();
            return res.json({comments: results});
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

export default router;
