const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const util = require('util');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get all directories
app.get('/components', (req, res) => {
  fs.readdir('src/library', (err, items) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ directories: items });
  });
});

// Get directory with files
app.get('/components/:directory', (req, res) => {
  if (fs.existsSync(`src/library/${req.params.directory}`)) {
    fs.readdir(`src/library/${req.params.directory}`, (fileErr, fileItems) => {
      const resp = fileItems.map(async (file) => {
        const obj = {};
        const fileType = file.replace(/^.*\./, '');
        const result = await readFile(`src/library/${req.params.directory}/${file}`);
        obj[fileType] = result.toString();
        return obj;
      });

      Promise.all(resp)
        .then((result) => {
          const re = [];
          result.forEach((content) => {
            re.push(content);
          });
          res.setHeader('Content-Type', 'application/json');
          res.json({ files: re });
        })
        .catch((error) => {
          res.setHeader('Content-Type', 'application/json');
          res.json({ error });
        });
    });
  }
  else {
    res.setHeader('Content-Type', 'application/json');
    res.json({ error: 'Directory not founds' });
  }
});

// Create directories with files
app.post('/components', (req, res) => {
  if (req.body.name !== '') {
    fs.mkdir(`src/library/${req.body.name}`, { recursive: true }, (error) => {
      if (error) {
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: 'Directory already exists' });
      }
      else {
        Object.keys(req.body.files).forEach((key) => {
          fs.writeFile(`src/library/${req.body.name}/${req.body.files[key].name}.${key}`, req.body.files[key].source, (err) => {
            if (err) throw err;
          });
        });
        res.setHeader('Content-Type', 'application/json');
        res.json({ 200: 'OK' });
      }
    });
  }
  else {
    res.json({ error: 'Directory name required' });
  }
});

// Update directories with files
app.put('/components/:directory', (req, res) => {
  fs.readdir('src/library', (directoryErr, directoryItems) => {
    res.setHeader('Content-Type', 'application/json');
    let directory = '';
    for (let i = 0; i < directoryItems.length; i += 1) {
      if (directoryItems[i] === req.params.directory) {
        directory = directoryItems[i];
      }
    }
    if (directory.length > 0) {
      Object.keys(req.body.files).forEach((key) => {
        fs.writeFile(`src/library/${req.body.name}/${req.body.files[key].name}.${key}`, req.body.files[key].source, (err) => {
          if (err) throw err;
        });
      });
      res.json({ directory: 'Update' });
    }
    else {
      res.json({ directory: 'No founds' });
    }
  });
});

app.get('/sw.js', (req, res) => {
  res.sendFile(`${__dirname}/dist/js/service-worker.bundle.js`);
});

// Get pages
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
