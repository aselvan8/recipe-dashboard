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
 

    console.log(recipe)

  
    var plotData  = data.map(function(dataPoint) {
        return {
            serving: dataPoint.recipe.yield,
            cal: dataPoint.recipe.totalNutrients.ENERC_KCAL.quantity,
            time: dataPoint.recipe.totalTime,
            sugar: dataPoint.recipe.totalNutrients.SUGAR.quantity,
            fat: dataPoint.recipe.totalNutrients.FAT.quantity
        }
    });

    console.log(plotData)



    var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(plotData,d => d.serving) ])
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(plotData, d=> d.cal)])
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
    .attr("cx", d => xLinearScale(d.serving))
    .attr("cy", d => yLinearScale(d.cal))
    .attr("r", d => yLinearScale(d.cal)/25)
    .attr("fill", "green")
    .attr("opacity", ".5");
    ;



    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class","h2")
    .text("Prep Time")
    .attr("color","white");

})