/*
<label class="skin-container">
    <input type="checkbox">
    <span class="custom-checkbox"></span>
    <img alt="skin picture" src="../assets/images/skins/revolver.png" >
</label>
 */

$(document).ready(function(){ 
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("user")
    //check db for name
    const name = "sbomb100"


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
        $('#offer-button').hide();
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
    $(".offer-button").click(function(event){ 
        button = $(this);
        badge = $("#notificationBadge");
        if (button.data("confirmed") === true) {

            alert("Sending Offer...");
            let count = parseInt(localStorage.getItem("notificationCount"))
            if (count == 0){
                $('.inbox-flex').empty()
            }
            //put in trade request pop ups
            $('.inbox-flex').append(`
                <li>Trade Sent to ${name}</li>
                `);
            

            button.data("confirmed", false);
            button.text("Send Trade Offer");
            button.removeClass("confirm");
            
            
            count++;
            localStorage.setItem("notificationCount", count); // Save it
            badge.text(count);
            badge.show();

        } else if ($(".skins-grid input[type='checkbox']:checked").length == 0 &&
            $(".skins-grid input[type='checkbox']:checked").length == 0) {
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