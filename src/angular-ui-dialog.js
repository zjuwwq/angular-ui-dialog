angular.module('zjuwwq.ui.dialog', [])
	.directive('uiDialog', function() {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				title: '@',
				close: '&onClose'
			},
			template: '<div>' +
				'<div class="mask"></div>' +
				'<div class="wrap">' +
				'<div class="ttlw"><span class="ttl">{{title}}</span><span class="close" title="关闭" ng-click="close()">×</span></div>' +
				'<div class="content" ng-transclude></div>' +
				'</div>' +
				'</div>'
		};
	});