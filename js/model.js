var reflexModel = new function(){
	
	var self = this,
	nextCondList = ['time', 'total'],
	
	//The next step is to specify movement and speed
	entityPropList = ['type', 'min x', 'max x', 'min y', 'max y', 'size', 'delay', 'interpolate'];
	self.addRound  = function(){
		
		self.roundDef.push({entityDef:
		[
			{name:"minTargets", val: ko.observable(0)},
			{name:"maxTargets", val: ko.observable(0)},
			{name:"minSimultaneous", val: ko.observable(0)},
			{name:"maxSimultaneous", val: ko.observable(0)},
			{name:"startTime", val: ko.observable(0)},
			{name:"entityConditions", val: ko.observableArray([]), options:entityPropList},
			{name:"entity", val: ko.observableArray([])},
			{name:"nextConditions", val: ko.observableArray([]), options:nextCondList}
		]});
	};
	self.roundDef  = ko.observableArray([]);	
	self.addNewCondition = function(obj){
		//arr.push({metric:"",value:0});
		console.log(name);
		switch(obj.name){
			
			case "entity": 
				break;
			case "entityConditions": 
				obj.val.push({metric:"min x",value:0});
				break;
			case "nextConditions":
				obj.val.push({metric:"",value:0});
				break;
		}
	};
	self.makeJSON = function(){
		var tempJS = ko.toJS(self.roundDef);
		var outObj  = {roundDef:[]};
		
		for(var i = 0; i < tempJS.length; i++){
			outObj.roundDef.push({entityDef:{}});
			for(var g = 0; g < tempJS[i]["entityDef"].length;g++){
				outObj.roundDef[i].entityDef[tempJS[i]["entityDef"][g].name] = tempJS[i]["entityDef"][g].val;
			}
		}
		
		console.log(ko.toJSON(outObj));
	}
};

ko.applyBindings(reflexModel);
