import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import joblib

# Load cleaned dataset
data = pd.read_csv("dataset/cleaned_data.csv")

# Convert text columns into numbers
label_encoder = LabelEncoder()

for column in data.select_dtypes(include=["object"]).columns:
    data[column] = label_encoder.fit_transform(data[column].astype(str))

# Target column
X = data.drop("Churn Value", axis=1)
y = data["Churn Value"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Test accuracy
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

print("Model Accuracy:", accuracy)

# Save model
joblib.dump(model, "model.pkl")
print("Model saved successfully!")