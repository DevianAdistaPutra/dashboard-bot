require('./index.js'); // bot

const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-discord').Strategy;

passport.deserializeUser(function(obj, done) {
done(null, obj);
});

passport.serializeUser(function(user, done) {
done(null, user);
});

let scopes = ['guilds','email','identify'];

passport.use(new Strategy({
clientID: process.env.ID,
clientSecret: process.env.Recipe,
callbackURL: process.env.Colibek,
scope: scopes
}, function(accessToken, refreshToken, profile, done) {
process.nextTick(function() {
return done(null, profile);
});
}));

app.get('/', (req, res) => {
res.sendStatus(200);
});

app.listen(27045);
