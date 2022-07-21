import multer = require("multer")


const diskStorage = multer.diskStorage({
    destination: 'images',
    filename: (req, file, cb) => {
      const fileName = file.originalname;
      cb(null, fileName);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  };
  
  const storage = multer({ storage: diskStorage, fileFilter: fileFilter }).single(
    'imagePath'
  );

  export default storage;
  