import React, { useState } from 'react';
import { 
  Home, 
  BrainCircuit, 
  BarChart3, 
  Sparkles, 
  Calculator, 
  ShieldCheck, 
  Info, 
  Menu, 
  X,
  Leaf
} from 'lucide-react';

export type PageId = 'home' | 'predict' | 'dashboard' | 'insights' | 'impact' | 'responsible' | 'about';

interface NavbarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onSelectPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: PageId; label: string; icon: React.ElementType }> = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'predict', label: 'PREDICT', icon: BrainCircuit },
    { id: 'dashboard', label: 'DASHBOARD', icon: BarChart3 },
    { id: 'insights', label: 'AI INSIGHTS', icon: Sparkles },
    { id: 'impact', label: 'IMPACT', icon: Calculator },
    { id: 'responsible', label: 'RESPONSIBLE AI', icon: ShieldCheck },
    { id: 'about', label: 'ABOUT', icon: Info },
  ];

  const handleNavClick = (id: PageId) => {
    onSelectPage(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo Section */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans">
                  FoodWise<span className="text-emerald-600">AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none hidden sm:block">
                Predict smarter. Prepare better. Waste less.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('predict')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
            >
              Start Prediction
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end px-2">
            <button
              onClick={() => handleNavClick('predict')}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              Start Prediction
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
