import { ImpactInput, ImpactResult } from '../types';

export function calculateSustainabilityImpact(input: ImpactInput): ImpactResult {
  const {
    mealsPreparedPerDay,
    avgWastePerMealServings,
    operatingDaysPerMonth,
    potentialReductionPct,
    costPerWastedMeal
  } = input;

  const safeMeals = Math.max(0, mealsPreparedPerDay);
  const safeWastePerMeal = Math.max(0, avgWastePerMealServings);
  const safeDays = Math.max(1, operatingDaysPerMonth);
  const safeReductionPct = Math.min(100, Math.max(0, potentialReductionPct));
  const safeCost = Math.max(0, costPerWastedMeal);

  // Daily waste servings
  const dailyWasteServings = safeWastePerMeal;
  const currentMonthlyWasteServings = Math.round(dailyWasteServings * safeDays);
  
  // Avoided waste
  const potentialMonthlyWasteAvoidedServings = Math.round(currentMonthlyWasteServings * (safeReductionPct / 100));
  const potentialYearlyWasteAvoidedServings = Math.round(potentialMonthlyWasteAvoidedServings * 12);

  // Financial impact
  const currentMonthlyCostLoss = Math.round(currentMonthlyWasteServings * safeCost);
  const potentialMonthlyCostSavings = Math.round(potentialMonthlyWasteAvoidedServings * safeCost);
  const potentialYearlyCostSavings = Math.round(potentialYearlyWasteAvoidedServings * safeCost);

  // Environmental CO2e Impact (Standard UN FAO / EPA estimate: ~0.4 kg CO2e per meal serving avoided)
  const co2EquivalentAvoidedKg = Number((potentialYearlyWasteAvoidedServings * 0.4).toFixed(1));

  return {
    currentMonthlyWasteServings,
    potentialMonthlyWasteAvoidedServings,
    potentialYearlyWasteAvoidedServings,
    estimatedReductionPct: safeReductionPct,
    currentMonthlyCostLoss,
    potentialMonthlyCostSavings,
    potentialYearlyCostSavings,
    co2EquivalentAvoidedKg
  };
}
