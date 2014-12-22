var cities=['Debrecen', 'Amsterdam', 'Budapest', 'Bucharest'];

for (i in cities) {
	var name=cities[i];
	cities[i] = Alloy.createController('city');
	cities[i].setName(name);
	cities[i].update(function(e) {
		var row = Ti.UI.createTableViewRow({ title:e.name+': '+e.temp_C+'C' });	
		$.foscsi.appendRow(row);		
	});
}

$.index.open();