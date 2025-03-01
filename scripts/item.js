$(document).ready(function(){ 
    const urlParams = new URLSearchParams(window.location.search);
    const item = urlParams.get("item");
    //HIDE SELL BUTTON IF NOT IN INVENTORY (REQUIRED DB CHECK)
    // if(!item){
    //     $(".container").empty();
    //     $(".container").append("<h1><strong>No Such Item Found</strong></h1>");
    // }
    var imageInDB = "../assets/images/skins/revolver.png"
    itemNameFromDB = "Filler Gun | Filler Skin"
    value = 0
    if (item == "011101"){
        imageInDB = "../assets/images/skins/shotgun.png"
        itemNameFromDB = "MAG-7 Sonar"
        value = 1.01
    }
    //TODO CHECK IF API USES SKIN IDS INSTEAD


    $("#skin-name").text(itemNameFromDB)
    $("#crate-name").text("TODO Fetch Crate from DB")
    $(".item-image").attr("src", imageInDB)
    
    $("#value").text(`Estimated Value: $${value.toFixed(2)}`)

    $(".sell-btn").click(function(){
        let $button = $(this);
        if ($button.data("confirmed") === true) {
            $button.text("Sold");
            $button.removeClass("confirm");
            $button.data("confirmed", false);
            $button.prop("disabled", true);
            $button.css("pointer-events", "none");
            $button.css("background-color", "grey");
        } else {
            // set button to confirm state
            $button.text("Confirm Sell?");
            $button.addClass("confirm");
            $button.data("confirmed", true);

            // make sure not to jump anywhere yet
            event.preventDefault();
        }
    });
    $(document).on("click", function(event){
        if ($(event.target).is(".skin-body")) {  // Ensure only the background is targeted
            $(".skin-body").fadeOut();
        }
    });
});