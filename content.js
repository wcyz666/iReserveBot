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

    window.onload = function(){

        var pageHTML = (document.getElementsByTagName("html")[0].innerHTML);

        chrome.runtime.sendMessage(MyUtils.ExtId, "login_info", {}, function(response){
            var regex,
                is_auto;
            if (pageHTML.indexOf("alert-success") != -1){
                return;
            }
            var suc = fillForm(response);
            if (pageHTML.indexOf("alert-danger") != -1){
                regex = /<div class="alert alert-danger" role="alert">(.*?)<\/div>/;
                alert(regex.exec(pageHTML)[1]);
                return;
            }
            is_auto = (response.is_auto === "true");
            if (suc && re){
                MyUtils.el(is_auto).submit();
            }
        });

        chrome.runtime.onMessage.addListener(function (messages, sender, sendResponse) {
            if (messages == "login_info") return false;
            if (fillForm(messages))
                sendResponse({status: "success"});
            else
                sendResponse({error: "Invalid value."});
        });

    };

    function fillForm(messages){
        var key,
            item,
            message = {};
        //console.log(messages);
        try{
            message[messages.form_id] = "form_id";
            message[messages.login_id] = messages["login_value"];
            message[messages.password_id] = messages["password_value"];
            message[messages.captcha_value] = getOCR(messages["captcha_pic_id"]);
        }catch (ex){
            return false;
        }

        //console.log(message);
        for (key in message){
            if (message[key].length < 1){
                return false;
            }
            item = MyUtils.el(key);
            //console.log(item);
            if (item && item.tagName.toLowerCase() == "form")
                continue;
            if (item && item.tagName.toLowerCase() == "input" && allowedType.indexOf(item.type.toLowerCase()) != -1){
                item.value = message[key];
            }
            else{
                return false;
            }
        }
        return true;
    }

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