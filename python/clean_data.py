import pandas as pd

# Read the Excel file
data = pd.read_excel(
    "dataset/Telco_customer_churn.xlsx",
    sheet_name="Telco_Churn",
    engine="openpyxl"
)

# Number of rows and columns
print("Dataset Shape:")
print(data.shape)

# Column names
print("\nColumn Names:")
print(data.columns)

# First 5 rows
print("\nFirst 5 Rows:")
print(data.head())

# Missing values
print("\nMissing Values:")
print(data.isnull().sum())
# Remove duplicate rows
data = data.drop_duplicates()

print("\nAfter removing duplicates:")
print(data.shape)

# Save cleaned dataset
data.to_csv("dataset/cleaned_data.csv", index=False)

print("\nCleaned dataset saved successfully!")