function evt_pop(e, type){
	if (type=='on'){
		//OK first we need to find if there are any points near the location clicked
		var obj_grab = {};
		var obj_count = 0;
		if (typeof e !== 'undefined'){
			//We only process one result here
			var i = 0;
			var event_location = e.attributes.longitude + ", " + e.attributes.latitude;
			var event_id = e.attributes.event_id;
			
			//Add the popup controls
			var obj_name = "event_popup" + i;
			var obj_html = "<b>" + e.attributes.event_name + "</b><br />";
			var dateFormat = e.attributes.event_date.split("-");
			obj_html += "The event is taking place on " + dateFormat[2] + "/" + dateFormat[1] + "/" + dateFormat[0] + " <br />";
			obj_html += "This event is";
			if (e.attributes.event_price==0){
				obj_html += " free. <br />";
			} else {
				obj_html += " ticket event. Tickets cost " + e.attributes.event_price + " <br />";
			}
			obj_html += "There are " + e.attributes.fb_attend + " attending & " + e.attributes.fb_maybe + " maybe according to Facebook <br />";
			obj_html += "The event scored " + e.attributes.twit_score + " on our Twitter populatity test <br />";
			//if (e.attributes.event_date within 5 days){
			obj_html += "Weather Description: ";
			//Status cases go here
			obj_html += "<br />";
			//Add the icon
			if(e.attributes.w_type=="Weather information is not yet available. Please try again nearer the event start date"){
				obj_html += e.attributes.w_type;	
			} else {
				obj_html += "<img src='"+ e.attributes.w_type +"' />";	
			}
			
			window[obj_name] = new OpenLayers.Popup.FramedCloud("popup",
				new OpenLayers.LonLat.fromString(event_location).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913")),
		               	new OpenLayers.Size(350,200),
		               	obj_html,
		               	null,
		               	true);
		               
		        map.addPopup(window[obj_name]);
		}
	} else {
		map.removePopup("event_popup0");
	}
}
