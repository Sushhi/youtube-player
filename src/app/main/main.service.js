'use strict';

/*jshint expr: true */

angular
  .module('itTests')
  .factory('PlayerService', function ($log, hotkeys) {

    var service = {};

    service.initShortcuts = function (ytPlayer) {
      service.ytPlayer = ytPlayer;
      service.addMoveBySecond();
      service.addMoveByFrame();
      service.addPlayback();
    };

    service.addMoveBySecond = function () {
      hotkeys.add({
        combo: 'up',
        description: 'By pressing the up arrow, the video will go 1 second ahead.',
        callback: function() {
          $log.info('Moving 1 second forward');
          var currentTime = service.ytPlayer.getCurrentTime();
          service.ytPlayer.seekTo(currentTime + 1, true);
        }
      });
      hotkeys.add({
        combo: 'down',
        description: 'By pressing the down arrow, the video will go 1 second behind.',
        callback: function() {
          $log.info('Moving 1 second backward');
          var currentTime = service.ytPlayer.getCurrentTime();
          service.ytPlayer.seekTo(currentTime - 1, true);
        }
      });
    };

    service.addMoveByFrame = function () {
      hotkeys.add({
        combo: 'left',
        description: 'By pressing the left arrow, the video will go to the previous frame.',
        callback: function() {
          $log.info('Moving to the previous frame');
        }
      });
      hotkeys.add({
        combo: 'right',
        description: 'By pressing the left arrow, the video will go to the next frame.',
        callback: function() {
          $log.info('Moving to the next frame');
        }
      });
    };

    service.addPlayback = function () {
      hotkeys.add({
        combo: 'space',
        description: 'By pressing space, the video will be paused or played.',
        callback: function() {
          $log.info('Playing / pausing the video');
          service.ytPlayer.getPlayerState() === 1 ? service.ytPlayer.pauseVideo() : service.ytPlayer.playVideo();
        }
      });
    }

    return service;

  });
