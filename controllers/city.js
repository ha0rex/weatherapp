exports.setName = function(name) {
    exports.name=name;
    $.name.text=name;
};

exports.getName = function() {
    return exports.name;
};

exports.update = function(id, callback) {
	exports.id=id;
	var url = "http://api.worldweatheronline.com/free/v1/weather.ashx?key=gmmgzuuef5tujyrmh88pq6fp&q="+exports.name+"&format=json";
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	exports.temp_C=JSON.parse(this.responseText).data.current_condition[0].temp_C;
	        $.temp.text=exports.temp_C+"°C";
	        callback(exports);
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	        Ti.API.debug(e.error);
	        alert('error');
	    },
	    timeout : 5000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();		
};

exports.setLocal = function() {
	if (Ti.Geolocation.locationServicesEnabled) {
	    Titanium.Geolocation.purpose = 'Get Current Location';
	    Titanium.Geolocation.getCurrentPosition(function(e) {
	        if (e.error) {
	            Ti.API.error('Error: ' + e.error);
	        } else {
		        var longitude = e.coords.longitude;
		        var latitude = e.coords.latitude;//
		 
		        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
		        var maprequest = Ti.Network.createHTTPClient({
		             onload : function(e) {
		                var data = JSON.parse(this.responseText);
		                var address = data.results[0];
		                var str = address.formatted_address.split(", ");
		                selected_location = str[str.length-3];
		                var sugg_loc = selected_location.toUpperCase();
		                exports.setName(sugg_loc);
		                exports.update();
		             },
		             onerror : function(e) {
		 
		             },
		             timeout : 5000
		         });
		         maprequest.open("GET", url);
		         maprequest.send();
	        }
	    });
	} else {
	    alert('Please enable location services');
	}	
};
