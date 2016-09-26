(function() {
  'use strict';

  angular
    .module('itTests')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
