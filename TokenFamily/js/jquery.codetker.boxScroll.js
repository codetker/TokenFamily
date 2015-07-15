/*
 * boxScroll 0.1
 * 兼容等常见浏览器
 */
;
(function($, window, document, undefined) {
	//定义构造函数
	var BoxObj = function(ele, opt) {
		this.$element = ele; //最外层对象
		this.defaults = {
				'style': 0, //滚动样式选择,默认为普通效果
				'speed': 1, //默认为1s
				'direction': 'left', //默认为向左边滚动
				'toLeft': $(ele).children('.picOuterBox').children('.arrowLeft'), //默认格式下重要位置
				'toRight': $(ele).children('.picOuterBox').children('.arrowRight'),
				'ControlUl': $(ele).children('.picControl').children('ul')
			},

			this.options = $.extend({}, this.defaults, opt);
		//这里可以添加一些通用方法	
	}

	//给构造函数添加方法
	BoxObj.prototype = {

		commonScroll: function() {
			//接收对象属性
			var
				boxWindow = $(this.$element).children('.picOuterBox').children('.picInnerBox'),
				speed = this.defaults.speed,
				style = this.defaults.style,
				direction = (this.defaults.direction == 'left') ? 1 : -1,
				toLeft = this.defaults.toLeft,
				toRight = this.defaults.toRight,
				Control = this.defaults.ControlUl,
				boxWidth = $(boxWindow).children('li').width(),
				imgIndexMax = $(boxWindow).children('li').length,
				imgIndex,
				timer; //必须在外面定义保证全局针对这一功能只有这一个计时器

			function getImgIndex() { //判断当前图片的位置
				imgIndex = Math.round(parseInt($(boxWindow).css("margin-left")) * (-1) / boxWidth);
			}

			// timer = setInterval(function() {
			// 	boxScroll(imgIndex, direction);
			// }, 5000);

			// function rest() {
			// 	clearInterval(timer);
			// 	timer = setInterval(function() {
			// 		boxScroll(imgIndex, direction);
			// 	}, 5000);
			// }

			//绑定点击按钮
			$(Control).delegate('li', 'click', function() {
				boxScroll($(this).index(), 0);
				// rest();
			});

			//绑定左右按钮
			$(toLeft).click(function() {
				boxScroll(0, -1);
				// rest();
			});
			$(toRight).click(function() {
				boxScroll(0, 1);
				// rest();
			});

			function boxScroll(index, dir) {
				if (!$(boxWindow).is(':animated')) { //当ul窗口没有在动时
					if (!dir) { //响应ul li control操作
						//此时dir=0，则依靠传入的imgIndex
						imgIndex = index;
						//其它时候dir!=0,则依靠dir
					} else { //响应toLeft和toRight
						if (dir == 1) { //向右动
							getImgIndex();
							if (imgIndex == (imgIndexMax - 1)) {
								imgIndex = 0;

							} else {
								imgIndex += 1;
							}
						} else { //向左动
							getImgIndex();
							if (imgIndex == 0) {
								imgIndex = (imgIndexMax - 1);
							} else {
								imgIndex -= 1;
							}
						}
					}
					$(Control).children('li').eq(imgIndex).addClass('liSelected');
					$(Control).children('li').eq(imgIndex).siblings().removeClass('liSelected');
					$(boxWindow).animate({
						"margin-left": imgIndex * boxWidth * (-1) + 'px'
					}, 1000 * speed);
				}
			}
		}

			showAndHide: function() {
			//obj为确定的调用id，层次为#stage1 .pageFirst
			var obj = $(this.$element).children('.pageFirst');

			function boxScroll(obj) {
				var toLeft = $(obj).children().eq(0), //用child可能更快一些
					toRight = $(obj).children().eq(2), //只是取别名，并非深拷贝
					object = $(obj).children().eq(1), //$(".imageBox")
					box = $(object).children().eq(0), //$("#stage1 .imageShow
					control = $(object).children().eq(1), //相对于内部全是全局变量便于操作
					imgIndex,
					imgList = $(box).find("ul").eq(0).children(), //图片所在的li数组
					conList = $(control).find("ul li"), //控制所在的数组
					indexMax = $(imgList).length - 1,
					indexMin = 0,
					liSpace = Math.floor(($(control).width() - 20 * (indexMax + 1)) / (indexMax)) - 1, //确定放得下
					beginTime = Date.parse(new Date()), //时间控制，0.8s内仅能点一次,防止多次点击
					finalTime = Date.parse(new Date()),
					x = $(object).find(".innerBox ul li"), //作用域内覆盖外部全局变量
					num = $(x).length;

				$(imgList).css({ //保证全屏
					"width": $(window).width() + "px",
					"height": $(window).height() + "px"
				});


				$(conList).addClass(".liNot").eq(0).addClass("liSelect");
				$(imgList).fadeOut("100");
				$(imgList).eq(0).fadeIn("slow"); //先载入第一张图片


				$(conList).not(":first").css("margin-left", liSpace + "px"); //布置控制的格式

				function imgScroll(imgIndex, dir) { //操作对象为object,即imageBox
					var index = imgIndex, //点击下方imgControl时使用
						direction = dir; //左右点击时使用，右击为1，左击为0

					if (!$(box).is(":animated")) { //在没有动作时执行函数
						if (!direction) { //先讨论点击control框时(direction传入0，index表示目标图片编号)
							// stopStep()
							$(imgList).siblings().fadeOut(300);
							setTimeout(function() {
								$(imgList).eq(index).fadeIn(500);
							}, 100);

							$(conList).removeClass("liSelect");
							$(conList).eq(index).addClass("liSelect");
						} else { //点击左右时
							if (direction == 1) { //往右的顺序,index表示当前值
								$(conList).removeClass("liSelect");
								if (index == indexMax) {
									index = indexMin;
									$(imgList).eq(indexMax).fadeOut(300);
									setTimeout(function() {
										$(imgList).eq(indexMin).fadeIn(500);
									}, 100);
								} else {
									index += 1;
									$(imgList).eq(index - 1).fadeOut(300);
									setTimeout(function() {
										$(imgList).eq(index).fadeIn(500);
									}, 100);
								}
								$(conList).eq(index).addClass("liSelect");

							} else {
								$(conList).removeClass("liSelect");
								if (index == indexMin) {
									index = indexMax;
									$(imgList).eq(indexMin).fadeOut(300);
									setTimeout(function() {
										$(imgList).eq(indexMax).fadeIn(500);
									}, 100);
								} else {
									index -= 1;
									$(imgList).eq(index + 1).fadeOut(300);
									setTimeout(function() {
										$(imgList).eq(index).fadeIn(500);
									}, 100);
								}
								$(conList).eq(index).addClass("liSelect");
							}
						}
					}
				}

				//control控制
				$(conList).click(function() {
					var ID = $(this).index();
					imgScroll(ID, 0);
				});

				//得到当前图片的index
				function getImgIndex() {
					imgIndex = $(control).find("ul").find(".liSelect").index();
				}

				//左右点击控制
				$(toLeft).click(function() {
					beginTime = Date.parse(new Date());
					if ((beginTime - finalTime) > 800) {
						getImgIndex();
						setTimeout(function() {
							imgScroll(imgIndex, -1);
						}, 200);
						finalTime = Date.parse(new Date());
					}
				});

				$(toRight).click(function() {
					beginTime = Date.parse(new Date());
					if ((beginTime - finalTime) > 800) {
						getImgIndex();
						setTimeout(function() {
							imgScroll(imgIndex, 1);
						}, 200);
						finalTime = Date.parse(new Date());
					}
				});

				//不动时每过8000ms变化一次,对于首页
				function runStep() {
					if (!$(object).find(".innerBox").length) { //判断是首页
						var timer = setInterval(function() {
							$(toRight).click();
						}, 8000);
					}
				}

				function stopStep() {
					clearInterval(timer);
				}
				runStep();

				//不同page区域的length不同
				for (var i = 0; i < num; i++) {
					if (i % 5) {
						$(x).eq(i).css("margin-left", "40px");
					}
				}
			}

			boxScroll(obj);
		}
	}

	//在插件中使用boxObj对象的方法，style=0为普通，style=1为show and hide
	$.fn.boxScroll = function(options) {
		//创建实体
		var boxObj = new BoxObj(this, options);
		//用尾调的形式调用对象方法
		if (boxObj.options.style == 0) {
			return boxObj.commonScroll();
		} 
		else if (boxObj.options.style == 1) {
			return boxObj.showAndHide();
		}
		else{
			
		}

	}
})(jQuery, window, document);