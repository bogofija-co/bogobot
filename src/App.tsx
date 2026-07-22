import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BogoBotChat } from './components/BogoBotChat';
import { GearCalculator } from './components/GearCalculator';
import { SizeCalculator } from './components/SizeCalculator';
import { RouteSimulator } from './components/RouteSimulator';
import { Catalog } from './components/Catalog';
import { CartDrawer } from './components/CartDrawer';
import { RetoBogofija } from './components/RetoBogofija';
import { CartItem, Product } from './types';
import { Bike, ShieldCheck, Heart, MessageSquare, Instagram, MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('bot');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bogofija_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [externalPrompt, setExternalPrompt] = useState<string>('');
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem('bogofija_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cart]);

  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            selectedSize: size,
            selectedColor: color,
            quantity: 1,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Switch to BogoBot AI chat with prefilled prompt
  const handleAskBogoBot = (prompt: string) => {
    setExternalPrompt(prompt);
    setActiveTab('bot');
  };

  // Switch to catalog product
  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActiveTab('shop');
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased flex flex-col justify-between selection:bg-yellow-400 selection:text-zinc-950">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'bot' && (
          <BogoBotChat
            externalPrompt={externalPrompt}
            onClearExternalPrompt={() => setExternalPrompt('')}
          />
        )}

        {activeTab === 'calculator' && (
          <GearCalculator onAskBogoBot={handleAskBogoBot} />
        )}

        {activeTab === 'sizing' && (
          <SizeCalculator
            onAskBogoBot={handleAskBogoBot}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activeTab === 'climbs' && (
          <RouteSimulator onAskBogoBot={handleAskBogoBot} />
        )}

        {activeTab === 'shop' && (
          <Catalog
            onAddToCart={handleAddToCart}
            selectedProductId={selectedProductId}
            onClearSelectedProduct={() => setSelectedProductId('')}
          />
        )}

        {activeTab === 'reto' && (
          <RetoBogofija onAskBogoBot={handleAskBogoBot} />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <footer className="bg-zinc-900/90 border-t border-zinc-800/80 mt-12 py-8 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-zinc-950 font-black">
              <Bike className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-black text-sm text-white uppercase italic tracking-tight">
                BOGOFIJA<span className="text-yellow-400 font-normal">.CO</span>
              </span>
              <p className="text-[11px] text-zinc-500">
                Comunidad & Tienda Oficial de Piñón Fijo • Bogotá, Colombia 🇨🇴
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-zinc-400">
            <button onClick={() => setActiveTab('calculator')} className="hover:text-yellow-400 transition-colors">
              Relaciones & Skid Patches
            </button>
            <button onClick={() => setActiveTab('sizing')} className="hover:text-yellow-400 transition-colors">
              Calculadora de Talla
            </button>
            <button onClick={() => setActiveTab('climbs')} className="hover:text-yellow-400 transition-colors">
              Puertos de Bogotá
            </button>
            <button onClick={() => setActiveTab('shop')} className="hover:text-yellow-400 transition-colors">
              Catálogo Marcos 6061
            </button>
            <button onClick={() => setActiveTab('reto')} className="hover:text-yellow-400 transition-colors">
              #RetoBogofija 2027
            </button>
          </div>

          <div className="text-center sm:text-right text-[11px] text-zinc-500">
            <p>BogoBot AI Powered by Gemini 3.6 Flash</p>
            <p className="mt-0.5">Sin frenos, pura cadena y corazón. 💛🖤</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
