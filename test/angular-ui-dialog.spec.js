describe('dialog directive', function() {
  var $compile, scope, element, className;

  beforeEach(module('zjuwwq.ui.dialog'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
  }));

  function compile() {
    element = $compile('<ui-dialog title="{{title}}" on-close="hideDialog()">I am a dialog</ui-dialog>')(scope).append($('body'));
    element = $(element);
  }

  it('should retreive title from the attribute', function() {
    compile();
    scope.title = 'login';
    scope.$digest();
    expect(element.find('.ttl').html()).toEqual(scope.title);
  });

  it('shoule call on-close when click close', function() {
    compile();
    scope.hideDialog = function(){};
    scope.$digest();
    spyOn(scope, 'hideDialog');
    element.find('.close').click();
    expect(scope.hideDialog).toHaveBeenCalled();
  });

  afterEach(function() {
    element.remove();
    scope.$destroy();
  });
});