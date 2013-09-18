function evt_pop(e){
	//OK first we need to find if there are any points near the location clicked
	var obj_grab = {};
	var obj_count = 0;
	
	//Did we find anything?
	if (obj_count !== 0){
		var i = 0;
		$.each(obj_grab, function(obj){
			//Add the popup controls
			var obj_name = "event_popup" + i;
			var obj_html = ""
			window[obj_name] = new OpenLayers.Popup("chicken",
				obj.point,
		               	new OpenLayers.Size(200,200),
		               	obj_html,
		               	true);
		
		    	map.addPopup(popup);
		    	i = i + 1;
		});
	}
}
