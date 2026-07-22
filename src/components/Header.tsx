import React from 'react';
import { Bot, Shield, ShoppingBag, Bike, Ruler, Mountain, Flame, MessageSquare } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, cartCount, openCart }) => {
  const navItems = [
    { id: 'bot', label: 'BogoBot AI', icon: Bot, highlight: true },
    { id: 'calculator', label: 'Relaciones & Skids', icon: Bike },
    { id: 'sizing', label: 'Calculadora Talla', icon: Ruler },
    { id: 'climbs', label: 'Puertos & Rutas', icon: Mountain },
    { id: 'shop', label: 'Catálogo Bogofija', icon: ShoppingBag },
    { id: 'reto', label: '#RetoBogofija 2027', icon: Flame },
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl">
      {/* Top Banner Alert */}
      <div className="bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 text-zinc-950 px-4 py-1.5 text-xs font-bold text-center tracking-wide uppercase flex items-center justify-center gap-2 shadow-inner">
        <Flame className="w-4 h-4 animate-pulse" />
        <span>¡INSCRIPCIONES ABIERTAS PARA EL #RETOBOGOFIJA 2027 VOL. 3!</span>
        <button 
          onClick={() => setActiveTab('reto')} 
          className="underline hover:text-zinc-900 ml-2 font-black cursor-pointer"
        >
          MÁS INFO &rarr;
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('bot')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-400 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-yellow-500/20 text-zinc-950 font-black border-2 border-zinc-900">
                <Bike className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl sm:text-2xl tracking-tighter text-white uppercase italic">
                  BOGOFIJA<span className="text-yellow-400 font-normal">.CO</span>
                </span>
                <span className="bg-zinc-800 text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-yellow-400/30 uppercase tracking-widest hidden sm:inline-block">
                  PIÑÓN FIJO BOGOTÁ
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-medium hidden sm:block">
                Copiloto Digital & Mecánica de Pista Urbana
              </p>
            </div>
          </div>

          {/* Navigation Links Desktop */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? item.highlight
                        ? 'bg-yellow-400 text-zinc-950 shadow-lg shadow-yellow-500/20 font-bold scale-105'
                        : 'bg-zinc-800 text-white border border-zinc-700 shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive && item.highlight ? 'text-zinc-950' : 'text-yellow-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Chat Switch */}
            <button
              onClick={() => setActiveTab('bot')}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'bot'
                  ? 'bg-yellow-400 text-zinc-950 border-yellow-400 font-bold'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-yellow-400/50 hover:text-yellow-400'
              }`}
              title="Hablar con BogoBot AI"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 bg-zinc-900 border border-zinc-800 hover:border-yellow-400/50 text-white rounded-xl transition-all cursor-pointer flex items-center gap-2"
              title="Ver Carrito de Compras"
            >
              <ShoppingBag className="w-5 h-5 text-yellow-400" />
              <span className="text-xs font-bold hidden sm:inline-block">Carrito</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-zinc-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950 shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center gap-1.5 overflow-x-auto py-2.5 border-t border-zinc-800/60 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-yellow-400 text-zinc-950 font-bold'
                    : 'bg-zinc-900/80 text-zinc-300 border border-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
