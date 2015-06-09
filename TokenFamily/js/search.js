//点击search按姓名搜索资料并显示
//姓名取data的接口(搜索，显示页面得先画出来)
$(document).ready(function(){
    $(".searchButton").delegate("img","click",function(){  //事件委托绑定查询
        var text=$(".people").val();
        var back=new Array;
        var obj=$(".searchButton").find(".md-content");
        if (text=="" || text=="搜索Token成员") {
            back[0]="请重新输入姓名后搜索";
            $(obj).find(".name").text(back[0]);
            $(obj).find(".name").css({"position":"relative","top":"16px"});
            $(obj).find(".md-close").css("bottom","30px");
            $(obj).find(".bigPic").css("display","none");
            $(obj).find(".line").css("display","none");
            $(obj).find(".perInfo").css("display","none");
            $(obj).find(".position").css("display","none");
        }else{
            $.getJSON(
                "http://wechat.wutnews.net/Web/Admin/Api/detail_name.html?name="+text,
                function(data) {
                    back=data;
                }
            );//给0.4s取数据
            setTimeout(function(){
                if (back=="") {
                    back[0]="请检查输入是否错误";
                    $(obj).find(".name").text(back[0]);
                    $(obj).find(".name").css({"position":"relative","top":"16px"});
                    $(obj).find(".md-close").css("bottom","30px");
                    $(obj).find(".bigPic").css("display","none");
                    $(obj).find(".line").css("display","none");
                    $(obj).find(".perInfo").css("display","none");
                    $(obj).find(".position").css("display","none");
                }else{
                    $(obj).find(".name").css({"position":"relative","top":"0px"});
                    $(obj).find(".bigPic").css("display","block");
                    $(obj).find(".line").css("display","block");
                    $(obj).find(".perInfo").css("display","block");
                    $(obj).find(".position").css("display","block");
                    $(obj).find(".md-close").css("bottom",$(obj).height()-50+"px");
                    var task;
                    switch(back[0].department){
                        case "1": task="技术部";    break;
                        case "2": task="设计部";    break;
                        case "3":
                            if (back[0].zhiwu.indexOf("新闻")>=0) {
                                task="新闻经纬";
                            }else if (back[0].zhiwu.indexOf("时政")>=0) {
                                task="时政话题";
                            }else if (back[0].zhiwu.indexOf("文化")>=0) {
                                task="校园文化";
                            }else if (back[0].zhiwu.indexOf("摄影")>=0) {
                                task="摄影部";
                            }else{
                                task="内容部"; //给zhiwu没填的一个显示
                            }
                            break;
                        case "4": task="人力资源部";break;
                        case "5": task="运营部";    break;
                        case "6": task="产品部";    break;
                        default:break;
                    }
                    //绑定数据
                    $(obj).find("img").attr({
                        "src":"/upload/photo/"+"1/"+back[0].name+".jpg",
                        "alt":back[0].name
                    }); //绑定图片
                    $(obj).find(".name").text(back[0].name);
                    $(obj).find(".position").html('<i>'+task+'</i>');
                    $(obj).find(".perInfo").html('<p>'+back[0].college +'</p>'+'<p>'+back[0].zhiwu +'</p>'+'<p>'+ back[0].zhuanye +'</p>'+'<p>'+back[0].starttime+'-'+ back[0].endtime +'</p>');
                }
            },400);
        }    
    });

});
/*
var t=$(this).val();
        var back=new Array;
        var obj=$(".searchButton").children().eq(1);
        if (t=="搜索Token成员" || t=="") {
            back[0]="请输入姓名搜索";
        }else{
            $.getJSON(
                "http://wechat.wutnews.net/Web/Admin/Api/detail_name.html?name="+t,
                function(data) {
                    back=data;
                }
            );
        setTimeout(function(){
            if (back[0]=="") {
                back[0]="没有找到,请检查输入";
                $(obj).find(".name").text(back[0]);
                $(obj).find(".bigPic").css("display","none");
                $(obj).find(".line").css("display","none");
                $(obj).find(".line").css("display","none");
            }else{
                $(obj).find(".bigPic").css("display","block");
                $(obj).find(".line").css("display","block");
                $(obj).find(".line").css("display","block");
                var task;
                switch(back[0].department){
                    case "1": task="技术部";    break;
                    case "2": task="设计部";    break;
                    case "3":
                        if (back[0].zhiwu.indexOf("新闻")>=0) {
                            task="新闻经纬";
                        }else if (back[0].zhiwu.indexOf("时政")>=0) {
                            task="时政话题";
                        }else if (back[0].zhiwu.indexOf("文化")>=0) {
                            task="校园文化";
                        }else if (back[0].zhiwu.indexOf("摄影")>=0) {
                            task="摄影部";
                        }else{
                            task="内容部"; //给zhiwu没填的一个显示
                        }
                        break;
                    case "4": task="人力资源部";break;
                    case "5": task="运营部";    break;
                    case "6": task="产品部";    break;
                    default:break;
                }
                //绑定数据
                $(obj).find("img").attr({
                    "src":"/upload/photo/"+"1/"+back[0].name+".jpg",
                    "alt":back[0].name
                }); //绑定图片
                $(obj).find(".name").text(back[0].name);
                $(obj).find(".position").html('<i>'+task+'</i>');
                $(obj).find(".perInfo").html('<p>'+back[0].college +'</p>'+'<p>'+back[0].zhiwu +'</p>'+'<p>'+ back[0].zhuanye +'</p>'+'<p>'+back[0].starttime+'-'+ back[0].endtime +'</p>');
            }

        },300);
        }
*/