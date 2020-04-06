var express = require('express');
var router = express.Router();

router.get('/home', function(req, res) {
	res.sendFile('/home.html', {root : './Views'});
});

module.exports = router;