var map, bounds, mapPanel, accordian, viewport, searchPanel;
var osm, skiddlePoint, poiSaveStrategy, skiddleresult;
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
	
	//from answer to http://stackoverflow.com/questions/10368726/how-to-read-external-geojson-file-from-openlayers
	
	geojson_layer = new OpenLayers.Layer.Vector("GeoJSON", {
                projection: "EPSG:4326",
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: "./data/weather_locations.json",
                    format: new OpenLayers.Format.GeoJSON()
                })
            });
       
            map.addLayer(geojson_layer);

	
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
	
	var searchContent = 'Search Area:  <input id="buffersize" type="input" size="5" value="5" />miles<br />';
	searchContent += '<input type="button" value="Select Location on Map" onclick="skiddlesearchon()" />'; 
	
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
	
	//Skiddle point layer
	pointLayer = new OpenLayers.Layer.Vector("Point Layer", {renderers: renderer});
	var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;   
	map.addLayers([pointLayer]);
	
	//Skiddle Search Tool
	skiddlePoint = new OpenLayers.Control.DrawFeature(pointLayer, OpenLayers.Handler.Point);
	skiddlePoint.events.register('featureadded', skiddlePoint, function(f) {
		eventHandle(f.feature.geometry);
	});
	map.addControl(skiddlePoint);
	
	geoLocation();

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
	//Pickup the location
	var lonlat = e;
	
	//Convert latlon to WGS84 latlon
	lonlat = lonlat.transform(new OpenLayers.Projection("EPSG:900913"),new OpenLayers.Projection("EPSG:4326"));
	
	//Call the searches
	//skiddle here
	skiddleresult = skiddlesearch(e.x,e.y,document.getElementById('buffersize').value);
	//Facebook here
	facebookresult = "";
	
	//Process the searches to create the relevant points on the map
	generate_points(skiddleresult, facebookresult);
	
	//Deactivate the tool
	skiddlePoint.deactivate();
}

function generate_points(s, f){
	
	
}
