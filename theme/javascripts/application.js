//document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '') + ' js ';
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
(function($) {
    $.fn.removeClassRegex = function(regex) {
        return this.each(function() {
            var classes = this.getAttribute('class');
            if (!classes || !regex) {
                return false;
            }
            var classArray = [];
            classes = classes.split(' ');
            for (var i = 0, ii = classes.length; i < ii; i++) {
                if (!classes[i].match(regex)) {
                    classArray.push(classes[i]);
                }
            }

            this.setAttribute('class', classArray.join(' '));
        });
    };
})(jQuery);
/*! http://mths.be/placeholder v2.0.7 by @mathias */
(function(f, h, $) {
    var a = 'placeholder' in h.createElement('input'),
        d = 'placeholder' in h.createElement('textarea'),
        i = $.fn,
        c = $.valHooks,
        k, j;
    if (a && d) {
        j = i.placeholder = function() {
            return this
        };
        j.input = j.textarea = true
    } else {
        j = i.placeholder = function() {
            var l = this;
            l.filter((a ? 'textarea' : ':input') + '[placeholder]').not('.placeholder').bind({
                'focus.placeholder': b,
                'blur.placeholder': e
            }).data('placeholder-enabled', true).trigger('blur.placeholder');
            return l
        };
        j.input = a;
        j.textarea = d;
        k = {
            get: function(m) {
                var l = $(m);
                return l.data('placeholder-enabled') && l.hasClass('placeholder') ? '' : m.value
            },
            set: function(m, n) {
                var l = $(m);
                if (!l.data('placeholder-enabled')) {
                    return m.value = n
                }
                if (n == '') {
                    m.value = n;
                    if (m != h.activeElement) {
                        e.call(m)
                    }
                } else {
                    if (l.hasClass('placeholder')) {
                        b.call(m, true, n) || (m.value = n)
                    } else {
                        m.value = n
                    }
                }
                return l
            }
        };
        a || (c.input = k);
        d || (c.textarea = k);
        $(function() {
            $(h).delegate('form', 'submit.placeholder', function() {
                var l = $('.placeholder', this).each(b);
                setTimeout(function() {
                    l.each(e)
                }, 10)
            })
        });
        $(f).bind('beforeunload.placeholder', function() {
            $('.placeholder').each(function() {
                this.value = ''
            })
        })
    }

    function g(m) {
        var l = {}, n = /^jQuery\d+$/;
        $.each(m.attributes, function(p, o) {
            if (o.specified && !n.test(o.name)) {
                l[o.name] = o.value
            }
        });
        return l
    }

    function b(m, n) {
        var l = this,
            o = $(l);
        if (l.value == o.attr('placeholder') && o.hasClass('placeholder')) {
            if (o.data('placeholder-password')) {
                o = o.hide().next().show().attr('id', o.removeAttr('id').data('placeholder-id'));
                if (m === true) {
                    return o[0].value = n
                }
                o.focus()
            } else {
                l.value = '';
                o.removeClass('placeholder');
                l == h.activeElement && l.select()
            }
        }
    }

    function e() {
        var q, l = this,
            p = $(l),
            m = p,
            o = this.id;
        if (l.value == '') {
            if (l.type == 'password') {
                if (!p.data('placeholder-textinput')) {
                    try {
                        q = p.clone().attr({
                            type: 'text'
                        })
                    } catch (n) {
                        q = $('<input>').attr($.extend(g(this), {
                            type: 'text'
                        }))
                    }
                    q.removeAttr('name').data({
                        'placeholder-password': true,
                        'placeholder-id': o
                    }).bind('focus.placeholder', b);
                    p.data({
                        'placeholder-textinput': q,
                        'placeholder-id': o
                    }).before(q)
                }
                p = p.removeAttr('id').hide().prev().attr('id', o).show()
            }
            p.addClass('placeholder');
            p[0].value = p.attr('placeholder')
        } else {
            p.removeClass('placeholder')
        }
    }
}
(this, document, jQuery));
//
;
(function(ns, $, window, undefined) {
    var document = window.document,
        navigator = window.navigator,
        location = window.location,
        history = window.history,
        docElem = window.document.documentElement,
        ie8 = docElem.className.indexOf("ie8") >= 0,
        ie9 = docElem.className.indexOf("ie9") >= 0,
        isMobile = navigator.userAgent.match(/(Android|iPad|iPhone|iPod|BlackBerry|Windows Phone)/i) !== null,
        isIpad = navigator.userAgent.match(/(iPad)/i) !== null,
        has3DTransforms = 'WebkitPerspective' in document.body.style || 'perspective' in document.body.style,
        hasTransitions = 'WebkitTransition' in document.body.style || 'transition' in document.body.style,
        hasPlaceholder = "placeholder" in document.createElement("input"),
        hasTransitions = Modernizr.csstransitions,
        hasTouch = Modernizr.touch;
    docElem.setAttribute('data-useragent', navigator.userAgent);
    //css html[data-useragent*='MSIE 10.0']
    if (!hasPlaceholder) {
        $('input, textarea').placeholder();
    }
    //
    var linkButton = $('.js-link-button-open-nav[href^=#]'),
        navPrimaryLink = $('.nav-primary a[href^=#]'),
        linkButtonNext = $('.js-link-button-next[href^=#]'),
        jsBackHistory = $('.js-back-history'),
        jsSearchFormShow = $('.js-search-form-show'),
        listFilterProducts = $('.list-filter-products div > a');

    var showMenu = function() {
        $('body').toggleClass("active-navigation-mobile");
    }
    $('.js-open-navigation-mobile').on('touchstart', function(e) {
        e.preventDefault();
        var optionMenu = this.hash.substring(1);
        $('body').addClass("active-navigation-mobile active-navigation-mobile-" + optionMenu);

    });

    $('.js-close-navigation-mobile').on('touchstart', function(e) {
        e.preventDefault();
        $('body').removeClass("active-navigation-mobile active-navigation-mobile-login active-navigation-mobile-tools");
    });


    jsBackHistory.on('click', function(e) {
        history.back();
        return false;

    });

    jsSearchFormShow.on('click', function(e) {
        var domElem = $(this);
        domElem.closest('.abs-opacity').addClass('abs-opacity--next');
        return false;

    });

    function removeActive(domElem) {
        domElem.removeClass('active');
    };


    function openNavigationSecundary(event) {
        event.preventDefault();
        var domElem = $(this),
            expand = event.data.expand,
            selector = event.data.selector,
            navigationSecundary = (expand === 'prev') ? domElem.closest('.navigation').prev() : domElem.closest('.navigation').next(),
            navigationSecundaryIsOpen = navigationSecundary.hasClass('open-navigation'),
            linkButtonIsActive = domElem.hasClass('active'),
            navigationSecundarySection = navigationSecundary.find('section'),
            navigationSecundaryEq = domElem.data('eq'),
            openNavItem = $('[class*=open-nav-item]'),
            jsOpenNav = $('.js-open-nav');
        var openMenu, closeMenu, toggleMenu, toggleMenuOpenNav, documentFn;

        openMenu = function() {
            domElem.addClass('active');
            navigationSecundary.addClass('open-navigation ' + navigationSecundaryEq);
            navigationSecundarySection.removeClass('open-section');
            $(domElem[0].hash).addClass('open-section');
            $(document).on('touchstart keyup click', documentFn);
        };

        closeMenu = function() {
            //navigationSecundary.removeClass('open-navigation open-nav-2 ' + navigationSecundaryEq);
            navigationSecundary.removeClass('open-navigation ' + navigationSecundaryEq);
            removeActive(selector);
            navigationSecundarySection.removeClass('open-section');
            //openNavItem.removeClass('open-nav').eq(0).addClass('open-nav');
            navigationSecundary.removeClassRegex(/^nav-primary-/);
            $(document).off('touchstart keyup click', documentFn);
        };

        toggleMenu = function() {
            navigationSecundary.removeClassRegex(/^nav-primary-/);
            navigationSecundary.addClass(navigationSecundaryEq);
            removeActive(selector);
            domElem.addClass('active');
            navigationSecundarySection.removeClass('open-section');
            $(domElem[0].hash).addClass('open-section');
        };

        toggleMenuOpenNav = function() {
            var domElem = $(this),
                controlParent = domElem.parent();
            if (controlParent.hasClass('open-nav-item01')) {
                $('.nav-primary-1').addClass('open-nav-2')
            }
            if (controlParent.hasClass('open-nav-item02')) {
                $('.nav-primary-1').removeClass('open-nav-2')
            }
            controlParent.removeClass('open-nav');
            controlParent.siblings().addClass('open-nav');
            return false;
        };
        documentFn = function(e) {
            var ev = $(e.target),
                evClosest = ev.closest('#header').length;
            var bcClosest = ev.closest('.breadcumb').length;
            if (e.type === "keyup") {
                if ((e.keyCode === 27)) {
                    closeMenu();
                    //console.log("ESC");
                    return;
                }
            } else {
                if (evClosest < 1 && bcClosest < 1) {
                    closeMenu();
                    //console.log("CLICK");
                    return;
                }
            }
        };

        if (navigationSecundaryIsOpen && linkButtonIsActive) {
            closeMenu();
        }
        if (navigationSecundaryIsOpen && !linkButtonIsActive) {
            if ($("#tools").hide().parent().hasClass("active"))
                $("#tools").hide().parent().toggleClass("active").addClass("inactive");
            toggleMenu();
        }
        if (!navigationSecundaryIsOpen) {
            if ($("#tools").hide().parent().hasClass("active"))
                $("#tools").hide().parent().toggleClass("active").addClass("inactive");
            openMenu();
        }

        jsOpenNav.on('click', toggleMenuOpenNav)
    };

    function openNext(event) {
        //console.log("openNext");
        var documentNextFn = function(e) {
            //console.log("documentNEXTFN");
            var ev = $(e.target),
                evClosest = ev.closest('#header').length;
            var bcClosest = ev.closest('.breadcumb').length;
            if (e.type === "keyup") {
                if ((e.keyCode === 27)) {
                    closeNextMenu();
                    //console.log("ESC");
                    return;
                }
            } else {
                if (evClosest < 1 && bcClosest < 1) {
                    closeNextMenu();
//console.log("CLICK");
                    return;
                }
            }
        };
        var closeNextMenu = function(e){
            selector.parent().removeClass('active no-border-l no-border-r')
            selector.siblings().slideUp({
                'duration': 200,
                'easing': 'linear'
            });
        }
        if(("nav.open-navigation").length >0){
            $(".nav-primary li a.active").click();
        }
        event.preventDefault();
        var domElem = $(this),
            selector = event.data.selector,
            activePanelVisible = $(this.hash).is(':visible') ? true : false;
        selector.closest('li').one('mouseenter',
            function(e) {
                var el = $(this);
                if (el.prev().hasClass('active')) {
                    el.addClass('no-border-l');
                    return false;
                }
                if (el.next().hasClass('active')) {
                    el.addClass('no-border-r');
                    return false;
                }

            }
        );
        closeNextMenu();
        /*selector.parent().removeClass('active no-border-l no-border-r')
         selector.siblings().slideUp({
         'duration': 200,
         'easing': 'linear'
         });*/
        if (!activePanelVisible) {
//console.log("NOT ACTIVE");
            domElem.parent().addClass('active');
            $(this.hash).slideDown(350);
            if (!Modernizr.touch)
                $(document).on('touchstart keyup click', documentNextFn);
        }
        else{
//console.log("ACTIVE");
            if (!Modernizr.touch)
                $(document).off('touchstart keyup click', documentNextFn);
        }


    };

    $("#filtersearchform").on("submit", function(evt)
    {
        if(evt!== null)
            evt.preventDefault();

        var query = [];
        var $searchField = $(this).find(".search-field");

        if($searchField.val()!=='')
        {
            query.push("q=" + encodeURIComponent($searchField.val()));
        }

        var features = [];
        $(".list-filter-products nav a.active").each(function(index, element)
        {

            var $element = $(element);

            if($element.is("[data-category]"))
                query.push("c=" + $element.data("category"));
            else if($element.is("[data-feature]"))
                features.push($element.data("feature"));
        });

        if(features.length>0)
        {
            query.push("f=" + features.join("|"));
        }

        var strQuery = query.join("&");
        if(strQuery.length>0) strQuery = "?" + strQuery;

        window.history.pushState(location.pathname + strQuery, "Search results", location.pathname + strQuery);

        $.get(location.pathname + strQuery, function(html)
        {
            $("#search_results").replaceWith(html);
        });
    });

    window.onpopstate = function(evt)
    {
        //location.href=evt.state;
        if(evt.state !== null)
        {
            if($("#search_results").length>0)
            {
                $.get(evt.state, function(html)
                {
                    $("#search_results") .replaceWith(html);
                });
            }
            else
            {
                location.href=evt.state;
            }
        }
    };

    $(".list-filter-products > li > div > a").each(function(index, a)
    {
        $(a).data("default", $(a).text());
    });

    $(".list-filter-products > li > div > a").on("click", function(evt)
    {
        evt.preventDefault();
        var $this = $(this);
        if($this.is(".active"))
        {
            $this.text($this.next("nav").find(".active").length ? $this.next("nav").find(".active").text() : $this.data("default")).removeClass("active");
        }
        else
        {
            $(".list-filter-products > li > div > a.active").each(function(index, element)
            {
                var $element = $(element);
                $element.text($element.next("nav").find(".active").length ? $element.next("nav").find(".active").text() : $element.data("default"));
                $element.removeClass("active");
            });
            $this.addClass("active");
            $this.text($(this).data("default"));
        }
    });

    $(".list-filter-products > li > div nav a").on("click", function(evt)
    {
        evt.preventDefault();
        var $this = $(this);
        var $nav = $this.closest("nav");
        var $menuLink = $nav.prev("a");

        if($this.is(".active"))
        {
            $menuLink.removeClass("filter-active");
            $this.removeClass("active");
            $menuLink.removeClass("active").text($menuLink.data("default"));
        }
        else
        {
            $nav.find("a.active").removeClass("active");
            $this.addClass("active");
            $menuLink.addClass("filter-active").removeClass("active").text($this.text());
        }

        $("form.search-form.pad-grid").submit();
    });


    /*
     function openProductsFilter(event) {

     event.preventDefault();
     var domElem = $(this),
     selector = event.data.selector,
     capa = domElem.next(),
     capas = selector.next(),
     activeVisible = domElem.hasClass('active'),
     filterActiveVisible = domElem.hasClass('filter-active'),
     filterCategory = capa.find('a');

     var search = function()
     {
     $("form.search-form.pad-grid").submit();
     };

     var selectFilter = function(event) {

     event.preventDefault();
     var domElemFilter = $(this),
     selectorFilter = event.data.selector;

     if (domElemFilter.hasClass('active')) {
     domElem.text(domElem.data('label').menu).removeData().removeClass('filter-active');
     domElemFilter.removeClass('active');
     search();

     } else {
     var data = { 'menu' : domElem.text(), 'filter' : domElemFilter.text()};

     if(domElemFilter.is("[data-category]"))
     data.category = domElemFilter.data("category");
     else if(domElemFilter.is("[data-feature]"))
     data.feature = domElemFilter.data("feature");

     domElem.data('label', data)
     .text(domElemFilter.text())
     .removeClass('active')
     .addClass('filter-active');

     selectorFilter.removeClass('active');
     domElemFilter.addClass('active');
     search();

     }

     };

     if (!activeVisible) {
     selector.removeClass('active');
     domElem.addClass('active');
     }

     if (activeVisible) {
     if (filterActiveVisible) {
     domElem.text(domElem.data('label').filter);
     }
     domElem.removeClass('active');
     }

     if (filterActiveVisible && !activeVisible) {
     domElem.text(domElem.data('label').menu);
     //filterCategory.off('click');
     }

     filterCategory.one('click', {
     'selector': filterCategory
     }, selectFilter);

     }

     listFilterProducts.on('click', {
     selector: listFilterProducts
     }, openProductsFilter);
     */
    //
    /* linkButton.on('click', {
     expand: 'prev',
     selector: linkButton
     }, openNavigationSecundary);
     */
    //
    navPrimaryLink.on('click', {
        expand: 'next',
        selector: navPrimaryLink
    }, openNavigationSecundary);
    //
    linkButtonNext.on('click', {
        selector: linkButtonNext
    }, openNext);



    //navigationSecundary.on('webkitTransitionEnd transitionend', navigationSecundarySection )
    $('.bxslider').bxSlider({
        pager: false,
        infiniteLoop: false,
        minSlides: 6,
        maxSlides: 6,
        slideWidth: 160,
        slideMargin: 30,
        moveSlides: 1,
        adaptiveHeight: true,
        hideControlOnEnd: true
    });

    $('.bxslider--text').bxSlider({
        mode: 'fade',
        adaptiveHeight: true
    });

    $('.bxslider--products').bxSlider({
        pager: false,
        infiniteLoop: false,
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 275,
        slideMargin: 25,
        adaptiveHeight: true,
        hideControlOnEnd: true
    });

    $('.bxslider-concepts').bxSlider({
        auto: true,
        pager: false,
        infiniteLoop: false,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        slideWidth: 1175,
        adaptiveHeight: true,
        hideControlOnEnd: true
    });
    //

    (function($) {

        var allPanels = $('.accordion__item article'),
            linkPanels = $('.accordion__item [class*="header-"]');

        linkPanels.on('click', function() {
            var domElem = $(this),
                activePanel = domElem.next();
            allPanels.slideUp();
            linkPanels.removeClass('active');
            if (!activePanel.is(':visible')) {
                activePanel.slideDown();
                domElem.addClass('active');
            }
            return false;
        });

    })(jQuery);

    (function($) {
        var allPanels = $('.accordion-mobile li ul'),
            linkPanels = $('.accordion-mobile > li a[href="#"]');
        linkPanels.on('click', function(e) {
            e.preventDefault();
            var domElem = $(this).parent(),
                activePanel = domElem.find('ul');
            if (activePanel.length <= 0) {
                return true;
            }
            allPanels.slideUp();
            linkPanels.parent().removeClass('active');
            if (!activePanel.is(':visible')) {
                domElem.addClass('active');
                activePanel.slideDown();
            }
        });

    })(jQuery);



    $("#subcollections a").on("click", function() {
        $(".subcollections").addClass("none");
        $("#collection-tit").removeClass("none");

        $($(this).attr("href")).removeClass("none");
        $("html, body").animate({
            scrollTop: $("#collection-tit").offset().top
        }, 500);
        return false;
    });

    $("#prizes a").on("click", function() {
        return false;
    });

    $("#treatments a, .data-icon a").on("click", function() {
        $("#type1, #type2,#type3, #type4").addClass("none");
        $($(this).attr("href")).removeClass("none");
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 200
        }, 500);
        return false;
    });

    $(".awards .tabs button").on("click", function() {
        $(".awards .content").addClass("none");
        $($(this).attr("href")).removeClass("none");
        $(".awards .tabs button").removeClass("active");
        $(this).addClass("active");
        return false;
    });

    var latestKnownScrollY = 0;

    function onScroll() {
        latestKnownScrollY = window.scrollY;
        //console.log("scrolleando", latestKnownScrollY, $("#footer").offset().top);
        if ($(".nav-fix").length > 0) {
            if (latestKnownScrollY > $("#footer").offset().top - 700) {
                //console.log("fadeOut");
                $(".nav-fix").fadeOut('normal');
            } else {
                $(".nav-fix").fadeIn('normal');
                //console.log("fadeIn");
            }
        }
    }
    //if ($(".history").length > 0) {
    //console.log("scrolleando");
    if (window.addEventListener) {
        window.addEventListener('scroll', onScroll, false);
    } else {
        window.attachEvent("onscroll", onScroll);
    }
    //}

    // SCROLL EASING
    $('.nav-fix a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    $(".mx-en").on("click", function() {
        $.cookie("cookie_language", "en", {
            expires: 90,
            path: "/"
        });
    });
    $(".mx-es").on("click", function() {
        $.cookie("cookie_language", "es", {
            expires: 90,
            path: "/"
        });
    });
    $(".es-en").on("click", function() {
        $.cookie("cookie_country", "AU", {
            expires: 90,
            path: "/"
        });
        $.cookie("cookie_language", "en", {
            expires: 90,
            path: "/"
        });
    });
    $(".es-es").on("click", function() {
        $.cookie("cookie_country", "ES", {
            expires: 90,
            path: "/"
        });
        $.cookie("cookie_language", "es", {
            expires: 90,
            path: "/"
        });
    });
    /*$(".logout").on("click", function() {
     $.cookie("PHPSESSID", null, {
     expires: 90,
     path: "/"
     });
     });*/

    $("form#contact #category").on("change", function() {
        if ($(this).val() == "profesional") {
            $("#comercial").removeClass("none");
        } else {
            $("#comercial").addClass("none");
        }
    });

    $("#downloadbook").on("click", function() {
        var country = $(".esquerra select").val();
        /*var url = $("#downloadbook").attr("href");
         if (country != "") {
         window.location.href = url + "/" + country;
         }
         */
        if (country != "") {
            $("#downloadbook").attr("href", country);
            $("#other").click();
            _gaq.push(['_trackEvent', 'NaturaBisse', 'Book', country]);
            return true;
        }
        return false;
    });

    $(".see-wishlist").on("click", function() {
        //console.log("click", $("#wishlist_block"), $("#wishlist_block").length);
        $("#wishlist_block").toggle();
        return false;
    });

})(window.ns = window.ns || {}, window.jQuery, window);

$(document).ready(function(){

    if ($("#header-mobile").is(":visible"))
    {
        var cart = $("a.button-cart").parent();
        var li = $("#cart-block-mobile");
        li.replaceWith(cart);
        li.addClass("relative");
        //console.log(li);
    }
    $('a[href*="#myroutines"]').each(function() {
        var href = $(this).attr("href");
        //console.log(this,'Contains #myroutines');
        if (localStorage){
            if (!localStorage.getItem('routines')){
                $(this).attr("href",href.replace("#myroutines",""));
            }
        }
    });
    /*
     var txt_large = $("h3.header-s:contains('MULTISENSORIAL')" );
     if (txt_large.length > 0){
     txt_large.css( "word-wrap", "break-word" );
     var txt = txt_large.html();
     txt = txt.replace("MULTISENSORIAL", "MULTISEN-SORIAL");
     txt_large.html(txt);
     }*/

    $("h3.header-s").each(function(){
        var MAX = 13;
        var txt = $(this).html();
        var split = txt.split(" ");
        for(var i=0 ; i < split.length ; i++) {
            var cut = 8;
            if (split[i].indexOf("macroantioxidant") > -1){
                cut = 9;
            }
            if (split[i].indexOf("MACROANTIOXIDANT") > -1){
                cut = 9;
            }
            if (split[i].indexOf("GENTLEMEN") > -1){
                cut = 6;
            }
            if (split[i].length > MAX && split[i].indexOf("-")== -1){
                var output = [split[i].slice(0, cut), "-", split[i].slice(cut)].join('');
                split[i] = output;
            }
        }
        $(this).html(split.join(" "));
    });

    if ( $("div.embed-container#video").length > 0 ) {
        var vimeo = $("div.embed-container#video").attr("data-vimeo");
        var txt = "<iframe src='//player.vimeo.com/video/" + vimeo + "' frameborder='0' webkitallowfullscreen='' mozallowfullscreen='' allowfullscreen=''></iframe>";
        $(txt).appendTo($("div.embed-container#video"));
        $(".embed-container").css({ "position": "relative", "padding-bottom": "56.25%", "height": "0", "overflow": "hidden", "max-width": "100%" });
        $(".embed-container iframe").css({ "position": "absolute", "top": "0", "left": "0", "width": "100%", "height": "100%" });
    }


});