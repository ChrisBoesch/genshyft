//
// test/e2e/controllers/controllersSpec.js
//
describe("E2E: Testing Controllers", function () {

    var pauseAll = false;
    //You can load the runner with runner.html?pauseAll=true to see each page after each test.
    pauseAll = window.location.search.replace("?pauseAll=", "");

    beforeEach(function () {
        browser().navigateTo('/app/index.html?test_with=app-test.js');
    });

    /*
     1. Practice Game
     Load /app/index.html?test_with=app-test.js
     Click on “practice” menu item
     Click on “Easy”
     Click on “Python”
     Click on “Continue Level 1”
     Check that location is now practice_game_play.html
     Check that problem is loaded.
     On the page you should find: “Name: Functions” in the top box and “This is the first problem” in the examples box.
     */
    describe('Practice Game', function () {
        it('should be able to create a new practice game for python with easy difficulty', function () {

            expect(browser().location().path()).toBe("/home");
            element('.nav li a:contains("Practice")').click();
            expect(browser().location().path()).toBe("/practice");

            var btnLvlEasy = element('#levels button[btn-radio="Easy"]');
            expect(btnLvlEasy.hasClass('active')).toBeFalsy();
            btnLvlEasy.click();
            expect(btnLvlEasy.hasClass('active')).toBeTruthy();

            var pyBtnSel = element('#myCarousel .row input.pathImg[src*="Python"]');
            expect(pyBtnSel.hasClass('selected')).toBeFalsy();
            pyBtnSel.click();
            expect(pyBtnSel.hasClass('selected')).toBeTruthy();

            element('.btn-lvl').click();

            // Couldn't come up with something better, because of some non-standard code
            sleep(3);

            expect(browser().location().url()).toBe("/practice_game_play.html");

            // TODO: Need to complete

            if (pauseAll) pause();
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
