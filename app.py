from flask import Flask, render_template, jsonify, request
import pymongo
import json
from bson.json_util import dumps
from bson.objectid import ObjectId
import requests
import config 
app = Flask(__name__)

# setup mongo connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.recipeDB
recipes = db.recipe

#home pages
@app.route("/")
def index():
    return render_template("index.html")

#API Call route
#This endpoint triggers wiping the recipe DB and sending an API call to populate the DB based on the user's search
@app.route("/api/home/api_call", methods=['GET', 'POST'])
def apipull():
    if request.method == 'POST':   
        search_param = request.json
        print(search_param)

        # Establish API Call URL
        # drop previously generated collection
        recipes.drop()
        
        # Constructing Query
        url = "https://api.edamam.com/search?"
        query = f"q={search_param['query']}" #this is where keyword search will go
        api_key = f"&app_id={config.api_id}&app_key={config.api_key}"
        diet = f"&diet={search_param['diet']}"
        calories= f"&calories={search_param['calories']}"
        index = f"&from=0&to=100"
        query_url = url + query + api_key + diet + calories +index
        health_list= search_param['health']
        for label in health_list:
            query_url = query_url + f'&health={label}'
        try:
            # Make request
            data = requests.get(query_url)
            # Store in JSON
            data_json = data.json()
            recipe_hits = data_json['hits']
            for i in range(len(recipe_hits)):
                recipe = recipe_hits[i]['recipe']
                total_nurtrients = recipe['totalNutrients']
                for key, value in total_nurtrients.items(): 
                    if "." in key:
                        new_key = "SUGAR added"
                        old_key = "SUGAR.added"
                        total_nurtrients[new_key] = total_nurtrients.pop(old_key)
            #insert JSON into MongoDB
            recipes.insert_many(recipe_hits)
        except:
            print("error")
        data = list(recipes.find())
        recipe_json = dumps(data)
        return recipe_json
        # # render an index.html template and pass it the data you retrieved from the database
        # return render_template("index.html", recipe = data)

#route to load the last page based on the recipe id extracted from clicking an image
@app.route("/final_recipe/<recipe_id>")
def load_recipe(recipe_id):
    data = recipes.find_one({"_id" : ObjectId(recipe_id)})
    
    
    # render an index.html template and pass it the data you retrieved from the database
    return render_template("index2.html", recipe = data)
#brings the final recipe data to JS

@app.route("/api/final_recipe/<recipe_id>")
def load_recipe2(recipe_id):
    print(recipe_id)
    data = recipes.find_one({"_id" : ObjectId(recipe_id)})
    print(data)
    recipe_json = dumps(data) 
    return recipe_json
if __name__ == "__main__":
    app.run(debug=True)