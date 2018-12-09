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
router.get('/:dormID', (req, res) => {
    //Extract variables from the request
    var dorm_id = req.params.dormID;

    pool.getConnection((err, connection) => {
        let queryString = "SELECT * FROM room WHERE dorm_id = ? ORDER BY floor ASC, room_id ASC";
        connection.query(queryString, [dorm_id], (err, results, fields) => {
            if (err) {
                connection.release();
                console.log(err);
                throw err;
            }
            queryString = "SELECT MAX(floor) FROM room WHERE dorm_id = ?";
            connection.query(queryString, [dorm_id], (err, maxFloor, fields) => {
                if (err) {
                    connection.release();
                    console.log(err);
                    throw err;
                }
                connection.release();
                //Group resulting rooms into same floors
                var rooms = [];
                var floorRooms = [];
                var currentFloor = 1;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].floor > currentFloor) {
                        currentFloor++;
                        rooms.push(floorRooms);
                        floorRooms = [];
                    }
                    floorRooms.push(results[i]);
                }
                if (floorRooms.length != 0) {
                    rooms.push(floorRooms);
                }

                console.log(rooms);
                return res.json({results: rooms, maxFloor: maxFloor});
            });
        });
    });
});

//Get all information and comments of a room, given Room ID
router.get('/:dormID/:roomID', (req, res) => {
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
            console.log("ROOMINFO");
            console.log(roomInfo);
            queryString = "SELECT * FROM commentary WHERE room_id = ? ORDER BY date";
            connection.query(queryString, [room_id], (err, comments, fields) => {
                if (err) {
                    connection.release();
                    console.log(err);
                    throw err;
                }
                console.log("COMMENTS");
                console.log(comments);
                queryString = "SELECT first_name, last_name, phonenumber FROM student WHERE room_id = ? ORDER BY student_id";
                connection.query(queryString, [room_id], (err, students, fields) => {
                    if (err) {
                        connection.release();
                        console.log(err);
                        throw err;
                    }
                    console.log("STUDENTS");
                    console.log(students);
                    connection.release();
                    return res.json({roomInfo: roomInfo[0], students: students, comments: comments});
                });

            });
        });
    });
});

export default router;
