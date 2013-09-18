function twitter_search(terms){
var score
var urlStr = "apps/twitter/twitter_search.php?terms="+terms;
//alert(urlStr);
$.ajax({url:urlStr,async:false,success:function(data){
score = data.statuses.length/100

}});
return score
}
