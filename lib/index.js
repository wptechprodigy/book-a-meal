"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});
app.listen(port, () => console.log(`Server running on port ${port}`));