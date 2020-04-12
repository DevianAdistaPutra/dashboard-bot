const express = require('express'),
      router = express.Router(),
      db = require('quick.db');
      
router.get('/settings/autonick', (req,res) => {
if (!req.user) return res.redirect('/api/discord/login');
else
res.render('autonick.ejs', { db: db, req: req, res: res });
});

module.exports = router;
