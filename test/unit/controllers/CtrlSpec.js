describe('Ctrl', function () {

  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    ctrl = $controller('Ctrl', {
      $scope: $scope
    });
  }));

  it(' $scope.color should be blue', function () {
    expect($scope.color).toEqual('blue');
  });

});