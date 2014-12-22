exports.setName = function(name) {
    exports.name=name;
    $.name.text=name;
    
    return exports;
};

exports.getName = function() {
    return exports.name;
};

exports.update = function() {
	//exports.id=id;
	var url = "http://api.worldweatheronline.com/free/v1/weather.ashx?key=gmmgzuuef5tujyrmh88pq6fp&q="+Ti.Network.encodeURIComponent(exports.name)+"&format=json";
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	if(!JSON.parse(this.responseText).data.error) {
		    	var data=JSON.parse(this.responseText).data;
		    		    	
		    	exports.tempC = data.current_condition[0].temp_C;
		    	exports.tempK = data.current_condition[0].temp_K;
		    	exports.desc = data.current_condition[0].weatherDesc[0].value;
		    	exports.iconUrl = data.current_condition[0].weatherIconUrl[0].value;
		    	exports.tempMinC = data.weather[0].tempMinC;
		    	exports.tempMaxC = data.weather[0].tempMaxC;
		    	exports.tempMinF = data.weather[0].tempMinF;
		    	exports.tempMaxF = data.weather[0].tempMaxF;
		    	
		        $.temp.text = exports.tempC+"°C";
		        $.tempRange.text = exports.tempMinC+"°C to "+exports.tempMaxC+"°C";
		        $.desc.text = exports.desc;
		        $.icon.image = exports.iconUrl;
	       }
	       else {
	       		Ti.API.debug(JSON.parse(this.responseText).data.error);
	       		alert('Error.');
	       }
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
		                var sugg_loc = selected_location;
		                exports.setName(sugg_loc);
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
