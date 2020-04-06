var express = require('express');
var router = express.Router();

router.get('/compareProjects', function(req, res) {
	res.sendFile('/compareProjects.html', {root : './Views'});
});

module.exports = router;