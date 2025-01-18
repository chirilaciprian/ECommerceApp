import pickle
import numpy as np
import pandas as pd

# Load the similarity map
with open("../model/similarity_map.pkl", "rb") as file:
    similarity_map = pickle.load(file)

# Load the dataset
df = pd.read_csv("../data/store_zara.csv")
df = df.drop(columns=['error', 'currency', 'url', 'brand', 'scraped_at', 'images'])
df = df.dropna()

def get_similar_products_by_sku(sku, top_n=10):
    """Returns the top N similar products based on SKU."""
    if sku not in similarity_map:
        return None, f"SKU {sku} not found in the similarity map."

    # Get similarity scores for the given SKU
    similarity_scores = similarity_map[sku]

    # Get indices of top N similar products (excluding the product itself)
    similar_indices = np.argsort(similarity_scores)[::-1][1:top_n + 1]

    # Retrieve similar products from the DataFrame
    similar_products = df.iloc[similar_indices]

    return similar_products, None
