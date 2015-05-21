// 点击年份水平滚动
$(document).ready(function() {
	var windowWidth=$(window).width();
	$(".page").css({
        "width":windowWidth,
        "height":$(window).height()
    });
	$(".pageBox").css("width",windowWidth*9);
	
	var yearID;  //年份(正数)
	$(".nav ul li").click(function(){
		yearID=$(this).index();
		//alert(yearID);
	});

	var pageIndex;  //当前页面页码(负数)
	function getPageIndex(){
		pageIndex=Math.round(parseInt($(".pageBox").css("margin-left")) / windowWidth);
	}

	$(".nav ul").delegate("li","click",function(){
		scrollPage($(".pageBox"),yearID,0);
	});

	var scrollPage=function(obj,pIndex,dir){
		var windowobject=obj;
		var direction=0||dir;
		var pageIndex=pIndex;
		var dist=Math.round(parseInt($(".pageBox").css("margin-left")));  //当前页距离左边的margin(负值)
		var aim=pageIndex*windowWidth*(-1);
        var s=".nav li";
		if (!$(windowobject).is(":animated")) {
			if(!direction){  //响应nav
                $(s).removeClass("pageSelect");
                $(s).eq(pageIndex).addClass("pageSelect");
				if (dist != aim) { //此时pageIndex为yearID.非负值
					$(windowobject).animate({"margin-left": aim + "px"},
						1000,"easeInCirc",function(){});
				}else{
					direction=0;
					$(windowobject).animate({"margin-left":"+="+"50px"},500).animate({"margin-left":"-="+"100px"},500).animate({"margin-left":"+="+"50px"},500);
				}
			}else{ //响应键盘左右键
				if(direction==1){ //pageIndex为负值
					if(pageIndex==0){
						$(windowobject).animate({"margin-left":"+="+"50px"},500).animate({"margin-left":"-="+"100px"},500).animate({"margin-left":"+="+"50px"},500);	
					}else{
                        $(s).removeClass("pageSelect");
						pageIndex+=1; //显示左边内容，左键
                        $(s).eq((-1)*pageIndex).addClass("pageSelect");
						$(windowobject).animate({"margin-left":"+=" + windowWidth + "px"},
							1000,"easeInCirc",function(){});
					}
				}else{
					if(pageIndex== -8){
						$(windowobject).animate({"margin-left":"-="+"50px"},500).animate({"margin-left":"+="+"100px"},500).animate({"margin-left":"-="+"50px"},500);	
					}else{
                        $(s).removeClass("pageSelect");
						pageIndex-=1;
                        $(s).eq((-1)*pageIndex).addClass("pageSelect");
						$(windowobject).animate({"margin-left":"-=" + windowWidth + "px"},
							1000,"easeInCirc",function(){});
					}
					
					
				}
			}
		}
	}

	//绑定键盘左右按键事件
	$(document).keydown(function(event){
		//判断event.keyCode为39（即向右按钮）
		if (event.keyCode==39) {
			getPageIndex();
			scrollPage($(".pageBox"),pageIndex,-1); 
		}
	//判断event.keyCode为37（即向左按钮
		else if (event.keyCode==37) {
			getPageIndex();
			scrollPage($(".pageBox"),pageIndex,1);
		}
	});
});