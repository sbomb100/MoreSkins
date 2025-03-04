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

        if (!$(".inbox-flex").length){
            $(".inbox-flex").append(`
                <p id="empty-flex">No Current Trades</p>    
               `)
        }
    });
    $('#closeAboutPopup').click(function(){
        $('#dropChancePopup').hide();
    });
    $('#closeTradePopup').click(function(){
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

    // Open login modal
    $(".login-btn").click(function(){
        $("#modalContainer").load("signin.html", function() {
            $(".signin-body").fadeIn();
            
        });
    });
    
    // Close modal only if clicking outside of the modal content
    $(document).on("click", function(event){
        if ($(event.target).is(".signin-body")) {  // Ensure only the background is targeted
            $(".signin-body").fadeOut();
        }
    });

    //live error prompts
    $('#user-signup').on('input', function() {
        var userInput = $(this).val();
        if (userInput.length < 3) {
            $('#user-signup-err').show(); // Show error if username is too short
        } else {
            $('#user-signup-err').hide(); // Hide error when input is valid
        }
    });
    $('#pass-signup').on('input', function() {
        var passwordInput = $(this).val();
        if (passwordInput.length < 8) {
            $('#pass-signup-err').show(); // Show error if password is too short
        } else {
            $('#pass-signup-err').hide(); // Hide error when input is valid
        }
    });
    // Real-time validation for the Log In form
    $('#user-login').on('input', function() {
        var userInput = $(this).val();
        if (userInput.length < 3) {
            $('#user-login-err').show(); // Show error if username is too short
        } else {
            $('#user-login-err').hide(); // Hide error when input is valid
        }
    });
    $('#pass-login').on('input', function() {
        var passwordInput = $(this).val();
        if (passwordInput.length < 8) {
            $('#pass-login-err').show(); // Show error if password is too short
        } else {
            $('#pass-login-err').hide(); // Hide error when input is valid
        }
    });

    //sign up submission
    $("#signup").submit(function(event){
         // Prevent default form submission

        let username = $("input[nameBox='user-s']").val().trim();
        let password = $("input[nameBox='pass-s']").val().trim();
        let valid = true;
        
        // Validate Username
        if (username.length < 3) {
            $("#user-signup-err").text("Username must be at least 3 characters").show();
            valid = false;
        }

        // Validate Password
        if (password.length < 6) {
            $("#pass-signup-err").text("Password must be at least 6 characters").show();
            valid = false;
        }
        event.preventDefault();
        if (valid) {
            // Simulate sending data (Replace with actual AJAX request)
            console.log("Submitting:", { username, password });
            
            path = window.location.pathname;
            params = window.location.search;
            window.location.href = `../logged-in-html/${path.substring(path.lastIndexOf('/') + 1)}${params}`
            //post response
        }
    });
    //log in submission
    $("#login").submit(function(event){
        // Prevent default form submission

       let username = $("input[nameBox='user-l']").val().trim();
       let password = $("input[nameBox='pass-l']").val().trim();
       let valid = true;
       
       // Validate Username
       if (username.length < 3) {
           $("#user-login-err").text("Username must be at least 3 characters").show();
           valid = false;
       }

       // Validate Password
       if (password.length < 6) {
           $("#pass-login-err").text("Password must be at least 6 characters").show();
           valid = false;
       }
       event.preventDefault();
       if (valid) {
           // Simulate sending data (Replace with actual AJAX request)
           console.log("Submitting:", { username, password });
           path = window.location.pathname;
            params = window.location.search;
            window.location.href = `../logged-in-html/${path.substring(path.lastIndexOf('/') + 1)}${params}`
           //post response
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
