// ==UserScript==
// @name         神社市场-比例
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://kitsune.ee/plugin.php?id=zgxsh_integral:index
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kitsune.ee
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var dic = { "狐尾毛":"毛", "狐火":"火", "狐仙福佑":"福佑"};
    var div = document.querySelectorAll("#wp > div > div > div > div.layui-tab.layui-tab-card > div > div.layui-tab-item > div");
    for (var i = 1; i < div.length; i++){
        var output = "";
        var divch = div[i].children;
        for (var j = 0; j < divch.length; j++){
            var text = divch[j].innerText;
            var patt = /(狐尾毛|狐火|狐仙福佑) (\d+) (根|团|点)(.|\n)+(狐尾毛|狐火|狐仙福佑) (\d+) (根|团|点)/g;
            var res = patt.exec(text);
            var bname = res[1],
                bnum = res[2],
                sname = res[5],
                snum = res[6];
            var ress = bnum/snum;
            if (i==2){
                ress = Number.isInteger(ress)?ress:ress.toFixed(3);
                output = dic[bname]+":"+dic[sname]+"="+ress+":1";
            }else{
                ress = 1/ress;
                ress = Number.isInteger(ress)?ress:ress.toFixed(3);
                output = dic[bname]+":"+dic[sname]+"=1:"+ress;
            }
            divch[j].lastElementChild.firstElementChild.innerHTML = output;
        }
    }
})();
