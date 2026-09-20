import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


# ==========================================
# LOAD DATA
# ==========================================

data = pd.read_csv("data/weather_data.csv")


# ==========================================
# INPUT FEATURES
# ==========================================

X = data[
    [
        "temperature",
        "humidity",
        "wind_speed",
        "cloud_cover"
    ]
]


# ==========================================
# TARGET
# ==========================================

y = data["rainfall"]


# ==========================================
# TRAIN TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# ==========================================
# MODEL
# ==========================================

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)


# ==========================================
# TRAIN
# ==========================================

model.fit(X_train, y_train)


# ==========================================
# TEST
# ==========================================

predictions = model.predict(X_test)


accuracy = accuracy_score(
    y_test,
    predictions
)


print(
    "Model Accuracy:",
    round(accuracy * 100, 2),
    "%"
)


# ==========================================
# SAVE MODEL
# ==========================================

with open("model.pkl", "wb") as file:

    pickle.dump(
        model,
        file
    )


print(
    "model.pkl created successfully!"
)
