mui.init();
var musicId;
var audioUrl; 
var author;
var musicName;
var picUrl;
var flag = 0;


var audio = $("#audio")[0];
var $prev = $("#prve");
var $next = $("#next");
var $play = $("#play");
var $range = $("#range");




mui.plusReady(function(){
	var self = plus.webview.currentWebview();
	musicId = self.musicId;
	audioUrl = self.audioUrl;
	author = self.author;
	musicName = self.musicName;
	picUrl = self.picUrl;
	
	
	var arr = [{"musicId" : musicId,"audioUrl" : audioUrl,"author" : author,"musicName" : musicName,"picUrl" : picUrl}];
	console.log(localStorage.getItem("history"));
	var _value = JSON.parse(localStorage.getItem("history")); 
	if(_value){ 
		$.each(_value,function(index){
			if(_value[index].musicId !=  musicId){
				flag ++;
			}
		})
		
		//若当前localStorage中的历史记录中没有这首歌，就push并在此存储
		if(flag == _value.length){
			_value.push(arr[0]);
			var str = JSON.stringify(_value);
			localStorage.setItem("history",str);
		}  

	} else {
		//若当前歌单内没有歌曲就直接创建
		var str = JSON.stringify(arr);
		localStorage.setItem("history",str);
	}
	
	
	
	$("#singer").html('歌手：<span id="author">' + author +'</span>');
	$("#lrc").on("tap",function(){
		
	});
	$("#musicName").html(musicName);
//			document.write("musicId:" + musicId + "<br />");
//			document.write("audioUrl:" + audioUrl);
//	console.log(audioUrl);
	audio.setAttribute("src",audioUrl);
	audio.volume = 0.5;
	$range.val(audio.volume * 100);
	audio.play();
	
	$range.on("change",function(){
		audio.volume = $(this).val() / 100;
	})
	
	
	// 播放 暂停
	$play.on("tap",function(){
		var $icon = $(this).children().eq(0); 
		if(audio.paused) {
			audio.play();
			//状态变化
			$icon.removeClass("icon-xiaji1").addClass("icon-zanting1");
		} else {
			audio.pause();
			$icon.removeClass("icon-zanting1").addClass("icon-xiaji1");
		}
	//	musicTime();
	});
	
	// 下一曲
	next.onclick = function () {
		changeMusic('next');
	};
	
	// 上一曲
	prev.onclick = function () {
		changeMusic('prev');
	};
	
	
	function changeMusic(direction) {
		
	}
	
	var url = "http://music.163.com/api/song/lyric?os=pc&id="+musicId+"&lv=-1"; 
    mui.ajax(url,{
		dataType:'json',//服务器返回json格式数据
		type:'get',//HTTP请求类型
		timeout:10000,//超时时间设置为10秒；
		success:function(data){
			lrc = data.lrc.lyric;
//			lrc = lrc.replace(/\n/g,"<br />");
//			console.log(JSON.stringify(createArrMap(lrc)))
			renderLyric(lrc);
//			$("#lrc").html(lrc);
		}
	});
	
	function createArrMap(lyric) {
	    var timeArr = [],
	        lyricArr = [];
	    var tempArr = lyric.split("\n");
	    tempArr.splice(-1, 1);
	    var tempStr = "";
	    $(tempArr).each(function(index) {
	        tempStr = this;
	        if (tempStr.charAt(9).match(/\d/) !== null) {
	            tempStr = tempStr.substring(0, 9) + tempStr.substring(10);
	        }
	        timeArr.push(tempStr.substring(0, 10));
	        lyricArr.push(tempStr.substring(10));
	    });
	    return {
	        timeArr: timeArr,
	        lyricArr: lyricArr
	    };
	}
	
	
	function renderLyric(lrc) {
	    var arrMap = createArrMap(lrc);
	    var tpl = "";
	    $.each(arrMap.lyricArr, function(index, lyric) {
	        var lyricContent = lyric === "" ? "--------------" : lyric;
	        tpl += "<p class='' data-point='" + arrMap.timeArr[index] + "'>" + lyricContent + "</p>";
	    });
	    $("#lrc").html(tpl);
	}
});
