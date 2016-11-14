var $uName = $("#userName");
var $psw = $("#userPassword");
var user = getUserName();
var passWord = getUserPsw();


mui.init({  
    beforeback: function() {  
    //获得列表界面的webview  
    var list = plus.webview.currentWebview().opener();  
    console.log(list.id)
    //触发列表界面的自定义事件（refresh）,从而进行数据刷新  
    mui.fire(list, 'refresh');  
    //返回true，继续页面关闭逻辑  
    return true;  
    }  
});


$(function(){
	if(user){
		$("#userName").val(user);
		$("#userPassword").val(passWord);
		$("#checkbox").attr("checked","true");
	}
});

$uName.on("blur",function(){
	var reg = /\w{6,18}/;
	if($(this).val() == ""){
		$(this).attr("placeholder","用户名不能为空！");
	}else if(!reg.test($(this).val())){
		$(this).val("");
		$(this).attr("placeholder","用户名格式非法！");
	}
});

$psw.on("blur",function(){
	var reg = /^[a-z0-9_-]{6,18}$/;
	if($(this).val() == ""){
		$(this).attr("placeholder","密码不能为空！");
	}else if(!reg.test($(this).val())){
		$(this).val("");
		$(this).attr("placeholder","密码格式非法！");
	}
});


function _login(){
	if($uName.val() !== "" && $psw.val() !== ""){
		var _user = getUser($uName.val(),$psw.val());
		mui.plusReady(function(){
			plus.nativeUI.showWaiting();//这里是开始显示原生等待框
		})
		toLogin(_user);
	}
}


function getUser(_name,_psw){
	var user = {
		userID : _name,
		password : _psw
	};
	return user;
}

function toLogin(_user){
	console.log(_user.password);
	$.get("http://datainfo.duapp.com/shopdata/userinfo.php",{status:"login",userID:_user.userID,password:_user.password},function(data){
		console.log(_user);
		console.log(data);
		if(data.charAt(0) == "{"){
			mui.plusReady(function(){
			    plus.nativeUI.closeWaiting();//这里监听页面是否加载完毕，完成后关闭等待框
			}) 
			alert("登陆成功！");
			var str = '{"userID":"' + _user.userID + '","password":"' + _user.password + '"}';
			localStorage.setItem("user",str);
			mui.openWindow({
			    url: '../index.html'
			});
		}else{
			alert("登陆失败！请检查密码是否错误！");
		}
	});
}
