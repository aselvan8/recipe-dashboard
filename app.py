from flask import Flask, render_template, jsonify, request
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

# home pages


@app.route("/")
def index():
    return render_template("index.html")

# route to load the last page based on the recipe id extracted from clicking an image


@app.route("/final_recipe/<recipe_id>")
def load_recipe(recipe_id):
    # type img url to be the recipe_id
    # #return render_template("index2.html")
    data = recipes.find_one({"_id": ObjectId(recipe_id)})
    print(data)
    print(recipe_id)
    # render an index.html template and pass it the data you retrieved from the database
    return render_template("recipe.html", recipe=data)


@app.route("/recipe", methods=['GET', 'POST'])
def test():
    if request.method == 'POST':
        print(request.json)
        return jsonify("got it")
    if request.method == 'GET':
        return "you made a get request"


if __name__ == "__main__":
    app.run(debug=True)
