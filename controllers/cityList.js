exports.setData = function(cities) {
	//Empty the table
	$.cityList.data = [];
	for (i in cities) {
		var name=cities[i];
		cities[i] = Alloy.createController('city');
		var row = Ti.UI.createTableViewRow();
		cities[i].row=row;
		$.cityList.appendRow(row);
		
		row.addEventListener('click', function(a) {
			a.row.cityView.update();
		});
		
		if(name == '*') {
			var local=Alloy.createController('gps');
			local.getSettlementName(function(i) {
				cities[0].setName(i).update();
				cities[0].row.cityView = cities[0];
				cities[0].row.add(cities[0].getView());
			});
		}

			cities[i].setName(name).update();
			cities[i].row.cityView = cities[i];
			cities[i].row.add(cities[i].getView());

		/*
		if(name == '*') {
			var local=Alloy.createController('gps');
			local.getSettlementName(i, function(e) {
				console.log
				cities[e.id].setName(e.name);
				
				cities[e.id].update(i, function(id, e) {
					var row = Ti.UI.createTableViewRow({ id:e.name, className:'row' });
					row.add(cities[e.id].getView());
					row.cityView = cities[e.id];
					$.cityList.appendRow(row);
					row.addEventListener('click', function(a) {
						a.row.cityView.update();
					});	
				});				
			});
			
			cities[i].setLocal();
		}
		else {
			cities[i].setName(name);
			
			cities[i].update(i, function(e) {
				var row = Ti.UI.createTableViewRow({ id:e.name, className:'row' });
				row.add(cities[e.id].getView());
				row.cityView = cities[e.id];
				$.cityList.appendRow(row);
				row.addEventListener('click', function(a) {
					a.row.cityView.update();
				});	
			});
		}
		*/
	}
	exports.cities=cities;	
};
