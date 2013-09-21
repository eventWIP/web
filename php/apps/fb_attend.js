function distance(lat1, lon1, lat2, lon2, unit) {
	    var radlat1 = Math.PI * lat1/180
	    var radlat2 = Math.PI * lat2/180
	    var radlon1 = Math.PI * lon1/180
	    var radlon2 = Math.PI * lon2/180
	    var theta = lon1-lon2
	    var radtheta = Math.PI * theta/180
	    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	    dist = Math.acos(dist)
	    dist = dist * 180/Math.PI
	    dist = dist * 60 * 1.1515
	    if (unit=="K") { dist = dist * 1.609344 }
	    if (unit=="N") { dist = dist * 0.8684 }
	    return dist
	}

function getnumbers(terms,lat,lon){
    
urls = []
attending =0
maybe =0   
    
$.ajax({
	url: 'apps/fb_request.php?rtype=1&q='+terms+'&type=event', async:false, success: function(response){
		$.each(response.data,function(key,obj){
			info_url = "apps/fb_request.php?rtype=2&objID="+obj.id;
         		attend_url= "apps/fb_request.php?rtype=3&objID="+obj.id;
	 		maybe_url= "apps/fb_request.php?rtype=4&objID="+obj.id;

			console.log('here');
		        urls.push({'attend':attend_url,'maybe':maybe_url,'info':info_url});
		        console.log(obj);	
		});
	}
});

near = false

$.each(urls,function(k,url){

            $.ajax({
url: url.info,
    async:false,
        success: function(response){
        
        if(response.venue) {

       if (distance(lat,lon,response.venue.latitude,response.venue.longitude,'m') < 10){
 
       near = true
       
       }
       }
        }})
if (near){
    $.ajax({
url: url.attend,
    async:false,
        success: function(response){
        attending= response.data.length + attending
        }})

    $.ajax({
url: url.maybe,
    async:false,
        success: function(response){
        maybe= response.data.length + maybe
        }})
     }  


})

return {'attending':attending,'maybe':maybe}
}
