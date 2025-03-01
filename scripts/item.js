$(document).ready(function(){ 
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