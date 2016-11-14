var $uName = $("#userName");
var $psw = $("#userPassword");
var $pswS = $("#userPasswordSure");
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

$pswS.on("blur",function(){
	if($(this).val() == ""){
		$(this).attr("placeholder","确认密码不能为空！");
	}else if($psw.val() !== $pswS.val()){
		$(this).val("");
		$(this).attr("placeholder","确认密码与密码不一致！");
	}
});

function _register(){
	if($uName.val() !== "" && $psw.val() !== "" && $pswS.val() !==""){
		var _user = getUser($uName.val(),$psw.val());
		toRegister(_user);
	}
}


function getUser(_name,_psw){
	var user = {
		userID : _name,
		password : _psw
	};
	return user;
}

function toRegister(_user){
	$.ajax({
		type : "post",
		url : "http://datainfo.duapp.com/shopdata/userinfo.php",
		data : {status : "register",userID : _user.userID,password : _user.password},
		success : function(data){
			if(data == 0)
				alert("用户名重名!");
			if(data == 1)
				alert("注册成功!");
				location.href = "login.html";
			if(data == 2)
				alert("浏览器异常!请刷新页面重试！");
		}
	});
}

