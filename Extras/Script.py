import json
import random

# Generating an array of 30 random ice cream prices between 50 and 150, ending with 0 or 5
prices = [random.choice(range(50, 121, 5)) for _ in range(30)]
# Formatting prices with a space and the rupee symbol
formatted_prices = [f"{price} ₹" for price in prices]

def update_prices(json_data, prices):
    for idx, product in enumerate(json_data["products"]):
        product["price"] = prices[idx] if idx < len(prices) else "Price not available"
    return json_data

# Path to your JSON data
path = r"C:\Users\morem\OneDrive\Desktop\data.json"

with open(path, "r") as file:
    data = json.load(file)

updated_data = update_prices(data, formatted_prices)

with open(path, "w") as file:
    json.dump(updated_data, file, indent=4)
