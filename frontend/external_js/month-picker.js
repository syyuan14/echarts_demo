/**
 * 作者：小圣贤君
 * 时间：2017-11-8
 * 功能：点击输入框，弹出月份选择框，可以自由的选择年月
 * */
(function($) {
	var MonthPicker = function(dom, options) {
		this.$dom = dom,
			this.defaults = {
				currentYear: '',
			},
			this.opts = $.extend({}, this.defaults, options)
	}
	/**
	 * 添加渲染页面和数据的方法
	 * */
	MonthPicker.prototype = {
		renderMonthPicker: function() {
			var self = this;
			this.$dom.focus(function(event) {
				self.opts.currentYear = new Date().getFullYear();
				$('body').find('.mp-month-picker-box').empty().remove();
				$('body').append('<div class="mp-month-picker-box" style="left:' + $(this).position().left + 'px;top:' + ($(this).position().top + 16) + 'vh;">' +
					'<i></i>' +
					'<div class="mp-year-picker">' +
					'<div class="mp-prev-year"><i></i><i></i></div>' +
					'<span>' + self.opts.currentYear + '</span>' +
					'<div class="mp-next-year"><i></i><i></i></div>' +
					'</div>' +
					'<ul class="mp-month-picker">' +
					'<li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li>' +
					'</ul>' +
					'</div>');
			})
		},
		handleClick: function() {
			var self = this;
			
			this.$dom.blur(function() {
				var innerSelf = this;
				$('div.mp-prev-year').click(function() {
					$(this).next().html(--self.opts.currentYear);
				})
				$('div.mp-next-year').click(function() {
					$(this).prev().html(++self.opts.currentYear);
				})
				$('ul.mp-month-picker li').click(function(event) {
					var value = self.opts.currentYear + '-' + $(this).html();
					curr_year_start = value.split("-")[0] + "-01至"
					res = curr_year_start + value
					$(innerSelf).val(res);
					$(this).parent().parent().empty().remove();
				})
			})
		},
		constructor: MonthPicker
	};
	$.fn.MonthPicker = function(options) {
		var monthPicker = new MonthPicker(this, options);
		monthPicker.renderMonthPicker();
		monthPicker.handleClick();

		return this.each(function() {});
	}
})(jQuery)