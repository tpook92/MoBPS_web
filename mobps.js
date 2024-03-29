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

process.env.NODE_ENV = 'production';

const MongoStore = require('connect-mongo')(session);

var mobpsLoginRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var compareProjectsRouter = require('./routes/compareProjects');

var UsersRouter = require("./routes/Users")

var app = express();

// socket for streaming R output:
var http = require('http').Server(app);
var io = require('socket.io')(http);

//app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mobpsLoginRouter);
app.use('/', homeRouter);
app.use('/', compareProjectsRouter);

app.use('/users', UsersRouter)

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
					request.session.userShare = result[0]['share'];
					
					if(typeof request.session.userShare === 'undefined') {
						request.session.userShare = '';
					}
					else { 
						request.session.userShare = result[0]['share']; 
					}
						
					var lastloginDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
					dbo.collection("Users").updateOne({_id: request.body.username}, {$set : {lastloginDate: lastloginDate}},
					{upsert:true});
					if (err) throw err;
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
	//console.log(request.session);
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
			//console.log(myquery);
			var newvalues = {$set: {passw: request.body.newpassw1}};
			if(request.body.newpassw1 == request.body.newpassw2){
				dbo.collection("Users").updateOne(myquery, newvalues, function(err, result){
					if (err) throw err;
					//console.log(result.result.nModified);
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

app.post('/databaseCP', function(request, response) {
		request.session.username = request.body.username;
		request.session.usergroup = request.body.usergroup;
		request.session.loggedin = true;
		MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("DB");
			//dbo.collection(request.session.username).find({}).map(x => x.name).toArray(function(err, result){
				dbo.collection(request.session.username).find({}).project({name:1, json:1, _id:0}).toArray(function(err, result){
				if (err) throw err;
				db.close();	
				console.log(result);
				response.send(result);	
			});
		}); 

});


app.post('/compareswitch', function(request, response){
	
	if (request.session.loggedin) {		
		MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("DB");
			dbo.collection(request.session.username).find({}).map(x => x.name).toArray(function(err, result){
				if (err) throw err;
				db.close();	
				response.send(result);	
				
				tempResult = request.session.username+","+result;

				fs.writeFileSync(__dirname + '/Rmodules/UserScripts/tempdatabase.text', tempResult);				
			});
		}); 
			

	} else {
		response.send('');
	}
	
});

app.post('/recover', function(request, response) {
	fs.readFile("/home/nha/MoBPS/Rmodules/UserScripts/tempdatabase.text", "utf8", function(err, data){
		console.log(data);
		response.send(data);
	});
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
				
				tempResult = request.session.username+","+result;
				var tempFile = path.join(__dirname + '/Rmodules/UserScripts');
				fs.writeFileSync(__dirname + '/Rmodules/UserScripts/tempdatabase.text', tempResult);				
			});
		}); 
	} else {
		response.send('');
	}
});


app.post('/loadproject', function(request, response) {
	if (request.session.loggedin || true) {
		MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("DB");
			var obj = {name: request.body.name};
			request.session.filename = request.body.name;
			dbo.collection(request.session.username).find(obj).toArray(function(err, result){
				if (err) throw err;
				db.close();	
			//	console.log(result);
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


//project tree
app.get('/fields_database', function(request, response) {
	if (request.session.loggedin) {
		MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("DB");
			//dbo.collection(request.session.username).find({}).project({ProjectGroup:1, ProjectGroupChild:1, name:1, _id:0}).sort({ProjectGroup: -1, ProjectGroupChild: -1, name: -1}).toArray((err, result) => {
		//	dbo.collection(request.session.username).find({}).toArray((err, result) => {
		dbo.collection(request.session.username).find({}).project({name:1, json:1, _id:0}).toArray(function(err, result){

				
				if (err) throw err;
				db.close();	
			//	console.log(result);
				response.send(result);	
				
				tempResult = request.session.username+","+result;
				var tempFile = path.join(__dirname + '/Rmodules/UserScripts');
				fs.writeFileSync(__dirname + '/Rmodules/UserScripts/tempdatabase.text', tempResult);				
			});
		}); 
	} else {
		response.send('');
	}
});

//project tree
app.get('/get_projectTree', function(request, response) {
	if (request.session.loggedin) {
		MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("DB");
			dbo.collection("UserProjectTree").find({_id:request.session.username}).project({ProjectGroup:1, _id:0}).toArray((err, result) => {
		//	dbo.collection("UserProjectTree").find({_id:request.session.username}).toArray((err, result) => {
				if (err) throw err;
				db.close();	
			//	console.log("projectree");
			//	console.log(result);
				response.send(result);							
			});
		}); 
	} else {
		response.send('');
	}
});

//create project tree
app.post('/create_projectTree', function(request, response) {
	//console.log(request.body);
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var createdDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
		var myobj = {ProjectGroup:request.body.project, _id:request.session.username, createdDate:createdDate};
		dbo.collection("UserProjectTree").insertOne(myobj, function(err, result){
			if (err) throw err;
			console.log("1 document inserted");
			db.close();		
		//	response.send(result);		
		});
	}); 
	response.end();
});


//delete project from existing project tree
app.post('/deleteProject_FromTree', function(request, response) {
	//console.log(request.body);
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var createdDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
		var myobj = {group_Name:request.body.name};
		dbo.collection("UserProjectTree").updateOne({_id: request.session.username},{$pull:{ProjectGroup:myobj}}, function(err, result){
			if (err) throw err;
			console.log("1 document tree inserted");
			db.close();		
		//	response.send(result);		
		});
	}); 
	response.end();
});


//add project name to existing project tree
app.post('/saveProject_ProjectTree', function(request, response) {
	//console.log(request.body);
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var myobj = {group_Name:request.body.name, options:{dropable:false}};
		dbo.collection("UserProjectTree").updateOne({_id: request.session.username},{$addToSet:{ProjectGroup:myobj}}, function(err, result){
			if (err) throw err;
			console.log("1 document tree inserted");
			db.close();		
		});
	}); 
	response.end();
});

//add project name to existing project tree for Shared User
app.post('/saveProject_ProjectTree_ForSharedUser', function(request, response) {
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var myobj = {group_Name:request.body.name, options:{dropable:false}};
		var thisUser = JSON.parse(request.body.user);
		dbo.collection("UserProjectTree").updateOne({_id: thisUser},{$addToSet:{ProjectGroup:myobj}}, function(err, result){
			if (err) throw err;
			console.log("1 document tree inserted");
			db.close();		
		});
	}); 
	response.end();
});


//update project tree with new structure
app.post('/update_ProjectTree', function(request, response) {
	//console.log(request.body.project);
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var thisProjectGroup = JSON.parse(request.body.project);
		dbo.collection("UserProjectTree").updateOne({_id: request.session.username},{$set:{ProjectGroup:thisProjectGroup}}, function(err, result){
			if (err) throw err;
			console.log("1 document updated");
			db.close();		
		});
	}); 
	response.end();
});

//delete a shared "Shared_" project from tree 
app.post('/deleteASharedProject_FromTree', function(request, response) {
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var thisProjectGroup = JSON.parse(request.body.project);
		dbo.collection("UserProjectTree").deleteOne({_id: request.body.user},{$set:{ProjectGroup:thisProjectGroup}}, function(err, result){
			if (err) throw err;
			console.log("1 project removed!");
			db.close();		
		});
	}); 
	response.end();
});

//getProject list for a user(for dragdrop) 
app.get('/getProjectListforDragDrop', function(request, response) {
	if (request.session.loggedin) {
		MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("DB");
			dbo.collection(request.session.username).find({}).toArray(function(err, result) { 
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

	var command = "nohup env OPENBLAS_NUM_THREADS=5 OMP_NUM_THREADS=5 R --file="+ path.join(__dirname + '/Rmodules/Rsim1.r') + " --args "+request.session.username+" "+ JSON.stringify(request.body.jsondata) +"";
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

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Results_QTLGroup.r') + " --args "+request.session.username+ " '"+ request.body.filename + "' '"+ JSON.stringify(request.body.traitsinfo) + "'" + " '"+ request.body.max_rep +"' ";
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

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Results_AccBVEGroup.r') + " --args "+request.session.username+ " '"+ request.body.filename + "' '"+ JSON.stringify(request.body.sindex) + "'" + " '"+ request.body.max_rep +"' ";
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
	//console.log(request);
	//console.log(response);
	request.setTimeout(5*24*60*60*1000);

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Results') + "_"+request.body.script +".r --args "+request.session.username+ " '"+ request.body.filename +"' " + " '"+ request.body.consider_cohort +"' " + " '" + request.body.PCA_cohorts + "' " + " '" + request.body.PCA_pType + "' "; // '" + JSON.stringify(request.body.cohorts) + "'";

	console.log(command);
		
	exec(command, {maxBuffer: 5000*1024},function(err, stdout, stderr){
		if(err){
	//		console.log(err);
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
	request.setTimeout(5*24*60*60*1000);

	var command = "nohup R --file="+ path.join(__dirname + '/Rmodules/Results') + "_"+request.body.script +".r --args "+request.session.username+ " '"+ request.body.filename +"' " + " '"+ request.body.consider_cohort +"' " + " '"+ request.body.max_rep +"' "   ; // '" + JSON.stringify(request.body.cohorts) + "'";

	exec(command, {maxBuffer: 5000*1024},function(err, stdout, stderr){
		if(err){
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

// Get warnings log file
app.get('/getWarningsInfo', function(request, res){	
	if (request.session.filename) {
		var warningsFile = path.join(__dirname + '/Rmodules/UserScripts/'+request.session.username+'_'+request.session.filename+'_warnings.log');
		fs.readFile(warningsFile, function(err, data){
			if(err){
				var message = '';
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
	//console.log(sampleFile.name);
    res.send('File uploaded!');
  });
});

// no need to have request scope of username and password for intro, faq, history, agb links
app.get('/intro', function(request, response) {
		response.sendFile(path.join(__dirname + '/Views/intro.html'));
});

app.get('/publication', function(request, response) {
		response.sendFile(path.join(__dirname + '/Views/publication.html'));
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
	//console.log(sampleFile.name);
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

// saving Project with another user:
app.post('/saveProjectWithOtherUser', function(request, response) {
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
				var thisJSON = JSON.parse(request.body.jsondata);
				var allUserShares = thisJSON['Genomic Info']['sharedWith'];
				allUserShares.push(request.session.username);
		var dbo = db.db("DB");
		var sharedWith = request.body.sharedWith;
		isExist = allUserShares.includes(sharedWith); 
		if (isExist) {
			var thisUser = allUserShares.indexOf(sharedWith);
			allUserShares.splice(thisUser,1);
		}
		var isShared="Yes";
		var versions = JSON.parse(request.body.versions);
		versions.push({date: Date(), json: JSON.parse(request.body.jsondata)});
		var createdDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
		var myobj = {name: request.body.name, json: JSON.parse(request.body.jsondata), versions: versions, createdDate:createdDate, sharedWith:allUserShares, isShared:isShared};
				dbo.collection(request.body.sharedWith).insertOne(myobj, function(err, result){
					if (err) {
						var errUser = request.body.sharedWith + ' - Please check if this User exist!';
						response.send(errUser);
					}
					else {
						db.close();
						response.send(versions);
					}
			console.log("1 document inserted");
		});
	}); 
});


// update Project:
app.post('/updateProjectWithOtherUser', function(request, response) {
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var sharedWith = request.body.sharedWith;
		var myquery = {name: request.body.name };		
		if(sharedWith === " " || sharedWith.cnt === "undefined") {var isShared="No";} else { var isShared = "Yes";}
		var versions = JSON.parse(request.body.versions);
		versions.push({date: Date(), json: JSON.parse(request.body.jsondata)});
		var updatedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
		var newvalues = {$set: {json: JSON.parse(request.body.jsondata), versions: versions, updatedDate:updatedDate, sharedWith:sharedWith, isShared:isShared}};

		dbo.collection(request.session.username).updateOne(myquery, newvalues, function(err, result){
			if (err) throw err;
			db.close();	
			response.send(versions);
		});		

	}); 
});

// update shared Project:
app.post('/update_sharedProjectWithOtherUser', function(request, response) {
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
			var thisJSON = JSON.parse(request.body.jsondata);
			var allUserShares = thisJSON['Genomic Info']['sharedWith'];
			allUserShares.push(request.session.username);
		var dbo = db.db("DB");
		var sharedWith = request.body.sharedWith;
		isExist = allUserShares.includes(sharedWith); 
		if (isExist) {
			var thisUser = allUserShares.indexOf(sharedWith);
			allUserShares.splice(thisUser,1);
		}
		var myquery = {name: request.body.name };		
		var isShared="Yes";
		var versions = JSON.parse(request.body.versions);
		versions.push({date: Date(), json: JSON.parse(request.body.jsondata)});
		var updatedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
		var newvalues = {$set: {json: JSON.parse(request.body.jsondata), versions: versions, updatedDate:updatedDate, sharedWith:allUserShares, isShared:isShared}};
		dbo.collection(request.body.sharedWith).updateOne(myquery, newvalues, function(err, result){
			if (err) throw err;
			db.close();	
			response.send(versions);
		});		
	}); 
});




// STOP SHARE Project:
app.post('/stop_sharedProjectWithOtherUser', function(request, response) {
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var myquery = {name: request.body.name };		
		var nosharedUser = ' ';
		var isShared="No";
		var versions = JSON.parse(request.body.versions);
		versions.push({date: Date(), json: JSON.parse(request.body.jsondata)});
		var updatedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
		var newvalues = {$set: {json: JSON.parse(request.body.jsondata), versions: versions, updatedDate:updatedDate, sharedWith:nosharedUser, isPrShared:true, isShared:isShared}};
		dbo.collection(request.body.sharedWith).updateOne(myquery, newvalues, function(err, result){
		if (err) {
			var errUser = request.body.sharedWith + ' - Please check if this User exist to stop!';
			response.send(errUser);
			}
		else {
			db.close();
			response.send(versions);
			}
		});		

	}); 
});

// update Project for the Project Sharer:
app.post('/updateSharerProject', function(request, response) {
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var myquery = {name: request.body.name };
		var versions = JSON.parse(request.body.versions);
		var isShared="No";
		versions.push({date: Date(), json: JSON.parse(request.body.jsondata)});
		var updatedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
		var newvalues = {$set: {json: JSON.parse(request.body.jsondata), versions: versions, updatedDate:updatedDate, isShared:isShared}};
		dbo.collection(request.body.projectSharer).updateOne(myquery, newvalues, function(err, result){
			if (err) throw err;
			db.close();	
			response.send(versions);
		});		

	}); 
});

// saving Project:
app.post('/save', function(request, response) {
	//console.log(request.body);
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var versions = [{date: Date(), json: JSON.parse(request.body.jsondata)}];
				var createdDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
		var myobj = {name: request.body.name, json: JSON.parse(request.body.jsondata), versions: versions, createdDate:createdDate};
		dbo.collection(request.session.username).insertOne(myobj, function(err, result){
			if (err) throw err;
			//console.log("1 document inserted");
			//console.log(versions);
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
		var updatedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
		var newvalues = {$set: {json: JSON.parse(request.body.jsondata), versions: versions, updatedDate:updatedDate}};
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
	//console.log(request.body);
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


// ************* Access to Database related code from Interface ********************///
//All users from DB 
app.get('/getAllUsersFromDB', function(request, response) {
	if (request.session.loggedin) {
		MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("DB");
				dbo.collection("Users").find().toArray(function(err, result) {
				if (err) throw err;
				//console.log(result);
				db.close();	
				response.send(result);		
			});
		}); 
	} else {
		response.send('');
	}
});


// save a new User to DB:
app.post('/addUsertoDB', function(request, response) {
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var createdDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
		var myobj = {_id: request.body.username, passw: request.body.password, group: request.body.group, email: request.body.email, createdDate: createdDate};
		
		dbo.collection("Users").insertOne(myobj, function(err, result){
			if (err) {
				var errM = request.body.username + ' - User already exist!';
				response.send(errM.fontcolor("red"));
			}
			else {
				db.close();		
				response.redirect('/users');
			}	
		});
	}); 
});

// add Students to DB:
app.post('/addStudentsToDB', function(request, response) {
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var studentsObj = [];
		var start = request.body.from;
		var end = request.body.to;
			for(let i=start;i<=end; i++){
				studentsObj.push({_id: request.body.username+i, passw: request.body.password+i, group: request.body.group, createdDate: request.body.createdDate});
			}
			dbo.collection("Users").insertMany(studentsObj, function(err, result){
			if (err) {
				var errM = request.body.username + ' - User is already exist!';
				response.send(errM.fontcolor("red"));
			}
			else {
			//console.log("Users are inserted");
			db.close();		
			response.redirect('/users');
			}	
		});
	}); 
});


// update a User to DB:
app.post('/updateUsertoDB', function(request, response) {
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var updatedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
		dbo.collection("Users").updateOne({_id: request.body.username}, {$set : {passw: request.body.passw, group: request.body.group, email: request.body.email, updatedDate: updatedDate}},
		{upsert:true});
			if (err) throw err;
			db.close();		
			response.redirect('/users');	
		});
	}); 
	
	
// delete a Project:
app.post('/deleteUser', function(request, response) {
	//console.log(request.body);
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var myobj = {_id: request.body._id };
		dbo.collection("Users").deleteOne(myobj, function(err, result){
			if (err) throw err;
//			console.log("1 user deleted");
			db.close();		
		});
	}); 
	response.end();
});

//Project list from a selected user 
app.get('/getProjectList', function(request, response) {
	if (request.session.loggedin) {
		MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
			if (err) throw err;
			var dbo = db.db("DB");
			dbo.collection(request.query._id).find({}).toArray(function(err, result) { 
				if (err) throw err;
				//console.log(result);
				db.close();	
				response.send(result);		
			});
		}); 
	} else {
		response.send('');
	}
});


// delete Project from User module:
app.post('/deleteProject', function(request, response) {
	//console.log(request.body);
	MongoClient.connect(urldb, {useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("DB");
		var myobj = {name: request.body.name };
		dbo.collection(request.body.user).deleteOne(myobj, function(err, result){
			if (err) throw err;
//			console.log("1 document deleted");
			db.close();		
		});
	}); 
	response.end();
});

// login User from User Admin 
app.post('/loginFromUserList', function(request, response) {
	var username = request.body.username;
	var password = request.body.passw;
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

var server = http.listen(8080);
server.setTimeout(5*24*60*60*1000); // 6 hours