var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var todos = [];

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/',function(req,res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/todos',function(req,res) {
	res.json(todos);
});

app.post('/todos',function(req,res) {
	if (req.body.hasOwnProperty("name"))
		{
			todos.push(req.body.name.toLowerCase());
			res.json(todos);
		}
	else {
		res.statusCode = 400;
  	return res.send('POST Error 400: Name property not defined.');
  }
});

app.delete('/todos',function(req,res) {
	if (req.body.hasOwnProperty("name"))
		{
			todos.splice(todos.indexOf(req.body.name.toLowerCase()),1);
			res.json(todos);
		}
	else {
		res.statusCode = 400;
	  return res.send('DEL Error 400: Name property not defined.');
	}
});

app.listen(8080,function() {
	console.log('Server running at http://localhost:8080');
});
