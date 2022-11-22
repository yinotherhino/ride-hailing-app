"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocationControllers_1 = require("../controllers/LocationControllers");
var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/book-ride', LocationControllers_1.bookRide);
exports.default = router;
