var params;
d3.select(".form-group").on("change", function () {
​
    d3.event.preventDefault();
​
    var diet = d3.select("#diet").property("value");
    console.log(diet);
​
    healthArray = [];
    healthCheck = d3.select(".restriction").selectAll(".health");
​
    healthCheck.each(function () {
        var thisBox = d3.select(this);
        if (thisBox.property("checked")) {
            healthArray.push(thisBox.property("value"));
        }
    });
    console.log(healthArray)
​
    var calorieMax = d3.select(".slider").property("value");
    console.log(calorieMax);
​
    var query = d3.select("#query").property("value");
    console.log(query);
​
    params = {
        "diet": diet,
        "health": healthArray,
        "calories": calorieMax,
        "query": query
    };
​
​
});
console.log(params);
var button = d3.select('#filter-btn')
button.on("click", function () {
    // d3.json(`/api_call/${search_params}`, function (data) {
    //     console.log(search_params);
    //     console.log(data);
    // })
​
    var search_params = {
        "query": "chicken",
        "diet": "low-carb",
        "health": ["peanut-free", "vegetarian"],
        "calories": "100-300"
    };
​
    fetch('/recipe', {
        method: 'POST',
        body: JSON.stringify(search_params),
        headers: new Headers({
            "content-type": "application/json"
          })
      }).then(function (res) {
        return res.json()
      }).then((data) => {
        // do somthing with data
      })
});