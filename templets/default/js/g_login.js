$(function(){
	//是否保存用户
	/*  $(".g_check").click(
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
	*/
	

	//注册登录切换

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