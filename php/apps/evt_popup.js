function evt_pop(e){
	//OK first we need to find if there are any points near the location clicked?
	
	//
	//Add the popup control
	event_popup = new OpenLayers.LonLat(5,40),
               new OpenLayers.Size(200,200),
               "example popup",
               true);

    	map.addPopup(popup);
}
