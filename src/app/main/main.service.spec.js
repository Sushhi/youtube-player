'use strict';

describe('[YouTubePlayer] Service: PlayerService', function () {

  beforeEach(module('itTests'));

  var PlayerService,
    mockedYtPlayer;

  beforeEach(inject(function (_PlayerService_) {
    PlayerService = _PlayerService_;
    mockedYtPlayer = {
      playVideo: function () { return; },
      pauseVideo: function () { return; },
      seekTo: function () { return; },
      getPlayerState: function () { return 1; },
      getCurrentTime: function () { return 1; }
    };
    PlayerService.ytPlayer = mockedYtPlayer;
  }));

  var triggerKeyDown = function (keyCode) {
    var event = document.createEvent('Event');
    event.keyCode = keyCode;
    event.initEvent('keydown');
    document.dispatchEvent(event);
  };

  it('should call every init methods', function () {
    spyOn(PlayerService, 'addMoveBySecond').and.callThrough();
    spyOn(PlayerService, 'addMoveByFrame').and.callThrough();
    spyOn(PlayerService, 'addPlayback').and.callThrough();
    PlayerService.initShortcuts(mockedYtPlayer);
    expect(PlayerService.addMoveBySecond).toHaveBeenCalled();
    expect(PlayerService.addMoveByFrame).toHaveBeenCalled();
    expect(PlayerService.addPlayback).toHaveBeenCalled();
  });

  it('should return the video current time', function () {
    var current = PlayerService.getVideoCurrentTime();
    expect(current).toBe(1);
  });

  it('should add shortcuts to move second by second and trigger their callbacks', function () {
    PlayerService.addMoveBySecond();
    spyOn(PlayerService.ytPlayer, 'seekTo').and.callThrough();
    triggerKeyDown(38);
    expect(PlayerService.ytPlayer.seekTo).toHaveBeenCalledWith(2, true);
    triggerKeyDown(40);
    expect(PlayerService.ytPlayer.seekTo).toHaveBeenCalledWith(0, true);
  });

  it('should add shortcuts to move frame by frame and trigger their callbacks', function () {
    PlayerService.addMoveByFrame();
    spyOn(PlayerService.ytPlayer, 'seekTo').and.callThrough();
    spyOn(PlayerService.ytPlayer, 'pauseVideo').and.callThrough();
    var prevFrame = PlayerService.getVideoCurrentTime() - (-1 * (1 / PlayerService.FRAMES_PER_SECOND));
    triggerKeyDown(37);
    expect(PlayerService.ytPlayer.seekTo).toHaveBeenCalledWith(prevFrame, true);
    var nextFrame = PlayerService.getVideoCurrentTime() + (-1 * (1 / PlayerService.FRAMES_PER_SECOND));
    triggerKeyDown(39);
    expect(PlayerService.ytPlayer.seekTo).toHaveBeenCalledWith(nextFrame, true);
  });

  it('should add shortcuts to pause and resume the video and trigger their callbacks', function () {
    PlayerService.addPlayback();
    spyOn(PlayerService.ytPlayer, 'playVideo').and.callThrough();
    spyOn(PlayerService.ytPlayer, 'pauseVideo').and.callThrough();
    triggerKeyDown(32);
    expect(PlayerService.ytPlayer.pauseVideo).toHaveBeenCalled()
  });

});
