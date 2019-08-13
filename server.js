const express = require('express');
const cors = require('cors');

const uploadController = require('./controllers/uploadController');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/upload', (req, res) => {
  uploadController.uploadImage(req, res);
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app is running on port ${process.env.PORT}`);
});
