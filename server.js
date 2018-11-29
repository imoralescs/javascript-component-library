const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  // To check if a file exists in an asynchronous way
  // fs.access(), which checks the existence of a file without opening it
  fs.access(`./dist${req.url}.html`, fs.F_OK, (error) => {
    if (error) {
      res.sendFile(`${__dirname}/dist/index.html`);
      return;
    }

    res.sendFile(`${__dirname}/dist${req.url}.html`);
  });
});

app.listen(PORT, HOST);
// eslint-disable-next-line no-console
console.log(`Running on http://${HOST}:${PORT}`);
