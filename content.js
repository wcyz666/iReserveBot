/**
 * Created by lenovo on 2015/4/6.
 */
chrome.runtime.onMessage.addListener(function (message) {
    console.log(message);
});

var OCRcode;

(function init(){
    window.onload = function () {
        var image = new Image();
        image.src = document.getElementById("captcha").src;
        var canvas = document.createElement('canvas');
        canvas.height = image.height;
        canvas.width = image.width;
        var imgDraw = canvas.getContext('2d');
        imgDraw.drawImage(image,0,0);
        OCRcode = OCRAD(imgDraw);
    }

})();