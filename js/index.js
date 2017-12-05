
(function($) {
	$.fn.slide = function(opts) {
		this.options = $.extend({}, $.fn.slide.defaults, opts);
		this.createNode();
		this.moveImg(0);
		this.addEvent();
		this.play();
		return this;
	};


	$.fn.slide.defaults = {
		imgData:[],
		timeout: 3000,
		dir: 1,
		speed: 800
	};

	$.fn.createNode = function() {		//创建元素
		var _this = this;
		this.each(function() {
			var thisImg = _this.options.imgData;
			$(this).addClass('slide_wrap');		//添加class
			var imgUl = $('<ul></ul').addClass('slide_main');
			var dotUl = $('<ul></ul').addClass('slide_tab');
			var oLI, oLink, oImg;
			_this.wrapWidth = $(this).width();		//获取高度

			$.each(thisImg, function(index) {
				oImg = $('<img/>').attr({
						src:thisImg[index].src,
						alt:thisImg[index].alt
					}).css('width',_this.wrapWidth);

				oLink = $('<a></a>').attr({
						href:thisImg[index].href,
						title:thisImg[index].title
					});

				oLi = $('<li></li>');

				oLink.append(oImg);
				oLi.append(oLink);
				imgUl.append(oLi);

				dotUl.append($('<li></li>'));
			});

			$(this).append(imgUl).append(dotUl);

			$('.slide_main li').eq(0).clone(true).appendTo(imgUl);	//添加辅助图
			$('.slide_main li').each(function(index) {
				$(this).css({
					position: 'absolute',
					left:index * _this.wrapWidth
				});
			});
		});
		return this;
	};

	$.fn.addEvent = function() {	//绑定事件
		var _this = this;
		$('.slide_main').hover(function() {
			clearInterval(_this.timer);
		},function() {
			_this.play(); 
		})

		$('.slide_tab li').each(function(index) {
			$(this).hover(function(){
					clearInterval(_this.timer);
					_this.moveImg(index);
				},function(){
					_this.play(); 
				})
		})
		return this;
	}

	$.fn.moveImg = function(index) {
		var _this = this;
	 	var len = $('.slide_tab li').length;
	 	_this.cur = index;
		if(_this.cur > len){  
	        $('.slide_main').css('left',0);
	        _this.cur = 1;
	    } else if (_this.cur == -1){
	        $('.slide_main').css({
	        	left: -_this.wrapWidth * len
	        });
	        _this.cur = len-1;
	    }
	    $('.slide_tab li').eq(_this.cur%len).addClass('active').siblings().removeClass();
		$('.slide_main').stop().animate({
			left:-_this.cur * _this.wrapWidth
		}, _this.options.speed);
		return this;
	};

	$.fn.go = function(n) {
		clearInterval(this.timer);
		this.moveImg(this.cur + n);
		return this;
	};

	$.fn.play = function() {
		var _this = this;
		clearInterval(_this.timer);
		
		_this.timer = setInterval(function(){
			_this.moveImg(_this.options.dir > 0 ? ++_this.cur : --_this.cur);
		}, _this.options.timeout);
		return this;
	};

	$.fn.paused = function() {
		clearInterval(_this.timer);

	}
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
	
	
		$('.wrapper').slide(imgGroup);

});



/*
$(document).ready(function() {
	var firstImg = $('ul.slide_main li').eq(0);
	var imgWidth = firstImg.width();
	var timeout = 2000;
	var index = 0
	firstImg.clone(true).appendTo('.slide_main');
	var len = $('ul.slide_main li').length;
	$('.slide_main').css({
		width: len * imgWidth,
		position: 'relative'
		});
	moveImg(0);
	timer = setInterval(function() {
		moveImg(index++);
	},timeout);
	
	function moveImg() {
		if(index >= len){  
	        $('.slide_main').css('left',0);
	        index = 1;
	    } else if (index == -1){
	        $('.slide_main').css({
	        	left: -imgWidth * (len-1)
	        });
	        index = len-2;
	    }
		$('.slide_main').animate({
			left:-index *imgWidth
		}, 1000);
	}


});*/