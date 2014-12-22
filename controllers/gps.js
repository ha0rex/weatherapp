exports.getSettlementName = function(callback) {
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
		                callback(sugg_loc);
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