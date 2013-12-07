//
// test/e2e/controllers/controllersSpec.js
//
describe("E2E: Testing Controllers", function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });

  it('should have a home page controller', function() {
    browser().navigateTo('#/');
    expect(browser().location().path()).toBe("/home");
    //expect(element('#ng-view').html()).toContain('data-app-youtube-listings');
  });
  
  /*
  it('should have a working video page controller that applies the video to the scope', function() {
    browser().navigateTo('#/videos/WuiHuZq_cg4');
    expect(browser().location().path()).toBe("/videos/WuiHuZq_cg4");
    expect(element('#ng-view').html()).toContain('app-youtube-embed');
  });
*/
});
