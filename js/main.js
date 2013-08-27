(function($) {
    $(document).on('click.bs.collapse.data-api', function (e) {
        var $element = $(e.target)
        
        // switch of style on clicked menu
        if (!$element.hasClass('collapsed'))
            $element
            	.addClass('not-collapsed')
            	.removeClass("collapsed")
        else if ($element.hasClass('not-collapsed'))
            $element
            	.addClass('collapsed')
            	.removeClass("not-collapsed")
    })
    
    $(document).ready(function() {
    	// activate link on click
		$('.side a:not([data-toggle])').click(function (e) {
	        var $element = $(e.target)
			$('.side .active').removeClass("active")
			$element.addClass("active");
		})
		
		// animate submit button
	    $(".form-std .Control input[type='submit']").click(function() {
	        var bposx = $(this).css("background-position-x");
	        
	        if (bposx) {
	            var pos = parseInt( bposx.replace("px", ""));
	            $(this).css("background-position-x", (pos + 93) + "px")
	        }
	    })
	    
		// characters left counter
    	$("#post_comment").keypress(function (e) {
    		var n = Math.max(0,  250 - $(this).val().length );
		  $('#comLength').text("Carateres restant: " + n)
		})
		
        // install form validation
        $("#edit_form").validate({
            submitHandler: function(form) {
                alert($(form).serialize());
                return false;
            },
    
            highlight: function(element, errorClass) {
                var comp = $(element.parentElement);
                var $el = $(element);
                var anchor = $el;
                
                comp.addClass("ValidationFailed");
                comp.find("div[id$='-tip']").show();
                
                if ($el.attr("type") == "checkbox")
                    anchor = $el.parent();
                
                $("#" + $el.attr("id") + "-tip")
                    .css("left", anchor.position().left + anchor.outerWidth())
                    .css("top", anchor.position().top)
            },
    
            unhighlight: function(element, errorClass) {
                var comp = $(element.parentElement);
                var anchor = $el;
                
                comp.removeClass("ValidationFailed");
                comp.find("div[id$='-tip']").hide();
                
                if ($el.attr("type") == "checkbox")
                    anchor = $el.parent();
                
                $("#" + $el.attr("id") + "-tip")
                    .css("left", anchor.position().left + anchor.outerWidth())
                    .css("top", anchor.position().top)
            },
    
    		
            messages: {
                "post[videoUrl]": {
	            	required: "Ce champs est obligatoire",
	            	url: "URL non valide"
                },
                
                "post[comment]": {
	            	required: "Ce champs est obligatoire",
	            	maxlength: "250 caracteres maximum autorises"
                },
            	
                "post[uEmail]": {
                    required: "Un email est necessaire pour l'authentification",
                    email: "Votre addresse doit avoir le format nom@domaine.com"
                },
                
                "post[cgu]": {
                    required: "Vous devez accepter conditions"
                }
            },
    
            errorPlacement: function(error, element) {
                var anchor = element;
                
                if (element.attr("type") == "checkbox")
                    anchor = element.parent();
                
                // insert tip after element
                $("<div>").attr("id", element.attr("id") + "-tip")
                    .addClass("Tip fixed persistent")
                    .css("left", anchor.position().left + anchor.outerWidth())
                    .css("top", anchor.position().top)
                        .append($("<span>").addClass("tipArrow"))
                        .append($("<div>").addClass("tipContent").append(error))
                    .insertAfter(element);
            }
        });
        
        if (!Modernizr.input.autofocus)
            $("#" + $(".form-std label").first().attr("for")).focus();
        else
            $("[autofocus]").parent().trigger("focusin");
    })
})(jQuery);