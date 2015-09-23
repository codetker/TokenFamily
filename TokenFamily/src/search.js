//点击search按姓名搜索资料并显示
//姓名取data的接口(搜索，显示页面得先画出来)
$(document).ready(function() {
	$(".searchButton").delegate("img", "click", function() { //事件委托绑定查询
		var text = $(".people").val(),
			back = new Array,
			obj=$('.searchButton .md-content'),
			task,
			nameExp = (/^[\u4e00-\u9fa5]{2,7}$/).test(text),
			template=[
                        '<div class="bigPic">',
                            '<img src="" alt="">',
                        '</div>',
                        '<div class="info">',
                            '<p class="name"></p>',
                            '<p class="position"><i></i></p>',
                        '</div>',
                        '<div class="line"></div>',
                        '<div class="perInfo">',
                            '<p></p>',
                            '<p></p>',
                            '<p></p>',
                        '</div>',
                        '<div class="md-close">×</div>'
                ].join(''),
                template2=[
                        '<div class="info">',
                            '<p class="name"></p>',
                        '</div>',   
                        '<div class="md-close">×</div>'
                ].join('');

		function showSWindow(){
			$('.md-content').append(template2);
			$(obj).find(".name").text(back[0]);
			$(obj).find(".name").css({
				"position": "relative",
				"top": "16px"
			});
			$(obj).find(".md-close").css("bottom", "30px");
		}

		if (text == "" || text == "搜索Token成员") {
			if(!nameExp){
				back[0] = "请检查输入!";
			}else{
				back[0] = "请重新输入姓名后搜索";
			}
			showSWindow();
		} else {
			$.getJSON(
				"http://wechat.wutnews.net/Web/Admin/Api/detail_name.html?name=" + text,
				function(data) {
					back = data;
					if (back == "") {
						back[0] = "请检查输入是否错误";
						showSWindow();
					} else {
						$('.md-content').append(template);
						$(obj).find(".name").css({
							"position": "relative",
							"top": "0px"
						});
						$(obj).find(".md-close").css("bottom", $(obj).height() - 40 + "px");

						//过滤时间
						if (back[0].starttime == null || back[0].starttime.split("-")[0] == 0) {
							back[0].starttime = '机密';
							if (back[0].endtime == null || back[0].endtime.split("-")[0] == 0) {
								back[0].endtime = '机密';
							}
						} else {
							if (back[0].endtime == null || back[0].endtime.split("-")[0] == 0) {
								back[0].endtime = '至今';
							}
						}

						//分部门
						switch (back[0].department) {
							case "1":
								task = "技术部";
								break;
							case "2":
								task = "设计部";
								break;
							case "3":
								if (back[0].zhiwu.indexOf("新闻") >= 0) {
									task = "新闻经纬";
								} else if (back[0].zhiwu.indexOf("时政") >= 0) {
									task = "时政话题";
								} else if (back[0].zhiwu.indexOf("文化") >= 0) {
									task = "校园文化";
								} else if (back[0].zhiwu.indexOf("摄影") >= 0) {
									task = "摄影部";
								} else {
									task = "内容部"; //给zhiwu没填的一个显示
								}
								break;
							case "4":
								task = "人力资源部";
								break;
							case "5":
								task = "运营部";
								break;
							case "6":
								task = "产品部";
								break;
							default:
								break;
						}

						//绑定数据
						$(obj).find("img").attr({
							"src": 'http://wechat.wutnews.net/Web/Admin/Api/img?dep=' + back[0].department + '&name=' + back[0].name,
							"alt": back[0].name
						}); //绑定图片
						$(obj).find(".name").text(back[0].name);
						$(obj).find(".position").html('<i>' + task + '</i>');
						$(obj).find(".perInfo").html('<p>' + back[0].college + '</p>' + '<p>' + back[0].zhiwu + '</p>' + '<p>' + back[0].zhuanye + '</p>' + '<p>' + back[0].starttime + ' —— ' + back[0].endtime + '</p>');
					}
				}
			);
		}
	});

	$(".people").focus(function() {
		this.value == "搜索Token成员" ? this.value = "" : this.value = this.value;
	});
	$(".people").blur(function() {
		this.value == "" ? this.value = "搜索Token成员" : this.value = this.value;
	});

	$(".searchButton").find(".md-close").click(function() {
		$('.searchButton .md-content').fadeOut("fast").empty();
	});
	$(".searchButton").children().eq(0).click(function() {
		setTimeout(function(){
			$('.searchButton .md-content').fadeIn("slow");
		},500);//等一下数据
	});

	$(document).keydown(function(event) {
		if (event.keyCode == 13) { //绑定enter       27Esc    113F2
			setTimeout(function() {
				//绑定搜索的enter事件
				$(".searchButton img").click();
			}, 100);

		}
	});
});