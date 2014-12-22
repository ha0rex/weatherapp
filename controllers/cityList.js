exports.setData = function(cities) {
	for (i in cities) {
		var name=cities[i];
		cities[i] = Alloy.createController('city');
		cities[i].setName(name);
		cities[i].update(i, function(e) {
			console.log(e);
			var row = Ti.UI.createTableViewRow({ id:e.name, className:'row' });
			row.add(cities[e.id].getView());
			$.cityList.appendRow(row);		
		});
	}
	exports.cities=cities;	
};
