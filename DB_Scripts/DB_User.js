var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/DB";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true }, function(error, db) {
  if (error) throw error;
  var dbo = db.db("DB");
  dbo.createCollection("Users", function(error, result){
	  if (error) throw error;
	  console.log("Collection created!");
	  db.close();
  })
});



