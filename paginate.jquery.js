// jQuery paginate
// Add a pagination to everything.
// Version 1.0.1
// by Kevin Eichhorn (https://github.com/bzzrckt)

(function( $ ) {

    $.paginate = function(element, options) {
		
		/*
			#Defaults
		*/
        var defaults = {
            perPage:	5, 		//how many items per page
            autoScroll:		true, 	//boolean: scroll to top of the container if a user clicks on a pagination link
            scope:		"" 		//which elements to target 
        }
			
        var plugin = this;

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
			
			$element.append(paginationHTML);
			$element.addClass("paginate");
					
			plugin.switchPage(1); //go to initial page
				
        }

		/*
			#Switch to Page > 'page'
		*/
        plugin.switchPage = function(page) {

			$(element, '.paginate-pagination').find('.active').removeClass('active');
			$(element, '.paginate-pagination').find('.page-' + page).addClass('active');
								
			offset = (page - 1) * plugin.settings.perPage;	
			
			$( items ).hide(); 
		
			for(i = 0; i < plugin.settings.perPage; i++) {	
				if($( items[i + offset] ).length)
					$( items[i + offset] ).fadeIn(100);
			}
			
			curPage = page;
			
			return curPage;	
			
        }

		/*
			#Generates HTML for pagination (nav)
		*/
        var generatePagination = function() {
			var paginationEl = '<nav class="paginate-pagination">';
			paginationEl += '<ul>';
			
			for(i = 1; i <= maxPage; i++) {
				paginationEl += '<li><a href="#" data-page="' + i + '" class="page page-' + i + '">' + i + '</a></li>';
			}
	
			paginationEl += '</ul>';		
			paginationEl += '</nav>';
			
			//Adds event listener for the buttons
			$(element, '.paginate-pagination').on('click', '.page', function(e) {
					
					e.preventDefault();
					
					if(plugin.settings.autoScroll)
					$('html, body').animate({scrollTop: $element.offset().top}, 'slow');
					
					var page = $(this).data('page');
					plugin.switchPage(page);
					
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