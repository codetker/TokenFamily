// 盒子内图片轮播
$(document).ready(function() {
    //将功能封装到一个大的函数里面，通过传入不同的参数多次调用
    //obj为确定的调用id，层次为#stage1 .pageFirst
    function boxScroll(obj){
        var toLeft=$(obj).children().eq(0);  //用child可能更快一些
        var toRight=$(obj).children().eq(2);  //只是取别名，并非深拷贝
        var object=$(obj).children().eq(1);   //$(".imageBox")
        var box=$(object).children().eq(0); //$("#stage1 .imageShow
        var control=$(object).children().eq(1);  //相对于内部全是全局变量便于操作
        /*var toLeft=$(obj).find(".left");  //用child可能更快一些
        var toRight=$(obj).find(".right");  //只是取别名，并非深拷贝
        var object=$(obj).find(".imageBox");
        var box=$(object).find(".imageShow");
        var control=$*(object).find(".imageControl");*/

        var imgIndex;
        var imgList=$(box).find("ul").eq(0).children();   //图片所在的li数组
        $(imgList).css({   //保证全屏
            "width":$(window).width()+"px",
            "height":$(window).height()+"px"
        });
        //var imgWidth=$(imgList).find("img").width();
        var conList=$(control).find("ul li");  //控制所在的数组
        $(conList).addClass(".liNot").eq(0).addClass("liSelect");
        $(imgList).fadeOut("100");
        $(imgList).eq(0).fadeIn("slow");  //先载入第一张图片

        var indexMax=$(imgList).length-1;
        var indexMin=0;
        var liSpace=Math.floor(($(control).width() - 20*(indexMax+1))/(indexMax))-1;//确定放得下
        $(conList).not(":first").css("margin-left",liSpace+"px");   //布置控制的格式

        function imgScroll(imgIndex,dir){    //操作对象为object,即imageBox
            var index=imgIndex; //点击下方imgControl时使用
            var direction=dir; //左右点击时使用，右击为1，左击为0

            if(!$(box).is(":animated")){  //在没有动作时执行函数
                if(!direction){ //先讨论点击control框时(direction传入0，index表示目标图片编号)
                    // stopStep()
                    $(imgList).siblings().fadeOut(300);
                    setTimeout(function(){
                        $(imgList).eq(index).fadeIn(500);
                    },100);

                    $(conList).removeClass("liSelect");
                    $(conList).eq(index).addClass("liSelect");
                }else{  //点击左右时
                    if(direction==1){ //往右的顺序,index表示当前值
                        $(conList).removeClass("liSelect");
                        if(index==indexMax){
                            index=indexMin;
                            $(imgList).eq(indexMax).fadeOut(300);
                            setTimeout(function(){
                                $(imgList).eq(indexMin).fadeIn(500);
                            },100);
                        }else{
                            index+=1;
                            $(imgList).eq(index-1).fadeOut(300);
                            setTimeout(function(){
                                $(imgList).eq(index).fadeIn(500);
                            },100);
                        }
                        $(conList).eq(index).addClass("liSelect");

                    }else{
                        $(conList).removeClass("liSelect");
                        if(index==indexMin){
                            index=indexMax;
                            $(imgList).eq(indexMin).fadeOut(300);
                            setTimeout(function(){
                                $(imgList).eq(indexMax).fadeIn(500);
                            },100);
                        }else{
                            index-=1;
                            $(imgList).eq(index+1).fadeOut(300);
                            setTimeout(function(){
                                $(imgList).eq(index).fadeIn(500);
                            },100);
                        }
                        $(conList).eq(index).addClass("liSelect");
                    }
                }
            }
        }

        //control控制
        $(conList).click(function(){
            var ID=$(this).index();
            imgScroll(ID,0);
        });

        //得到当前图片的index
        function getImgIndex(){
            imgIndex=$(control).find("ul").find(".liSelect").index();
        }

        //左右点击控制
        var time=Date.parse(new Date());//时间控制，0.8s内仅能点一次,防止多次点击
        var final=Date.parse(new Date());
        $(toLeft).click(function(){
            time=Date.parse(new Date());
            if((time-final)>800){
                getImgIndex();
                setTimeout(function(){
                    imgScroll(imgIndex,-1);
                },200); 
                final=Date.parse(new Date());
            }
        });
        
        $(toRight).click(function(){
            time=Date.parse(new Date());
            if((time-final)>800){
                getImgIndex();
                setTimeout(function(){
                    imgScroll(imgIndex,1);
                },200);
                final=Date.parse(new Date());
            }
        });

        //不动时每过8000ms变化一次,对于首页
        function runStep(){
            if(!$(object).find(".innerBox").length){//判断是首页
            var timer=setInterval(function(){
                $(toRight).click();
                },8000);
            }
        }
        function stopStep(){
            clearInterval(timer);
        }
        runStep();


        //不同page区域的length不同

        var x=$(object).find(".innerBox ul li"); //作用域内覆盖外部全局变量
        var num=$(x).length;
        for(var i=0;i<num;i++){
            if(i%5){
                $(x).eq(i).css("margin-left","40px");
            }
        }



    }

    /*function imgScroll(obj,imgIndex,dir){
        var object=obj;  //操作对象(stage中的page对象)
        var index=imgIndex; //点击下方imgControl时使用
        var direction=dir; //左右点击时使用，右击为1，左击为0
        var indexMax=$(object).find("ul li").length-1;
        var indexMin=0;
        var liSpace=Math.floor(($(".imageControl").width() - 20*(indexMax+1))/(indexMax));
        $(".imageControl li").not(":first").css("margin-left",liSpace+"px");

        if(!$(object).is(":animated")){  //在没有动作时执行函数
            if(!direction){ //先讨论点击control框时(direction传入0，index表示目标图片编号)
                $(object).find("li").eq(index).siblings().fadeOut(1000);
                $(object).find("li").eq(index).fadeIn(1000);
            }else{  //点击左右时
                if(direction==1){ //往右的顺序,index表示当前值
                    if(index==indexMax){
                        index=indexMin;
                        $(object).find("li").eq(indexMax).fadeOut(1000);
                        $(object).find("li").eq(indexMin).fadeIn(1000);
                    }else{
                        index+=1;
                        $(object).find("li").eq(index-1).fadeOut(1000);
                        $(object).find("li").eq(index).fadeIn(1000);
                    }

                }else{
                    if(index==indexMin){
                        index=indexMax;
                        $(object).find("li").eq(indexMin).fadeOut(1000);
                        $(object).find("li").eq(indexMax).fadeIn(1000);
                    }else{
                        index-=1;
                        $(object).find("li").eq(index+1).fadeOut(1000);
                        $(object).find("li").eq(index).fadeIn(1000);
                    }
                }
            }
        }
    }*/

    /*var timeDown=function(){
        clearInterval(timer);
    }*/  //是否需要停止下来呢？

    //定时后调用封装函数，保证data.js执行完毕
    setTimeout(function(){
        boxScroll("#stage1 .pageFirst");
            $(".stage").each(function(){
            $(this).find(".page").each(function(){
                boxScroll(this);
            });
        });

         //设计人物展示区域
        var showHeight=Math.floor(($(window).height()*0.95-120)*0.9);
        var showTop=Math.floor(showHeight*0.05/0.9);
        $(".stage").find(".innerBox").css({  //给人物展示设置空间
            "height":showHeight+"px",
            "min-height":"405px",
            "margin-top":showTop+120+"px",
            "width":"80%",
            "min-width":"800px",
            "position":"relative",
            "left":"10%"
        });

        var x=".innerBox ul li";  //全局变量
        $(x).css({
            "width":Math.round($(window).width()*0.16-40)+"px",
            "min-width":"120px",
            "height":Math.floor((showHeight/3)-20)+20+"px",
            "min-height":"105px"
        });
        var liHeight=$(x).height();
        var liWidth=$(x).width();
        $(".img").css({
            "width":liWidth+"px",
            "height":liHeight+"px"
        });
        $(".img img").css({
            "width":liHeight-40+"px",
            "height":liHeight-40+"px",
            "margin-left":Math.round((liWidth-liHeight)/2)+20+"px"
        });

        //鼠标移动到img上变大，移开后缩小
        /*var twidth=$(x).find(".picBox").width();
        var tmpLeft=parseInt($(x).find(".picBox img").css("margin-left"));
        var tmpWidth=$(x).find(".picBox img").width();    //find少用*/
        $(x).each(function(){
            var o=$(this).children().eq(0).children().children().eq(0);
            var twidth=$(o).width();
            var tmpLeft=parseInt($(o).find("img").css("margin-left"));
            var tmpWidth=$(o).find("img").width();
            $(o).mouseover(function(){
                $(this).find("img").animate({
                    "margin-left":"10px",
                    "margin-top":"-10px",
                    "width":twidth-20+"px",
                    "height":twidth-20+"px"
                },200);
                $(this).parent().attr("data-modal","modal-4");
                $(this).parent().parent().parent().find(".outBox").attr({
                    "class":"outBox md-modal md-effect-4",
                    "id":"modal-4"
                });
            /*$(this).attr({
                "data-modal":"modal-4",
                "class":"md-trigger img"
            });
            $(this).parent().parent().parent().find(".outBox").attr({
                "class":"md-modal md-effect-4",
                "id":"modal-4"
            });*/
            });
            $(o).mouseleave(function(){
                $(this).find("img").animate({
                    "margin-left":tmpLeft+"px",
                    "margin-top":"0px",
                    "width":tmpWidth+"px",
                    "height":tmpWidth+"px"

                },200);
                //$(this).removeAttr("data-modal");
                //$(this).parent().parent().parent().find(".outBox").removeAttr("id").attr("class","outBox hidden");
                $(this).parent().removeAttr("data-modal");
                //$(this).parent().parent().parent().find(".outBox").removeAttr("id").removeAttr("class").attr("class","outBox md-modal ms-show");
            });
            $(o).click(function(){

                $(this).parent().attr("data-modal","modal-4");
                $(this).parent().parent().parent().find(".outBox").attr({
                    "class":"outBox md-modal md-effect-4 md-show",   //手动添加居然可以！！！
                    "id":"modal-4"
                });
                $(this).parent().parent().parent().find(".mask").addClass("maskS");
            });
            $(o).parent().parent().parent().find(".md-close").click(function(){
                /*$(this).parent().parent().fadeOut(500);
                setTimeout(function(){
                    $(this).parent().parent().removeAttr("id").removeClass("md-show md-effect-4");
                },500);*/
                $(o).parent().parent().parent().find(".mask").removeClass("maskS");
                $(o).mouseover();
            });
        });

        /*$(".outBox").css({
            "width":$(".innerBox").width()*0.4+"px",
            "height":$(".innerBox").height()+"px",
            "left":$(".innerBox").width()*0.3+"px"
        });*/
        var ob=".md-content";
        $(".bigPic").css({
            "width":$(ob).width()*0.6+"px",
            "height":$(ob).width()*0.6+"px"
        });
        setTimeout(function(){
            $(ob).find(".md-close").css({
                "left":$(ob).width()-42+"px",
                "bottom":$(ob).height()-50+"px"
            });
        },200);

    },7000);

});