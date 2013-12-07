/*
describe('Chris-provided controller tests', function() {
  var pauseAll = true;
  //You can load the runner with runner.html?pauseAll=true to see each page after each test.
  pauseAll = window.location.search.replace( "?pauseAll=", "" );
 
  it('Should find the ajax-loaded items from PlayerController.', function() {
    browser().navigateTo('../../app/client/contribution.html');
  
    expect(element('span').text()).
        toMatch("Ruijun");

    element('.ng-binding:nth-child(1) input').click();
    element('input[value="verify example solution with public and private tests"]').click();
    element('input[value="Accept contribution"]').click();
        
  });



  it('Should find the ajax-loaded items from InterfacesController.', function() {
    //browser().navigateTo('../../app/controllertest.html');
    //you can also just select by DIV order in the page but this can easily break.
    expect(element('p').text()).
        toMatch("Interfaces Count = 12");

    if (pauseAll) pause();
  });

 it('Should find the ajax-loaded items for GameController.', function() {
    //browser().navigateTo('../../app/controllertest.html');
    expect(element('li[name="numberofproblems"]').text()).
        toMatch("Number of Problems = ");
    
    //Click on the create_practice_game button.
    element('input[value="Create Practice Game"]').click();
    expect(element('li[name="numberofproblems"]').text()).
        toMatch("Number of Problems = 5");
    
    //Click on the create_quest_game button.
    element('input[value="Create Quest Game"]').click();
    expect(element('li[name="numberofproblems"]').text()).
        toMatch("Number of Problems = 5");
    
    //Click on the Load Game 0 button.
    element('input[value="Load Game 0"]').click();
    expect(element('li[name="numberofproblems"]').text()).
        toMatch("Number of Problems = 3");
    
    //Click on the Load Game 2 button.
    element('input[value="Load Game 2"]').click();
    expect(element('li[name="currentproblem"]').text()).
        toMatch("Current problem = 10119");

    //Click on the Load Game 3 button.
    element('input[value="Load Game 3"]').click();
    expect(element('li[name="currentproblem"]').text()).
        toMatch("Current problem = ");
    

    if (pauseAll) pause();
  });

 it('Should check a problem for a game with the GameController.', function() {
    //browser().navigateTo('../../app/controllertest.html');
    
    element('input[value="Check Solution For Game"]').click();
    expect(element('b').text()).
        toMatch("false");
    
    if (pauseAll) pause();
  });

 it('Should find the ajax-loaded items for PathController.', function() {
    //browser().navigateTo('../../app/controllertest.html');
    expect(element('ul[name="playerpathprogress"]').text()).
        toMatch("");
    
    //Click on the create_practice_game button.
    element('input[value="Update Progress 10030"]').click();
    expect(element('ul[name="playerpathprogress"]').text()).
        toMatch("Python");
    
    //Click on the create_quest_game button.
    element('input[value="Update Progress 2462233"]').click();
    expect(element('ul[name="playerpathprogress"]').text()).
        toMatch("Ruby");
    
    //Click on the Load Game 0 button.
    element('input[value="Update Path Details"]').click();
    expect(element('span[name="current_paths"]').text()).
        toMatch("5");
    
    if (pauseAll) pause();
  });

});

*/

