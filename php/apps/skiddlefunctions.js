function skiddlesearchon(){
	pointLayer.removeAllFeatures();
	skiddlePoint.activate();
}

function skiddlesearch(x,y,buffer,v,limit,offset){
	if (typeof v=='undefined'){
		var venue_t = '';
	} else if (v=='ALL' || v==''){
		venue_t = '';
	} else {
		venue_t = v;
	}
	var numPages = 1;
	event_info ={};
	for (var page= 1;page<=numPages;page++){
		var urlStr = "apps/skiddlerequestlimitoffset.php?eventcode=" + venue_t + "&latitude="+y+"&longitude="+x+"&radius="+buffer+"&limit="+limit+"&offset="+(page-1)*limit;
		$.ajax({url:urlStr,async:false,success:function(data){
			if(data.responsetext!==null){
				var returnArray = data.results;
				var numResults = data.totalcount;
				var pageCount = data.pagecount;
				numPages = numResults%limit+1; //is this allowed?? i doubt it
				$.each(returnArray, function(key, event_result) {
					if(event_result.venue.type=='Outdoors'){
						event_obj = {
							"event_name": event_result.eventname,
							"venue_name": event_result.venue.name,
							"venue_address": event_result.venue.address,
							"venue_town": event_result.venue.town,
							"venue_postcode": event_result.venue.postcode,
							"venue_lat": event_result.venue.latitude,
							"venue_long": event_result.venue.longitude,
							"venue_type": event_result.venue.type,
							"event_link": event_result.link,
							"event_date": event_result.date,
							"event_imageurl": event_result.imageurl,
							"opening_open": event_result.openingtimes.doorsopen,
							"opening_close": event_result.openingtimes.doorsclose,
							"event_price": event_result.entryprice
						};
		
						event_info[event_result.id] = event_obj;
					}
				});
				
			
				
			} else {
				alert("Sorry, your search did not return any results");
			}
		}});
	}
	return event_info;
	
}
