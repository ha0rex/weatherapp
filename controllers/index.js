//Create table if not exists
var db = Ti.Database.open('weatherApp');
db.execute('CREATE TABLE IF NOT EXISTS cities(id INTEGER PRIMARY KEY, name TEXT);');
db.close();

//Init controller for cityList
var cityList = Alloy.createController('cityList');

//New button click listener
$.addNew.addEventListener('click', function() {
	//Popup a dialog
  	var dialog = Ti.UI.createAlertDialog({
    	title: 'Enter the name of the city, you would like to add',
    	style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
    	buttonNames: ['OK']
  	});
  	//Create the new city
	dialog.addEventListener('click', function(e){
		cityList.add(e.text);
  	});
  	//Show the dialog
  	dialog.show();		
});

//Add citylist to mainView
$.mainView.add(cityList.getView());

//Get all cities, and update them
cityList.updateAll();

//Open the navgroup
$.navgroup.open();