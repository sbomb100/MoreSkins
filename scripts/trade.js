
$(document).ready(function(event){ 
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("user");
    const offerType = urlParams.get("type");
    //check db for name
    const name = "sbomb100"
    console.log(offerType)
    //change visuals based on if its a sent request
    if(offerType === "sent"){
        $('.offer-button').hide();

        //ignore rest, will load offer later when saved in db
        event.preventDefault();
    }else if(offerType === "recieved"){
        $('#send-trade').text("Accept Trade Offer");

    } else {
        $('#deny-trade').hide();
    }
    //in future, read user inventory from database and place items in the inventory boxes via
    /*.skins-grid . append(
    <label class="skin-container">
        <input type="checkbox">
        <span class="custom-checkbox"></span>
        <img alt="skin picture" src="../assets/images/skins/revolver.png" >
    </label>
    ) */
   
   //check db validation later
    if(searchQuery && name){
        //make user IDS for easier database look up later
        updateOffer("my-grid", "my-value", "my-offer");
        updateOffer("other-grid", "other-value", "other-offer")
        
        if (name){
            $('#named-inventory-header').text(`${name}'s Skins`);
            $('#named-offer-header').text(`${name}'s Offer`);
            worth = 0;
            $(".cost").each(function(){
                worth += parseFloat($(this).data("worth"));
            });

            $("#total-val").text(`Total Worth: $${worth.toFixed(2)}`).show();
            $(".showcase").show();
            $(".recent-activity").show();
        } else {
            $('.trading-section').empty();
            $('.offer-button').hide();
            $('.container h3').text("Cannot Trade With Nonexistent User");
        }
    } else {
        $('.trading-section').empty();
        $('.offer-button').hide();
        $('container h3').text("No Given User");
    }
    

    function updateOffer(gridId, valueId, offerId) {
        $(`#${offerId}`).empty();
        let count = 0;
        let total = 0;
        $(`#${gridId} input[type='checkbox']:checked`).each(function () {
            let img = $(this).siblings("img");
            let worth = $(this).siblings("img").data("worth");
            $(`#${offerId}`).append(`
                <div class="skin-container">
                    <img alt="${img.attr('alt')}, ${count}" src="${img.attr('src')}">
                </div>
            `);
            count++;
            total += parseFloat(worth) || 0;
        });
        $(`#${valueId}`).text(`Total Value: $${total.toFixed(2)}`);
    }

    $("#my-grid input[type='checkbox']").change(function () {
        updateOffer("my-grid", "my-value", "my-offer");
    });

    $("#other-grid input[type='checkbox']").change(function () {
        updateOffer("other-grid", "other-value", "other-offer");
    });
    $("#send-trade").click(function(event){ 
        button = $(this);
        badge = $("#notificationBadge");
        if (button.data("confirmed") === true) {
            let count = parseInt(localStorage.getItem("notificationCount"))
            if ($("#empty-flex").length){
                $("#empty-flex").remove();
            }

            if(offerType === "recieved"){
                alert("Accepting Trade...");
                button.data("confirmed", false);
                button.text("Accepted Trade");
                button.removeClass("confirm");
                window.location.href="./personal_profile.html"
            } else {
                alert("Sending Offer...");
                //put in trade request pop ups
                $('.inbox-flex').append(`
                    <li data-id="${searchQuery}" data-seen="${$('#tradeRequestPopup')
                        .data("open")}">Trade Sent to ${name}</li>
                    `);
                
                button.data("confirmed", false);
                button.text("Send Trade Offer");
                button.removeClass("confirm");

                if (!$('#tradeRequestPopup').data("open")){
                    count++;
                    localStorage.setItem("notificationCount", count); // Save it
                    badge.text(count);
                    badge.show();
                }
            }
            

        } else if ($(".skins-grid input[type='checkbox']:checked").length == 0 &&
            $(".skins-grid input[type='checkbox']:checked").length == 0 && offerType !== "recieved") {
                alert("Select Items to Trade First");
        } else {

            // set button to confirm state
            button.text("Confirm Trade?");
            button.addClass("confirm");
            button.data("confirmed", true);

            // make sure not to jump anywhere yet
            event.preventDefault();
        }
    });



});