import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Scan, 
  MessageCircle, 
  X, 
  Minus, 
  Plus, 
  ChevronRight, 
  CheckCircle2, 
  XCircle,
  Car,
  Clipboard,
  Share2,
  Settings2
} from 'lucide-react';
import { AUTO_PARTS_DATA } from './data/stockData';
import { PartItem } from './types';

// --- Components ---

const DenseRow: React.FC<{ 
  part: PartItem; 
  onClick: (part: PartItem) => void 
}> = ({ part, onClick }) => {
  const isInStock = part.status === 'In Stock';

  return (
    <div 
      onClick={() => onClick(part)}
      className="flex items-center h-[60px] px-4 border-b border-slate-100 active:bg-slate-50 cursor-pointer transition-colors bg-white"
    >
      {/* Thumbnail */}
      <div className="w-10 h-10 rounded bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
        <img 
          src={part.images[0]} 
          alt={part.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Info */}
      <div className="flex-grow ml-3 min-w-0">
        <div className="flex items-center gap-1.5">
          <h3 className="text-sm font-bold text-slate-900 truncate">{part.name}</h3>
          <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-bold uppercase tracking-tight">
            {part.brand}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-indigo-600 font-bold">{part.oem}</span>
          <span className="text-[10px] text-slate-400 truncate">{part.category}</span>
        </div>
      </div>

      {/* Price & Status */}
      <div className="text-right flex-shrink-0 ml-2">
        <div className="text-sm font-bold text-slate-900">${part.price.toFixed(2)}</div>
        <div className={`text-[10px] font-bold flex items-center justify-end gap-1 ${isInStock ? 'text-emerald-600' : 'text-rose-500'}`}>
          {isInStock ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
          {isInStock ? 'IN STOCK' : 'OUT'}
        </div>
      </div>
      
      <ChevronRight size={16} className="text-slate-300 ml-2" />
    </div>
  );
};

const BottomSheet: React.FC<{ 
  part: PartItem | null; 
  onClose: () => void 
}> = ({ part, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (part) {
      setQuantity(1);
      setActiveImage(0);
    }
  }, [part]);

  if (!part) return null;

  const handleWhatsApp = () => {
    const businessName = "AutoPart Pro Wholesale";
    const message = `Hello ${businessName}. Inquiry for: ${part.name} (Brand: ${part.brand}, SKU/OEM: ${part.oem}). Quantity: ${quantity} units. Confirming compatibility for ${part.fitment}? Is this in stock?`;
    const url = `https://wa.me/+971544472873?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {part && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-[60] max-h-[92vh] overflow-y-auto shadow-2xl"
          >
            {/* Handle */}
            <div className="w-full flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
            </div>

            <div className="px-6 pb-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase tracking-wider">
                      {part.brand}
                    </span>
                    <span className="text-xs font-mono text-slate-400">OEM: {part.oem}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight">{part.name}</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 bg-slate-100 rounded-full text-slate-500 active:scale-90 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Gallery */}
              <div className="mb-6">
                <div className="aspect-video rounded-2xl bg-slate-100 overflow-hidden mb-3 border border-slate-100">
                  <img 
                    src={part.images[activeImage] || 'https://picsum.photos/seed/placeholder/800/600'} 
                    alt={part.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {part.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeImage === idx ? 'border-indigo-600' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                  {/* Placeholders for gallery feel */}
                  {[1, 2].map(i => (
                    <div key={i} className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0 flex items-center justify-center text-slate-300">
                      <Car size={20} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6 mb-8">
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Car size={14} /> Vehicle Compatibility
                  </h3>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-700 font-medium leading-relaxed">
                    {part.fitment}
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-4">
                  <section>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Cross-Reference</h3>
                    <div className="space-y-1">
                      {part.crossReference.map(ref => (
                        <div key={ref} className="text-xs font-mono text-slate-600 flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
                          {ref} <Clipboard size={10} className="text-slate-300" />
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category</h3>
                    <div className="p-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded border border-indigo-100 text-center">
                      {part.category}
                    </div>
                  </section>
                </div>

                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{part.description}</p>
                </section>
              </div>

              {/* Action Bar */}
              <div className="sticky bottom-0 bg-white pt-4 border-t border-slate-100 flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Wholesale Price</span>
                  <span className="text-2xl font-bold text-slate-900">${part.price.toFixed(2)}</span>
                </div>

                <div className="flex-grow flex items-center gap-3">
                  <div className="flex items-center bg-slate-100 rounded-xl p-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm active:scale-90 transition-transform"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm active:scale-90 transition-transform"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button 
                    onClick={handleWhatsApp}
                    className="flex-grow flex items-center justify-center gap-2 bg-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 active:scale-95 transition-all"
                  >
                    <MessageCircle size={18} />
                    Order
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [search, setSearch] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedPart, setSelectedPart] = useState<PartItem | null>(null);

  const filteredParts = useMemo(() => {
    return AUTO_PARTS_DATA.filter(part => {
      const matchesSearch = 
        part.name.toLowerCase().includes(search.toLowerCase()) ||
        part.oem.toLowerCase().includes(search.toLowerCase()) ||
        part.brand.toLowerCase().includes(search.toLowerCase());
      
      const matchesStock = !inStockOnly || part.status === 'In Stock';

      return matchesSearch && matchesStock;
    });
  }, [search, inStockOnly]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Settings2 size={18} />
              </div>
              <h1 className="text-lg font-extrabold tracking-tight">AutoPart Pro</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <Share2 size={20} />
              </button>
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200" />
            </div>
          </div>

          {/* Search & Filters */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text"
                  placeholder="Part Name or OEM #..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 font-medium"
                />
              </div>
              <button className="px-4 bg-white border border-slate-200 rounded-xl text-slate-600 flex items-center gap-2 text-sm font-bold shadow-sm active:scale-95 transition-all">
                <Filter size={16} />
                <span className="hidden sm:inline">Vehicle</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-4">
              {/* VIN Placeholder */}
              <div className="relative flex-grow">
                <Scan className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text"
                  disabled
                  placeholder="Search by VIN (Scan coming soon)"
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-[11px] text-slate-400 cursor-not-allowed italic"
                />
              </div>

              {/* Stock Toggle */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">In Stock</span>
                <button 
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${inStockOnly ? 'bg-emerald-500' : 'bg-slate-200'}`}
                >
                  <motion.div 
                    animate={{ x: inStockOnly ? 22 : 2 }}
                    className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* High-Density List */}
      <main className="pb-24">
        <div className="bg-white">
          {filteredParts.length > 0 ? (
            filteredParts.map(part => (
              <DenseRow 
                key={part.id} 
                part={part} 
                onClick={setSelectedPart} 
              />
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 px-6 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-slate-900 font-bold mb-1">No parts found</h3>
              <p className="text-xs">Try searching for a different OEM number or brand.</p>
              <button 
                onClick={() => { setSearch(''); setInStockOnly(false); }}
                className="mt-4 text-indigo-600 text-xs font-bold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* List Info */}
        <div className="p-4 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Showing {filteredParts.length} of {AUTO_PARTS_DATA.length} items
          </p>
        </div>
      </main>

      {/* Bottom Detail Sheet */}
      <BottomSheet 
        part={selectedPart} 
        onClose={() => setSelectedPart(null)} 
      />

      {/* Mobile Nav Placeholder */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 px-6 py-3 flex justify-between items-center z-40">
        {[
          { icon: LayoutGrid, label: 'Stock', active: true },
          { icon: Car, label: 'Garage', active: false },
          { icon: MessageCircle, label: 'Orders', active: false },
          { icon: Settings2, label: 'Account', active: false },
        ].map((item, idx) => (
          <button key={idx} className={`flex flex-col items-center gap-1 ${item.active ? 'text-indigo-600' : 'text-slate-400'}`}>
            <item.icon size={20} />
            <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

const LayoutGrid = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);
