var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true }, function(err, db) {
	if (err) throw err;
	var dbo = db.db("DB");
	
	dbo.collection("Users").updateOne({_id: "Amudha3"},
		{$set : {group:"3"}}, 
		{upsert:true});
		
		if (err) throw err;
		db.close();
	}); 
