var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true }, function(err, db) {
	if (err) throw err;
	var dbo = db.db("DB");
	var myobj = [];
	for(let i=21;i<=30; i++){
		myobj.push({_id: "EAAPguest", passw: "eaap2019"});
	}
	dbo.collection("Users").insertMany(myobj, function(err, res) {
		if (err) throw err;
		console.log(res);
		db.close();
	});
}); 
