var d = document;
var l = window.location.href;
var f = l.substring(l.lastIndexOf('/') + 1);
var timer = false;

var flash_params = {
    wmode: 'opaque',
    menu: false,
    allowFullscreen: "true",
    scale: 'Scale'
};
var flashvars = {};

var lang = window.location.href.match(/\.com\/([a-z]{2})\//);
if (lang && lang.length && lang.length > 1 && lang[1] != '') 
    lang = lang[1];
else 
    lang = 'en';

$(document).ready(function(){
 autoMaxWidth.ini();
});

$(window).load(function(){
	
	 autoMaxWidth.ini();
     //lightbox.ini();
   // menuPopup.ini();
   // menuHighlight.exec();
    
    
    
});





var autoMaxWidth = {};
autoMaxWidth.ini = function(){

    var winW = $(window).width();
    if (winW < 980) 
        winW = 980;
    
    $('.autoMaxWidth').each(function(){
        $(this).width(winW);
        
        var $img = $('img', this).first();
        var imgW = $img.width();
        var left = (winW - imgW) / 2;
        $img.css({ "left": left + "px", "position": "relative" });
        
        if ($.browser.msie && parseInt($.browser.version) == 6) {
            $(this).css({
                'overflow': 'hidden',
                'position': 'relative'
            }).width(winW);
            $('#banner').css({
                'overflow': 'hidden',
                'position': 'relative'
            }).width(winW);
        }
        
    });
}


  

$(function(){
	
	
	indexSlides.ini();
	
	
	
});



var indexSlides={};

indexSlides.timer=false;
indexSlides.total=$('#slide-index .control a').length;
indexSlides.current=-1;
indexSlides.offScreenLeft=2000;
indexSlides.leaveScreenLeft=4000;
indexSlides.animating=false;

indexSlides.obj=$('#slide-index .slide');

indexSlides.style=[];
indexSlides.style[0]={
	text:{left:'56px',top:'86px'},
	button:{left:'363px',top:'282px'},
	direction:'lr'
};
indexSlides.style[1]={
	text:{left:'30px',top:'46px'},
	button:{left:'33px',top:'265px'},
	direction:'lr'
};
/*indexSlides.style[2]={
	text:{left:'30px',top:'81px'},
	button:{left:'30px',top:'244px'},
	direction:'tb'
};


indexSlides.style[3]={
	text:{left:'30px',top:'81px'},
	button:{left:'30px',top:'244px'},
	direction:'tb'
};*/


indexSlides.parameterUpdate=function(){
	
	var winW=$(window).width();
	if(winW<1000)
		winW=1000;
	$('#slide-index').width(winW);
	$('#slide-index .slides').width(winW*(indexSlides.style.length+1));
	indexSlides.obj.width(winW);

	var offset=(winW-1000)/2;

	for(var i=0; i<indexSlides.style.length; i++){
		temp=offset+parseInt(indexSlides.style[i].text.left);
		indexSlides.css[i].text.left=temp+'px';
		temp=offset+parseInt(indexSlides.style[i].button.left);
		indexSlides.css[i].button.left=temp+'px';
	}
	
}

indexSlides.ini=function(){
	
	// clone obj
	indexSlides.css=[];
	
	
	for(var i=0; i<indexSlides.style.length; i++){
		indexSlides.css[i]={}
		indexSlides.css[i].text={};
		indexSlides.css[i].text.left=indexSlides.style[i].text.left;
		indexSlides.css[i].text.top=indexSlides.style[i].text.top;
		indexSlides.css[i].button={};
		indexSlides.css[i].button.left=indexSlides.style[i].button.left;
		indexSlides.css[i].button.top=indexSlides.style[i].button.top;
		indexSlides.css[i].direction=indexSlides.style[i].direction;
	}
	
	indexSlides.parameterUpdate();
	
	indexSlides.obj.eq(0).clone().appendTo('#slide-index .slides');
	
	$('#slide-index .control a').each(function(i){
		$(this).click(function(e){
			e.preventDefault();
			indexSlides.pause();
			indexSlides.goto(i);
			indexSlides.start();
		});
	});
	
	indexSlides.goto(0);
	indexSlides.start();

}

indexSlides.goto=function(i){

	if(indexSlides.animating || i==indexSlides.current)
		return false;

	indexSlides.animating=true;

	var j=i;
	if(i>=indexSlides.style.length)
		j=0;

	indexSlides.clearStage(i);

	indexSlides.current=j;
	
	$('#slide-index .control a').removeClass('active').eq(j).addClass('active');
	$obj=$('#slide-index .slide').eq(i);
	
	if(indexSlides.css[j].direction=='tb'){
	
		var initialTextCSS={
			'left':indexSlides.css[j].text.left,
			'top':-$obj.find('.text').height()
		};
		
		var initialButtonCSS={
			'left':indexSlides.css[j].button.left,
			'top':$obj.height()+$obj.find('.button').height()
			
		};
	
	}else if(indexSlides.css[j].direction=='lr'){
	
		var initialTextCSS={
			'left':-parseInt($obj.find('.text').width())+'px',
			'top':indexSlides.css[j].text.top
		};
		
		var initialButtonCSS={
			'left':500,
			'top':indexSlides.css[j].button.top,
			'width':$obj.find('.button').width()
			
		};
		
	}

	$obj.find('.text').css(initialTextCSS);
	$obj.find('.button').css(initialButtonCSS)
	
	var left=-i*indexSlides.obj.width();
	
	$('#slide-index .slides').animate({'margin-left':left},500,function(){
		$obj.find('.text').animate(indexSlides.css[j].text,300,function(){
			$obj.find('.button').show().animate(indexSlides.css[j].button,300, "swing",function(){
				
				if(i>=indexSlides.css.length){
					$obj=$('#slide-index .slide').eq(0);
					$obj.find('.text').css(indexSlides.css[j].text);
					$obj.find('.button').css(indexSlides.css[j].button);
					$('#slide-index .slides').css('margin-left','0px');
				}
				
				indexSlides.animating=false;
				indexSlides.reformat();
				
			});
		});
	});
	
}

indexSlides.start=function(){
	indexSlides.timer=setInterval(indexSlides.next,4000);
}

indexSlides.pause=function(){
	if(indexSlides.timer)
		clearInterval(indexSlides.timer);
}

indexSlides.next=function(){
	var next=indexSlides.current+1;

	//if(next>=indexSlides.total)
		//next=0;
	
	indexSlides.goto(next);
}

indexSlides.clearStage=function(i){
	if(indexSlides.current>-1){
		indexSlides.animating=true;
		var left=3000;
		if(i<indexSlides.current)
			left=-1000;
		indexSlides.obj.eq(indexSlides.current).find('.text, .button').animate({'left':left+'px'},500,function(){
		});
	}
}

indexSlides.reformat=function(){
	indexSlides.parameterUpdate();
	if(!indexSlides.animating){
		var left=-indexSlides.current*indexSlides.obj.width();
		$('#slide-index .slides').css({
			'margin-left':left
		});
		
		$obj=$('#slide-index .slide').eq(indexSlides.current);
		$obj.find('.text').css(indexSlides.css[indexSlides.current].text);
		$obj.find('.button').css(indexSlides.css[indexSlides.current].button);
		
	}
}





