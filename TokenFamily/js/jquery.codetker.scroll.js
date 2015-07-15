/*
 * windowScroll 0.1
 * window滚动插件，上下左右，可选择是否回弹。参考搜狗欢迎页面
 * 兼容等常见浏览器
 * 借鉴搜狗4.2版http://ie.sogou.com/features4.2.html
 * 如有侵权，请联系codetker@sina.com解决，谢谢
 */
;
(function($, window, document, undefined) { //组合使用构造函数模式和原型模式
	//构造函数模式定义对象
	var WindowObj = function(ele, opt) {
		this.$element = ele; //最外层对象
		this.defaults = {
				'direction': 'bottom',
				'verticalSpeed': 1,
				'horizontalSpeed': 1,
				'aim': null, //内层对象,必须同时赋值,应该在ele的内部
				'ControlUl': null,
				'toLeft': null,
				'toRight': null,
				'toTop': null,
				'toBottom': null,
				'cicle': 'false', //默认为不形成环
				'goBack': 'false' //默认没有回弹效果
			},

			this.options = $.extend({}, this.defaults, opt); //确定实际参数
	}

	//辅助函数
	//阻止默认行为和冒泡
	stopDefaultAndBubble = function(e) {
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.returnValue = false;

		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.cancelBubble = true;
	}

	//格式化对象大小
	// setSize = function(ele, width, height) {
	// 	if (height == 0) {
	// 		$(ele).css('width', width + 'px');
	// 	} else if (width == 0) {
	// 		$(ele).css('height', height + 'px');
	// 	} else {
	// 		$(ele).css({
	// 			'width': width + 'px',
	// 			'height': height + 'px'
	// 		});
	// 	}

	// }

	obj = function() {
		var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
		if (is_chrome) {
			//判断webkit内核，供scrollTop兼容性使用
			return 'body';
		} else {
			//支持IE和FF
			return 'html';
		}
	}

	getType = function(direction) {
		if (direction == 'left' || direction == 'right') {
			return 0;
		} else if (direction == 'top' || direction == 'bottom') {
			return 1;
		}
	}

	leftOrTop = function(obj, arrow, direction) {

	}

	rightOrBottom = function(obj, arrow, direction) {

	}

	getIndex = function(ele, direction, length) {
		return getType(direction) ? Math.round($(ele).scrollTop() / length) : Math.round($(ele).scrollLeft() / length);
	}

	//给构造函数添加方法
	WindowObj.prototype = {

		//上下滚动的方法
		verticalMove: function() {
			var
				obj = this.$element, //最外层对象,scroll的对象
				list = $(obj).find(this.options.aim), //内执行层
				toTop = this.options.toTop,
				toBottom = this.options.toBottom,
				control = this.options.ControlUl, //控制按钮
				speed = this.options.verticalSpeed,
				direction = this.options.direction,
				cicle = this.options.cicle,
				listMax = $(list).length,
				objHeight = $(list[0]).height(),
				stop = 0,
				stageIndex;

			if (objHeight == $(window).height()) {
				obj = obj();
			}

			//均设置为windows大小
			// this.setSize(list,);


			//绑定键盘上下按键事件
			$(document).keydown(function(event) {
				/* 绑定keycode38，即向上按钮 */
				if (event.keyCode == 38) {
					stageIndex = getIndex(obj, direction, objHeight);
					scrollStage(obj, stageIndex, 1); //stageIndex为当前页码

				} else if (event.keyCode == 40) { //绑定40，即向下按钮
					stageIndex = getIndex(obj, direction, objHeight);
					scrollStage(obj, stageIndex, -1); //stageIndex为当前页码
				}
			});

			//绑定滑轮功能的函数
			function handle(delta) {
				stageIndex = getIndex(obj, direction, objHeight);
				if (delta < 0) {
					scrollStage(obj, stageIndex, -1); //stageIndex为当前页码
				} else {
					scrollStage(obj, stageIndex, 1); //stageIndex为当前页码
				}

			}

			//判断滑轮，解决兼容性
			function wheel(event) {
				var delta = 0;
				if (!event) event = window.event;
				if (event.wheelDelta) {
					delta = event.wheelDelta;
					if (window.opera) delta = -delta;
				} else if (event.detail) {
					delta = -event.detail;
				}
				if (delta)
					handle(delta); //调用执行函数
			}

			//注册事件
			if (window.addEventListener) {
				window.addEventListener('DOMMouseScroll', wheel, false);
			}
			window.onmousewheel = document.onmousewheel = wheel;

			//绑定鼠标滚轮事件
			$(document).bind('mousedown', function(event) {
				if (e.which == 2) { //which=2代表鼠标滚轮,即为中键
					stopDefaultAndBubble(e);
					//bugfix 搜狗浏览器的ie内核只有在定时器触发这个函数才生效
					setTimeout(function() {
						stopDefaultAndBubble(e);
					}, 10);
				}
			});

			//如果有ul li控制按钮
			if (control != null) {
				$(control).delegate('li', 'click', function() {
					stageIndex = $(this).index();
					scrollStage(obj, stageIndex, 0);
				});
			}

			function scrollStage(obj, stIndex, dir) { //如果用scrollStage=function来指定的话没有声明提前，然后就会找不到这个函数了
				//obj为操作滚动的对象
				//stIndex为点击调用时应该滚动到的页面页码，按键和滚轮调用时默认为1(传入0)
				//dir传入滚动时的方向，0代表不滚动，1代表向上，-1代表向下
				var
					direction = 0 || dir, //接收参数封装,没有传入时暂时认为为0
					target = objHeight * stIndex; //目标页面距离文档顶部距离
				function move() {
					$(obj).animate({
						"scrollTop": target + "px"
					}, 1000 * speed, function() {
						if (goBack) {
							crash_bottom(1, target, 20, 150); //调用撞击函数,先撞顶部,target变成当前页面了
						}
						if (circle) { //循环
							if (direction == -1) {
								$(list).parent().append(list[0]);
							} else if (direction == 1) {
								$(list).parent().prepend(list[listMax - 1]);
							}
						}
					});
				}

				if (!$(obj).is(':animated')) { //当没有在滚动时
					if (!direction) { ////响应guider,此时stageIndex为目标页面页码
						if ($(obj).scrollTop() > target) { //内容下移，窗口上移,上方出现弹痕
							direction = -1;
							move();
						} else if ($(obj).scrollTop() == objHeight * stIndex) { //当前页面时
							direction = 0;
							crash_bottom(1, target, 20, 150); //模拟撞底部
						} else {
							direction = 1;
							move();
						}
					} else { //响应鼠标滚轮和键盘上下，stIndex为当前页面
						if (direction == 1) {
							if (stIndex == 0) {
								crash(1, target, 20, 150);
							} else { //往上翻
								stIndex -= 1;
								move();
							}
						} else {
							if (stIndex == listMax) {
								crash_bottom(1, target, 20, 150);
							} else { //往下翻
								stIndex += 1;
								move()
							}
						}
					}
				}
			}

			//撞击函数
			function later(direction, termin, distant, time) {
				if (distant <= 15 || time > 150) {
					stop = 1; //停止碰撞

					$(obj).animate({
						"scrollTop": termin + "px"
					}, time, function() {
						stop = 0;
					});
				}
			}

			function crash_bottom(direction, termin, distant, time) {
				if (!stop) {
					var scrollTop = $(obj).scrollTop();
					if (direction == 1) {
						direction = 0;
						$(obj).animate({
							"scrollTop": "+=" + distant + "px"
						}, time, function() {
							crash_bottom(direction, termin, distant * 0.6, time);
							later();
						});
					} else if (direction == 0) {
						direction = 1;
						$(obj).animate({
							"scrollTop": termin + "px"
						}, time, function() {
							crash_bottom(direction, termin, distant * 0.6, time);
							later();
						});
					}
				}
			}

			function crash(direction, termin, distant, time) {
				if (!stop) {
					var scrollTop = $(obj).scrollTop();
					if (direction == 1) {
						direction = 0;
						$(obj).animate({
							"scrollTop": "-=" + distant + "px"
						}, time, function() {
							crash(direction, termin, distant * 0.6, time);
							later();
						});
					} else if (direction == 0) {
						direction = 1;
						$(obj).animate({
							"scrollTop": termin + "px"
						}, time, function() {
							crash(direction, termin, distant * 0.6, time);
							later();
						});
					}
				}
			}

		},
		//左右滚动的方法
		horizontalMove: function() {
			var
				obj = this.$element, //最外层对象
				speed = this.options.horizontalSpeed,
				objControl = this.options.objControlUl, //控制按钮
				windowWidth = $(window).width(),
				list = $(obj).children('.page'),
				listMax = $(list).length,
				is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
				stop = 0,
				pageIndex; //当前页面页码(负数)

			if (is_chrome) {
				//判断webkit内核，供scrollTop兼容性使用
				obj = 'body';
			} else {
				//支持IE和FF
				obj = 'html';
			}

			//均设置为windows大小
			this.setSize(obj);
			$(obj).css({
				'width': windowWidth * listMax + 'px'
			});

			function getPageIndex() {
				pageIndex = Math.round(parseInt($(obj).css("margin-left")) / windowWidth);
			}

			//绑定键盘左右按键事件
			$(document).keydown(function(event) {
				//判断event.keyCode为39（即向右按钮）
				if (event.keyCode == 39) {
					getPageIndex();
					scrollPage($(obj), pageIndex, -1);
				}
				//判断event.keyCode为37（即向左按钮
				else if (event.keyCode == 37) {
					getPageIndex();
					scrollPage($(obj), pageIndex, 1);
				}
			});

			//如果有ul li控制按钮
			if (objControl != null) {
				$(objControl).delegate('li', 'click', function() {
					pageIndex = $(this).index();
					setTimeout(function() {
						scrollPage(obj, pageIndex, 0);
					}, 100);
				});
			}

			function scrollPage(obje, pIndex, dir) {
				var
					obj = obje,
					direction = 0 || dir,
					pageIndex = pIndex,
					dist = Math.round(parseInt($(obj).css("margin-left"))), //当前页距离左边的margin(负值)
					aim = pageIndex * windowWidth * (-1);

				if (!$(obj).is(":animated")) {
					if (!direction) { //响应nav

						if (dist != aim) { //此时pageIndex为yearID.非负值
							$(obj).animate({
									"margin-left": aim + "px"
								},
								1000 * speed);
						} else {
							direction = 0;
							$(obj).animate({
								"margin-left": "+=" + "50px"
							}, 500).animate({
								"margin-left": "-=" + "100px"
							}, 500).animate({
								"margin-left": "+=" + "50px"
							}, 500);
						}
					} else { //响应键盘左右键
						if (direction == 1) { //pageIndex为负值
							if (pageIndex == 0) {
								$(obj).animate({
									"margin-left": "+=" + "50px"
								}, 500).animate({
									"margin-left": "-=" + "100px"
								}, 500).animate({
									"margin-left": "+=" + "50px"
								}, 500);
							} else {
								pageIndex += 1; //显示左边内容，左键
								$(obj).animate({
										"margin-left": "+=" + windowWidth + "px"
									},
									1000 * speed);
							}
						} else {
							if (pageIndex == ((-1) * (listMax - 1))) {
								$(obj).animate({
									"margin-left": "-=" + "50px"
								}, 500).animate({
									"margin-left": "+=" + "100px"
								}, 500).animate({
									"margin-left": "-=" + "50px"
								}, 500);
							} else {
								pageIndex -= 1;
								$(obj).animate({
										"margin-left": "-=" + windowWidth + "px"
									},
									1000 * speed);
							}
						}
					}
				}
			}

		}
	}

	//在插件中使用windowObj对象的方法，0为vertical，1为horizontal
	$.fn.scroll = function(options) { //不绑定属性方法在对象上，而是绑定在对象的原型上，以让所有的实例共享同一个原型，不会重复创建
		//创建实体
		var windowObj = new WindowObj(this, options);
		//根据选择调用方法
		if (windowObj.options.direction == 'bottom' || windowObj.options.direction == 'up') {
			return windowObj.verticalMove();
		} else if (windowObj.options.choose == 1) {
			return windowObj.horizontalMove();
		} else { //2之后的留扩展吧
			//add some functions
		}
	}
})(jQuery, window, document);