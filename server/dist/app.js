"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = require("./config/index");
const cors_1 = __importDefault(require("cors"));
index_1.db.sync().then(() => {
    console.log('Database connected');
}).catch(err => {
    console.log(err);
});
const index_2 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const driver_1 = __importDefault(require("./routes/driver"));
const app = (0, express_1.default)();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, cors_1.default)());
app.use('/', index_2.default);
app.use('/users', users_1.default);
app.use('/driver', driver_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
exports.default = app;
