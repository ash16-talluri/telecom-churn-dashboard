import pandas as pd

data = pd.read_excel(
    "dataset/Telco_customer_churn.xlsx",
    sheet_name="Telco_Churn",
    engine="openpyxl"
)

print(data.head())