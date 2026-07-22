import React from 'react';
import { CartItem } from '../types';
import { generateWhatsAppLink } from '../utils/calculations';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageSquare, ArrowRight } from 'lucide-react';

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
    text += `*TOTAL STIMATED:* $${totalCOP.toLocaleString('es-CO')} COP\n`;
    text += `¿Tienen disponibilidad para envío en Bogotá / Colombia?`;
    return text;
  };

  const whatsappUrl = generateWhatsAppLink(formatCartForWhatsApp());

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="bg-zinc-950 border-l border-zinc-800 w-full max-w-md h-full flex flex-col justify-between shadow-2xl relative animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-yellow-400" />
            <h3 className="font-black text-lg text-white uppercase italic tracking-tight">
              Carrito BOGOFIJA <span className="text-yellow-400">({cart.length})</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-xl border border-zinc-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-600 border border-zinc-800">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-300">Tu carrito está vacío</p>
                <p className="text-xs text-zinc-500 max-w-xs mt-1">
                  Explora nuestro catálogo de marcos 6061, jerseys y componentes de pista.
                </p>
              </div>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800/80 flex items-center gap-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-zinc-950 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-white truncate">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    {item.selectedSize && <span>Talla: {item.selectedSize}</span>}
                    {item.selectedColor && <span>| {item.selectedColor}</span>}
                  </div>
                  <span className="text-xs font-black text-yellow-400 font-mono block">
                    ${(item.product.price * item.quantity).toLocaleString('es-CO')} COP
                  </span>
                </div>

                {/* Quantity modifier controls */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-zinc-950 px-2 py-1 rounded-xl border border-zinc-800">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="text-zinc-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white font-mono px-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="text-zinc-400 hover:text-white"
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
          <div className="p-6 border-t border-zinc-800 bg-zinc-900/90 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-zinc-400 uppercase">Subtotal COP</span>
              <span className="text-2xl font-black text-yellow-400 font-mono">
                ${totalCOP.toLocaleString('es-CO')} <span className="text-xs font-normal text-zinc-500">COP</span>
              </span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black py-3.5 px-4 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 uppercase tracking-wide text-xs sm:text-sm text-center"
            >
              <MessageSquare className="w-5 h-5 fill-zinc-950" />
              <span>Pedir por WhatsApp BOGOFIJA</span>
            </a>

            <button
              onClick={onClearCart}
              className="w-full text-xs text-zinc-500 hover:text-zinc-300 transition-colors text-center font-bold"
            >
              Vaciar Carrito
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
