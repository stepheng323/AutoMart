"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.fileFilter = exports.storage = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var storage = _multer["default"].diskStorage({
  filename: function filename(req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  }
});

exports.storage = storage;

var fileFilter = function fileFilter(req, file, callback) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback({
      message: 'filetype not allowed'
    }, false);
  }
};

exports.fileFilter = fileFilter;
var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: fileFilter,
  limits: 1024 * 1024 * 2
});
exports.upload = upload;

_cloudinary["default"].config({
  cloud_name: 'stepheng323',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});