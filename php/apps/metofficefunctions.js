function metofficesearch(location_id){

	var urlStr = "apps/metofficerequest.php?location_id="+location_id;
	weather_info ={};
	$.ajax({url:urlStr,async:false,success:function(data){
		if(data !== 0){
			var returnArray = data.SiteRep.DV.Location;

			$.each(returnArray, function(key, weather_result) {
				weather_obj = {
					
					
					"weather_station_name":weather_result.name
				
				};

				weather_info[weather_result.i] = weather_obj;
			});



		} else {
			alert("Sorry, your search did not return any results");
		}
	}});

	return weather_info;
	
}
