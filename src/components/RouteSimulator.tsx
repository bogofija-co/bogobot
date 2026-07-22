import React, { useState } from 'react';
import { COLOMBIAN_ROUTES, PRESET_RATIOS } from '../data/catalog';
import { ClimbRoute } from '../types';
import { Mountain, AlertTriangle, CheckCircle2, Bot, Compass, Zap, ArrowRight, Flag } from 'lucide-react';

interface RouteSimulatorProps {
  onAskBogoBot: (prompt: string) => void;
}

export const RouteSimulator: React.FC<RouteSimulatorProps> = ({ onAskBogoBot }) => {
  const [selectedRoute, setSelectedRoute] = useState<ClimbRoute>(COLOMBIAN_ROUTES[0]); // Default Romeral
  const [selectedChainring, setSelectedChainring] = useState<number>(47);
  const [selectedCog, setSelectedCog] = useState<number>(17);

  const currentRatio = parseFloat((selectedChainring / selectedCog).toFixed(2));
  const isRatioTooHard = currentRatio > selectedRoute.recommendedRatioMax;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">
          <Mountain className="w-3.5 h-3.5" />
          Simulador de Puertos de Bogotá & Colombia
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight italic">
          Simulador de Escalada en Piñón Fijo
        </h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-2xl leading-relaxed">
          Pon a prueba tu transmisión contra las montañas más imponentes de la Sabana y Colombia. Descubre si tu relación te permitirá coronar la cima o si quedarás trabado a mitad del muro.
        </p>
      </div>

      {/* Route Selector Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {COLOMBIAN_ROUTES.map((route) => {
          const isSelected = selectedRoute.id === route.id;
          return (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(route)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-yellow-400 text-zinc-950 border-yellow-400 shadow-lg shadow-yellow-500/20 font-bold scale-105'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80'
              }`}
            >
              <div>
                <span className={`text-[10px] uppercase font-black tracking-wider block ${isSelected ? 'text-zinc-950' : 'text-yellow-400'}`}>
                  {route.difficulty}
                </span>
                <h4 className="text-xs font-black leading-tight mt-0.5 line-clamp-2">
                  {route.name}
                </h4>
              </div>

              <div className="text-[11px] font-mono opacity-90 border-t border-current/10 pt-1.5 flex justify-between">
                <span>{route.distanceKm} KM</span>
                <span>{route.maxGradient}% MAX</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Route Main Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Route Profile & Specs */}
        <div className={`lg:col-span-7 bg-gradient-to-b ${selectedRoute.bgGradient} p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl space-y-6 relative overflow-hidden`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs text-yellow-400 font-bold uppercase tracking-widest block">
                {selectedRoute.location}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase italic mt-1">
                {selectedRoute.name}
              </h3>
            </div>

            <div className="bg-zinc-950/80 px-4 py-2 rounded-2xl border border-zinc-800 text-right">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Desnivel Positivo</span>
              <span className="text-xl font-black text-white font-mono">
                +{selectedRoute.elevationGainM} <span className="text-xs text-zinc-500">m</span>
              </span>
            </div>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/60">
            {selectedRoute.description}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-800/80">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Distancia</span>
              <span className="text-lg font-black text-white font-mono mt-0.5 block">{selectedRoute.distanceKm} KM</span>
            </div>
            <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-800/80">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Pendiente Máxima</span>
              <span className="text-lg font-black text-red-400 font-mono mt-0.5 block">{selectedRoute.maxGradient}%</span>
            </div>
            <div className="bg-zinc-950/80 p-3.5 rounded-2xl border border-zinc-800/80">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Pendiente Media</span>
              <span className="text-lg font-black text-amber-400 font-mono mt-0.5 block">{selectedRoute.avgGradient}%</span>
            </div>
          </div>

          {/* BogoTip Box */}
          <div className="bg-zinc-950/90 p-4 rounded-2xl border border-yellow-400/30 flex items-start gap-3">
            <Flag className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider block">
                Consejo Clave BOGOFIJA
              </span>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                {selectedRoute.bogoTip}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Transmission Test vs Route Requirements */}
        <div className="lg:col-span-5 bg-zinc-900/90 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl space-y-6 flex flex-col justify-between">
          
          <div className="space-y-5">
            <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Probar tu Transmisión Actual
            </h4>

            {/* Quick Chainring / Cog Selector */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800 space-y-2">
                <label className="text-xs text-zinc-400 font-bold uppercase block">Plato</label>
                <select
                  value={selectedChainring}
                  onChange={(e) => setSelectedChainring(parseInt(e.target.value))}
                  className="w-full bg-zinc-900 text-white font-mono font-bold text-sm p-2 rounded-xl border border-zinc-800 focus:border-yellow-400 outline-none"
                >
                  {[40, 42, 44, 45, 46, 47, 48, 49, 50, 52].map((t) => (
                    <option key={t} value={t}>{t}T</option>
                  ))}
                </select>
              </div>

              <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800 space-y-2">
                <label className="text-xs text-zinc-400 font-bold uppercase block">Piñón</label>
                <select
                  value={selectedCog}
                  onChange={(e) => setSelectedCog(parseInt(e.target.value))}
                  className="w-full bg-zinc-900 text-white font-mono font-bold text-sm p-2 rounded-xl border border-zinc-800 focus:border-yellow-400 outline-none"
                >
                  {[13, 14, 15, 16, 17, 18, 19, 20, 21].map((t) => (
                    <option key={t} value={t}>{t}T</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Setup Result Box */}
            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 text-center space-y-2">
              <span className="text-xs text-zinc-400 uppercase font-bold block">
                Tu Relación Configurada
              </span>
              <div className="text-3xl font-black text-white font-mono">
                {selectedChainring} / {selectedCog} = <span className="text-yellow-400">{currentRatio}</span>
              </div>
              <span className="text-xs text-zinc-500 block">
                Máximo sugerido para {selectedRoute.name}: <strong className="text-zinc-300">{selectedRoute.recommendedRatioMax}</strong>
              </span>
            </div>

            {/* Evaluation Status Banner */}
            <div className={`p-4 rounded-2xl border ${
              isRatioTooHard
                ? 'bg-red-950/40 border-red-500/40 text-red-200'
                : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
            }`}>
              <div className="flex items-start gap-3">
                {isRatioTooHard ? (
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="text-xs font-black uppercase tracking-wider block">
                    {isRatioTooHard ? '⚠️ Relación Muy Dura' : '✅ Transmisión Apta'}
                  </span>
                  <p className="text-xs mt-1 leading-relaxed opacity-90">
                    {isRatioTooHard
                      ? `Con un ratio de ${currentRatio} quedarás muy atrancado en las rampas más fuertes de ${selectedRoute.name}. Te recomendamos montar un piñón más grande (ej. 18T o 19T) para cuidar tus rodillas.`
                      : `¡Aprobado! Con ${currentRatio} mantendrás buena cadencia para superar la altimetría de ${selectedRoute.name}.`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ask BogoBot AI Button */}
          <button
            onClick={() => onAskBogoBot(`Quiero subir ${selectedRoute.name} (${selectedRoute.distanceKm} km, inclinación max ${selectedRoute.maxGradient}%) con una relación ${selectedChainring}/${selectedCog} (Ratio ${currentRatio}). ¿Qué consejo me da BogoBot AI para coronar con éxito?`)}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black py-3.5 px-4 rounded-2xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-yellow-500/20 uppercase tracking-wide text-sm mt-4"
          >
            <Bot className="w-5 h-5 stroke-[2.5]" />
            <span>Simular Estrategia con BogoBot AI</span>
          </button>

        </div>

      </div>
    </div>
  );
};
