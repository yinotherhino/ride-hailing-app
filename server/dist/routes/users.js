"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
const LocationControllers_1 = require("../controllers/LocationControllers");
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/book-ride', LocationControllers_1.bookRide);
/* GET users listing. */
router.post('/register', userController_1.UserRegister);
router.post('/verify/:signature', userController_1.verifyUser);
router.post('/login', userController_1.UserLogin);
exports.default = router;
