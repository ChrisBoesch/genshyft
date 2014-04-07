beforeEach(function () {
  browser().navigateTo('/jsonapi/lastsolution.html');
});
 
describe('ngRepeat Page', function () {
  it('should list all the items', function () {
     expect(repeater('ul li').count()).toEqual(3);
     expect(element('div').text()).toContain("Hello Students"); 
  });
});
