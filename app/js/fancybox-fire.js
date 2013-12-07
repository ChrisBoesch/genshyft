var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

// Fires whenever a player has finished loading
function onPlayerReady(event) {
    if(!iOS){
        event.target.playVideo();
    }
}

// Fires when the player's state changes.
function onPlayerStateChange(event) {
    // Go to the next video after the current one is finished playing
    if ((event.data == 0 && $('.fancybox').length == 1) || event.target.o.videoData.video_id == "") {
        $.fancybox.close();
    }

    if (event.data == 0 && $('.fancybox').length != 1) {
        $.fancybox.next();
    }

}

// The API will call this function when the page has finished downloading the JavaScript for the player API
function onYouTubePlayerAPIReady() {
    
    // Initialise the fancyBox after the DOM is loaded
    $(document).ready(function() {
        $(".fancybox")
            .attr('rel', 'gallery')
            .fancybox({
                openEffect  : 'none',
                closeEffect : 'none',
                nextEffect  : 'none',
                prevEffect  : 'none',
                padding     : 0,
                margin      : 50,
                loop        : false,
                beforeShow  : function() {
                    // Find the iframe ID
                    var id = $.fancybox.inner.find('iframe').attr('id');
                    
                    // Create video player object and add event listeners
                    var player = new YT.Player(id, {
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    });
                }
            });
    });
    
}