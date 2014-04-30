angular.module('zjuwwq.ui.cardNo', [])
	.directive('uiCardNo', function() {
		/**
		 * 获取当前光标在元素中的位置
		 * @param  {HTMLElement} element 	元素
		 * @return {Number}         		位置
		 */
		function getCursorPosition(element) {
			element = angular.element(element)[0];
			if(!element) return;
			var cursorPosition;
			if (element.selectionStart) {
				cursorPosition = element.selectionStart;
			} else if (document.selection) {
				element.focus();
				var r = document.selection.createRange();
				if (r != null) {
					var re = element.createTextRange(),
						rc = re.duplicate();
					re.moveToBookmark(r.getBookmark());
					rc.setEndPoint('EndToStart', re);
					cursorPosition = rc.text.length;
				}
			}
			return cursorPosition;
		};
		/**
		 * 设置光标在元素中的位置
		 * @param {HTMLELement} element        元素
		 * @param {Number} 		cursorPosition 位置
		 */
		function setCursorPosition(element, cursorPosition) {
			element = angular.element(element)[0];
			if(!element) return;
			if (element.setSelectionRange) {
				element.focus();
				element.setSelectionRange(cursorPosition, cursorPosition);
			} else if (element.createTextRange) {
				var range = element.createTextRange();
				range.collapse(true);
				range.moveEnd('character', cursorPosition);
				range.moveStart('character', cursorPosition);
				range.select();
			}
		};
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function(scope, element, attrs, ngModel) {
				function format(value) {
					if (!value) return value;
					return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').replace(/\s$/, '');
				};
				element.on('input', function() {
					var value = element.val(),
						formattedValue = format(value),
						cursorPosition, cusorCharacterPosition;
					if (value !== formattedValue) {
						cursorPosition = getCursorPosition(element);
						cusorCharacterPosition = value.substring(0, cursorPosition).replace(/\s/g, '').length;
						element.val(formattedValue);
						cursorPosition = cusorCharacterPosition + Math.ceil(cusorCharacterPosition / 4) - 1;
						setCursorPosition(element, cursorPosition);
					}
				});
				// using with ng-model
				if(ngModel){
					ngModel.$formatters.push(format);
					ngModel.$parsers.unshift(function(value){
						return value.replace(/\s/g, '');
					});
				}
			}
		};
	});