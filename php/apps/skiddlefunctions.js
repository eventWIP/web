function skiddlesearchon(){
	pointLayer.removeAllFeatures();
	skiddlePoint.activate();
}

function skiddlesearch(x,y,buffer){
	var urlStr = "apps/skiddlerequest.php?eventcode=FEST&latitude="+y+"&longitude="+x+"&radius="+buffer;
	$.get(urlStr,function(data){
		if(data.responsetext!==null){
			var returnArray = data.results;
			alert(returnArray[0]);
		} else {
			alert("Sorry, your search did not return any results");
		}
	});
}
