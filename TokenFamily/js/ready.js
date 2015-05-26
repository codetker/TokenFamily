// JavaScript Document
$(document).ready(function() {
    $(".people").focus(function(){
        this.value=="搜索Token成员"? this.value="" : this.value=this.value;
    });
    $(".people").blur(function(){
        this.value==""? this.value="搜索Token成员" : this.value=this.value;
    });

    $(".searchButton").find(".md-close").click(function(){
        setTimeout(function(){
            $(".searchButton").children().eq(1).fadeOut("slow");
        },500);//0.5s等待数据
    });
    $(".searchButton").children().eq(0).click(function(){
        $(".searchButton").children().eq(1).fadeIn("slow");
    });//fadeIn(),fadeOut()?
    //已经在.searchButton img 上定义了click()方法，需要拉取数据和显示则使用事件委托，见search.js
	
	$(".cont-dep").mouseenter(function(){
		$(".cont-dep li").slideDown("fast").css("border-bottom","1px solid #8F8E8E");
	});
	$(".cont-dep").mouseleave(function(){
		$(".cont-dep li").css("border-bottom","none").slideUp("fast");
	});

    $(".nav ul li").eq(7).click();//起始页面为2015

    
    var resize= function () {
        var windowHeight=$(window).height();
        $(".stage").css("height",windowHeight);

        //vertical

        var windowWidth=$(window).width();
        /*$(".page").css({
            "width":windowWidth,
            "height":$(window).height()
        });
        $(".pageBox").css("width",windowWidth*9);
        //horizontal

        var ob=".md-content";
        $(".bigPic").css({
            "width":$(ob).width()*0.6+"px",
            "height":$(ob).width()*0.6+"px"
        });
        setTimeout(function(){
            $(ob).find(".md-close").css({
                "left":$(ob).width()-42+"px",
                "bottom":$(ob).height()-45+"px"
            });
        },100);
        //box*/
		 location.reload() ;
		/*
1    history.go(0) 
2    location.reload() 
3    location=location 
4    location.assign(location) 
5    document.execCommand('Refresh') 
6    window.navigate(location) 
7    location.replace(location) 
8    document.URL=location.href 
		*/
    }
    //窗口大小变动时触发,ready.js为控制大小的最后的js文件
    $(window).resize(function(){
        setTimeout(resize,10);
    });

});