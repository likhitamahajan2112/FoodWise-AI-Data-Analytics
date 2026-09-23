import React from 'react';
import { 
  Info, 
  Award, 
  Building2, 
  Target, 
  BrainCircuit, 
  TrendingDown, 
  Users, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-10 py-4 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 text-center sm:text-left space-y-2">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
            Project Information
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">About FoodWise AI</h1>
        <p className="text-slate-600 text-base">
          AI-Powered Food Demand and Waste Prediction System.
        </p>
      </div>

      {/* PROJECT TITLE BANNER */}
      <section className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-8 border border-emerald-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <Award className="w-8 h-8 text-emerald-400 shrink-0" />
          <div>
            <h2 className="font-extrabold text-xl text-white">FoodWise AI</h2>
            <p className="text-xs text-emerald-300 font-medium">Food Demand and Waste Prediction System</p>
          </div>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          FoodWise AI is an intelligent data analytics and decision-support prototype. The system targets real-world food waste reduction in educational and institutional environments by analyzing historical attendance, meal type turnouts, and event schedules.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <span className="text-slate-400 font-bold block mb-1">PROJECT TYPE</span>
            <span className="text-emerald-300 font-extrabold">Data Analytics & AI</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <span className="text-slate-400 font-bold block mb-1">FOCUS AREA</span>
            <span className="text-white font-bold">Predictive Canteen Management</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <span className="text-slate-400 font-bold block mb-1">CORE METHODOLOGY</span>
            <span className="text-amber-400 font-bold">Multi-Factor Statistical Regression</span>
          </div>
        </div>
      </section>

      {/* CORE SPECIFICATION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* PROBLEM STATEMENT */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">The Problem</h3>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            College canteens, hostel messes, cafeterias and institutional food services often prepare food based on crude static estimates. Over-preparation leads to massive avoidable food waste, while inaccurate estimates cause unexpected shortages.
          </p>
        </div>

        {/* TARGET USERS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">Target Users</h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>College and University Canteen Managers</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Hostel Mess Supervisors & Caterers</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Corporate & Institutional Cafeteria Operators</span>
            </li>
          </ul>
        </div>

        {/* AI ROLE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">Role of Artificial Intelligence</h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Demand Prediction:</strong> Multi-factor regression estimating meal attendance.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Pattern Detection:</strong> Extracting meal type and day-of-week waste variance.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Waste Risk Analysis:</strong> Assessing preparation safety buffer risks in real-time.</span>
            </li>
          </ul>
        </div>

        {/* EXPECTED IMPACT */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900">Expected Real-World Impact</h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Better preparation planning and buffer control</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Reduced avoidable food waste & organic landfill burden</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Operational cost savings for institutional kitchens</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};
