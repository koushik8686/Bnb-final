from flask import Flask, request, jsonify, render_template
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

app = Flask(__name__)

# Generate synthetic dataset
np.random.seed(42)
num_samples = 1000
ages = np.random.randint(10, 71, num_samples)
playtimes = np.random.randint(60, 7201, num_samples)
calories_burned = (playtimes / 3600) * (5 + 0.1 * ages) + np.random.normal(0, 5, num_samples)
data = pd.DataFrame({'Age': ages, 'Playtime': playtimes, 'Calories_Burned': calories_burned})

# Train the model
X = data[['Age', 'Playtime']]
y = data['Calories_Burned']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)

# Home route to render HTML form
@app.route('/')
def home():
    return render_template('index.html')

# Prediction route to handle form submission and model prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Parse JSON data from the request
    data = request.get_json()

    # Debugging log to verify received data
    print("Received data:", data)  # This will print in the server console

    try:
        age = int(data['age'])
        playtime = int(data['playtime'])
    except (KeyError, ValueError, TypeError) as e:
        return jsonify({"error": "Invalid input data"}), 400

    # Predict calories burned
    prediction = model.predict([[age, playtime]])
    return jsonify({'predicted_calories': round(prediction[0], 2)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
