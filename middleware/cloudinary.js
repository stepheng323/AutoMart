import multer from 'multer';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback({ message: 'filetype not allowed' }, false);
  }
};

const upload = multer({ storage, fileFilter, limits: 1024 * 1024 * 2 });

cloudinary.config({
  cloud_name: 'stepheng323',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { storage, fileFilter, upload };
