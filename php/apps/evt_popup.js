function evt_pop(e, type){
	if (type=='on'){
		//OK first we need to find if there are any points near the location clicked
		var obj_grab = {};
		var obj_count = 0;
		if (typeof e !== 'undefined'){
			//We only process one result here
			var i = 0;
			var event_location = new OpenLayers.Geometry.Point(e.attributes.longitude, e.attributes.latitude);
			var event_id = e.attributes.event_id;
			
			//Add the popup controls
			var obj_name = "event_popup" + i;
			var obj_html = "<b>" + e.attributes.event_name + "</b><br />";
			obj_html += "The event is taking place on " + e.attributes.event_date + " <br />";
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
			//obj_html += "<img src='"+ e.attributes.w_type +"/' />";
			obj_html += "<img src='img/cloud.png' />";
			
			window[obj_name] = new OpenLayers.Popup("chicken",
				event_location,
		               	new OpenLayers.Size(300,200),
		               	obj_html,
		               	true);
		
		    	map.addPopup(window[obj_name]);
		}
	} else {
		map.removePopup("event_popup0");
	}
}
