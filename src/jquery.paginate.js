// jQuery paginate
// Add a pagination to everything.
// Version 1.2.0
// by Kevin Eichhorn (https://github.com/bzzrckt)

(function( $ ) {

    $.paginate = function(element, options) {
		
		/*
			#Defaults
		*/
        var defaults = {
            perPage:				5, 			//how many items per page
            autoScroll:				true, 		//boolean: scroll to top of the container if a user clicks on a pagination link
            scope:					'', 		//which elements to target 
			paginatePosition:		['bottom']
        }
			
        var plugin = this;
        var plugin_index = $('.paginate').length;

        plugin.settings = {}

        var $element = $(element),
             element = element;
        
        var curPage, items, offset, maxPage;

		/*
			#Initliazes plugin
		*/		
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
        
			curPage = 1;			
			items =  $element.children(plugin.settings.scope);		
			maxPage = Math.ceil( items.length / plugin.settings.perPage ); //determines how many pages exist
			
			var paginationHTML = generatePagination(); //generate HTML for pageination

			if($.inArray('top', plugin.settings.paginatePosition) > -1) {
				$element.before(paginationHTML);
			}
						
			if($.inArray('bottom', plugin.settings.paginatePosition) > -1) {
				$element.after(paginationHTML);
			}
			
			$element.addClass("paginate");
			$element.addClass("paginate-" + plugin_index);
								
			plugin.switchPage(1); //go to initial page
				
        }

		/*
			#Switch to Page > 'page'
		*/
        plugin.switchPage = function(page) {

			$('.paginate-pagination-' + plugin_index).find('.active').removeClass('active');
			$('.paginate-pagination-' + plugin_index).find('.page-' + page).addClass('active');
								
			offset = (page - 1) * plugin.settings.perPage;	
			
			$( items ).hide(); 
		
			for(i = 0; i < plugin.settings.perPage; i++) {	
				if($( items[i + offset] ).length)
					$( items[i + offset] ).fadeTo(100, 1);
			}
			
			curPage = page;
			
			return curPage;	
			
        }

		/*
			#Kills plugin
		*/
        plugin.kill = function() {
			
			$( items ).show(); 
	        $('.paginate-pagination-' + plugin_index).remove();	        
	        $element.removeClass('paginate');
	        $element.removeData('paginate');
  
        }

		/*
			#Generates HTML for pagination (nav)
		*/
        var generatePagination = function() {
			var paginationEl = '<nav class="paginate-pagination paginate-pagination-' + plugin_index + '" data-parent="' + plugin_index + '">';
			paginationEl += '<ul>';
			
			for(i = 1; i <= maxPage; i++) {
				paginationEl += '<li><a href="#" data-page="' + i + '" class="page page-' + i + '">' + i + '</a></li>';
			}
	
			paginationEl += '</ul>';		
			paginationEl += '</nav>';
			
			//Adds event listener for the buttons
			$('body').on('click', '.page', function(e) {
					console.log(e);
					e.preventDefault();
					
					var page = $(this).data('page');
					var paginateParent = $(this).parents('.paginate-pagination').data('parent');
										
					if(plugin.settings.autoScroll)
					$('html, body').animate({scrollTop: $('.paginate-' + paginateParent).offset().top}, 'slow');

					$('.paginate-' + paginateParent).data('paginate').switchPage(page);
					
			});	
			
			return paginationEl;
        }

        plugin.init();

    }

    $.fn.paginate = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('paginate')) {
                var plugin = new $.paginate(this, options);
                $(this).data('paginate', plugin);
            }
        });

    }

}( jQuery ));