import React, { useState } from 'react';
import { PredictionInput, PredictionResult } from '../../types';
import { Download, X, FileText, CheckCircle2, Copy } from 'lucide-react';

interface ExportModalProps {
  input: PredictionInput;
  result: PredictionResult;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ input, result, onClose }) => {
  const [copied, setCopied] = useState(false);

  const formattedSummary = `==================================================
FOODWISE AI — PREDICTION SUMMARY REPORT
"Predict smarter. Prepare better. Waste less."
==================================================
Generated On: ${new Date().toLocaleString()}
Project: Food Demand and Waste Prediction System

--- INPUT PARAMETERS ---
Date: ${input.date || 'N/A'}
Meal Type: ${input.meal_type}
Expected Students: ${input.expected_students}
Previous Average Attendance: ${input.prev_avg_attendance}
Previous Prepared Servings: ${input.prev_food_prepared}
Previous Consumed Servings: ${input.prev_food_consumed}
Previous Wasted Servings: ${input.prev_food_waste}
Holiday / Special Event: ${input.holiday_event} (${input.event_type})

--- AI PREDICTION RESULTS ---
Expected Demand: ${result.expected_demand} servings
Recommended Preparation: ${result.recommended_preparation} servings
Safety Buffer: ${result.safety_buffer_percentage}%
Waste Risk Level: ${result.waste_risk}
Model Confidence Score: ${result.confidence_score}%
Estimated Potential Waste: ${result.potential_waste_estimate} servings

--- AI RECOMMENDATION ---
${result.recommendation_text}

--- KEY FACTORS INFLUENCING RECOMMENDATION ---
${result.factors.map((f, i) => `${i + 1}. ${f.title}\n   - ${f.detail}`).join('\n')}

--- METHODOLOGY NOTE ---
${result.methodology_note}

==================================================
FoodWise AI is a decision-support prototype.
Food Demand & Waste Analytics.
==================================================`;

  const handleDownload = () => {
    const blob = new Blob([formattedSummary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FoodWise_Prediction_${input.meal_type}_${input.date || 'summary'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-lg">Download Prediction Summary</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-xs text-slate-500 mb-3">
            Review the generated summary text below. You can download it as a text document or copy it directly for your report.
          </p>

          <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs font-mono max-h-80 overflow-y-auto whitespace-pre-wrap border border-slate-800 leading-relaxed selection:bg-emerald-900 selection:text-white">
            {formattedSummary}
          </pre>

          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-sm transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download File (.txt)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
