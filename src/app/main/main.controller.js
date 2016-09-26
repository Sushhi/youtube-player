(function() {
  'use strict';

  angular
    .module('itTests')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $scope, $log, PlayerService) {
    var vm = this;
    vm.videoUrl = 'https://www.youtube.com/watch?v=C0EeRQ0PsCI';
    vm.playerVars = {
      autoplay: 1,
      controls: 1,
      height: 360
    };

    vm.initializeShortcuts = function () {
      $timeout(function () {
        /** Initializing shortcuts for the YouTube Player  */
        PlayerService.initShortcuts(vm.ytPlayer);
      }, 600);
    }

    $scope.$on('_player-not-ready', function () {
      $log.debug('Player was not ready, re-trying...');
      vm.initializeShortcuts();
    });

    vm.initializeShortcuts();

  }
})();
