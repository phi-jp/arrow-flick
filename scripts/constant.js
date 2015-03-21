/*
 * constant.js
 */

var SCREEN_WIDTH    = 640;              // スクリーン幅
var SCREEN_HEIGHT   = 960;              // スクリーン高さ
var SCREEN_CENTER_X = SCREEN_WIDTH/2;   // スクリーン幅の半分
var SCREEN_CENTER_Y = SCREEN_HEIGHT/2;  // スクリーン高さの半分
var SCREEN_CENTER   = tm.geom.Vector2(SCREEN_CENTER_X, SCREEN_CENTER_Y);
var SCREEN_RECT     = tm.geom.Rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

var TITLE = "Flick Arrow";
var TIME = 20*1000;
var PENALTY = 2*1000;

var BASE_PATH = window.cordovaFlag ? 'http://junk.tmlife.net/flick-arrow/' : "./";
var HOME_COLOR = "hsl(60, 100%, 50%)";
var MAIN_FONT = "Kaushan Script";
var BOARD_ID = "board_normal";
var FONT_CODE = {
    play: '0xf04b',
    home: '0xf015',
    comment: '0xf075',
    apple: '0xf179',
    android: '0xf17b',
    trophy: '0xf091',
    gamepad: '0xf11b',
    shareAlt: '0xf1e0',
    buysellads: '0xf20d',

    arrowRight: '0xf061',
    longArrowRight: '0xf178',
    handORight: '0xf0a4',
    angleRight: '0xf106',
};

var QUERY = tm.util.QueryString.parse(location.search.substr(1));
QUERY.$safe({
    "scene": "title",
    "level": 0,
});

var ASSETS = {
	"images/arrow0": BASE_PATH + "images/arrow0.png",
	"images/arrow1": BASE_PATH + "images/arrow1.png",
	"sounds/bgm": BASE_PATH + "sounds/bgm.wav",
	"sounds/pinpon": BASE_PATH + "sounds/pinpon.mp3",
	"sounds/boo": BASE_PATH + "sounds/boo.mp3",
};


var isNative = function() {
    return window.cordovaFlag === true;
};

var showAd = function() {
    if (window.cordovaFlag) {
        if(window.AdMob) {
            AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:true} );
        }
    }
};

var clickAdCallback = function() {
    alert('onInterstitialLeaveApp');
};

document.addEventListener('onInterstitialLeaveApp', function(){
    clickAdCallback && clickAdCallback();
});


document.addEventListener('onInterstitialDismiss', function(){
    // 広告を閉じた際のコールバック
    // alert('onInterstitialDismiss');
    // AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
});

var UserData = {
    init: function(strong) {
        var defaults = {
            life: 5,
            bestScore: 0,
        };

        var data = this.get();

        if (strong) {
            data.$extend(defaults);
        }
        else {
            data.$safe(defaults);
        }

        this.set(data);
    },
    get: function() {
        var key = location.pathname.toCRC32();
        var data = localStorage.getItem(key);
        return (data) ? JSON.parse(data) : {};
    },
    set: function(data) {
        var key = location.pathname.toCRC32();
        var dataString = JSON.stringify(data);
        localStorage.setItem(key, dataString);
        return this;
    },

    hasLife: function() {
        var data = this.get();
        return data.life >= 1;
    },
};

// ユーザーデータ初期化
(function() {
    UserData.init();
})();

