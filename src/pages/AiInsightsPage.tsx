import React from 'react';
import { MealRecord } from '../types';
import { generateDatasetInsights } from '../services/dataAnalysisEngine';
import { 
  Sparkles, 
  TrendingUp, 
  BrainCircuit, 
  CheckCircle2, 
  Award, 
  AlertTriangle, 
  HelpCircle, 
  Lightbulb,
  FileSearch
} from 'lucide-react';

interface AiInsightsPageProps {
  dataset: MealRecord[];
}

export const AiInsightsPage: React.FC<AiInsightsPageProps> = ({ dataset }) => {
  const insights = generateDatasetInsights(dataset);

  return (
    <div className="space-y-10 py-4">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Intelligent Data Analysis</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">AI Pattern & Behavioral Insights</h1>
        <p className="text-slate-600 text-sm mt-1">
          Automated pattern detection and waste analysis extracted from historical canteen service records.
        </p>
      </div>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. TOP WASTE PATTERN */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-rose-600 block">TOP WASTE PATTERN</span>
            <h3 className="font-extrabold text-slate-900 text-base">{insights.topWastePattern.title}</h3>
            <p className="text-slate-600 text-xs leading-relaxed">{insights.topWastePattern.detail}</p>
          </div>
          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
            Evidence: {insights.topWastePattern.evidence}
          </div>
        </div>

        {/* 2. DEMAND PATTERN */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 block">DEMAND PATTERN</span>
            <h3 className="font-extrabold text-slate-900 text-base">{insights.demandPattern.title}</h3>
            <p className="text-slate-600 text-xs leading-relaxed">{insights.demandPattern.detail}</p>
          </div>
          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
            Evidence: {insights.demandPattern.evidence}
          </div>
        </div>

        {/* 3. MEAL INSIGHT */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-blue-600 block">MEAL INSIGHT</span>
            <h3 className="font-extrabold text-slate-900 text-base">{insights.mealInsight.title}</h3>
            <p className="text-slate-600 text-xs leading-relaxed">{insights.mealInsight.detail}</p>
          </div>
          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
            Evidence: {insights.mealInsight.evidence}
          </div>
        </div>

        {/* 4. DAY-OF-WEEK INSIGHT */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-800 block">DAY-OF-WEEK INSIGHT</span>
            <h3 className="font-extrabold text-slate-900 text-base">{insights.dayOfWeekInsight.title}</h3>
            <p className="text-slate-600 text-xs leading-relaxed">{insights.dayOfWeekInsight.detail}</p>
          </div>
          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
            Evidence: {insights.dayOfWeekInsight.evidence}
          </div>
        </div>

        {/* 5. EVENT INSIGHT */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <FileSearch className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-600 block">EVENT INSIGHT</span>
            <h3 className="font-extrabold text-slate-900 text-base">{insights.eventInsight.title}</h3>
            <p className="text-slate-600 text-xs leading-relaxed">{insights.eventInsight.detail}</p>
          </div>
          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
            Evidence: {insights.eventInsight.evidence}
          </div>
        </div>

        {/* 6. ACTIONABLE AI RECOMMENDATION */}
        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-6 border border-emerald-800 shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold border border-emerald-500/30">
              <Lightbulb className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 block">SYSTEM RECOMMENDATION</span>
            <h3 className="font-extrabold text-emerald-200 text-base">{insights.aiRecommendation.action}</h3>
            <p className="text-slate-300 text-xs leading-relaxed">{insights.aiRecommendation.summary}</p>
          </div>
          <div className="pt-4 border-t border-emerald-800/80 text-[11px] text-emerald-400 font-bold">
            Expected Impact: {insights.aiRecommendation.estimatedSavingsPct}
          </div>
        </div>

      </div>

      {/* HOW AI GENERATED THIS INSIGHT SECTION */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <BrainCircuit className="w-6 h-6 text-emerald-400" />
          <div>
            <h3 className="font-extrabold text-lg">How AI Generated These Insights</h3>
            <p className="text-xs text-slate-400">Transparent explanation of the analytics & pattern extraction methodology.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="space-y-2">
            <span className="font-bold text-emerald-400 block">1. Multi-Dimensional Aggregation</span>
            <p className="leading-relaxed text-slate-400">
              The engine groups historical service logs by meal type, day of week, and event status to evaluate statistical variance.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-emerald-400 block">2. Empirical Ratio Calculation</span>
            <p className="leading-relaxed text-slate-400">
              Calculates consumption ratios (Consumed / Prepared) and waste percentages for every subgroup to identify systematic over-preparation.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-emerald-400 block">3. Supported Rule Extraction</span>
            <p className="leading-relaxed text-slate-400">
              Generates only natural-language statements directly grounded in the empirical demo dataset without synthetic hallucinations.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
