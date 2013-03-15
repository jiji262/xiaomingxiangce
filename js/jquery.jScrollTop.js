/*
 *  Project: jquery.jscrollTop.js - jQuery Scroll to Top plugin
 *  Description: add a "TOP" button for long page to scroll to top
 *  Author:allenji@tencent
 *  License:MIT
 */

;(function ($, window, document, undefined) {

    // Create the defaults once
    var pluginName = "jScrollTop";
    var defaults = {
        text: "回顶部",
        background_color:"#67ade0",
        color:"#fafafa",
        border_radius:"3px",
        font_family:'Microsoft Yahei',
        font_size:'14px'
    };

    function jScrollTop(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    jScrollTop.prototype = {
        init: function () {

            $('<a id="scroll-top" href="#page-top">'+this.options.text+'</a>').appendTo("body");

            var $scrolltop_link = $('#scroll-top');

            var cssObj = {
                    'z-index':9999, 
                    'bottom':0,
                    'right':0,
                    'margin':'0.9em',
                    'display':'inline-block',
                    'padding':'0.15em 0.5em',
                    'border-radius':this.options.border_radius,
                    'color':this.options.color,
                    'text-decoration':'none',
                    'border':'1px solid transparent',
                    'background':this.options.background_color,
                    'letter-spacing':'1px',
                    'text-transform':'uppercase',
                    'position':'fixed',
                    'font-family':this.options.font_family,
                    'font-size':this.options.font_size
            };


            $scrolltop_link.css(cssObj);

            $scrolltop_link.on( 'click' ,  function ( ev ) {
                
                ev.preventDefault();
                
                $( 'html, body' ).animate( {
                    
                    scrollTop: 0
                    
                }, 700 );
                
            }).data('hidden', 1).hide(); 
            
            var scroll_event_fired = false;
            
            $(window).on('scroll', function() {
                
                scroll_event_fired = true;
                
            });
            
            setInterval( function() {
                        
                if( scroll_event_fired ) {

                    scroll_event_fired = false; 
                    
                    var is_hidden =  $scrolltop_link.data('hidden'); 
                    
                    //可以设置为$( this ).height() / 2，滚动到页面一半触发
                    if ( $( this ).scrollTop()  >  0 ) {
                        
                        if( is_hidden ) {
                            
                            $scrolltop_link.fadeIn(600).data('hidden', 0);
                            
                        }
                    }
                    
                    else {
                        
                        if( !is_hidden ) {
                            
                            $scrolltop_link.slideUp().data('hidden', 1);
                
                        }
                    }
                    
                }
                
            }, 300); 
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new jScrollTop(this, options));
            }
        });
    };

})(jQuery, window, document);
