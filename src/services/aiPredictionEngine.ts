import { FactorExplanation, PredictionInput, PredictionResult, RiskLevel } from '../types';

/**
 * FOODWISE AI — Transparent AI-Based Multi-Factor Prediction Engine
 * 
 * Formula Specification:
 * 1. Baseline Attendance Ratio = Previous Average Attendance / Expected Students
 * 2. Event Factor = Multiplier based on event type (e.g. Festival 1.05, Holiday 0.75, Exam 1.04, None 1.00)
 * 3. Expected Demand = Expected Students × Baseline Attendance Ratio × Event Factor
 * 4. Safety Buffer = Base Buffer (4.0%) - Waste Penalty + Variance Factor
 * 5. Recommended Preparation = Expected Demand × (1 + Safety Buffer)
 */

export function predictFoodRequirement(input: PredictionInput): PredictionResult {
  const {
    date,
    meal_type,
    expected_students,
    prev_avg_attendance,
    prev_food_prepared,
    prev_food_consumed,
    prev_food_waste,
    holiday_event,
    event_type
  } = input;

  // Safe numerical baseline inputs
  const safeExpectedStudents = Math.max(1, expected_students);
  const safePrevAttendance = Math.max(0, prev_avg_attendance);
  const safePrevPrepared = Math.max(0, prev_food_prepared);
  const safePrevConsumed = Math.max(0, prev_food_consumed);
  const safePrevWaste = Math.max(0, prev_food_waste);

  // 1. Baseline Attendance Ratio = Previous Average Attendance / Expected Students
  const rawBaselineAttendanceRatio = safeExpectedStudents > 0 
    ? safePrevAttendance / safeExpectedStudents 
    : 0.95;
  // Clamped between 0.70 and 1.05 to handle extreme user entries cleanly
  const baselineAttendanceRatio = Math.min(1.05, Math.max(0.70, rawBaselineAttendanceRatio));

  // 2. Event Factor
  let eventFactor = 1.0;
  if (holiday_event === 'Yes') {
    switch (event_type) {
      case 'Examination':
        eventFactor = 1.04;
        break;
      case 'Festival':
        eventFactor = 1.06;
        break;
      case 'College Event':
        eventFactor = 1.03;
        break;
      case 'Holiday':
        eventFactor = 0.75;
        break;
      case 'Other':
        eventFactor = 0.95;
        break;
      default:
        eventFactor = 1.0;
    }
  }

  // Meal type turnout adjustment (Breakfast 0.95, Lunch 0.98, Dinner 0.96)
  let mealTypeTurnoutFactor = 1.0;
  if (meal_type === 'Breakfast') mealTypeTurnoutFactor = 0.95;
  else if (meal_type === 'Lunch') mealTypeTurnoutFactor = 0.98;
  else if (meal_type === 'Dinner') mealTypeTurnoutFactor = 0.96;

  // Day of week factor
  let dayFactor = 1.0;
  let dayName = 'Weekday';
  if (date) {
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      dayName = days[d.getDay()];
      if (d.getDay() === 5) dayFactor = 0.96; // Friday
      if (d.getDay() === 0) dayFactor = 0.88; // Sunday
    }
  }

  // 3. Expected Demand = Expected Students × Baseline Attendance Ratio × Event Factor × Meal & Day Factors
  const rawExpectedDemand = safeExpectedStudents * baselineAttendanceRatio * eventFactor * mealTypeTurnoutFactor * dayFactor;
  const expectedDemand = Math.max(10, Math.round(rawExpectedDemand));

  // 4. Safety Buffer = Base Buffer - Waste Penalty + Variance Factor
  const baseBuffer = 0.04; // 4.0% base safety buffer

  // Previous Waste Percentage
  const prevWastePct = safePrevPrepared > 0 ? (safePrevWaste / safePrevPrepared) * 100 : 5.0;

  // Waste Penalty: If previous waste was high (>5%), trim buffer to prevent repeating over-preparation
  let wastePenalty = 0.0;
  if (prevWastePct > 7.0) {
    wastePenalty = 0.02; // Reduce buffer by 2.0%
  } else if (prevWastePct > 4.5) {
    wastePenalty = 0.01; // Reduce buffer by 1.0%
  }

  // Variance Factor: Add buffer for unpredictable events or extremely low past waste
  let varianceFactor = 0.0;
  if (holiday_event === 'Yes' && event_type !== 'Holiday') {
    varianceFactor = 0.01; // Add 1.0% buffer for special events
  } else if (prevWastePct < 2.0 && safePrevPrepared > 0) {
    varianceFactor = 0.01; // Add 1.0% buffer to prevent shortage
  }

  // Safety Buffer Calculation: Base Buffer - Waste Penalty + Variance Factor
  const safetyBufferRatio = Math.max(0.015, Math.min(0.075, baseBuffer - wastePenalty + varianceFactor));
  const safetyBufferPercentage = Number((safetyBufferRatio * 100).toFixed(1));

  // 5. Recommended Preparation = Expected Demand × (1 + Safety Buffer)
  const recommendedPreparation = Math.round(expectedDemand * (1 + safetyBufferRatio));

  // Waste Risk Assessment
  let wasteRisk: RiskLevel = 'LOW';
  if (prevWastePct > 8.0 || (safePrevPrepared > 0 && safePrevPrepared > expectedDemand * 1.10)) {
    wasteRisk = 'HIGH';
  } else if (prevWastePct > 4.5 || safetyBufferPercentage > 5.0 || holiday_event === 'Yes') {
    wasteRisk = 'MEDIUM';
  } else {
    wasteRisk = 'LOW';
  }

  // Dynamic Factor Explanations ("WHY THIS RECOMMENDATION?")
  const factors: FactorExplanation[] = [
    {
      title: `Baseline Attendance Ratio: ${(baselineAttendanceRatio * 100).toFixed(1)}%`,
      detail: `Calculated from previous average attendance (${safePrevAttendance} students) divided by expected students (${safeExpectedStudents}).`,
      type: 'info'
    },
    {
      title: `Meal Type & Day Factor (${meal_type}, ${dayName})`,
      detail: `${meal_type} turnout factor is ${(mealTypeTurnoutFactor * 100).toFixed(0)}% with day-of-week multiplier ${(dayFactor * 100).toFixed(0)}%.`,
      type: 'neutral'
    },
    {
      title: `Safety Buffer (${safetyBufferPercentage}%)`,
      detail: `Base buffer (4.0%) ${wastePenalty > 0 ? `- Waste Penalty (${(wastePenalty * 100).toFixed(1)}% due to prior ${prevWastePct.toFixed(1)}% waste)` : ''} ${varianceFactor > 0 ? `+ Variance Factor (${(varianceFactor * 100).toFixed(1)}%)` : ''} = ${safetyBufferPercentage}%.`,
      type: wastePenalty > 0 ? 'warning' : 'positive'
    }
  ];

  if (holiday_event === 'Yes') {
    factors.push({
      title: `Event Factor (${event_type}): ${(eventFactor * 100).toFixed(0)}%`,
      detail: event_type === 'Holiday'
        ? `Holiday schedule detected. Demand reduced by 25% due to lower campus presence.`
        : `Applied event factor multiplier of ${(eventFactor * 100).toFixed(0)}% for expected ${event_type} attendance.`,
      type: event_type === 'Holiday' ? 'warning' : 'info'
    });
  }

  const potentialWasteEstimate = Math.max(0, recommendedPreparation - expectedDemand);

  const recommendationText = `Based on the expected attendance of ${safeExpectedStudents} students, baseline attendance ratio of ${(baselineAttendanceRatio * 100).toFixed(1)}%, and previous waste of ${prevWastePct.toFixed(1)}%, the Transparent AI Engine recommends preparing approximately ${recommendedPreparation} servings (${expectedDemand} demand + ${safetyBufferPercentage}% safety buffer).`;

  const methodologyNote = "Model uses a Transparent AI-Based Multi-Factor Prediction Engine combining baseline attendance ratio, meal variance factors, event multipliers, and automated safety buffer feedback trimming.";

  return {
    expected_demand: expectedDemand,
    recommended_preparation: recommendedPreparation,
    safety_buffer_percentage: safetyBufferPercentage,
    waste_risk: wasteRisk,
    confidence_score: 92, // Heuristic indicator score
    recommendation_text: recommendationText,
    factors,
    demand_vs_prep_delta: recommendedPreparation - expectedDemand,
    potential_waste_estimate: potentialWasteEstimate,
    methodology_note: methodologyNote
  };
}
