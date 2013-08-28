(function($) {
	function positionateError($element) {
		$anchor = $element.parent();

        if ($element.attr("type") == "checkbox")
            anchor = $element.parent();

		$element
	        .css("left", $anchor.position().left + $anchor.outerWidth())
	        .css("top", $anchor.position().top)
	}
	
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
    
    $(window).resize(function() {
    	$("div[id$='-tip']").each(function () {
	    	positionateError($(this));
		})
    });
    
    $(document).ready(function() {
    	// activate link on click
		$('.side a:not([data-toggle])').click(function (e) {
	        var $element = $(e.target)
			$('.side .active').removeClass("active")
			$element.addClass("active");
		})
		
		// characters left counter
		var commentLengthWatcher = function() {
    		var n = Math.max(0,  250 - $(this).val().length );
		  $('#comLength').text("Carateres restant: " + n)
		}
		
	  	$("#post_comment").on('input', commentLengthWatcher);
		$("#post_comment").on('keypress', commentLengthWatcher); //IE
		
        // install form validation
        $("#edit_form").validate({
            submitHandler: function(form) {
                alert($(form).serialize());
                return false;
            },
    
            highlight: function(element, errorClass) {
                var comp = $(element.parentElement);
                
                comp.addClass("ValidationFailed");
                comp.find("div[id$='-tip']").show();
                
                positionateError($(element))
            },
    
            unhighlight: function(element, errorClass) {
                var comp = $(element.parentElement);
                
                comp.removeClass("ValidationFailed");
                comp.find("div[id$='-tip']").hide();
                
                positionateError($(element))
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