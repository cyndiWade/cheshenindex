//全局变量
var ul = "../agency.php";	 //代理服务器文件
// var sever_url = "http://121.199.12.139/cheshenOA"
var sever_url = "http://yunqiserver.xicp.net/cheshenOA";

/**
 * cookie操作类
 * @returns {Cookie}
 */
function Cookie() {
	//this.name = name;
	//this.val = val;
}
Cookie.prototype.setCookie = function (name,value) {//添加方法
	var Days = 1; 				//此 cookie 将被保存 30 天
	var exp = new Date();    //new Date("December 31, 9998");
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";path=/;";
}
//取cookies函数qwe
Cookie.prototype.getCookie = function (name)  {
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]); return null;
}
//取cookies函数
Cookie.prototype.delCookie = function(name) {//删除cookie
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=this.getCookie(name);
	if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+ ";path=/;";
}

var Cookie = new Cookie();		



/**
 * 同步模式AJAX提交		//console.log(result);调试
 */
var ajax_post_setup = function ($url,$data) {
	$.ajaxSetup({
		async: false,//async:false 同步请求  true为异步请求
	});
	var result = false;
	//提交的地址，post传入的参数
	$.post($url,$data,function(content){
		result = content;
	},'json');
	
	return result;
}






function b(){
	h = $(window).height();
	t = $(document).scrollTop();
	if(t >= 160){
		$('#gotop').show();
	}else{
		$('#gotop').hide();
	}
}
$(document).ready(function(e) {
	b();
	$('#gotop').click(function(){
		$(document).scrollTop(0);	
	})
	$('#code').hover(function(){
			$(this).attr('id','code_hover');
			$('#code_img').show();
		},function(){
			$(this).attr('id','code');
			$('#code_img').hide();
	})


	
});

$(window).scroll(function(e){
	b();		
})






$(function(){
	
	
	

		
		var is_login = Cookie.getCookie("user_key") || 0;
		if (is_login == false)
		{
			$(".logining").show()
			$(".logined").hide()
		}
		else {
			var account = Cookie.getCookie("account") || '';

			$(".logining").hide()
			$(".logined").show()
			$(".countname").html(account)
		}
			
			
		$(".exit").click(function(){
			var user_key = Cookie.delCookie("user_key")
			alert("您已成功退出！")
			window.location.href = '/';
		})
		
		
		
		

	 
		

		
			
			
})



