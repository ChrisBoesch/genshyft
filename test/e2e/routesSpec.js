//
// test/e2e/routesSpec.js
//
describe("E2E: Testing Routes", function () {
    var pauseAll = false;
    //You can load the runner with runner.html?pauseAll=true to see each page after each test.
    pauseAll = window.location.search.replace("?pauseAll=", "");

    //You can reload a page before every test if desired.
    //This can slow testing down but make test much more consistent.
    beforeEach(function () {
        browser().navigateTo('/app/index.html?scenario=default');
    });

    it('should render normalPlayPage when user navigates to #normalPlayPage', function () {

        browser().navigateTo('#normal-play-page');

        expect(browser().location().url()).toBe("/normal-play-page");
        //You can select all the text from all h5 or any other html element
        //expect(element('#myCarousel .ng-scope:nth-child(1) .ng-binding').text()).
        //  toMatch("The Spy Who Coded");//"The Spy Who Coded"
        if (pauseAll) pause();
    });

    it('should render practice-game-play when user navigates to #practice-game-play', function () {

        browser().navigateTo('#practice-game-play');

        expect(browser().location().url()).toBe("/practice-game-play");
        //You can select all the text from all h5 or any other html element
        //expect(element('#myCarousel .ng-scope:nth-child(1) .ng-binding').text()).
        //  toMatch("The Spy Who Coded");//"The Spy Who Coded"
        if (pauseAll) pause();
    });

    it('should render challengeEdit when user navigates to #challengeEdit', function () {

        browser().navigateTo('#challengeEdit');

        expect(browser().location().url()).toBe("/challengeEdit");
        //You can select all the text from all h5 or any other html element
        //expect(element('#myCarousel .ng-scope:nth-child(1) .ng-binding').text()).
        //  toMatch("The Spy Who Coded");//"The Spy Who Coded"
        if (pauseAll) pause();
    });

    it('should render roundranking when user navigates to #roundranking', function () {

        browser().navigateTo('#roundranking');

        expect(browser().location().url()).toBe("/roundranking");
        //You can select all the text from all h5 or any other html element
        //expect(element('#myCarousel .ng-scope:nth-child(1) .ng-binding').text()).
        //  toMatch("The Spy Who Coded");//"The Spy Who Coded"
        if (pauseAll) pause();
    });

    it('should render events when user navigates to #events', function () {

        browser().navigateTo('#events');

        expect(browser().location().url()).toBe("/events");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render eventsTable when user navigates to #eventsTable', function () {

        browser().navigateTo('#eventsTable');

        expect(browser().location().url()).toBe("/eventsTable");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render eventsManage when user navigates to #eventsManage', function () {

        browser().navigateTo('#eventsManage');

        expect(browser().location().url()).toBe("/eventsManage");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render eventsCreate when user navigates to #eventsCreate', function () {

        browser().navigateTo('#eventsCreate');

        expect(browser().location().url()).toBe("/eventsCreate");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render eventsEdit when user navigates to #eventsEdit', function () {

        browser().navigateTo('#eventsEdit');

        expect(browser().location().url()).toBe("/eventsEdit");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render editproblem when user navigates to #editproblem', function () {

        browser().navigateTo('#editproblem');

        expect(browser().location().url()).toBe("/editproblem");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render schoolregistrationstats when user navigates to #schoolregistrationstats', function () {

        browser().navigateTo('#schoolregistrationstats');

        expect(browser().location().url()).toBe("/schoolregistrationstats");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render mytournaments when user navigates to #mytournaments', function () {

        browser().navigateTo('#mytournaments');

        expect(browser().location().url()).toBe("/mytournaments");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render mytournaments-create when user navigates to #mytournaments-create', function () {

        browser().navigateTo('#mytournaments-create');

        expect(browser().location().url()).toBe("/mytournaments-create");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render mytournaments-create-addrounds when user navigates to #mytournaments-create-addrounds', function () {

        browser().navigateTo('#mytournaments-create-addrounds');

        expect(browser().location().url()).toBe("/mytournaments-create-addrounds");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render mytournaments-manage when user navigates to #mytournaments-manage', function () {

        browser().navigateTo('#mytournaments-manage');

        expect(browser().location().url()).toBe("/tournaments");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render mytournaments-rankings when user navigates to #mytournaments-rankings', function () {

        browser().navigateTo('#mytournaments-rankings');

        expect(browser().location().url()).toBe("/tournaments");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render tournament-grpjoin when user navigates to #tournament-grpjoin', function () {

        browser().navigateTo('#tournament-grpjoin');

        expect(browser().location().url()).toBe("/tournaments");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render tournament-grpplay when user navigates to #tournament-grpplay', function () {

        browser().navigateTo('#tournament-grpplay');

        expect(browser().location().url()).toBe("/tournament-grpplay");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render tournament-ranking when user navigates to #tournament-ranking', function () {

        browser().navigateTo('#tournament-ranking');

        expect(browser().location().url()).toBe("/tournament-ranking");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render tournament-ranking-static when user navigates to #tournament-ranking-static', function () {

        browser().navigateTo('#tournament-ranking-static');

        expect(browser().location().url()).toBe("/tournament-ranking-static");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render ezwebdev when user navigates to #ezwebdev', function () {

        browser().navigateTo('#ezwebdev');

        expect(browser().location().url()).toBe("/ezwebdev");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });
/**
    it('should render ezwebdevt when user navigates to #ezwebdevt', function () {

        browser().navigateTo('#ezwebdevt');

        expect(browser().location().url()).toBe("/ezwebdevt");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render purposedriven when user navigates to #purposedriven', function () {

        browser().navigateTo('#purposedriven');

        expect(browser().location().url()).toBe("/purposedriven");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });
**/

    it('should render purposedriven-play when user navigates to #purposedriven-play', function () {

        browser().navigateTo('#purposedriven-play');

        expect(browser().location().url()).toBe("/purposedriven-play");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render purposedriven-admin when user navigates to #purposedriven-admin', function () {

        browser().navigateTo('#purposedriven-admin');

        expect(browser().location().url()).toBe("/purposedriven-admin");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render ymbcoaching when user navigates to #ymbcoaching', function () {

        browser().navigateTo('#ymbcoaching');

        expect(browser().location().url()).toBe("/ymbcoaching");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });
/**
    it('should render ymbcoaching-play when user navigates to #ymbcoaching-play', function () {

        browser().navigateTo('#ymbcoaching-play');

        expect(browser().location().url()).toBe("/ymbcoaching-play");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });
**/

    it('should render ymbcoaching-cache when user navigates to #ymbcoaching-cache', function () {

        browser().navigateTo('#ymbcoaching-cache');

        expect(browser().location().url()).toBe("/ymbcoaching-cache");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render batpage when user navigates to #batpage', function () {

        browser().navigateTo('#batpage');

        expect(browser().location().url()).toBe("/batpage");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render home2 when user navigates to #home2', function () {

        browser().navigateTo('#home2');

        expect(browser().location().url()).toBe("/home2");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    

    /**

    it('should render home when user navigates to #badtag', function () {

        browser().navigateTo('#badtag');

        expect(browser().location().url()).toBe("/home");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });


    it('should render home when user navigates to #home', function () {

        browser().navigateTo('#home');

        expect(browser().location().url()).toBe("/home");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render create when user navigates to #quest', function () {

        browser().navigateTo('#quests');

        //expect(browser().location().url()).toBe("/quests");
        //You can select all the text from all h5 or any other html element
        //expect(element('#myCarousel .ng-scope:nth-child(1) .ng-binding').text()).
        //  toMatch("The Spy Who Coded");//"The Spy Who Coded"
        if (pauseAll) pause();
    });

    it('should render practice when user navigates to #practice', function () {

        browser().navigateTo('#practice');

        expect(browser().location().url()).toBe("/practice");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render challenges when user navigates to #challenges', function () {

        browser().navigateTo('#challenges');

        expect(browser().location().url()).toBe("/challenges");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render profile when user navigates to #profile', function () {

        browser().navigateTo('#profile');

        expect(browser().location().url()).toBe("/profile");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render teach when user navigates to #teach', function () {

        browser().navigateTo('#teach');

        expect(browser().location().url()).toBe("/teach");
        //You can select all the text from all h5 or any other html element
        //expect(element('h2').text()).
        //  toMatch("This is a heading");
        if (pauseAll) pause();
    });


    it('should render storyboard when user navigates to #storyboard', function () {

        browser().navigateTo('#storyboard');

        expect(browser().location().url()).toBe("/storyboard");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });


    it('should render story when user navigates to #story', function () {

        browser().navigateTo('#story');

        expect(browser().location().url()).toBe("/story");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render challengestatistics when user navigates to #challengestatistics', function () {

        browser().navigateTo('#challengestatistics');

        expect(browser().location().url()).toBe("/challengestatistics");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render ranking when user navigates to #ranking', function () {

        browser().navigateTo('#ranking');

        expect(browser().location().url()).toBe("/ranking");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render registration when user navigates to #registration', function () {

        browser().navigateTo('#registration');

        expect(browser().location().url()).toBe("/registration");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render challengeCreator when user navigates to #challengeCreator', function () {

        browser().navigateTo('#challengeCreator');

        expect(browser().location().url()).toBe("/challengeCreator");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render tournaments when user navigates to #tournaments', function () {

        browser().navigateTo('#tournaments');

        expect(browser().location().url()).toBe("/tournaments");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render create when user navigates to #create', function () {

        browser().navigateTo('#create');

        expect(browser().location().url()).toBe("/create");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render videos when user navigates to #videos', function () {

        browser().navigateTo('#videos');

        expect(browser().location().url()).toBe("/videos");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render feedback when user navigates to #feedback', function () {

        browser().navigateTo('#feedback');

        expect(browser().location().url()).toBe("/feedback");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    it('should render school registration when user navigates to #schoolregistration', function () {

        browser().navigateTo('#schoolregistration');

        expect(browser().location().url()).toBe("/schoolregistration");
        //You can select all the text from all h5 or any other html element
        //expect(element('h2').text()).
        //  toMatch("This is a heading");
        if (pauseAll) pause();
    });

    it('should render schools map when user navigates to #schoolsmap', function () {

        browser().navigateTo('#schoolsmap');

        expect(browser().location().url()).toBe("/schoolsmap");
        //You can select all the text from all h5 or any other html element
        //expect(element('.ng-binding').text()).
        //  toMatch("Welcome, Ruijun!");
        if (pauseAll) pause();
    });

    **/
});
