/**
 * Created by Administrator on 2015/5/24.
 */
//绑定数值

//使用getJSON方法获取数据
    /* dep:1表示技术部 stage10
     *  2:设计部 stage9
     *  3:内容部，再根据里面的字段分为新闻(stage3)，时政(satge4)，文化(stage5),摄影(stage6)四个子部门
     *  4:人力资源部 stage7
     *  5:运营部 stage 11
     *  6:产品 stage8
     *  7:站长。。。
     *  0:管理层 stage2
     */
var DB1=new Array();  //为了获取长度用数组存放
var DB2=new Array(); 
var DB3=new Array(); 
var DB4=new Array(); 
var DB5=new Array(); 
var DB6=new Array(); 

$.getJSON(
    "http://wechat.wutnews.net/Web/Admin/Api/detail_dep.html?dep=1",
    function(data) {
        DB1=data;
    }
);    //得到数据
$.getJSON(
    "http://wechat.wutnews.net/Web/Admin/Api/detail_dep.html?dep=2",
    function(data) {
        DB2=data;
    }
); 
$.getJSON(
    "http://wechat.wutnews.net/Web/Admin/Api/detail_dep.html?dep=3",
    function(data) {
        DB3=data;
    }
); 
$.getJSON(
    "http://wechat.wutnews.net/Web/Admin/Api/detail_dep.html?dep=4",
    function(data) {
        DB4=data;
    }
); 
$.getJSON(
    "http://wechat.wutnews.net/Web/Admin/Api/detail_dep.html?dep=5",
    function(data) {
        DB5=data;
    }
); 
$.getJSON(
    "http://wechat.wutnews.net/Web/Admin/Api/detail_dep.html?dep=6",
    function(data) {
        DB6=data;
    }
); 
depData(1,DB1);
depData(2,DB2);
depData(3,DB3);
depData(4,DB4);
depData(5,DB5);
depData(6,DB6);


function depData(dep,data){  //输入部门数据绑定  3 dep=3
    //dep表示要绑定数据的部门
    //对里面的每一个数据进行绑定
    var date=new Date();  //得到当前时间
    var now=date.getFullYear();  //得到当前年份

    //对年份进行处理，防止出现空占位的情况
    var data08=new Array();  //对应年份的数据
    var data09=new Array();
    var data10=new Array();
    var data11=new Array();
    var data12=new Array();
    var data13=new Array();
    var data14=new Array();
    var data15=new Array();
    var data16=new Array();
    var data17=new Array();
    var data18=new Array();
    for(i=0;i<data.length;i++){  //对每一个数据分年处理
        var start;
        var end;
        if(data[i].starttime== null){
            start=(data[i].endtime==null || data[i].endtime==0 )?  now : data[i].endtime.split("-")[0]; 
        }else{
            start=(data[i].starttime.split("-")[0]==0)? ((data[i].endtime==null || data[i].endtime==0 )?  now : data[i].endtime.split("-")[0])  : data[i].starttime.split("-")[0];  //得到进入部门的年份,如果是0000则按照离职的写,假定仅在部门一年
        }  
        if (data[i].endtime==null) {
            end=now;
        }else{
            end=data[i].endtime.split("-")[0];   //得到离职的年份，到如今则数值上等于0
        }
        //几种情况:1.starttime==null && endtime==null  satrt=now ; end=now
                // 2.starttime==null && endtime==0     satrt=now ; end=0
                // 3.starttime==null && endtime==end   satrt=end ; end=end  end代表正常的endtime
                // 4.starttime==0    && endtime==null  satrt=now ; end=now
                // 5.starttime==0    && endtime==0     satrt=now ; end=0 
                // 6.starttime==sta  && endtime==0     satrt=sta ; end=0    sta代表正常的starttime 
                // 7.starttime==     && endtime==      satrt=    ; end=
        var x=start-2008;
        var y=(end==0)? now-2008 : end-2008;  //现任则为当前年份
        var endtime= (end==0? "至今": data[i].endtime);

        var depart;
        switch(dep){//对每一个数据分部门；由于大部门里面有小部门
            case 0:depart="#stage2";break;
            case 1:depart="#stage10";break;
            case 2:depart="#stage9";break;
            case 3:
                if (data[i].zhiwu.indexOf("新闻")>=0) {
                    depart="#stage3";
                }else if(data[i].zhiwu.indexOf("时政")>=0){
                    depart="#stage4";
                }else if(data[i].zhiwu.indexOf("文化")>=0){
                    depart="#stage5";
                }else if(data[i].zhiwu.indexOf("摄影")>=0){
                    depart="#stage6";
                }
                break;
            case 4:depart="#stage7";break;
            case 5:depart="#stage11";break;
            case 6:depart="#stage8";break;
            default:break;//error input
        }

        for(;x<=y;x++){
            switch (x){
            case 0:
                data08.push(data[i]);
                break;
            case 1:
                data09.push(data[i]);
                break;
            case 2:
                data10.push(data[i]);
                break;
            case 3:
                data11.push(data[i]);
                break;
            case 4:
                data12.push(data[i]);
                break;
            case 5:
                data13.push(data[i]);
                break;
            case 6:
                data14.push(data[i]);
                break;
            case 7:
                data15.push(data[i]);
                break;
            case 8:
                data16.push(data[i]);
                break;
            case 9:
                data17.push(data[i]);
                break;
            case 10:
                data18.push(data[i]);
                break;
            default:break; //out of year area
            }
        }
    }
    dataFix(depart,x,data08);
    dataFix(depart,x,data09);
    dataFix(depart,x,data10);
    dataFix(depart,x,data11);
    dataFix(depart,x,data12);
    dataFix(depart,x,data13);
    dataFix(depart,x,data14);
    dataFix(depart,x,data15);
    dataFix(depart,x,data16);
    dataFix(depart,x,data17);
    dataFix(depart,x,data18);
}




//按年份数据绑定
function dataFix(dep,d,o){   //d为年份确定的page标志，o为当前年份已拥有数据


    var l=o.length-1;//由于数据是一个一个添加的，则l从0开始
    //画html结构

   

    var page=$(dep).children().eq(1).children().eq(d);//数据应该绑定的page页面

    var conNum=Math.floor(l/15)+1;//box个数
    if (conNum<2) {//去掉左右按钮
        $(page).find('.left').css("display","none");
        $(page).find('.right').css("display","none"); 
    }

    for (var i = 1; i<=conNum ; i++) {//动态添加li
        var liCon=" <li><div class='inBox'><div class='picBox md-trigger' data-modal='modal-4'><div class='img'><img src='' alt=''></div><p></p></div></div><div class='outBox md-modal md-effect-4' ><div class='md-content'><div class='bigPic'><img src='' alt=''></div><div class='info'><p class='name'></p><p class='position'></p></div><div class='line'></div><div class='perInfo'></div><div class='md-close'>×</div></div></div></li>" ;
        $(page).find(".imageControl ul").append("<li></li>");
        $(page).find(".imageShow ul").append('<li><div class="innerBox"><ul></ul></div></li>');
        if (i!=conNum) {
            $(page).find(".innerBox ul").eq(i-1).append(liCon+liCon+liCon+liCon+liCon+liCon+liCon+liCon+liCon+liCon+liCon+liCon+liCon+liCon+liCon
            );
        }else{
            for (var x = 0; x < (l+1-15*(conNum-1)); x++) {
                $(page).find(".innerBox ul").eq(i-1).append(liCon);
                }
        }
    }
        //有多少数据画多少li
   
        //绑定数据
    for(var j=0; j<=l; j++){
        var obj=$(page).children().eq(1).children().eq(0).find(".innerBox ul li").eq(j);//到对应的li
        $(obj).find("img").attr({
            "src":"/upload/photo/"+"1/"+o[j].name+".jpg",
            "alt":o[j].name
        }); //绑定图片
        $(obj).find(".picBox").children().eq(1).html('&nbsp;'+o[j].name+'&nbsp;'+'<a>赞</a>');  //绑定inBox
        $(obj).find(".name").text(o[j].name);
        $(obj).find(".position").html('<i>'+o[j].department+'</i>');
        $(obj).find(".perInfo").html('<p>'+o[j].college +'</p>'+'<p>'+o[j].zhiwu +'</p>'+'<p>'+ o[j].zhuanye +'</p>'+'<p>'+o[j].starttime+'-'+ o[j].endtime +'</p>');
    }
}



