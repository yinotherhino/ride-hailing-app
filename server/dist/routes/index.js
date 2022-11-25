"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.status(200).json({ message: 'Welcome to the API' });
});
exports.default = router;
