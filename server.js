var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('expense',['expense_details']);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/*app.get('/',function(req,res){
	console.log('inside the server');
	res.send("hi from server");
});*/

db.on('error', function (err) {
    console.log('database error', err)
});

db.on('ready', function () {
    console.log('database connected')
});


app.use(express.static(__dirname + "/app"));

app.get('/expenseDetails',function(req,res){
	db.expense_details.find(function(err,docs){
		console.log("Response Error from server --> "+err);
		console.log("Response from server --> "+docs);
		res.json(docs);
	});
});

app.get('/ping',function(req,res){
	res.send("The server is running fine..");
});

app.post('/saveExpenseDetails',function(req,res){
	console.log(req.body);
	db.expense_details.insert(req.body);
	res.json({status:'success'});
}, function(err, doc, lastErrorObject){
	console.log('error occured '+err);
	console.log(lastErrorObject);
});

app.listen(4000);
console.log('listening to port 4000');