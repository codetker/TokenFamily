$(function() {
	var canvas = $("#c");
	var canvasHeight;
	var canvasWidth;
	var ctx;
	var dt = 0.1;
	
	var pointCollection;
	
	function init() {
		updateCanvasDimensions();
		var g = [
				new Point(0, 0, 0.0, 9, "#18c8a4"),//距离左的距离+距离上的距离+？+半径
				new Point(20, 0, 0.0, 9, "#18c8a4"),
				new Point(40, 0, 0.0, 9, "#13cea8"),
				new Point(60, 0, 0.0, 8, "#13cea8"),
				new Point(80, 0, 0.0, 8, "#12d8af"),
				new Point(40, 20, 0.0, 8, "#12d8af"),
				new Point(40, 40, 0.0, 8, "#12e1b7"),
				new Point(40, 60, 0.0, 8, "#12e1b7"),
				new Point(40, 80, 0.0, 9, "#0fefc1"),
				new Point(40, 100, 0.0, 9, "#0fefc1"),
				new Point(40, 120, 0.0, 9, "#0fefc1"),//T
				new Point(120, 120, 0.0, 7, "#b5e6e3"),
				new Point(105, 114, 0.0, 6, "#b5e6e3"),
				new Point(95, 103, 0.0, 6, "#a7e3df"),
				new Point(90, 90, 0.0, 7, "#a7e3df"),
				new Point(97, 75, 0.0, 6, "#a7e3df"),
				new Point(106, 67, 0.0, 6, "#98e1dd"),
				new Point(120, 60, 0.0, 7, "#98e1dd"),
				new Point(134, 67, 0.0, 6, "#98e1dd"),
				new Point(143, 76, 0.0, 6, "#84e0da"),
				new Point(150, 90, 0.0, 7, "#84e0da"),
				new Point(145, 104, 0.0, 6, "#71dfd8"),
				new Point(136, 113, 0.0, 6, "#71dfd8"),//o
				new Point(180, 0, 0.0, 6, "#b1ebc3"),
				new Point(180, 20, 0.0, 6, "#b1ebc3"),
				new Point(180, 40, 0.0, 7, "#a7ecbc"),
				new Point(180, 60, 0.0, 7, "#a7ecbc"),
				new Point(180, 80, 0.0, 7, "#a7ecbc"),
				new Point(180, 100, 0.0, 7, "#96ecb1"),
				new Point(180, 120, 0.0, 8, "#96ecb1"),
				new Point(210, 33, 0.0, 6, "#83eaa3"),
				new Point(230, 15, 0.0, 7, "#83eaa3"),
				new Point(250, 0, 0.0, 8, "#83eaa3"),
				new Point(200, 42, 0.0, 6, "#66de8b"),
				new Point(210, 55, 0.0, 6, "#66de8b"),
				new Point(220, 70, 0.0, 6, "#4fdc7a"),
				new Point(230, 80, 0.0, 7, "#4fdc7a"),
				new Point(240, 92, 0.0, 7, "#4fdc7a"),
				new Point(250, 106, 0.0, 7, "#36dd6a"),
				new Point(260, 120, 0.0, 8, "#36dd6a"),//K
				new Point(330, 120, 0.0, 6, "#cbbc79"),
				new Point(310, 120, 0.0, 6, "#cbbc79"),
				new Point(300, 112, 0.0, 6, "#cbba6d"),
				new Point(293, 100, 0.0,6, "#cbba6d"),
				new Point(290, 90, 0.0,6, "#cbba6d"),
				new Point(295, 78, 0.0,6, "#c9b55c"),
				new Point(306, 65, 0.0,6, "#c9b55c"),
				new Point(320, 60, 0.0,5, "#c9b55c"),
				new Point(334, 65, 0.0,5, "#c8b24e"),
				new Point(343, 77, 0.0,5, "#c8b24e"),
				new Point(350, 90, 0.0,5, "#c8b24e"),
				new Point(335, 90, 0.0,5, "#c6ad3d"),
				new Point(320, 90, 0.0,4, "#c6ad3d"),
				new Point(305, 90, 0.0, 4, "#c6ad3d"),//e
				new Point(385, 60, 0.0, 7, "#eba952"),
				new Point(385, 75, 0.0, 8, "#eba952"),
				new Point(385, 90, 0.0, 8, "#eba952"),
				new Point(385, 105, 0.0, 8, "#eca444"),
				new Point(385, 120, 0.0, 9, "#eca444"),
				new Point(400, 80, 0.0, 7, "#eca444"),
				new Point(415, 70, 0.0, 8, "#e99c36"),
				new Point(430, 80, 0.0, 8, "#e99c36"),
				new Point(430, 100, 0.0, 9, "#ed9d33"),
				new Point(430, 120, 0.0, 9, "#ed9d33")//n
				];
		
		gLength = g.length;
		for (var i = 0; i < gLength; i++) {
			g[i].curPos.x = (canvasWidth/2 - 180) + g[i].curPos.x;
			g[i].curPos.y = (canvasHeight/2 - 65) + g[i].curPos.y;
			
			g[i].originalPos.x = (canvasWidth/2 - 180) + g[i].originalPos.x;
			g[i].originalPos.y = (canvasHeight/2 - 65) + g[i].originalPos.y;
		};
		
		pointCollection = new PointCollection();
		pointCollection.points = g;
		
		initEventListeners();
		timeout();
	};
	
	function initEventListeners() {
		$(window).bind('resize', updateCanvasDimensions).bind('mousemove', onMove);
		
		canvas.get(0).ontouchmove = function(e) {
			e.preventDefault();
			onTouchMove(e);
		};
		
		canvas.get(0).ontouchstart = function(e) {
			e.preventDefault();
		};
	};
	
	function updateCanvasDimensions() {
	//	canvas.attr({height: $(window).height(), width: $(window).width()});
		canvas.attr({height: 400, width: $(window).width()});
		canvasWidth = canvas.width();
		canvasHeight = canvas.height();

		draw();
	};
	
	function onMove(e) {
		if (pointCollection)
			pointCollection.mousePos.set(e.pageX, e.pageY);
	};
	
	function onTouchMove(e) {
		if (pointCollection)
			pointCollection.mousePos.set(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
	};
	
	function timeout() {
		draw();
		update();
		
		setTimeout(function() { timeout() }, 30);
	};
	
	function draw() {
		var tmpCanvas = canvas.get(0);

		if (tmpCanvas.getContext == null) {
			return; 
		};
		
		ctx = tmpCanvas.getContext('2d');
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		
		if (pointCollection)
			pointCollection.draw();
	};
	
	function update() {		
		if (pointCollection)
			pointCollection.update();
	};
	
	function Vector(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
 
		this.addX = function(x) {
			this.x += x;
		};
		
		this.addY = function(y) {
			this.y += y;
		};
		
		this.addZ = function(z) {
			this.z += z;
		};
 
		this.set = function(x, y, z) {
			this.x = x; 
			this.y = y;
			this.z = z;
		};
	};
	
	function PointCollection() {
		this.mousePos = new Vector(0, 0);
		this.points = new Array();
		
		this.newPoint = function(x, y, z) {
			var point = new Point(x, y, z);
			this.points.push(point);
			return point;
		};
		
		this.update = function() {		
			var pointsLength = this.points.length;
			
			for (var i = 0; i < pointsLength; i++) {
				var point = this.points[i];
				
				if (point == null)
					continue;
				
				var dx = this.mousePos.x - point.curPos.x;
				var dy = this.mousePos.y - point.curPos.y;
				var dd = (dx * dx) + (dy * dy);
				var d = Math.sqrt(dd);
				
				if (d < 150) {
					point.targetPos.x = (this.mousePos.x < point.curPos.x) ? point.curPos.x - dx : point.curPos.x - dx;
					point.targetPos.y = (this.mousePos.y < point.curPos.y) ? point.curPos.y - dy : point.curPos.y - dy;
				} else {
					point.targetPos.x = point.originalPos.x;
					point.targetPos.y = point.originalPos.y;
				};
				
				point.update();
			};
		};
		
		this.draw = function() {
			var pointsLength = this.points.length;
			for (var i = 0; i < pointsLength; i++) {
				var point = this.points[i];
				
				if (point == null)
					continue;

				point.draw();
			};
		};
	};
	
	function Point(x, y, z, size, colour) {
		this.colour = colour;
		this.curPos = new Vector(x, y, z);
		this.friction = 0.8;
		this.originalPos = new Vector(x, y, z);
		this.radius = size;
		this.size = size;
		this.springStrength = 0.1;
		this.targetPos = new Vector(x, y, z);
		this.velocity = new Vector(0.0, 0.0, 0.0);
		
		this.update = function() {
			var dx = this.targetPos.x - this.curPos.x;
			var ax = dx * this.springStrength;
			this.velocity.x += ax;
			this.velocity.x *= this.friction;
			this.curPos.x += this.velocity.x;
			
			var dy = this.targetPos.y - this.curPos.y;
			var ay = dy * this.springStrength;
			this.velocity.y += ay;
			this.velocity.y *= this.friction;
			this.curPos.y += this.velocity.y;
			
			var dox = this.originalPos.x - this.curPos.x;
			var doy = this.originalPos.y - this.curPos.y;
			var dd = (dox * dox) + (doy * doy);
			var d = Math.sqrt(dd);
			
			this.targetPos.z = d/100 + 1;
			var dz = this.targetPos.z - this.curPos.z;
			var az = dz * this.springStrength;
			this.velocity.z += az;
			this.velocity.z *= this.friction;
			this.curPos.z += this.velocity.z;
			
			this.radius = this.size*this.curPos.z;
			if (this.radius < 1) this.radius = 1;
		};
		
		this.draw = function() {
			ctx.fillStyle = this.colour;
			ctx.beginPath();
			ctx.arc(this.curPos.x, this.curPos.y, this.radius, 0, Math.PI*2, true);
			ctx.fill();
		};
	};
	
	init();
});