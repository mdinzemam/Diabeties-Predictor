import streamlit as st
import numpy as np
import joblib

st.set_page_config(page_title="Diabetes Predictor", page_icon="🩺", layout="centered")

@st.cache_resource
def load_model():
    return joblib.load('diabetes_model.joblib')

model = load_model()

st.title("🩺 Diabetes Prediction System")
st.write("Enter diagnostic test details below:")

col1, col2 = st.columns(2)

with col1:
    pregnancies = st.number_input("Pregnancies", min_value=0, max_value=20, value=1)
    glucose = st.number_input("Glucose Level", min_value=0, max_value=300, value=120)
    bp = st.number_input("Blood Pressure", min_value=0, max_value=200, value=70)
    skin = st.number_input("Skin Thickness", min_value=0, max_value=100, value=20)

with col2:
    insulin = st.number_input("Insulin Level", min_value=0, max_value=900, value=80)
    bmi = st.number_input("BMI (Body Mass Index)", min_value=0.0, max_value=70.0, value=25.0, format="%.1f")
    dpf = st.number_input("Diabetes Pedigree Function", min_value=0.0, max_value=3.0, value=0.5, format="%.3f")
    age = st.number_input("Age", min_value=1, max_value=120, value=30)

if st.button("Predict Diabetes Risk", use_container_width=True):
    data = np.array([[pregnancies, glucose, bp, skin, insulin, bmi, dpf, age]])
    result = model.predict(data)[0]
    
    if result == 1:
        st.error("⚠️ Result: High Risk of Diabetes")
    else:
        st.success("✅ Result: No Diabetes (Low Risk)")