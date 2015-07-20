/** 处理文档 */
$(document).ready(function() {
	/* 显示guider,窗口上下控制按钮 */
	$('.cont-dep').mouseenter(function() {
		$('.cont-dep li').slideDown('fast').css('border-bottom', '1px solid #8F8E8E');
	});
	$('.cont-dep').mouseleave(function() {
		$('.cont-dep li').css('border-bottom', 'none').slideUp('fast');
	});

	/* 显示nav，窗口左右控制按钮 */
	var yearDiv = $('.year');
	$(yearDiv).scrollLeft(664);
	$('.showleft').click(function() {
		$(yearDiv).animate({
			'scrollLeft': '-=' + 166
		}, 200);

	});
	$('.showright').click(function() {
		if (parseInt($(yearDiv).scrollLeft()) < 1162) {
			$(yearDiv).animate({
				'scrollLeft': '+=' + 166
			}, 200);
		}
	});

	/* window窗口上下滚动 */
	$('#cont').windowScroll({
		'choose': 0,
		'verticalSpeed': 1, //控制垂直滚动速度
		'objControlUl': $('.guide').children('ul'),
		'list': '#cont .stage',
		'crash': true
	});

	/* window窗口左右滚动 */
	$('.stage').not('#stage1').each(function() {
		$(this).children('.pageBox').windowScroll({
			'choose': 1,
			'horizontalSpeed': 1, //控制水平滚动速度
			'objControlUl': '.navIn ul',
			'list': $(this).find('.page'),
			'crash': true
		});
	});

	/* 首页轮播图 */
	$("#stage1 .imageShow").boxScroll({
		'child': 'li',
		'toLeft': '#stage1 .left',
		'toRight': '#stage1 .right',
		'ControlUl': '#stage1 .imageControl ul',
		'style': 2,
		'liHover': 'liSelect'
	});

	//窗口大小变动时刷新页面
	$(window).resize(function() {
		setTimeout(function(){//bugfix:IE内核需要设置时延才能运行
			location.reload();
		},200);
	});

});