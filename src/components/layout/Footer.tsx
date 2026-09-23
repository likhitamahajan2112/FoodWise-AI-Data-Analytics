import React from 'react';
import { Leaf, Award, ExternalLink } from 'lucide-react';
import { PageId } from './Navbar';

interface FooterProps {
  onSelectPage: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPage }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                FoodWise<span className="text-emerald-400">AI</span>
              </span>
            </div>
            <p className="text-slate-300 max-w-md leading-relaxed">
              "Predict smarter. Prepare better. Waste less."
            </p>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              An AI-powered decision-support prototype designed for college canteens, hostel messes, and institutional food services to eliminate avoidable food waste.
            </p>
            <div className="flex items-center gap-2 pt-2 text-emerald-400 font-semibold text-xs">
              <Award className="w-4 h-4" />
              <span>Food Demand and Waste Prediction System</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">System Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectPage('home')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPage('predict')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  AI Prediction Model
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPage('dashboard')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Analytics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPage('insights')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  AI Pattern Insights
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPage('impact')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Impact Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Governance & Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Governance & Info</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectPage('responsible')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Responsible AI Framework
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPage('about')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  About Project
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} FoodWise AI. Built for food demand and waste prediction.
          </div>
          <div className="flex items-center gap-4">
            <span>Focus: Data-Driven Food Preparation & Waste Reduction</span>
            <span>•</span>
            <span>Version 1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
