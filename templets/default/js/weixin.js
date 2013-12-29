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

//保存input输入值
function   fnSaveForm(){  
       window.external.AutoCompleteSaveForm(oForm);  
        oForm.input_one.value="";  
        oForm.input_two.value="";  
  }




$(window).scroll(function(e){
	b();		
})

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
	if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
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


$(function(){
	
	
			//*招聘点击js*
		$(".zpbox h3").click(function(){
		  if($(this).find("span").attr("class")=="dot_up2"){
			 $(this).find("span").attr("class","dot_up1")
			 $(this).parent("li").children(".zp_txt").slideDown()
			 }
		  else {
			   $(this).find(".dot_up1").attr("class","dot_up2")
			   $(this).parent("li").children(".zp_txt").slideUp()
		   }
		})


	

			$(".g_check").click(
				function(){
					if($(this).find("img").attr("src")=="images/g_checkon.png")	
					{
						$(this).find("img").attr("src","images/g_checkoff.png")
					}
					else
					{
						$(this).find("img").attr("src","images/g_checkon.png")
					}
				}
			)
			
			$(".g_zhucbtn").click(function(){
					$(this).parents(".g_denglubox").slideUp(100,function(){
						$(this).siblings(".g_zhucebox").slideDown(100)	
					})
			})
			
			$(".g_denglu").click(function(){
					$(this).parents(".g_zhucebox").slideUp(100,function(){
						$(this).siblings(".g_denglubox").slideDown(100)	
					})
			})
			
		// 输入密码
		
		
		var ul = "../agency.php";	 //代理服务器文件
		// var sever_url = "http://121.199.12.139/cheshenOA"
		var sever_url = "http://yunqiserver.xicp.net/cheshenOA";
		// 获取短信
		$("#getverify").click(function(){
			//提交的地址，post传入的参数
			var tel = $(".g_zhucebox .txtUsername").val()
			
			$.post(ul,{	 
				'server_url' : sever_url + '/Api/Send/register_send',
				 'telephone' : tel
			},function(obj){
				alert(obj.msg);
			},'json');	
		})	
		// 注册按钮
		$(".g_zhuce").click(function(){
			var tel = $(".g_zhucebox .txtUsername").val();
			var pas = $(".g_zhucebox .txtPassword").val();
			var secpas = $(".g_zhucebox .secPassword").val();
			var verify = $(".g_zhucebox .verify").val();
			
			$(".g_denglubox").slideUp(100,function(){
					$(".g_zhucebox").slideDown(100)	
			})
			$.post(ul,{	 
				'server_url' : sever_url + '/Api/Login/register',
				 'account' : tel,
				 'password' : pas,
				 'password_confirm' : secpas,
				 'verify' : verify
			},function(obj){
				if (obj.status == 0) {
					alert(obj.msg);
					$(".g_zhucebox").slideUp(100,function(){
						$(".g_denglubox").slideDown(100)	
					})
				} else {
					alert(obj.msg);	
				}
			},'json');	
		})

		
		// 登录按钮
		$(".login_go").click(function(){
			var tel = $(".g_denglubox .txtUsername").val();
			var pas = $(".g_denglubox .txtPassword1").val();
			$.post(ul,{	 
			'server_url' : sever_url + '/Api/Login/login',
			 'account' : tel,
			 'password' : pas
			},function(obj){
				if (obj.status == 0) {
					alert(obj.msg);
					Cookie.setCookie("user_key",obj.data.user_key);	//设置Cookie值
					Cookie.setCookie("account",obj.data.account);	 
					Cookie.setCookie("nickname",obj.data.nickname);	
				//	Cookie.setCookie("name",obj.data.memeber_info.name);
				//	Cookie.setCookie("date",obj.data.memeber_info.date);
				//	Cookie.setCookie("over_date",obj.data.memeber_info.over_date);
				//	Cookie.setCookie("member_rank",obj.data.memeber_info.member_rank);
				//	Cookie.setCookie("use_car_number",obj.data.memeber_info.use_car_number);
				//	Cookie.setCookie("car_number",obj.data.memeber_info.car_number);
					//return false;

						function delayURL(url) {
							 
								window.location.href = url;
							 
							setTimeout("delayURL('" + url + "')", 1000);
						}

					  delayURL("/index/gerenzhongxin/");
					 
					
				} else {
					alert(obj.msg);	
				}
			},'json');	
		})


		
		

		
			
			
})



