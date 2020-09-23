var chooseprotein = d3.select("#protein");
chooseprotein.on('change',function(){
    var protein = chooseprotein.property("value")
    console.log(protein)
})

var vegetarianCheck = d3.select(".restriction").selectAll("#Vegetarian");
var dietaryCheck = d3.select(".restriction");



dietaryCheck.on('change',function() {
    var checkboxes = dietaryCheck.selectAll(".dietary");
    var dietaryArray = [];
    checkboxes.each(function(){
        var thisBox = d3.select(this);
        if (thisBox.property("checked")) {
            dietaryArray.push(thisBox.property("value"));
        }
    })

    console.log(dietaryArray)

})

var calorieSlider = d3.select(".slider");
console.log(calorieSlider.property('value'))

calorieSlider.on("change", function(){
    var calorieMax = calorieSlider.property('value');
    console.log(calorieMax)
})