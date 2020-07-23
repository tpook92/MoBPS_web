function userListDB () {
	this['userList'] = [];
}

function userDB (){
	this._id = "",
	this.passw = "",
	this.group = "",
	this.createdDate="",
	this.updatedDate=""
}

function students (){
	this.username = "",
	this.from = "",
	this.to = "",
	this.passw=','
	this.group = "2",
	this.createdDate="",
	this.updatedDate=""
}

function getProjectsFortheUser () {
	this['projectList'] = [];
}

var userListDB = new userListDB();
var userDB = new userDB();
var students = new students();
var getProjectsFortheUser = new getProjectsFortheUser();

var data_Vue = new Vue({
	el: '#app',
	data: {
		userListDB: userListDB,
		userDB: userDB,
		students: students,
		getProjectsFortheUser:getProjectsFortheUser,
		user:'',
		isEditing:false,
		isStudents:false,
		database:[],		
		curUserGroup:'',
		isBrowserSafari:'',		
		project_user:'',		
	},
	methods: {
		editUser: function(val) {
			thisEdit = JSON.parse(JSON.stringify(val));
			this._id = thisEdit._id;
			this.passw = thisEdit.passw;
			this.group = thisEdit.group;
			this.createdDate= thisEdit.createdDate;
			this.updatedDate= thisEdit.updatedDate;
  			this.isEditing = true;
			data_Vue.userDB = thisEdit;
			data_Vue.isEditing=true;
			data_Vue.getProjectsFortheUser = '';
		},
		getProjectList: function(val) {
			data_Vue.project_user = val._id;
			$.ajax
			({
				type: "GET",
				url: '/getProjectList',
				data:val,
				success: function (data) {
					if (data != '') {
						data_Vue.getProjectsFortheUser = data;
						return data;
						}
					else {
						data_Vue.getProjectsFortheUser = '';
					}
					}		
			})
		},
		loginTothisUser: function(val) {
			$.ajax
			({
				type: "get",
				url: '/loginFromUserList',
				data:val,
				success: function (data) {
					if (data != '') {
						data_Vue.getProjectsFortheUser = '';
						return data;
						}
					else {
						data_Vue.getProjectsFortheUser = '';
					}
					}		
			})
		},
		deleteProject: function(value) {
			var name = value.name;
			$.ajax
				({
					type: "POST",
					url: "/deleteProject",
					data: { name: name, user: data_Vue.project_user },
					success: function (msg) {
						location.reload();
					},
					failure: function(msg) 
					{
						alert('Delete Error!');
					},
				});	
			},
		deleteUser: function(value) {
			thisDel = JSON.parse(JSON.stringify(value));
			id = thisDel._id;
			$.ajax
				({
					type: "POST",
					url: "/deleteUser",
					data: { _id: id, },
					success: function (msg) {
						location.reload();
					},
					failure: function(msg) 
					{
						alert('Delete Error!');
					},
				});	
			}
			}
})

function init() {
  getAllUsersFromDB();
}


function getAllUsersFromDB() {	
	$.ajax
	({
		type: "GET",
		url: '/getAllUsersFromDB',
		success: function (data) {
			if (data != '') {
				data_Vue.userListDB = data;
				data_Vue.getProjectsFortheUser = '';
				return data;
				}
			}		
	})
}