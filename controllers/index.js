var cities=['Debrecen', 'Amsterdam', 'Budapest', 'Bucharest'];

for (i in cities) {
	var name=cities[i];
	cities[i] = Alloy.createController('city');
	cities[i].setName(name);
	cities[i].update();
	$.foscsi.add(cities[i].getView());	
}

$.index.open();