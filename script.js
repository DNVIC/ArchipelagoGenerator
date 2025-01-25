function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase() //Taken from https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
    }).replace(/\s+/g, '')
}

function starExists(starList) {
    for(var star in starList) {
        if(starList[star]["exists"]) {
            return true
        }
    }
    return false
}


$(function() {

    
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
        "mc": "Metal Cap"
    }
    
    
    locationData = {
        "Course 1": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Course 2": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Course 3": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Course 4": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Course 5": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Course 6": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Course 7": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Course 8": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Course 9": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Course 10": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Course 11": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Course 12": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Course 13": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Course 14": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Course 15": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Bowser 1": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Bowser 2": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Bowser 3": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Slide": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Secret 1": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Secret 2": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Secret 3": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Metal Cap": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Wing Cap": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Vanish Cap": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Overworld": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false}], "Cannon": {"exists": false}},
        "Other": {"Stars": [{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": false},{"exists": true}], "Settings":[]}, // last is always true because it's victory and you need a victory condition.
    }

    existingCannons = []
    
    $("#inputbutton").click(function() {
        var file = $('#jsmlfile').prop('files')[0]
        var reader = new FileReader()
        reader.addEventListener('load', function() {
            var filename = $('#jsmlfile').val().split('\\').pop()
            if(filename.endsWith(".json")) {
                locationData = JSON.parse(reader.result)
                if(!('settings' in locationData)) {
                    locationData["Other"]["Settings"] = ["cannons"] //backwards compatibility
                    for(const course of Object.keys(locationData)) {
                        locationData[course]["Cannon"] = {"exists": false}
                    }
                }
            } else {
                var cannons = !$('#cannons').prop("checked")
                var result = JSON.parse(reader.result) // Parse the result into an object
                courses = result.courseDescription.concat(result.secretDescription)
                for (var i in courses) {
                    if(offset = courses[i].offset) {
                        if(cannons) {
                            locationData["Other"]["Settings"].push("cannons")
                            //$("#cannonspan").show()
                        }
                        console.log(offsetToCourseName[offset])
                        starMask =  courses[i].starMask % 128
                        for(var i in locationData[offsetToCourseName[offset]]["Stars"]) {
                            if(starMask % (2**(7-i)) >> (6-i)) {
                                locationData[offsetToCourseName[offset]]["Stars"][6-i]["exists"] = true
                            }
                        }
                    }
                }
            }
            
            for(const[course, data] of Object.entries(locationData)) {
                if(course == "Other") {
                    continue;
                }

                if(starExists(data["Stars"])) {
                    var course_nospace = course.split(" ").join("_")
                    var string = course + ": "
                    $("#coursestable").append("<tr id=\""+course_nospace+"\"></tr>")
                    $("#" + course_nospace).append("<td><p class=\"level\">" + course + "</p></tr>")
                    for(var star in data["Stars"]) {
                        if(data["Stars"][star]["exists"]) {
                            string += "1 "
                            $("#"+ course_nospace).append("<td><img class=\"star "+star+"\" src=images/gold_star.png /></td>")
                        } else {
                            string += "0 "
                            $("#"+ course_nospace).append("<td><img class=\"darkstar "+star+"\" src=images/dark_star.png /></td>")
                        }
                        star = data["Stars"][star]
                    }
                    console.log(string)
                    if(locationData["Other"]["Settings"].includes("cannons")){
                        $("#" + course_nospace).append("<td><img class=\"cannon\" src=images/cannon.png /></td>")
                    }

                    
                } else {
                    $("#cannonspan").show()
                }
            }
            $("#coursestable").append("<tr id=\"Other\"><td><p>Other</p></tr>")
                var i = 0
                for(const prop in propToItemName) {
                    $("#Other").append("<td><img class= \"star " + i + "\" src=images/"+prop+".png /></td>")
                    i++
                    console.log(i)
                }
                $("#Other").append("<td></td>")
                if(locationData["Other"]["Settings"].includes("cannons")) {
                    $("#Other").append("<td></td>") //graphics stuff
                }
                $("#Other").append("<td><div class=\"star 6\">Victory</div></td>")
            $("#coursesdiv").show()
            $("#jsmldiv").hide()
        })
        reader.readAsText(file)
    })

    function fillForm(starRequirement = 0, requirements = [], conditionalRequirements = []) {
        console.log(starRequirement)
        $("#starrequirement").val(starRequirement)
        $("input[type=checkbox]").prop("checked", false)
        for(const[prop, item] of Object.entries(propToItemName)) {
            if(requirements.includes(item)) {
                $("#" + prop).prop("checked", true)
            }
        }
        requirements.forEach((i) => {
            if (i.includes("Cannon")) {
                i = i.substring(0, i.length - 7)
                $("#mainrequirements").find(".cannons").val(`${i.split(' ').join('_')}cannon`)
                $("#mainrequirements").find(".addcannonbutton").trigger("click")
            }
        })
        $(".removebutton").closest(".conditionalRequirement").remove()
        console.log(conditionalRequirements)
        for(i in conditionalRequirements) {
            requirement = conditionalRequirements[i]
            clone = $("#conditionalrequirementtemplate").clone(true)
            clone.removeAttr('id')
            clone.addClass("conditionalRequirement")
            clone.appendTo($("#mainrow"))
            clone.find("input[type=checkbox]").prop("checked", false)
            clone.find(".starrequirement").val(requirement["StarRequirement"])
            for(const[prop, item] of Object.entries(propToItemName)) {
                if(requirement["Requirements"].includes(item)) {
                    clone.find("." + prop).prop("checked", true)
                }
            }
            requirement["Requirements"].forEach((i) => {
                if (i.includes("Cannon")) {
                    i = i.substring(0, i.length - 7)
                    clone.find(".cannons").val(`${i.split(' ').join('_')}cannon`)
                    clone.find(".addcannonbutton").trigger("click")
                }
            })
            $(".conditionalRequirement").show()
        }
    }
    $(document).on("click", ".cannon", function() {
        course = $(this).closest("tr").find("p").text()
        $(".selected").removeClass("selected")
        $(this).addClass("selected")
        $(".removecannon").trigger("click")

        if(!$("#exists").length)  {
            $("#selecteditem").text(`Selected: ${course} Cannon`)
            $("<input id=\"exists\" type=\"checkbox\"><label id=existslabel for=\"exists\"> Exists</label> <br id=existsbr>").insertBefore("#key1")
        } else {
            $("#selecteditem").text(`Selected: ${course} Cannon`)
        }
        
        cannon = locationData[course]["Cannon"]
        starRequirement = cannon["StarRequirement"]
        requirements = cannon["Requirements"]
        conditionalRequirements = cannon["ConditionalRequirements"]
        fillForm(starRequirement, requirements, conditionalRequirements)
        if(cannon["exists"]) {
            $("#exists").prop("checked", true)
        }
    })

    $(document).on("click", ".star", function() {
        course = $(this).closest("tr").find("p").text()
        $(".selected").removeClass("selected")
        $(this).addClass("selected")
        starId = parseInt($(this)[0].classList[1])
        $(".removecannon").trigger("click")
        if(course == "Other") {
            if($(this).text() == "Victory") {
                $("#selecteditem").text("Selected: Victory")
                $("#exists").remove()
                $("#existslabel").remove()
                $("#existsbr").remove()
            } else if(!$("#exists").length)  {
                $("#selecteditem").text("Selected: " + Object.entries(propToItemName)[starId][1])
                $("<input id=\"exists\" type=\"checkbox\"><label id=existslabel for=\"exists\"> Exists</label> <br id=existsbr>").insertBefore("#key1")
            } else {
                $("#selecteditem").text("Selected: " + Object.entries(propToItemName)[starId][1])
            }
        } else if (course != "Other") {
            $("#selecteditem").text("Selected: " + course + " star " + (starId + 1))
            $("#exists").remove()
            $("#existslabel").remove()
            $("#existsbr").remove()
        }
        
        star = locationData[course]["Stars"][starId]
        starRequirement = star["StarRequirement"]
        requirements = star["Requirements"]
        conditionalRequirements = star["ConditionalRequirements"]
        fillForm(starRequirement, requirements, conditionalRequirements)
        if(star["exists"]) {
            $("#exists").prop("checked", true)
        }
    })

    $(document).on("click", ".level", function() {
        $(".selected").removeClass("selected")
        $(this).addClass("selected")
        $(".removecannon").click()
        $("#selecteditem").text("Selected: " + $(this).text())
        $("#exists").remove()
        $("#existslabel").remove()
        $("#existsbr").remove()
        course = locationData[$(this).text()]

        starRequirement = course["StarRequirement"]
        requirements = course["Requirements"]
        conditionalRequirements = course["ConditionalRequirements"]
        fillForm(starRequirement, requirements, conditionalRequirements)
    })


    function getRequirements() {
        requirements = []
        for(const[prop,item] of Object.entries(propToItemName)) {
            if($("#" + prop).prop("checked")) {
                requirements.push(item)
            }
        }
        cr = $("#mainrequirements").find(".cannonrequirements")
        cr.find("span").each(function () {
            if($(this).is(":visible")) {
                requirements.push($(this).text() + "Cannon")
            }
        })
        conditionalRequirements = []
        $(".conditionalRequirement").each(function() {
            starRequirement = $(this).find(".starrequirement").val()
            indRequirementsList = []
            for(const[prop,item] of Object.entries(propToItemName)) {
                if($(this).find("." + prop).prop("checked")) {
                    indRequirementsList.push(item)
                }
            }

            cr = $(this).find(".cannonrequirements")
            cr.find("span").each(function () {
                indRequirementsList.push($(this).text() + "Cannon")
            })
            conditionalRequirements.push({"StarRequirement": starRequirement, "Requirements":indRequirementsList})
        })
        
        return [requirements, conditionalRequirements]
    }
    $("#saveinfobutton").click(function() {
        if($(".selected").is("p")) {
            course = locationData[$(".selected").text()]

            course["StarRequirement"] = $("#starrequirement").val()
            requirementarray = getRequirements()
            course["Requirements"] = requirementarray[0]
            course["ConditionalRequirements"] = requirementarray[1]
            console.log(requirementarray[1])
            
        } else if($(".selected").hasClass("cannon")) {
            course = $(".selected").closest("tr").find("p").text()
            cannon = locationData[course]["Cannon"]
            cannon["exists"] = $("#exists").prop("checked")
            var course_nospace = course.split(" ").join("_")
            if(cannon["exists"] && !$(`#${course_nospace}cannon`).length) {
                console.log("Test13")
                $(".cannonrequirements").show()
                $(".cannons").append("<option value=" +course_nospace + "cannon id=" + course_nospace + "cannon>" + course + " cannon</option>")
                existingCannons.push(course)
            } else if(!cannon["exists"] && $(`#${course_nospace}cannon`).length) {
                $(`#${course_nospace}cannon`).remove()
                $()
                existingCannons.splice( $.inArray(course, existingCannons), 1)
                if(existingCannons.length === 0) {
                    $(".cannonrequirements").hide()
                } 
            }
            

            cannon["StarRequirement"] = $("#starrequirement").val()
            requirementarray = getRequirements()
            cannon["Requirements"] = requirementarray[0]
            cannon["ConditionalRequirements"] = requirementarray[1]
            console.log(requirementarray[1])
        } else {
            course = $(".selected").closest("tr").find("p").text()
            starId = parseInt($(".selected")[0].classList[1])
            star = locationData[course]["Stars"][starId]

            if(course == "Other") {
                star["exists"] = $("#exists").prop("checked")
                if(starId = 6) {
                    star["exists"] = true
                }
                console.log(star["exists"])
            }

            star["StarRequirement"] = $("#starrequirement").val()
            requirementarray = getRequirements()
            star["Requirements"] = requirementarray[0]
            star["ConditionalRequirements"] = requirementarray[1]
            console.log(requirementarray[1])
        }
    })

    $("#downloadbutton").click(function () {
        var downloadString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(locationData))
        $("#downloadFileWhenDone").attr("href", downloadString)
        $("#downloadFileWhenDone").attr("download", camelize($("#filename").val()) + ".json")
        $("#downloadFileWhenDone")[0].click()
    })

    $(".removebutton").click(function () {
        console.log("test")
        $(this).closest("td").remove()
    })

    $("#conditionalrequirementbutton").click(function () {
        clone = $("#conditionalrequirementtemplate").clone(true)
        clone.removeAttr('id')
        clone.addClass("conditionalRequirement")
        clone.appendTo($("#mainrow"))
        clone.find("input[type=checkbox]").prop("checked, false")
        $(".conditionalRequirement").show()
    })

    $(document).on('click', "#cannonselectbutton", function () {
        var course = $("#cannonselect :selected").text()
        var course_nospace = course.split(" ").join("_")
        $("#coursestable").append("<tr id=\""+course_nospace+"\"></tr>")
        $("#" + course_nospace).append("<td><p class=\"level\">" + course + "</p></tr>")
        for(var i = 0; i < 7; i++) {
                $("#"+ course_nospace).append("<td><img class=\"darkstar "+i+"\" src=images/dark_star.png /></td>")
        }
        if(locationData["Other"]["Settings"].includes("cannons")){
            $("#" + course_nospace).append("<td><img class=\"cannon\" src=images/cannon.png /></td>")
        }
        $("#cannonselect :selected").remove()
        if($('#cannonselect').has('option').length === 0) {
            $("#cannonspan").hide()
        }
    })

    $(document).on('click', ".removecannon", function () {
        if($(this).is(":visible")) {
            var course = $(this).parent().find("span").text()
            course = course.substring(0, course.length - 1)
            var course_nospace = course.split(" ").join("_")
            $(this).parent().parent().find(".cannons").append("<option value=" +course_nospace + "cannon id=" + course_nospace + "cannon>" + course + " cannon</option>")
            $(this).parent().parent().find(".cannons").show()
            $(this).parent().parent().find(".addcannonbutton").show()
            $(this).parent().remove()
        }
    })

    $(".addcannonbutton").click(function () {
        clone = $("#cannontemplate").clone(true)
        clone.removeAttr('id')
        clone.addClass("requiredcannons")
        clone.appendTo($(this).parent())
        text = $(this).parent().find(":selected").text()
        id = $(this).parent().find(":selected").prop("id")
        $(this).parent().find(":selected").remove()

        if($(this).parent().find(".cannons").children().length === 0) {
            $(this).parent().find(".cannons").hide()
            $(this).hide()
        }
        clone.find("span").text(text.substring(0, text.length - 6))
        clone.find("span").prop("id",`${id}`)
        clone.show()
    })
})