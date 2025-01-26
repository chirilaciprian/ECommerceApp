import pandas as pd

# Read the original CSV file
df = pd.read_csv("store_zara.csv")

# Drop unnecessary columns
df = df.drop(
    columns=["error", "currency", "url", "brand", "scraped_at", "image_downloads"]
)

# Drop rows with any missing values
df = df.dropna()

# Print the info of the DataFrame to ensure the data is cleaned
print(df.info())

# Save the cleaned data to a new CSV file
df.to_csv("formatted_zara.csv", index=False)
