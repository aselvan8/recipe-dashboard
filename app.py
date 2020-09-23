from flask import Flask, render_template, jsonify
import pymongo
import json
from bson.json_util import dumps
from bson.objectid import ObjectId

app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.recipeDB
recipes = db.recipe

@app.route("/")
def index():
    return render_template("index.html")







#API Call route
@app.route("/api_call/<recipe_id>")
def apipull(api_call):
    data = list(recipes.find())
    recipe_json = dumps(data)

    # render an index.html template and pass it the data you retrieved from the database
    return recipe_json







#
@app.route("/recipe")
def test():
    #recipe_id = "5f661b49039ded9690d3fb6c"

    #data = recipes.find_one()
    

    data = recipes.find_one({"_id" : ObjectId('5f661b49039ded9690d3fb6c')})
    #data = recipes.find({"recipe.label" :{$regex: ".*Chicken.*"}})
    print(type(data))

    recipe_json = dumps(data)

    # render an index.html template and pass it the data you retrieved from the database
    return recipe_json



#route to load the last page based on the recipe id extracted from clicking an image
@app.route("/final_recipe/<recipe_id>")
def load_recipe(recipe_id):
    #type img url to be the recipe_id
    #return render_template("index2.html")
    data = recipes.find_one({"_id" : ObjectId(recipe_id)})
    print(data)

    # render an index.html template and pass it the data you retrieved from the database
    return render_template("index2.html", recipe = data)





if __name__ == "__main__":
    app.run(debug=True)




    
    # for dict_value in recipe.recipe.totalDaily:
    #     for k, v in dict_value.items():
    #         dict_value[k] = round(v,2)
    
    # recipe = {k:round(v) for k, v in recipe[0].recipe.totalNutrients.items()}
    