var recipe_id = d3.select("div.recipeid").text()
// console.log(recipe_id);
d3.json(`/api/final_recipe/${recipe_id}`, function (data) {
        ///setting initial values for cuisinetype, mealtype
        cuisinetype = data.recipe.cuisineType || "N/A";
        mealtype = data.recipe.mealtype || "N/A";
        // transfat = data.recipe.totalNutrients.FATRN || 'N/A';
        ///extra logic to extract if it exists
        if (cuisinetype !== "N/A") {
            cuisinetype = data.recipe.cuisineType[0];
        };
        if (mealtype !== "N/A") {
            mealtype = data.recipe.mealtype[0];
        };
        ///inserting into the html file
        d3.select(".cuisinetype").append("h5").text(cuisinetype);
        d3.select(".mealtype").append("h5").text(mealtype);
        ///checks
        console.log(cuisinetype);
        console.log(mealtype);
        // console.log(transfat);
        console.log(data);
        ///Creating charts
        new Chart(document.getElementById("myChart"), {
            type: "doughnut",
            data: {
                "labels": [data.recipe.totalNutrients.FAT.label, data.recipe.totalNutrients.CHOCDF.label, data.recipe.totalNutrients.PROCNT.label],
                datasets: [{
                    data: [Math.round(data.recipe.totalNutrients.FAT.quantity), Math.round(data.recipe.totalNutrients.CHOCDF.quantity), Math.round(data.recipe.totalNutrients.PROCNT.quantity)],
                    backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"]
                }]
            }
        });
        new Chart(document.getElementById("myChart2"), {
            "type": "radar",
            "data": {
                "labels": [data.recipe.totalNutrients.CHOLE.label, data.recipe.totalNutrients.NA.label, data.recipe.totalNutrients.CA.label, data.recipe.totalNutrients.K.label, data.recipe.totalNutrients.FE.label],
                "datasets": [{
                    "label": "Nutrients in mg",
                    "data": [Math.round(data.recipe.totalNutrients.CHOLE.quantity), Math.round(data.recipe.totalNutrients.NA.quantity), Math.round(data.recipe.totalNutrients.CA.quantity), Math.round(data.recipe.totalNutrients.K.quantity), Math.round(data.recipe.totalNutrients.FE.quantity)],
                    "data": [Math.round(data.recipe.totalNutrients.CHOLE.quantity), Math.round(data.recipe.totalNutrients.NA.quantity), Math.round(data.recipe.totalNutrients.CA.quantity), Math.round(data.recipe.totalNutrients.K.quantity), Math.round(data.recipe.totalNutrients.FE.quantity)],
                    "fill": true,
                    "backgroundColor": "rgba(255, 99, 132, 0.2)",
                    "borderColor": "rgb(255, 99, 132)",
                    "pointBackgroundColor": "rgb(255, 99, 132)",
                    "pointBorderColor": "#fff",
                    "pointHoverBackgroundColor": "#fff",
                    "pointHoverBorderColor": "rgb(255, 99, 132)"
                },
                ]
            },
            "options": { "elements": { "line": { "tension": 0, "borderWidth": 3 } } }
        });
    });