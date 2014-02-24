//
// test/unit/services/servicesSpec.js
//
describe("Unit: Testing services", function() {

    beforeEach(angular.mock.module('myApp.services'));

    describe('Timer', function () {
        var now, Timer;

        beforeEach(module(function($provide) {
            now = function() {
                return now.returnValue || 0;
            };

            $provide.factory('now', function () {
                return now;
            });
        }));

        it('should save starting time', inject(function(Timer) {
            var t;

            now.returnValue = 1;
            t = new Timer();

            now.returnValue = 2;
            expect(t.delta()).toBe(1);

            expect(t.running()).toBe(true);
        }));

        it('should save stop time', inject(function(Timer) {
            var t;

            now.returnValue = 1;
            t = new Timer();

            now.returnValue = 2;
            t.stop();

            now.returnValue = 20;
            expect(t.delta()).toBe(1);

            expect(t.running()).toBe(false);
        }));

        it('should calcalate a rate', inject(function(Timer) {
            var t;

            now.returnValue = 0;
            t = new Timer();

            now.returnValue = 1;
            expect(t.rate(0)).toBe(0);

            now.returnValue = 0;
            expect(t.rate(1)).toBe(0);

            now.returnValue = 1;
            expect(t.rate(1)).toBe(1);

            now.returnValue = 4;
            expect(t.rate(2)).toBe(2);

        }));
    });

/*
  beforeEach(angular.mock.module('App'));

  it('should contain an $appStorage service', inject(function($appStorage) {
    expect($appStorage).not.to.equal(null);
  }));

  it('should contain an $appYoutubeSearcher service', inject(function($appYoutubeSearcher) {
    expect($appYoutubeSearcher).not.to.equal(null);
  }));

  it('should have a owrking $appYoutubeSearcher service', inject(['$appYoutubeSearcher',function($yt) {
    expect($yt.prefixKey).not.to.equal(null);
    expect($yt.resize).not.to.equal(null);
    expect($yt.prepareImage).not.to.equal(null);
    expect($yt.getWatchedVideos).not.to.equal(null);
  }]));

  it('should have a working service that resizes dimensions', inject(['$appYoutubeSearcher',function($yt) {
    var w = 100;
    var h = 100;
    var mw = 50;
    var mh = 50;
    var sizes = $yt.resize(w,h,mw,mh);
    expect(sizes.length).to.equal(2);
    expect(sizes[0]).to.equal(50);
    expect(sizes[1]).to.equal(50);
  }]));

  it('should store and save data properly', inject(['$appStorage',function($storage) {
    var key = 'key', value = 'value';
    $storage.enableCaching();
    $storage.put(key, value);
    expect($storage.isPresent(key)).to.equal(true);
    expect($storage.get(key)).to.equal(value);

    $storage.erase(key);
    expect($storage.isPresent(key)).to.equal(false);

    $storage.put(key, value);
    $storage.flush();
    expect($storage.isPresent(key)).to.equal(false);
  }]));
*/
});
