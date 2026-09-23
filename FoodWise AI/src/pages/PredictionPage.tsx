import React, { useState } from 'react';
import { EventType, MealType, PredictionInput, PredictionResult } from '../types';
import { predictFoodRequirement } from '../services/aiPredictionEngine';
import { RiskGauge } from '../components/common/RiskGauge';
import { ExportModal } from '../components/export/ExportModal';
import { 
  BrainCircuit, 
  Sparkles, 
  HelpCircle, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  BarChart as BarChartIcon 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

export const PredictionPage: React.FC = () => {
  // Default form state initialized with the official demo scenario
  const [formInput, setFormInput] = useState<PredictionInput>({
    date: '2026-09-12',
    meal_type: 'Lunch',
    expected_students: 400,
    prev_avg_attendance: 395,
    prev_food_prepared: 420,
    prev_food_consumed: 398,
    prev_food_waste: 22,
    holiday_event: 'No',
    event_type: 'None'
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(() => predictFoodRequirement({
    date: '2026-09-12',
    meal_type: 'Lunch',
    expected_students: 400,
    prev_avg_attendance: 395,
    prev_food_prepared: 420,
    prev_food_consumed: 398,
    prev_food_waste: 22,
    holiday_event: 'No',
    event_type: 'None'
  }));

  const [showExportModal, setShowExportModal] = useState(false);

  const handleInputChange = (field: keyof PredictionInput, value: any) => {
    setFormInput(prev => ({
      ...prev,
      [field]: value
    }));
    setValidationError(null);
  };

  const handleLoadDemoPreset = () => {
    const demoPreset: PredictionInput = {
      date: '2026-09-12',
      meal_type: 'Lunch',
      expected_students: 400,
      prev_avg_attendance: 395,
      prev_food_prepared: 420,
      prev_food_consumed: 398,
      prev_food_waste: 22,
      holiday_event: 'No',
      event_type: 'None'
    };
    setFormInput(demoPreset);
    setValidationError(null);
    setResult(predictFoodRequirement(demoPreset));
  };

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();

    // Input Validations
    if (formInput.expected_students <= 0) {
      setValidationError('Expected students must be greater than 0.');
      return;
    }
    if (formInput.prev_avg_attendance < 0 || formInput.prev_food_prepared < 0 || formInput.prev_food_consumed < 0 || formInput.prev_food_waste < 0) {
      setValidationError('Input quantities cannot be negative numbers.');
      return;
    }
    if (formInput.prev_food_consumed > formInput.prev_food_prepared && formInput.prev_food_prepared > 0) {
      setValidationError('Previous food consumed cannot exceed previous food prepared.');
      return;
    }

    setValidationError(null);
    const calculatedResult = predictFoodRequirement(formInput);
    setResult(calculatedResult);
  };

  const chartData = result ? [
    {
      name: 'Expected Demand',
      servings: result.expected_demand,
      fill: '#3b82f6'
    },
    {
      name: 'Recommended Prep',
      servings: result.recommended_preparation,
      fill: '#10b981'
    },
    {
      name: 'Potential Waste',
      servings: result.potential_waste_estimate,
      fill: '#f59e0b'
    }
  ] : [];

  return (
    <div className="space-y-10 py-4">
      
      {/* Header & Subtitle */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <BrainCircuit className="w-4 h-4" />
            <span>AI Demand Prediction Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Food Requirement Predictor</h1>
          <p className="text-slate-600 text-sm mt-1">
            Calculate expected demand and recommended preparation volume using transparent multi-factor AI.
          </p>
        </div>

        <button
          onClick={handleLoadDemoPreset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Load Demo Preset</span>
        </button>
      </div>

      {/* Main Grid: Form (Left) & Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUT FORM SECTION */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-extrabold text-lg text-slate-900">Service Inputs</h2>
            <span className="text-xs text-slate-400 font-medium">All fields required</span>
          </div>

          {validationError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{validationError}</span>
            </div>
          )}

          <form onSubmit={handlePredict} className="space-y-4">
            
            {/* 1. Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">1. Date</label>
              <input
                type="date"
                value={formInput.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
                required
              />
            </div>

            {/* 2. Meal Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">2. Meal Type</label>
              <select
                value={formInput.meal_type}
                onChange={(e) => handleInputChange('meal_type', e.target.value as MealType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50 font-medium"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>

            {/* 3. Expected Students */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">3. Expected Students</label>
              <input
                type="number"
                min="1"
                value={formInput.expected_students}
                onChange={(e) => handleInputChange('expected_students', parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
                required
              />
            </div>

            {/* 4. Previous Avg Attendance */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">4. Previous Average Attendance</label>
              <input
                type="number"
                min="0"
                value={formInput.prev_avg_attendance}
                onChange={(e) => handleInputChange('prev_avg_attendance', parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
                required
              />
            </div>

            {/* Grid 5 & 6: Prepared & Consumed */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">5. Prev Prepared</label>
                <input
                  type="number"
                  min="0"
                  value={formInput.prev_food_prepared}
                  onChange={(e) => handleInputChange('prev_food_prepared', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  placeholder="servings"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">6. Prev Consumed</label>
                <input
                  type="number"
                  min="0"
                  value={formInput.prev_food_consumed}
                  onChange={(e) => handleInputChange('prev_food_consumed', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  placeholder="servings"
                  required
                />
              </div>
            </div>

            {/* 7. Previous Food Waste */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">7. Previous Food Waste (servings)</label>
              <input
                type="number"
                min="0"
                value={formInput.prev_food_waste}
                onChange={(e) => handleInputChange('prev_food_waste', parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                required
              />
            </div>

            {/* 8. Holiday / Special Event */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">8. Holiday / Special Event</label>
                <select
                  value={formInput.holiday_event}
                  onChange={(e) => handleInputChange('holiday_event', e.target.value as 'Yes' | 'No')}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 font-medium"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              {/* 9. Event Type */}
              {formInput.holiday_event === 'Yes' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">9. Event Type</label>
                  <select
                    value={formInput.event_type}
                    onChange={(e) => handleInputChange('event_type', e.target.value as EventType)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-slate-50/50 font-medium"
                  >
                    <option value="Festival">Festival</option>
                    <option value="College Event">College Event</option>
                    <option value="Examination">Examination</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm tracking-wider uppercase transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.99] cursor-pointer mt-4"
            >
              PREDICT FOOD REQUIREMENT
            </button>
          </form>
        </div>

        {/* RESULTS & VISUALIZATION SECTION */}
        <div className="lg:col-span-7 space-y-6">
          
          {result ? (
            <div className="space-y-6">
              
              {/* Top Prediction Summary Banner */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
                
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <h2 className="font-extrabold text-lg tracking-wide uppercase text-slate-100">AI PREDICTION RESULT</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-mono">
                      Confidence: {result.confidence_score}%
                    </span>
                    <button
                      onClick={() => setShowExportModal(true)}
                      className="inline-flex items-center gap-1.5 text-xs bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 px-3 py-1 rounded-full font-bold border border-emerald-500/30 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Summary</span>
                    </button>
                  </div>
                </div>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-center">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Expected Demand</span>
                    <span className="text-3xl font-extrabold text-blue-400 font-mono">{result.expected_demand}</span>
                    <span className="text-xs text-slate-400 block mt-1">servings</span>
                  </div>

                  <div className="bg-emerald-950/80 p-4 rounded-2xl border border-emerald-800/80 text-center">
                    <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-1">Recommended Prep</span>
                    <span className="text-3xl font-extrabold text-emerald-300 font-mono">{result.recommended_preparation}</span>
                    <span className="text-xs text-emerald-400 block mt-1">servings</span>
                  </div>

                  <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 text-center">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Safety Buffer</span>
                    <span className="text-3xl font-extrabold text-amber-400 font-mono">+{result.safety_buffer_percentage}%</span>
                    <span className="text-xs text-slate-400 block mt-1">controlled buffer</span>
                  </div>

                </div>

                {/* Waste Risk Gauge */}
                <div className="pt-2">
                  <RiskGauge level={result.waste_risk} />
                </div>

                {/* AI Recommendation Narrative */}
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200 leading-relaxed space-y-2">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider block">AI RECOMMENDATION:</span>
                  <p>{result.recommendation_text}</p>
                </div>

              </div>

              {/* WHY THIS RECOMMENDATION? (3-5 Dynamic Factors) */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Info className="w-5 h-5 text-emerald-600" />
                  <span>WHY THIS RECOMMENDATION?</span>
                </h3>

                <div className="space-y-3">
                  {result.factors.map((factor, index) => (
                    <div key={index} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{factor.title}</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed pl-6">
                        {factor.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* BAR CHART VISUALIZATION */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <BarChartIcon className="w-5 h-5 text-emerald-600" />
                    <span>Demand vs Preparation vs Potential Waste</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">Servings breakdown</span>
                </div>

                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }} />
                      <YAxis tick={{ fontSize: 12, fill: '#475569' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                        formatter={(val: any) => [`${val} servings`, 'Volume']}
                      />
                      <Bar dataKey="servings" radius={[8, 8, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Responsible AI Disclaimer */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Decision Support Guidance:</strong> AI recommendations are generated as decision-support estimates to assist kitchen management and should not replace human operational judgment.
                </p>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4">
              <BrainCircuit className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700 text-lg">No Prediction Generated</h3>
              <p className="text-slate-500 text-xs max-w-sm mx-auto">
                Fill out the service input parameters on the left and click "Predict Food Requirement" to run the AI model.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* EXPORT MODAL */}
      {showExportModal && result && (
        <ExportModal
          input={formInput}
          result={result}
          onClose={() => setShowExportModal(false)}
        />
      )}

    </div>
  );
};
