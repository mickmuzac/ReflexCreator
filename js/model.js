var reflexModel = new function(){
	
	var self = this;
	
	self.currentWorldName = ko.observable("");
	self.currentWorld = ko.observable(false);
	self.currentLevel = ko.observable(false);		
	self.worldList  = ko.observableArray([]);	
	self.currentTutorial = ko.observable(false);
};


$('.saveButton').click(function(){
	
	var data = ko.toJSON(reflexModel);
	$.post("/save", {base64:btoa(data)}, function(){
		console.log("Sent to server");
	});
});

$.get('/data',function(data){
	
	
	//ko.mapping.fromJS(JSON.parse(data), reflexModel);
	if(data.length > 10){

		data = JSON.parse(atob(data));
		reflexModel = ko.mapping.fromJS(data);
		
		console.log(data);
	}
	
	//debugger;
	
	var self = reflexModel;
	
	self.nextConditions = ['time', 'total'],
	self.entityConditions = ['type', 'x', 'y', 'min x', 'max x', 'min y', 'max y', 'size', 'duration', 'delay', 'difficulty', 'direction', 'pointer', 'numbered', 'colored'],
	self.actions = ['deltax', 'deltay'],
	self.typeValues = ['circle', 'square', 'triangle'];
	
	self.currentWorldName = ko.observable("");
	self.currentWorld = ko.observable(false);
	self.currentLevel = ko.observable(false);
	self.currentTutorial = ko.observable(false);
	
	self.addWorld  = function(){
		self.worldList.push(ko.observable({
			name: self.currentWorldName(), 
			levels: ko.observableArray([])
		}));
	};
	
	self.selectWorld = function(currentWorld){
		self.currentWorld(currentWorld);
		self.currentLevel(false);
		self.currentTutorial(false);
		return true;
	};
	
	self.selectLevel = function(currentLevel){
		self.currentLevel(currentLevel);
		console.log(currentLevel);
		self.currentTutorial(currentLevel.tutorial);
	};
	
	self.addLevel = function(test){
		self.currentWorld().levels.push(ko.observable({
			name: 'Level ' + (self.currentWorld().levels().length+1), 
			world:self.currentWorld().name, 
			maxTime: 0, 
			mode: ko.observableArray(0), 
			song: ko.observableArray(0), 
			roundList:ko.observableArray(),
			tutorial: {
				mode: ko.observable(0),
				displayPet: ko.observable(false),
				roundList: ko.observableArray()
			}
		}));
		console.log(test);
	};
	
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
	
	self.addTutorialRound = function(){
		
		self.currentTutorial().roundList.push({
			targets: ko.observable(0),
			simultaneous: ko.observable(0),
			startTime:  ko.observable(0),
			message:  ko.observable(""),
			forever: ko.observable(false),
			interpolate: ko.observable(false),
			gravity: ko.observable(false),
			displayPet: ko.observable(false),
			entityConditions: ko.observableArray([]),
			actions: ko.observableArray([]),
			nextConditions: ko.observableArray([])
		});
	};
	
	self.addNewCondition = function(obj){
		//arr.push({metric:"",value:0});
		console.log(obj);
		obj.push({
			key:"",
			value:0
		});
	};
	
	self.deleteEntityCondition = function(obj, parent){
		
		console.log(obj, parent);
		parent.entityConditions.remove(obj);
	}
	
	
	ko.applyBindings(reflexModel);
});
