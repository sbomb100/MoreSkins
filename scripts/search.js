$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");
    let normalizedQuery = searchQuery.toLowerCase().replace(/\s+/g, '').replace('|', '').trim();
    if (searchQuery){
        $("#results-header").html("<h2>Showing results for: " + searchQuery + "</h2>");
        if (searchQuery === "sbomb100"){
            $('#search-error').hide();
            $("#results").append(`
                <li>
                    <div>
                        <p data-id="2312312">sbomb100</p>
                        <p>Value: $0.10</p>
                    </div>
                    <button class="search-nav">Go To Page</button>
                </li>
                
                `);
        } else if (normalizedQuery.toLowerCase() === "mag-7sonar"){
            $('#search-error').hide();
            $("#results").append(`
                <li>
                    <div>
                        <p data-item="011101">MAG-7 | Sonar</p>
                        <p>Value: $0.10</p>
                    </div>
                    <button class="search-nav">Go To Page</button>
                </li>
                
                `);
        } else {
            $('#results').hide();
            $('#search-error').text("No results found for '" + searchQuery + "'. Try searching for 'sbomb100' or 'mag-7 sonar' .").show();

        }
    } else {
        $("#results-header").html("<h2>Please Search for a User Name</h2>");
        $('#results').hide();
        $('#search-error').text("Try searching for 'sbomb100'.").show();
    }

    $(".search-nav").click(function() {
        const username = $(this).parent().find('div p:first-child').data("id");
        const item = $(this).parent().find('div p:first-child').data("item");
        var url = ""
        if (username){
            url = `user.html?user=${(username)}`;
        } else if (item){
            url = `item.html?item=${(item)}`;
        } else {
            url = "./home.html"
        }
         
        window.location.href = url;
    });

});