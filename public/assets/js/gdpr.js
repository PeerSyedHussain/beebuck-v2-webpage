(function() {
    /*!
    gdpr.js
    by Christian Fillies
    modified on 11/19/2019
    */
    var gdpr;

    gdpr = {
        defaults: {
            id: 'gdpr',
            cookie: 'cocoonGdprNotice',
            active: false // set to true to enable GDPR notice
        },
        click: function() {
            var cookieToSet, days, now;
            now = new Date();
            days = 365;
            now.setTime(+now + (days * 86400000)); // 24 * 60 * 60 * 1000
            cookieToSet = gdpr.defaults.cookie + '=1;expires=' + now.toGMTString() + ';path=/';
            document.cookie = cookieToSet;
            gdpr.alert.style.display = 'none';
            return cookieToSet;
        },
        set: function() {
            var button, buttons, c, cookie, cookieSet, cookies, i, j, len, len1, results;
            gdpr.alert = document.getElementById(gdpr.defaults.id);
            cookies = document.cookie.split(';');
            cookieSet = false;
            if (gdpr.defaults.active) {
                for (i = 0, len = cookies.length; i < len; i++) {
                    c = cookies[i];
                    if (c && c.length) {
                        cookie = c.trim();
                        if (cookie.startsWith(gdpr.defaults.cookie + '=1')) {
                            cookieSet = true;
                        }
                    }
                }
                if (cookieSet) {
                    gdpr.alert.style.display = 'none';
                } else {
                    gdpr.alert.style.display = '';
                }
                buttons = gdpr.alert.getElementsByTagName('BUTTON');
                results = [];
                for (j = 0, len1 = buttons.length; j < len1; j++) {
                    button = buttons[j];
                    results.push(button.onclick = function() {
                        return gdpr.click();
                    });
                }
                return results;
            } else {
                gdpr.alert.style.display = 'none';
                if (typeof gdpr.alert.remove === 'function') {
                    return gdpr.alert.remove();
                }
            }
        },
        init: function() {
            return gdpr.set();
        }
    };

    //# init when page has finished loading
    if (document.readyState && (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll))) {
        gdpr.init();
    } else {
        document.addEventListener('DOMContentLoaded', gdpr.init);
    }

}).call(this);