const formidable = require('formidable');
const fs = require('fs');

const config = require('../config');

const uploadImage = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.type = 'multipart';
  form.parse(req, (err, fields, files) => {
    if (err) throw err;
    const fileToUpload = files.fileupload;
    const oldPath = fileToUpload.path;
    const newPath = `${config.uploadDir}${fileToUpload.name}`;
    fs.rename(oldPath, newPath, (moveErr) => {
      if (moveErr) throw moveErr;
      res.json('File uploaded and moved!');
    });
  });
};

module.exports = {
  uploadImage,
};
