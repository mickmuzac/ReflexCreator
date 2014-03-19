var reflexModel = new function(){
	
	var self = this;
	self.nextConditions = ['time', 'total'],
	self.entityConditions = ['type', 'min x', 'max x', 'min y', 'max y', 'size', 'duration', 'delay', 'difficulty'],
	self.actions = ['deltax', 'deltay'],
	self.typeValues = ['circle', 'square', 'triangle'];
	
	self.currentWorldName = ko.observable("");
	self.currentWorld = ko.observable(false);
	self.currentLevel = ko.observable(false);
	
	self.addWorld  = function(){
		self.worldList.push(ko.observable({name: self.currentWorldName(), levels: ko.observableArray([])}));
	};
	
	self.selectWorld  = function(currentWorld){
		self.currentWorld(currentWorld);
		self.currentLevel(false);
		return true;
	}
	
	self.selectLevel  = function(currentLevel){
		self.currentLevel(currentLevel);
	}
	
	self.addLevel = function(test){
		self.currentWorld().levels.push(ko.observable({name: 'Level ' + (self.currentWorld().levels().length+1), roundList:ko.observableArray()}));
		console.log(test);
	}
	
	self.addRound = function(){
		
		self.currentLevel().roundList.push({
			targets: ko.observable(0),
			simultaneous: ko.observable(0),
			startTime:  ko.observable(0),
			forever: ko.observable(false),
			interpolate: ko.observable(false),
			gravity: ko.observable(false),
			entityConditions: ko.observableArray([]),
			actions: ko.observableArray([]),
			nextConditions: ko.observableArray([])
		});
	};
		
	self.worldList  = ko.observableArray([]);	
	self.addNewCondition = function(obj){
		//arr.push({metric:"",value:0});
		console.log(obj);
		obj.push({type:"",value:0});
	};
	self.makeJSON = function(){
		/*var roundDef = ko.toJS(self.roundDef);
		
		for(var i = 0; i < roundDef.length; i++){
			for(var key in roundDef[i].entityDef){
				roundDef[i].entityDef[key] = roundDef[i].entityDef[key].val;
			}
		}
		
		console.log(ko.toJSON({roundDef:roundDef}));*/
		$.post("/save", ko.toJS({list:self.worldList}), function(){
			
			console.log("Sent to server");
		});
	};

	self.loadJSON = function(str){
		var roundDef;
		try{
			//Change later once other properties are added..
			roundDef = JSON.parse(str).roundDef;
		}
		catch(e){
			console.error(e);
			return;
		}
		
		self.roundDef.removeAll();

		for(var i = 0; i < roundDef.length; i++){
			
			self.addRound();
			for(var key in roundDef[i].entityDef){
			
				self.roundDef()[i].entityDef[key].val(roundDef[i].entityDef[key]);
			}
		}
		
		console.log(ko.toJSON(roundDef));
	};
};

$.get('/data',function(data){
	console.log(data);
	ko.applyBindings(reflexModel);
});
