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
router.get('${dormID}', (req, res) => {
    //Extract variables from the request
    var dorm_id = req.params.dormID;

    pool.getConnection((err, connection) => {
        let queryString = "SELECT * FROM room WHERE dorm_id = ? ORDER BY room_id ASC, floor ASC";
        connection.query(queryString, [dorm_id], (err, results, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            queryString = "SELECT MAX(floor) FROM room WHERE dorm_id = ?";
            connection.query(queryString, [dorm_id], (err, maxFloor, fields) => {
                connection.release();
                return res.json({results: results, maxFloor: maxFloor});
            });
        });
    });
});

//Move student into a room, given Student ID and Room ID
router.post('/moveIntoRoom', (req, res) => {
    //Extract variables from the request
    var student_id = parseInt(req.session.loginInfo.username);
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

//Move student out of a room, given Student ID
router.post('/moveOutOfRoom', (req, res) => {
    //Extract variables from the request
    var student_id = parseInt(req.session.loginInfo.username);

    pool.getConnection((err, connection) => {
        let queryString = "UPDATE student SET room_id = NULL WHERE student_id = ?";
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
router.get('/${roomID}', (req, res) => {
    //Extract variables from the request
    var room_id = req.params.roomID;

    pool.getConnection((err, connection) => {
        let queryString = "SELECT * FROM room WHERE room_id = ?";
        connection.query(queryString, [room_id], (err, roomInfo, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            queryString = "SELECT * FROM commentary WHERE room_id = ? ORDER BY date";
            connection.query(queryString, [room_id], (err, comments, fields) => {
                if (err) {
                    connection.release();
                    console.log(err);
                    throw err;
                }
                queryString = "SELECT first_name, last_name, phonenumber FROM student WHERE room_id = ? ORDER BY student_id";
                connection.query(queryString, [room_id], (err, students, fields) => {
                    if (err) {
                        connection.release();
                        console.log(err);
                        throw err;
                    }
                    connection.release();
                    return res.json({roomInfo: roomInfo[0], students: students, comments: comments});
                });

            });
        });
    });
});

export default router;
