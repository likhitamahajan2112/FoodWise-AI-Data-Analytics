import React from 'react';
import { RiskLevel } from '../../types';
import { ShieldCheck, AlertTriangle, AlertOctagon } from 'lucide-react';

interface RiskGaugeProps {
  level: RiskLevel;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ level }) => {
  const config = {
    LOW: {
      label: 'LOW RISK',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      badgeBg: 'bg-emerald-600 text-white',
      gaugeWidth: 'w-1/3 bg-emerald-500',
      icon: ShieldCheck,
      description: 'Preparation is close to expected demand. Minimal over-preparation risk.'
    },
    MEDIUM: {
      label: 'MEDIUM RISK',
      color: 'bg-amber-100 text-amber-900 border-amber-300',
      badgeBg: 'bg-amber-600 text-white',
      gaugeWidth: 'w-2/3 bg-amber-500',
      icon: AlertTriangle,
      description: 'Moderate over-preparation risk. Monitor attendance carefully.'
    },
    HIGH: {
      label: 'HIGH RISK',
      color: 'bg-rose-100 text-rose-900 border-rose-300',
      badgeBg: 'bg-rose-600 text-white',
      gaugeWidth: 'w-full bg-rose-500',
      icon: AlertOctagon,
      description: 'Potentially excessive preparation compared with predicted demand.'
    }
  }[level];

  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-xl border ${config.color} transition-all`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          <span className="font-bold tracking-wide text-sm">{config.label}</span>
        </div>
        <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${config.badgeBg}`}>
          {level}
        </span>
      </div>

      {/* Visual Bar Gauge */}
      <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden my-2">
        <div className={`h-full ${config.gaugeWidth} transition-all duration-500 rounded-full`} />
      </div>

      <p className="text-xs opacity-90 leading-relaxed font-medium">
        {config.description}
      </p>
    </div>
  );
};
