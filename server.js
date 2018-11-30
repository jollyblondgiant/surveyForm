var express = require("express");

var session = require("express-session")
var path = require("path");
var id; 
function User(name, location, language, comment){
    this.name = name,
    this.lacation = location,
    this.language = language,
    this.comment = comment
}
var users = {}
var app = express();
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'gnomon',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
 
    res.render("index");
})
app.get('/display', function (req, res) {
    console.log("SUCCESS","SUCCESS","SUCCESS","SUCCESS")
    console.log(users)
    user = users.name
    res.render("dashboard", {user});
})
app.post('/user', function(req, res){
    var name = req.body.userName
    users.name = new User (name, req.body.dojoLocation, req.body.faveLang, req.body.comment)
    console.log(users.name)
    res.redirect('/display')
})

app.listen(8000, function () {
    console.log("listening on port 8000");
});