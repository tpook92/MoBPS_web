var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
'use strict';
const exec = require('child_process').exec;
const fileUpload = require('express-fileupload');

var MongoClient = require('mongodb').MongoClient;
var urldb = "mongodb://localhost:27017/";

const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(express.static('public'))

app.use(fileUpload());

app.use(session({
	store: new MongoStore({
		url: urldb
	}),
	secret: 'blablup12334',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 6*60*60*1000 }
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/mobps_login.html'));
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("DB");
			dbo.collection("Users").find({_id: username, passw:password}).toArray(function(err, result){
				if(result.length > 0){
					request.session.loggedin = true;
					request.session.username = username;
					db.close();	
					response.redirect('/home');					
				} else {
					db.close();	
					response.send('Incorrect Username and/or Password!');
				}	
			});
		}); 
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/mobps.html'));
	} else {
		response.send('Please login to view this page!');
	}
});

app.get('/user', function(request, response) {
	if (request.session.loggedin) {
		response.send(request.session.username);
	} else {
		response.send('');
	}
});

app.get('/logout', function(request, response) {
	if (request.session.loggedin) {
		request.session.destroy();
		response.redirect('/');
		response.end();
	} else {
		response.send('already logout!');
	}
});

app.post('/database', function(request, response) {
	if (request.session.loggedin) {
		MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("DB");
			dbo.collection(request.session.username).find({}).toArray(function(err, result){
				if (err) throw err;
				db.close();	
				response.send(result);		
			});
		}); 
	} else {
		response.send('');
	}
});


// Run R simulation:
app.post('/Rsim', function(request, response) {
	
	request.setTimeout(60*60*1000);

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Rsim1.r') + " --args "+ JSON.stringify(request.body.jsondata) +"";
	console.log(command);
		
	exec(command, {maxBuffer: 5000*1024},function(err, stdout, stderr){
		if(err){
			console.log(err);
			response.send(stderr);
		}else{
			response.send(stdout);
		}
	});

		

});

// Run R simulation, old funtion, not used anymore, but kept in case of new bugs:
app.post('/Rsim1', function(request, response) {
	//write content of request.body.jsondata; in a textfile:
		request.setTimeout(60*60*1000);
		var textfile = path.join(__dirname + '/Rmodules/UserScripts/') + request.session.username +'.txt';
		fs.writeFile(textfile, request.body.jsondata, function(err){
			if (err){
				console.log(err);
				response.send(err);
			}
			console.log("written");
			
			var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Rsim.r') + " --args "+ textfile +"";
			console.log(command);
			
			exec(command, {maxBuffer: 5000*1024},function(err, stdout, stderr){
				if(err){
					console.log(err);
					response.send(stderr);
				}else{
					response.send(stdout);
				}
			});
			
		});
		

});


// Uploading Map Data:
app.post('/MapUpload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.mapFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(path.join(__dirname + '/UserMaps/')+req.session.username +"_"+sampleFile.name , function(err) {
    if (err)
      return res.status(500).send(err);
	console.log(sampleFile.name);
    res.send('File uploaded!');
  });
});

// Uploading Geno Data:
app.post('/GenoUpload', function(req, res) {	
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.genoFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(path.join(__dirname + '/UserGenos/')+req.session.username +"_"+sampleFile.name , function(err) {
    if (err)
      return res.status(500).send(err);
	console.log(sampleFile.name);
    res.send('File uploaded!');
  });
});

// Get Data for Plotting
app.post('/JSON', function(request, response) {
	//request.body.file
	var textfile = path.join(__dirname + '/Rmodules/UserScripts/') + request.body.file + '.json';
	fs.readFile(textfile, function(err, data){
		if(err){
			response.send('');
		}else{
			response.send(data);
		}
	});
});

// saving Project:
app.post('/save', function(request, response) {
	console.log(request.body);
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var myobj = {name: request.body.name, json: JSON.parse(request.body.jsondata)};
		dbo.collection(request.session.username).insertOne(myobj, function(err, result){
			if (err) throw err;
			console.log("1 document inserted");
			console.log(result);
			db.close();			
		});
	}); 
	response.end();
});

// update Project:
app.post('/update', function(request, response) {
	console.log(request.body);
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var myquery = {name: request.body.name };
		var newvalues = {$set: {json: JSON.parse(request.body.jsondata)}};
		dbo.collection(request.session.username).updateOne(myquery, newvalues, function(err, result){
			if (err) throw err;
			console.log("1 document updated");
			console.log(result);
			db.close();			
		});
	}); 
	response.end();
});


var server = app.listen(8050);
server.setTimeout(60*60*1000);


