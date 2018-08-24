import express from 'express';
import Event from '../models/event';
import mongoose from 'mongoose';

const router = express.Router();

/*
    WRITE EVENT: POST /api/event
    BODY SAMPLE: { contents: { 
                    eventName: "event",
                    endDate: "2018-08-20",
                    startDate: "2018-08-27" }
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
    if (typeof req.body.contents.eventName !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.contents.eventName === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CREATE NEW EVENT 
    let event = new Event({
        writer: req.session.loginInfo.username,
        eventName: req.body.contents.eventName,
        endDate: req.body.contents.endDate,
        startDate: req.body.contents.startDate
    });

    // SAVE IN DATABASE
    event.save( err => {
        if (err) throw err;
        return res.json({ success: true });
    });
});

/*
    MODIFY EVENT: PUT /api/event/:id
    BODY SAMPLE: { contents: { 
                    eventName: "event",
                    endDate: "2018-08-20",
                    startDate: "2018-08-27" }
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
    if (typeof req.body.contents.eventName !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if (req.body.contents.eventName === "") {
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
        event.eventName = req.body.contents.eventName;
        event.endDate = req.body.contents.endDate;
        event.startDate = req.body.contents.startDate;

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
    READ EVENT: GET /api/event
*/
router.get('/', (req, res) => {
    Event.find({ writer: { $in: ['admin', req.session.loginInfo.username] } })
    .sort({endDate: 1})
    .limit(6)
    .exec((err, events) => {
        if (err) throw err;
        res.json(events);
    });
});

/*
    READ ADDITIONAL (OLD/NEW) EVENT: GET /api/event/:listType/:id
*/
router.get('/:listType/:id', (req, res) => {
    let listType = req.params.listType;
    let id = req.params.id;

    // CHECK LIST TYPE VALIDITY
    if (listType !== 'old' && listType !== 'new') {
        return res.status(400).json({
            error: "INVALID LISTTYPE",
            code: 1
        });
    }

    // CHECK EVENT ID VALIDITY
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 2
        });
    }

//    let objId = new mongoose.Types.ObjectId(req.params.id);
    let reqEndDate = '';
    Event.findById(id, (err, event) => {
        if (err) throw err;
        reqEndDate = event.endDate;
        console.log(reqEndDate);
    });

    if (listType === 'new') {
        // GET NEWER EVENT
        Event.find({ endDate: { $gt: reqEndDate }}) 
        .sort({ endDate: 1 })
        .limit(6)
        .exec((err, events) => {
            if (err) throw err;
            console.log(events);
            return res.json(events);
        });
    } else {
        // GET OLDER EVENT
        Event.find({ endDate: { $gt: reqEndDate }})
        .sort({ endDate : 1 })
        .limit(6)
        .exec((err, events) => {
            if (err) throw err;
            return res.json(events);
        });
    }
});

export default router;
