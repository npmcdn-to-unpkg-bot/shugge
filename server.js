var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var app = express();
var authController = require('./server/controllers/auth-controller');
var profileController = require('./server/controllers/profile-controller');
var wasteController = require('./server/controllers/waste-controller');

mongoose.connect('mongodb://localhost:27017/time-waste');

app.use(bodyParser.json());
app.use(multipartMiddleware);
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads', express.static(__dirname + '/uploads'));




app.get('/', function(req, res){
    res.sendfile('index.html');
});

//Auth
app.post('/api/user/signup', authController.signup);
app.post('/api/user/login', authController.login);

//Profile
app.post('/api/profile/editPhoto', multipartMiddleware, profileController.updatePhoto);
app.post('/api/profile/updateUsername', profileController.updateUsername);
app.post('/api/profile/updateBio', profileController.updateBio);

//Waste
app.post('/api/waste/post', wasteController.postWaste);
app.get('/api/waste/get', wasteController.getWastes);


app.listen('3000', function(){
   console.log("listening on 3000");
});