var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
'use strict';
const exec = require('child_process').exec;
const { spawn } = require('child_process');
const fileUpload = require('express-fileupload');

var MongoClient = require('mongodb').MongoClient;
var urldb = "mongodb://localhost:27017/";

const MongoStore = require('connect-mongo')(session);

var mobpsLoginRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var compareProjectsRouter = require('./routes/compareProjects');

var app = express();

// socket for streaming R output:
var http = require('http').Server(app);
var io = require('socket.io')(http);

//app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mobpsLoginRouter);
app.use('/', homeRouter);
app.use('/', compareProjectsRouter);

app.use(fileUpload({
	limits: {fileSize: 1024*1024*1024 *1024},
	useTempFiles: true,
	tempFileDir: '/tmp/'
}));

app.use(session({
	store: new MongoStore({
		url: urldb
	}),
	secret: 'blablup12334',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 6*60*60*1000 }
}));
app.use(bodyParser.urlencoded({limit: '1000mb', extended : true}));
app.use(bodyParser.json({limit: '1000mb', extended: true}));

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
					request.session.usergroup = result[0]['group'];
					
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

app.get('/user', function(request, response) {
	if (request.session.loggedin) {
		response.send({username: request.session.username, usergroup: request.session.usergroup});		
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

// change Password:

app.get('/Change_Password', function(request, response) {
	response.sendFile(path.join(__dirname + '/changePW.html'));
});

app.post('/changePW', function(request, response) {
	if (request.session.loggedin) {
		MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("DB");
			var myquery = {_id: request.session.username, passw:request.body.oldpassw };
			console.log(myquery);
			var newvalues = {$set: {passw: request.body.newpassw1}};
			if(request.body.newpassw1 == request.body.newpassw2){
				dbo.collection("Users").updateOne(myquery, newvalues, function(err, result){
					if (err) throw err;
					console.log(result.result.nModified);
					if(result.result.nModified >0){ 	
						response.send("Password successfully changed.");
					}else{
						response.send("Error. Wrong password. Password was not changed");
					}
					db.close();	
				});		
			}else{
				response.send("New password and new password validation do not match. Password not changed.");
			}
		}); 
	}else {
		response.send('You must be logged in in order to change Password!');
	}
	//response.end();
});

app.post('/database', function(request, response) {
	if (request.session.loggedin) {
		MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("DB");
			dbo.collection(request.session.username).find({}).map(x => x.name).toArray(function(err, result){
				if (err) throw err;
				db.close();	
				response.send(result);		
			});
		}); 
	} else {
		response.send('');
	}
});

app.post('/loadproject', function(request, response) {
	if (request.session.loggedin) {
		MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("DB");
			var obj = {name: request.body.name};
			request.session.filename = request.body.name;
			dbo.collection(request.session.username).find(obj).toArray(function(err, result){
				if (err) throw err;
				db.close();	
				console.log(result);
				response.send(result);		
			});
		}); 
	} else {
		response.send('');
	}
});

app.post('/template_database', function(request, response) {
	if (request.session.loggedin) {
		MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("DB");
			dbo.collection("root").find({}).toArray(function(err, result){
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
	
	request.setTimeout(5*24*60*60*1000);

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Rsim1.r') + " --args "+request.session.username+" "+ JSON.stringify(request.body.jsondata) +"";
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

// Run R simulation Test with spawn:
app.post('/Rsim1', function(request, response) {
	
	request.setTimeout(5*24*60*60*1000);

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Rsim1.r') + " --args "+request.session.username+" "+ JSON.stringify(request.body.jsondata) +"";
	console.log(command);
	
	fs.writeFile(path.join(__dirname + '/Rmodules/UserScripts/'+ request.session.username+ '.sh'), command, function(err){
		if(err) console.log(err);
		exec("chmod 777 "+ path.join(__dirname + '/Rmodules/UserScripts/'+ request.session.username+ '.sh'),function(err, stdout, stderr){
			if(err){
				console.log(err);
			}else{
				startR();
			}
		})
	});
		
	startR = function(){

			const ps = spawn(path.join(__dirname + '/Rmodules/UserScripts/'+ request.session.username+ '.sh'));
			//ps.stdout.pipe(response);
			ps.stdout.on('data', function(data){
				//console.log(data.toString());
				response.write(data, 'utf-8');
				io.emit(request.session.username, data.toString());
			});	
			ps.stderr.on('data', function(data){
				//console.log(data.toString());
				response.write(data, 'utf-8');
			});	
			ps.on('close', function(code){
			  if (code !== 0) {
				console.log('ps process exited with code ${code}');
			  }
			  io.data = '';
			  response.end();
			});
	
	}
});

// Run R simulation Test with spawn:
app.post('/Rsim2', function(request, response) {
	
	request.setTimeout(5*24*60*60*1000);

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Rsim2.r') + " --args "+request.session.username+" "+ JSON.stringify(request.body.jsondata) +"";
	console.log(command);
	
	fs.writeFile(path.join(__dirname + '/Rmodules/UserScripts/'+ request.session.username+ '.sh'), command, function(err){
		if(err) console.log(err);
		exec("chmod 777 "+ path.join(__dirname + '/Rmodules/UserScripts/'+ request.session.username+ '.sh'),function(err, stdout, stderr){
			if(err){
				console.log(err);
			}else{
				startR();
			}
		})
	});
		
	startR = function(){

			const ps = spawn(path.join(__dirname + '/Rmodules/UserScripts/'+ request.session.username+ '.sh'));
			//ps.stdout.pipe(response);
			ps.stdout.on('data', function(data){
				//console.log(data.toString());
				response.write(data, 'utf-8');
				io.emit(request.session.username, data.toString());
			});	
			ps.stderr.on('data', function(data){
				//console.log(data.toString());
				response.write(data, 'utf-8');
			});	
			ps.on('close', function(code){
			  if (code !== 0) {
				console.log('ps process exited with code ${code}');
			  }
			  io.data = '';
			  response.end();
			});
	
	}
});



// Run R simulation:
app.post('/StopR', function(request, response) {
	
	request.setTimeout(5*24*60*60*1000);

	var command = 'pkill -f "args '+request.session.username+ '"';
	console.log(command);
		
	exec(command, {maxBuffer: 5000*1024},function(err, stdout, stderr){
		if(err){
			console.log(err);
			response.end();
		}else{
			response.end();
		}
	});
});


// Run R simulation: Calculate QTL Results
app.post('/RsimQTL', function(request, response) {
	
	request.setTimeout(5*24*60*60*1000);

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Results_QTL.r') + " --args "+request.session.username+ " '"+ request.body.filename + "' '"+ JSON.stringify(request.body.traitsinfo) + "'";
	console.log(command);
		
	exec(command, {maxBuffer: 5000*1024},function(err, stdout, stderr){
		if(err){
			console.log(err);
			response.send(stderr);
		}else{
			var textfile = path.join(__dirname + '/Rmodules/UserScripts/') +request.session.username+'_'+request.body.filename + 'QTL.json';
			fs.readFile(textfile, function(err, data){
				if(err){
					response.send('');
				}else{
					response.send(data);
				}
			});
		}
	});
});

app.post('/RsimQTLGroup', function(request, response) {
	
	request.setTimeout(5*24*60*60*1000);

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Results_QTLGroup.r') + " --args "+request.session.username+ " '"+ request.body.filename + "' '"+ JSON.stringify(request.body.traitsinfo) + "'";
	console.log(command);
		
	exec(command, {maxBuffer: 5000*1024},function(err, stdout, stderr){
		if(err){
			console.log(err);
			response.send(stderr);
		}else{
			var textfile = path.join(__dirname + '/Rmodules/UserScripts/') +request.session.username+'_'+ 'Compare_' + 'QTLGroup.json';
			fs.readFile(textfile, function(err, data){
				if(err){
					response.send('');
				}else{
					response.send(data);
				}
			});
		}
	});
});

// Run R simulation: Calculate Accuray of BVE Results
app.post('/RsimAccBVE', function(request, response) {
	
	request.setTimeout(5*24*60*60*1000);

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Results_AccBVE.r') + " --args "+request.session.username+ " '"+ request.body.filename + "' '"+ JSON.stringify(request.body.sindex) + "'";
	console.log(command);
		
	exec(command, {maxBuffer: 5000*1024},function(err, stdout, stderr){
		if(err){
			console.log(err);
			response.send(stderr);
		}else{
			var textfile = path.join(__dirname + '/Rmodules/UserScripts/') +request.session.username+'_'+request.body.filename + 'AccBVE.json';
			fs.readFile(textfile, function(err, data){
				if(err){
					response.send('');
				}else{
					response.send(data);
				}
			});
		}
	});
});

app.post('/RsimAccBVEGroup', function(request, response) {
	
	request.setTimeout(5*24*60*60*1000);

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Results_AccBVEGroup.r') + " --args "+request.session.username+ " '"+ request.body.filename + "' '"+ JSON.stringify(request.body.sindex) + "'";
	console.log(command);
		
	exec(command, {maxBuffer: 5000*1024},function(err, stdout, stderr){
		if(err){
			console.log(err);
			response.send(stderr);
		}else{
			var textfile = path.join(__dirname + '/Rmodules/UserScripts/') +request.session.username+'_'+ 'Compare_' + 'AccBVEGroup.json';
			fs.readFile(textfile, function(err, data){
				if(err){
					response.send('');
				}else{
					response.send(data);
				}
			});
		}
	});
});

// Run R simulation: Prepare download stuff
app.post('/RsimDownload', function(request, response) {
	
	request.setTimeout(5*24*60*60*1000);

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Results_download.r') + " --args "+request.body.auser+ " '"+ request.body.filename + "' " + " '"+ request.body.dtype + "' " + " '"+ request.body.cohort + "' " + " '"+ request.body.nrepeat + "' ";

	console.log(command);
		
	exec(command, {maxBuffer: 5000*1024},function(err, stdout, stderr){
		if(err){
			console.log(err);
			response.send(stderr);
		} else{
			response.send('');
		};
	});
});


// Run R simulation: Calculate Result
app.post('/RsimResult', function(request, response) {
	console.log(request);
	console.log(response);
	request.setTimeout(5*24*60*60*1000);

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Results') + "_"+request.body.script +".r --args "+request.session.username+ " '"+ request.body.filename +"' "; // '" + JSON.stringify(request.body.cohorts) + "'";

	console.log(command);
		
	exec(command, {maxBuffer: 5000*1024},function(err, stdout, stderr){
		if(err){
			console.log(err);
			response.send(stderr);
		}else{
			var textfile = path.join(__dirname + '/Rmodules/UserScripts/') +request.session.username+'_'+request.body.filename + request.body.script+'.json';
			fs.readFile(textfile, function(err, data){
				if(err){
					response.send('');
				}else{
					response.send(data);
				}
			});
		}
	});
});

// Run R simulation: Calculate Result Comparison
app.post('/RsimResultGroup', function(request, response) {
	console.log(request);
	console.log(response);
	request.setTimeout(5*24*60*60*1000);

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Results') + "_"+request.body.script +".r --args "+request.session.username+ " '"+ request.body.filename +"' " + " '"+ request.body.consider_cohort +"' " + " '"+ request.body.max_rep +"' "  ; // '" + JSON.stringify(request.body.cohorts) + "'";

	console.log(command);
		
	exec(command, {maxBuffer: 5000*1024},function(err, stdout, stderr){
		if(err){
			console.log(err);
			response.send(stderr);
		}else{
			var textfile = path.join(__dirname + '/Rmodules/UserScripts/') +request.session.username+'_Compare_' + request.body.script+'.json';
			fs.readFile(textfile, function(err, data){
				if(err){
					response.send('');
				}else{
					response.send(data);
				}
			});
		}
	});
});

// Get RData for download
app.get('/Rdownload', function(request, res){	
	if (request.session.filename) {
		var textfile = path.join(__dirname + '/Rmodules/UserScripts/'+request.session.username+'_'+request.session.filename+'.RData');
		fs.readFile(textfile, function(err, data){
			if(err){
				var message = 'Have not found any RData file for the requested Project of ' + request.session.filename  +'. Please finish R Simulation successfully and then download RData.';
				res.send(message.fontcolor("red"));
			}else{
				res.download(textfile);
			}
		});
	} else {
		res.send('Please select a project to download RData!');
	}

});

// Get Excel file for download
app.get('/Exceldownload', function(request, res){	
	if (request.session.filename) {
		var Excelfile = path.join(__dirname + '/Rmodules/UserScripts/'+request.session.username+'_'+request.session.filename+'.csv');
		fs.readFile(Excelfile, function(err, data){
			if(err){
				var message = 'Have not found any Excel file for the requested Project of ' + request.session.filename  +'. Please finish R Simulation successfully and then download Excel File.';
				res.send(message.fontcolor("red"));
			}else{
				res.download(Excelfile);
			}
		});
	} else {
		res.send('Please select a project to download Excel File!');
	}

});

// Get Excel file -- Cohort information to display in the interface
app.get('/getCohortInfo', function(request, res){	
	if (request.session.filename) {
		var Excelfile = path.join(__dirname + '/Rmodules/UserScripts/'+request.session.username+'_'+request.session.filename+'.csv');
		fs.readFile(Excelfile, function(err, data){
			if(err){
				var message = 'Have not found any Excel file for the requested Project of ' + request.session.filename  +'. Please finish R Simulation successfully and then you could see Cohort Information here.';
				res.send(message);
			}else{
			res.send(data);
			}
			});
	}
});

// Get Excel file -- Cohort time information to display in the interface
app.get('/getCohortTimeInfo', function(request, res){	
	if (request.session.filename) {
		var Excelfile = path.join(__dirname + '/Rmodules/UserScripts/'+request.session.username+'_'+request.session.filename+'_time.csv');
		fs.readFile(Excelfile, function(err, data){
			if(err){
				var message = 'Have not found any Excel file for the requested Project of ' + request.session.filename  +'. Please finish R Simulation successfully and then you could see Cohort Information here.';
				res.send(message);
			}else{
			res.send(data);
			}
			});
	}
});

// Get .txt for download
app.get('/txtdownload', function(request, res){	
	if (request.session.filename) {
		var textfile = path.join(__dirname + '/Rmodules/UserScripts/'+request.session.username+'_'+request.session.filename+'_temp.txt');
 		res.download(textfile); 
	} else {
		res.send('Please select a project to download txt!');
	}

});

// Get .txt for download
app.get('/peddownload', function(request, res){	
	if (request.session.filename) {
		var textfile = path.join(__dirname + '/Rmodules/UserScripts/'+request.session.username+'_'+request.session.filename+'_temp.ped');
 		res.download(textfile); 
	} else {
		res.send('Please select a project to download ped!');
	}

});

app.get('/mapdownload', function(request, res){	
	if (request.session.filename) {
		var textfile = path.join(__dirname + '/Rmodules/UserScripts/'+request.session.username+'_'+request.session.filename+'_temp.map');
 		res.download(textfile); 
	} else {
		res.send('Please select a project to download map!');
	}

});

app.get('/vcfdownload', function(request, res){	
	if (request.session.filename) {
		var textfile = path.join(__dirname + '/Rmodules/UserScripts/'+request.session.username+'_'+request.session.filename+'_temp.vcf');
 		res.download(textfile); 
	} else {
		res.send('Please select a project to download vcf!');
	}

});

// Uploading R Results:
app.post('/ResultUpload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.ResultFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(path.join(__dirname + '/Rmodules/UserScripts/')+req.session.username +"_"+sampleFile.name+".RData" , function(err) {
    if (err)
      return res.status(500).send(err);
	console.log(sampleFile.name);
    res.send('File uploaded!');
  });
});

// no need to have request scope of username and password for intro, faq, history, agb links
app.get('/intro', function(request, response) {
		response.sendFile(path.join(__dirname + '/Views/intro.html'));
});

app.get('/faq', function(request, response) {
		response.sendFile(path.join(__dirname + '/Views/faq.html'));
});

app.get('/history', function(request, response) {
		response.sendFile(path.join(__dirname + '/Views/history.html'));
});

app.get('/agb', function(request, response) {
		response.sendFile(path.join(__dirname + '/Views/AGB.html'));
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
	var textfile = path.join(__dirname + '/Rmodules/UserScripts/') +request.session.username+'_'+request.body.file + '.json';
	fs.readFile(textfile, function(err, data){
		if(err){
			response.send('');
		}else{
			response.send(data);
		}
	});
});

// Get Data for Plotting
app.post('/JSONgroup', function(request, response) {
	//request.body.file
	var textfile = path.join(__dirname + '/Rmodules/UserScripts/') +request.session.username+'_'+request.body.file + '.json';
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
	//console.log(request.body);
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var versions = [{date: Date(), json: JSON.parse(request.body.jsondata)}];
		var myobj = {name: request.body.name, json: JSON.parse(request.body.jsondata), versions: versions};
		dbo.collection(request.session.username).insertOne(myobj, function(err, result){
			if (err) throw err;
			//console.log("1 document inserted");
			console.log(versions);
			db.close();			
			response.send(versions);
		});
	}); 
	//response.end();
});

// update Project:
app.post('/update', function(request, response) {
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var myquery = {name: request.body.name };
		
		var versions = JSON.parse(request.body.versions);
		versions.push({date: Date(), json: JSON.parse(request.body.jsondata)});

		var newvalues = {$set: {json: JSON.parse(request.body.jsondata), versions: versions}};
		dbo.collection(request.session.username).updateOne(myquery, newvalues, function(err, result){
			if (err) throw err;
			db.close();	
			response.send(versions);
		});		

	}); 
	//response.end();
});

// delete Project:
app.post('/delete', function(request, response) {
	console.log(request.body);
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var myobj = {name: request.body.name };
		dbo.collection(request.session.username).deleteOne(myobj, function(err, result){
			if (err) throw err;
			//console.log("1 document inserted");
			db.close();		
		});
	}); 
	response.end();
});


var server = http.listen(8080);
server.setTimeout(5*24*60*60*1000); // 6 hours



