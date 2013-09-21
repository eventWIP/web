function contentLoader(){
	//Page Header Section
	var pageHeader = '<h3>Event Weather Impact Planner</h3>';
	pageHeader += '<h4>Please note; this site is currently under development and new functionalities will be added shortly</h4>';
	
	document.getElementById('pageHeader').innerHTML = pageHeader;

	//Map Right Content
	var searchContent = '<table class="neat"><tr><td><b>Search Options</b></td></tr><tr><td>Search Area:  <input id="buffersize" type="input" size="5" value="5" />miles</td></tr>';
	//searchContent += '<tr><td>Event Type: <input type="input" id="etype" value="FEST" size="10" /></td></tr>';
	searchContent += '<tr><td>Event Type: <select id="etype"><option value="">All Events</option><option value="ARTS">Arts</option><option value="BARPUB">Bar / Pub</option>';
	searchContent += '<option value="CLUB">Club</option><option value="COMEDY">Comedy</option><option value="COMEDY">Comedy</option>';
	searchContent += '<option value="DATE">Dating Event</option><option value="EXHIB">Exhibitions and Attractions</option>';
	searchContent += '<option value="FEST" selected=selected>Festivals</option><option value="KIDS">Kids / Family</option><option value="LGB">Gay / Lesbian</option>';
	searchContent += '<option value="LIVE">Live</option><option value="SPORT">Sport</option><option value="THEATRE">Theatre</option></select></tr></td>';
	searchContent += '<tr><td><input type="button" value="Select Location on Map" onclick="skiddlesearchon()" /></td></tr>'; 
	
	searchContent += '</table>';
	searchContent += '<div id="loading" class="hideLoad">Loading, please wait...<br /><img src="img/loader.gif" /></div>';
	
	document.getElementById('mapRight').innerHTML = searchContent;
	
	//Page South Section -- Results?
	var pageSouth = '';
	pageSouth += 'If you would like to get involved with this development please visit our GitHub page at <a href="https://github.com/eventWIP" />eventWIP [content to be added shortly]</a>';
	
	document.getElementById('pageSouth').innerHTML = pageSouth;
	
	//Page Footer Section
	var pageFooter = 'Developed as part of the <a href="http://2013.foss4g.org/geohack/challenges/events/"/>Geohack</a> Project at FOSS4G 2013 on behalf of the Health & Safety Laboratory. <br />';
	pageFooter += 'Current contributors include Timothy Aldridge, Matthew Hodgskiss, Neil Harris & Paul Wittle'; 
	
	document.getElementById('pageFooter').innerHTML = pageFooter;
}
