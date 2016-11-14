
var _value = JSON.parse(localStorage.getItem("history"));
if(_value){
	$(".history").html(_value.length + "首");
}

$.getJSON("../lib/gedan.json",function(data){
	$(".all").html(data.length + "首");
})



$("#li1").on("tap",function(){
	mui.openWindow({
		url:'dataList.html',
		extras : {
			title : "全部歌曲"
		}
	})
})

$("#li2").on("tap",function(){
	mui.openWindow({
		url:'dataList.html',
		extras : {
			title : "最近播放"
		}
	})
})



var user = getUserName();
console.log(user)
if(user){
	$("#tou").attr("src","../img/tou.png");
	$(".uName").text(user); 

} else {
	$(".uName").text("未登录"); 
}
