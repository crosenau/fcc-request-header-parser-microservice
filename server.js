'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

app.enable('trust proxy');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.static('public'));
app.use('/', (req, res, next) => {
  console.log(`${req.method} request made to "${req.path}" from "${req.ip}"`);
  next();
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.ip,
    language: req.get('accept-language'),
    software: req.get('user-agent')
  });
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
