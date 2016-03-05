/**
 * Created by Robin on 3/3/2016.
 */

(function () {

    "use strict";

    var header = document.getElementsByTagName("header")[0];
    var nav = document.getElementsByTagName("nav")[0];
    var button = document.getElementById("show-menu");

    button.onclick = function () {
        if (nav.classList.contains("open")) {
            nav.classList.remove("open");
        } else {
            nav.classList.add("open");
        }
    };

    window.addEventListener('scroll', function () {
        var offset = window.pageYOffset;

        if (offset > 100) {
            header.classList.add("collapsed");

        }
        if (offset === 0) {
            header.classList.remove("collapsed");
        }
    });
})();