import React from 'react';
import { PageId } from '../components/layout/Navbar';
import { 
  BrainCircuit, 
  BarChart3, 
  Sparkles, 
  ArrowRight, 
  Database, 
  CheckCircle2, 
  TrendingDown, 
  ChefHat, 
  ShieldCheck,
  Building2,
  Utensils
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 py-6">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-900 via-slate-900 to-slate-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-emerald-900/50">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Data-Driven Decision Support System
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
              FOODWISE <span className="text-emerald-400">AI</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-emerald-200 tracking-wide font-sans">
              "Predict smarter. Prepare better. Waste less."
            </p>
          </div>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            An AI-powered food demand and waste prediction assistant designed to help institutional food services make smarter preparation decisions and reduce avoidable food waste.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('predict')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <BrainCircuit className="w-5 h-5" />
              <span>Start Prediction</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-white font-bold text-base border border-slate-700 transition-all cursor-pointer"
            >
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <span>Explore Dashboard</span>
            </button>
          </div>

          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>College Canteens & Messes</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Transparent AI Model</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <span>Estimated 30-50% Waste Avoided</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS SECTION */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Intelligent Features for Sustainability
          </h2>
          <p className="text-slate-600 text-sm">
            Empowering institutional kitchen managers with data-driven decision support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">AI Demand Prediction</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Predict expected meal demand using historical attendance patterns, meal types, and day-of-week multipliers.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <span>Multi-factor statistical model</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ChefHat className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Waste Risk Analysis</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Identify situations where over-preparation may increase waste and automatically optimize safety buffers.
            </p>
            <div className="pt-2 text-xs font-semibold text-amber-800 flex items-center gap-1">
              <span>Real-time Risk Level (Low/Med/High)</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Sustainability Insights</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Understand historical waste trends and estimate potential cost-saving and food waste reduction opportunities.
            </p>
            <div className="pt-2 text-xs font-semibold text-indigo-700 flex items-center gap-1">
              <span>Dynamic dataset analysis</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-600">Decision-Support Workflow</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How FoodWise AI Works</h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            A 5-step operational pipeline connecting data inputs to real-world waste reduction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
              1
            </div>
            <div className="font-bold text-sm text-slate-900">DATA</div>
            <p className="text-xs text-slate-500 leading-snug">
              Expected students, meal type, day of week, previous waste.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
              2
            </div>
            <div className="font-bold text-sm text-slate-900">AI ANALYSIS</div>
            <p className="text-xs text-slate-500 leading-snug">
              Multi-factor statistical regression & attendance ratio analysis.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
              3
            </div>
            <div className="font-bold text-sm text-slate-900">DEMAND PREDICTION</div>
            <p className="text-xs text-slate-500 leading-snug">
              Estimated meal consumption count for target service.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
              4
            </div>
            <div className="font-bold text-sm text-slate-900">PREPARATION RECOMMENDATION</div>
            <p className="text-xs text-slate-500 leading-snug">
              Recommended servings with trimmed safety buffer.
            </p>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
              5
            </div>
            <div className="font-bold text-sm text-emerald-900">WASTE REDUCTION</div>
            <p className="text-xs text-emerald-800 leading-snug">
              Lower avoidable food waste & operational cost savings.
            </p>
          </div>

        </div>
      </section>

      {/* REAL-WORLD IMPACT SUMMARY */}
      <section className="bg-gradient-to-r from-emerald-50 to-slate-100 rounded-3xl p-8 border border-emerald-200/80 flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-xl font-extrabold text-slate-900">Ready to test the prediction model?</h3>
          <p className="text-slate-600 text-sm">
            Input expected student attendance, meal type, and past consumption metrics to generate a real-time recommendation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('predict')}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            Launch Prediction Tool
          </button>
        </div>
      </section>

    </div>
  );
};
