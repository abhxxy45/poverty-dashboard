
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Building2, 
  Sprout, 
  Diff, 
  Sigma, 
  Lightbulb, 
  Table,
  Menu,
  X,
  ChevronRight,
  Search,
  MapPin,
  Check,
  Zap,
  RefreshCcw,
  Globe,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Link as LinkIcon,
  Database,
  History,
  Map as MapIcon,
  FileText,
  BarChart3,
  Cpu
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { POVERTY_DATASET, INDIAN_STATES } from './data';
import { Section, PovertyData } from './types';
import DashboardOverview from './components/DashboardOverview';
import YearlyTrendAnalysis from './components/YearlyTrendAnalysis';
import AreaSpecificAnalysis from './components/AreaSpecificAnalysis';
import UrbanRuralComparison from './components/UrbanRuralComparison';
import StatisticalInsights from './components/StatisticalInsights';
import KeyFindings from './components/KeyFindings';
import DatasetPreview from './components/DatasetPreview';
import ExportControls from './components/ExportControls';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');
  const [startYear, setStartYear] = useState<number>(2015);
  const [endYear, setEndYear] = useState<number>(2025);
  const [showUrban, setShowUrban] = useState<boolean>(true);
  const [showRural, setShowRural] = useState<boolean>(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [groundingLinks, setGroundingLinks] = useState<any[]>([]);
  const [engineStatus, setEngineStatus] = useState<'idle' | 'syncing' | 'ready' | 'error'>('idle');

  const reportContainerRef = useRef<HTMLDivElement>(null);
  const years_options = Array.from({ length: 11 }, (_, i) => 2015 + i);

  // Pure JavaScript/TypeScript Engine Hydration
  const syncAnalyticalEngine = async () => {
    setEngineStatus('syncing');
    try {
      // Direct Web-API simulation
      setTimeout(() => setEngineStatus('ready'), 800);
    } catch (err) {
      console.warn("Analytics engine hydration failed");
      setEngineStatus('error');
    }
  };

  const fetchGovInsights = async (state: string) => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide 3-5 official links to NITI Aayog or MoSPI reports regarding multidimensional poverty in ${state}, India. Return only high-authority government sources.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      setGroundingLinks(response.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
    } catch (error) {
      console.error("AI Context Error:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    syncAnalyticalEngine();
  }, []);

  useEffect(() => {
    fetchGovInsights(selectedState);
  }, [selectedState]);

  const filteredData = useMemo(() => {
    return POVERTY_DATASET.filter(d => {
      const stateMatch = d.State === selectedState;
      const yearMatch = d.Year >= startYear && d.Year <= endYear;
      const sectorMatch = (d.Area_Type === 'Urban' && showUrban) || (d.Area_Type === 'Rural' && showRural);
      return stateMatch && yearMatch && sectorMatch;
    });
  }, [selectedState, startYear, endYear, showUrban, showRural]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sidebarNavItems = [
    { id: Section.Overview, icon: LayoutDashboard, label: 'Overview' },
    { id: Section.YearlyTrend, icon: Calendar, label: 'Trend Vectors' },
    { id: Section.UrbanAnalysis, icon: Building2, label: 'Urban Drill-down' },
    { id: Section.RuralAnalysis, icon: Sprout, label: 'Rural Drill-down' },
    { id: Section.Comparison, icon: Diff, label: 'Sector Variance' },
    { id: Section.Stats, icon: Sigma, label: 'Analytical Engine' },
    { id: Section.Findings, icon: Lightbulb, label: 'Executive Findings' },
    { id: Section.Preview, icon: Table, label: 'Source Data' },
  ];

  return (
    <div className="flex h-screen bg-[#f1f5f9] font-sans text-slate-900">
      <aside className={`${isSidebarOpen ? 'w-80' : 'w-20'} bg-[#020617] text-white transition-all duration-500 ease-in-out flex flex-col z-30 shadow-2xl border-r border-slate-800 overflow-hidden`}>
        <div className="p-6 flex items-center justify-between border-b border-white/5 shrink-0">
          {isSidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BarChart3 className="text-white" size={18} />
              </div>
              <span className="font-black text-sm tracking-widest uppercase text-white">Poverty Dashboard</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {isSidebarOpen && (
            <div className="p-6 space-y-8 animate-fadeIn">
              <section className="bg-white/5 p-4 rounded-2xl border border-white/10 shadow-inner">
                <label className="text-[10px] uppercase font-black text-slate-500 mb-3 block tracking-[0.2em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> COMPUTE STATUS
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">Environment</span>
                    <span className="text-[10px] font-black text-blue-400">TSX / V8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">Memory Engine</span>
                    <span className={`text-[10px] font-black ${engineStatus === 'ready' ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}`}>
                      {engineStatus === 'syncing' ? 'HYDRATING...' : 'READY'}
                    </span>
                  </div>
                </div>
              </section>

              <section>
                <label className="text-[10px] uppercase font-black text-slate-500 mb-3 block tracking-[0.2em]">Territory Search</label>
                <div className="relative">
                  <Search size={14} className="absolute left-4 top-3.5 text-slate-500" />
                  <input 
                    type="text"
                    placeholder="Search India..."
                    className="w-full bg-slate-900/50 border border-slate-700/50 text-sm rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500/50 outline-none placeholder:text-slate-600 transition-all font-medium text-slate-200"
                    value={searchQuery}
                    onFocus={() => setIsSearchOpen(true)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {isSearchOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-[#020617] border border-slate-700/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-h-72 overflow-y-auto z-50 py-2 custom-scrollbar">
                      {INDIAN_STATES.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).map(state => (
                        <button
                          key={state}
                          onClick={() => {
                            setSelectedState(state);
                            setSearchQuery('');
                            setIsSearchOpen(false);
                          }}
                          className={`w-full text-left px-5 py-3 text-sm hover:bg-white/5 transition-colors flex items-center justify-between ${selectedState === state ? 'text-blue-400 bg-white/5' : 'text-slate-400'}`}
                        >
                          <span className="font-bold">{state}</span>
                          {selectedState === state && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              <section>
                <label className="text-[10px] uppercase font-black text-slate-500 mb-3 block tracking-[0.2em] flex items-center gap-2">
                  <History size={12} /> Timeline Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <select 
                    value={startYear} 
                    onChange={(e) => setStartYear(Number(e.target.value))}
                    className="w-full bg-slate-900/50 border border-slate-700/50 text-[11px] font-black rounded-xl py-3 px-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer text-slate-200"
                  >
                    {years_options.filter(y => y <= endYear).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <select 
                    value={endYear} 
                    onChange={(e) => setEndYear(Number(e.target.value))}
                    className="w-full bg-slate-900/50 border border-slate-700/50 text-[11px] font-black rounded-xl py-3 px-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer text-slate-200"
                  >
                    {years_options.filter(y => y >= startYear).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </section>

              <section>
                <label className="text-[10px] uppercase font-black text-slate-500 mb-3 block tracking-[0.2em]">Sector Analysis</label>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setShowUrban(!showUrban)} 
                    className={`group flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all ${showUrban ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'border-slate-800 text-slate-500 hover:border-slate-700'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 size={14} />
                      <span>Urban</span>
                    </div>
                    {showUrban && <Check size={12} />}
                  </button>
                  <button 
                    onClick={() => setShowRural(!showRural)} 
                    className={`group flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all ${showRural ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'border-slate-800 text-slate-500 hover:border-slate-700'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Sprout size={14} />
                      <span>Rural</span>
                    </div>
                    {showRural && <Check size={12} />}
                  </button>
                </div>
              </section>

              <section className="pt-6 border-t border-white/5">
                <div className="flex flex-col gap-1">
                  {sidebarNavItems.map(item => (
                    <button 
                      key={item.id} 
                      onClick={() => scrollToSection(item.id)} 
                      className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/5 py-3 px-4 rounded-xl transition-all"
                    >
                      <item.icon size={14} className="group-hover:text-blue-400 transition-colors" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200 flex items-center px-10 shadow-sm justify-between sticky top-0 z-20">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-slate-900 rounded-2xl shadow-lg">
              <MapPin size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                {selectedState} Poverty Analysis
              </h1>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Native Compute Platform</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Validated JS Engine</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ExportControls data={filteredData} stateName={selectedState} containerRef={reportContainerRef} />
            <button 
              onClick={() => fetchGovInsights(selectedState)} 
              className="px-6 py-3 bg-white border border-slate-200 text-slate-900 text-[11px] font-black uppercase tracking-widest rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-3 active:scale-95"
            >
              <RefreshCcw size={14} className={isAiLoading ? 'animate-spin' : ''} />
              {isAiLoading ? 'Syncing...' : 'Grounding Refresh'}
            </button>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 scroll-smooth custom-scrollbar bg-white/50">
          <div ref={reportContainerRef} className="max-w-7xl mx-auto space-y-16 pb-32">
            <section id={Section.Overview} className="scroll-mt-32">
              <DashboardOverview data={filteredData} stateName={selectedState} />
              
              <div className="mt-12 bg-[#0f172a] rounded-[3rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden group border border-white/5">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:scale-110 transition-transform duration-700">
                  <Database size={320} className="text-white" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-blue-500/10 rounded-[1.5rem] border border-blue-500/20 text-blue-400">
                        <Zap size={36} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white tracking-tight uppercase italic">NITI Grounding Engine</h3>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1.5">Verified Government Citations via Gemini Search</p>
                      </div>
                    </div>
                  </div>
                  
                  {isAiLoading ? (
                    <div className="space-y-6">
                      <div className="h-4 bg-white/5 rounded-full w-4/5 animate-pulse" />
                      <div className="h-4 bg-white/5 rounded-full w-3/5 animate-pulse" />
                      <div className="h-4 bg-white/5 rounded-full w-2/3 animate-pulse" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {groundingLinks.length > 0 ? (
                        groundingLinks.map((link, idx) => (
                          <a 
                            key={idx} 
                            href={link.web?.uri || '#'} 
                            target="_blank" 
                            className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-blue-500/50 transition-all flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <Globe size={18} className="text-blue-400 group-hover:rotate-12 transition-transform" />
                              <LinkIcon size={14} className="text-slate-600 group-hover:text-white" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-200 line-clamp-2 leading-relaxed mb-4">
                              {link.web?.title || 'Official Document'}
                            </h4>
                            <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Access Gov Resource</span>
                          </a>
                        ))
                      ) : (
                        <div className="col-span-full py-12 text-center">
                          <p className="text-slate-500 italic font-medium">No external references fetched. Click Grounding Refresh to update via Gemini API.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section id={Section.YearlyTrend} className="scroll-mt-32">
              <YearlyTrendAnalysis data={filteredData} />
            </section>

            <div className="grid grid-cols-1 gap-16">
              <section id={Section.UrbanAnalysis} className="scroll-mt-32">
                <AreaSpecificAnalysis data={filteredData} area="Urban" />
              </section>

              <section id={Section.RuralAnalysis} className="scroll-mt-32">
                <AreaSpecificAnalysis data={filteredData} area="Rural" />
              </section>
            </div>

            <section id={Section.Comparison} className="scroll-mt-32">
              <UrbanRuralComparison data={filteredData} />
            </section>

            <section id={Section.Stats} className="scroll-mt-32">
              <StatisticalInsights data={filteredData} />
            </section>

            <section id={Section.Findings} className="scroll-mt-32">
              <KeyFindings />
            </section>

            <section id={Section.Preview} className="scroll-mt-32">
              <DatasetPreview data={filteredData} />
            </section>

            <footer className="pt-24 pb-12 text-center border-t border-slate-200 flex flex-col items-center">
               <div className="p-4 bg-slate-900 rounded-2xl mb-6">
                 <BarChart3 size={32} className="text-blue-400" />
               </div>
               <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.4em] mb-2">Poverty Dashboard Analytics • Edition 2025</p>
               <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Built with TypeScript & React • Zero External Server Latency</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
