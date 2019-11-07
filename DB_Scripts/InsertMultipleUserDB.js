var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true }, function(err, db) {
	if (err) throw err;
	var dbo = db.db("DB");
	var myobj = [];
	for(let i=86;i<=90; i++){
		myobj.push({_id: "GWDG"+i, passw: "GWDG"+i});
	}
	dbo.collection("Users").insertMany(myobj, function(err, res) {
		if (err) throw err;
		console.log(res);
		db.close();
	});
}); 
