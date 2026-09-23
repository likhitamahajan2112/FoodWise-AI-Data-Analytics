import React, { useState } from 'react';
import { ResponsibleCheckItem } from '../types';
import { 
  ShieldCheck, 
  Eye, 
  Scale, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  FileCheck,
  CheckSquare,
  Square
} from 'lucide-react';

export const ResponsibleAiPage: React.FC = () => {
  const initialChecklist: ResponsibleCheckItem[] = [
    {
      id: 'chk-1',
      category: 'Transparency',
      title: 'Dynamic Factor Explanations',
      description: 'System displays 3-5 human-readable factor explanations for every prediction result.',
      status: 'passed',
      details: 'Evaluated dynamically based on expected attendance, past waste, and event factors.'
    },
    {
      id: 'chk-2',
      category: 'Privacy',
      title: 'Zero PII Data Collection',
      description: 'System functions exclusively on aggregated attendance numbers without student IDs or names.',
      status: 'passed',
      details: '100% anonymous institutional volume inputs.'
    },
    {
      id: 'chk-3',
      category: 'Ethics',
      title: 'Decision Support Scoping',
      description: 'System clearly explicitly labels recommendations as decision support, not automated execution.',
      status: 'passed',
      details: 'Prominent disclaimers remind operators that human kitchen judgment is required.'
    },
    {
      id: 'chk-4',
      category: 'Fairness',
      title: 'Multi-Condition Evaluation',
      description: 'Model tested across Breakfast, Lunch, Dinner, weekdays, weekends, and event days.',
      status: 'passed',
      details: 'Prevents systematic bias toward single meal types or standard operating days.'
    },
    {
      id: 'chk-5',
      category: 'Validation',
      title: 'Honest AI Disclaimer',
      description: 'No false ML claims or fabricated 99% accuracy figures.',
      status: 'passed',
      details: 'Engine clearly documents transparent statistical multi-factor regression methodology.'
    }
  ];

  const [checklist, setChecklist] = useState<ResponsibleCheckItem[]>(initialChecklist);

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === 'passed' ? 'review_required' : 'passed'
        };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-10 py-4">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Ethical & Transparent AI Governance</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Responsible AI Framework</h1>
        <p className="text-slate-600 text-sm mt-1">
          Principles, governance guidelines, limitations disclosure, and interactive audit checklist for FoodWise AI.
        </p>
      </div>

      {/* 4 CORE GOVERNANCE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. FAIRNESS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-600 block">PILLAR 1</span>
              <h2 className="font-extrabold text-lg text-slate-900">FAIRNESS</h2>
            </div>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            "The system should be evaluated across different meal types, days, attendance levels and operating conditions to avoid systematic prediction errors."
          </p>
          <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/80 text-blue-950 text-xs leading-relaxed">
            <strong>Implementation:</strong> Coefficients are calibrated independently for Breakfast, Lunch, Dinner, weekends, and event days so no single meal service suffers from systematic under-preparation or excessive buffer trimming.
          </div>
        </div>

        {/* 2. TRANSPARENCY */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 block">PILLAR 2</span>
              <h2 className="font-extrabold text-lg text-slate-900">TRANSPARENCY</h2>
            </div>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            "The recommendation is based on historical consumption patterns and user-provided inputs. The application displays the main factors influencing the recommendation."
          </p>
          <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950 text-xs leading-relaxed">
            <strong>Implementation:</strong> Every prediction outputs a human-readable factor breakdown detailing attendance ratios, meal type factors, event multipliers, and exact buffer mathematics.
          </div>
        </div>

        {/* 3. ETHICS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-800 block">PILLAR 3</span>
              <h2 className="font-extrabold text-lg text-slate-900">ETHICS</h2>
            </div>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            "Predictions are decision-support estimates and should not be treated as guaranteed outcomes."
          </p>
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs leading-relaxed">
            <strong>Implementation:</strong> System explicitly reminds operators that human kitchen staff review is essential, preventing automated or blind reliance on algorithmic outputs.
          </div>
        </div>

        {/* 4. PRIVACY */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-600 block">PILLAR 4</span>
              <h2 className="font-extrabold text-lg text-slate-900">PRIVACY</h2>
            </div>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            "The prototype does not require student names, IDs or personally identifiable information."
          </p>
          <div className="p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-200/80 text-indigo-950 text-xs leading-relaxed">
            <strong>Implementation:</strong> Operates strictly on numerical attendance aggregates and historical headcounts without tracking individual student dining habits or identity records.
          </div>
        </div>

      </div>

      {/* SYSTEM LIMITATIONS SECTION */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-rose-600 font-extrabold text-lg border-b border-slate-100 pb-3">
          <AlertTriangle className="w-5 h-5" />
          <h2>System Limitations & Boundary Conditions</h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
          <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">1. Data Volume Dependency</strong>
            <span>Limited historical service records reduce statistical confidence and prediction quality.</span>
          </li>
          <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">2. Unplanned Demand Spikes</strong>
            <span>Sudden unannounced campus events or weather disruptions can alter real demand rapidly.</span>
          </li>
          <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">3. Festive & Holiday Variance</strong>
            <span>Holidays and long weekends may produce non-standard consumption patterns.</span>
          </li>
          <li className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">4. Human Review Required</strong>
            <span>Predictions must always be reviewed by food-service operators before cooking.</span>
          </li>
        </ul>
      </section>

      {/* INTERACTIVE RESPONSIBLE AI AUDIT CHECKLIST */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <FileCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="font-extrabold text-lg">Responsible AI Audit Checklist</h2>
              <p className="text-xs text-slate-400">Interactive compliance checklist for internship evaluation.</p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Passed: {checklist.filter(c => c.status === 'passed').length} / {checklist.length}
          </span>
        </div>

        <div className="space-y-3">
          {checklist.map((item) => {
            const isPassed = item.status === 'passed';
            return (
              <div 
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  isPassed 
                    ? 'bg-slate-800/80 border-slate-700 hover:border-slate-600' 
                    : 'bg-rose-950/40 border-rose-800/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-emerald-400">
                    {isPassed ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-slate-500" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-100">{item.title}</span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                    <p className="text-[11px] text-slate-400 italic pt-0.5">{item.details}</p>
                  </div>
                </div>

                <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase shrink-0 ${
                  isPassed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {isPassed ? 'Passed' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
