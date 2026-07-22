import React from 'react';
import { CartItem } from '../types';
import { generateWhatsAppLink } from '../utils/calculations';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageSquare, PhoneCall, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalCOP = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const phoneNumberDisplay = '311 811 3811';

  // Format cart order text for WhatsApp
  const formatCartForWhatsApp = () => {
    if (cart.length === 0) return '';
    let text = '🚴‍♂️ *PEDIDO WEB BOGOFIJA* 🇨🇴\n\n';
    cart.forEach((item, idx) => {
      text += `${idx + 1}. *${item.product.name}*\n`;
      if (item.selectedSize) text += `   - Talla: ${item.selectedSize}\n`;
      if (item.selectedColor) text += `   - Color: ${item.selectedColor}\n`;
      text += `   - Cantidad: ${item.quantity} x $${item.product.price.toLocaleString('es-CO')} COP\n\n`;
    });
    text += `*TOTAL ESTIMADO:* $${totalCOP.toLocaleString('es-CO')} COP\n`;
    text += `\n¿Tienen disponibilidad para despacho en Bogotá o envío nacional?`;
    return text;
  };

  const whatsappUrl = generateWhatsAppLink(formatCartForWhatsApp());

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
      <div className="bg-zinc-950 border-l border-zinc-800 w-full max-w-md h-full flex flex-col justify-between shadow-2xl relative animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800/80 bg-zinc-900/80 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-zinc-950 font-black shadow-md shadow-yellow-500/10">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-black text-lg text-white uppercase italic tracking-tight flex items-center gap-2">
                Carrito BOGOFIJA
                <span className="bg-yellow-400 text-zinc-950 text-xs px-2 py-0.5 rounded-full font-black font-mono">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
                <PhoneCall className="w-3 h-3 text-emerald-400" />
                <span>Atención WhatsApp: <strong>311 811 3811</strong></span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 transition-all cursor-pointer"
            title="Cerrar Carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contact Info Highlight Box */}
        <div className="px-5 py-2.5 bg-emerald-950/40 border-b border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-between font-medium">
          <span className="flex items-center gap-1.5 font-bold">
            <MessageSquare className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            Línea Directa: +57 311 811 3811
          </span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase font-black tracking-wider">
            ACTIVO
          </span>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center text-zinc-600 border border-zinc-800 shadow-inner">
                <ShoppingBag className="w-10 h-10 text-yellow-400/60" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-black text-white uppercase italic">Tu carrito está vacío</p>
                <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                  Agrega marcos 6061, jerseys aerodinámicos o accesorios BOGOFIJA para iniciar tu pedido directo al <strong className="text-yellow-400">3118113811</strong>.
                </p>
              </div>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                className="bg-zinc-900/90 p-3.5 rounded-2xl border border-zinc-800/90 hover:border-zinc-700 transition-all flex items-center gap-3.5 shadow-md group"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-zinc-950 shrink-0 border border-zinc-800"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                    {item.product.name}
                  </h4>
                  
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-medium">
                    {item.selectedSize && (
                      <span className="bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 text-yellow-400 font-mono">
                        {item.selectedSize}
                      </span>
                    )}
                    {item.selectedColor && (
                      <span className="bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 text-zinc-300">
                        {item.selectedColor}
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-black text-yellow-400 font-mono block">
                    ${(item.product.price * item.quantity).toLocaleString('es-CO')} <span className="text-[9px] text-zinc-500 font-normal">COP</span>
                  </span>
                </div>

                {/* Quantity modifier controls */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                    title="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-zinc-950 px-2 py-1 rounded-xl border border-zinc-800">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="text-zinc-400 hover:text-white transition-colors p-0.5 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white font-mono px-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="text-zinc-400 hover:text-white transition-colors p-0.5 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-900/90 backdrop-blur-md space-y-3.5">
            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Estimado</span>
                <span className="text-2xl font-black text-yellow-400 font-mono">
                  ${totalCOP.toLocaleString('es-CO')} <span className="text-xs font-normal text-zinc-500">COP</span>
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                <Truck className="w-3 h-3 text-yellow-400" />
                <span>Despachos rápidos en Bogotá y envíos seguros a Colombia.</span>
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black py-3.5 px-4 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 uppercase tracking-wide text-xs sm:text-sm text-center"
            >
              <MessageSquare className="w-5 h-5 fill-zinc-950" />
              <span>Pedir por WhatsApp (311 811 3811)</span>
            </a>

            <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
              <button
                onClick={onClearCart}
                className="hover:text-red-400 transition-colors font-medium flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Vaciar Carrito</span>
              </button>
              <span className="text-zinc-400 font-mono font-bold">Línea Directa: 311 811 3811</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

