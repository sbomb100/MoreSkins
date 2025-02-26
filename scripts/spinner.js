
$(document).ready(function(){ 
    //fetch crate data
    const urlParams = new URLSearchParams(window.location.search);
    const crateName = urlParams.get("crate");

    //fill with skins from case
    const name = "Glove Case"
    

    if (name){
        $("#crate-title").text(name);
    }
    $(".spin-container").hide();
    $("#pointer").hide()
    //TODO UNCOMMENT
    // if (!crateName){
    //     $(".container").empty();
    //     $(".container").text("No Such Crate Found");
    // }

    //drop chances
    const BLUE_CHANCE = .7;
    const PURPLE_CHANCE = .2;
    const PINK_CHANCE = .06;
    const RED_CHANCE = .03;
    const GOLD_CHANCE = .01;
    /*
    <a href="./item.html" class="skin">
        <img class="skin" alt="${skin}" src="../assets/images/skins/revolver.png">
    </a>
    */ 
    
//update this array based on the crate on doc load
const skinsByRarity = {
    "blue": ["MAG-7 | Sonar", "CZ75-Auto | Polymer", "MP7 | Cirrus", "P2000 | Turf",
        "MP9 | Sand Scale", "Glock-18 | Ironwork", "Galil AR | Black Sand"],
    "purple": ["G3SG1 | Stinger", "Nova | Gila", "Dual Berettas | Royal Consorts",
        "M4A1-S | Flashback", "USP-S | Cyrex"],
    "pink" : ["Sawed-Off | Wasteland Princess", "P90 | Shallow Grave", "FAMAS | Mecha Industries"],
    "red": ["SSG 08 | Dragonfire", "M4A4 | Buzz Kill"],
    "gold": ["Glove Case Gloves"] //randomly roll the type if hit -> x different kinds (24 in glove case)
};
function generateSkin(){
    const rarity = rollItem();
    const skinArr = skinsByRarity[rarity]; // get the array of skins
    
    const randomSkin = skinArr[Math.floor(Math.random() * skinArr.length)]; // Pick a random skin
    return { rarity, skin: randomSkin };
}
    //get the roll for which range
    function getRandomDecimal(min, max) {
        return (Math.random() * (max - min) + min).toFixed(2);
    }
    
    function rollItem(){
        let randomNum = getRandomDecimal(0.01, 1);
        switch(true){
            case (randomNum >= 0.01 
                && randomNum < 0.71):
                //rolled a blue item
                return "blue";
            case (randomNum >= 0.71
                && randomNum <= 0.91):
                //rolled a purple
                return "purple";
            case (randomNum > 0.91
                && randomNum <= 0.96):
                //rolled a pink
                return "pink";
            case (randomNum > 0.96
                && randomNum < 0.99):
                //rolled a red
                return "red";
            case (randomNum >= 0.99 
                && randomNum <= 1):
                //rolled a gold
                return "gold";
            default:
                console.log(`Invalid value: ${randomNum}`);
                break;
        }
    }
    
$(document).on("click", "#spin-btn", function() {
    console.log("start spinning");
    //bring spinner in
    $(".spin-container").show();
    $("#pointer").show()
    //disable button for 5 seconds during spin
    $("#spin-btn").prop("disabled", true);
    $("#spin-btn").css("background-color", "grey");
    setTimeout(() => {
        $("#spin-btn").prop("disabled", false);
        $("#spin-btn").css("background-color", "#dd1b1b");
    }, 2000);


    //chosen skin
    //start the spin
    $("#spinBox").empty();
    $("#spinBox").css("transform", "none");
    $("#spinBox").css("transform", "translateX(0px)");
    //pad a few skins just for the sake of having room to roll
    
    const generatedskins = [generateSkin(), generateSkin(), 
        generateSkin(), generateSkin(), generateSkin(),
        generateSkin(), generateSkin(), generateSkin(), 
        generateSkin(), generateSkin(), generateSkin(),
        generateSkin(), generateSkin(), generateSkin(),
        generateSkin(), generateSkin(), generateSkin(),
        generateSkin(), generateSkin(), generateSkin(), 
        ];
    console.log(generatedskins)
    
    $.each(generatedskins, function(index, value){
        imgInDB = "../assets/images/skins/revolver.png";
        //TODO switch statement for better border colors.
        $("#spinBox").append(`<img class="skin" style="border: 3px solid ${value.rarity};" alt="${value.skin}" src="${imgInDB}">`);
    });
    setTimeout(() => {
        let container = $("#spinBox");
        let images = $("#spinBox img");
        let imageWidth = images.outerWidth(true); // Get the width of each image (including margin)
        
        let movedItems = 0; // Count of moved images
        let maxItems = Math.floor(Math.random() * images.length); //scrolls num-0.5 
        console.log(maxItems)
        position= Math.floor(images.length  / 2) * imageWidth;
        function moveCarousel() {
            if (movedItems >= maxItems){
                return;
            }
            
            position -= 3; // Adjust speed by changing the number
    
            if (Math.abs(position) >= imageWidth) {
                // Move the first image to the end to create a seamless loop
                container.append(container.children().first());
                position -= (imageWidth); // Reset position for seamless effect
                movedItems++;
                container.css("transform", `translateX(${position}px)`);
            }
            
            
    
            requestAnimationFrame(moveCarousel); // Smoothly continue animation
        }
        
        moveCarousel();
        
        let reward = $("#spinBox img").eq(parseInt(maxItems)).attr("alt");
        $("#result").text(reward)
        }, 100);
    });//6 -> 17

});
/*
<script>
        function openPopup(id) {
            document.getElementById(id).style.display = "block";
        }
        function closePopup(id) {
            document.getElementById(id).style.display = "none";
        }
        function confirmLogout(button) {
            if (button.dataset.confirmed === "true") {
                // Second click: Perform logout action 
                alert("Logging out...");
                location.href = "../logged-out-html/home.html";  
            } else {
                // First click: Change button to confirmation state
                button.textContent = "Confirm Logout?";
                button.classList.add("confirm");
                button.dataset.confirmed = "true";
            }
        }
        function clearNotifications() {
            const badge = document.getElementById("notificationBadge");
            badge.classList.add("hidden"); // Hide the badge
        }
        //TEMPORARY, LATER WILL INVOLVE RANDOM ROLLING THE ITEM THEN DOING SPIN ANIMATION TO IT
        function startSpin() {
            const spinBox = document.getElementById("spinBox");
            let randomOffset = -((Math.floor(Math.random() * 5)) * 170); // Adjust for skin width + margin
            spinBox.style.transform = `translateX(${randomOffset * .1}em)`;
        }
    </script> */