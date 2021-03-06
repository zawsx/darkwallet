define(['./module', 'frontend/services', 'darkwallet'], function (controllers, Services, DarkWallet) {
  'use strict';
  controllers.controller('IdentitiesCtrl', ['$scope', function($scope) {
    Services.connectNg('wallet', $scope, function(data) {
      console.log("wallet bus message", data);
      if (data.type == 'ready') {
        // identity is ready here
        console.log('loaded', data.identity)
        $scope.currentIdentity = DarkWallet.getIdentity().name;
        $scope.identities = DarkWallet.getKeyRing().identities;
        $scope.loadedIdentities = Object.keys($scope.identities)
        $scope.availableIdentities = DarkWallet.getKeyRing().availableIdentities;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
      }
    })

    $scope.selectIdentity = function(identityName) {
        var identityIdx = $scope.availableIdentities.indexOf(identityName)
        DarkWallet.service().loadIdentity(identityIdx)
    }

  }]);
});
