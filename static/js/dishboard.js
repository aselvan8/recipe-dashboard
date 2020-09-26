// var sample = '../static/js/sample.json'


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

// d3.json(sample,  dishboard)// data end

function dishboard(data){


    // viz starts here
      
        var plotMetrics  = data.map(function(dataPoint) {
            return {
                id: dataPoint._id['$oid'],
                serving: dataPoint.recipe.yield,
                cal: dataPoint.recipe.totalNutrients.ENERC_KCAL.quantity,
                time: dataPoint.recipe.totalTime,
                sugar: dataPoint.recipe.totalNutrients.SUGAR.quantity,
                fat: dataPoint.recipe.totalNutrients.FAT.quantity,
                name: dataPoint.recipe.label,
                cuisine: dataPoint.recipe.cuisineType,
                image: dataPoint.recipe.image,
                ingredients: dataPoint.recipe.ingredients,
                link: dataPoint.recipe.url,
                glycemic: dataPoint.recipe.glycemicIndex
            }
        });
        
        var plotMenu = d3.selectAll(".graphs");
        var xMenu = d3.select("#x");
        var yMenu = d3.select("#y");
        var sMenu = d3.select("#size");
        var scalerMenu = d3.select("#lowhigh");
     
        // main interactive event listener
        plotMenu.on("change", function(){
    
            var varX = xMenu.property("value");
            var varY = yMenu.property("value");
            var varS = sMenu.property("value");
            var varScaler = scalerMenu.property("value");
            console.log(varScaler)
    
            function menuVar(d,dimension) {
                if (dimension == 'serving') {output = d.serving}
                if (dimension == 'time') {output = d.time}
                if (dimension == 'cal') {output = d.cal}
                if (dimension == 'sugar') {output = d.sugar}
                if (dimension == 'fat') {output = d.fat}
                if (dimension == 'calperserving') {output = d.cal/d.serving}
                if (dimension == 'glycemic') {output = d.glycemic}
                return output
             }
    
            
             function axisVar(dimension) {
                if (dimension == 'serving') {output = "Number of Servings"}
                if (dimension == 'time') {output = "Total Prep Time"}
                if (dimension == 'cal') {output = "Total Calories"}
                if (dimension == 'sugar') {output = "Total Sugar (g)"}
                if (dimension == 'fat') {output = "Total Fat (g)"}
                if (dimension == 'calperserving') {output = "Calories per Serving"}
                if (dimension == 'glycemic') {output = "Glycemic Index"}
                return output
             }
    
             
    
            var plotData = plotMetrics.map( function(datapoint) {
                return {
                      x: menuVar(datapoint,varX)
                    , y: menuVar(datapoint,varY)
                    , s: menuVar(datapoint,varS)
                    , id: datapoint.id
                    , name: datapoint.name
                    , ingredients: datapoint.ingredients
                    , image: datapoint.image
                    , cuisine: datapoint.cuisine
                }
            })
    
            plotData.forEach(function(data) {
                if (isNaN(data.x)) {data.x=0;} else{data.x=data.x;}
                if (isNaN(data.y)) {data.y=0;} else{data.y=data.y;}
                if (isNaN(data.s)) {data.s=0;} else{data.s=data.s;}
               
              });
    
            // console.log(plotData)
    
            rsum = 0;
            rcounter = 0;
            for (var i = 0; i <plotData.length; i++) { // loop 1 open
    
                var n = +plotData[i].s;
                var c = 1
                if (isNaN(n)) {
                    n=0;
                    var c = 0;
                }
                else {}
                rsum = rsum + n;
                rcounter = rcounter+c
            } // loop 1 close
            var sAvg = rsum/rcounter;
            console.log(sAvg)
            // attempting dynamic plot
    
    
        var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(plotData,d => d.x) ])
        .range([0, width]);
    
        var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(plotData, d=> d.y)])
        .range([height, 0]);
    
    
        //refreshes axes;
        chartGroup.selectAll(".yaxis").remove()
        chartGroup.selectAll(".xaxis").remove()
    
        // appends bottom axis  
        var bottomAxis = d3.axisBottom(xLinearScale);
        chartGroup.append("g").attr("class","xaxis")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
        // appends left axis 
        var leftAxis = d3.axisLeft(yLinearScale);
        chartGroup.append("g").attr("class","yaxis")
        .call(leftAxis);
    
        // refresh circles
        chartGroup.selectAll("circle").remove();
        
    
        function rScaler(num,searchType) {
    
            var scale = 4
    
            if (searchType == 'lowsearch') {
                var r = scale*(sAvg/num);
                var o = scale*(Math.pow(sAvg,2)/Math.pow(num,2));
            }
            else {
                var r = scale*num/sAvg;
                var o = scale*(Math.pow(num,2)/Math.pow(sAvg,2));
            }
    
            
            if (r > 6 * scale) { r = 6 * scale}
            if (r < 1.5 * scale) { r = 1.5 * scale}
    
            if (o > 6 * scale) { o = 6 * scale}
            if (o < 2 * scale) { o = 2 * scale}
    
            // console.log(r)
            return {r:r,o:o}
        }
    
        var circlesGroup = chartGroup.append("g")
        .selectAll("circle")
        .data(plotData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.x))
        .attr("cy", d => yLinearScale(d.y))
        .attr("r", d => rScaler(d.s,varScaler).r)
        .style("fill", "#ff4b0d") //"#F0E68C" ,"#C71585"
        .attr("stroke","#FFF5EE").attr("stroke-width","2")
        .attr("opacity", d => rScaler(d.s,varScaler).o/32);

    
        chartGroup.selectAll(".yaxis-label").remove()
        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 10)
        .attr("x", 0 - (height) + 65)
        .attr("dy", "1em")
        .attr("class","h3 yaxis-label")//.attr("class","")
        .text(`${axisVar(varY)}`)
        .style("fill","black");
    
        chartGroup.selectAll(".xaxis-label").remove()
        chartGroup.append("text")
        .attr("transform", `translate(${45+(width / 6)}, ${height + margin.top + 35})`)
        .attr("class","h3 xaxis-label")
        .text(`${axisVar(varX)}`)
        .style("fill","black");
    
    
    
        // Tooltip!
    
         // initializes tooltip
        var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .html(function(plotData, index) {
            return (`<div class = "pop-up" width="105px" height="130px">
            ${plotData.name} <br> ${axisVar(varS)}:${Math.round(plotData.s)} <br> <img width="100px" height="100px" src="${plotData.image}" alt="">
            </div>`);
        });
    
        // calls tooltip
        chartGroup.call(toolTip);  
        
        // creates listener for tool tip mouse events
        var ingredientPanel = d3.select("#recipe-summary").append('ul').attr("class","ingredient-list");
    
    
        circlesGroup.on("mouseover", function(data) {
            toolTip.show(data, this);
    
            ingredientPanel.selectAll('li')
            .data(data.ingredients)
            .enter().append('li')
            .attr("class",'ingredient')
            .text(d => d.text)
    
            // console.log(data.ingredients)
    
        })
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
            ingredientPanel.selectAll(".ingredient").remove()
            });
    
        circlesGroup.on("click",function(d){window.location=`/final_recipe/${d.id}`});
    
    
    }) // listener end
    
    
        }

