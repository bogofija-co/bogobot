import React, { useState } from 'react';
import { Flame, Trophy, Calendar, MapPin, ShieldCheck, CheckCircle2, UserCheck, Bot, Sparkles } from 'lucide-react';

interface RetoBogofijaProps {
  onAskBogoBot: (prompt: string) => void;
}

export const RetoBogofija: React.FC<RetoBogofijaProps> = ({ onAskBogoBot }) => {
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Masculino Piñón Fijo');
  const [gearRatio, setGearRatio] = useState('47/17');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setRegistered(true);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 p-8 sm:p-12 text-zinc-950 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-950 text-yellow-400 text-xs font-black uppercase tracking-widest shadow-md">
            <Flame className="w-4 h-4 fill-yellow-400 animate-pulse" />
            EL EVENTO DEFINITIVO DE PIÑÓN FIJO
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter italic leading-none">
            #RetoBogofija 2027 Vol. 3
          </h2>

          <p className="text-zinc-950 font-bold text-sm sm:text-base leading-relaxed opacity-90">
            Los cerros orientales de Bogotá te esperan. Medirás tu resistencia, cadencia y coraje en un recorrido mítico de montaña por los puertos emblemáticos de la capital.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs sm:text-sm font-black font-mono">
            <div className="bg-zinc-950 text-white px-4 py-2 rounded-xl flex items-center gap-2 border border-zinc-900">
              <Calendar className="w-4 h-4 text-yellow-400" />
              <span>MARZO 2027</span>
            </div>
            <div className="bg-zinc-950 text-white px-4 py-2 rounded-xl flex items-center gap-2 border border-zinc-900">
              <MapPin className="w-4 h-4 text-yellow-400" />
              <span>BOGOTÁ, COLOMBIA</span>
            </div>
            <div className="bg-zinc-950 text-white px-4 py-2 rounded-xl flex items-center gap-2 border border-zinc-900">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>PREMIOS BOGOFIJA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Event details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-900/90 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6 shadow-xl">
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              ¿Qué incluye el Kit del Participante?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
              {[
                { title: 'Jersey Oficial 2027', desc: 'Jersey aerodinámico Race Fit con tejido italiano y gráfica conmemorativa #RetoBogofija.' },
                { title: 'Dorsal Oficial Reflejante', desc: 'Número de competidor impreso con material de alta visibilidad para ruta.' },
                { title: 'Medalla Finisher Metal', desc: 'Medalla troquelada en aleación de alta calidad para quienes coronen la meta.' },
                { title: 'Asistencia Mecánica en Ruta', desc: 'Soporte técnico BOGOFIJA para despinche, ajuste de cadena y trabas.' },
                { title: 'Puntos de Hidratación', desc: 'Puntos de reabastecimiento energético en Patios y puntos clave.' },
                { title: 'Premios & Sorteos', desc: 'Marcos de aluminio 6061, platos CNC y accesorios BOGOFIJA para los primeros puestos.' },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 space-y-1">
                  <span className="font-bold text-yellow-400 flex items-center gap-1.5 uppercase">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {item.title}
                  </span>
                  <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div className="pt-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-3">
                Categorías Oficiales 2027
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-bold font-mono">
                {['Masculino Open', 'Femenino Open', 'Track Stand Pro', 'Muro Romeral'].map((cat, i) => (
                  <div key={i} className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-yellow-400">
                    {cat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div className="lg:col-span-5 bg-zinc-900/90 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6 shadow-xl">
          <h3 className="text-xl font-black text-white uppercase italic tracking-tight flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-yellow-400" />
            Pre-Inscripción #Reto2027
          </h3>

          {registered ? (
            <div className="bg-emerald-950/60 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-black text-emerald-200 uppercase">¡Pre-Inscripción Exitosa!</h4>
              <p className="text-xs text-emerald-300 leading-relaxed">
                ¡Ey {name}! Ya estás pre-inscrito en la categoría <strong className="text-white">{category}</strong> con relación <strong className="text-white">{gearRatio}</strong>.
              </p>
              <button
                onClick={() => onAskBogoBot(`Estoy preinscripto en el #RetoBogofija 2027 con relación ${gearRatio}. ¿Qué preparación me recomiendas para llegar a tope?`)}
                className="w-full bg-yellow-400 text-zinc-950 font-black py-2.5 rounded-xl text-xs uppercase cursor-pointer"
              >
                Preguntar Plan de Entrenamiento a BogoBot
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 uppercase block">Nombre Completo o Apodo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Camilo 'Skid' Rodríguez"
                  className="w-full bg-zinc-950 text-white placeholder-zinc-500 text-xs px-4 py-3 rounded-xl border border-zinc-800 focus:border-yellow-400 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 uppercase block">Categoría</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-zinc-950 text-white text-xs px-4 py-3 rounded-xl border border-zinc-800 focus:border-yellow-400 outline-none"
                >
                  <option value="Masculino Piñón Fijo">Masculino Piñón Fijo</option>
                  <option value="Femenino Piñón Fijo">Femenino Piñón Fijo</option>
                  <option value="Track Stand King">Track Stand King</option>
                  <option value="Muro Romeral Challenge">Muro Romeral Challenge</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 uppercase block">Transmisión Prevista (Plato/Piñón)</label>
                <input
                  type="text"
                  value={gearRatio}
                  onChange={(e) => setGearRatio(e.target.value)}
                  placeholder="Ej: 47/17"
                  className="w-full bg-zinc-950 text-white text-xs px-4 py-3 rounded-xl border border-zinc-800 focus:border-yellow-400 outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black py-3.5 px-4 rounded-2xl transition-all cursor-pointer shadow-lg shadow-yellow-500/20 uppercase tracking-wide text-xs sm:text-sm"
              >
                Pre-Inscribirme Ahora
              </button>
            </form>
          )}

          {/* Quick AI Ask */}
          <div className="pt-2 border-t border-zinc-800">
            <button
              onClick={() => onAskBogoBot('¿Cuáles son las reglas del #RetoBogofija 2027 Vol. 3, qué recorridos incluye y dónde será la partida?')}
              className="w-full bg-zinc-950 hover:bg-zinc-800 text-zinc-300 text-xs font-bold py-3 rounded-xl border border-zinc-800 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-yellow-400" />
              <span>Resolver dudas del Reto con BogoBot AI</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
