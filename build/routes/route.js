"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _cors = _interopRequireDefault(require("cors"));

var _signin = _interopRequireDefault(require("../controller/signin"));

var _signup = _interopRequireDefault(require("../controller/signup"));

var _createCar = _interopRequireDefault(require("../controller/createCar"));

var _postOrder = _interopRequireDefault(require("../controller/postOrder"));

var _checkAuth = _interopRequireDefault(require("../middleware/checkAuth"));

var _updateOrder = _interopRequireDefault(require("../controller/updateOrder"));

var _updatePrice = _interopRequireDefault(require("../controller/updatePrice"));

var _view = _interopRequireDefault(require("../controller/view"));

var _cloudinary = require("../middleware/cloudinary");

var _swagger = _interopRequireDefault(require("../../docs/swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use(_express["default"].json());
router.use(_express["default"].urlencoded({
  extended: false
}));
router.use('/api/v1/docs', _swaggerUiExpress["default"].serve);
router.get('/api/v1/docs', _swaggerUiExpress["default"].setup(_swagger["default"]));
router.use((0, _cors["default"])());
router.get('/', function (req, res) {
  res.status(200).json({
    status: 200,
    message: 'Welcome to my app'
  });
});
router.post('/api/v1/auth/signup', _signup["default"].createUser);
router.post('/api/v1/auth/signin', _signin["default"].signIn);
router.post('/api/v1/car', _checkAuth["default"], _cloudinary.upload.single('car_image'), _createCar["default"].createCar);
router.post('/api/v1/order', _checkAuth["default"], _postOrder["default"].createOrder);
router.patch('/api/v1/order/:id/price', _checkAuth["default"], _updateOrder["default"].updateOrders);
router.patch('/api/v1/car/:id/price', _checkAuth["default"], _updatePrice["default"].priceUpdate);
router.patch('/api/v1/car/:id/status', _checkAuth["default"], _updatePrice["default"].sold);
router.get('/api/v1/car/:id', _checkAuth["default"], _view["default"].specific);
router.get('/api/v1/car', _checkAuth["default"], _view["default"].soldOrAvailable);
router.get('/api/v1/car', _view["default"].unsold);
router.get('/api/v1/car', _view["default"].priceRange);
router["delete"]('/api/v1/car/:car_id', _checkAuth["default"], _view["default"].deleteCar);
var _default = router;
exports["default"] = _default;