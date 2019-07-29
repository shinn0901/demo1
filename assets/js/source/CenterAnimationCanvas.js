/*
 * 搜索页面中部的canvas动画效果
 */


;(function($) {
	var CenterAnimationCanvas = function(){
		var $canvasContainer = $('.smart-search .center-animation'),
			_width = Math.max($canvasContainer.width(), 600),
			_height = Math.max($canvasContainer.height(), 600);

		var _canvas = document.createElement('canvas');
		_canvas.width = _width;
		_canvas.height = _height;

		var _context = _canvas.getContext('2d');

		_context.clearRect(0, 0, _width, _height);

		var center = {
			x: _width / 2,
			y: _height / 2
		};

		//元素表
		var elements = [];

		var radius = 300, //核心圆半径
			fillRadius = 180; //渲染区域半径

		var colors = [
			'#1f5bc8', //蓝色
			'#1f5bc8', //蓝色
			'#1f5bc8', //蓝色
			'#1f5bc8', //蓝色
			'#1f5bc8', //蓝色
			'#1f5bc8', //蓝色
			'#1f5bc8', //蓝色
			'#1f5bc8', //蓝色
			'#1f5bc8', //蓝色
			'#1f5bc8', //蓝色
			'#edd404', //黄色
			'#ff5400' //红色
		]

		for(var i = 0; i < 200; i++) {
			var random = getPosition();
			var x = random;
			var y = random;
			var r = Math.random() * 5 + 3;
			var color = colors[Math.floor(Math.random() * colors.length)];
			var num = Math.floor(Math.random() * 360)
			var step = Math.floor(Math.random() * 3 + 1);
			var startX = x;
			var startY = y;

			elements.push({
				x: x,
				y: y,
				r: r,
				color: color,
				num: num,
				step: step,
				startX: startX,
				startY: startY,
				anticlockwis: Math.round(Math.random())
			})
		}

		function getPosition() {
			var c = Math.pow(radius, 2); //计算方形的对角线长度
			var a = Math.round(Math.sqrt(c / 2)); //利用勾股定理计算斜边
			var num;
			do {
				num = Math.round(Math.random() * _height);
				//}while(num <= a || num >= a + fillRadius)  不在圆心内部出现  只在周围环绕  
			} while (num >= a + fillRadius || num <= a / 2)
			return num;
		}

		function init() {
			//地基
			_context.strokeStyle = '#FFFFFF';
			_context.beginPath();
			_context.arc(center['x'], center['y'], radius, 0, Math.PI * 2, false);
			_context.stroke();
			_context.fill()
			_context.closePath();
		}
		
		setInterval(function() {
			scroll();
		}, 140);

		function scroll() {
			_context.clearRect(0, 0, _width, _height);

			for(var i = 0; i < elements.length; i++) {
				var _item = elements[i];
				_context.save();
				_context.translate(center['x'], center['y']);
				_context.rotate(_item['num'] * _item['step'] * Math.PI / 180);
				_context.fillStyle = _item['color'];
				_context.beginPath();
				_context.arc(_item['x'], _item['y'], _item['r'], 0, 2 * Math.PI, false);
				_context.fill();
				_context.closePath();
				_context.restore();

				if(_item.anticlockwis) {
					if(_item['num']-- <= 1) {
						_item['num'] = 360;
					}
				} else {
					if(_item['num']++ >= 360) {
						_item['num'] = 1;
					}
				}
			}

			//init();
		}

		$canvasContainer.find('canvas').remove();
		$canvasContainer.append(_canvas)
	}	
	
	CenterAnimationCanvas()
	window.addEventListener('resize',function(){
		CenterAnimationCanvas();
	},false)
})(jQuery)