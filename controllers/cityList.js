exports.cityList=$.cityList;

exports.setData = function(cities) {
	exports.cities=cities;
	for (i in cities) {
		var name=cities[i].name;
		var id=cities[i].id;
		
		cities[i] = Alloy.createController('city');
		var row = Ti.UI.createTableViewRow();
		row.resource_id=id;
		cities[i].row=row;
		exports.cityList.appendRow(row);
		
		row.addEventListener('delete', function(a) {
			exports.delete(a);
		});
		
		row.addEventListener('click', function(a) {
			a.row.cityView.update();
		});
		
		if(name == 'Local weather') {
			var local=Alloy.createController('gps');
			local.getSettlementName(function(i) {
				cities[0].setName(i).update();
				cities[0].setLocal(true);
				cities[0].row.cityView = cities[0];
				cities[0].row.add(cities[0].getView());
			});
		}

		cities[i].setName(name).update();
		cities[i].row.cityView = cities[i];
		cities[i].row.add(cities[i].getView());
	}
	exports.cities=cities;	
};

exports.add = function(name) {	
	var newCity = Alloy.createController('city');
	newCity.setName(name).update(function(e) {
		if(e) {
			var db = Ti.Database.open('weatherApp');
			db.execute('INSERT INTO cities (name) VALUES (?)', name);
			var id = db.lastInsertRowId;
			db.close();
			
			var row = Ti.UI.createTableViewRow();
			row.resource_id=id;
			newCity.row=row;
			newCity.row.add(newCity.getView());
			$.cityList.appendRow(row, { animationStyle:Titanium.UI.iPhone.RowAnimationStyle.RIGHT });
		}
	});
};

exports.delete = function(a) {
	var db = Ti.Database.open('weatherApp');
	db.execute('DELETE FROM cities WHERE id='+a.row.resource_id);
	db.close();	
};

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
