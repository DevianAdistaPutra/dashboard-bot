require('./index.js'); // bot

const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-discord').Strategy;

app.get('/', (req, res) => {
res.sendStatus(200);
});

app.listen(27045);
