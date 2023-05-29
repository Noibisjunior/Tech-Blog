const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    // callback(null,req.body.name)
    // callback(null, Date.now() + '-' + path.extname(file.originalname));
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorage });
module.exports = upload;
