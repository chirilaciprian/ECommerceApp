from flask import Flask, jsonify, request
from flask_cors import CORS
from API.recommendation import get_similar_products_by_sku

from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

CORS_ORIGIN = os.getenv("CORS_ORIGIN", "http://localhost:3000")
CORS(app, origins=[CORS_ORIGIN])  # This enables CORS for all routes


@app.route("/recommend", methods=["GET"])
def recommend():
    # Get the SKU and top_n parameters from the request
    sku = request.args.get("sku")
    top_n = int(request.args.get("top_n", 10))

    # Check if SKU is provided
    if not sku:
        return jsonify({"error": "Missing required parameter 'sku'."}), 400

    # Get similar products based on SKU
    similar_products, error = get_similar_products_by_sku(sku, top_n)

    # If there was an error, return the error message
    if error:
        return jsonify({"error": error}), 400

    # Convert the DataFrame to a list of dictionaries for the response
    response = similar_products[["name", "sku", "price"]].to_dict(orient="records")
    return jsonify({"sku": sku, "recommendations": response})


if __name__ == "__main__":
    app.run(debug=True, port=5001)
