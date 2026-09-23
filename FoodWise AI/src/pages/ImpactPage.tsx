import React, { useState } from 'react';
import { ImpactInput } from '../types';
import { calculateSustainabilityImpact } from '../services/impactCalculatorEngine';
import { 
  Calculator, 
  Sparkles, 
  TrendingDown, 
  DollarSign, 
  Leaf, 
  AlertCircle, 
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

export const ImpactPage: React.FC = () => {
  const [impactInput, setImpactInput] = useState<ImpactInput>({
    mealsPreparedPerDay: 1200,
    avgWastePerMealServings: 60,
    operatingDaysPerMonth: 25,
    potentialReductionPct: 35,
    costPerWastedMeal: 40 // Local currency units / INR default
  });

  const result = calculateSustainabilityImpact(impactInput);

  const handleInputChange = (field: keyof ImpactInput, value: number) => {
    setImpactInput(prev => ({
      ...prev,
      [field]: Math.max(0, value)
    }));
  };

  return (
    <div className="space-y-10 py-4">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>Sustainability & Financial Modeling</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Food Waste & Cost Impact Calculator</h1>
          <p className="text-slate-600 text-sm mt-1">
            Model potential waste reduction and cost-saving opportunities for your food service operation.
          </p>
        </div>
      </div>

      {/* Main Layout: Inputs (Left) & Calculated Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUTS PANEL */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-lg text-slate-900">Operational Inputs</h2>
            <p className="text-xs text-slate-500">Adjust variables to estimate monthly and annual savings.</p>
          </div>

          <div className="space-y-4">
            
            {/* Input 1 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Meals Prepared Per Day (Servings)
              </label>
              <input
                type="number"
                min="1"
                value={impactInput.mealsPreparedPerDay}
                onChange={(e) => handleInputChange('mealsPreparedPerDay', parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-mono"
              />
            </div>

            {/* Input 2 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Average Waste Per Day (Servings)
              </label>
              <input
                type="number"
                min="0"
                value={impactInput.avgWastePerMealServings}
                onChange={(e) => handleInputChange('avgWastePerMealServings', parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-mono"
              />
            </div>

            {/* Input 3 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Operating Days Per Month
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={impactInput.operatingDaysPerMonth}
                onChange={(e) => handleInputChange('operatingDaysPerMonth', parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-mono"
              />
            </div>

            {/* Input 4: Slider for Target Reduction */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Target AI Waste Reduction %
                </label>
                <span className="text-xs font-extrabold text-emerald-600 font-mono">
                  {impactInput.potentialReductionPct}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="75"
                step="5"
                value={impactInput.potentialReductionPct}
                onChange={(e) => handleInputChange('potentialReductionPct', parseInt(e.target.value) || 0)}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[11px] text-slate-400 block mt-1">Typical AI optimization yields 25% - 45% reduction</span>
            </div>

            {/* Input 5 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Average Cost Per Wasted Meal (Currency Unit)
              </label>
              <input
                type="number"
                min="0"
                value={impactInput.costPerWastedMeal}
                onChange={(e) => handleInputChange('costPerWastedMeal', parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-mono"
              />
            </div>

          </div>
        </div>

        {/* RESULTS CALCULATIONS PANEL */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Results Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h2 className="font-extrabold text-lg tracking-wide uppercase text-slate-100">CALCULATED SUSTAINABILITY IMPACT</h2>
              </div>
              <span className="text-[11px] uppercase bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-bold border border-emerald-500/30">
                ESTIMATED / PROTOTYPE
              </span>
            </div>

            {/* 4 Primary Metric Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Monthly Waste Avoided</span>
                <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                  {result.potentialMonthlyWasteAvoidedServings.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 block">servings avoided / month</span>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Yearly Waste Avoided</span>
                <span className="text-3xl font-extrabold text-emerald-300 font-mono">
                  {result.potentialYearlyWasteAvoidedServings.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 block">servings avoided / year</span>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Monthly Cost Opportunity</span>
                <span className="text-3xl font-extrabold text-amber-400 font-mono">
                  {result.potentialMonthlyCostSavings.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 block">estimated cost savings / month</span>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Yearly Cost Savings</span>
                <span className="text-3xl font-extrabold text-amber-300 font-mono">
                  {result.potentialYearlyCostSavings.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 block">estimated cost savings / year</span>
              </div>

            </div>

            {/* Environmental CO2 Equivalent Callout */}
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-emerald-400 font-bold uppercase block">Estimated Carbon Offset</span>
                  <span className="text-sm font-semibold text-slate-200">
                    ~{result.co2EquivalentAvoidedKg.toLocaleString()} kg CO₂e greenhouse gas emissions prevented annually
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Honest AI Methodology & Limitations Disclosure */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 text-xs text-slate-600">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-emerald-600" />
              <span>Calculation Methodology & Operational Disclaimer</span>
            </h3>
            <p className="leading-relaxed">
              <strong>ESTIMATED / PROTOTYPE CALCULATION:</strong> Figures displayed above represent theoretical mathematical projections based on user-supplied operating parameters and assumed baseline waste ratios.
            </p>
            <p className="leading-relaxed text-slate-500">
              Actual real-world impact depends on food type, portion size, local operating conditions, student turnout variability, and implementation quality. Do not present estimates as measured real-world impact without empirical site validation.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
