

var search_params;
d3.select(".form-group").on("change", function () {
    d3.event.preventDefault();
    var diet = d3.select("#diet").property("value");
    healthArray = [];
    healthCheck = d3.select(".restriction").selectAll(".health");
    healthCheck.each(function () {
        var thisBox = d3.select(this);
        if (thisBox.property("checked")) {
            healthArray.push(thisBox.property("value"));
        }
    });
    var calorieMax = d3.select(".slider").property("value");
    var query = d3.select("#query").property("value");
    search_params = {
        "diet": diet,
        "health": healthArray,
        "calories": `0-${calorieMax}`,
        "query": query
    };
    var button = d3.select('#filter-btn');
    button.on("click", function () {
        fetch('/api/home/api_call', {
            method: 'POST',
            body: JSON.stringify(search_params),
            headers: new Headers({
                "content-type": "application/json"
              })
          }).then(function (res) {
            return res.json()
          }).then((data) => {

            dishboard(data)

            
            console.log(data)
          })
    });
}); 