var express = require('express');
var router = express.Router();
	
router.get('/', function(req, res) {
	res.sendFile('/userList.html', {root : './Views'});
});

module.exports = router;
