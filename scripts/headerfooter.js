$(document).ready(function(){
    //HEADER FOOTER CONTENT ----
    //pop up buttons - openning and closing
    if (!localStorage.getItem("notificationCount")) {
        localStorage.setItem("notificationCount", "0");
    }
    $("#notificationBadge").text(localStorage.getItem("notificationCount"));
    if (localStorage.getItem("notificationCount") == 0){
        $("#notificationBadge").hide();
    } else {
        $("#notificationBadge").show()
    }

    function close_trade(){
        let color = getComputedStyle(document.documentElement).getPropertyValue('--tertiary-color').trim();
        $(".inbox-flex li").each(function() {
            console.log($(this) )
            $(this).data("seen", true)
            $(this).css("background-color", color);
        });
        $('#tradeRequestPopup').data("open", false);
        $('#tradeRequestPopup').hide();
    }

    $('#drop').click(function(){
        $('#dropChancePopup').toggle();
    });
    $('#trade').click(function(){
        button = $(this);
        badge = $("#notificationBadge");
        popup = $('#tradeRequestPopup');

        let count = parseInt(localStorage.getItem("notificationCount"));
        badge.text(count);

        if ($("#empty-flex").length){
            $("#empty-flex").remove();
        }
        else if ($(".inbox-flex").children().length == 0)
        {
            $(".inbox-flex").append(`
             <p id="empty-flex">No Current Trades</p>    
            `)
        } 
        //open the menu
        if (!popup.data("open")){
            
            //change background on unseen messages
            $(".inbox-flex li").each(function() {
                console.log($(this).data("seen") )
                if ($(this).data("seen") === false || $(this).data("seen") === "false") {
                    $(this).css("background-color", "red");
                }
            }); 

            //reset notifications and bring out pop up
            localStorage.setItem("notificationCount", 0)
            popup.data("open", true);
            popup.show();
        }
        else {
            close_trade()
        }
        if (localStorage.getItem("notificationCount") == "0"){
            $("#notificationBadge").hide();
        } else {
            $("#notificationBadge").show()
        }
    });
    $('#closeAboutPopup').click(function(){
        $('#dropChancePopup').fadeOut();
    });
    $('#closeTradePopup').click(function(){
        $('#tradeRequestPopup').fadeOut();
        close_trade()
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

//since they are added after load make new document
$(document).on("click", ".inbox-flex li", function() {
        //Trade Recived from ${name}
        //Trade Sent to ${name}
        let type = $(this).text().split(" ")[1].toLowerCase();
        let name = $(this).text().split(" ")[3];
        let user_id = $(this).attr("data-id");
        console.log("User ID:", user_id);
        console.log("Type:", type);
        //check user_id with name to validate route
        
    if (user_id) {
        window.location.href = `./trading.html?user=${user_id}&type=${type}`;
    } else {
        console.error("User ID is missing!");
    }
});
