'use strict';

describe('Loading all partials defined by routings', function() {
  var pauseAll = false;
  //You can load the runner with runner.html?pauseAll=true to see each page after each test.
  pauseAll = window.location.search.replace( "?pauseAll=", "" );
  
  //You can reload a page before every test if desired.
  //This can slow testing down but make test much more consistent.
  beforeEach(function() {
    browser().navigateTo('../../app/index.html?test_with=app-test.js');
  });


    it('should render schoolregistration when user navigates to #schoolregistration', function() {
      
      browser().navigateTo('#schoolregistration');
      
      expect(browser().location().url()).toBe("/schoolregistration");
      //You can select all the text from all h5 or any other html element
      //expect(element('h2').text()).
      //  toMatch("This is a heading");
      if (pauseAll) pause();
  });

  it('should render teach when user navigates to #teach', function() {
      
      browser().navigateTo('#teach');
      
      expect(browser().location().url()).toBe("/teach");
      //You can select all the text from all h5 or any other html element
      //expect(element('h2').text()).
      //  toMatch("This is a heading");
      if (pauseAll) pause();
  });

  it('should render create when user navigates to #quest', function() {
      
      browser().navigateTo('#quests');
      
      //expect(browser().location().url()).toBe("/quests");
      //You can select all the text from all h5 or any other html element
      //expect(element('#myCarousel .ng-scope:nth-child(1) .ng-binding').text()).
      //  toMatch("The Spy Who Coded");//"The Spy Who Coded"
      if (pauseAll) pause();
  });


  it('should render home when user navigates to #badtag', function() {
      
      browser().navigateTo('#badtag');
      
      expect(browser().location().url()).toBe("/home");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render home when user navigates to #home', function() {
      
      browser().navigateTo('#home');
      
      expect(browser().location().url()).toBe("/home");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render profile when user navigates to #profile', function() {
      
      browser().navigateTo('#profile');
      
      expect(browser().location().url()).toBe("/profile");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render storyboard when user navigates to #storyboard', function() {
      
      browser().navigateTo('#storyboard');
      
      expect(browser().location().url()).toBe("/storyboard");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render challenges when user navigates to #challenges', function() {
      
      browser().navigateTo('#challenges');
      
      expect(browser().location().url()).toBe("/challenges");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });
  
  it('should render practice when user navigates to #practice', function() {
      
      browser().navigateTo('#practice');
      
      //expect(browser().location().url()).toBe("/practice");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render story when user navigates to #story', function() {
      
      browser().navigateTo('#story');
      
      expect(browser().location().url()).toBe("/story");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render challengestatistics when user navigates to #challengestatistics', function() {
      
      browser().navigateTo('#challengestatistics');
      
      expect(browser().location().url()).toBe("/challengestatistics");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render ranking when user navigates to #ranking', function() {
      
      browser().navigateTo('#ranking');
      
      expect(browser().location().url()).toBe("/ranking");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render registration when user navigates to #registration', function() {
      
      browser().navigateTo('#registration');
      
      expect(browser().location().url()).toBe("/registration");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render challengeCreator when user navigates to #challengeCreator', function() {
      
      browser().navigateTo('#challengeCreator');
      
      expect(browser().location().url()).toBe("/challengeCreator");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render tournaments when user navigates to #tournaments', function() {
      
      browser().navigateTo('#tournaments');
      
      expect(browser().location().url()).toBe("/tournaments");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render create when user navigates to #create', function() {
      
      browser().navigateTo('#create');
      
      expect(browser().location().url()).toBe("/create");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render videos when user navigates to #videos', function() {
      
      browser().navigateTo('#videos');
      
      expect(browser().location().url()).toBe("/videos");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render feedback when user navigates to #feedback', function() {
      
      browser().navigateTo('#feedback');
      
      expect(browser().location().url()).toBe("/feedback");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

  it('should render schoolsmap when user navigates to #schoolsmap', function() {
      
      browser().navigateTo('#schoolsmap');
      
      expect(browser().location().url()).toBe("/schoolsmap");
      //You can select all the text from all h5 or any other html element
      //expect(element('.ng-binding').text()).
      //  toMatch("Welcome, Ruijun!");
      if (pauseAll) pause();
  });

});







