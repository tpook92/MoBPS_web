var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true }, function(err, db) {
	if (err) throw err;
	var dbo = db.db("DB");
	var myobj = [];
	for(let i=1;i<=15; i++){
		myobj.push({_id: "Test1"+i, passw: "Test1"+i});
	}
	dbo.collection("Users").insertMany(myobj, function(err, res) {
		if (err) throw err;
		console.log(res);
		db.close();
	});
}); 
