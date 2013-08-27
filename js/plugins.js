// namespaces
var app = app || {};
app.util = app.util || {};

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// utils
(function(util_ns) {
    var TitleBuilder = function() {
        var single = /^[a-z]+|[A-Z]+/
        var camel = /^[a-z](.*[a-z][A-Z])?/;
        var underscored = /^[a-z].*_/;
    
        this.canConvert = function(str) {
            return single.test(str) | camel.test(str) | underscored.test(str)
        }
    
        this.build = function(str) {
            if (camel.test(str)) {
                str = str.replace(/([a-z])([A-Z])/g, "$1 $2")
                         .replace(/^(.)/, function(m, g) {
                             return g.toUpperCase()
                         })
            } else if (underscored.test(str)) {
                str = str.replace(/_([a-z])/g, function(m, g) {
                              return " " + g.toUpperCase()
                          })
                          .replace(/^(.)/, function(m, g) {
                              return g.toUpperCase()
                          })
            }
            return str;
        }
    }

    util_ns.tb = new TitleBuilder();
})(app.util);

// jQuery/helper plugins
(function($) {
    $.fn.loadExternalHTML = function() {
        $("[data-html]").each(function() {
            var el = $(this);
            el.load(el.attr("data-html") + ".html");
        });
    };
    
    $.fn.textWidth = function() {
        var self = $(this)
        var children = self.contents()
        var calculator = $('<span style="display: inline-block;" />')
        var width

        children.wrap(calculator);
        width = children.parent().width();
        children.unwrap();
        return width;
    };

    $.fn.validate = (function(base) {
        var extendValidate = function(options) {
            // complete labels (content, style)
            $(".form-std label").each(function() {
                var el = $(this);
                var forElement = $("#" + el.attr("for"));
                var text = el.text();
        
                if (!text) {
                    if (el.is("[data-text]"))
                        text = el.attr("data-text");
        
                    if (!text)
                        text = forElement.attr("name")
        
                    if (!app.util.tb.canConvert(text))
                        text = forElement.attr("id");
        
                    el.html(app.util.tb.build(text));
                    
                    if (!el.hasClass("MultipleChoice"))
                        el.append(":")
                }
        
                if (forElement.attr("required"))
                    el.append("<span class='LabelRequiredStar'> *</span>")
            });

            // click handler
            $(".SingleLineText, .TextArea").focusin(function() {
                $(this).addClass("Highlight");
            })
            
            $(".SingleLineText, .TextArea").focusout(function() {
                $(this).removeClass("Highlight");
            })
            
            $(".MultipleChoice").mouseenter(function() {
                $(this).addClass("Highlight");
            })
            
            $(".MultipleChoice").mouseleave(function() {
                $(this).removeClass("Highlight");
            })
            
            base.call(this, options);
        }
        return extendValidate;
    })($.fn.validate);
    
})(jQuery);
        
jQuery(document).loadExternalHTML();
