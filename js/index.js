
;(function($) {
	$.fn.carousel = function(opts) {
		var carouselArr = [];
		return this.each(function() {
			carouselArr.push(new Carousel($(this), opts));
		});
		// return carouselArr;
		// return new Carousel($(this), opts)
	};



function Carousel(ele, opts) {		//参数类型：selector-目标元素选择器，opt-包含一个图片信息数组的对象
	this.$wrap = ele;
	this.options = $.extend({}, this.defaults, opts);  //复制对象
	this.init();	
}

Carousel.prototype = {
	defaults: {			//默认参数
		imgData: [],
		timeout: 3000,		//轮播器切换的间隔时间
		direction: true,	//轮播器的运动方向 true-正方向，false-反方向
		speed: 800			//过渡动画的系数
	},

	init: function() {		//初始化
		this.createNode();
		this.addEvent();
		this.showCurrentImg(0);	//初始状态跳转至第一张
		this.autoPlay();
	},

	createNode: function() {
		var _this = this;
		var thisImgData = this.options.imgData;
		this.oImgUl = $('<ul></ul').addClass('slide_main');
		this.dotUl = $('<ul></ul').addClass('slide_tab');
		this.wrapWidth = this.$wrap.width();
		var oLi, oLink, oImg;
		this.$wrap.addClass('slide_wrap');

		$.each(thisImgData, function(index) {
			oImg = $('<img/>').attr({
						src:thisImgData[index].src,
						alt:thisImgData[index].alt
					}).css('width', _this.wrapWidth);

			oLink = $('<a></a>').attr({
					href:thisImgData[index].href,
					title:thisImgData[index].title
					});

			oLi = $('<li></li>');

			oLink.append(oImg);
			oLi.append(oLink);
			_this.oImgUl.append(oLi);
			_this.dotUl.append($('<li></li>'));
		});

		this.$wrap.append(this.oImgUl).append(this.dotUl);
		this.oImgUl.find('li').eq(0).clone(true).appendTo(this.oImgUl);
		this.oImgUl.find('li').each(function(index) {
			$(this).css({
				position: 'absolute',
				left: index * _this.wrapWidth
				});
		});
	},

	addEvent: function() {
		var _this = this;
		this.oImgUl.hover(function() {
				_this.paused();
			}, function() {
				_this.autoPlay();
			});
		this.dotUl.children().each(function(index) {
			$(this).hover(function() {
				_this.paused();
				_this.showCurrentImg(index);
			}, function() {
				_this.autoPlay();
			});
		});
	},

	showCurrentImg: function(index) {
		var _this = this;
	 	var len = this.dotUl.children().length;

	 	this.cur = index;
	
 		if (this.cur > len) {
 			this.oImgUl.css('left', 0);
 			this.cur = 1;
 		} else if (this.cur == -1) {
 			this.oImgUl.css('left',-this.wrapWidth * len);
 			this.cur = len - 1;
 		}
	 	this.dotUl.find('li').eq(this.cur % len).addClass('active')
	 		.siblings().removeClass('active');
	 	this.oImgUl.stop().animate({
	 		left: -_this.wrapWidth * _this.cur
	 	}, _this.options.speed);
	},

	autoPlay: function() {
		var _this = this;
		clearInterval(this.timer);
		this.timer = setInterval(function() {
			_this.showCurrentImg(_this.cur + 1);
		}, _this.options.timeout);
	},

	paused: function() {
		clearInterval(this.timer);
	},

	go: function(n) {
		this.showCurrentImg(this.cur + n);
	}
};

})(jQuery);



$(document).ready(function() {
	var imgGroup = {
	imgData: [
		{title: '百度', alt:'百度', href: 'http://www.baidu.com', src: 'image/1.jpg'},
		{title: '淘宝', alt:'淘宝', href: 'http://www.taobao.com', src: 'image/2.jpg'},
		{title: '京东', alt:'京东', href: 'http://www.jd.com', src: 'image/3.jpg'},
		{title: '慕客', alt:'慕客', href: 'http://www.imooc.com', src: 'image/4.jpg'},
		{title: '搜狗', alt:'搜狗', href: 'http://www.sougou.com', src: 'image/5.jpg'},
		{title: '央视', alt:'央视', href: 'http://www.cctv.com', src: 'image/6.jpg'}
	],
	timeout: 2000,
};
	
	
		var a = $('.wrapper.aaa').carousel(imgGroup);
	
});



