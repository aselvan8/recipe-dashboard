var sample = 'https://raw.githubusercontent.com/hannah8075/recipe-dashboard/master/static/js/sample.json'


var svgWidth = 650;
var svgHeight = 400;

var margin = {
  top: 10,
  right: 30,
  bottom: 50,
  left: 90
};

// appends svg to correct div
var svg = d3.select("#dishboard")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// appends group to build plot object
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

d3.json(sample, function(data){


    var recipe = data[0].recipe;
    var prepTime = recipe.totalTime;
    var ingredients = recipe.ingredients;
    var dietLabels = recipe.dietLabels;
    var healthLabels = recipe.healthLabels;
    var nutrients = recipe.totalNutrients;
    var kcal = nutrients.ENERC_KCAL.quantity;
    var servings = recipe.yield;

    

    // console.log(recipe)
    // console.log(prepTime)
    // console.log(ingredients)
    // console.log(dietLabels)
    // console.log(servings)
    // console.log(kcal)
    // console.log(healthLabels)
    


      // creates scaling functions for x and y
    var yy = data.map(function(data){return data.recipe.yield});
    var xx = data.map(function(data){return data.recipe.totalNutrients.ENERC_KCAL.quantity});

    var plotData  = data.map(function(dataPoint) {
        return {
            x: dataPoint.recipe.yield,
            y: dataPoint.recipe.totalNutrients.ENERC_KCAL.quantity
        }
    });

    console.log(plotData)

    var plotMe = {x:xx, y:yy};
    console.log(plotMe)

    // console.log([0, d3.max(plotData, d=> yLinearScale(d.y))])

    var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(plotData,d => d.x) ])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(plotData, d=> d.y)])
    .range([height, 0]);

    // appends bottom axis  
    var bottomAxis = d3.axisBottom(xLinearScale);
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
    // appends left axis 
    var leftAxis = d3.axisLeft(yLinearScale);
    chartGroup.append("g")
    .call(leftAxis);

    
    // create circles
    var circlesGroup = chartGroup.append("g")
    .selectAll("circle")
    .data(plotData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.x))
    .attr("cy", d => yLinearScale(d.y))
    .attr("r", d => yLinearScale(d.y)/50)

    ;

   
    // for (var i = 0; i < plotMe.x; i++) {
    //     var cx = ;
    //     chartGroup.append("circle").attr("cx",)
    // }


    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class","h2")
    .text("Prep Time")
    .attr("color","white");

})
