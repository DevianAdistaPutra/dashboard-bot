'use strict';
require('./index.js'); // bot
require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-discord').Strategy;


app.set('x-powered-by', false);
app.set('view engine', 'ejs');
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

/* Sesi */
passport.use(session({
secret:'hansputera',
resave: false,
saveUninitialized: false
}));

app.use(passport.session());
app.use(passport.initialize());

app.get('/api/discord/login', passport.authenticate('discord', { scope: scopes }), function(req,res) {

});

app.get('/api/discord/colbek', passport.authenticate('discord', { failureRedirect: '/login' }), function(req,res) {
console.log(`[LOGIN] ${req.user.username}#${req.user.discriminator} telah login!`);
res.redirect('/');
});

app.get('/', (req, res) => {
res.sendStatus(200);
});

app.listen(27045);
