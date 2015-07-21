/** 数据获取与绑定,数据之间没有依赖或顺序 */
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
				for (var x = 0, temp = l + 1 - 15 * (conNum - 1); x < temp; x++) {
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
				"src": 'http://wechat.wutnews.net/Web/Admin/Api/img?dep=' + o[j].department + '&name=' + o[j].name,
				// "src": "/upload/photo/" + "1/" + o[j].name + ".jpg",
				"alt": o[j].name
			}); //绑定图片
			$(obj).find(".picBox").children().eq(1).html('&nbsp;' + o[j].name + '&nbsp;' + '<a>赞</a>'); //绑定inBox
			$(obj).find(".name").text(o[j].name);
			$(obj).find(".position").html('<i>' + task + '</i>');
			$(obj).find(".perInfo").html('<p>' + o[j].college + '</p>' + '<p>' + o[j].zhiwu + '</p>' + '<p>' + o[j].zhuanye + '</p>' + '<p>' + o[j].starttime + ' —— ' + o[j].endtime + '</p>');
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

		for (var i = 0, len = data.len; i < len; i++) { //对每一个数据分年处理

			//首先处理年份，好按照年份分类
			var start, end, x, y;

			if (data[i].starttime == null || data[i].starttime.split("-")[0] == 0) {
				data[i].starttime = '机密';
				if (data[i].endtime == null || data[i].endtime.split("-")[0] == 0) {
					data[i].endtime = '机密';
					start = now;
					end = now;
				} else {
					start = data[i].endtime.split("-")[0];
					end = start;
				}
			} else {
				start = data[i].starttime.split("-")[0];
				if (data[i].endtime == null || data[i].endtime.split("-")[0] == 0) {
					data[i].endtime = '至今';
					end = now;
				} else {
					end = data[i].endtime.split("-")[0];
				}
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

			x = start - 2008;
			y = end - 2008;

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

		function timeCheck(data) {
			for (var i = 0, len = data.length; i < len; i++) {
				if (data[i].starttime == null || data[i].starttime.split("-")[0] == 0) {
					data[i].starttime = '机密';
					if (data[i].endtime == null || data[i].endtime.split("-")[0] == 0) {
						data[i].endtime = '机密';
					}
				} else {
					if (data[i].endtime == null || data[i].endtime.split("-")[0] == 0) {
						data[i].endtime = '至今';
					}
				}
			}
		}

		for (var i = 0, len = mName14.length; i < len; i++) {
			$.getJSON(
				"http://wechat.wutnews.net/Web/Admin/Api/detail_name.html?name=" + mName14[i],
				function(data) {
					DB014.push(data[0]);

					if (DB014.length == mName14.length - 1) {
						timeCheck(DB014);
						dataFix("#stage2", 6, DB014);
					}
				}
			);
		}
		for (var j = 0, leng = mName15.length; j < leng; j++) {
			$.getJSON(
				"http://wechat.wutnews.net/Web/Admin/Api/detail_name.html?name=" + mName15[j],
				function(data) {
					DB015.push(data[0]);

					if (DB015.length == (mName15.length - 1)) {
						timeCheck(DB015);
						dataFix("#stage2", 7, DB015);
					}
				}
			);
		};
	}()); //一个一旦调用立马执行的匿名函数

	getData(1, DB1, '#stage10');
	getData(2, DB2, '#stage9');
	getData(3, DB3, '#stage3'); //stage3 4 5 6
	getData(4, DB4, '#stage7');
	getData(5, DB5, '#stage11');
	getData(6, DB6, '#stage8');

	/* 设置输出后的样式 */
	setTimeout(function() {
		var showHeight = Math.floor(($(window).height() * 0.95 - 120) * 0.9),
			showTop = Math.floor(showHeight * 0.05 / 0.9),
			x = ".innerBox ul li",
			liHeight = $(x).height(),
			liWidth = $(x).width(),
			ob = ".md-content";

		//设计人物展示区域
		function setCss() {
			$(".stage").find(".innerBox").css({ //给人物展示设置空间
				"height": showHeight + "px",
				"margin-top": showTop + 120 + "px"
			});


			$(x).css({
				"width": Math.round($('.innerBox').width() / 5) + "px",
				"height": Math.floor((showHeight / 3) - 20) + 20 + "px"
			});

			$(".img").css({
				"width": liWidth + "px",
				"height": liHeight + "px"
			});
			$(".img img").css({
				"width": liHeight - 40 + "px",
				"height": liHeight - 40 + "px",
				"margin-left": Math.round((liWidth - liHeight) / 2) + 20 + "px"
			});

			$(".bigPic").css({
				"width": $(ob).width() * 0.6 + "px",
				"height": $(ob).width() * 0.6 + "px"
			});
			setTimeout(function() {
				$(ob).find(".md-close").css({
					"left": $(ob).width() - 42 + "px",
					"bottom": $(ob).height() - 50 + "px"
				});
			}, 200);

			$('.stage .page .imageControl').each(function() {
				var obj = $(this).find('li'),
					indexMax = $(obj).length,
					liSpace = Math.floor(($(this).width() - 20 * indexMax) / (indexMax - 1) - 1);
				$(obj).not(":first").css("margin-left", liSpace + "px");

				if ((indexMax > 1) && (!$(this).parents('.stage').is('#stage1'))) { //当需要分页时实现盒子滚动效果
					var obj = $(this).siblings('.imageShow'),
						controlUl = $(this).children('ul'),
						toLeft = $(this).parent().siblings('.left'),
						toRight = $(this).parent().siblings('.right');
					$(obj).boxScroll({
						'child': 'li',
						'toLeft': toLeft,
						'toRight': toRight,
						'ControlUl': controlUl,
						'style': 2,
						'liHover': 'liSelect',
						'autoRun': false
					});

					$(controlUl).children('li').eq(0).click();
				}
			});
		}

		$(x).each(function() {
			var o = $(this).children().eq(0).children().children().eq(0),
				twidth = $(o).width(),
				tmpLeft = Math.round((liWidth - liHeight) / 2) + 20,
				tmpWidth = liHeight - 40;

			$(o).mouseover(function() {
				$(this).find("img").animate({
					"margin-left": "30px",
					"margin-top": "-30px",
					"width": twidth - 60 + "px",
					"height": twidth - 60 + "px"
				}, 300);
				$(this).parent().attr("data-modal", "modal-4");
				$(this).parent().parent().parent().find(".outBox").attr({
					"class": "outBox md-modal md-effect-4",
					"id": "modal-4"
				});
			});
			$(o).mouseleave(function() {
				$(this).find("img").animate({
					"margin-left": tmpLeft + "px",
					"margin-top": "0px",
					"width": tmpWidth + "px",
					"height": tmpWidth + "px"

				}, 100);
				$(this).parent().removeAttr("data-modal");
			});

			$(o).click(function() {

				$(this).parent().attr("data-modal", "modal-4");
				$(this).parent().parent().parent().find(".outBox").attr({
					"class": "outBox md-modal md-effect-4 md-show", //手动添加居然可以！！！
					"id": "modal-4"
				});
				$(this).parent().parent().parent().find(".mask").addClass("maskS");
			});
			$(o).parent().parent().parent().find(".md-close").click(function() {
				$(o).parent().parent().parent().find(".mask").removeClass("maskS");
				$(o).mouseover();
			});
		});

		setCss();
	}, 4000);

});