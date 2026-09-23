import React, { useState, useMemo } from 'react';
import { MealRecord } from '../types';
import { 
  calculateAnalyticsKPIs, 
  getMealTypeBreakdown, 
  getDayOfWeekBreakdown, 
  getEventVsNormalComparison 
} from '../services/dataAnalysisEngine';
import { 
  BarChart3, 
  TrendingUp, 
  Utensils, 
  Trash2, 
  Percent, 
  Sparkles, 
  Search, 
  Filter,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  LineChart, 
  Line, 
  Cell 
} from 'recharts';

interface DashboardPageProps {
  dataset: MealRecord[];
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ dataset }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mealFilter, setMealFilter] = useState<string>('ALL');

  // Filter dataset dynamically
  const filteredDataset = useMemo(() => {
    return dataset.filter(r => {
      const matchesSearch = r.date.includes(searchTerm) || 
                            r.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            r.event_type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMeal = mealFilter === 'ALL' || r.meal_type === mealFilter;
      return matchesSearch && matchesMeal;
    });
  }, [dataset, searchTerm, mealFilter]);

  const kpis = calculateAnalyticsKPIs(filteredDataset);
  const mealBreakdown = getMealTypeBreakdown(filteredDataset);
  const dayBreakdown = getDayOfWeekBreakdown(filteredDataset);
  const eventComparison = getEventVsNormalComparison(filteredDataset);

  // Chart 1 & 2: Time Series Data (Prepared vs Consumed & Waste Trend)
  const timeSeriesData = useMemo(() => {
    // Group by date
    const dateMap: { [date: string]: { date: string; prepared: number; consumed: number; wasted: number } } = {};
    dataset.forEach(r => {
      if (!dateMap[r.date]) {
        dateMap[r.date] = { date: r.date.substring(5), prepared: 0, consumed: 0, wasted: 0 };
      }
      dateMap[r.date].prepared += r.prepared_servings;
      dateMap[r.date].consumed += r.consumed_servings;
      dateMap[r.date].wasted += r.wasted_servings;
    });
    return Object.values(dateMap);
  }, [dataset]);

  // Chart 5: Expected Demand vs Actual Consumption
  const demandVsActualData = useMemo(() => {
    return dataset.slice(0, 20).map(r => ({
      label: `${r.date.substring(5)} (${r.meal_type[0]})`,
      expected: r.expected_students,
      consumed: r.consumed_servings,
      prepared: r.prepared_servings
    }));
  }, [dataset]);

  // Chart 6: Holiday/Event vs Normal Day Waste Data
  const eventVsNormalChartData = [
    {
      category: 'Normal Days',
      avgWasted: eventComparison.normalDays.avgWastedPerMeal,
      wastePct: eventComparison.normalDays.wastePct
    },
    {
      category: 'Event/Holiday Days',
      avgWasted: eventComparison.eventDays.avgWastedPerMeal,
      wastePct: eventComparison.eventDays.wastePct
    }
  ];

  return (
    <div className="space-y-10 py-4">
      
      {/* Page Title & Demo Dataset Disclaimer */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Institutional Food Analytics</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Historical Analytics Dashboard</h1>
          <p className="text-slate-600 text-sm mt-1">
            Comprehensive historical consumption and food waste analytics across 60 service records.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Demo dataset — for prototype demonstration only.</span>
        </div>
      </div>

      {/* 5 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Prepared</span>
            <Utensils className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {kpis.totalPrepared.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 block">servings prepared</span>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Consumed</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
            {kpis.totalConsumed.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 block">servings consumed</span>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Wasted</span>
            <Trash2 className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-mono">
            {kpis.totalWasted.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 block">servings wasted</span>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Average Waste %</span>
            <Percent className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
            {kpis.avgWastePercentage}%
          </div>
          <span className="text-xs text-slate-400 block">of prepared volume</span>
        </div>

        {/* KPI 5 */}
        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl p-5 border border-emerald-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">Reduction Opportunity</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">
            ~{kpis.potentialReductionOpportunityServings.toLocaleString()}
          </div>
          <span className="text-xs text-emerald-400/80 block">servings saveable via AI</span>
        </div>

      </div>

      {/* 6 RECHARTS VISUALIZATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Food Prepared vs Consumed (Time-series) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900">1. Food Prepared vs Consumed Over Time</h3>
            <span className="text-xs text-slate-400">Daily Total Servings</span>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSeriesData.slice(-14)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="prepared" name="Prepared" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="consumed" name="Consumed" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Food Waste Trend over time */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900">2. Food Waste Volume Trend</h3>
            <span className="text-xs text-slate-400">Daily Wasted Servings</span>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData.slice(-14)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Line type="monotone" dataKey="wasted" name="Wasted Servings" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Waste by Meal Type */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900">3. Average Waste % by Meal Type</h3>
            <span className="text-xs text-slate-400">Breakfast / Lunch / Dinner</span>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mealBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="mealType" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} />
                <YAxis unit="%" tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="avgWastePct" name="Avg Waste %" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Waste by Day of Week */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900">4. Waste Rate by Day of Week</h3>
            <span className="text-xs text-slate-400">Monday through Sunday</span>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dayBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis unit="%" tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="avgWastePct" name="Waste %" radius={[6, 6, 0, 0]}>
                  {dayBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.day === 'Friday' ? '#ef4444' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: Expected Demand vs Actual Consumption */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900">5. Expected Demand vs Actual Consumption</h3>
            <span className="text-xs text-slate-400">Sample Services</span>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandVsActualData.slice(0, 10)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="expected" name="Expected Students" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="consumed" name="Actual Consumed" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 6: Holiday/Event vs Normal Day Waste */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900">6. Holiday/Event vs Normal Operating Day Waste</h3>
            <span className="text-xs text-slate-400">Avg Wasted Servings</span>
          </div>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventVsNormalChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="category" tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="avgWasted" name="Avg Wasted Servings" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* INTERACTIVE DEMO DATASET TABLE */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">Demo Service Records ({filteredDataset.length})</h3>
            <p className="text-xs text-slate-500">Inspect historical records used to train and validate the prototype predictor.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search date or event..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 bg-slate-50"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={mealFilter}
                onChange={(e) => setMealFilter(e.target.value)}
                className="bg-transparent font-semibold text-slate-700 outline-none cursor-pointer"
              >
                <option value="ALL">All Meals</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0">
              <tr>
                <th className="p-3">ID / Date</th>
                <th className="p-3">Day</th>
                <th className="p-3">Meal</th>
                <th className="p-3 text-right">Expected</th>
                <th className="p-3 text-right">Prepared</th>
                <th className="p-3 text-right">Consumed</th>
                <th className="p-3 text-right">Wasted</th>
                <th className="p-3 text-right">Waste %</th>
                <th className="p-3">Event Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredDataset.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-semibold text-slate-900">{r.date}</td>
                  <td className="p-3 text-slate-600 font-sans">{r.day}</td>
                  <td className="p-3 font-sans font-medium">
                    <span className={`px-2 py-0.5 rounded text-[11px] ${
                      r.meal_type === 'Lunch' ? 'bg-amber-100 text-amber-800' :
                      r.meal_type === 'Breakfast' ? 'bg-blue-100 text-blue-800' :
                      'bg-indigo-100 text-indigo-800'
                    }`}>
                      {r.meal_type}
                    </span>
                  </td>
                  <td className="p-3 text-right text-slate-600">{r.expected_students}</td>
                  <td className="p-3 text-right font-bold text-slate-800">{r.prepared_servings}</td>
                  <td className="p-3 text-right text-emerald-600 font-bold">{r.consumed_servings}</td>
                  <td className="p-3 text-right font-bold text-rose-600">{r.wasted_servings}</td>
                  <td className="p-3 text-right font-bold">
                    <span className={`px-1.5 py-0.5 rounded ${
                      r.waste_percentage > 6 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {r.waste_percentage}%
                    </span>
                  </td>
                  <td className="p-3 font-sans">
                    {r.holiday_event === 'Yes' ? (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold text-[10px]">
                        {r.event_type}
                      </span>
                    ) : (
                      <span className="text-slate-400">Normal</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
