import React, { useState, useMemo } from 'react';
import { calculateRatioAnalysis } from '../utils/calculations';
import { PRESET_RATIOS } from '../data/catalog';
import { Bike, AlertTriangle, CheckCircle2, Zap, ArrowRight, Bot, ShieldAlert, Compass } from 'lucide-react';

interface GearCalculatorProps {
  onAskBogoBot: (prompt: string) => void;
}

export const GearCalculator: React.FC<GearCalculatorProps> = ({ onAskBogoBot }) => {
  const [chainring, setChainring] = useState<number>(47);
  const [cog, setCog] = useState<number>(17);

  const analysis = useMemo(() => {
    return calculateRatioAnalysis(chainring, cog);
  }, [chainring, cog]);

  const isLowPatches = analysis.skidPatchesOneFoot <= 3;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title Section */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Bike className="w-3.5 h-3.5" />
              Calculadora Oficial de Pista & Skids
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight italic">
              Relación de Transmisión & Skid Patches
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-2xl leading-relaxed">
              Calcula el ratio perfecto para los muros de Bogotá, optimiza la cadencia y descubre cuántos puntos de derrape (skid patches) le quedan a tu llanta trasera antes de destruirla.
            </p>
          </div>

          {/* Quick Preset Selector */}
          <div className="w-full md:w-auto bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800/80">
            <span className="text-xs text-zinc-400 uppercase font-bold block mb-2 tracking-wider">
              ⚙️ Ajustes Frecuentes
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_RATIOS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setChainring(preset.chainring);
                    setCog(preset.cog);
                  }}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    chainring === preset.chainring && cog === preset.cog
                      ? 'bg-yellow-400 text-zinc-950 border-yellow-400 font-bold'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {preset.chainring}/{preset.cog}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Controls & Calculations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Sliders & Mechanics */}
        <div className="lg:col-span-5 bg-zinc-900/90 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6 shadow-xl">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Configura tu Transmisión
          </h3>

          {/* Chainring Slider (Plato) */}
          <div className="space-y-3 bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800/60">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-zinc-300 uppercase flex items-center gap-2">
                <span>Plato (Dientes)</span>
                <span className="text-xs text-zinc-500 font-normal">(Chainring)</span>
              </label>
              <span className="text-2xl font-black text-yellow-400 font-mono">
                {chainring}<span className="text-xs font-normal text-zinc-500 ml-0.5">T</span>
              </span>
            </div>
            <input
              type="range"
              min={38}
              max={60}
              value={chainring}
              onChange={(e) => setChainring(parseInt(e.target.value))}
              className="w-full accent-yellow-400 cursor-pointer h-2 bg-zinc-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
              <span>38T (Muro Total)</span>
              <span>47T (Clásico)</span>
              <span>60T (Pista Max)</span>
            </div>
          </div>

          {/* Cog Slider (Piñón) */}
          <div className="space-y-3 bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800/60">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-zinc-300 uppercase flex items-center gap-2">
                <span>Piñón (Dientes)</span>
                <span className="text-xs text-zinc-500 font-normal">(Cog)</span>
              </label>
              <span className="text-2xl font-black text-yellow-400 font-mono">
                {cog}<span className="text-xs font-normal text-zinc-500 ml-0.5">T</span>
              </span>
            </div>
            <input
              type="range"
              min={12}
              max={22}
              value={cog}
              onChange={(e) => setCog(parseInt(e.target.value))}
              className="w-full accent-yellow-400 cursor-pointer h-2 bg-zinc-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
              <span>12T (Veloz)</span>
              <span>17T (Patch Master)</span>
              <span>22T (Trepa)</span>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800/60 text-center">
              <span className="text-xs text-zinc-400 font-medium block">Avance por Pedaleada</span>
              <span className="text-xl font-black text-white font-mono mt-1 block">
                {analysis.developmentMeters} <span className="text-xs text-zinc-500 font-normal">m</span>
              </span>
            </div>
            <div className="bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800/60 text-center">
              <span className="text-xs text-zinc-400 font-medium block">Velocidad a 90 RPM</span>
              <span className="text-xl font-black text-white font-mono mt-1 block">
                {analysis.speedAt90RpmKmH} <span className="text-xs text-zinc-500 font-normal">km/h</span>
              </span>
            </div>
          </div>

          {/* Ask BogoBot AI Button */}
          <button
            onClick={() => onAskBogoBot(`Tengo una relación ${chainring}/${cog} (Ratio ${analysis.ratio}, ${analysis.skidPatchesOneFoot} skid patches). ¿Qué opina BogoBot de esta configuración para andar por Bogotá y subir Patios o Romeral?`)}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black py-3.5 px-4 rounded-2xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-yellow-500/20 uppercase tracking-wide text-sm"
          >
            <Bot className="w-5 h-5 stroke-[2.5]" />
            <span>Consultar este Setup con BogoBot AI</span>
          </button>
        </div>

        {/* Right Column: Visual Analysis & Skid Patch Simulator */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Ratio Metric Display */}
          <div className="bg-zinc-900/90 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Relación de Desarrollo</span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                    {analysis.ratio}
                  </span>
                  <span className="text-lg text-zinc-500 font-mono">
                    ({chainring}T / {cog}T)
                  </span>
                </div>
              </div>

              {/* Classification Badge */}
              <div className={`px-4 py-2 rounded-2xl border text-sm font-bold shadow-md ${analysis.colorClass}`}>
                {analysis.badgeText}
              </div>
            </div>

            {/* BogoBot Technical Recommendation */}
            <div className="bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800/80 flex items-start gap-3">
              <Compass className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider block">
                  Análisis Técnico BOGOFIJA
                </span>
                <p className="text-sm text-zinc-300 mt-1 leading-relaxed">
                  {analysis.recommendation}
                </p>
              </div>
            </div>

            {/* Skid Patches Analysis Section */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>Puntos de Derrape (Skid Patches)</span>
                  {isLowPatches ? (
                    <ShieldAlert className="w-5 h-5 text-red-400 animate-bounce" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                </h4>
                <span className="text-xs text-zinc-400">Salud de tu llanta trasera</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1 Foot Patch Card */}
                <div className={`p-4 rounded-2xl border ${
                  isLowPatches 
                    ? 'bg-red-950/30 border-red-500/40 text-red-200' 
                    : 'bg-zinc-950/80 border-zinc-800/80 text-zinc-200'
                }`}>
                  <span className="text-xs text-zinc-400 font-bold uppercase block">Derrape Un Pie (1 Foot)</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className={`text-3xl font-black font-mono ${isLowPatches ? 'text-red-400' : 'text-emerald-400'}`}>
                      {analysis.skidPatchesOneFoot}
                    </span>
                    <span className="text-xs font-medium text-zinc-400">puntos de desgaste</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-2">
                    {isLowPatches 
                      ? '⚠️ ¡Peligro! Destruirá tu coraza trasera en un solo punto.' 
                      : '✅ Excelente distribución. Desgaste parejo de la llanta.'}
                  </p>
                </div>

                {/* Both Feet Ambidextrous Patch Card */}
                <div className="p-4 rounded-2xl border bg-zinc-950/80 border-zinc-800/80 text-zinc-200">
                  <span className="text-xs text-zinc-400 font-bold uppercase block">Ambidextro (Ambos Pies)</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-black text-yellow-400 font-mono">
                      {analysis.skidPatchesBothFeet}
                    </span>
                    <span className="text-xs font-medium text-zinc-400">puntos si frenas con ambos pies</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-2">
                    Alternar la pierna dominante duplica la vida útil de tu llanta trasera.
                  </p>
                </div>

              </div>
            </div>

            {/* Visual Tire Ring SVG Simulation */}
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 text-center space-y-4">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">
                Simulación Visual de Desgaste de Llanta
              </span>

              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                {/* SVG Tire Wheel with Skid Spots */}
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {/* Outer Tire Rim */}
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#27272a" strokeWidth="8" />
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#18181b" strokeWidth="2" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="#3f3f46" strokeWidth="1" />

                  {/* Render Skid Patch Marks around the tire */}
                  {Array.from({ length: analysis.skidPatchesOneFoot }).map((_, index) => {
                    const angle = (index * 360) / analysis.skidPatchesOneFoot;
                    const rad = (angle * Math.PI) / 180;
                    const x = 50 + 42 * Math.cos(rad);
                    const y = 50 + 42 * Math.sin(rad);

                    return (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r={isLowPatches ? 3.5 : 2}
                        fill={isLowPatches ? '#ef4444' : '#10b981'}
                        className="transition-all duration-300"
                      />
                    );
                  })}
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className={`text-xl font-black font-mono ${isLowPatches ? 'text-red-400' : 'text-emerald-400'}`}>
                    {analysis.skidPatchesOneFoot}
                  </span>
                  <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                    {analysis.skidPatchesOneFoot === 1 ? 'PATCH ÚNICO' : 'PATCHES'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 italic max-w-md mx-auto">
                {isLowPatches
                  ? '🚨 ¡Alerta BogoBot! Un solo skid destructivo destruirá el caucho en menos de 100 km. Cambia tu piñón a 17T para arreglar el número de parches.'
                  : `Gran balance con ${analysis.skidPatchesOneFoot} puntos de contacto distribuidos uniformemente.`}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
