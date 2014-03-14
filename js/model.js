var reflexModel = new function(){
	
	var self = this,
	nextCondList = ['time', 'total'],
	entityPropList = ['type', 'min x', 'max x', 'min y', 'max y', 'size', 'duration', 'delay', 'difficulty'],
	actionsList = ['deltax', 'deltay'],
	typeValues = ['circle', 'square', 'triangle'];
	self.loadValue = ko.observable("");
	self.addRound  = function(){
		
		self.roundDef.push({entityDef:
		{
			targets: {val: ko.observable(0)},
			simultaneous: {val: ko.observable(0)},
			startTime: {val: ko.observable(0)},
			forever: {val: ko.observable(false)},
			interpolate: {val: ko.observable(false)},
			gravity: {val: ko.observable(false)},
			entityConditions: {val: ko.observableArray([]), options:entityPropList},
			actions: {val: ko.observableArray([]), options:actionsList},
			nextConditions: {val: ko.observableArray([]), options:nextCondList}
		}});
	};
	self.roundDef  = ko.observableArray([]);	
	self.addNewCondition = function(obj){
		//arr.push({metric:"",value:0});
		console.log(obj);
		
		/*
		 * This isn't terribly stable. Find another way to determine array type 
		 */
		switch(obj.options[0]){
			
			case "deltax": 
				obj.val.push({metric:"deltax",value:0});
				break;
			case "type": 
				obj.val.push({metric:"min x",value:0});
				break;
			case "time":
				obj.val.push({metric:"",value:0});
				break;
		}
	};
	self.makeJSON = function(){
		var roundDef = ko.toJS(self.roundDef);
		
		for(var i = 0; i < roundDef.length; i++){
			for(var key in roundDef[i].entityDef){
				roundDef[i].entityDef[key] = roundDef[i].entityDef[key].val;
			}
		}
		
		console.log(ko.toJSON({roundDef:roundDef}));
		$.post("/save", ko.toJSON({roundDef:roundDef}), function(){
			
			console.log("Sent to server");
		});
	};

	self.loadJSON = function(str){
		var roundDef;
		try{
			//Change later once other properties are added..
			if(typeof str == "string")
				roundDef = JSON.parse(str).roundDef;
				
			else {
				roundDef = JSON.parse(str.loadValue()).roundDef;
				str.loadValue("");
			}
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

ko.applyBindings(reflexModel);
