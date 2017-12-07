
;(function($) {
	$.fn.carousel = function(opts) {
		var carouselArr = [];
		this.each(function() {
			carouselArr.push(new Carousel($(this), opts));
		});
		return carouselArr;
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
		speed: 800			//过渡动画的时长
	},

	init: function() {		//初始化
		this.createNode();
		this.addEvent();
		this.showCurrentImg(0);	//初始状态跳转至第一张
		this.autoPlay();
	},

	createNode: function() {
		var _this = this;
		var thisImgData = this.options.imgData;		//获取图片细心
		this.oImgUl = $('<ul></ul').addClass('slide_main');	//图片存放的ul
		this.dotUl = $('<ul></ul').addClass('slide_tab');	//指示器
		this.wrapWidth = this.$wrap.width();		//获取容器宽度
		var oLi, oLink, oImg;
		this.$wrap.addClass('slide_wrap');			//容器添加class

		$.each(thisImgData, function(index) {
			oImg = $('<img/>').attr({				//创建img
						src:thisImgData[index].src,
						alt:thisImgData[index].alt
					}).css('width', _this.wrapWidth);

			oLink = $('<a></a>').attr({				//创建a
					href:thisImgData[index].href,
					title:thisImgData[index].title
					});

			oLi = $('<li></li>');					//创建指示器

			oLink.append(oImg);						//添加DOM元素
			oLi.append(oLink);
			_this.oImgUl.append(oLi);
			_this.dotUl.append($('<li></li>'));
		});

		this.$wrap.append(this.oImgUl).append(this.dotUl);	//添加页面
		this.oImgUl.find('li').eq(0).clone(true).appendTo(this.oImgUl); //添加辅助图片
		this.oImgUl.find('li').each(function(index) {
			$(this).css({					//定位图片
				position: 'absolute',
				left: index * _this.wrapWidth
				});
		});
	},

	addEvent: function() {		//绑定事件
		var _this = this;	
		this.oImgUl.hover(function() {		//鼠标悬浮图片上暂停轮播器
				_this.paused();
			}, function() {
				_this.autoPlay();
			});
		this.dotUl.children().each(function(index) {	//指示器事件
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

 		if (this.cur > len) {		//当图片到最后一张的时候，将oImgUl的left值设为0重新开始
 			this.oImgUl.css('left', 0);
 			this.cur = 1;
 		} else if (this.cur == -1) {	//当图片到第一张的时候，将oImgUl的left值设为最后一张重新开始
 			this.oImgUl.css('left',-this.wrapWidth * len);
 			this.cur = len - 1;
 		}
	 	this.dotUl.find('li').eq(this.cur % len).addClass('active')	//当前图片指示器显示
	 		.siblings().removeClass('active');

	 	this.oImgUl.stop().animate({	//切换图片动画
	 		left: -_this.wrapWidth * _this.cur
	 	}, _this.options.speed);
	},

	autoPlay: function() {		//自动播放函数
		var _this = this;
		clearInterval(this.timer);
		this.timer = setInterval(function() {
			_this.showCurrentImg(_this.cur + 1);
		}, _this.options.timeout);
	},

	paused: function() {	//暂停函数
		clearInterval(this.timer);
	},

	go: function(n) {		//切换函数
		this.paused;
		this.showCurrentImg(this.cur + n);
		this.autoPlay();
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
	
	
		var slider = $('.wrapper').carousel(imgGroup);
		console.log(slider);
	$('.next').click(function() {
		slider[2].go(1)
		
	})
	$('.prev').click(function() {
		slider[2].go(-1);
	})
});





