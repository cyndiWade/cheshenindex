

 
(function(){
		
		
		
		//登陆验证
		var is_login = Cookie.getCookie("user_key") || 0;
		if (is_login == false)
		{
			alert("对不起，请先登录！")
			window.location.href = '/index/member/login.php';

		}
		var user_key = Cookie.getCookie("user_key");	//身份标识


		//获取会员信息
		var member_info = ajax_post_setup(ul,{
			'server_url' : sever_url + '/Api/Order/get_user_orders',
			'user_key' : user_key,
			
		});


		
		
		if (member_info == false)
		{
			alert('请求超时，请稍后尝试');
			return false;
		} else if (member_info.status != 0)
		{
			alert('您没有订单');
		} 

		else{
			var oderlist = member_info.data;
			$.each(oderlist ,function(i,n){
			 var oder_id = n.id;
			 var order_num= n.order_num;
			 var start= n.start;
			 var estimate_over= n.estimate_over;
			 var length= n.length;
			 var exceed_date= n.exceed_date;
			 var brand= n.brand;
			 var is_need_driver= n.is_need_driver;
			 var time= n.time;
			 var order_state_name= n.order_state_name;
				
			
			 $("#order_list").append("<tr data-oder_id="+ oder_id +" data-brand="+brand+"><td class='order_num'>"
			 + order_num+"</td><td class='start'>"
			 +start+"</td><td class='estimate_over'>"
			 + estimate_over+"</td><td class='length'>"
			 +length+"</td><td class='exceed_date'>"
			 +exceed_date+"</td><td class='brand'>"
			 +brand+"</td><td class='is_need_driver'>"
			 +is_need_driver+"</td><td class='time'>"
			 +time+"</td><td class='order_state_name'>"
			 +order_state_name+"</td><td class='cancel'><a href='javascript:;'><img src='/index/templets/default/images/quxiao.png' alt='取消订单'></a></td></tr>");
			})

		}

		$(".cancel").click(function(){
			
			if (confirm("确定取消吗？取消后无法恢复！") == false)

			{
				return false;
			}

			var oder_id = $(this).parent("tr").data('oder_id');
			var order_submit_cancel = ajax_post_setup(ul,{
				'server_url' : sever_url + '/Api/Order/cancel_order',
				'user_key' : Cookie.getCookie("user_key"),
				'order_id' :oder_id
					
			});
			
			if (order_submit_cancel == false)
			{
				alert('请求超时，请稍后再试');
			} else if (order_submit_cancel.status == 0)
			{
				
				alert(order_submit_cancel.msg);
				window.location.href = '/index/wodedingdan/';

			} else {
				alert(order_submit_cancel.msg)
			}

		})


		var order_state_name = $('.order_state_name');
		order_state_name.each(function () {
				
			var _this = $(this);
			if (_this.text() == '取消订单')
			{
				_this.addClass('red1');
			} else {
				
				_this.addClass("green1");
			}
		});
	   
	
})();



(function ($) {

	$('#example').dataTable( {
		"sPaginationType": "full_numbers",
		"bLengthChange": false, 
		"bAutoWidth": true,//自动宽度
		"bPaginate": true, //翻页功能
		"bFilter": true, //过滤功能
		"bSort": false, //排序功能
		"bInfo": true,//页脚信息
		"iDisplayLength":5
	} );

})(jQuery);



