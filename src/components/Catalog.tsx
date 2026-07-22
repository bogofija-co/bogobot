import React, { useState } from 'react';
import { BOGOFIJA_PRODUCTS } from '../data/catalog';
import { Product } from '../types';
import { ShoppingBag, Plus, Check, Info, Shield, Truck, Phone, ArrowRight, X } from 'lucide-react';

interface CatalogProps {
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  selectedProductId?: string;
  onClearSelectedProduct?: () => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onAddToCart, selectedProductId, onClearSelectedProduct }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    selectedProductId ? BOGOFIJA_PRODUCTS.find((p) => p.id === selectedProductId) || null : null
  );

  const [chosenSize, setChosenSize] = useState<string>('');
  const [chosenColor, setChosenColor] = useState<string>('');
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const categories = [
    { id: 'todos', label: 'Todos los Productos' },
    { id: 'marco', label: 'Marcos Aluminio 6061' },
    { id: 'jersey', label: 'Jerseys & Apparel' },
    { id: 'componente', label: 'Componentes Pista' },
    { id: 'accesorio', label: 'Accesorios & Straps' },
  ];

  const filteredProducts = activeCategory === 'todos'
    ? BOGOFIJA_PRODUCTS
    : BOGOFIJA_PRODUCTS.filter((p) => p.category === activeCategory);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setChosenSize(product.sizes ? product.sizes[0] : '');
    setChosenColor(product.colors ? product.colors[0] : '');
  };

  const handleAddToCartClick = (product: Product, size?: string, color?: string) => {
    onAddToCart(product, size || chosenSize, color || chosenColor);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-yellow-400 text-zinc-950 px-5 py-3 rounded-2xl font-black text-sm shadow-2xl flex items-center gap-2 animate-bounce border-2 border-zinc-950">
          <Check className="w-5 h-5 stroke-[3]" />
          <span>¡Producto agregado al Carrito BOGOFIJA! 🚴‍♂️</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">
          <ShoppingBag className="w-3.5 h-3.5" />
          Tienda Oficial Bogotá Piñón Fijo
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight italic">
          Catálogo BOGOFIJA
        </h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-2xl leading-relaxed">
          Marcos de pista en Aluminio 6061 con geometría agresiva, jerseys con corte aerodinámico, platos CNC y componentes probados en las calles y montañas de Bogotá.
        </p>

        {/* Guarantees Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-zinc-800/80 text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-yellow-400" />
            <span>Envíos seguros a toda Colombia 🇨🇴</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-yellow-400" />
            <span>Garantía oficial BOGOFIJA 6061</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-yellow-400" />
            <span>Atención directa por WhatsApp</span>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-yellow-400 text-zinc-950 shadow-lg shadow-yellow-500/20 scale-105'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-900/90 rounded-3xl border border-zinc-800 overflow-hidden hover:border-yellow-400/50 transition-all duration-300 group flex flex-col justify-between shadow-xl"
          >
            <div>
              {/* Product Image Box */}
              <div 
                onClick={() => handleOpenModal(product)} 
                className="aspect-square w-full bg-zinc-950 relative overflow-hidden cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-yellow-400 text-zinc-950 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Info Body */}
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block">
                  {product.category}
                </span>
                <h3 
                  onClick={() => handleOpenModal(product)} 
                  className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors cursor-pointer line-clamp-2"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 pt-0 space-y-3">
              <div className="flex items-baseline justify-between border-t border-zinc-800 pt-3">
                <span className="text-xs text-zinc-400">Precio COP</span>
                <span className="text-lg font-black text-yellow-400 font-mono">
                  ${product.price.toLocaleString('es-CO')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenModal(product)}
                  className="w-full bg-zinc-950 hover:bg-zinc-800 text-zinc-300 text-xs font-bold py-2.5 rounded-xl border border-zinc-800 transition-all cursor-pointer"
                >
                  Ver Specs
                </button>
                <button
                  onClick={() => handleAddToCartClick(product, product.sizes?.[0], product.colors?.[0])}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-950 text-xs font-black py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-yellow-500/20"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Añadir</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            
            <button
              onClick={() => {
                setSelectedProduct(null);
                if (onClearSelectedProduct) onClearSelectedProduct();
              }}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-zinc-950 rounded-xl border border-zinc-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-950 relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {selectedProduct.badge && (
                  <span className="absolute top-3 left-3 bg-yellow-400 text-zinc-950 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">
                    {selectedProduct.badge}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">
                    {selectedProduct.name}
                  </h3>
                  <span className="text-2xl font-black text-yellow-400 font-mono mt-2 block">
                    ${selectedProduct.price.toLocaleString('es-CO')} COP
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Size Selector */}
                {selectedProduct.sizes && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase block">Seleccionar Talla:</label>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setChosenSize(s)}
                          className={`text-xs px-3 py-1.5 rounded-xl border cursor-pointer font-bold ${
                            chosenSize === s
                              ? 'bg-yellow-400 text-zinc-950 border-yellow-400'
                              : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selector */}
                {selectedProduct.colors && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-400 uppercase block">Seleccionar Color:</label>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setChosenColor(c)}
                          className={`text-xs px-3 py-1.5 rounded-xl border cursor-pointer font-bold ${
                            chosenColor === c
                              ? 'bg-yellow-400 text-zinc-950 border-yellow-400'
                              : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Specifications list */}
            {selectedProduct.specs && (
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-2">
                <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider block">
                  Especificaciones Técnicas
                </span>
                <ul className="text-xs text-zinc-300 space-y-1">
                  {selectedProduct.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  handleAddToCartClick(selectedProduct, chosenSize, chosenColor);
                  setSelectedProduct(null);
                  if (onClearSelectedProduct) onClearSelectedProduct();
                }}
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black py-3 rounded-2xl transition-all cursor-pointer shadow-lg shadow-yellow-500/20 uppercase text-xs sm:text-sm tracking-wide"
              >
                Añadir al Carrito
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
