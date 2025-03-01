
$(document).ready(function(){ 
    //fetch crate data
    const urlParams = new URLSearchParams(window.location.search);
    const crateName = urlParams.get("crate");
    const actual_name = crateName.replace(/_/g, " ") 
        .split(" ") 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    //fill with skins from case
    const skinsByRarity = {
        "blue": ["MAG-7 | Sonar", "CZ75-Auto | Polymer", "MP7 | Cirrus", "P2000 | Turf",
            "MP9 | Sand Scale", "Glock-18 | Ironwork", "Galil AR | Black Sand"],
        "purple": ["G3SG1 | Stinger", "Nova | Gila", "Dual Berettas | Royal Consorts",
            "M4A1-S | Flashback", "USP-S | Cyrex"],
        "pink" : ["Sawed-Off | Wasteland Princess", "P90 | Shallow Grave", "FAMAS | Mecha Industries"],
        "red": ["SSG 08 | Dragonfire", "M4A4 | Buzz Kill"],
        "gold": ["Glove Case Gloves"] //randomly roll the type if hit -> x different kinds (24 in glove case)
    };
    
    if (actual_name){
        $("#crate-title").text(name);
    }
    
    
    $(".spin-box").hide();
    $("#pointer").hide()
    //TODO MAKE SURE MATCH CRATE IN DB
     if (!crateName){
         $(".container").empty();
         $(".container").append("<h1><strong>No Such Crate Found</strong></h1>");
     }

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

    //chosen skin
    //start the spin
    $("#carousel").empty();
    $("#carousel").css("transform", "none");
    $("#carousel").css("transform", "translateX(0px)");
    //pad a few skins just for the sake of having room to roll
    const generatedskins = [generateSkin(), generateSkin(), 
        generateSkin(), generateSkin(), generateSkin(),
        generateSkin(), generateSkin(), generateSkin(), 
        generateSkin(), generateSkin(), generateSkin(),
        generateSkin(), generateSkin(), generateSkin(),
        generateSkin(), generateSkin(), generateSkin(),
        generateSkin(), generateSkin(), generateSkin(), 
        ];
    const soonestDrop = 5
    var rewardIndex = 0;
    rewardIndex = Math.floor(Math.random() * (generatedskins.length - soonestDrop + 1)) + soonestDrop;
    $.each(generatedskins, function(index, value){
            imgInDB = "../assets/images/skins/revolver.png";
            //TODO switch statement for better border colors.

            //if its the labelled reward skin go to that
            if (index == rewardIndex){
                $("#carousel").append(`<div id="reward">
                    <img  class="skin" style="border: 3px solid ${value.rarity};" alt="${value.skin}" src="${imgInDB}">
                    </div>`);
            } else {
                $("#carousel").append(` <div>
                    <img class="skin" style="border: 3px solid ${value.rarity};" alt="${value.skin}" src="${imgInDB}">
                    </div>`);
            }
            
    });
    $(".spin-box").show();
    $("#pointer").show()
    //disable button for 5 seconds during spin
    $("#spin-btn").prop("disabled", true);
    $("#spin-btn").css("background-color", "grey");
    setTimeout(() => {
        $("#spin-btn").prop("disabled", false);
        $("#spin-btn").css("background-color", "#dd1b1b");
    }, 2000);
    $("#result").text("Rolling...");
    console.log(generatedskins)
        //NOTES:
        //how to make the "first item" put into the center of the carousel (also have arrow in c)
        //how to speed up the animation to be a faster without tearing
        //jitter back (first item gets moved to last but still is being effected by margin)
        //not fully panning, skipping to next image
        //
        var $finalSlide = $('#carousel').find('#reward');
        var interval = window.setInterval(rotateSlides, 150)
  
        function rotateSlides(){
            var $firstSlide = $('#carousel').find('div:first');
            //moves backwards when holding the last slide
            var width = Math.round($firstSlide.width()); //247.017
            console.log(width)
            $firstSlide.animate({marginLeft: -width}, 100, function(){
                var $lastSlide = $('#carousel').find('div:last')
                $lastSlide.after($firstSlide);
                $firstSlide.css({marginLeft: 0})
                var $currentSlide = $('#carousel').find('div:first');
                if($currentSlide.is($finalSlide)) {
                    window.clearInterval(interval);
                }
            })
            
        }
        setTimeout(() => {
            let reward = $("#reward").next().find("img").attr("alt");
            $("#result").text(reward)

            value = 1.01;
            $("#modalContainer").load("skin-modal.html", function() {
                $("#skin-name").text(reward);
                $("#crate-name").text(actual_name);
                $("#value").text(`Estimated Value: $${value.toFixed(2)}`);
                $(".skin-body").fadeIn();
            });
        }, rewardIndex*375); 
    });//6 -> 17

});
