$(document).ready(function(){ 
    //TODO SET UP PAGE BASED ON USER'S PROFILE IN DB
    $(".add-to-show-btn").each(function(){
        let button = $(this)
        let container = button.closest("div");
        if (container.attr("data-inshow")  === "true" && button.attr("data-confirmed") === "true"){
            //SECOND CLICK ON REMOVING SHOWCASE ITEM
            button.css("background", "red");
            button.text("X");
            
        } else if (container.attr("data-inshow")  === "false" && button.attr("data-confirmed") === "true") {
            //SECOND CLICK ON ADDING SHOWCASE ITEM
            button.css("background", "green");
            button.text("✔");
            var storedHTML = localStorage.getItem('storedElement');
            if (storedHTML) {
                document.getElementById('anotherElement').innerHTML = storedHTML;
            }
        } else if (container.attr("data-inshow")  === "true" && button.attr("data-confirmed") === "false") {
            //FIRST CLICK ON REMOVING SHOWCASE ITEM
            button.css("background", "#000000ad");
            button.text("-");
        } else if (container.attr("data-inshow")  === "false" && button.attr("data-confirmed") === "false") { 
            //FIRST CLICK ON ADDING SHOWCASE ITEM
            button.css("background", "#000000ad");
            button.text("+");
        } else {
            console.log("Invalid Profile Action");
        }
    });
});
$(document).on("click", ".add-to-show-btn", function() {
    let button = $(this)
    let container = button.closest("div");
    if (container.attr("data-inshow")  === "true" && button.attr("data-confirmed") === "true"){
        //SECOND CLICK ON REMOVING SHOWCASE ITEM

        //is the showcase verision
        if (container.parent().hasClass("showcase-flex")){
            //update other version, delete self
            let active = $(".activity-flex").find(`.skin-container[data-inshow="true"][data-id="${container.data("id")}"]`);
            var activeButton = active.children().eq(1);
            active.attr("data-inshow", "false");
            activeButton.attr("data-confirmed", "false");
            activeButton.css("background", "#000000ad");
            activeButton.text("+");
            container.remove();
            
        } else {
            container.attr("data-inshow", "false");
            button.attr("data-confirmed", "false");
            button.css("background", "#000000ad");
            button.text("+");
            $(".showcase-flex").find(`.skin-container[data-inshow="true"][data-id="${container.data("id")}"]`).remove();
        }
        
    } else if (container.attr("data-inshow")  === "false" && button.attr("data-confirmed") === "true") {
        //SECOND CLICK ON ADDING SHOWCASE ITEM
        container.attr("data-inshow", "true");
        button.attr("data-confirmed", "false");
        button.css("background", "#000000ad");
        button.text("-");
        var clonedContainer = container.clone();
        $(".showcase-flex").append(clonedContainer);

    } else if (container.attr("data-inshow")  === "true" && button.attr("data-confirmed") === "false") {
        //FIRST CLICK ON REMOVING SHOWCASE ITEM
        console.log("Item Removed");
        button.css("background", "red");
        button.text("X");
        button.attr("data-confirmed", "true");
    } else if (container.attr("data-inshow")  === "false" && button.attr("data-confirmed") === "false") { 
        //FIRST CLICK ON ADDING SHOWCASE ITEM
        console.log("Item Added to Showcase");
        button.css("background", "green");
        button.text("✔");
        button.attr("data-confirmed", "true");
    } else {
        console.log("Invalid Profile Action");
    }
});