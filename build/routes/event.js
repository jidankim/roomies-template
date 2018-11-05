'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _event = require('../models/event');

var _event2 = _interopRequireDefault(_event);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/*
    WRITE EVENT: POST /api/event
    BODY SAMPLE: {
                    eventName: "event",
                    endDate: "2018-08-27",
                    startDate: "2018-08-20"
                 }
    ERROR CODES
        1: NOT LOGGED IN
        2: EMPTY CONTENTS
        3: INVALID DATES
*/
router.post('/', function (req, res) {
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

    // CHECK DATES VALID
    if (req.body.startDate > req.body.endDate) {
        return res.status(400).json({
            error: "INVALID DATES",
            code: 3
        });
    }

    // CREATE NEW EVENT 
    var cat = req.session.loginInfo.username === 'admin' ? 'c' : 'p';
    var event = new _event2.default({
        writer: req.session.loginInfo.username,
        category: cat,
        eventName: req.body.eventName,
        endDate: new Date(req.body.endDate),
        startDate: new Date(req.body.startDate)
    });

    // SAVE IN DATABASE
    event.save(function (err) {
        if (err) throw err;
        return res.json({ success: true });
    });
});

/*
    MODIFY EVENT: PUT /api/event/:id
    BODY SAMPLE: { 
                    eventName: "event",
                    endDate: "2018-08-27",
                    startDate: "2018-08-20"
                 }
    ERROR CODES
        1: INVALID ID,
        2: EMPTY CONTENTS
        3: INVALID DATES
        4: NOT LOGGED IN
        5: NO RESOURCE
        6: PERMISSION FAILURE
*/
router.put('/:id', function (req, res) {
    // CHECK EVENT ID VALIDITY
    if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
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

    // CHECK DATES VALID
    if (req.body.startDate > req.body.endDate) {
        return res.status(400).json({
            error: "INVALID DATES",
            code: 3
        });
    }

    // CHECK LOGIN STATUS
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 4
        });
    }

    // FIND EVENT
    _event2.default.findById(req.params.id, function (err, event) {
        if (err) throw err;

        // IF EVENT DOES NOT EXIST
        if (!event) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 5
            });
        }

        // IF EXISTS, CHECK WRITER
        if (event.writer != req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 6
            });
        }

        // MODIFY AND SAVE IN DATABASE
        event.eventName = req.body.eventName;
        event.endDate = new Date(req.body.endDate);
        event.startDate = new Date(req.body.startDate);

        event.save(function (err, event) {
            if (err) throw err;
            return res.json({
                success: true,
                event: event
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
router.delete('/:id', function (req, res) {
    // CHECK EVENT ID VALIDITY
    if (!_mongoose2.default.Types.ObjectId.isValid(req.params.id)) {
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
    _event2.default.findById(req.params.id, function (err, event) {
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
        _event2.default.remove({ _id: req.params.id }, function (err) {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

/*
    READ EVENT: GET /api/event/:month/:filter
*/
router.get('/:month/:filter', function (req, res) {
    var month = parseInt(req.params.month);
    var filter = req.params.filter;
    var loginInfo = req.session.loginInfo;
    var writerShow = ['admin'];
    var filterArray = filter === '' ? ['noSuchCategory'] : filter.split('');
    if (loginInfo !== undefined && loginInfo.username !== 'admin') writerShow.push(req.session.loginInfo.username);

    _event2.default.find({ writer: { $in: writerShow }, "$expr": { "$eq": [{ "$month": "$endDate" }, month] }, category: { $in: filterArray } }).sort({ endDate: 1 }).exec(function (err, events) {
        if (err) throw err;
        res.json(events);
    });
});

exports.default = router;