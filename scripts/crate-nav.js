$(document).ready(function(){ 
    const urlParams = new URLSearchParams(window.location.search);
    const crateName = urlParams.get("crate");
    if (crateName){
        const actual_name = crateName.replace(/_/g, " ") 
            .split(" ") 
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        
        $("#crate-text").text(actual_name);
        //TODO CHANGE TO A DB FETCH INSTEAD
        crateImgInDB = "../assets/images/crates/crate.png"
        $(".crate-img").attr("src", crateImgInDB);

        const skinsByRarity = {
            "blue": ["MAG-7 | Sonar", "CZ75-Auto | Polymer", "MP7 | Cirrus", "P2000 | Turf",
                "MP9 | Sand Scale", "Glock-18 | Ironwork", "Galil AR | Black Sand"],
            "purple": ["G3SG1 | Stinger", "Nova | Gila", "Dual Berettas | Royal Consorts",
                "M4A1-S | Flashback", "USP-S | Cyrex"],
            "pink" : ["Sawed-Off | Wasteland Princess", "P90 | Shallow Grave", "FAMAS | Mecha Industries"],
            "red": ["SSG 08 | Dragonfire", "M4A4 | Buzz Kill"],
            "gold": ["Glove Case Gloves"] //randomly roll the type if hit -> x different kinds (24 in glove case)
        };
        for (let rarity in skinsByRarity) {
            imageInDB = "../assets/images/skins/tek9.png";
            if (skinsByRarity.hasOwnProperty(rarity)) {
                var img_class = "";
                switch (rarity.toString()){
                    case "blue":
                        img_class = "item common"
                        imageInDB = "../assets/images/skins/tek9.png";
                        break;
                    case "purple":
                        img_class = "item uncommon"
                        imageInDB = "../assets/images/skins/shotgun.png";
                        break;
                    case "pink":
                        img_class = "item rare"
                        imageInDB = "../assets/images/skins/revolver.png";
                        break;
                    case "red":
                        img_class = "item epic"
                        imageInDB = "../assets/images/skins/revolver.png";
                        break;
                    case "gold":
                        img_class = "item legendary"
                        imageInDB = "../assets/images/skins/revolver.png";
                        break;
                    default:
                        img_class = "item common"
                }
                
                console.log(`Rarity: ${rarity}`);
                const skins = skinsByRarity[rarity];

                // Loop through the skins array for this rarity
                skins.forEach(skin => {
                    //someway to put in IDS
                    $(".item-grid").append(`
                        <img alt="${skin}" class="${img_class}" src="${imageInDB}"></img>
                        `)
                });
            }
        }
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
    $(".item").click(function(){
        let weaponID = "404"
        const userURL = `item.html?item=${weaponID}`;
        window.location.href = userURL;
    });

    
});