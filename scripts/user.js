$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("user");
    console.log("Open Page");
    //account name
    if(searchQuery){
        //make user IDS for easier database look up later
        
        //this id is for user sbomb100: show his data
        if (searchQuery == "2312312"){
            $('#profile-username').text('sbomb100');
            worth = 0;
            $(".cost").each(function(){
                worth += parseFloat($(this).data("worth"));
            });

            $("#total-val").text(`Total Worth: $${worth.toFixed(2)}`).show();
            $(".showcase").show();
            $(".recent-activity").show();
        }
    } else {
        $('#profile-username').text('No Such User');
        $(".worth").hide()
        $(".showcase").hide();
        $(".recent-activity").hide();
    }

    $("#trade-offer-btn").click(function() {
        const userURL = `trading.html?user=${(searchQuery)}`;
        window.location.href = userURL;
    });

});