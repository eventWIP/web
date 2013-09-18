function metofficesearch(location_id,date){

	var urlStr = "apps/metofficerequest.php?location_id="+location_id;
	weather_info ={};
	$.ajax({url:urlStr,async:false,success:function(data){
		if(data !== 0){
			var day_array = data.SiteRep.DV.Location.Period;
			var w_type = ''
			$.each(day_array,function(key,obj){
				
				if (obj.value == date){
					w_type = obj.Rep[0].W
				}
				
				
			})

				
			});



		} else {
			alert("Sorry, your search did not return any results");
		}
	}});

	return w_type;
	
}
