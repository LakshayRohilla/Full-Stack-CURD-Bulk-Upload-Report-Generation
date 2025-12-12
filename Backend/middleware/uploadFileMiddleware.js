import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage(); // we parse buffer, no disk persistence
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.xlsx' || ext === '.xls') cb(null, true);
  else cb(new Error('Only Excel files are allowed (.xls, .xlsx)'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

export default upload;