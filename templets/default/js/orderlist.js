//日期选择器模块
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

$(function(){

	// 判断送货地址 不需要 框隐藏
	var is_checked2 =$(".checked2")
	if (is_checked2.prop('checked') == true)
		{ 
			
			$(".sendcarbox").hide()	
			
	}
	//选择车型 进入订单下一步
	
	
		$(".car_chooose_x a").click(function(){
			var mm= $(this).index()
			var nn;
			
			if(mm==0){nn=50}
			if(mm==1){nn=100}
			if(mm==2){nn=200}
			if(mm==3){nn=400}
			if(mm==4){nn=800}
		
			$(".order_step2").css("display","block");
			$(this).parents(".dc_bgbox").css("position","absolute").animate({left:-3000},0)
			$(".ordercont1").css("display","block").animate({opacity:1},1000)
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
				$.each(cars_data[nn], function (i, n) {
					var photos = n.cars_photos[0];
					var cars_id = n.id;
					var seat_num = n.seat_num;
					var car_num = n.car_num;
					var type = n.type;
					var model = n.model;
					var color = n.color;

					if (photos != undefined)
					{
						var photo = photos.url;	//
						var brand = n.brand;

						$(".car_list").append("<tr data-cars_id="+ cars_id +" data-brand="+brand+"><td width='190' align='center'><img src='"+photo
						+"' width='170'></td>"
						+"<td ><div class='car_tit'>"+brand + "</div>"
							+"<dl>"
								+"<dd><span class='ico_person'></span> ×"+ seat_num +"人 </dd>"
								+"<dd>车牌号码："+ car_num +"</dd>"
								+"<dd>车辆类型："+type+"</dd>"
								+"<dd>车辆型号："+model+"</dd>"
								+"<dd>车辆颜色："+ color+"</dd>"
								+"<dd><a class='bsn_red'>预订</a></dd>"
							 +"</dl>"
						+"</td>"
					+"</tr>");
					} 
				});

			//表格参数设置
	
			$(".carlist").dataTable( {
				"sPaginationType": "full_numbers",
				"bLengthChange": false, 
				"bAutoWidth": true,//自动宽度
				"bPaginate": true, //翻页功能
				"bFilter": true, //过滤功能
				"bSort": false, //排序功能
				"bInfo": true,//页脚信息
				"iDisplayLength":3
			});
			
			set_sdfsd()

		}

	})	
	
	
	
	
	
	
	 
	//提交订单
	$(".tjdd").click(function(){
		//运动框架 显示订车状态
		    var cars_id = $('.cars_id').val();	
			var start_schedule_time = $('.start_schedule_time').val(); //用车时间 
			var over_schedule_time = $('.over_schedule_time').val();  //还车时间
			var is_checked = $('.ischecked');
			var remarks = $('.remarks').val(); // 送货地址
			var is_checked1 = $('.checked1');
			var is_checked2 = $('.checked2');
			var is_need_driver;
			var is_need_sendcar;
			
			var is_login = Cookie.getCookie("user_key") || 0;
			if (is_login == false)
			{
				alert("对不起，请先登录！")
				window.location.href = '/index/member/login.php';
			}
			
			
			if (is_checked1.prop('checked') == true)
			{ 
				is_need_driver = 1;
			} else {
				is_need_driver = 0;	
			}
			if (is_checked2.prop('checked') == true)
			{ 
				is_need_sendcar = 1;
				$(".sendcarbox").hide()	
				
			} else {
				is_need_sendcar = 0;
				if(remarks==""){
					if(start_schedule_time==""){
						$(".start_schedule_time").focus();
					}
					else if(over_schedule_time==""){
						$(".over_schedule_time").focus();
					}
					else{
						alert("我们的车该送到哪儿？");
						$(".remarks").focus();
						return false
					}
				}
			}
			 
				
				
			//提交订单
			var order_submit_server = ajax_post_setup(ul,{
				'server_url' : sever_url + '/Api/Order/apply',
				'user_key' : Cookie.getCookie("user_key"),
				'start_schedule_time' :start_schedule_time,
				'over_schedule_time' : over_schedule_time,
				'cars_id' : cars_id,
				'remarks' : remarks,
				'is_need_driver' : is_need_driver, 
				'give_car' : is_need_sendcar
			});

			//状态分析
			if (order_submit_server == false)
			{
				alert('请求超时，请稍后再试');
			} else if (order_submit_server.status == 0)
			{
				
				 $(this).parents(".ordercont2").css("position","absolute").animate({left:-3000},700)
				 $(".step_tit2").addClass("step_tit4")
				 $(".ordercont3").css("display","block").animate({opacity:1},500)
				 backgrxx()
				

			} else {
				alert(order_submit_server.msg);

			}

	}) 
	 
		

	//需要送车 隐藏地址
	$(".checked2").click(function(){
		$(".sendcarbox").hide()	
	})
	$(".checked3").click(function(){
		$(".sendcarbox").show()	
	})

	
	//时间插件
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

	

})


function backgrxx()
{
var t=setTimeout("window.location.href = '/index/wodedingdan/'",2000)
}


var set_sdfsd = function  () {
		
		 //选择订车
		 $(document).delegate('.bsn_red', 'click', function() { 
			
			//登陆验证
			var is_login = Cookie.getCookie("user_key") || 0;
			var cars_id = $(this).parents("tr").data('cars_id');
			
			var brand = $(this).parents("tr").data('brand');

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
			
				var member_rank = member_info.data.member_rank || '';
				//写入HTML中
				$(".g_member_rank").html(member_rank);
				$(".models").html(brand);
				$(".cars_id").val(cars_id);

			}
			//框架运动 显示下一步


			 $(this).parents(".ordercont1").css("position","absolute").animate({left:-3000},700)
			 $(".step_tit2").addClass("step_tit3")
			 $(".ordercont2").css("display","block").animate({opacity:1},500)
			
		}) 
		 
		 
		 //重选车辆
		 
		 $(".cxcl").click(function(){
			 $(".step_tit2").removeClass("step_tit3")
			 $(this).parents(".ordercont2").css({"position":"relative","display":"none"}).animate({"opacity":0},700)
			 
			 $(".ordercont1").css("position","relative").animate({"left":"+=" +3000,"opacity":1},700)	  

		})
	}



