//
// test/unit/directives/directivesSpec.js
//
describe("Unit: Testing Directives", function() {
    var scope, compile;

    beforeEach(angular.mock.module('myApp.directives'));

    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope.$new();
        compile = $compile;
    }));

    describe('genInitTab', function() {

        it('should set a tab a active', function() {
            var element = compile('<ul gen-init-tab="true"><li class="tabspacing"></li><li class="tabspacing"></li></ul>')(scope);

            expect(element.find('li:eq(0)').hasClass('active')).toBe(true);
        });

        it('should not set a tab a active if one is already active', function() {
            var element = compile('<ul gen-init-tab="true"><li class="tabspacing"></li><li class="tabspacing active"></li></ul>')(scope);

            expect(element.find('li:eq(0)').hasClass('active')).toBe(false);
        });
    });
});
