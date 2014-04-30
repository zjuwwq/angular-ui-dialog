describe('cardNo directive', function() {
  var $compile, scope, element, className;

  beforeEach(module('zjuwwq.ui.cardNo'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
  }));

  function compile() {
    element = $compile('<input ng-model="code" ui-card-no>')(scope).append($('body'));
    element = $(element);
  }

  it('format the value before render', function() {
    compile();
    scope.code = '123456789';
    scope.$digest();
    expect(element.val()).toEqual('1234 5678 9');
  });

  afterEach(function() {
    element.remove();
    scope.$destroy();
  });
});