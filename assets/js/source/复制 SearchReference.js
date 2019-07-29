;(function($) {

	var SearchReference = function(obj, options) {
		var _this = this;
		var option = {},
			$obj = $(obj);
		$.extend(option, options);

		//绑定对象：
		_this.$obj = $obj;

		_this.init($obj);
	};

	SearchReference.prototype = {
		appearData: function(data) {

			var _this = this,
				$list = _this['$list'].find('ul');
			_this['$list'].hide();
			$list.find('*').remove();

			for(var i = 0; i < data.length; i++) {
				var _item = data[i],
					_li = $('<li id="' + _item['id'] + '"></li>');
				_li.append('<b>' + _item['name'] + '</b>' + '<i>' + _item['accessId'] + '</i>');
				$list.append(_li);

				_li.on('click', function() { //绑定选择事件
					_this['$list'].hide();
					_this.bindSelect($(this));
				})
			}
			if(data.length > 0) {
				_this['$list'].show();
			}
		},
		init: function() {
			var _this = this,
				$obj = _this.$obj;
			/*
			 * 创建listdom
			 */
			var $list = $('<div class="search-reference-list"><ul></ul></div>');
			$list.insertAfter($obj);
			$list.hide();

			_this.positionGet($list);
			_this['$list'] = $list;
			_this.bindInput();
		},
		bindInput: function() {
			var _this = this;
			$obj = _this.$obj,
				$list = _this.$list;

			$obj.on('input', function(e) {
				var _val = $(this).val(); //获取输入值

				var matchingData = [];

				if(_val == '') {
					_this.appearData(matchingData);
					return;
				}

				$.ajax({
					type: "get",
					//url: "znssAction.do?doQuery&tj",
					url: "assets/js/MatchingData.json",
					dataType: "json",
					async: false,
					success: function(data) {
						var JSONDATA = data['data'];
						for(var i = 0; i < JSONDATA.length; i++) {
							var _item = JSONDATA[i],
								name = _item['name'],
								id = _item['id'],
								accessId = _item['accessId'];

							if(name.indexOf(_val) >= 0 || id.indexOf(_val) == 0 || accessId.indexOf(_val) == 0) {
								matchingData.push(_item);
							}
							if(matchingData.length >= 6) break;
						}
						_this.appearData(matchingData);
					},
					error: function(a, b) {
						var mes = dialog({ //显示气泡提示
							title: b.toUpperCase(),
							content: '数据错误[MatchingData]，请联系管理员！',
						});
						mes.show();
						setTimeout(function() {
							mes.close().remove();
						}, 2500)
					}

				});
			});
			$obj.on('keydown', function(e) {
				var code = e.keyCode;
				if(code == 38 || code == 13 || code == 40) {
					e.preventDefault();
				}

				switch(code) {
					case 38:
						var $hover = $list.find('li.hover');
						if($hover.length == 0) {
							$list.find('li:last-child').addClass('hover');
							break;
						}
						var $prev = $list.find('li.hover').prev();
						if($prev.length > 0) {
							$hover.removeClass('hover');
							$prev.addClass('hover');
						}
						break;
					case 40:
						var $hover = $list.find('li.hover');
						if($hover.length == 0) {
							$list.find('li').eq(0).addClass('hover');
							break;
						}
						var $next = $hover.next();
						if($next.length > 0) {
							$hover.removeClass('hover');
							$next.addClass('hover');
						}
						break;
					case 13:
						var $hover = $list.find('li.hover');
						if($hover.length > 0) {
							$hover.trigger('click');
						}
						break;
				}
			})
		},
		positionGet: function($list) {
			var _this = this,
				$list = $list,
				$obj = _this.$obj;

			var x = $obj.offset().left,
				y = $obj.offset().top;
			px = $obj.parent().offset().left,
				py = $obj.parent().offset().top;

			$list.parent().css('position', 'relative');
			$list.css({
				'position': 'absolute',
				'left': (x - px) + 'px',
				'top': (y - py + $obj.outerHeight(false)) + 'px',
				'padding-top': '5px',
				'padding-left': $obj.css('padding-left'),
				'padding-right': $obj.css('padding-right'),
				'padding-bottom': '10px',
				'width': $obj.width() + 'px'
			})

		},
		bindSelect: function(_t) {
			var _this = this,
				$obj = _this.$obj;

			$obj.val(_t.find('b').text() + '　　' + _t.find('i').text());

			var id = _t.attr('id');

			//ajax请求获取对应人员信息
			$.ajax({
				type: "get",
				//url: "znssAction.do?doQueryXx&id=" + id,
				url: "assets/js/PersonData.json",
				dataType: "json",
				async: false,
				success: function(data) {
					var target = $('.person-info');
					var _tra = target.find('.transform-box');
					var personData = data;
					_tra.css({
						'-webkit-transform': 'rotateY(-14deg)',
						'-moz-transform': 'rotateY(-14deg)',
						'-ms-transform': 'rotateY(-14deg)',
						'-o-transform': 'rotateY(-14deg)',
						'transform': 'rotateY(-14deg)',
						'-webkit-transition-duration': '100ms',
						'-moz-transition-duration': '100ms',
						'-ms-transition-duration': '100ms',
						'-o-transition-duration': '100ms',
						'transition-duration': '100ms',
					})
//					_tra.on('transitionend',function(){
//						
//					})
					setTimeout(function() {
						_tra.find('img').attr('src', personData['peoplePhoto']);
						_tra.find('.pic h2 b').text(personData['peopleName']);
						_tra.find('.list-info ul li').remove();

						var keyName = [{
								key: 'accessCode',
								name: '门禁ID'
							},
							{
								key: 'houseCode',
								name: '所在房屋编号'
							},
							{
								key: 'peopleBirthday',
								name: '出生日期'
							},
							{
								key: 'peopleDegree',
								name: '文化程度'
							},
							{
								key: 'peopleIdCard',
								name: '身份证号'
							},
							{
								key: 'peopleIdentity',
								name: '政治面貌'
							},
							{
								key: 'peoplePhone',
								name: '电话号码'
							},
							{
								key: 'peopleSex',
								name: '性别'
							},
							{
								key: 'peopleWork',
								name: '工作单位'
							},
							{
								key: 'liveType',
								name: '人员类型'
							}
						];

						for(var i = 0; i < keyName.length; i++) {
							var _item = keyName[i];
							var li = $('<li></li>');
							$('<b></b>').text(_item['name'] + '：').appendTo(li);
							$('<p></p>').text(personData[_item['key']]).appendTo(li);
							_tra.find('.list-info ul').append(li);
						}

						_tra.css({
							'-webkit-transform': 'translateX(100%)',
							'-moz-transform': 'translateX(100%)',
							'-ms-transform': 'translateX(100%)',
							'-o-transform': 'translateX(100%)',
							'transform': 'translateX(100%)',
							'-webkit-transition-duration': '300ms',
							'-moz-transition-duration': '300ms',
							'-ms-transition-duration': '300ms',
							'-o-transition-duration': '300ms',
							'transition-duration': '300ms'
						})
					}, 100)
				},
				error: function(a, b) {
					var mes = dialog({ //显示气泡提示
						title: b.toUpperCase(),
						content: '数据错误[PersonData]，请联系管理员！',
					});
					mes.show();
					setTimeout(function() {
						mes.close().remove();
					}, 2500)
				}

			});

		}
	}

	if(window.SearchReference) console.error('有重名的SearchReference对象!');
	else window.SearchReference = SearchReference;
})(jQuery);