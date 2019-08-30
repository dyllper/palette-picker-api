const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const uploadController = require('./controllers/uploadController');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));

app.use('/images', express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/upload', (req, res) => {
  uploadController.uploadImage(req, res);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app is running on port ${PORT}`);
});
