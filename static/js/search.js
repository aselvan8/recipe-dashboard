var params;

d3.select(".form-group").on("change", function () {
    d3.event.preventDefault();

    var diet = d3.select("#diet").property("value");
    if (diet === null) {
        diet = "balanced"
    }
    console.log(diet);

    healthArray = [];
    healthCheck = d3.select(".restriction").selectAll(".health");

    healthCheck.each(function () {
        var thisBox = d3.select(this);
        if (thisBox.property("checked")) {
            healthArray.push(thisBox.property("value"));
        }
    });

    if (healthArray.length === 0) {
        healthArray = ["peanut-free"]
    }

    console.log(healthArray)

    var calorieMax = d3.select(".slider").property("value");
    console.log(calorieMax);

    var query = d3.select("#query").property("value");
    console.log(query);

    params = {
        "diet": diet,
        "health": healthArray,
        "calories": calorieMax,
        "query": query
    };
});

console.log(params);

var button = d3.select('#filter-btn')
button.on("click", function () {

    fetch('/recipe', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: new Headers({
            "content-type": "application/json"
        })
    }).then(function (res) {
        return res.json()
    }).then((data) => {
        // do somthing with data
    })
});
