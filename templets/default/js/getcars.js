
$(function(){
		$(".cannot").click(
				function(){
					alert("对不起，该车型暂时没有多余的车辆可供使用！")	
				}
			)
			$(".dche").hover(
				function(){
					var i = $(this).index()	;	
					$(".dchebox").eq(i).stop(false,true).fadeIn().siblings().stop(false,true).hide()
					$(".dc_dotp img").css("opacity","0.5").eq(i).css("opacity","1")
				}
				
			)
})




$(function(){

	//日期选择器模块
	(function () {
		$(".paging a").each(function(i){
			$(this).attr("rel",i+1)
			if(i == 2){
				return false;
			}
		})

		$('.form_datetime').datetimepicker({
					format: 'yyyy-mm-dd hh:ii',
					language:  'zh-CN',
					weekStart: 1,
					todayBtn:  1,
					autoclose: 1,
					todayHighlight: 1,
					startView: 2,
					forceParse: 0,
					showMeridian: 1

		});
	
	});


 
		
	
	//轮播图模块
	(function () {
	
		var adam_tabsContent = $('#adam-tabsContent');	//轮播图容器
	
		//请求车辆数据
		var cars_data_result = ajax_post_setup(ul,{
			'server_url' : sever_url + '/Api/Cars/cars_list'
		});
		
		if (cars_data_result == false)
		{
			alert('请求超时');
		
		} else if (cars_data_result.status != 0)
		{
			alert(cars_data_result.msg);

		} else {
	
			var cars_data = cars_data_result.data;		//获取车辆数据
			
			
			$.each(cars_data[400], function (i, n) {
					var photos = n.cars_photos[0];
					var cars_id = n.id;

					if (photos != undefined)
					{
						var photo = photos.url;	//
						var brand = n.brand;

						$(".adam-scroll").eq(2).find(".adam-big-img ul").append("<li data-cars_id="+ cars_id +" data-brand="+brand+"><a href='#myModal' data-toggle='modal'><img src='"+ photo +"'/></a></li>");
						$(".adam-scroll").eq(2).find(".adam-small-imglist").append("<dd><a><img src='" + photo + "' width='80'/></a></dd>");
					} 

					
					 
			});
			$.each(cars_data[800], function (i, n) {
					var photos = n.cars_photos[0];
					var cars_id = n.id;

					if (photos != undefined)
					{
						var photo = photos.url;	//
						var brand = n.brand;

						$(".adam-scroll").eq(3).find(".adam-big-img ul").append("<li data-cars_id="+ cars_id +" data-brand="+brand+"><a href='#myModal' data-toggle='modal'><img src='"+ photo +"'/></a></li>");
						$(".adam-scroll").eq(3).find(".adam-small-imglist").append("<dd><a><img src='" + photo + "' width='80'/></a></dd>");
					} 

					
					 
			});
			$(".adam-big-img ul li a").click(function(){
					var brand = $(this).parent("li").data('brand');
					var cars_id = $(this).parent("li").data('cars_id');
					$(".cars_name").html(brand);
					$(".cars_id").val(cars_id);
					$('.start_schedule_time').val('');
					$('.over_schedule_time').val('');
					$('.remarks').val('');
			})



		}
		$("#adam-eff").adam_Eff();

	})();

	
	//提交订单模块！
	(function () {
		
		var btn_sub = $('.btn_sub');			//提交订单

		btn_sub.click(function () {

			var cars_id = $('.cars_id').val();
			var remarks = $('.remarks').val();		
			var start_schedule_time = $('.start_schedule_time').val(); //用车时间 
			var over_schedule_time = $('.over_schedule_time').val();  //还车时间
			var is_checked = $('.ischecked');
			var is_need_driver;
			
			  
				
			var is_login = Cookie.getCookie("user_key") || 0;
			if (is_login == false)
			{
				alert("对不起，请先登录！")
				window.location.href = '/index/member/login.php';
			}
			
			if (is_checked.prop('checked') == true)
			{ 
				is_need_driver = 1;
			} else {
				is_need_driver = 0;	
			}


				
			//提交订单
			var order_submit_server = ajax_post_setup(ul,{
				'server_url' : sever_url + '/Api/Order/apply',
				'user_key' : Cookie.getCookie("user_key"),
				'start_schedule_time' :start_schedule_time,
				'over_schedule_time' : over_schedule_time,
				'cars_id' : cars_id,
				'is_need_driver' : is_need_driver, 
				'remarks': remarks
			});
			//状态分析
			if (order_submit_server == false)
			{
				alert('请求超时，请稍后再试');
			} else if (order_submit_server.status == 0)
			{
				
				alert(order_submit_server.msg);
				window.location.href = '/index/wodedingdan/';

			} else {
				alert(order_submit_server.msg)
			}
			

			});
		
		
		})();

		
});



