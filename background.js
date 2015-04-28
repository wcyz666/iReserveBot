/**
 * Created by lenovo on 2015/4/6.
 */

(function (){
    var MyUtils = (function (){

        var keys = ["form_id", "login_id", "login_value", "password_id", "password_value", "captcha_pic_id", "captcha_value"];

        var ExtentionID = "gldpkdbfaapjnjlbajhhnjgpkamnllcn";

        var getItem = function(name){
            return localStorage.getItem(name) || "";
        };

        return {
            ExtId : ExtentionID,
            getKeys: function() {
                return keys.slice(0);
            },
            getAll: function(){
                var params = {},
                    item;

                for (var i = 0; i < keys.length; i++){
                    item = getItem(keys[i]);
                    if (item)
                        params[keys[i]] = item;
                }
                params["is_auto"] = getItem("is_auto");
                return params;
            }
        };
    })();

    chrome.runtime.onMessage.addListener(function (messages, sender, sendResponse) {
        if (messages == "login_info"){
            sendResponse(MyUtils.getAll());
        }
    });

})();
