jQuery.fn.mousehold=function(d,c){d&&"function"==typeof d&&(c=d,d=100);if(c&&"function"==typeof c){var f=0,b=0;return this.each(function(){jQuery(this).mousedown(function(){b=1;var e=0,a=this;f=setInterval(function(){e++;c.call(a,e);b=2},d)});clearMousehold=function(){clearInterval(f);1==b&&c.call(this,1);b=0};jQuery(this).mouseout(clearMousehold);jQuery(this).mouseup(clearMousehold)})}};(function(b){var a={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4000,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){}};b.fn.bxSlider=function(an){if(0==this.length){return this}if(1<this.length){return this.each(function(){b(this).bxSlider(an)}),this}var au={},at=this,ak=b(window).width(),aa=b(window).height(),Y=function(){au.settings=b.extend({},a,an);au.settings.slideWidth=parseInt(au.settings.slideWidth);au.children=at.children(au.settings.slideSelector);au.children.length<au.settings.minSlides&&(au.settings.minSlides=au.children.length);au.children.length<au.settings.maxSlides&&(au.settings.maxSlides=au.children.length);au.settings.randomStart&&(au.settings.startSlide=Math.floor(Math.random()*au.children.length));au.active={index:au.settings.startSlide};au.carousel=1<au.settings.minSlides||1<au.settings.maxSlides;au.carousel&&(au.settings.preloadImages="all");au.minThreshold=au.settings.minSlides*au.settings.slideWidth+(au.settings.minSlides-1)*au.settings.slideMargin;au.maxThreshold=au.settings.maxSlides*au.settings.slideWidth+(au.settings.maxSlides-1)*au.settings.slideMargin;au.working=!1;au.controls={};au.interval=null;au.animProp="vertical"==au.settings.mode?"top":"left";au.usingCSS=au.settings.useCSS&&"fade"!=au.settings.mode&&function(){var g=document.createElement("div"),h=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"],k;for(k in h){if(void 0!==g.style[h[k]]){return au.cssPrefix=h[k].replace("Perspective","").toLowerCase(),au.animProp="-"+au.cssPrefix+"-transform",!0}}return !1}();"vertical"==au.settings.mode&&(au.settings.maxSlides=au.settings.minSlides);at.data("origStyle",at.attr("style"));at.children(au.settings.slideSelector).each(function(){b(this).data("origStyle",b(this).attr("style"))});Z()},Z=function(){at.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>');au.viewport=at.parent();au.loader=b('<div class="bx-loading" />');au.viewport.prepend(au.loader);at.css({width:"horizontal"==au.settings.mode?100*au.children.length+215+"%":"auto",position:"relative"});au.usingCSS&&au.settings.easing?at.css("-"+au.cssPrefix+"-transition-timing-function",au.settings.easing):au.settings.easing||(au.settings.easing="swing");ap();au.viewport.css({width:"100%",overflow:"hidden",position:"relative"});au.viewport.parent().css({maxWidth:X()});au.settings.pager||au.viewport.parent().css({margin:"0 auto 0px"});au.children.css({"float":"horizontal"==au.settings.mode?"left":"none",listStyle:"none",position:"relative"});au.children.css("width",W());"horizontal"==au.settings.mode&&0<au.settings.slideMargin&&au.children.css("marginRight",au.settings.slideMargin);"vertical"==au.settings.mode&&0<au.settings.slideMargin&&au.children.css("marginBottom",au.settings.slideMargin);"fade"==au.settings.mode&&(au.children.css({position:"absolute",zIndex:0,display:"none"}),au.children.eq(au.settings.startSlide).css({zIndex:50,display:"block"}));au.controls.el=b('<div class="bx-controls" />');au.settings.captions&&V();au.active.last=au.settings.startSlide==ar()-1;au.settings.video&&at.fitVids();var c=au.children.eq(au.settings.startSlide);"all"==au.settings.preloadImages&&(c=au.children);au.settings.ticker?au.settings.pager=!1:(au.settings.pager&&(au.settings.pagerCustom?au.pagerEl=b(au.settings.pagerCustom):(au.pagerEl=b('<div class="bx-pager" />'),au.settings.pagerSelector?b(au.settings.pagerSelector).html(au.pagerEl):au.controls.el.addClass("bx-has-pager").append(au.pagerEl),U()),au.pagerEl.delegate("a","click",T)),au.settings.controls&&(au.controls.next=b('<a class="bx-next" href="">'+au.settings.nextText+"</a>"),au.controls.prev=b('<a class="bx-prev" href="">'+au.settings.prevText+"</a>"),au.controls.next.bind("click",S),au.controls.prev.bind("click",al),au.controls.next.mousehold(S),au.controls.prev.mousehold(al),au.settings.nextSelector&&b(au.settings.nextSelector).append(au.controls.next),au.settings.prevSelector&&b(au.settings.prevSelector).append(au.controls.prev),au.settings.nextSelector||au.settings.prevSelector||(au.controls.directionEl=b('<div class="bx-controls-direction" />'),au.controls.directionEl.append(au.controls.prev).append(au.controls.next),au.controls.el.addClass("bx-has-controls-direction").append(au.controls.directionEl))),au.settings.auto&&au.settings.autoControls&&(au.controls.start=b('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+au.settings.startText+"</a></div>"),au.controls.stop=b('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+au.settings.stopText+"</a></div>"),au.controls.autoEl=b('<div class="bx-controls-auto" />'),au.controls.autoEl.delegate(".bx-start","click",R),au.controls.autoEl.delegate(".bx-stop","click",o),au.settings.autoControlsCombine?au.controls.autoEl.append(au.controls.start):au.controls.autoEl.append(au.controls.start).append(au.controls.stop),au.settings.autoControlsSelector?b(au.settings.autoControlsSelector).html(au.controls.autoEl):au.controls.el.addClass("bx-has-controls-auto").append(au.controls.autoEl),ag(au.settings.autoStart?"stop":"start")),(au.settings.controls||au.settings.autoControls||au.settings.pager)&&au.viewport.after(au.controls.el));l(c,j)},l=function(g,k){var m=g.find("img, iframe").length;if(0==m){k()}else{var h=0;g.find("img, iframe").each(function(){b(this).one("load",function(){++h==m&&k()}).each(function(){this.complete&&b(this).load()})})}},j=function(){if(au.settings.infiniteLoop&&"fade"!=au.settings.mode&&!au.settings.ticker){var c="vertical"==au.settings.mode?au.settings.minSlides:au.settings.maxSlides,g=au.children.slice(0,c).clone().addClass("bx-clone"),c=au.children.slice(-c).clone().addClass("bx-clone");at.append(g).prepend(c)}au.loader.remove();aj();"vertical"==au.settings.mode&&(au.settings.adaptiveHeight=!0);au.viewport.height(am());at.redrawSlider();au.settings.onSliderLoad(au.active.index);au.initialized=!0;au.settings.responsive&&b(window).bind("resize",ah);au.settings.auto&&au.settings.autoStart&&f();au.settings.ticker&&e();au.settings.pager&&ae(au.settings.startSlide);au.settings.controls&&af();au.settings.touchEnabled&&!au.settings.ticker&&(au.touch={start:{x:0,y:0},end:{x:0,y:0}},au.viewport.bind("touchstart",d))},am=function(){var g=0,h=b();if("vertical"==au.settings.mode||au.settings.adaptiveHeight){if(au.carousel){var k=1==au.settings.moveSlides?au.active.index:au.active.index*ao(),h=au.children.eq(k);for(i=1;i<=au.settings.maxSlides-1;i++){h=k+i>=au.children.length?h.add(au.children.eq(i-1)):h.add(au.children.eq(k+i))}}else{h=au.children.eq(au.active.index)}}else{h=au.children}"vertical"==au.settings.mode?(h.each(function(c){g+=b(this).outerHeight()}),0<au.settings.slideMargin&&(g+=au.settings.slideMargin*(au.settings.minSlides-1))):g=Math.max.apply(Math,h.map(function(){return b(this).outerHeight(!1)}).get());return g},X=function(){var c="100%";0<au.settings.slideWidth&&(c="horizontal"==au.settings.mode?au.settings.maxSlides*au.settings.slideWidth+(au.settings.maxSlides-1)*au.settings.slideMargin:au.settings.slideWidth);return c},W=function(){var c=au.settings.slideWidth,g=au.viewport.width();0==au.settings.slideWidth||au.settings.slideWidth>g&&!au.carousel||"vertical"==au.settings.mode?c=g:1<au.settings.maxSlides&&"horizontal"==au.settings.mode&&!(g>au.maxThreshold)&&g<au.minThreshold&&(c=(g-au.settings.slideMargin*(au.settings.minSlides-1))/au.settings.minSlides);return c},ap=function(){var c=1;"horizontal"==au.settings.mode&&0<au.settings.slideWidth?au.viewport.width()<au.minThreshold?c=au.settings.minSlides:au.viewport.width()>au.maxThreshold?c=au.settings.maxSlides:(c=au.children.first().width(),c=Math.floor(au.viewport.width()/c)):"vertical"==au.settings.mode&&(c=au.settings.minSlides);return c},ar=function(){var g=0;if(0<au.settings.moveSlides){if(au.settings.infiniteLoop){g=au.children.length/ao()}else{for(var h=0,k=0;h<au.children.length;){++g,h=k+ap(),k+=au.settings.moveSlides<=ap()?au.settings.moveSlides:ap()}}}else{g=Math.ceil(au.children.length/ap())}return g},ao=function(){return 0<au.settings.moveSlides&&au.settings.moveSlides<=ap()?au.settings.moveSlides:ap()},aj=function(){if(au.children.length>au.settings.maxSlides&&au.active.last&&!au.settings.infiniteLoop){if("horizontal"==au.settings.mode){var c=au.children.last(),g=c.position();aq(-(g.left-(au.viewport.width()-c.width())),"reset",0)}else{"vertical"==au.settings.mode&&(g=au.children.eq(au.children.length-au.settings.minSlides).position(),aq(-g.top,"reset",0))}}else{g=au.children.eq(au.active.index*ao()).position(),au.active.index==ar()-1&&(au.active.last=!0),void 0!=g&&("horizontal"==au.settings.mode?aq(-g.left,"reset",0):"vertical"==au.settings.mode&&aq(-g.top,"reset",0))}},aq=function(c,n,m,k){if(au.usingCSS){c="vertical"==au.settings.mode?"translate3d(0, "+c+"px, 0)":"translate3d("+c+"px, 0, 0)",at.css("-"+au.cssPrefix+"-transition-duration",m/1000+"s"),"slide"==n?(at.css(au.animProp,c),at.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){at.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");ac()})):"reset"==n?at.css(au.animProp,c):"ticker"==n&&(at.css("-"+au.cssPrefix+"-transition-timing-function","linear"),at.css(au.animProp,c),at.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){at.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");aq(k.resetValue,"reset",0);ai()}))}else{var h={};h[au.animProp]=c;"slide"==n?at.animate(h,m,au.settings.easing,function(){ac()}):"reset"==n?at.css(au.animProp,c):"ticker"==n&&at.animate(h,speed,"linear",function(){aq(k.resetValue,"reset",0);ai()})}},U=function(){for(var g="",k=ar(),m=0;m<k;m++){var h="";au.settings.buildPager&&b.isFunction(au.settings.buildPager)?(h=au.settings.buildPager(m),au.pagerEl.addClass("bx-custom-pager")):(h=m+1,au.pagerEl.addClass("bx-default-pager"));g+='<div class="bx-pager-item"><a href="" data-slide-index="'+m+'" class="bx-pager-link">'+h+"</a></div>"}au.pagerEl.html(g)},V=function(){au.children.each(function(c){c=b(this).find("img:first").attr("title");void 0!=c&&(""+c).length&&b(this).append('<div class="bx-caption"><span>'+c+"</span></div>")})},S=function(c){au.settings.auto&&at.stopAuto();at.goToNextSlide();"click"===c.type&&c.preventDefault()},al=function(c){au.settings.auto&&at.stopAuto();at.goToPrevSlide();"click"===c.type&&c.preventDefault()},R=function(c){at.startAuto();c.preventDefault()},o=function(c){at.stopAuto();c.preventDefault()},T=function(c){au.settings.auto&&at.stopAuto();var g=b(c.currentTarget),g=parseInt(g.attr("data-slide-index"));g!=au.active.index&&at.goToSlide(g);c.preventDefault()},ae=function(g){var h=au.children.length;"short"==au.settings.pagerType?(1<au.settings.maxSlides&&(h=Math.ceil(au.children.length/au.settings.maxSlides)),au.pagerEl.html(g+1+au.settings.pagerShortSeparator+h)):(au.pagerEl.find("a").removeClass("active"),au.pagerEl.each(function(k,m){b(m).find("a").eq(g).addClass("active")}))},ac=function(){if(au.settings.infiniteLoop){var c="";0==au.active.index?c=au.children.eq(0).position():au.active.index==ar()-1&&au.carousel?c=au.children.eq((ar()-1)*ao()).position():au.active.index==au.children.length-1&&(c=au.children.eq(au.children.length-1).position());"horizontal"==au.settings.mode?aq(-c.left,"reset",0):"vertical"==au.settings.mode&&aq(-c.top,"reset",0)}au.working=!1;au.settings.onSlideAfter(au.children.eq(au.active.index),au.oldIndex,au.active.index)},ag=function(c){au.settings.autoControlsCombine?au.controls.autoEl.html(au.controls[c]):(au.controls.autoEl.find("a").removeClass("active"),au.controls.autoEl.find("a:not(.bx-"+c+")").addClass("active"))},af=function(){1==ar()?(au.controls.prev.addClass("disabled"),au.controls.next.addClass("disabled")):!au.settings.infiniteLoop&&au.settings.hideControlOnEnd&&(0==au.active.index?(au.controls.prev.addClass("disabled"),au.controls.next.removeClass("disabled")):au.active.index==ar()-1?(au.controls.next.addClass("disabled"),au.controls.prev.removeClass("disabled")):(au.controls.prev.removeClass("disabled"),au.controls.next.removeClass("disabled")))},f=function(){0<au.settings.autoDelay?setTimeout(at.startAuto,au.settings.autoDelay):at.startAuto();au.settings.autoHover&&at.hover(function(){au.interval&&(at.stopAuto(!0),au.autoPaused=!0)},function(){au.autoPaused&&(at.startAuto(!0),au.autoPaused=null)})},e=function(){var c=0;"next"==au.settings.autoDirection?at.append(au.children.clone().addClass("bx-clone")):(at.prepend(au.children.clone().addClass("bx-clone")),c=au.children.first().position(),c="horizontal"==au.settings.mode?-c.left:-c.top);aq(c,"reset",0);au.settings.pager=!1;au.settings.controls=!1;au.settings.autoControls=!1;au.settings.tickerHover&&!au.usingCSS&&au.viewport.hover(function(){at.stop()},function(){var h=0;au.children.each(function(g){h+="horizontal"==au.settings.mode?b(this).outerWidth(!0):b(this).outerHeight(!0)});var k=au.settings.speed/h*(h-Math.abs(parseInt(at.css("horizontal"==au.settings.mode?"left":"top"))));ai(k)});ai()},ai=function(c){speed=c?c:au.settings.speed;c={left:0,top:0};var g={left:0,top:0};"next"==au.settings.autoDirection?c=at.find(".bx-clone").first().position():g=au.children.first().position();aq("horizontal"==au.settings.mode?-c.left:-c.top,"ticker",speed,{resetValue:"horizontal"==au.settings.mode?-g.left:-g.top})},d=function(c){au.working?c.preventDefault():(au.touch.originalPos=at.position(),c=c.originalEvent,au.touch.start.x=c.changedTouches[0].pageX,au.touch.start.y=c.changedTouches[0].pageY,au.viewport.bind("touchmove",ad),au.viewport.bind("touchend",ab))},ad=function(g){var m=g.originalEvent,k=Math.abs(m.changedTouches[0].pageX-au.touch.start.x),h=Math.abs(m.changedTouches[0].pageY-au.touch.start.y);3*k>h&&au.settings.preventDefaultSwipeX?g.preventDefault():3*h>k&&au.settings.preventDefaultSwipeY&&g.preventDefault();"fade"!=au.settings.mode&&au.settings.oneToOneTouch&&(g=0,"horizontal"==au.settings.mode?(m=m.changedTouches[0].pageX-au.touch.start.x,g=au.touch.originalPos.left+m):(m=m.changedTouches[0].pageY-au.touch.start.y,g=au.touch.originalPos.top+m),aq(g,"reset",0))},ab=function(c){au.viewport.unbind("touchmove",ad);var g=c.originalEvent;c=0;au.touch.end.x=g.changedTouches[0].pageX;au.touch.end.y=g.changedTouches[0].pageY;"fade"==au.settings.mode?(g=Math.abs(au.touch.start.x-au.touch.end.x),g>=au.settings.swipeThreshold&&(au.touch.start.x>au.touch.end.x?at.goToNextSlide():at.goToPrevSlide(),at.stopAuto())):("horizontal"==au.settings.mode?(g=au.touch.end.x-au.touch.start.x,c=au.touch.originalPos.left):(g=au.touch.end.y-au.touch.start.y,c=au.touch.originalPos.top),!au.settings.infiniteLoop&&(0==au.active.index&&0<g||au.active.last&&0>g)?aq(c,"reset",200):Math.abs(g)>=au.settings.swipeThreshold?(0>g?at.goToNextSlide():at.goToPrevSlide(),at.stopAuto()):aq(c,"reset",200));au.viewport.unbind("touchend",ab)},ah=function(c){c=b(window).width();var g=b(window).height();if(ak!=c||aa!=g){ak=c,aa=g,at.redrawSlider()}};at.goToSlide=function(c,n){if(!au.working&&au.active.index!=c){au.working=!0;au.oldIndex=au.active.index;0>c?au.active.index=ar()-1:c>=ar()?au.active.index=0:au.active.index=c;au.settings.onSlideBefore(au.children.eq(au.active.index),au.oldIndex,au.active.index);if("next"==n){au.settings.onSlideNext(au.children.eq(au.active.index),au.oldIndex,au.active.index)}else{if("prev"==n){au.settings.onSlidePrev(au.children.eq(au.active.index),au.oldIndex,au.active.index)}}au.active.last=au.active.index>=ar()-1;au.settings.pager&&ae(au.active.index);au.settings.controls&&af();if("fade"==au.settings.mode){au.settings.adaptiveHeight&&au.viewport.height()!=am()&&au.viewport.animate({height:am()},au.settings.adaptiveHeightSpeed),au.children.filter(":visible").fadeOut(au.settings.speed).css({zIndex:0}),au.children.eq(au.active.index).css("zIndex",51).fadeIn(au.settings.speed,function(){b(this).css("zIndex",50);ac()})}else{au.settings.adaptiveHeight&&au.viewport.height()!=am()&&au.viewport.animate({height:am()},au.settings.adaptiveHeightSpeed);var g=0,m={left:0,top:0};if(!au.settings.infiniteLoop&&au.carousel&&au.active.last){if("horizontal"==au.settings.mode){var h=au.children.eq(au.children.length-1),m=h.position(),g=au.viewport.width()-h.outerWidth()}else{m=au.children.eq(au.children.length-au.settings.minSlides).position()}}else{au.carousel&&au.active.last&&"prev"==n?(m=1==au.settings.moveSlides?au.settings.maxSlides-ao():(ar()-1)*ao()-(au.children.length-au.settings.maxSlides),h=at.children(".bx-clone").eq(m),m=h.position()):"next"==n&&0==au.active.index?(m=at.find("> .bx-clone").eq(au.settings.maxSlides).position(),au.active.last=!1):0<=c&&(m=c*ao(),m=au.children.eq(m).position())}"undefined"!==typeof m&&aq("horizontal"==au.settings.mode?-(m.left-g):-m.top,"slide",au.settings.speed)}}};at.goToNextSlide=function(){if(au.settings.infiniteLoop||!au.active.last){var c=parseInt(au.active.index)+1;at.goToSlide(c,"next")}};at.goToPrevSlide=function(){if(au.settings.infiniteLoop||0!=au.active.index){var c=parseInt(au.active.index)-1;at.goToSlide(c,"prev")}};at.startAuto=function(c){au.interval||(au.interval=setInterval(function(){"next"==au.settings.autoDirection?at.goToNextSlide():at.goToPrevSlide()},au.settings.pause),au.settings.autoControls&&!0!=c&&ag("stop"))};at.stopAuto=function(c){au.interval&&(clearInterval(au.interval),au.interval=null,au.settings.autoControls&&!0!=c&&ag("start"))};at.getCurrentSlide=function(){return au.active.index};at.getSlideCount=function(){return au.children.length};at.redrawSlider=function(){au.children.add(at.find(".bx-clone")).outerWidth(W());au.viewport.css("height",am());au.settings.ticker||aj();au.active.last&&(au.active.index=ar()-1);au.active.index>=ar()&&(au.active.last=!0);au.settings.pager&&!au.settings.pagerCustom&&(U(),ae(au.active.index))};at.destroySlider=function(){au.initialized&&(au.initialized=!1,b(".bx-clone",this).remove(),au.children.each(function(){void 0!=b(this).data("origStyle")?b(this).attr("style",b(this).data("origStyle")):b(this).removeAttr("style")}),void 0!=b(this).data("origStyle")?this.attr("style",b(this).data("origStyle")):b(this).removeAttr("style"),b(this).unwrap().unwrap(),au.controls.el&&au.controls.el.remove(),au.controls.next&&au.controls.next.remove(),au.controls.prev&&au.controls.prev.remove(),au.pagerEl&&au.pagerEl.remove(),b(".bx-caption",this).remove(),au.controls.autoEl&&au.controls.autoEl.remove(),clearInterval(au.interval),au.settings.responsive&&b(window).unbind("resize",ah))};at.reloadSlider=function(c){void 0!=c&&(an=c);at.destroySlider();Y()};Y();return this}})(jQuery);