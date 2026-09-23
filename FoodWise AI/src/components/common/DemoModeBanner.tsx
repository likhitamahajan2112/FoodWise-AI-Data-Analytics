import React from 'react';
import { Sparkles, RotateCcw, PlayCircle } from 'lucide-react';

interface DemoModeBannerProps {
  onResetData: () => void;
  onLoadScenario?: () => void;
}

export const DemoModeBanner: React.FC<DemoModeBannerProps> = ({ onResetData, onLoadScenario }) => {
  return (
    <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
          <Sparkles className="w-3.5 h-3.5" /> DEMO MODE ACTIVE
        </span>
        <span className="text-slate-300 hidden md:inline">
          Sample dataset — for prototype demonstration only. Food Demand & Waste Prediction System.
        </span>
      </div>

      <div className="flex items-center gap-3">
        {onLoadScenario && (
          <button
            onClick={onLoadScenario}
            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer"
            title="Pre-fill default demo inputs (Lunch, 400 Expected)"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Load Demo Preset</span>
          </button>
        )}
        <button
          onClick={onResetData}
          className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 font-medium transition-colors cursor-pointer"
          title="Reset dataset to original 60 sample records"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </div>
  );
};
