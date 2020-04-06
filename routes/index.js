var express = require('express');
var router = express.Router();

/* get mobps Login page. */
router.get('/', function(req, res) {
	res.sendFile('/login.html', {root : './Views'});
});

module.exports = router;

