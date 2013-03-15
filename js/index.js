    var handler = null;
    
	var CFG = {
		start: 0,
		limit:10,
		key:"",
		theend:0
	};
	
    // Prepare layout options.
    var options = {
      autoResize: true, // This will auto-update the layout when the browser window is resized.
      container: $('#main'), // Optional, used for some extra CSS styling
      offset: 2, // Optional, the distance between grid items
      itemWidth: 210 // Optional, the width of a grid item
    };
	
	function reset_config(){
		CFG.start = 0;
		CFG.limit = 10;
		CFG.key = "";
		CFG.theend = 0;
	}
	
	function loadImages(){
		if(CFG.theend == 0){
			$.getJSON("inc/api.php", {"k":CFG.key, "s":CFG.start, "l":CFG.limit}, function(data){
				if(data && data.ret == 0){
					var len = data.data.length;
					if(len < CFG.limit){
						CFG.theend = 1;
					}
				
					CFG.start += CFG.limit;
					img_list = "";
					for(var i = 0; i < data.data.length; i++){
						item = data.data[i];
						img_list += '<li><a href="'+item['image_url']+'"><img src="'+item['image_url']+'" width="200"></a><p>'+item['title']+'</p></li>';
					}
					//console.log(img_list);
					$('#tiles').append(img_list);					
					// Clear our previous layout handler.
					if(handler) handler.wookmarkClear();
					
					// Create a new layout handler.
					handler = $('#tiles li');
					handler.wookmark(options);	

					$("#tiles a").photoSwipe();					
				}			
			});
        }
		
	}
    
    /**
     * When scrolled all the way to the bottom, add more tiles.
     */
    function onScroll(event) {
      // Check if we're within 100 pixels of the bottom edge of the broser window.
      var closeToBottom = ($(window).scrollTop() + $(window).height() > $(document).height() - 100);
      if(closeToBottom) {
        // Get the first then items from the grid, clone them, and add them to the bottom of the grid.
        loadImages();
      }
    };
  
    $(document).ready(new function() {
		// Capture scroll event.
		$(document).bind('scroll', onScroll);

		// Call the layout function.
		loadImages();


		$("#search_box").keyup(function () {
		reset_config();
		CFG.key = $(this).val();
		console.log(CFG.key);
		$("#tiles").html("");
		loadImages();
		});

		$("body").jScrollTop();		  
    });