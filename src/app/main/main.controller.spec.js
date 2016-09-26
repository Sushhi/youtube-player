(function() {
  'use strict';

  describe('[YouTubePlayer] Controller: MainController', function() {

    beforeEach(module('itTests'));

    var vm,
      $timeout,
      scope,
      PlayerService;


    beforeEach(inject(function(_$controller_, _$rootScope_, _$timeout_, _PlayerService_) {
      scope = _$rootScope_.$new();
      vm = _$controller_('MainController', {
        $scope: scope
      });
      PlayerService = _PlayerService_;
      $timeout = _$timeout_;
    }));

    it('should have a MainController', function() {
      expect(vm).toBeDefined();
    });

    it('should initialize youtube player shortcuts', function() {
      spyOn(PlayerService, 'initShortcuts').and.callThrough();
      vm.initializeShortcuts();
      $timeout.flush();
      expect(PlayerService.initShortcuts).toHaveBeenCalled();
    });

    it('should retry to initialize youtube player shortcuts', function() {
      scope.$broadcast('_player-not-ready');
      spyOn(PlayerService, 'initShortcuts').and.callThrough();
      $timeout.flush();
      expect(PlayerService.initShortcuts).toHaveBeenCalled();
    });

  });
})();
