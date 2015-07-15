/**
 * Created by Administrator on 2015/5/24.
 */
//绑定数值

//使用getJSON方法获取数据,用回调函数的形式绑数据
/* dep:1表示技术部 stage10
 *  2:设计部 stage9
 *  3:内容部，再根据里面的字段分为新闻(stage3)，时政(satge4)，文化(stage5),摄影(stage6)四个子部门
 *  4:人力资源部 stage7
 *  5:运营部 stage 11
 *  6:产品 stage8
 *  7:站长。。。
 *  0:管理层 stage2
 */
$(document).ready(function() {
    function dataFix(dep, index, o) {
        //index:pageIndex
        var
            task,
            page = $(dep).find(".page").eq(index), //数据应该绑定的page页面
            l = o.length - 1,
            conNum = Math.floor(l / 15) + 1, //box个数
            liCon = " <li><div class='inBox'><div class='picBox md-trigger' data-modal='modal-4'><div class='img'><img src='' alt=''></div><p></p></div></div><div class='mask'><div class='outBox md-modal md-effect-4' ><div class='md-content'><div class='bigPic'><img src='' alt=''></div><div class='info'><p class='name'></p><p class='position'></p></div><div class='line'></div><div class='perInfo'></div><div class='md-close'>×</div></div></div></div></li>";

        if (conNum < 2) { //去掉左右按钮
            $(page).find('.left').css("display", "none");
            $(page).find('.right').css("display", "none");
            $(page).find(".imageControl ul").css("display", "none");
        }

        for (var i = 1; i <= conNum; i++) { //动态添加li
            $(page).find(".imageControl ul").append("<li></li>");
            $(page).find(".imageShow").children().eq(0).append('<li><div class="innerBox"><ul></ul></div></li>'); //新加的里面有ul，防止形成循环嵌套
            if (i < conNum) {
                $(page).find(".innerBox ul").eq(i - 1).append(liCon + liCon + liCon + liCon + liCon + liCon + liCon + liCon + liCon + liCon + liCon + liCon + liCon + liCon + liCon);
            } else {
                for (var x = 0; x < (l + 1 - 15 * (conNum - 1)); x++) {
                    $(page).find(".innerBox ul").eq(i - 1).append(liCon);
                }
            }
        }

        //添加完li后绑数据
        switch (dep) {
            case "#stage2":
                task = "管理层";
                break;
            case "#stage10":
                task = "技术部";
                break;
            case "#stage9":
                task = "设计部";
                break;
            case "#stage3":
                task = "新闻经纬";
                break;
            case "#stage4":
                task = "时政话题";
                break;
            case "#stage5":
                task = "校园文化";
                break;
            case "#stage6":
                task = "摄影部";
                break;
            case "#stage7":
                task = "人力资源部";
                break;
            case "#stage11":
                task = "运营部";
                break;
            case "#stage8":
                task = "产品部";
                break;
            default:
                break;
        }

        for (var j = 0; j <= l; j++) {
            var obj = $(page).find(".innerBox ul li").eq(j); //到对应的li
            $(obj).find("img").attr({
                "src": "/upload/photo/" + "1/" + o[j].name + ".jpg",
                "alt": o[j].name
            }); //绑定图片
            $(obj).find(".picBox").children().eq(1).html('&nbsp;' + o[j].name + '&nbsp;' + '<a>赞</a>'); //绑定inBox
            $(obj).find(".name").text(o[j].name);
            $(obj).find(".position").html('<i>' + task + '</i>');
            $(obj).find(".perInfo").html('<p>' + o[j].college + '</p>' + '<p>' + o[j].zhiwu + '</p>' + '<p>' + o[j].zhuanye + '</p>' + '<p>' + o[j].starttime + '-' + o[j].endtime + '</p>');
        }
    }

    function depData(dep, data) {
        //输入部门数据创建li结构
        //dep表示要绑定数据的部门
        //data为数据
        var
            date = new Date(), //得到当前时间
            now = date.getFullYear(), //得到当前年份
            //对年份进行处理，防止出现空占位的情况
            data08 = new Array(), //对应年份的数据
            data09 = new Array(),
            data10 = new Array(),
            data11 = new Array(),
            data12 = new Array(),
            data13 = new Array(),
            data14 = new Array(),
            data15 = new Array(),
            data16 = new Array(),
            data17 = new Array(),
            data18 = new Array(),
            tmpn = -1;

        if (!data.length) { //当是对象时,赋值data.length属性
            for (p in data) {
                tmpn += 1;
            }
            data.len = tmpn; //定义新属性兼容
        } else {
            data.len = data.length;
        }

        for (i = 0; i < data.len; i++) { //对每一个数据分年处理

            //首先处理年份，好按照年份分类
            var start, end, x, y, endtime;

            if (data[i].starttime == null) {
                start = (data[i].endtime == null || data[i].endtime == 0) ? now : data[i].endtime.split("-")[0];
            } else {
                start = (data[i].starttime.split("-")[0] == 0) ? ((data[i].endtime == null || data[i].endtime == 0) ? now : data[i].endtime.split("-")[0]) : data[i].starttime.split("-")[0]; //得到进入部门的年份,如果是0000则按照离职的写,假定仅在部门一年
            }
            if (data[i].endtime == null) {
                end = now;
            } else {
                end = data[i].endtime.split("-")[0]; //得到离职的年份，到如今则数值上等于0
            }
            //几种情况:
            // 1.starttime==null && endtime==null  satrt=now ; end=now
            // 2.starttime==null && endtime==0     satrt=now ; end=0
            // 3.starttime==null && endtime==end   satrt=end ; end=end  end代表正常的endtime
            // 4.starttime==0    && endtime==null  satrt=now ; end=now
            // 5.starttime==0    && endtime==0     satrt=now ; end=0 
            // 6.starttime==sta  && endtime==0     satrt=sta ; end=0    sta代表正常的starttime 
            // 7.starttime==     && endtime==      satrt=    ; end=
            //意图修改endtime标准点，但是貌似不行，还是把后台数据修改好再改好了
            
            x = start - 2008,
            y = (end == 0) ? now - 2008 : end - 2008; //现任则为当前年份
            endtime = (end == 0 ? "至今" : data[i].endtime);
            data[i].endtime = endtime;
            data[i].starttime = start;

            for (; x <= y; x++) {
                if (data[i].zhiwu.indexOf("实习") < 0) { //实习生不加入名片墙
                    switch (x) {
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
                        default:
                            break; //out of year area
                    }
                }
            }
        }
        //至此得到了dep部门08~18年的数据

        //现在根据dep来画结构
        dataFix(dep, 0, data08);
        dataFix(dep, 1, data09);
        dataFix(dep, 2, data10);
        dataFix(dep, 3, data11);
        dataFix(dep, 4, data12);
        dataFix(dep, 5, data13);
        dataFix(dep, 6, data14);
        dataFix(dep, 7, data15);
        dataFix(dep, 8, data16);
        dataFix(dep, 9, data17);
        dataFix(dep, 10, data18);
    }

    var
        DB1 = new Array(), //为了获取长度用数组存放
        DB2 = new Array(),
        DB3 = new Array(),
        DB4 = new Array(),
        DB5 = new Array(),
        DB6 = new Array(),
        n3 = -1,
        DB31 = new Array(),
        DB32 = new Array(),
        DB33 = new Array(),
        DB34 = new Array();

    function getData(n, DB, obj) { //取数据
        $.getJSON(
            "http://wechat.wutnews.net/Web/Admin/Api/detail_dep.html?dep=" + n,
            function(data) {
                DB = data; //存储数据

                if (n != 3) {
                    depData(obj, DB); //处理数据
                } else { //n=3时要分为四个小部门
                    for (p in DB) {
                        n3 += 1;
                    } //要分类，先取出来

                    for (var temp = 0; temp < n3; temp++) {
                        if (DB[temp].zhiwu.indexOf("新闻") >= 0) {
                            DB31.push(DB[temp]);
                        } else if (DB[temp].zhiwu.indexOf("时政") >= 0) {
                            DB32.push(DB[temp]);
                        } else if (DB[temp].zhiwu.indexOf("文化") >= 0) {
                            DB33.push(DB[temp]);
                        } else if (DB[temp].zhiwu.indexOf("摄影") >= 0) {
                            DB34.push(DB[temp]);
                        }
                    }

                    depData("#stage3", DB31);
                    depData("#stage4", DB32);
                    depData("#stage5", DB33);
                    depData("#stage6", DB34);
                }
            }
        );

    }



    (function() {
        //由于管理层人少，直接按姓名取出来单独绑定
        var mName14 = ["黄伟", "皇甫月雷", "张朝奎", "刘谦瑞", "刘苹", "林贤惠", "魏睐"], //"靳乾乾","顾颖",
            mName15 = ["王灵杰", "刘苹", "肖元", "黄赟", "张政", "廖星", "魏睐"],
            DB014 = new Array(),
            DB015 = new Array();

        for (var i = 0; i < mName14.length; i++) {
            $.getJSON(
                "http://wechat.wutnews.net/Web/Admin/Api/detail_name.html?name=" + mName14[i],
                function(data) {
                    DB014.push(data[0]);

                    if ( DB014.length == mName14.length-1 ) {
                        dataFix("#stage2", 6, DB014);
                    }
                }
            );
        }
        for (var j = 0; j < mName15.length; j++) {
            $.getJSON(
                "http://wechat.wutnews.net/Web/Admin/Api/detail_name.html?name=" + mName15[j],
                function(data) {
                    DB015.push(data[0]);

                    if ( DB015.length ==( mName15.length-1 ) ) {
                        dataFix("#stage2", 7, DB015);
                    }
                }
            );
        };
        // return (function() { //将绑定数据以函数的形式作为返回值调用
        //     setTimeout(function(){
        //         dataFix("#stage2", 6, DB014);
        //         dataFix("#stage2", 7, DB015);
        //     },3000); //由于获取数据需要时间，因此没有取到就return啦。。。
        // }());
    }()); //一个一旦调用立马执行的匿名函数

    getData(1, DB1, '#stage10');
    getData(2, DB2, '#stage9');
    getData(3, DB3, '#stage3'); //stage3 4 5 6
    getData(4, DB4, '#stage7');
    getData(5, DB5, '#stage11');
    getData(6, DB6, '#stage8');

});