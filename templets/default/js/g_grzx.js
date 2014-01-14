$(function(){
		
		
		//登陆验证
		var is_login = Cookie.getCookie("user_key") || 0;
		if (is_login == false)
		{
			alert("对不起，请先登录！")
			window.location.href = '/index/member/login.php';


		}
		
		else{
			var user_key = Cookie.getCookie("user_key");

			//获取会员信息
			var member_info = ajax_post_setup(ul,{
				'server_url' : sever_url + '/Api/Member/get_member_info',
				'user_key' : user_key,
			});
			

			//赋值
			var account = Cookie.getCookie("account") || '';
			var nickname = Cookie.getCookie("nickname") || '';
			var date = member_info.data.date || '';
			var name = member_info.data.name || '';
			var over_date = member_info.data.over_date || '';
			var member_rank = member_info.data.member_rank || '';
			var use_car_number = member_info.data.use_car_number || '';
			var car_number = member_info.data.car_number || '';
			

			//写入HTML中
			$(".g_account").html(account);
			//$(".g_nickname").html(nickname);
			$(".g_name").html(name);
			$(".g_date").html(date);
			$(".g_over_date").html(over_date);
			$(".g_member_rank").html(member_rank);
			$(".g_use_car_number").html(use_car_number);
			$(".g_car_number").html(car_number);	


		}

		


		



			
})