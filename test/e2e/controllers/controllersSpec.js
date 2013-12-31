//
// test/e2e/controllers/controllersSpec.js
//
describe("E2E: Testing Controllers", function () {

    beforeEach(function () {
        browser().navigateTo('/app/index.html?test_with=app-test.js');
    });

    /*
     Load /app/index.html?test_with=app-test.js
     Click on “practice” menu item
     Click on “Python”
     Click on “Easy”
     Click on “Continue Level 1”
     Check that location is now practice_game_play.html
     Check that problem is loaded.
     On the page you should find: “Name: Functions” in the top box and “This is the first problem” in the examples box.
     */
    describe('Practice Game Play', function () {
        it('should go to the practice game play page when I click Practice button', function () {
            expect(browser().location().path()).toBe("/home");
            element('.nav li a:contains("Practice")').click();
            expect(browser().location().url()).toBe("/practice");
        });

        it('should should be able to create a new practice game for python with easy difficulty', function () {
            var pyBtnSel = '#myCarousel .row input.pathImg[src*="Python"]';

            browser().navigateTo('#practice');
            expect(browser().location().url()).toBe("/practice");

            expect(element(pyBtnSel).hasClass('selected')).toBeFalsy();
            element(pyBtnSel).click();
            expect(element(pyBtnSel).hasClass('selected')).toBeTruthy();
        });
    });

    /*
     it('should have a working video page controller that applies the video to the scope', function() {
     browser().navigateTo('#/videos/WuiHuZq_cg4');
     expect(browser().location().path()).toBe("/videos/WuiHuZq_cg4");
     expect(element('#ng-view').html()).toContain('app-youtube-embed');
     });
     */
});
