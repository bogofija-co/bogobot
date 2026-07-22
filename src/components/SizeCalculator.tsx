import React, { useState, useMemo } from 'react';
import { calculateFrameSize } from '../utils/calculations';
import { BOGOFIJA_PRODUCTS } from '../data/catalog';
import { Ruler, CheckCircle, Bot, ShoppingBag, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface SizeCalculatorProps {
  onAskBogoBot: (prompt: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const SizeCalculator: React.FC<SizeCalculatorProps> = ({ onAskBogoBot, onSelectProduct }) => {
  const [inseamCm, setInseamCm] = useState<number>(78);

  const sizeResult = useMemo(() => {
    return calculateFrameSize(inseamCm);
  }, [inseamCm]);

  // Find frames matching the calculated size label
  const matchingFrames = BOGOFIJA_PRODUCTS.filter((p) => p.category === 'marco');

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">
          <Ruler className="w-3.5 h-3.5" />
          Geometría & Ajuste Biomecánico
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight italic">
          Calculadora de Talla por Entrepierna
        </h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-2xl leading-relaxed">
          En el ciclismo de piñón fijo, rodar la talla correcta de marco evita dolores lumbares, maximiza la potencia de pedaleo y te da control absoluto en los skids urbanos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Input & Graphic */}
        <div className="lg:col-span-5 bg-zinc-900/90 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6 shadow-xl">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Ruler className="w-5 h-5 text-yellow-400" />
            Ingresa tu Medida
          </h3>

          {/* How to measure guide */}
          <div className="bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800/80 text-xs text-zinc-300 space-y-2">
            <span className="font-bold text-yellow-400 flex items-center gap-1.5 uppercase">
              <HelpCircle className="w-4 h-4" />
              ¿Cómo medir tu entrepierna?
            </span>
            <p className="leading-relaxed">
              Descalzo, apóyate contra la pared, coloca un libro entre tus piernas presionando hacia arriba como el sillín, y mide en centímetros desde el piso hasta el borde superior del libro.
            </p>
          </div>

          {/* Inseam Slider */}
          <div className="space-y-4 bg-zinc-950/90 p-5 rounded-2xl border border-zinc-800">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-zinc-200 uppercase">
                Longitud de Entrepierna
              </label>
              <span className="text-3xl font-black text-yellow-400 font-mono">
                {inseamCm} <span className="text-xs text-zinc-500 font-normal">cm</span>
              </span>
            </div>

            <input
              type="range"
              min={60}
              max={95}
              value={inseamCm}
              onChange={(e) => setInseamCm(parseInt(e.target.value))}
              className="w-full accent-yellow-400 cursor-pointer h-2.5 bg-zinc-800 rounded-lg"
            />

            <div className="flex justify-between text-xs text-zinc-500 font-mono">
              <span>60 cm</span>
              <span>78 cm (Estándar)</span>
              <span>95 cm</span>
            </div>
          </div>

          {/* Quick AI Consult */}
          <button
            onClick={() => onAskBogoBot(`Mi medida de entrepierna es de ${inseamCm} cm. La calculadora me indica talla ${sizeResult.suggestedSizeCm} cm (${sizeResult.suggestedLabel}). ¿Qué marco del catálogo BOGOFIJA me recomiendas para mi estatura?`)}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black py-3.5 px-4 rounded-2xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-yellow-500/20 uppercase tracking-wide text-sm"
          >
            <Bot className="w-5 h-5 stroke-[2.5]" />
            <span>Asesorar mi Talla con BogoBot AI</span>
          </button>
        </div>

        {/* Right Recommendation & Matching Catalog Frames */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Recommendation Box */}
          <div className="bg-zinc-900/90 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-xl space-y-6">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Resultado del Cálculo</span>

            <div className="flex flex-wrap items-center justify-between gap-6 bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
              <div>
                <span className="text-xs text-zinc-500 uppercase font-bold block">Talla Teórica Recomendada</span>
                <span className="text-4xl sm:text-5xl font-black text-white font-mono mt-1 block">
                  {sizeResult.suggestedSizeCm} <span className="text-xl text-zinc-500 font-normal">cm</span>
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs text-zinc-500 uppercase font-bold block">Talla de Marco Bogofija</span>
                <span className="text-3xl sm:text-4xl font-black text-yellow-400 font-mono mt-1 block bg-yellow-400/10 px-4 py-1.5 rounded-xl border border-yellow-400/30">
                  Talla {sizeResult.suggestedLabel}
                </span>
              </div>
            </div>

            <div className="bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-300 leading-relaxed">
                {sizeResult.description}
              </p>
            </div>

            {/* Sizes Reference Table */}
            <div className="pt-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-3">
                Tabla Oficial de Tallas Bogofija 6061
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { label: 'XXS', cm: '48 cm', active: sizeResult.suggestedLabel === 'XXS' },
                  { label: 'XS', cm: '50 cm', active: sizeResult.suggestedLabel === 'XS' },
                  { label: 'S', cm: '52 cm', active: sizeResult.suggestedLabel === 'S' },
                  { label: 'M', cm: '54 cm', active: sizeResult.suggestedLabel === 'M' },
                  { label: 'L', cm: '56 cm', active: sizeResult.suggestedLabel === 'L' },
                  { label: 'XL', cm: '58 cm', active: sizeResult.suggestedLabel === 'XL' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      item.active
                        ? 'bg-yellow-400 text-zinc-950 border-yellow-400 font-black shadow-md scale-105'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                    }`}
                  >
                    <span className="text-xs font-bold block">{item.label}</span>
                    <span className="text-[10px] block opacity-80">{item.cm}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Recommended Frames in Catalog */}
          <div className="bg-zinc-900/90 p-6 rounded-3xl border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-yellow-400" />
                Marcos Disponibles para Talla {sizeResult.suggestedLabel}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {matchingFrames.map((frame) => (
                <div
                  key={frame.id}
                  onClick={() => onSelectProduct(frame.id)}
                  className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 hover:border-yellow-400/50 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                >
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-zinc-900 relative">
                    <img
                      src={frame.image}
                      alt={frame.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 bg-yellow-400 text-zinc-950 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                      {frame.badge}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                      {frame.name}
                    </h5>
                    <span className="text-sm font-black text-yellow-400 font-mono mt-1 block">
                      ${frame.price.toLocaleString('es-CO')} COP
                    </span>
                  </div>

                  <button className="w-full bg-zinc-900 group-hover:bg-yellow-400 text-zinc-300 group-hover:text-zinc-950 text-xs font-bold py-2 rounded-xl border border-zinc-800 group-hover:border-yellow-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                    <span>Ver Detalles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
