var myScroll;
var  navScroll;
$(function(){
	load();
	navScroll();
	getData(0);
	getIconData();
	
//阻止它默认事件	
document.addEventListener("touchmove",function(e){
	e.preventDefault();
})
	
$("#wrapper").on("touchend",function(){
	//下拉刷新
	if(myScroll.y>0){
	  $("#scrollbar").html("");
	  getData(1);
	}
	//上拉刷新
	if(myScroll.y<myScroll.maxScrollY-50){		
		getData(2);
	}
})
})
 function load(){
 	myScroll = new IScroll("#wrapper",{
 		mouseWheel:true,
 		scrollbars:true,
 		//禁止滚动条来进行控制
// 		interactiveScrollbars:false
 	})
 	
 }

//初始化横向滚动条
function navScroll(){
	navScroll = new IScroll("#navs",{
		scrollX:true,
		click:true
	})
}


function getData(id){
//	$("#loading").show();
	$.ajax({
		type:"get",
//		dataType:"jsonp",
		url:" http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",
		data:{classID:id},
		success:function(data){

//			var info = data.split("callback(");
//			var  info2 = info[1].split(")");
//			var info3 = eval(info2[0])
//		    console.log(info3);
			if(data.length){
				 var $scrollBox = $("#scrollbar");
				$.each(data,function(index){
			     //拼接字符串
			     var $prodbox = $("<div class='prodbox'>");
			     var imgBox = $("<div class='imgBox'>图片加载中....</div>");
			     var thisimg = $("<img src='"+data[index].goodsListImg+"' />");
			     var prodname = $("<div class='prodname'>"+data[index].goodsName+"</div>");
			     var pricebox =$("<div class='pricebox'>"+data[index].goodsID+"</div>");
			     $prodbox.append(imgBox);
			     $prodbox.append(prodname);
			     $prodbox.append(pricebox);
			     thisimg.on("load",function(){
			     	myScroll.refresh();
			     	imgBox.empty();
			     	imgBox.append(thisimg);
			     });
			     /*touchstart*/
			     thisimg.on("click",function(){
   	               window.location="prodetail.html?goodsID="+encodeURI(data[index].goodsID);
			     })
			     $scrollBox.append($prodbox);
				});
				
			}
			
			
		}
		
	})
}

function getIconData(){
	$.ajax({
		type:"get",
		url:" http://datainfo.duapp.com/shopdata/getclass.php",
		async:true,
		success:function(data){
			var navWidth = 0;
			var thisdata = JSON.parse(data);
			var $group = $("#iconfontGroup");
			$.each(thisdata,function(index){
				     navWidth+=50;
					var icons = $("<i class='icon iconfont iconbox'>"+thisdata[index].icon+"</i>")
				    icons.on("click",function(){
				    		  $("#scrollbar").html("");
	                          getData(thisdata[index].classID);	
				    })
				   $group.append(icons)
			})
			$("#iconfontGroup").width(navWidth);
			navScroll.refresh();
		}
	});
	
	
	
}
