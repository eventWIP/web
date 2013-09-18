function metofficesearch(location_id,date){
	img_obj= {
		0:'/img/sun.png',
1:'/img/sun.png',
2:'/img/cloud.png',
3:'/img/cloud.png'
4:'null',
5:'/img/fog.png',
6:'/img/fog.png',
7:'/img/cloud.png',
8:'/img/cloud.png',
9:'/img/heavy rain.png',
10:'/img/heavy rain.png',
11:'/img/heavy rain.png',
12:'/img/heavy rain.png',
13:'/img/heavy rain.png',
14:'/img/heavy rain.png',
15:'/img/heavy rain.png',
16:'/img/snow.png',
17:'/img/snow.png',
18:'/img/snow.png',
19:'/img/heavy rain.png',
20:'/img/heavy rain.png',
21:'/img/heavy rain.png',
22:'/img/snow.png',
23:'/img/snow.png',
24:'/img/snow.png',
25:'/img/snow.png',
26:'/img/snow.png',
27:'/img/snow.png',
28:'/img/heavy rain.png',
29:'/img/heavy rain.png',
30:'/img/heavy rain.png'}

	}

	var urlStr = "apps/metofficerequest.php?location_id="+location_id;
	weather_info ={};
	var w_type = ''
	$.ajax({url:urlStr,async:false,success:function(data){
		if(data !== 0){
			var day_array = data.SiteRep.DV.Location.Period;
			
			$.each(day_array,function(key,obj){
				
				if (obj.value == date){
					w_type = img_obj[obj.Rep[0].W]
				}
				
				
			})

				
			



		} else {
			alert("Sorry, your search did not return any results");
		}
	}});

	return w_type;
	
}
