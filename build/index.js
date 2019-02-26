"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _meal = _interopRequireDefault(require("./routes/meal.routes"));

var _menu = _interopRequireDefault(require("./routes/menu.routes"));

var _order = _interopRequireDefault(require("./routes/order.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Routes
var app = (0, _express.default)();
var PORT = process.env.PORT || 9000;
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  res.status(200).send({
    status: 200,
    message: 'Welcome to Book-A-Meal API version 1 (v1)!!!'
  });
});
app.use('/api/v1/meals', _meal.default);
app.use('/api/v1/menus', _menu.default);
app.use('/api/v1/orders', _order.default);
app.listen(PORT);
console.log("Server running on port ".concat(PORT));
var _default = app;
exports.default = _default;
//# sourceMappingURL=index.js.map