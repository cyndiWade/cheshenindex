(function(){
	var ht= $(".shijiabox").html()
		
	$(".checked2").click(function(){
			$(".shijiabox").html(ht)
		$(".shijiabox").css("display","block")
		$(".shijiabox2").css("display","none")
	})

	$(".checked3").click(function(){
		
		$(".shijiabox").next(".Validform_checktip").remove();
		$(".shijiabox").html("").css("display","none");
		$(".shijiabox2").css("display","block")
	})

})()


$(function(){
	//试驾费用

	
	
	
	//提交试驾申请！
	(function () {
		
			
		
		
			
			

			$(".applyform").Validform(
			{
				tiptype:2,
				beforeSubmit:function () {	
				var tijiao1 = $('.tijiao1');			//试驾申请
				var models = $('#models').val();
				// var appellation = $('#appellation').val();
				// var surnames = $('#surnames').val();
				var name = $('#name').val();
				var phone = $('#phone').val();
				var age = $('#age').val();
				var possess_vehicle = $('#yiyouche').val();
				// var email = $('#email').val();
				var number = $('#number').val();
				var date_time = $('#date_time').val();

					//提交订单
					var tijiao1_server = ajax_post_setup(ul,{
						'server_url' : sever_url + '/Api/Drive/apply',
						'models':models,
					//	'appellation':appellation,
					//	'surnames':surnames,
						'name':name,
						'phone':phone,
						'age':age,
						'possess_vehicle':possess_vehicle,
					//	'email':email,
						'number':number,
						'date_time':date_time
						
					});

					alert("您已成功提交！")
					
				}
				
			}
			
			
			
		);

			
	
		
		
		})();

})