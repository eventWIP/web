function metofficesearch(location_id){
	var urlStr = "apps/metofficerequest.php?location_id="+location_id;
	$.get(urlStr,function(data){
		if(data.responsetext!==null){
			var returnArray = data
			alert(returnArray[0]);
		} else {
			alert("Sorry, your search did not return any results");
		}
	});
}
