var cities = ['*', 'Debrecen', 'Amsterdam', 'Budapest', 'Bucharest'];

var cityList = Alloy.createController('cityList');
cityList.setData(cities);
$.mainView.add(cityList.getView());

//var local=Alloy.createController('city');
//local.setLocal();
//cities.push(local);

$.index.open();