d3.select(".form-group").on("change", function(){
    
    d3.event.preventDefault();
    
    var chooseprotein = d3.select("#protein").property("value");
    console.log(chooseprotein);

    dietaryArray = [];
    dietaryCheck = d3.select(".restriction").selectAll(".dietary");
    
    dietaryCheck.each(function(){
        var thisBox = d3.select(this);
        if (thisBox.property("checked")) {
            dietaryArray.push(thisBox.property("value"));
        }
    });
    console.log(dietaryArray)
    
    var calorieMax = d3.select(".slider").property('value');
    console.log(calorieMax);
    
    var keyword = d3.select("#ingredient1").property("value");
    console.log(keyword);
    
    var searchParameters = [{
        "protein": chooseprotein,
        "restrictions": dietaryArray,
        "calories": calorieMax,
        "keyword": keyword
    }];

    console.log(searchParameters);

    d3.json(`/api_call/${searchParameters}`).then(function(data){
        console.log(data)

        

    });


});
