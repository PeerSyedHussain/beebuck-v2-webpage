(function() {
    /*!
    feature.js
    by Christian Fillies
    modified on 11/13/2019
    */
    var feature;

    feature = {
        defaults: {
            breakpoints: {
                md: 768,
                lg: 1000,
                xl: 1200
            },
            ratio: {
                sm: 1600 / 749,
                md: 2860 / 1032,
                lg: 2000 / 657,
                xl: 4698 / 976
            },
            class: {
                navbar: 'navbar',
                    feature: 'feature',
                    wrapper: 'feature-wrapper',
                    top: 'feature-top',
                    bottom: 'feature-bottom'
            }
        },
        returnClassSelectors: function(x) {
            var classes, defined;
            classes = x.split(' ');
            defined = function() {
                var i, len, results, sel;
                results = [];
                for (i = 0, len = classes.length; i < len; i++) {
                    sel = classes[i];
                    results.push('.' + sel);
                }
                return results;
            };
            return defined().join('');
        },
        set: function() {
            var bottomHeight, call, newHeight, topHeight;
            call = feature;
            call.height = window.innerHeight;
            call.width = window.innerWidth;
            if (navigator.userAgent.match(/(iPhone)/)) {
                call.height = document.getElementsByTagName('HTML')[0].clientHeight; //# screen.availHeight is also available in iPhones
                call.width = document.getElementsByTagName('HTML')[0].clientWidth; //# screen.availWidth is also available in iPhones
            }
            call.navHeight = document.getElementsByClassName(call.defaults.class.navbar)[0].clientHeight;
            newHeight = call.height - call.navHeight;
            document.body.style.setProperty('--viewport-height', newHeight + 'px');
            document.body.style.setProperty('--nav-height', call.navHeight + 'px');
            bottomHeight = call.width / call.defaults.ratio.sm;
            if (call.width >= call.defaults.breakpoints.md) {
                bottomHeight = call.width / call.defaults.ratio.md;
            }
            if (call.width >= call.defaults.breakpoints.lg) {
                bottomHeight = call.width / call.defaults.ratio.lg;
            }
            if (call.width >= call.defaults.breakpoints.xl) {
                bottomHeight = call.width / call.defaults.ratio.xl;
            }
            topHeight = newHeight - bottomHeight;
            document.getElementsByClassName(call.defaults.class.feature)[0].style.height = newHeight + 'px';
            document.getElementsByClassName(call.defaults.class.wrapper)[0].style.minHeight = newHeight + 'px';
            document.getElementsByClassName(call.defaults.class.bottom)[0].style.height = bottomHeight + 'px';
            if (topHeight > 250) {
                return document.getElementsByClassName(call.defaults.class.top)[0].style.height = topHeight + 'px';
            } else {
                return document.getElementsByClassName(call.defaults.class.top)[0].style.height = '';
            }
        },
        init: function() {
            window.addEventListener('resize', feature.set);
            return feature.set();
        }
    };

    //# init when page has finished loading
    if (document.readyState && (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll))) {
        feature.init();
    } else {
        document.addEventListener('DOMContentLoaded', feature.init);
    }

}).call(this);