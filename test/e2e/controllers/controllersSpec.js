//
// test/e2e/controllers/controllersSpec.js
//
describe("E2E: Testing Controllers", function () {

    var pauseAll = false;
    //You can load the runner with runner.html?pauseAll=true to see each page after each test.
    pauseAll = window.location.search.replace("?pauseAll=", "");

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
        beforeEach(function () {
            browser().navigateTo('/app/index.html?scenario=default');
        });

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
            //sleep(5);

            //expect(browser().location().url()).toBe("/practice_game_play.html");

            // TODO: Need to complete

            if (pauseAll) pause();
        });
    });

    
    describe('Quest', function() {

        beforeEach(function () {
            browser().navigateTo('/app/index.html?scenario=quest');
        });
        

        it('should create a new quest', function() {
            element('.nav li a:contains("Quests")').click();
            expect(browser().location().path()).toBe("/quests");

            sleep(5); // wait for carousel to load (create outside angular framework).

            var story = element('#myCarousel input[src*="The_Spy_Who_Coded.jpg"]'),
                level = element('#levels button:contains("Easy")'),
                path = element('#pathSel input[src*="Python_game_path"]');

            story.click();
            level.click();
            path.click();

            expect(story.hasClass('selected')).toBe(true);
            expect(level.hasClass('active')).toBe(true);
            expect(path.hasClass('selected')).toBe(true);

            element('*:contains("Go")').click();
            expect(browser().location().path()).toBe("/storyboard");

            element('*:contains("Continue")').click();

            sleep(5);
            element('*:contains("Run")').click();
            expect(element('#t2 tr:eq(1) td:contains("Errors")').css('display')).toBe('table-cell');

            element('*:contains("StoryBoard")').click();
            sleep(5);
            expect(browser().location().path()).toBe("/storyboard");

            // TODO: test skip button
            // maybe using the e2e binding function (not sure how to use it)
        });

        xit('should restart an existing quest', function() {
            // TODO: I am not sure how I would be able to differenciate 
            // between a new and an existing story.
        });

    });

    describe('Edit Problem form', function() {

        beforeEach(function () {
            browser().navigateTo('/app/index.html?scenario=newProblem');
        });

        it('should select a problem', function() {
            element('#menu *:contains("Problems")').click();
            //element('button:contains("Create and Edit Problems")').click();
            expect(browser().location().path()).toBe("/editproblem");

            expect(element('form[name="editProblem"]').css('display')).toBe('none');

            select('path').option(0);
            select('problemSet').option(0);
            select('problem').option(0);

            expect(element('form[name="editProblem"]').css('display')).toBe('block');
            expect(element('#examples').val()).toBe(">>> greeting\n'hello world'");

            element('li.tabspacing a:contains("Tests")').click();
            expect(element('#tests .ace_text-layer').text()).toMatch(/>>>\sgreeting'hello\sworld'/g);
        });

        it('should run tests', function() {
            element('#menu *:contains("Problems")').click();
            //element('button:contains("Create and Edit Problems")').click();
            select('path').option(0);
            select('problemSet').option(0);
            select('problem').option(0);
            
            expect(element('button:contains("Save")').attr('disabled')).toBeTruthy();
            element('button:contains("Run")').click();
            expect(element('#t7').text()).toMatch(/Your solution passes all tests/);
            expect(element('button:contains("Save")').attr('disabled')).toBeFalsy();
        });

        it('should save a problem', function() {
            element('#menu *:contains("Problems")').click();
            //element('button:contains("Create and Edit Problems")').click();
            select('path').option(0);
            select('problemSet').option(0);
            select('problem').option(0);
            element('button:contains("Run")').click();
            alertOK();
            element('button:contains("Save")').click();
        });
    });
});
