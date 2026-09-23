export type MealType = 'Breakfast' | 'Lunch' | 'Dinner';

export type EventType = 'None' | 'Festival' | 'College Event' | 'Examination' | 'Holiday' | 'Other';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface MealRecord {
  id: string;
  date: string; // YYYY-MM-DD
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  meal_type: MealType;
  expected_students: number;
  prepared_servings: number;
  consumed_servings: number;
  wasted_servings: number;
  waste_percentage: number;
  holiday_event: 'Yes' | 'No';
  event_type: EventType;
}

export interface PredictionInput {
  date: string;
  meal_type: MealType;
  expected_students: number;
  prev_avg_attendance: number;
  prev_food_prepared: number;
  prev_food_consumed: number;
  prev_food_waste: number;
  holiday_event: 'Yes' | 'No';
  event_type: EventType;
}

export interface FactorExplanation {
  title: string;
  detail: string;
  type: 'positive' | 'warning' | 'neutral' | 'info';
}

export interface PredictionResult {
  expected_demand: number;
  recommended_preparation: number;
  safety_buffer_percentage: number;
  waste_risk: RiskLevel;
  confidence_score: number;
  recommendation_text: string;
  factors: FactorExplanation[];
  demand_vs_prep_delta: number;
  potential_waste_estimate: number;
  methodology_note: string;
}

export interface AnalyticsKPIs {
  totalPrepared: number;
  totalConsumed: number;
  totalWasted: number;
  avgWastePercentage: number;
  potentialReductionOpportunityServings: number;
  totalRecords: number;
}

export interface MealInsightData {
  mealType: MealType;
  avgPrepared: number;
  avgConsumed: number;
  avgWasted: number;
  avgWastePct: number;
}

export interface DayInsightData {
  day: string;
  avgPrepared: number;
  avgConsumed: number;
  avgWasted: number;
  avgWastePct: number;
}

export interface ImpactInput {
  mealsPreparedPerDay: number;
  avgWastePerMealServings: number;
  operatingDaysPerMonth: number;
  potentialReductionPct: number;
  costPerWastedMeal: number;
}

export interface ImpactResult {
  currentMonthlyWasteServings: number;
  potentialMonthlyWasteAvoidedServings: number;
  potentialYearlyWasteAvoidedServings: number;
  estimatedReductionPct: number;
  currentMonthlyCostLoss: number;
  potentialMonthlyCostSavings: number;
  potentialYearlyCostSavings: number;
  co2EquivalentAvoidedKg: number; // Transparent standard conversion (approx 0.4kg CO2e per wasted meal serving)
}

export interface ResponsibleCheckItem {
  id: string;
  category: 'Fairness' | 'Transparency' | 'Ethics' | 'Privacy' | 'Validation';
  title: string;
  description: string;
  status: 'passed' | 'review_required';
  details: string;
}
