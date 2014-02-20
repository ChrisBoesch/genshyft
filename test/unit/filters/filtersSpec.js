//
// test/unit/filters/filtersSpec.js
//
describe("Unit: Testing Filters", function() {
    var filter;

    beforeEach(angular.mock.module('myApp.filters'));

    beforeEach(inject(function($filter) {
        filter = $filter;
    }));

    it('should have a renderPermutation filter', function() {
        expect(filter('renderPermutation')).toBeTruthy();
    });

    it('should have a renderMs filter', function() {
        expect(filter('renderMs')).toBeTruthy();
    });

    describe('renderPermutation', function() {
        var renderPermutation, lines;

        beforeEach(function() {
            renderPermutation = filter('renderPermutation');
            lines = ['a', 'b', 'c', 'd'];
        });

        it('should render permutation code', function() {
            expect(renderPermutation(lines, '1')).toBe('a');
            expect(renderPermutation(lines, '14')).toBe('a\nd');
            expect(renderPermutation(lines, '32')).toBe('c\nb');
        });
    });

    describe('renderMs', function() {
        var renderMs;

        beforeEach(function() {
            renderMs = filter('renderMs');
        });

        it('should render small time values in ms', function() {
            expect(renderMs(999)).toBe('999ms');
        });

        it('should render time values greater than 1s in s', function() {
            expect(renderMs(1550)).toBe('1.55s');
        });

        it('should round values', function() {
            expect(renderMs(1000/3)).toBe('333ms');
            expect(renderMs(10000/3)).toBe('3.33s');
        });
    });

});
