var express = require('express');
var fs = require('fs');
var app = express();
var dataObj;

app.use(express.bodyParser());
app.use(express.methodOverride());

app.set('view engine', 'html');
app.set('layout', 'layout');
app.engine('html', require('hogan-express'));

app.get('/', function(req, res){
  res.render("index");
});

app.get('/:type(css|js)/:file([A-Za-z0-9\\.]+)', function(req, res){
	fs.readFile(__dirname + "/" + req.params.type + "/" + req.params.file, function(err, data){
		res.end(data)
	});
});

app.get('/data', function(req, res){
  res.end(dataObj);
});

app.post("/save", function(req, res){	
	try{

		fs.writeFile(__dirname + "/data/levels.json", req.body.base64, function(err){
			dataObj = req.body.base64;
			res.end("data file successfully saved");
		});

		fs.writeFile(__dirname + "/data/worldList.json", JSON.stringify(JSON.parse(new Buffer(req.body.base64, 'base64').toString('binary')).worldList), function(err){
			dataObj = req.body.base64;
			res.end("data file successfully saved");
		});
	}
	catch(e){
		
		//console.log(req.body.roundDef);
		console.error("Error saving data file: ", e);
		res.end("error saving data file");
	}
});

//Initialize
(function(){

	fs.exists(__dirname + "/data/levels.json", function(exists){
		if(exists){
			fs.readFile(__dirname + "/data/levels.json", function(err, data){
				dataObj = data;
			});
		}
		
		else{
			dataObj = '';
		}
	});

	app.listen(3000);
})();
