



$(function(){
	
	
	
	//提交试驾申请！
	(function () {
		
		var tijiao1 = $('.tijiao1');			//试驾申请
		var models = $('#models').val();
		var appellation = $('#appellation').val();
		var surnames = $('#surnames').val();
		var name = $('#name').val();
		var age = $('#age').val();
		var phone = $('#phone').val();
		var email = $('#email').val();
		var number = $('#number').val();
		var date_time = $('#date_time').val();


		$(".applyform").Validform(
			{
				tiptype:2,
				beforeSubmit:function () {	
			//提交订单
			var tijiao1_server = ajax_post_setup(ul,{
				'server_url' : sever_url + '/Api/Drive/apply',
				'models':models,
				'appellation':appellation,
				'surnames':surnames,
				'name':name,
				'age':age,
				'phone':phone,
				'email':email,
				'number':number,
				'date_time':date_time
			});
			//状态分析
			 alert("申请试驾成功！")
			  
		 

			}
			}
			
			
			
		);
		 
		
		
		})();

})