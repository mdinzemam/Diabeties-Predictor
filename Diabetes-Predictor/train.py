import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import joblib

# 1. Dataset read karein
df = pd.read_csv('diabetes.csv')

# 2. Features aur Target split karein
X = df.drop(columns='Outcome')
y = df['Outcome']

# 3. Pipeline banayein aur fit karein
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', RandomForestClassifier(random_state=42))
])
pipeline.fit(X, y)

# 4. Trained model save karein
joblib.dump(pipeline, 'diabetes_model.joblib')
print("Model trained and saved successfully!")