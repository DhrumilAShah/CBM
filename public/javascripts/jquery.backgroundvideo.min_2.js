// Video Init
$(document).ready(function(){
    if (!($("html").hasClass("mobile"))){
        var videobackground_1 = new $.backgroundVideo($('#video-background-1'), {
            "align": "centerXY",
            "width": 1280,
            "height": 720,
            "path": "video/",
            "filename": "video",
            "types": ["mp4", "ogg", "webm"],
            "autoplay": true,
            "loop": true
        });
        var videobackground_2 = new $.backgroundVideo($('#video-background-2'), {
            "align": "centerXY",
            "width": 1280,
            "height": 720,
            "path": "video/",
            "filename": "video-restaurant",
            "types": ["mp4", "ogg", "webm"],
            "autoplay": true,
            "loop": true
        });
    }
});

/*
* jQuery Background video plugin for jQuery
* ---
* Copyright 2011, Victor Coulon (http://victorcoulon.fr)
* Released under the MIT, BSD, and GPL Licenses.
* based on jQuery Plugin Boilerplate 1.3
*/

(function(t){t.backgroundVideo=function(e,i){var n={videoid:"video_background",autoplay:true,loop:true,preload:true};var s=this;s.settings={};var o=function(){s.settings=t.extend({},n,i);s.el=e;d()};var d=function(){var e="",i="",n="",o="",d=s.settings.preload,g=s.settings.autoplay,a=s.settings.loop;if(d){i='preload="auto"'}else{i=""}if(g){n='autoplay="autoplay"'}else{n=""}if(a){o='loop="true"'}else{o=""}e+='<video id="'+s.settings.videoid+'"'+i+n+o;if(s.settings.poster){e+=' poster="'+s.settings.poster+'" '}e+='style="display:none;position:absolute;top:0;left:0;bottom:0;right:0;z-index:-100;width:100%;height:100%;">';for(var l=0;l<s.settings.types.length;l++){e+='<source src="'+s.settings.path+s.settings.filename+"."+s.settings.types[l]+'" type="video/'+s.settings.types[l]+'" />'}e+="bgvideo</video>";s.el.prepend(e);s.videoEl=document.getElementById(s.settings.videoid);s.$videoEl=t(s.videoEl);s.$videoEl.fadeIn(2e3);r()};var r=function(){var t=g();s.$videoEl.width(t*s.settings.width);s.$videoEl.height(t*s.settings.height);if(typeof s.settings.align!=="undefined"){a()}};var g=function(){var e=t(window).width();var i=t(window).height();var n=e/i;var o=s.settings.width/s.settings.height;var d=i/s.settings.height;if(n>=o){d=e/s.settings.width}return d};var a=function(){var e=(t(window).width()>>1)-(s.$videoEl.width()>>1)|0;var i=(t(window).height()>>1)-(s.$videoEl.height()>>1)|0;if(s.settings.align=="centerXY"){s.$videoEl.css({left:e,top:i});return}if(s.settings.align=="centerX"){s.$videoEl.css("left",e);return}if(s.settings.align=="centerY"){s.$videoEl.css("top",i);return}};o();t(window).resize(function(){r()});s.$videoEl.bind("ended",function(){this.play()})}})(jQuery);