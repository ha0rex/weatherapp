//Function to set the name of a city
exports.setName = function(name) {
    exports.name=name;
    $.name.text=name;
    
    return exports;
};

//Function to get the name of a city
exports.getName = function() {
    return exports.name;
};

//Function to set a city as local
exports.setLocal = function() {
	exports.local=true;
};

//Function to update a city's weather data
exports.update = function(callback) {
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
		    	exports.city = data.request[0].query.split(", ")[0];
		    	exports.country = data.request[0].query.split(", ")[1];
		    	
		        $.name.text = exports.city;
		        $.country.text = exports.country;
		        $.temp.text = exports.tempC+"°C";
		        $.tempRange.text = exports.tempMinC+"°C to "+exports.tempMaxC+"°C";
		        $.desc.text = exports.desc;
		        $.icon.image = exports.iconUrl;
		        $.local.text = exports.local?'Local weather':'';
		        
		        if(callback)
		       		callback(true);
	       }
	       else {
	       		Ti.API.debug(JSON.parse(this.responseText).data.error);
	       		if(callback)
	       			callback(false);
	       }
	    },	
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
	        Ti.API.debug(e.error);
	    },
	    timeout : 5000  // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();		
};
