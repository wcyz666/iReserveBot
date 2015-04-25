/**
 * Created by lenovo on 2015/4/25.
 */
var MyUtils = (function (){

    var keys = ["form_id", "login_id", "login_value", "password_id", "password_value", "captcha_pic_id", "captcha_value"];

    var saveItem = function(name, value){
        localStorage.setItem(name, value);
    };

    var getItem = function(name){
        return localStorage.getItem(name);
    };

    return {
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

            return params;
        },
        saveAll: function(params){
            for (var key in params){
                if (params.hasOwnProperty(key))
                    saveItem(key, params[key]);
            }
        },
        el : function(id, rg){
            var range = rg || document;
            return range.getElementById(id);
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

(function init(){

    window.addEventListener("load", function(){

        var form = document.forms[0],
            key,
            savedParams = MyUtils.getAll();
        for (key in savedParams){
            if (savedParams.hasOwnProperty(key))
                form.elements[key].value = savedParams[key];
        }


        MyUtils.el("save").onclick = function(event){
            event.preventDefault();

            var keys = MyUtils.getKeys(),
                params = {},
                i;

            for (i = 0; i < keys.length; i++){
                params[keys[i]] = form.elements[keys[i]].value;
            }

            MyUtils.saveAll(params);
        };
    }, false);

})();