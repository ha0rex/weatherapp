exports.setName = function(name) {
    exports.name=name;
};

exports.getName = function() {
    return exports.name;
};

exports.update = function(callback) {
	var url = "http://api.worldweatheronline.com/free/v1/weather.ashx?key=gmmgzuuef5tujyrmh88pq6fp&q="+exports.name+"&format=json";
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
	    onload : function(e) {
	    	exports.temp_C=JSON.parse(this.responseText).data.current_condition[0].temp_C;
	        Ti.API.log("A hőmérséklet kinten "+exports.name+", "+JSON.parse(this.responseText).data.current_condition[0].temp_C);
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
