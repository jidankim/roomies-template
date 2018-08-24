import express from 'express';
import Event from '../models/event';
import mongoose from 'mongoose';

const router = express.Router();

/*
    WRITE EVENT: POST /api/event
    BODY SAMPLE: {
                    eventName: "event",
                    endDate: 2018-08-27T00:00:00.000Z,
                    startDate: 2018-08-20T00:00:00.000Z
                 }
    ERROR CODES
        1: NOT LOGGED IN
        2: EMPTY CONTENTS
*/
router.post('/', (req, res) => {
    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if (typeof req.body.eventName !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.eventName === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CREATE NEW EVENT 
    let event = new Event({
        writer: req.session.loginInfo.username,
        eventName: req.body.eventName,
        endDate: new Date(req.body.endDate),
        startDate: new Date(req.body.startDate)
    });

    // SAVE IN DATABASE
    event.save( err => {
        if (err) throw err;
        return res.json({ success: true });
    });
});

/*
    MODIFY EVENT: PUT /api/event/:id
    BODY SAMPLE: { 
                    eventName: "event",
                    endDate: 2018-08-27T00:00:000.Z,
                    startDate: 2018-08-20T00:00:000Z
                 }
    ERROR CODES
        1: INVALID ID,
        2: EMPTY CONTENTS
        3: NOT LOGGED IN
        4: NO RESOURCE
        5: PERMISSION FAILURE
*/
router.put('/:id', (req, res) => {
    // CHECK EVENT ID VALIDITY
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if (typeof req.body.eventName !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.eventName === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 3
        });
    }

    // FIND EVENT
    Event.findById(req.params.id, (err, event) => {
        if (err) throw err;

        // IF EVENT DOES NOT EXIST
        if (!event) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        // IF EXISTS, CHECK WRITER
        if (event.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 5
            });
        }

        // MODIFY AND SAVE IN DATABASE
        event.eventName = req.body.eventName;
        event.endDate = new Date(req.body.endDate);
        event.startDate = new Date(req.body.startDate);

        event.save((err, event) => {
            if (err) throw err;
            return res.json({
                success: true,
                event
            });
        });
    });
});

/*
    DELETE EVENT: DELETE /api/event/:id
    ERROR CODES
        1: INVALID ID
        2: NOT LOGGED IN
        3: NO RESOURCE
        4: PERMISSION FAILURE
*/
router.delete('/:id', (req, res) => {
    // CHECK EVENT ID VALIDITY
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // FIND EVENT AND CHECK FOR WRITER
    Event.findById(req.params.id, (err, event) => {
        if (err) throw err;

        if (!event) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        if (event.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 4
            });
        }

        // REMOVE THE EVENT
        Event.remove({ _id: req.params.id }, err => {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

/*
    READ EVENT: GET /api/event/:month
*/
router.get('/:month', (req, res) => {
    let month = parseInt(req.params.month);
    let loginInfo = req.session.loginInfo;
    let writerShow = ['admin'];
    if (loginInfo !== undefined && loginInfo.username !== 'admin')
        writerShow.push(req.session.loginInfo.username);

    Event.find({ writer: { $in: writerShow }, "$expr": { "$eq": [{ "$month" : "$endDate" }, month] } }) 
    .sort({endDate: 1})
    .exec((err, events) => {
        if (err) throw err; 
        res.json(events);
    });
});

export default router;
