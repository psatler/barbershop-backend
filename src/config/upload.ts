import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX'); // hashing the file
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

// import multer from 'multer';
// import crypto from 'crypto'; // nodejs lib
// import { extname, resolve } from 'path'; // nodejs lib

// // exporting a configuration object
// export default {
//   storage: multer.diskStorage({
//     destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
//     filename: (req, file, callback) => {
//       // try to hash the file name
//       crypto.randomBytes(16, (err, res) => {
//         if (err) {
//           callback(err);
//         }

//         const fileName = res.toString('hex') + extname(file.originalname);
//         return callback(null, fileName);
//       });
//     },
//   }),
// };
