/**
 * Created by lenovo on 2015/4/6.
 */
(function init(){

    var MyUtils = (function (){

        var ExtentionID = "gldpkdbfaapjnjlbajhhnjgpkamnllcn";

        return {
            ExtId : ExtentionID,
            el : function(id, rg){
                var range = rg || document;
                return range.getElementById(id);
            },
            getMsg: function (what) {
                return messages[what];
            },
            qs : function(selector, rg){
                var range = rg || document;
                return range.querySelector(selector);
            },
            qsa : function(selector, rg){
                var range = rg || document;
                return range.querySelectorAll(selector);
            }
        };
    })();

    var allowedType = ["email", "password", "text"];

    chrome.runtime.onMessage.addListener(function (messages, sender, sendResponse) {
        var key,
            item,
            message = {};
        try{
            message[messages.form_id] = "form_id";
            message[messages.login_id] = messages["login_value"];
            message[messages.password_id] = messages["password_value"];
            message[messages.captcha_value] = getOCR(messages["captcha_pic_id"]);
        }catch (ex){
            sendResponse({error: "Invalid value."});
            return true;
        }

        console.log(message);
        for (key in message){
            if (message[key].length < 1){
                sendResponse({error: "Invalid value."});
                return true;
            }
            item = MyUtils.el(key);
            if (item && item.tagName.toLowerCase() == "form")
                continue;
            if (item && item.tagName.toLowerCase() == "input" && allowedType.indexOf(item.type.toLowerCase()) != -1){
                item.value = message[key];
            }
            else{
                sendResponse({error: "Can't find target DOM"});
                return true;
            }
        }
        sendResponse({status: "success"});
    });


    function getOCR(captcha_id) {
        var image = new Image();
        image.src = document.getElementById(captcha_id).src;
        var canvas = document.createElement('canvas');
        canvas.height = image.height;
        canvas.width = image.width;
        var imgDraw = canvas.getContext('2d');
        imgDraw.drawImage(image,0,0);
        return OCRAD(imgDraw);

    }

})();