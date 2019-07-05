const formidable = require('formidable');
const Clarifai = require('clarifai');
const fs = require('fs');

const config = require('../config');

const clarifaiApp = new Clarifai.App({
  apiKey: 'keyGoesHere',
});

const parseFile = req => new Promise((resolve, reject) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.type = 'mutlipart';
  form.parse(req, (err, fields, files) => {
    if (err) reject(err);
    resolve(files.fileupload);
  });
});

const convertFileToBytes = file => new Promise((resolve, reject) => {
  try {
    const byteFile = Buffer.from(fs.readFileSync(file.path)).toString('base64');
    resolve(byteFile);
  } catch (err) {
    reject(err);
  }
});

const makeClarifaiCall = (res, byteFile) => {
  console.log('About to call clarifai');
  clarifaiApp.models.predict(Clarifai.COLOR_MODEL, { base64: byteFile })
    .then((response) => {
      console.log(response);
      res.json(response);
    }).catch(err => res.status(400).json(err));
};

const uploadImage = (req, res) => {
  parseFile(req)
    .then(file => convertFileToBytes(file))
    .then(fileBytes => makeClarifaiCall(res, fileBytes))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  uploadImage,
};
