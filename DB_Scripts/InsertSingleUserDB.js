var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true }, function(err, db) {
	if (err) throw err;
	var dbo = db.db("DB");

	dbo.collection("Users").insertOne( 
		{ _id: "Amudha4", passw: "Amudha4", group:"4"}, 

		function(err, res)	{
			if (err) throw err;
			db.close();
		});
}); 


