var map, bounds, mapPanel, accordian, viewport, searchPanel;
var osm, skiddlePoint, poiSaveStrategy, skiddleresult,weatherResult, eventPoints;
Proj4js.defs["EPSG:27700"] = "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs";
Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

//Pickup the browser size
var winW = 630, winH = 460;
if (document.body && document.body.offsetWidth) {
 winW = document.body.offsetWidth;
 winH = document.body.offsetHeight;
}
if (document.compatMode=='CSS1Compat' &&
    document.documentElement &&
    document.documentElement.offsetWidth ) {
 winW = document.documentElement.offsetWidth;
 winH = document.documentElement.offsetHeight;
}
if (window.innerWidth && window.innerHeight) {
 winW = window.innerWidth;
 winH = window.innerHeight;
}

function loadmap(){
	bounds = new OpenLayers.Bounds(
			-6.2400, 49.9400, 1.7800, 58.6700
	).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));
	
	var mapProj = new OpenLayers.Projection("EPSG:900913");
	
	map = new OpenLayers.Map({
        projection: mapProj,
        units: "m",
        numZoomLevels: 18,
        maxResolution: 156543.0339,
        maxExtent: bounds,
        layers: [
            new OpenLayers.Layer.OSM("OpenStreetMap", null, {
                transitionEffect: 'resize'
            })
        ],
        center: new OpenLayers.LonLat(405000,285000).transform(new OpenLayers.Projection("EPSG:27700"),new OpenLayers.Projection("EPSG:900913"))
    });
	
	// Load geojson of weather station locations
	//Style Map
	var invisibleStyle = {
		strokeOpacity: 1,
		fillOpacity: 1
	};
	var invisibleSty = OpenLayers.Util.applyDefaults(HoverStyle, OpenLayers.Feature.Vector.style["default"]);
	
	var insm = new OpenLayers.StyleMap({
		'default': invisibleSty
	});
	
	//from answer to http://stackoverflow.com/questions/10368726/how-to-read-external-geojson-file-from-openlayers
	
	geojson_layer = new OpenLayers.Layer.Vector("GeoJSON", {
                projection: "EPSG:4326",
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: "./data/weather_locations.json",
                    format: new OpenLayers.Format.GeoJSON()
                })
            });
       
            map.addLayer(geojson_layer,{
            	styleMap: insm
            });


		var selectFeatureControl = new OpenLayers.Control.SelectFeature(geojson_layer);
    
    map.addControl(selectFeatureControl);
    
	//from http://jsfiddle.net/XfEmn/
	
	// var urlStr = "./data/weather_locations.json";
	// $.get(urlStr,function(data){
		// if(data.responsetext!==null){
			// var returnArray = data.features;
			// alert(returnArray[0]);
		// } else {
			// alert("Sorry, your search did not return any results");
		// }
	// });
	
    map.events.register("click", map,  function(e) {
        selectFeatureControl.deactivate();
        var pos = this.getLonLatFromPixel(e.xy);        
        var point =  new OpenLayers.Geometry.Point(pos.lon, pos.lat);
        //var closest =_.min(geojson_layer.features, function(feature) {
            //return feature.geometry.distanceTo(point);
			
			findNearestWeatherStation(point.x,point.y)
			
			//var min = 1000000000000000;
			//var minFeat = null;
			//for (var i = 0; i < geojson_layer.features.length; i++) {
			//	var dist = Math.sqrt(
			//	Math.pow(point.x - geojson_layer.features[i].geometry.x, 2) + 
			//	Math.pow(point.y - geojson_layer.features[i].geometry.y, 2))
			//	//features[i].style = { visibility: 'hidden' };
			//	if (dist < min) {
			//		minFeat = geojson_layer.features[i];
			//		
			//	min = dist;
			//	}
			//}
			//var closest = minFeat;
			//alert (closest.attributes.id)
        //});
        //selectFeatureControl.activate();
        //selectFeatureControl.select(closest);        
    });
	
	
	//Define the mapPanel
	mapPanel = new GeoExt.MapPanel({
		region: 'center', 
		layout: 'fit',
		height:(winH-68),
		width: (winW-210), //Width minus the east or west panel width
		stateId: "map",
		map: map,
		title: 'Event Map',
		getState: function() {
			var state = GeoExt.MapPanel.prototype.getState.apply(this);
			state.width = this.getSize().width;
			state.height = this.getSize().height;
			return state;
		},
		applyState: function(state) {
			GeoExt.MapPanel.prototype.applyState.apply(this, arguments);
			this.width = state.width;
			this.height = state.height;
		},
		zoom: 10
	});
	
	var searchContent = '<table class="neat"><tr><td><b>Search Options</b></td></tr><tr><td>Search Area:  <input id="buffersize" type="input" size="5" value="5" />miles</td></tr>';
	searchContent += '<tr><td><input type="button" value="Select Location on Map" onclick="skiddlesearchon()" /></td></tr>'; 
	searchContent += '</table>'
	searchContent += '<div id="loading" class="hideLoad">Loading, please wait...<br /><img src="img/loader.gif" /></div>'
	
	searchPanel = new Ext.Panel({
		title: "Event Search",
		layout: 'fit',
		html: searchContent
	});
	
	accordion = new Ext.Panel({
		region:'east',
		margins:'5 0 5 5',
		split:true,
		width: 210,
		layout:'accordion',
		items: [searchPanel]
	});
	
	viewport = new Ext.Panel({ //Viewport would fill the full screen so I'm using a panel
		renderTo: 'mapPanel',
		height: winH-68,  //Trouble is that we need to specify a height.
		layout:'border',
		items:[accordion, mapPanel]
	});
	
	//Style Maps
	var HoverStyle = {
		strokeColor: "#00008B",
		fillColor: "#4169E1",				
		strokeOpacity: 0.85,
		fillOpacity: 0.85,
		pointRadius: 5,
		strokeWidth: 2
	};
	var HoverSty = OpenLayers.Util.applyDefaults(HoverStyle, OpenLayers.Feature.Vector.style["default"]);
	
	var hosm = new OpenLayers.StyleMap({
		'default': HoverSty
	});
	
	
	
	//Skiddle point layer
	pointLayer = new OpenLayers.Layer.Vector("Point Layer", {renderers: renderer});
	eventPoints = new OpenLayers.Layer.Vector("Events Layer", {
		renderers: renderer,
		styleMap: hosm
	});
	var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;   
	map.addLayers([pointLayer, eventPoints]);
	
	//Skiddle Search Tool
	skiddlePoint = new OpenLayers.Control.DrawFeature(pointLayer, OpenLayers.Handler.Point);
	skiddlePoint.events.register('featureadded', skiddlePoint, function(f) {
		eventHandle(f.feature.geometry);
	});
	map.addControl(skiddlePoint);
	
	geoLocation();

}

function findNearestWeatherStation(x,y) {
var min = 1000000000000000;
	var minFeat = null;
			
	if (geojson_layer.features.length > 0) {
			
		for (var i = 0; i < geojson_layer.features.length; i++) {
			var dist = Math.sqrt(
			//Math.pow(x - geojson_layer.features[i].geometry.x, 2) + 
			//Math.pow(y - geojson_layer.features[i].geometry.y, 2))
			Math.pow(x - geojson_layer.features[i].attributes.lon, 2) + 
			Math.pow(y - geojson_layer.features[i].attributes.lat, 2))
			//features[i].style = { visibility: 'hidden' };
			if (dist < min) {
				minFeat = geojson_layer.features[i];
				
			min = dist;
			}
		}
		var closest = minFeat;
		if(closest!==null){
				alert (closest.attributes.id);	
				weatherResult = metofficesearch(closest.attributes.id);
			
			
			$.each(weatherResult,function(key,obj){
			
				alert(weatherResult[key].weather_station_name)
			
			});
		}
	}
}

function geoLocation(){
	//Geolocation tools
	var geolocate = new OpenLayers.Control.Geolocate({
		bind: false,
		geolocationOptions: {
			enableHighAccuracy: true,
			maximumAge: 0,
			timeout: 7000
		}
	});
	
	//Register an event to add location if available
	firsttime = 0;
	var geolocationlayer = new OpenLayers.Layer.Vector('Current Location');
	map.addLayer(geolocationlayer);
	geolocate.events.register("locationupdated",geolocate,function(e) {
		var userLocation = new OpenLayers.LonLat(e.point.x, e.point.y);
		if (firsttime == 0){
			map.setCenter(userLocation);
			firsttime = 1;
		}
	});
	geolocate.watch = true;
	map.addControl(geolocate);
	geolocate.activate();	
}

function eventHandle(e){
	//Set the loader going
	document.getElementById('loading').className = 'showLoad';
	
	//Pickup the location
	var lonlat = e;
	
	//Convert latlon to WGS84 latlon
	lonlat = lonlat.transform(new OpenLayers.Projection("EPSG:900913"),new OpenLayers.Projection("EPSG:4326"));
	
	//Call the searches
	//skiddle here
	skiddleresult = skiddlesearch(e.x,e.y,document.getElementById('buffersize').value);
	//Facebook here
	$.each(skiddleresult,function(key,obj){


	fb_attend = getnumbers(obj.event_name.split(' ').join('+'),obj.venue_lat,obj.venue_long)
	findNearestWeatherStation(obj.venue_lat,obj.venue_long)
	skiddleresult[key].fb_yes = fb_attend.attending
	skiddleresult[key].fb_maybe = fb_attend.maybe
	skiddleresult[key].twit_score = twitter_search(obj.event_name)
	
	
	
	
	});
	
	//Process the searches to create the relevant points on the map
	generate_points(skiddleresult);
	
	//Deactivate the tool
	skiddlePoint.deactivate();
}

function generate_points(s){
	
	var proj = new OpenLayers.Projection("EPSG:4326");
	
	eventPoints.removeAllFeatures();
	$.each(s,function(key, detail){	
		var attributes = {
			event_id: key,
			event_name: detail.event_name,
			venue_name: detail.venue_name,
			venue_town: detail.venue_town,
			venue_postcode: detail.venue_postcode,
			venue_type: detail.venue_type,
			event_date: detail.event_date,
			event_imageurl: detail.event_imageurl,
			event_price: detail.event_price,
			fb_attend:detail.fb_yes,
			fb_maybe:detail.fb_maybe
		}
		var event_location = new OpenLayers.Geometry.Point(detail.venue_long, detail.venue_lat);
		event_location = event_location.transform(proj, map.getProjectionObject());
		var newEvent = new OpenLayers.Feature.Vector(event_location, attributes);
		eventPoints.addFeatures(newEvent);
	});
	eventPoints.refresh({force:true});
	
	//Set the loader going
	document.getElementById('loading').className = 'hideLoad';
}
