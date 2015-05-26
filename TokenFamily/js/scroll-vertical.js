// 垂直滚动
// 借鉴搜狗4.2版http://ie.sogou.com/features4.2.html
// 如有侵权，请联系codetker@sina.com解决，谢谢
$(document).ready(function(){
	var windowHeight=$(window).height(); 
	$(".stage").css("height",windowHeight);

	//兼容性
	var is_chrome=navigator.userAgent.toLowerCase().indexOf('chrome')>-1;
	if (is_chrome) {
		//判断chrome，搜狗chrome内核，供scrollTop兼容性使用
		windowobject="body";
	}else{
		//支持ie与ff
		windowobject="html";
	}

	$(".logo").click(function(){
		$(windowobject).animate({
			"scrollTop": 0 +"px"
		},1000,function(){
			crash_bottom(1,0,20,150);
		});
		$(".guide ul li").removeClass("select");
	});

	var stageIndex;
	function getIndex(){
		stageIndex=Math.round($(window).scrollTop() / windowHeight);
	} //得到当前的页码
    /*function getSelect(){
        sele=".guide ul li";
        $(sele).removeClass("select");
        if(stageIndex==0){

        }else{
        	if(stageIndex<3){
        		$(sele).eq(stageIndex).addClass("select");
        	}else{
        		$(sele).eq(stageIndex).addClass("select");
        	}
        }
    }*/

//
	var guiderID;
	$(".guider ul li").not(".inner").click(function(){
		if ($(this).index()>1){
			guiderID=$(this).index()+4;
		}else if($(this).index()==0){
			guiderID=1;
		}
	});
	$(".inner").click(function(){
		guiderID=$(this).index()+2;
	});

/*
//隐藏年份(考虑去掉这个，原因为年份是控制所有的，page控制y轴，year控制x轴，减少开销)
	function hideYear(){
		$(".nav").animate({"left":(-1)*$(window).width()+"px"},100,"easeInQuint");
	}
//显示年份
	function showYear(){
		//setTimeout(function(){$(".nav").eq(stageIndex-1).animate({"left":0+"px"},1000,"easeInQuint");},1200);
		setTimeout(function(){$(".nav").animate({"left":0+"px"},1000,"easeInQuint");},1200);
	}
*/

//点击guider时
	$(".guider ul").delegate("li","click",function(){
		//跳转到对应页面
		//hideYear();
		setTimeout(function(){
			scrollStage(windowobject,guiderID,0); //传入要到的stageindex页码,dir=0时
		},100);
	});

//点击首页轮播图片
	var stageNum;
	function getStageNum(){
		$(".pageFirst .imageBox ul li").click(function(){
			stageNum=$(this).index();
		});
	}
	$(".pageFirst .imageBox ul").delegate("img","click",function(){
		getStageNum();
		setTimeout(function(){
			if (stageNum<2) {
				scrollStage(windowobject,stageNum+1,0);
			}else{
				scrollStage(windowobject,stageNum+3,0);
			}
			
		},100);
	});

	var scrollStage=function(obj,stIndex,dir){
	//obj为操作滚动的对象
	//stIndex为点击调用时应该滚动到的页面页码，按键和滚轮调用时默认为1(传入0)
	//dir传入滚动时的方向，0代表不滚动，1代表向上，-1代表向下
	var sIndex=stIndex;//!(dir)则stageIndex为要到的页码，否则为当前页码
	var windowobject=obj;
	var direction=0||dir;  //接收参数封装,没有传入时暂时认为为0
	var target=windowHeight*sIndex; //目标页面距离文档顶部距离
	var s=".guide ul li";
	if(!$(windowobject).is(":animated")){//当没有动画时
		if(!direction){ //响应guider,此时stageIndex为目标页面页码
			//alert($(window).scrollTop());  注意(),不规范代码引发的惨案。。。
			//alert(windowHeight*sIndex);
			$(s).removeClass("select");
			if(sIndex==1){
				$(s).eq(sIndex-1).addClass("select");
			}else if(sIndex>1){
				$(s).eq(sIndex).addClass("select");
			}
			//(sIndex>0&&stIndex<3) ? function(){$(s).eq(sIndex-1).addClass("select");} : function(){(sIndex>2) ? function(){$(s).eq(sIndex).addClass("select");} : "";};
			if ($(window).scrollTop() > target) { //内容下移，窗口上移,上方出现弹痕
				direction=-1;
				$(windowobject).animate({
					"scrollTop": target +"px"
				},1000,function(){
					crash_bottom(1,target,20,150);  //调用撞击函数,先撞顶部,target变成当前页面了
					//showYear();
				});
			}else if($(window).scrollTop() == windowHeight*sIndex){ //当前页面时
				direction=0;
				crash_bottom(1, target ,20,150);  //模拟撞底部
				//showYear();
			}else{
				direction=1;
				$(windowobject).animate({
					"scrollTop": target +"px"
				},1000,function(){
					crash(1,target,20,150);  //调用撞击函数,先撞底部
					//showYear();
				});
			}
		}else{ //响应鼠标滚轮和键盘上下.sIndex为当前页面
			if(direction==1){
				if(sIndex==0){
					crash(1,target,20,150);
					//showYear();
				}else{  //往上翻
					sIndex-=1;
					$(s).removeClass("select");
					if(sIndex==1){
						$(s).eq(sIndex-1).addClass("select");
					}else if(sIndex>1){
						$(s).eq(sIndex).addClass("select");
					}
					$(windowobject).animate({
						"scrollTop":windowHeight*sIndex+"px"
						},1000,function(){
							crash_bottom(1,windowHeight*sIndex,20,150);  //调用撞击函数,往下翻内容往上，先撞顶部
							//();
						});

				}
			}else{
				if(sIndex==10){
					crash_bottom(1,target,20,150);
					//showYear();
				}else{ //往下翻
					sIndex+=1;
					$(s).removeClass("select");
					if(sIndex==1){
						$(s).eq(sIndex-1).addClass("select");
					}else if(sIndex>1){
						$(s).eq(sIndex).addClass("select");
					}
					$(windowobject).animate({
						"scrollTop":windowHeight*sIndex+"px"
					},1000,function(){
						crash(1,windowHeight*sIndex,20,150);  //调用撞击函数,往上翻内容往下，先撞底部
						//showYear();
					});

				}
			}
		}
	/*	setTimeout(function(){
			getIndex();
			getSelect();
		},200);*/
	}
}
var stop=0;
//撞击函数
function crash_bottom(direction,termin,distant,time){
	if (!stop) {
		var scrollTop=$(window).scrollTop;
		if (direction==1) {
			direction=0;
			$(windowobject).animate({"scrollTop":"+="+distant+"px"},time,function(){
				crash_bottom(direction,termin,distant*0.6,time);
				if (distant<=15||time>150) {
					stop=1;//停止碰撞

					$(windowobject).animate({"scrollTop":termin+"px"},time,function(){
						stop=0;
					});
				}
			});
		}else if (direction==0) {
			direction=1;
			$(windowobject).animate({"scrollTop":termin+"px"},time,function(){
				crash_bottom(direction,termin,distant*0.6,time);
				if (distant<=15||time>150) {
					stop=1;//停止碰撞

					$(windowobject).animate({"scrollTop":termin+"px"},time,function(){
						stop=0;
					});
				}
			});
		}
	}
}
function crash(direction,termin,distant,time){
	if (!stop) {
		var scrollTop=$(window).scrollTop;
		if (direction==1) {
			direction=0;
			$(windowobject).animate({"scrollTop":"-="+distant+"px"},time,function(){
				crash(direction,termin,distant*0.6,time);
				if (distant<=15||time>150) {
					stop=1;//停止碰撞

					$(windowobject).animate({"scrollTop":termin+"px"},time,function(){
						stop=0;
					});
				}
			});
		}else if (direction==0) {
			direction=1;
			$(windowobject).animate({"scrollTop":termin+"px"},time,function(){
				crash(direction,termin,distant*0.6,time);
				if (distant<=15||time>150) {
					stop=1;//停止碰撞

					$(windowobject).animate({"scrollTop":termin+"px"},time,function(){
						stop=0;
					});
				}
			});
		}
	}
}
	
function stopDefaultAndBubble(e){
	e=e||window.event;
	//阻止默认行为
	if (e.preventDefault) {
		e.preventDefault();
	}
	e.returnValue=false;

	//阻止冒泡
	if (e.stopPropagation) {
		e.stopPropagation();
	}
	e.cancelBubble=true;
}


//绑定键盘上下按键事件
$(document).keydown(function(event){
    //放在外面的话左右也会触发,滚动则无所谓
	//判断event.keyCode为38（即向上按钮）,往下翻页
	if (event.keyCode==38) {
        getIndex();
        //hideYear();
		setTimeout(function(){
			scrollStage(windowobject,stageIndex,1); //stageIndex为当前页码
		},100);

	}
	//判断event.keyCode为40（即向下按钮）,往上翻页
	else if (event.keyCode==40) {
        getIndex();
        //hideYear();
		setTimeout(function(){
			scrollStage(windowobject,stageIndex,-1); //stageIndex为当前页码
		},100);

	}
});

//绑定鼠标滚轮事件
/*
var scroF=function(e){
	e=e||window.event;
	if (e.wheelDelta) {
		t1.value=e.wheelDelta;
		alert(t1.value);
		if (t1.value>0) {  //取120，代表向上
			getIndex();
			scrollStage(windowobject,stageIndex,1);
		}else if (t1.value<0) {  //取-120，代表向下
			getIndex();
			scrollStage(windowobject,stageIndex,-1);
		}
	}else if(e.detail){
		t2.value=e.detail;
		alert(t2.value);
		if (t2.value>0) {  //取3，代表向上
			getIndex();
			scrollStage(windowobject,stageIndex,1);
		}else if (t2.value<0) {  //取-3，代表向下
			getIndex();
			scrollStage(windowobject,stageIndex,-1);
		}
	}
}*/
	//var is_FF=navigator.userAgent.toLowerCase().indexOf("firefox");
	//注册鼠标滚动事件
	//if(document.addEventListener){  //W3C
	//	document.addEventListener("DOMMouseScroll",scroF,false);
	//}else{
	//	window.onmousewheel=document.onmousewheel=scroF; //IE,opera,chrome
	//}
function handle(delta) {
	getIndex();
	//hideYear();
    if (delta<0) {
		setTimeout(function(){
			scrollStage(windowobject,stageIndex,-1); //stageIndex为当前页码
		},100);
    }else{
		setTimeout(function(){
			scrollStage(windowobject,stageIndex,1); //stageIndex为当前页码
		},100);
    }
}//根据鼠标滚轮方向执行对应函数
 
function wheel(event){
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta; 
        if (window.opera) delta = -delta;
    } else if (event.detail) {
        delta = -event.detail;
    }
    if (delta)
        handle(delta);  //调用执行函数
}
 
/* www.mb5u.com *///注册事件
if (window.addEventListener)
window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;


$(document).bind("mousedown",function(e){
	//which=2代表鼠标滚轮
	if((e.which==2)){
		stopDefaultAndBubble(e);
		 //bugfix 搜狗浏览器的ie内核只有在定时器触发这个函数才生效。。(貌似有些无语)
		setTimeout(function(){
			stopDefaultAndBubble(e);
		},10);
	}
});

});