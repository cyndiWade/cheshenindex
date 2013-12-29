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
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
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
	
	})();


	//全局初始化参数
	var ul = "../agency.php";	 //代理服务器文件
	var sever_url = "http://yunqiserver.xicp.net/cheshenOA";
	//var sever_url = "http://121.199.12.139/cheshenOA";
		
	
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
			
			//alert(cars_data[4001])
			if (cars_data[400] != undefined)
			{

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


					// $(".main_view").append(cars_data[400][i].brand + "<br>");
					//$.each(cars_data[400][i].cars_photos, function (i, n) {
					//	
					//	$(".adam-scroll").eq(0).find(".adam-big-img ul").append("<li><a href='#myModal' data-toggle='modal'><img src='" + n.url + "'/></a></li>");
					//	$(".adam-scroll").eq(0).find(".adam-small-imglist").append("<dd><a><img src='" + n.url + "' width='80'/></a></dd>");
					//});

				});
				
			}
			
		}
		$("#adam-eff").adam_Eff();

	})();

		
		//提交订单模块！
	(function () {
		
		var btn_sub = $('.btn_sub');//提交订单
		var cars_name = $('.cars_name');		//车名
		var cars_id = $('.cars_id');			//预定车辆ID
		btn_sub.click(function () {
		
			var is_login = Cookie.getCookie("user_key") || 0;
			if (is_login == false)
			{
				alert("对不起，请先登录！")
				window.location.href = '/index/member/login.php';
			}
				
			//提交订单
			var order_submit_server = ajax_post_setup(ul,{
				'server_url' : sever_url + '/Api/Order/apply',
				'user_key' : Cookie.getCookie("user_key"),
				'start_schedule_time' : '',
				'over_schedule_time' : '',
				'cars_id' : '10007',
				//'is_need_driver' : ''
			});
			//状态分析
			if (order_submit_server == false)
			{
				alert('请求超时，请稍后再试');
			} else if (order_submit_server.status == 0)
			{
				alert(order_submit_server.msg);
			} else {
				alert(order_submit_server.msg)
			}
			//	alert(order_submit_server.msg)

			});
		
		
		})();

		
});



/**

					var mdata = obj.data
					var html = '';
				
					html = '<div class="adam-tabs-list dchebox">' 
						html += '<div class="dc_txt"><p class="fb f20 mb5">aaaaaaa</p><p class="f16">bbb</p></div>';
						html += '<div class="adam-scroll">';
							
							html += '<div class="adam-big-img">';
								
								html += '<ul>';
									html += '<li><a href="http://www.17sucai.com/"><img src="http://yunqiserver.xicp.net/files/cheshenOA/images/20131226/52bbc9e7db9f0.png" height="292" width="564"></a></li>';
									html += '<li><a href="http://www.17sucai.com/"><img src="http://yunqiserver.xicp.net/files/cheshenOA/images/20131226/52bbc9e7e2926.png" height="292" width="564"></a></li>';				html += '</ul>';
							html += '</div>';
							html += '<dl class="adam-small-imglist">';
								html += '<dd><a><img src="http://yunqiserver.xicp.net/files/cheshenOA/images/20131226/52bbca499c2e8.png" height="54" width="103"></a></dd>';
								html += '<dd><a><img src="http://yunqiserver.xicp.net/files/cheshenOA/images/20131226/52bbca499c2e8.png" height="54" width="103"></a></dd>';
							html += '</dl>';
					
						html += '</div>';
					
					html += '</div>';	

				adam_tabsContent.append(html);

//alert(html);



$.post(ul,{	 
			'server_url' : sever_url + '/Api/Cars/cars_list',
			 
			},function(obj){
				if (obj.status == 0) {
					var mdata = obj.data
					 
					$.each(mdata[400], function (i, n) {

						// $(".main_view").append(mdata[400][i].brand + "<br>");
						$.each(mdata[400][i].cars_photos, function (i, n) {
							
							$(".adam-scroll").eq(2).find(".adam-big-img ul").append("<li><a href='#myModal' data-toggle='modal'><img src='" + n.url + "'/></a></li>");
							$(".adam-scroll").eq(2).find(".adam-small-imglist").append("<dd><a><img src='" + n.url + "' width='80'/></a></dd>");
						});

					});
				} else {
					alert(obj.msg);	
				}
			},'json');	
		

	*/
