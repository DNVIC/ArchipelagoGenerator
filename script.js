function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase() //Taken from https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
    }).replace(/\s+/g, '')
}

function starExists(data) {
    starList = data["Stars"]
    for(var star in starList) {
        if(starList[star]["exists"]) {
            return true
        }
    }
    if(data["Cannon"]["exists"] || data["Troll Star"]["exists"]) {
        return true
    }
        
    return false
}

function convertOldRequirementsToString(data) {
    requirementStrings = []
    starRequirement = data["StarRequirement"]
    requirements = data["Requirements"]
    conditionalRequirements = data["ConditionalRequirements"]
    if(starRequirement) {
        if (starRequirement != '0' && starRequirement != '') { //useless requirement since you always have at least 0 stars
            requirementStrings.push(`|Stars:${starRequirement}|`)
        }
    }
    if(requirements) {
        if (requirements.length != 0) {
            requirements.forEach((requirement, index) => {
                requirements[index] = `|${requirement}|`
            })
            requirementStrings.push(requirements.join(" and "))
        }
    }
    if(conditionalRequirements) {
        if(conditionalRequirements.length != 0) {
            requirementList = []
            conditionalRequirements.forEach((requirement, index) => {
                conditionalRequirementStrings = []
                starRequirement = requirement["StarRequirement"]
                if (starRequirement) {
                    if (starRequirement != '0' && starRequirement != '') {
                        conditionalRequirementStrings.push(`|Stars:${starRequirement}|`)
                    }
                }
                requirements = requirement["Requirements"]
                if(requirements) {
                    if(requirements.length != 0) {
                        requirements.forEach((requirement, index) => {
                            requirements[index] = `|${requirement}|`
                        })
                        conditionalRequirementStrings.push(requirements.join(" and "))
                    }
                }
                if(conditionalRequirementStrings.length == 1) {
                    requirementList.push(conditionalRequirementStrings.join(" and ")) // no redundant parentheses
                } else {
                    requirementList.push(`(${conditionalRequirementStrings.join(" and ")})`)
                }
            })
            requirementStrings.push(`(${requirementList.join(" or ")})`)
        }
    }
    return requirementStrings.join(" and ")
}

var jsonedited = false

function onBeforeUnloadHandler() {
    if(jsonedited) {
        console.log(jsonedited)
        return "JSON edited but not saved, are you sure you want to leave the page?"
    }
    return ""
}

$(function() {

    function setDarkMode(darkmode) {
        if (darkmode) {
            $("#css").attr("href", "darktheme.css")
            $("#darkmode").prop("checked", true)
        } else {
            $("#css").attr("href", "lighttheme.css")
            $("#darkmode").prop("checked", false)
        }
    }

    darkmode = localStorage.getItem("darkmode")
    setDarkMode(darkmode === 'true' /*javascript is a beautiful language*/)

    defaultOptions = [ //difficulty options + common glitches/exploits
        "reasonable",
        "obscure",
        "hard",
        "Bomb Clips",
        "BLJs",
        "Chuckya Clips",
        "Bomb Walking",
        "Major Skips",
        "Framewalks"
    ]
    
    offsetToCourseName = {
        "8": "Overworld",
        "12": "Course 1",
        "13": "Course 2",
        "14": "Course 3",
        "15": "Course 4",
        "16": "Course 5",
        "17": "Course 6",
        "18": "Course 7",
        "19": "Course 8",
        "20": "Course 9",
        "21": "Course 10",
        "22": "Course 11",
        "23": "Course 12",
        "24": "Course 13",
        "25": "Course 14",
        "26": "Course 15",
        "27": "Bowser 1",
        "28": "Bowser 2",
        "29": "Bowser 3",
        "30": "Slide",
        "31": "Metal Cap",
        "32": "Wing Cap",
        "33": "Vanish Cap",
        "34": "Secret 1",
        "35": "Secret 2",
        "36": "Secret 3"
    }

    propToItemName = {
        "key1": "Key 1",
        "key2": "Key 2",
        "wc": "Wing Cap",
        "vc": "Vanish Cap",
        "mc": "Metal Cap",
        "moat": "Castle Moat"
    }

    badgeToItemName = {
        "sb": "Super Badge",
        "ub": "Ultra Badge",
        "wb": "Wall Badge",
        "tb": "Triple Jump Badge",
        "lb": "Lava Badge"
    }
    
    
    locationData = {
        "Course 1": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Course 2": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Course 3": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Course 4": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Course 5": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Course 6": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Course 7": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Course 8": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Course 9": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Course 10": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Course 11": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Course 12": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Course 13": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Course 14": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Course 15": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Bowser 1": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Bowser 2": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Bowser 3": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Slide": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Secret 1": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Secret 2": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Secret 3": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Metal Cap": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Wing Cap": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Vanish Cap": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Overworld": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}, "Troll Star": {"exists": false}, "Sign": {"exists": false}},
        "Other": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": true}], "Settings":{}}, // last is always true because it's victory and you need a victory condition.
    }
    
    $("#inputbutton").click(function() {
        var file = $('#jsmlfile').prop('files')[0]
        var reader = new FileReader()

        reader.addEventListener('load', function() {
            var filename = $('#jsmlfile').val().split('\\').pop()
            if(filename.endsWith(".json")) {
                locationData = JSON.parse(reader.result)
                if(!(reader.result.includes("Settings"))) {             //super backwards compatibility, may be liable to remove in the future because this is so far back
                    locationData["Other"]["Settings"] = {"cannons": true, "prog_key": 0} 
                    for(const course of Object.keys(locationData)) {
                        locationData[course]["Cannon"] = {"exists": false}
                    }
                } else {
                    settings = locationData["Other"]["Settings"]
                    if(Array.isArray(settings)) {
                        settings = {"cannons": locationData["Other"]["Settings"].includes("cannons"), "prog_key": 0}
                        for(const course of Object.keys(locationData)) {
                            locationData[course]["Troll Star"] = {"exists": false}
                            locationData[course]["Sign"] = {"exists": false}
                        }
                    }
                    if (!("Version" in locationData["Other"]["Settings"])) {
                        locationData["Other"]["Settings"]["Version"] = "v0.5" //maybe i should have done this a while ago
                        for (const[course, data] of Object.entries(locationData)) {
                            
                            if(!("Troll Star" in data)) { // somehow some JSONS *still* do not have some course with troll stars (probably due to people manually editing them for some reason (PLEASE dont do this, tell me if you run into a problem with the editor))
                                locationData[course]["Troll Star"] = {"exists": false}
                            }
                            locationData[course]["Sign"] = {"exists": false}
                            if(starExists(data)) {
                                for(i = 0; i < data["Stars"].length; i++) {
                                    if (data["Stars"][i]["exists"]) {
                                        locationData[course]["Stars"][i]["Requirements"] = convertOldRequirementsToString(data["Stars"][i])
                                        delete locationData[course]["Stars"][i]["StarRequirement"]
                                        delete locationData[course]["Stars"][i]["ConditionalRequirements"]
                                    }
                                }
                                if(course != "Other") {
                                    locationData[course]["Requirements"] = convertOldRequirementsToString(data)
                                    locationData[course]["Cannon"]["Requirements"] = convertOldRequirementsToString(data["Cannon"])
                                    locationData[course]["Troll Star"]["Requirements"] = convertOldRequirementsToString(data["Troll Star"])
                                    
                                    delete locationData[course]["StarRequirement"]
                                    delete locationData[course]["ConditionalRequirements"]
                                    delete locationData[course]["Cannon"]["StarRequirement"]
                                    delete locationData[course]["Cannon"]["ConditionalRequirements"]
                                    delete locationData[course]["Troll Star"]["StarRequirement"]
                                    delete locationData[course]["Troll Star"]["ConditionalRequirements"]
                                }
                            }
                        }
                    }
                    locationData["Other"]["Settings"] = settings
                    if(locationData["Other"]["Macros"]) {
                        for (const [key, value] of Object.entries(locationData["Other"]["Macros"])) {
                            addMacro(key, value)
                        }
                    }
                    if(locationData["Other"]["Options"]) {
                        locationData["Other"]["Options"].forEach(option => {
                            addOption(option)
                        })
                    }
                    for(const[course, data] of Object.entries(locationData)) { //early so i can add entrances early
                        if (course != "Other") { // other course doesnt actually exist
                            $(".entrance").append(`<option>${course}</option>`)
                        }
                    }
                    if(locationData["Other"]["Entrances"]) {
                        locationData["Other"]["Entrances"].forEach(entrance => {
                            addEntrance(...entrance)
                        })
                    }
                }
                $("#progressivekeys").val(locationData["Other"]["Settings"].prog_key)
            } else if(filename.endsWith(".jsml")) {
                var result = JSON.parse(reader.result) // Parse the result into an object
                courses = result.courseDescription.concat(result.secretDescription)
                var cannons = result.starsShown == 7
                if(cannons) {
                    locationData["Other"]["Settings"].cannons = true
                } else {
                    locationData["Other"]["Settings"].cannons = false
                    for (var i in locationData) {
                        locationData[i]["Stars"].push({"exists": false})
                    }
                }
                locationData["Other"]["Settings"].prog_key = 0
                locationData["Other"]["Settings"]["Version"] = "v0.5"
                $("#progressivekeys").val(locationData["Other"]["Settings"].prog_key)
                for (var i in courses) {
                    if(offset = courses[i].offset) {
                        if(!offsetToCourseName.hasOwnProperty(offset)) {
                            var dloffset = (parseInt(offset) - 56).toString()
                            if(offsetToCourseName.hasOwnProperty(dloffset)) {
                                locationData["Other"]["Settings"].decadeslater = true
                                if(locationData[offsetToCourseName[dloffset]]["Stars"].length == 7) {
                                    var bluelist = [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}]
                                    for (var j = 0; j < 7; j++) {
                                        bluelist[j]["Requirements"] = "|@BlueStars|"
                                    }
                                    locationData[offsetToCourseName[dloffset]]["Stars"] = locationData[offsetToCourseName[dloffset]]["Stars"].concat(bluelist)
                                }
                                starMask =  courses[i].starMask % 128
                                for(var i = 0; i < 7; i++) {
                                    if(starMask % (2**(7-i)) >> (6-i)) {
                                        locationData[offsetToCourseName[dloffset]]["Stars"][13-i]["exists"] = true
                                    }
                                }
                            }
                            continue //ldd broke because there was an invisible course with offset 7
                        }
                        starMask =  cannons ? courses[i].starMask % 128 : courses[i].starMask
                        if(cannons) {
                            for(var i = 0; i < 7; i++) {
                                if(starMask % (2**(7-i)) >> (6-i)) {
                                    locationData[offsetToCourseName[offset]]["Stars"][6-i]["exists"] = true
                                }
                            }
                        } else {
                            for(var i = 0; i < 8; i++) {
                                if(starMask % (2**(8-i)) >> (7-i)) {
                                    locationData[offsetToCourseName[offset]]["Stars"][7-i]["exists"] = true
                                }
                            }
                        }
                    }
                }
                
                for(const[course, data] of Object.entries(locationData)) {
                    if (course != "Other") { // other course doesnt actually exist
                        $(".entrance").append(`<option>${course}</option>`)
                    }
                }
            }
            
            for(const[course, data] of Object.entries(locationData)) {
                if(course == "Other") {
                    continue
                }

                var course_nospace = course.split(" ").join("_")
                $("#coursestable").append("<tr id=\""+course_nospace+"\"></tr>")
                if(data["Requirements"] == "" || data["Requirements"] == undefined) {
                    $("#" + course_nospace).append("<td><p class=\"level\">" + course + "</p></tr>")
                }
                else {
                    $("#" + course_nospace).append("<td><p class=\"level modified\">" + course + "</p></tr>")
                }
                for(var star in data["Stars"]) {
                    var starpng = "gold_star"
                    if(locationData["Other"]["Settings"].decadeslater && star > 6) {
                        console.log(star)
                        starpng = "blue_star"
                    }
                    htmlData = $(`<img class="star ${star}" src=images/${starpng}.png />`)
                    if(!data["Stars"][star]["exists"]) {
                        htmlData.addClass("gray")
                    } 
                    else if ((data["Stars"][star]["Requirements"] != "" && data["Stars"][star]["Requirements"] != undefined) || (data["Stars"][star]["Area"] != 1 && data["Stars"][star]["Area"] != undefined)) {
                        htmlData.addClass("modified")
                    }
                    $("#"+ course_nospace).append($("<td></td>").append(htmlData))
                    star = data["Stars"][star]
                }
                htmlData = $("<img class=\"trollstar\" src=images/troll_star.png />")
                if(!data["Troll Star"]["exists"]) {
                    htmlData.addClass("gray")
                } else if(data["Troll Star"]["Requirements"] != "" || (data["Troll Star"]["Area"] != 1 && data["Troll Star"]["Area"] != undefined)) {
                    htmlData.addClass("modified")
                }
                
                $("#"+ course_nospace).append($("<td></td>").append(htmlData))

                
                if(locationData["Other"]["Settings"].cannons){
                    htmlData = $("<img class=\"cannon\" src=images/cannon.png />")
                    if(!data["Cannon"]["exists"]) {
                        htmlData.addClass("gray")
                    } else if(data["Cannon"]["Requirements"] != "" || (data["Cannon"]["Area"] != 1 && data["Cannon"]["Area"] != undefined)) {
                        htmlData.addClass("modified")
                    }
                }
                
                $("#"+ course_nospace).append($("<td></td>").append(htmlData))

                htmlData = $("<img class=\"sign\" src=images/sign.png />")
                if(!data["Sign"]["exists"]) {
                    htmlData.addClass("gray")
                } else if(data["Sign"]["Requirements"] != "" || (data["Sign"]["Area"] != 1 && data["Sign"]["Area"] != undefined)) {
                    htmlData.addClass("modified")
                }
                $("#"+ course_nospace).append($("<td></td>").append(htmlData))
            }
            $("#coursestable").append("<tr id=\"Other\"><td><p>Other</p></tr>")
                var i = 0
                for(const prop in propToItemName) {
                    htmlData = $("<img class= \"star " + i + "\" src=images/"+prop+".png />")

                    if(!locationData["Other"]["Stars"][i]["exists"]) {
                        htmlData.addClass("gray")
                    } else if (locationData["Other"]["Stars"][i]["Requirements"] != "" || (locationData["Other"]["Stars"][i]["Area"] != 1 && locationData["Other"]["Stars"][i]["Area"] != undefined)) {
                        htmlData.addClass("modified")
                    }
                    $("#Other").append($("<td></td>").append(htmlData))
                    i++
                }
                $("#Other").append("<td></td><td></td>")
                if(!locationData["Other"]["Settings"].cannons) {
                    $("#Other").append("<td></td>") //graphics stuff
                }
                htmlData = $("<div class=\"star 6\">Victory</div>")
                if(locationData["Other"]["Stars"][6]["Requirements"] != "" && locationData["Other"]["Stars"][6]["Requirements"] != undefined || 
                    (locationData["Other"]["Stars"][6]["Area"] != 1 && locationData["Other"]["Stars"][6]["Area"] != undefined)) {
                    htmlData.addClass("modified")
                }
                $("#Other").append("<td></td>").append(htmlData)
                i++
                if ('sr7' in locationData["Other"]["Settings"]) {
                    $("#Other").append("<td></td>") //graphics stuff
                    for(const badge in badgeToItemName) {
                        htmlData = $("<img class= \"star " + i + " badge\" src=images/"+badge+".png />")
                        if(!locationData["Other"]["Stars"][i]["exists"]) {
                            htmlData.addClass("gray")
                        } else if (locationData["Other"]["Stars"][i]["Requirements"] != "" || (locationData["Other"]["Stars"][i]["Area"] != 1 && locationData["Other"]["Stars"][i]["Area"] != undefined)) {
                            htmlData.addClass("modified")
                        }
                        $("#Other").append($("<td></td>").append(htmlData))
                        i++
                    }
                }
            $("#coursesdiv").show()
            $("#macros").show()
            $("#options").show()
            $("#tickets").parent().show()
            $("#moves").parent().show()
            $("#jsmldiv").hide()

            if(locationData["Other"]["Settings"]["Entrances"]) {
                $("#entrances").show()
                $("#tickets").prop("checked", true)
                $("#area").parent().show()
            } else {
                $("#tickets").prop("checked", false)
                $("#area").parent().hide()
            }
            if(locationData["Other"]["Settings"]["Moves"]) {
                $("#moves").prop("checked", true)
            } else {
                $("#moves").prop("checked", false)
            }
        })
        reader.readAsText(file)
    })

    function fillForm(data) {
        $("#requirements").removeAttr("disabled")
        $("#area").removeAttr("disabled")
        $("#requirements").val(data["Requirements"])
        if(!data["Comment"]) {
            data["Comment"] = ""
        }
        $("#comment").val(data["Comment"])
        if(!data["Area"]) {
            data["Area"] = "1" //default
        }
        $("#area").val(data["Area"])
        if(data["Level"] != undefined) {
            $("#level").val(data["Level"])
        } else {
            $("#level").val("")
        }
        if(data["Overworld"] === true) {
            $("#overworld").prop("checked", true)
        } else {
            $("#overworld").prop("checked", false)
        }
        $("#overworld").parent().hide()
    }

    $(document).on("click", ".cannon", function() {
        saveinfo()
        course = $(this).closest("tr").find("p").text()
        $(".selected").removeClass("selected")
        $(this).addClass("selected")
        $("#actspecificspan").hide()

        if(!$("#exists").length)  {
            $("#exists").removeAttr("disabled")
            $("#selecteditem").text(`Selected: ${course} Cannon`)
            $("<input id=\"exists\" type=\"checkbox\"><label id=existslabel for=\"exists\"> Exists</label> <br id=existsbr>").insertBefore("#key1")
        } else {
            $("#selecteditem").text(`Selected: ${course} Cannon`)
        }
        
        cannon = locationData[course]["Cannon"]
        fillForm(cannon)
        if(cannon["exists"]) {
            $("#exists").prop("checked", true)
        } else {
            $("#exists").prop("checked", false)
        }
    })

    $(document).on("click", ".star", function() {
        saveinfo()
        course = $(this).closest("tr").find("p").text()
        $(".selected").removeClass("selected")
        $(this).addClass("selected")
        starId = parseInt($(this)[0].classList[1])
        if(course == "Other") {
            
            if($("#tickets").prop("checked")) {
                $("#level").parent().show()
            }
            $("#actspecificspan").hide()
            if($(this).text() == "Victory") {
                $("#selecteditem").text("Selected: Victory")
                $("#exists").attr("disabled", true)
            } else if ($(this).hasClass("badge")) {
                $("#exists").removeAttr("disabled")
                $("#selecteditem").text("Selected: " + Object.entries(badgeToItemName)[starId - 7][1])
            } else {
                $("#exists").removeAttr("disabled")
                $("#selecteditem").text("Selected: " + Object.entries(propToItemName)[starId][1])
            }
        } else if (course != "Other") {
            $("#exists").removeAttr("disabled")
            if(!$("#exists").length)  {
                $("#selecteditem").text("Selected: " + Object.entries(propToItemName)[starId][1])
                $("<input id=\"exists\" type=\"checkbox\"><label id=existslabel for=\"exists\"> Exists</label> <br id=existsbr>").insertBefore("#key1")
            }
            if(locationData["Other"]["Settings"].decadeslater && starId > 6) {
                $("#selecteditem").text(`Selected: ${course} Blue Star ${starId - 6}`)
            }
            else {
                $("#selecteditem").text(`Selected: ${course} Star ${starId + 1}`)
            }
            $("#actspecificspan").show()
        }
        
        star = locationData[course]["Stars"][starId]
        fillForm(star)
        if(star["exists"]) {
            $("#exists").prop("checked", true)
        } else {
            $("#exists").prop("checked", false)
        }
    })

    $(document).on("click", ".trollstar", function() {
        saveinfo()
        course = $(this).closest("tr").find("p").text()
        $(".selected").removeClass("selected")
        $(this).addClass("selected")
        starId = parseInt($(this)[0].classList[1])
        $("#actspecificspan").hide()
        $("#exists").removeAttr("disabled")
        $("#selecteditem").text("Selected: " + course + " Troll Star")
        
        star = locationData[course]["Troll Star"]
        fillForm(star)
        if(star["exists"]) {
            $("#exists").prop("checked", true)
        } else {
            $("#exists").prop("checked", false)
        }
    })
    $(document).on("click", ".sign", function() {
        saveinfo()
        course = $(this).closest("tr").find("p").text()
        $(".selected").removeClass("selected")
        $(this).addClass("selected")
        starId = parseInt($(this)[0].classList[1])
        $("#actspecificspan").hide()
        $("#exists").removeAttr("disabled")
        $("#selecteditem").text("Selected: " + course + " Sign")
        
        star = locationData[course]["Sign"]
        fillForm(star)
        if(star["exists"]) {
            $("#exists").prop("checked", true)
        } else {
            $("#exists").prop("checked", false)
        }
    })

    $(document).on("click", ".level", function() {
        saveinfo()
        $("#actspecificspan").hide()
        $(".selected").removeClass("selected")
        $(this).addClass("selected")
        $(".removecannon").click()
        $("#selecteditem").text("Selected: " + $(this).text())
        $("#exists").attr("disabled", true)
        $("#exists").prop("checked", true)
        course = locationData[$(this).text()]
        fillForm(course)
        if($("#tickets").prop("checked")) {
            $("#requirements").attr("disabled", true)
            $("#area").attr("disabled", true)
            $("#overworld").parent().show()
        }
    })

    function saveinfo() {
        //settings
        locationData["Other"]["Settings"].prog_key = parseInt($("#progressivekeys").find(":selected").val())
        jsonedited = true

        //star stuff
        if(!($(".selected")[0])) {
            return
        }
        if($(".selected").is("p")) {
            course = locationData[$(".selected").text()]
            course["StarRequirement"] = $("#starrequirement").val()
            course["Requirements"] = $("#requirements").val()
            course["Overworld"] = $("#overworld").prop("checked")
            course["Comment"] = $("#comment").val()
        } else if($(".selected").hasClass("cannon")) {
            course = $(".selected").closest("tr").find("p").text()
            cannon = locationData[course]["Cannon"]
            cannon["exists"] = $("#exists").prop("checked")            
            cannon["Requirements"] = $("#requirements").val()
            cannon["Area"] = $("#area").val()
            cannon["Comment"] = $("#comment").val()
        } else if($(".selected").hasClass("trollstar")) {
            course = $(".selected").closest("tr").find("p").text()
            star = locationData[course]["Troll Star"]
            star["exists"] = $("#exists").prop("checked")
            star["Requirements"] = $("#requirements").val()
            star["Area"] = $("#area").val()
            star["Comment"] = $("#comment").val()
        } else if($(".selected").hasClass("sign")) {
            course = $(".selected").closest("tr").find("p").text()
            star = locationData[course]["Sign"]
            star["exists"] = $("#exists").prop("checked")
            star["Requirements"] = $("#requirements").val()
            star["Area"] = $("#area").val()
            star["Comment"] = $("#comment").val()
        } else {
            course = $(".selected").closest("tr").find("p").text()
            starId = parseInt($(".selected")[0].classList[1])
            star = locationData[course]["Stars"][starId]
            star["exists"] = $("#exists").prop("checked")
            if(course == "Other") {
                star["Level"] = $("#level").val()
                if(star == 6){
                    star["exists"] = true //safety to ensure victory alwasys exists
                }
            }
            star["Requirements"] = $("#requirements").val()
            star["Area"] = $("#area").val()
            star["Comment"] = $("#comment").val()
        }

        //graphics stuff
        if($("#requirements").val() != "" || $("#area").val() != 1) {
            $(".selected").addClass("modified")
        } else {
            $(".selected").removeClass("modified")
        }
        $("#level").parent().hide()
    }
    validItems = [
        "Key 1", 
        "Key 2", 
        "Wing Cap", 
        "Vanish Cap", 
        "Metal Cap", 
        "Course 1 Cannon",
        "Course 2 Cannon",
        "Course 3 Cannon",
        "Course 4 Cannon",
        "Course 5 Cannon",
        "Course 6 Cannon",
        "Course 7 Cannon",
        "Course 8 Cannon",
        "Course 9 Cannon",
        "Course 10 Cannon",
        "Course 11 Cannon",
        "Course 12 Cannon",
        "Course 13 Cannon",
        "Course 14 Cannon",
        "Course 15 Cannon",
        "Bowser 1 Cannon",
        "Bowser 2 Cannon",
        "Bowser 3 Cannon",
        "Slide Cannon",
        "Secret 1 Cannon",
        "Secret 2 Cannon",
        "Secret 3 Cannon",
        "Metal Cap Cannon",
        "Wing Cap Cannon",
        "Vanish Cap Cannon",
        "Overworld Cannon",
        "Super Badge",
        "Ultra Badge",
        "Wall Badge",
        "Triple Jump Badge",
        "Lava Badge",
        "Overworld Cannon Star",
        "Bowser 2 Cannon Star",
        "Yellow Switch",
        "Black Switch",
        "Gray Switch",
        "Castle Moat",
        "Jump",
        "Double Jump",
        "Triple Jump",
        "Long Jump",
        "Backflip",
        "Sideflip",
        "Wallkick",
        "Dive",
        "Ground Pound",
        "Kick",
        "Punch",
        "Slidekick",
        "Shell",
        "Actspecific"
    ]

    function evaluateNestedMacros(macroData, seenMacros, macrolist) {
        let macroregex = /(\|@[^|]*\|)/g //matches each macro encased in |@ |
        let macros = macroData.match(macroregex)
        
        for(let macro in macros) {
            if(!macrolist.hasOwnProperty(macros[macro].slice(2, -1))) {
                return [-2, macros[macro]] //macro does not exist
            }
            if(seenMacros.includes(macros[macro])) {
                return [-1, macros[macro]] //macro has been seen already
            }
            let nestedSeenMacros = structuredClone(seenMacros) //you can have repeats as long as they are in different "branches" not in a loop. deep copy as dont want other branches editing it
            nestedSeenMacros.push(macros[macro])
            let nestedMacroData = macrolist[macros[macro].slice(2,-1)]
            let evaluatedNestedMacro = evaluateNestedMacros(nestedMacroData, nestedSeenMacros, macrolist)
            if(evaluatedNestedMacro[0] != 0) {
                return evaluatedNestedMacro
            }
            macroData = macroData.replace(macros[macro], `(${evaluatedNestedMacro[1]})`)
        }
        return [0, macroData]
    }

    function parseRequirementString(string) {
        if(string == undefined) {
            return "" //just in case
        }
        if(string == "") {
            return "" //empty string always valid
        }
        output = string


        let macrolist = getMacros()
        if(macrolist == -1) {
            return `Duplicate Macros detected`
        }


        let evaluatedMacro = evaluateNestedMacros(output, [], macrolist)
        if(evaluatedMacro[0] == -1) {
            return `Recursion in macros not allowed. Problematic macro: ${evaluatedMacro[1].slice(2, -1)}`
        }
        if(evaluatedMacro[0] == -2) {
            return `Invalid macro: ${evaluatedMacro[1].slice(2,-1)}`
        }
        output = evaluatedMacro[1]

        itemregex = /(\|[^|]*\|)/g //matches each item encased in ||
        items = output.match(itemregex)
        let options = getOptions().concat(defaultOptions)
        if(new Set(options).size != options.length) {
            return `Duplicate option names`
        }

        for(item in items) { //ensure items are valid
            output = output.replace(items[item], item) //replace item name with numbers
            item_text = items[item].slice(1, -1)
            if(item_text.startsWith("Stars:")) {
                item_text = item_text.slice(6)
                if(!/^[0-9]+$/.test(item_text)) { //checks if the text contains numbers from 0-9; does not use \d since some implementations include number characters in other numeral systems
                    return `Invalid number of stars required: ${item_text}`
                }
            } else if(item_text.startsWith("BlueStars:")) {
                item_text = item_text.slice(10)
                if(!/^[0-9]+$/.test(item_text)) {
                    return `Invalid number of blue stars required: ${item_text}`
                }
            } else if(item_text.startsWith("TotalStars:")) {
                item_text = item_text.slice(11)
                if(!/^[0-9]+$/.test(item_text)) {
                    return `Invalid number of total stars required: ${item_text}`
                }
            } 
            else if (item_text.startsWith("!") || item_text.startsWith("?")) {
                if (!(options.includes(item_text.slice(1)))) {
                    return `Invalid option: ${item_text.slice(1)}`
                }
            } else if (item_text.startsWith("#")) {
                [course, area] = item_text.slice(1).split(":")
                if(!Object.values(offsetToCourseName).includes(course)) {
                    return `Invalid course: ${course}`
                }
                if(Number.isNaN(parseInt(area))) {
                    return `Invalid/missing zone id: ${area}`
                }
            } else {
                if (!(validItems.includes(item_text))) {
                    return `Invalid item: ${item_text}`
                }
            }
        }
        //ensure expression is valid
        regex = / and /gi //matches ' and '
        output = output.replaceAll(regex, '&')
        regex = / or /gi // matches ' or '
        output = output.replaceAll(regex, '|')
        invalidcharacters = /[^0-9\(\)\|&]+/g //matches any non-numeric character which isn't ()|&
        invalid = output.match(invalidcharacters)
        if(invalid) {
            return `Unexpected character(s): ${invalid.join('')}`
        }

        // convert infix to postfix to ensure parentheses are correct
        operand = /[0-9]/


        stack = []
        result = []
        for (i = 0; i < output.length; i++) {
            character = output[i]
            str = ""
            if (character.match(operand)) {
                str += character
                while(output[i+1] && output[i+1].match(operand)) {// incase more than 10 items for whatever reason
                    str += output[++i]
                }
                result.push(str)
            }
            else if (character == '(') {
                if ((i != 0 && output[i-1] != '&' && output[i-1] != '|' && output[i-1] != '(') || (output[i+1] == '&' || output[i+1] == '|')) {
                    return "Too many operators (perhaps there is an extra/missing 'and' or 'or' near your parentheses)"
                }
                stack.push('(')
                continue
            }
            else if (character == ')') {
                if ((i != output.length - 1 && output[i+1] != '&' && output[i+1] != '|' && output[i+1] != ')') || (output[i-1] == '&' || output[i-1] == '|')) {
                    return "Too many operators (perhaps there is an extra/missing 'and' or 'or' near your parentheses)"
                }
                while(stack[stack.length - 1] != '(') {
                    result.push(stack.pop())
                    if(stack.length === 0) {
                        return "Mismatched Parentheses"
                    }
                }
                stack.pop()
            }
            else {
                while(stack.length > 0  && character == '|' && stack[stack.length - 1] == '&') {
                    result.push(stack.pop())
                }
                stack.push(character)
            }
        }
        while(stack.length > 0) {
            operator = stack.pop()
            if(operator == '(') {
                return "Mismatched Parentheses"
            }
            result.push(operator)
        }

        operatorcount = 0;
        operandcount = 0;
        for(i = 0; i < result.length; i++) {
            if(result[i] == '|' || result[i] == '&') {
                operatorcount++
            } else {
                operandcount++
            }
        }
        if(operandcount - operatorcount != 1) {
            return "Too many operators (perhaps there is an extra 'and' or 'or' in your string)"
        }

        return ""
    }

    function parseRequirementStrings() { //this function exists to validate the requirement string, *before* exporting, that way people dont export invalid strings, and if it is invalid to tell the user why it is invalid
        for (const[course, data] of Object.entries(locationData)) {
            stringresult = parseRequirementString(data["Requirements"])
            if(stringresult != "") {
                alert(`${course} Requirement String Invalid: ${stringresult}`)
                return false
            }
            if(starExists(data)) {
                for(let i = 0; i < data["Stars"].length; i++) {
                    stringresult = parseRequirementString(data["Stars"][i]["Requirements"])
                    if(stringresult != "") {
                        alert(`${course} Star ${i + 1} Requirement String Invalid: ${stringresult}`)
                        return false
                    }
                }
                stringresult = parseRequirementString(data?.["Cannon"]?.["Requirements"])
                if(stringresult != "") {
                    alert(`${course} Cannon Requirement String Invalid: ${stringresult}`)
                    return false
                }
                stringresult = parseRequirementString(data?.["Troll Star"]?.["Requirements"])
                if(stringresult != "") {
                    alert(`${course} Troll Star Requirement String Invalid: ${stringresult}`)
                    return false
                }
                stringresult = parseRequirementString(data?.["Sign"]?.["Requirements"])
                if(stringresult != "") {
                    alert(`${course} Sign Requirement String Invalid: ${stringresult}`)
                    return false
                }
            }
        }
        let entrances = getEntrances()
        for (let entrance of entrances) {
            stringresult = parseRequirementString(entrance[4])
            if (stringresult != "") {
                alert(`Entrance ${entrances.indexOf(entrance + 1)} invalid: ${stringresult}`)
                return false
            }
        }
        return true
    }


    $("#downloadbutton").click(function () {
        saveinfo()
        if(parseRequirementStrings()) {
            locationData["Other"]["Macros"] = getMacros()
            locationData["Other"]["Options"] = getOptions()
            locationData["Other"]["Entrances"] = getEntrances()
            locationData["Other"]["Settings"]["Moves"] = $("#moves").prop("checked")
            var downloadString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(locationData))
            $("#downloadFileWhenDone").attr("href", downloadString)
            $("#downloadFileWhenDone").attr("download", camelize($("#filename").val()) + ".json")
            $("#downloadFileWhenDone")[0].click()
        }
    })

    $(".removebutton").click(function () {
        $(this).closest("td").remove()
    })

    $("#darkmode").click(function () {
        darkmode = $(this).prop("checked")
        localStorage.setItem("darkmode", darkmode)
        setDarkMode(darkmode)
    })

    $("#exists").click(function () {
        if($(this).prop("checked")) {
            $(".selected").removeClass("gray")
        } else {
            $(".selected").addClass("gray")
        }
    })

    function addMacro(name = "", macro = "") {
        clone = $("#macrotemplate").clone(true)
        clone.removeAttr('id')
        clone.addClass("macrodata")
        clone.appendTo($("#macrotable"))
        clone.find(".macroname").val(name)
        clone.find(".macro").val(macro)
        clone.show()
        $("#macrotable").show()
    }

    $("#addmacro").click(function () {
        addMacro()
    })

    $(".removemacro").click(function () {
        $(this).parent().parent().remove()
        if($(".macrodata").length == 0) {
            $("#macrotable").hide()
        }
    })

    function getMacros() {
        let macros = {}
        $(".macrodata").each(function() {
            if(macros.hasOwnProperty($(this).find(".macroname").val())) {
                return -1 //duplicates not allowed
            }
            macros[$(this).find(".macroname").val()] = $(this).find(".macro").val()
        })
        return macros
    }

    function addOption(name = "") {
        clone = $("#optiontemplate").clone(true)
        clone.removeAttr('id')
        clone.addClass("optiondata")
        clone.appendTo($("#optiontable"))
        clone.find(".option").val(name)
        clone.show()
        $("#optiontable").show()
    }
    
    $("#addoption").click(function () {
        addOption()
    })

    $(".removeoption").click(function () {
        $(this).parent().parent().remove()
        if($(".optiondata").length == 0) {
            $("#optiontable").hide()
        }
    })

    function getOptions() {
        let options = []
        $(".optiondata").each(function() {
            options.push($(this).find(".option").val())
        })
        return options
    }

    function addEntrance(entrance1 = "", area1 = "1", entrance2 = "", area2 = "1", requirementString = "", oneway = false) {
        let clone = $("#entrancetemplate").clone(true)
        clone.removeAttr('id')
        clone.addClass("entrancedata")
        clone.appendTo($("#entrancetable"))
        clone.find(".entrance").eq(0).val(entrance1) //id use a loop if this was greater than 2
        clone.find(".entrance").eq(1).val(entrance2)
        clone.find(".area").eq(0).val(parseInt(area1))
        clone.find(".area").eq(1).val(parseInt(area2))
        clone.find(".oneway").prop("checked", oneway)
        clone.find(".entrancerequirements").val(requirementString)
        clone.find(".removeentrancetemplate").removeClass("removeentrancetemplate")
        clone.show()
        $("#entrancetable").show()
    }

    $("#addentrance").click(function () {
        addEntrance()
    })

    $(".removeentrance").click(function () {
        if($(this).hasClass("removeentrancetemplate")) {
            return //dont want to remove the template
        }
        $(this).parent().parent().remove()
        if($(".entrancedata").length == 0) {
            $("#entrancetable").hide()
        }
    })

    function getEntrances() {
        let entrances = []
        $(".entrancedata").each(function() {
            entrances.push([
                $(this).find(".entrance").eq(0).val(), 
                $(this).find(".area").eq(0).val(), 
                $(this).find(".entrance").eq(1).val(), 
                $(this).find(".area").eq(1).val(), 
                $(this).find(".entrancerequirements").val(), 
                $(this).find(".oneway").prop("checked")
            ])
        })
        return entrances
    }

    $("#tickets").click(function () {
        entrancerando = $(this).prop("checked")
        if(entrancerando) {
            locationData["Other"]["Settings"]["Entrances"] = true
            $("#entrances").show()
            $("#area").parent().show()
        } else {
            locationData["Other"]["Settings"]["Entrances"] = false
            $("#entrances").hide()
            $("#area").parent().hide()
        }
    })

    $("#sortentrances").click(function () {
        let entrances = getEntrances()
        $(".removeentrance").trigger("click")
        entrances = entrances.sort(function(a, b) {
            if(a[0] != b[0]) {
                return Object.values(offsetToCourseName).indexOf(a[0]) - Object.values(offsetToCourseName).indexOf(b[0])
            }
            if(a[1] != b[1]) {
                return parseInt(a[1]) - parseInt(b[1])
            }
            if(a[2] != b[2]) {
                return Object.values(offsetToCourseName).indexOf(a[2]) - Object.values(offsetToCourseName).indexOf(b[2])
            }
            if(a[3] != b[3]) {
                return parseInt(a[3]) - parseInt(b[3])
            }
            return 0
        })
        entrances.forEach(entrance => {
            addEntrance(...entrance)
        })
    })
})