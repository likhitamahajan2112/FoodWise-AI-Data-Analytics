import React, { useState } from 'react';
import { Navbar, PageId } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DemoModeBanner } from './components/common/DemoModeBanner';
import { INITIAL_DEMO_DATASET } from './data/demoData';
import { MealRecord } from './types';

// Pages
import { HomePage } from './pages/HomePage';
import { PredictionPage } from './pages/PredictionPage';
import { DashboardPage } from './pages/DashboardPage';
import { AiInsightsPage } from './pages/AiInsightsPage';
import { ImpactPage } from './pages/ImpactPage';
import { ResponsibleAiPage } from './pages/ResponsibleAiPage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  const getPageFromHash = (): PageId => {
    const hash = window.location.hash.replace('#', '') as PageId;
    const validPages: PageId[] = ['home', 'predict', 'dashboard', 'insights', 'impact', 'responsible', 'about'];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);
  const [dataset, setDataset] = useState<MealRecord[]>(INITIAL_DEMO_DATASET);

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleResetData = () => {
    setDataset(INITIAL_DEMO_DATASET);
  };

  const handleLoadScenario = () => {
    setCurrentPage('predict');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Demo Banner */}
      <DemoModeBanner 
        onResetData={handleResetData}
        onLoadScenario={handleLoadScenario}
      />

      {/* Main Responsive Navigation Bar */}
      <Navbar 
        currentPage={currentPage}
        onSelectPage={setCurrentPage}
      />

      {/* Page Content Router Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'predict' && <PredictionPage />}
        {currentPage === 'dashboard' && <DashboardPage dataset={dataset} />}
        {currentPage === 'insights' && <AiInsightsPage dataset={dataset} />}
        {currentPage === 'impact' && <ImpactPage />}
        {currentPage === 'responsible' && <ResponsibleAiPage />}
        {currentPage === 'about' && <AboutPage />}
      </main>

      {/* Shared Footer */}
      <Footer onSelectPage={setCurrentPage} />

    </div>
  );
};

export default App;
