import pandas as pd 
from flask import Flask, render_template, send_file

app = Flask(__name__)
data = pd.read_csv("../dataset/cleaned_data.csv")
print(data.columns)
print(data.head())

total_customers = len(data)
churn_customers = len(data[data["Churn Value"] == 1])
retained_customers = total_customers - churn_customers
retention_rate = round((retained_customers / total_customers) * 100, 2)
churn_rate = round((churn_customers / total_customers) * 100, 2)

high_risk = len(data[data["Churn Label"] == "Yes"])
low_risk = len(data[data["Churn Label"] == "No"])
revenue=round(pd.to_numeric(data["Total Charges"],errors="coerce").sum(),2)
contract_data = (
    data.groupby("Contract")["Churn Value"]
    .sum()
    .to_dict())
customer_details = data[[
    "CustomerID",
    "Contract",
    "Monthly Charges",
    "Churn Label"
]].sample(50).to_dict(orient="records")
highest_cltv = int(data["CLTV"].max())

average_churn_score = round(data["Churn Score"].mean(), 1)

most_used_contract = data["Contract"].mode()[0]

most_used_payment = data["Payment Method"].mode()[0]
top_churn_reasons = (
    data[data["Churn Label"] == "Yes"]
    ["Churn Reason"]
    .value_counts()
    .head(5))
senior_citizens = len(data[data["Senior Citizen"] == "Yes"])

partners = len(data[data["Partner"] == "Yes"])

internet_users = len(data[data["Internet Service"] != "No"])

phone_users = len(data[data["Phone Service"] == "Yes"])

avg_monthly = round(data["Monthly Charges"].mean(), 2)

avg_tenure = round(data["Tenure Months"].mean(), 1)


reason_labels = top_churn_reasons.index.tolist()
reason_values = top_churn_reasons.values.tolist()

@app.route("/customer/<customer_id>")
def customer(customer_id):

    customer = data[data["CustomerID"] == customer_id].iloc[0]

    return render_template(
        "customer.html",
        customer=customer
    )
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template(
        "dashboard.html",
        total_customers=total_customers,
        churn_customers=churn_customers,
        retention_rate=retention_rate,
        revenue=revenue,
        contract_data=contract_data,
        customer_details=customer_details,
        highest_cltv=highest_cltv,
average_churn_score=average_churn_score,
most_used_contract=most_used_contract,
most_used_payment=most_used_payment,
reason_labels=reason_labels,
reason_values=reason_values,
high_risk=high_risk,
low_risk=low_risk,
churn_rate=churn_rate,
senior_citizens=senior_citizens,
partners=partners,
internet_users=internet_users,
phone_users=phone_users,
avg_monthly=avg_monthly,
avg_tenure=avg_tenure,
    )
@app.route("/download")
def download():

    return send_file(
        "../dataset/cleaned_data.csv",
        as_attachment=True
    )
if __name__ == "__main__":
    app.run(debug=True)
    