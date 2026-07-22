import React, { useState, useMemo } from 'react';
import { BOGOFIJA_PRODUCTS } from '../data/catalog';
import { Product } from '../types';
import { ShoppingBag, Plus, Check, Shield, Truck, Phone, ArrowRight, X, Search, Sparkles, MessageSquare } from 'lucide-react';
import { generateWhatsAppLink } from '../utils/calculations';

interface CatalogProps {
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  selectedProductId?: string;
  onClearSelectedProduct?: () => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onAddToCart, selectedProductId, onClearSelectedProduct }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    selectedProductId ? BOGOFIJA_PRODUCTS.find((p) => p.id === selectedProductId) || null : null
  );

  const [chosenSize, setChosenSize] = useState<string>('');
  const [chosenColor, setChosenColor] = useState<string>('');
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const categories = [
    { id: 'todos', label: 'Todos', count: BOGOFIJA_PRODUCTS.length },
    { id: 'marco', label: 'Marcos 6061', count: BOGOFIJA_PRODUCTS.filter(p => p.category === 'marco').length },
    { id: 'jersey', label: 'Jerseys', count: BOGOFIJA_PRODUCTS.filter(p => p.category === 'jersey').length },
    { id: 'componente', label: 'Componentes', count: BOGOFIJA_PRODUCTS.filter(p => p.category === 'componente').length },
    { id: 'accesorio', label: 'Accesorios', count: BOGOFIJA_PRODUCTS.filter(p => p.category === 'accesorio').length },
  ];

  const filteredProducts = useMemo(() => {
    return BOGOFIJA_PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === 'todos' || p.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

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
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-800/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-widest">
            <ShoppingBag className="w-3.5 h-3.5" />
            Tienda Oficial Bogotá Piñón Fijo
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight italic">
            Catálogo BOGOFIJA
          </h2>

          <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Marcos de pista en Aluminio 6061 con geometría agresiva, jerseys con corte aerodinámico, platos CNC y componentes probados en las calles y montañas de Bogotá.
          </p>

          {/* Guarantees Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-800/80 text-xs text-zinc-300">
            <div className="flex items-center gap-2 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/60">
              <Truck className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>Envíos rápidos en Bogotá y Colombia 🇨🇴</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/60">
              <Shield className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>Garantía oficial BOGOFIJA 6061</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/60">
              <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>WhatsApp Directo: <strong className="text-yellow-400">311 811 3811</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar flex-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-yellow-400 text-zinc-950 shadow-lg shadow-yellow-500/20 font-black scale-105'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === cat.id ? 'bg-zinc-950 text-yellow-400 font-mono' : 'bg-zinc-950 text-zinc-500'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input Box */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar marco, jersey, plato..."
            className="w-full bg-zinc-900 text-white placeholder-zinc-500 text-xs pl-10 pr-4 py-2.5 rounded-2xl border border-zinc-800 focus:border-yellow-400 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-zinc-900 p-12 rounded-3xl border border-zinc-800 text-center space-y-3">
          <p className="text-base font-bold text-white">No se encontraron productos con tu búsqueda</p>
          <p className="text-xs text-zinc-400">Intenta buscando 'marco', 'jersey' o borra el filtro de búsqueda.</p>
          <button
            onClick={() => {
              setActiveCategory('todos');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-yellow-400 text-zinc-950 font-black rounded-xl text-xs uppercase"
          >
            Ver Todo el Catálogo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900/90 rounded-3xl border border-zinc-800 overflow-hidden hover:border-yellow-400/50 transition-all duration-300 group flex flex-col justify-between shadow-xl hover:shadow-2xl"
            >
              <div>
                {/* Product Image Box */}
                <div 
                  onClick={() => handleOpenModal(product)} 
                  className="aspect-square w-full bg-zinc-950 relative overflow-hidden cursor-pointer group"
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
                <div className="flex items-baseline justify-between border-t border-zinc-800/80 pt-3">
                  <span className="text-[11px] text-zinc-400 font-medium">Precio COP</span>
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
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative shadow-2xl animate-in zoom-in-95 duration-200">
            
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
              <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-950 relative border border-zinc-800">
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
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  handleAddToCartClick(selectedProduct, chosenSize, chosenColor);
                  setSelectedProduct(null);
                  if (onClearSelectedProduct) onClearSelectedProduct();
                }}
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black py-3.5 rounded-2xl transition-all cursor-pointer shadow-lg shadow-yellow-500/20 uppercase text-xs sm:text-sm tracking-wide"
              >
                Añadir al Carrito
              </button>

              <a
                href={generateWhatsAppLink(`Hola, quiero consultar disponibilidad inmediata del producto: *${selectedProduct.name}*`)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black px-4 py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm uppercase cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-zinc-950" />
                <span>Consultar en WhatsApp (311 811 3811)</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

