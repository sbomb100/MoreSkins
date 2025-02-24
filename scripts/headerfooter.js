$(document).ready(function(){
    //HEADER FOOTER CONTENT ----
    //pop up buttons - openning and closing
    $('#drop').click(function(){
        $('#dropChancePopup').toggle();
    });
    $('#trade').click(function(){
        button = $(this);
        badge = $("#notificationBadge");
        popup = $('#tradeRequestPopup');
        //update notification badge
        if (button.data("open") == true){

            button.data("open", false);
            badge.data("count", 0);
            badge.hide();
            popup.show();
        }
        else {
            button.data("open", true);
            badge.text(badge.data("count"));
            if (badge.data("count") != 0){
                badge.show();
            }
            popup.hide();
        }
    });
    $('#closeAboutPopup').click(function(){
        $('#dropChancePopup').fadeOut();
    });
    $('#closeTradePopup').click(function(){
        $('#tradeRequestPopup').fadeOut();
    });
    
    $(".logout-btn").click(function(event){ 
        let $button = $(this);
        if ($button.data("confirmed") === true) {
            alert("Logging out...");
            window.location.href = "../logged-out-html/home.html";
        } else {
            // set button to confirm state
            $button.text("Confirm Logout?");
            $button.addClass("confirm");
            $button.data("confirmed", true);

            // make sure not to jump anywhere yet
            event.preventDefault();
        }
    });

    $("#search-bar").on("keyup", function() {
        let searchText = $(this).val().toLowerCase();
        let found = false;

        $(".user-item").each(function() {
            let userName = $(this).text().toLowerCase();
            if (userName.includes(searchText)) {
                $(this).show();
                found = true;
            } else {
                $(this).hide();
            }
        });

        // Show "No users found" message if nothing matches
        if (found) {
            $("#no-results").hide();
        } else {
            $("#no-results").show();
        }
    });

});
