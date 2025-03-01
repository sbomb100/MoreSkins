$(document).ready(function(){ 
    const urlParams = new URLSearchParams(window.location.search);
    const crateName = urlParams.get("crate");
    if (crateName){
        const actual_name = crateName.replace(/_/g, " ") 
            .split(" ") 
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        
        $("#crate-text").text(actual_name);
    }
    $(".crate-btn").click(function() {
        const crate_name = $(this).parent()
            .find('p').text().toLowerCase().replace(/\s+/g, "_");

        const userURL = `crate.html?crate=${(crate_name)}`;
        window.location.href = userURL;
    });
    $(".buy-button").click(function(){
        const userURL = `spin-item.html?crate=${(crateName)}`;
        window.location.href = userURL;
    });
});