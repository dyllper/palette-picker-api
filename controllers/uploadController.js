const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const Vibrant = require('node-vibrant');

const parseFile = req => new Promise((resolve, reject) => {
  const uploadDir = path.join(__dirname, '/../public');
  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
    type: 'multipart',
  });
  form.parse(req, (err, fields, files) => {
    if (err) reject(err);
    const { image } = files;
    const newFileName = `${uploadDir}\\${image.name}`;
    fs.renameSync(image.path, newFileName);
    image.path = newFileName;
    resolve(image);
  });
});

const getHexValues = palette => new Promise((resolve, reject) => {
  const {
    LightVibrant, DarkVibrant, Muted, LightMuted, DarkMuted,
  } = palette;
  const vibrantColor = palette.Vibrant;
  const hexColors = [];
  try {
    hexColors.push(vibrantColor.getHex());
    hexColors.push(LightVibrant.getHex());
    hexColors.push(DarkVibrant.getHex());
    hexColors.push(Muted.getHex());
    hexColors.push(LightMuted.getHex());
    hexColors.push(DarkMuted.getHex());
    resolve(hexColors);
  } catch (err) {
    reject(err);
  }
});

const uploadImage = (req, res) => {
  parseFile(req)
    .then(file => Vibrant.from(file.path).getPalette())
    .then(palette => getHexValues(palette))
    .then(hexColors => res.json({ hexColors }))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  uploadImage,
};
