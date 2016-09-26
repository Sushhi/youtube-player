(function() {
  'use strict';

  angular
    .module('itTests')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $log, PlayerService) {
    var vm = this;
    vm.videoUrl = 'https://youtu.be/HLmOkDBfxv0?t=8';
    vm.playerVars = {
      autoplay: 0,
      controls: 1
    };

    vm.initializeShortcuts = function () {
      $timeout(function () {
        /** Initializing shortcuts for the YouTube Player  */
        PlayerService.initShortcuts(vm.ytPlayer);
      }, 400);
    }

    vm.$on('_player-not-ready', function () {
      $log.debug('Player was not ready, re-trying...');
      vm.initializeShortcuts();
    });

    vm.initializeShortcuts();

  }
})();
