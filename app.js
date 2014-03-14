var express = require('express');
var fs = require('fs');
var app = express();
var dataObj;

app.use(express.bodyParser());
app.use(express.methodOverride());

app.set('view engine', 'html');
app.set('layout', 'layout');
app.enable('view cache');
app.engine('html', require('hogan-express'));

app.get('/', function(req, res){
  res.render("index");
});

app.get('/:type(css|js)/:file([A-Za-z0-9\\.]+)', function(req, res){
	fs.readFile(__dirname + "/" + req.params.type + "/" + req.params.file, function(err, data){
		res.end(data)
	});
});

app.post("/save", function(req, res){
	
	console.log(req.body);
	res.end();
	fs.writeFile(__dirname + "/data/levels.json", req.body,function(err){
		
		
	});
});

//Initialize
(function(){

	fs.exists(__dirname + "/data/levels.json", function(exists){
		if(exists){
			fs.readFile(__dirname + "/data/levels.json", function(err, data){
				
				try{
					var jsonData = JSON.parse(data);
					dataObj = jsonData;
				}
				
				catch(e){
					console.error(e);
				}
				
				finally{
					dataObj = {};
				}
			});
		}
		
		else{
			dataObj = {};
		}
	});

	app.listen(3000);
})();
