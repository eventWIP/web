function skiddlesearchon(){
	pointLayer.removeAllFeatures();
	skiddlePoint.activate();
}

function skiddlesearch(x,y,buffer){
	var urlStr = "apps/skiddlerequest.php?eventcode=FEST&latitude="+y+"&longitude="+x+"&radius="+buffer;
	//alert(urlStr);
	$.get(urlStr,function(data){
		alert(data.toSource());
	});
}