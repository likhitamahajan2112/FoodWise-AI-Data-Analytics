# Food Demand and Waste Prediction System (FoodWise AI)

> **Academic Data Analytics & AI Project**  
> **Student Name**: Likhita Nitin Mahajan
> **Domain**: Data Analytics & AI  
> **Project Title**: Food Demand and Waste Prediction System  

---

## 📌 Project Overview

**FoodWise AI** is an intelligent decision-support system designed to reduce institutional food waste in college canteens, hostel messes, and cafeteria operations. In institutional dining, food service managers routinely encounter difficulty in estimating exact daily student attendance and meal consumption headcounts. 

To prevent food shortages, kitchen managers frequently over-prepare meals by excessive buffer margins (cooking 10%–20% extra food), leading to substantial food waste, unnecessary financial losses, and environmental degradation.

FoodWise AI bridges this operational gap by leveraging historical attendance logs, meal type turnouts, day-of-week consumption patterns, and special event schedules to deliver **transparent, data-driven food demand predictions** and **dynamic safety buffer recommendations**.

---

## 🎯 Problem Statement

Institutional food canteens experience large fluctuations in daily student turnout due to:
1. **Academic Schedule Variations**: Examination periods, mid-term tests, holidays, long weekends, and special college festivals.
2. **Meal Type Variance**: Varying turnout across Breakfast (~95%), Lunch (~98%), and Dinner (~96%) services.
3. **Fixed Safety Buffers**: Conventional static over-preparation buffers (10%–20%) that accumulate unnecessary waste daily.

Without data-driven demand forecasting, canteens suffer from:
- **Financial Loss**: Monetary drain from discarded unconsumed food servings.
- **CO₂e Environmental Footprint**: Increased carbon emissions from landfill decomposition.
- **Operational Inefficiency**: Lack of visibility into weekly consumption trends.

---

## 🚀 Key Features

- **AI Demand Prediction Engine**: Transparent multi-factor model predicting expected student demand and recommended preparation volume.
- **Dynamic Waste Risk Gauge**: Real-time visual indicator classifying food waste risk into `LOW`, `MEDIUM`, or `HIGH`.
- **"Why This Recommendation?" Explanations**: 3–5 human-readable factor explanations for every prediction result.
- **Historical Analytics Dashboard**: 5 KPI cards and 6 interactive Recharts visual graphs analyzing 60 historical service logs.
- **AI Pattern & Behavioral Insights**: Automated pattern detection identifying Lunch waste patterns, Sunday turnout drops, and examination attendance stability.
- **Sustainability & Financial Impact Calculator**: Interactive modeler estimating monthly/annual food waste avoided, financial cost savings, and CO₂e carbon offset under explicit scenario assumptions.
- **Responsible AI Audit Checklist**: Interactive compliance checklist evaluating Fairness, Transparency, Ethics, and Privacy.

---

## 📊 Data Analytics Methodology

The analytical workflow follows a 6-step data science pipeline:
1. **Data Ingestion**: Extracting authentic historical service records (`foodwise_historical_data.csv`).
2. **Data Inspection & Validation**: Verifying data types, missing values (0 missing), and record uniqueness (60 unique logs).
3. **Descriptive Statistics & EDA**: Aggregate totals, meal-type groupbys, day-of-week distributions, and correlation heatmaps.
4. **Transparent Engine Formulations**: Mathematically executing the multi-factor attendance and safety buffer engine.
5. **Experimental Machine Learning & Data Leakage Audit**: Auditing features to eliminate post-service look-ahead data leakage, training `LinearRegression` and `RandomForestRegressor` models on an 80/20 train-test split using pre-service features.
6. **Sustainability & Governance**: Calculating carbon/financial impacts under scenario assumptions and auditing responsible AI pillars.

---

## 🧠 Existing AI Prediction Engine (Transparent Multi-Factor Model)

The web application utilizes a transparent multi-factor statistical regression model (`src/services/aiPredictionEngine.ts`).

### Mathematical Formulation
1. **Baseline Attendance Ratio**:
   $$\text{Baseline Attendance Ratio} = \text{Clamp}\left(\frac{\text{Previous Average Attendance}}{\text{Expected Students}}, [0.70, 1.05]\right)$$

2. **Multiplier Factors**:
   - **Event Factor**: Examination (`1.04`), Festival (`1.06`), College Event (`1.03`), Holiday (`0.75`), None (`1.00`).
   - **Meal Turnout Factor**: Breakfast (`0.95`), Lunch (`0.98`), Dinner (`0.96`).
   - **Day-of-Week Factor**: Friday (`0.96`), Sunday (`0.88`), Weekdays (`1.00`).

3. **Expected Demand**:
   $$\text{Expected Demand} = \text{Expected Students} \times \text{Baseline Attendance Ratio} \times \text{Event Factor} \times \text{Meal Factor} \times \text{Day Factor}$$

4. **Dynamic Safety Buffer Ratio**:
   $$\text{Safety Buffer} = \text{Base Buffer (4.0\%)} - \text{Waste Penalty} + \text{Variance Factor}$$
   - *Waste Penalty*: `2.0%` if prior waste > 7.0%; `1.0%` if prior waste > 4.5%.
   - *Variance Factor*: `1.0%` for non-holiday special events or prior waste < 2.0%.

5. **Recommended Preparation**:
   $$\text{Recommended Preparation} = \text{Expected Demand} \times (1 + \text{Safety Buffer})$$

> **Note on Confidence Score**: The `92%` indicator displayed in the Prediction Interface is a transparent heuristic readiness score based on input completeness and baseline stability. It is **NOT** a machine-learning probability score.

---

## 🔬 Audited Experimental Machine Learning Analysis

To fulfill academic machine learning evaluation requirements, an experimental regression analysis was conducted in the Jupyter Notebook (`Likhita_FoodWise_AI.ipynb`) using Python `scikit-learn`.

### Data Leakage Investigation & Resolution
An audit revealed that using `prepared_servings` as a predictor causes look-ahead feature leakage, as `prepared_servings` is a post-service kitchen output variable (`prepared = consumed + wasted`). To eliminate data leakage and ensure academic rigor:
- `prepared_servings` was **removed** from predictor features.
- Predictors were restricted strictly to **PRE-SERVICE features** available before cooking occurs: `['expected_students', 'meal_type', 'day', 'holiday_event', 'event_type']` (one-hot encoded).
- **Target Variable**: `consumed_servings`
- **Data Split**: 80% Training (48 records), 20% Testing (12 records)

### Audited Performance Evaluation Metrics

| Machine Learning Model | Mean Absolute Error (MAE) | Root Mean Squared Error (RMSE) | R² Score |
| :--- | :---: | :---: | :---: |
| **Linear Regression** | **2.85 servings** | **4.03 servings** | **0.9949** |
| **Random Forest Regressor** | **4.85 servings** | **8.78 servings** | **0.9756** |

*Note: The high R² score is driven by expected_students, which has a 0.9944 correlation with consumed_servings in the demo dataset, reflecting that student headcount registration is the primary driver of meal demand.*

---

## 📁 Dataset Description

- **Source**: Authentic project dataset (`src/data/demoData.ts`), exported to `data/foodwise_historical_data.csv`.
- **Record Count**: Exactly 60 meal service records spanning 6 calendar weeks.
- **Columns**: `id`, `date`, `day`, `meal_type`, `expected_students`, `prepared_servings`, `consumed_servings`, `wasted_servings`, `waste_percentage`, `holiday_event`, `event_type`.

---

## 🛠️ Technologies Used

### Frontend Web Application
- **Framework**: React 18 + TypeScript + Vite 6
- **Styling**: Tailwind CSS
- **Visualizations**: Recharts (Interactive Line & Bar Charts)
- **Icons**: Lucide React

### Analytics & Machine Learning (Python)
- **Data Processing**: Pandas, NumPy
- **Visualizations**: Matplotlib, Seaborn
- **Machine Learning**: Scikit-Learn
- **Notebook & Reporting**: Jupyter, Python-Docx, OpenPyXL

---

## 📂 Project Structure

```text
FoodWise AI/
├── Likhita_FoodWise_AI.ipynb              # 31-Section Python Analytics Notebook
├── requirements.txt                       # Python Dependencies File
├── Likhita_FoodWise_AI_ProjectReport.docx # 31-Section Word Academic Report
├── README.md                              # Project Documentation (This File)
├── data/
│   └── foodwise_historical_data.csv       # Authentic 60-Record Project CSV Dataset
├── assets/
│   └── screenshots/                       # High-Res Web Application Screenshots
│       ├── home_page.png
│       ├── prediction_page.png
│       ├── dashboard_page.png
│       ├── ai_insights_page.png
│       ├── impact_page.png
│       └── responsible_ai_page.png
├── src/
│   ├── App.tsx                            # Main Component with Hash Navigation
│   ├── components/                        # UI Components (Navbar, Footer, RiskGauge, etc.)
│   ├── data/
│   │   └── demoData.ts                    # Authentic 60-Record Dataset
│   ├── pages/                             # 6 Core Page Views
│   ├── services/                          # Prediction, Analytics & Impact Engines
│   └── types/                             # TypeScript Interface Definitions
├── scripts/                               # Helper Scripts for Notebook & Report Generation
├── package.json                           # Node.js Dependencies & Scripts
└── vite.config.ts                         # Vite Bundler Configuration
```

---

## 💻 Installation & Setup

### 1. Prerequisites
- Node.js (v18+ recommended)
- Python 3.11+

### 2. Install Node.js Dependencies
```bash
npm install
```

### 3. Install Python Environment Dependencies
```bash
py -3.11 -m pip install -r requirements.txt
```

---

## 🏃 Running the Analytics Notebook

To run the complete 31-section Data Analytics & AI notebook:

```bash
# Option A: Launch interactive Jupyter Notebook
py -3.11 -m jupyter notebook Likhita_FoodWise_AI.ipynb

# Option B: Execute notebook from command line
py -3.11 -m jupyter nbconvert --to notebook --execute --inplace Likhita_FoodWise_AI.ipynb
```

---

## 🌐 Running the Web Application

### Development Mode
```bash
npm run dev
```
Open browser at `http://localhost:5173`.

### Typecheck & Production Build
```bash
npm run typecheck
npm run build
npm run preview
```

---

## 📈 Key Analytical Results

1. **Lunch Service Waste**: Lunch services account for the largest volume of wasted food (average 36.8 wasted servings per meal).
2. **Sunday Turnout Drop**: Sunday services record the highest waste percentage (10.8%), driven by weekend student outings.
3. **Examination Stability**: Examination periods show high attendance stability (6.0% waste rate), whereas Festival days increase over-preparation risk (14.3% waste rate).
4. **Empirical Buffer Savings Calculation**: Direct calculation on the 60 records shows that trimming the safety buffer from 5.0% to 3.0% reduces excess preparation by **522.6 servings**, achieving a **26.7% reduction in total baseline waste**.

---

## 🌿 Sustainability Scenario Projections

> **Scenario Assumption Disclosure**: All annual financial and carbon offset metrics are hypothetical scenario projections based on explicit operational assumptions, not measured real-world site figures.

- **Illustrative Conversion Factor**: 0.4 kg CO₂e per wasted meal serving (illustrative scenario assumption).
- **Illustrative Financial Savings**: INR 40 per wasted meal serving.
- **Hypothetical Annual Scenario** (for a 1,200 meal/day canteen across 300 operating days = 360,000 meals/year with 10% baseline waste = 36,000 baseline wasted servings):
  - **Servings Avoided (26.7% Buffer Reduction)**: ~9,612 servings / year
  - **Illustrative Carbon Offset**: ~3,845 kg CO₂e / year
  - **Illustrative Cost Savings**: ~INR 384,480 / year

---

## 🛡️ Responsible AI Framework

FoodWise AI enforces ethical AI governance across 4 pillars:
1. **Fairness**: Calibrated across Breakfast, Lunch, Dinner, weekdays, weekends, and event days.
2. **Transparency**: Displays 3–5 natural language factor explanations for every prediction.
3. **Ethics**: Scoped as decision support; explicitly reminds managers that human kitchen review is required.
4. **Privacy**: Operates on anonymous headcount numbers with **Zero PII collection**.

---

## ⚠️ Limitations & Future Scope

### Limitations
- **Dataset Scale**: Based on exactly 60 historical service logs (`INITIAL_DEMO_DATASET`).
- **Scenario Assumptions**: The 0.4 kg CO₂e / meal factor is an illustrative scenario conversion assumption.

### Future Scope
- Integration with IoT smart weighing scales for real-time waste tracking.
- API connectivity with college biometric attendance gates.
- Deep learning sequence modeling (LSTM / Prophet) for multi-semester seasonal forecasting.
