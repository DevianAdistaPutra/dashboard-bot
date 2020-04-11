const express = require('express'),
      router = express.Router();
      
router.get('/settings/autonick', (req,res) => {
if (!req.user) return res.redirect('/api/discord/login');
else
res.render('autonick.ejs', { req: req, res: res });
});

module.exports = router;
