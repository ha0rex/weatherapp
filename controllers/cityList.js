exports.cityList=$.cityList;

//Function to set all the data of cities in a cityList
exports.setData = function(cities) {
	exports.cities=cities;
	//For loop on cities
	for (i in cities) {
		var name=cities[i].name;
		var id=cities[i].id;
		
		//Let's create the city itself 
		cities[i] = Alloy.createController('city');
		
		//Let's create the row for it. If it's the local weather, we have to disable the delete button
		var row = Ti.UI.createTableViewRow({ editable: name == 'Local weather'?false:true});
		row.resource_id=id;
		cities[i].row=row;
		//Add the new row to the cityList
		exports.cityList.appendRow(row);
		
		//Delete event listener
		row.addEventListener('delete', function(a) {
			exports.delete(a);
		});
		
		//Click event listener
		row.addEventListener('click', function(a) {
			a.row.cityView.update();
		});
		
		//To check the local weather, we need our current location first
		if(name == 'Local weather') {
			//Initalize the GPS controller
			var local=Alloy.createController('gps');
			//Get details of current location
			local.getSettlementName(function(i) {
				cities[0].setName(i).update();
				cities[0].setLocal(true);
				cities[0].row.cityView = cities[0];
				cities[0].row.add(cities[0].getView());
			});
		}

		//Set the name of the city, then update it by that
		cities[i].setName(name).update();
		cities[i].row.cityView = cities[i];
		//Add the custom City view to the row 
		cities[i].row.add(cities[i].getView());
	}
	exports.cities=cities;	
};

//Add new city
exports.add = function(name) {
	//Create the new city object
	var newCity = Alloy.createController('city');
	//Set it's name, then update the object
	newCity.setName(name).update(function(e) {
		if(e) {
			//If it returns with true, the city exists, so we have to insert it into the database
			var db = Ti.Database.open('weatherApp');
			db.execute('INSERT INTO cities (name) VALUES (?)', name);
			var id = db.lastInsertRowId;
			db.close();
			
			//And add it to the TableView also
			var row = Ti.UI.createTableViewRow();
			row.resource_id=id;
			newCity.row=row;
			newCity.row.add(newCity.getView());
			$.cityList.appendRow(row, { animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT });
		}
		else {
			//There is no city with the specified name, let's notify the user
			alert("No results for the term: "+name);
		}
	});
};

//Delete a city
exports.delete = function(a) {
	var db = Ti.Database.open('weatherApp');
	db.execute('DELETE FROM cities WHERE id='+a.row.resource_id);
	db.close();	
};

//Function to get all of the cities from the DB, then update the table
exports.updateAll = function() {
	cities = [{id:0, name:'Local weather'}];
	var db = Ti.Database.open('weatherApp');
	var cityWeatherRS = db.execute('SELECT id,name FROM cities');
	while (cityWeatherRS.isValidRow())
	{
	  	var id = cityWeatherRS.fieldByName('id');
	  	var name = cityWeatherRS.fieldByName('name');
	  	cities.push({ id:id, name:name });
	  	cityWeatherRS.next();
	}
	exports.setData(cities);	
};
