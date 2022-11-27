"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driverController_1 = require("../controllers/driverController");
const router = express_1.default.Router();
/* GET driver listing. */
router.post('/register', driverController_1.DriverRegister);
router.post('/verify/:signature', driverController_1.verifyDriver);
router.post('/login', driverController_1.DriverLogin);
exports.default = router;
