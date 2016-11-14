
//用于获取用户名
function getUserName(){
	var user = localStorage.getItem("user");
	if(user){
		return JSON.parse(user).userID;
	}else{
		return null;
	}
}

//用于获取用户名对应的密码
function getUserPsw(){
	var user = localStorage.getItem("user");
	if(user){
		return JSON.parse(user).password;
	}else{
		return null;
	}
}
