
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Star, 
  Clock, 
  Filter, 
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  Store,
  Gem,
  ArrowLeft,
  Package,
  ShieldCheck,
  RotateCcw,
  Users,
  Handshake,
  TrendingUp,
  Award,
  History
} from 'lucide-react';
import { Category, Product, CartItem, StatItem, PortfolioItem } from './types';
import { PRODUCTS, STATS, PORTFOLIO_ITEMS } from './constants';

const IconMap: { [key: string]: any } = {
  Users,
  ShoppingBag,
  Star,
  Handshake
};

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                          p.description.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, debouncedSearch]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const selectedProduct = useMemo(() => 
    PRODUCTS.find(p => p.id === selectedProductId), 
  [selectedProductId]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-slate-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-indigo-50 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setSelectedProductId(null)}
        >
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-2 rounded-lg">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-r from-indigo-800 to-purple-800 hidden sm:block">
            Bodhon <span className="font-light text-slate-500 text-sm md:text-lg">Sellers</span>
          </span>
        </div>

        <div className="flex-1 max-w-md mx-4 md:mx-8 relative group">
          <input 
            type="text" 
            placeholder="Search our catalog..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100/50 border border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-indigo-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
        {selectedProduct ? (
          <ProductDetailPage 
            product={selectedProduct} 
            onBack={() => setSelectedProductId(null)} 
            onAddToCart={() => addToCart(selectedProduct)}
          />
        ) : (
          <>
            {/* Hero Section */}
            <div className="mb-8 p-6 md:p-12 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
              <div className="flex-1 text-center md:text-left z-10">
                <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                  <Award className="w-3.5 h-3.5" /> Established Retail Excellence
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1]">
                  The Bodhon <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Track Record.</span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
                  Trusted by thousands of customers and hundreds of local bakery partners. Explore our current catalog or see why we are leaders in hybrid commerce.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <button onClick={() => {
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-900/40 hover:bg-indigo-700 transition-all flex items-center gap-2 text-sm uppercase tracking-wider">
                    Browse Catalog
                  </button>
                  <button onClick={() => {
                    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                  }} className="bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2 text-sm uppercase tracking-wider">
                    Our Track Record
                  </button>
                </div>
              </div>
              <div className="hidden lg:block relative w-80 h-80 z-10 group">
                <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img src="https://placehold.co/600x600?text=Quality+Assurance" alt="Featured" className="w-full h-full object-cover rounded-3xl shadow-2xl border border-slate-700 rotate-2 group-hover:rotate-0 transition-transform duration-500" />
              </div>
            </div>

            {/* Impact Stats Section */}
            <section className="mb-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((stat, idx) => {
                const Icon = IconMap[stat.icon] || TrendingUp;
                return (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-1">{stat.value}</h4>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                  </div>
                );
              })}
            </section>

            {/* Catalog (What we sell) */}
            <section id="catalog" className="mb-20">
              <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                    <Gem className="w-8 h-8 text-indigo-600" /> Currently Selling
                  </h2>
                  <p className="text-slate-500 mt-2">Discover our active inventory of premium fashion and fresh bakes.</p>
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                  {(['All', 'Fashion', 'Food'] as Category[]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-6 py-2 rounded-full text-xs font-black transition-all whitespace-nowrap border-2 uppercase tracking-widest
                        ${activeCategory === cat 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
                          : 'bg-white text-slate-400 border-white hover:border-indigo-100'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={() => addToCart(product)} 
                    onClick={() => setSelectedProductId(product.id)}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="py-20 text-center flex flex-col items-center">
                  <div className="bg-slate-200 p-8 rounded-full mb-6">
                    <Search className="w-12 h-12 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">No matches for "{debouncedSearch}"</h3>
                  <p className="text-slate-500 mt-2">Try checking our categories or clear your search.</p>
                </div>
              )}
            </section>

            {/* Portfolio Section (What we have sold) */}
            <section id="portfolio" className="mb-20 pt-16 border-t border-slate-100">
              <div className="mb-12 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                  <History className="w-3 h-3" /> Corporate & Event Success
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4">Our Track Record</h2>
                <p className="text-slate-500">Beyond our daily catalog, we specialize in high-volume fulfillment and specialized events. Here is a glimpse of what we've achieved.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PORTFOLIO_ITEMS.map((item) => (
                  <div key={item.id} className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {item.tag}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-black shadow-xl">
                        {item.stats}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">{item.description}</p>
                      <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
                        Case Study <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />}
      <aside className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[60] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide">My Cart</h2>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-slate-200" />
                </div>
                <p className="text-slate-400 font-medium">Your basket is empty</p>
                <button onClick={() => setIsCartOpen(false)} className="mt-4 text-indigo-600 font-bold hover:underline">Browse Products</button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Items ({cartCount})</h3>
                  <button onClick={clearCart} className="text-xs font-bold text-red-500 flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded transition-colors uppercase">
                    <Trash2 className="w-3 h-3" /> Clear Cart
                  </button>
                </div>
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between gap-2">
                        <h4 className="font-bold text-slate-800 text-sm leading-tight">{item.name}</h4>
                        <span className="font-bold text-sm text-indigo-700 whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">₹{item.price.toLocaleString()} / unit</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center bg-slate-100 rounded-xl p-0.5 px-2 gap-3">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-500 hover:text-indigo-600 p-1"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-black text-slate-700 w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-500 hover:text-indigo-600 p-1"><Plus className="w-3 h-3" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t bg-indigo-50/30">
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span className="font-bold text-slate-800">₹{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Shipping</span><span className="text-green-600 font-bold uppercase text-[10px] bg-green-100 px-2 py-0.5 rounded-full">Free</span></div>
                <div className="flex justify-between items-end pt-2 border-t border-indigo-100/50">
                  <span className="text-base font-bold text-slate-900">Est. Total</span>
                  <span className="text-2xl font-black text-indigo-700">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                Proceed to Pay <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      <footer className="w-full py-16 bg-slate-900 text-slate-400 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingBag className="w-8 h-8 text-indigo-500" />
              <span className="text-2xl font-black text-white tracking-tight">Bodhon Sellers</span>
            </div>
            <p className="text-base leading-relaxed max-w-md">
              A hybrid commerce platform dedicated to excellence. Whether it's our dropshipped fashion tiers or local bakery deliveries, we prioritize speed, quality, and seller transparency.
            </p>
            <div className="mt-8 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Quick Navigation</h4>
            <ul className="text-sm space-y-4">
              <li><button onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-400">Current Catalog</button></li>
              <li><button onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-400">Sold History</button></li>
              <li><button onClick={() => setIsCartOpen(true)} className="hover:text-indigo-400">Shopping Cart</button></li>
              <li><a href="#" className="hover:text-indigo-400">Seller Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contact Bodhon</h4>
            <p className="text-sm">Email: business@bodhon.com</p>
            <p className="text-sm mt-2">WhatsApp: +91 98765 43210</p>
            <p className="text-sm mt-4 text-slate-500 italic">24/7 Priority Seller Support</p>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs font-bold uppercase tracking-[0.2em]">
          © 2024 Bodhon Sellers Portfolio & Commerce. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

// Component: Product Detail Page
const ProductDetailPage: React.FC<{ product: Product; onBack: () => void; onAddToCart: () => void }> = ({ product, onBack, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-6 group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Catalog
      </button>

      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Product Images Section */}
        <div className="p-4 md:p-10 bg-slate-50">
          <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-white">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="mt-6 grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-white border-2 border-transparent hover:border-indigo-400 cursor-pointer transition-all hover:scale-105">
                <img src={`https://placehold.co/200?text=View+${i}`} className="w-full h-full object-cover opacity-60 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="p-8 md:p-14 flex flex-col">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                {product.category}
              </span>
              {product.isPerishable && (
                <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Fresh/Local
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-4">{product.name}</h1>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-1.5 bg-yellow-400 text-slate-900 px-3 py-1 rounded-xl shadow-lg shadow-yellow-400/20">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-black text-sm">{product.rating}</span>
              </div>
              <span className="text-slate-400 text-sm font-bold uppercase tracking-widest border-l border-slate-200 pl-6">{product.reviews?.length || 0} Verfied Reviews</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Our Price</span>
              <p className="text-4xl font-black text-indigo-700">₹{product.price.toLocaleString()}</p>
            </div>
          </div>

          <p className="text-slate-500 leading-relaxed mb-10 text-lg font-medium">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={onAddToCart}
              className="flex-1 bg-slate-900 text-white py-6 rounded-2xl font-black text-lg shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-[0.98] flex items-center justify-center gap-4 uppercase tracking-widest"
            >
              <ShoppingCart className="w-6 h-6" /> Add To Basket
            </button>
            <button className="sm:w-20 h-20 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all shadow-sm">
              <RotateCcw className="w-7 h-7" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="flex items-center gap-4 p-5 bg-indigo-50/50 rounded-3xl border border-indigo-100/50">
              <Package className="w-6 h-6 text-indigo-600" />
              <div>
                <p className="text-[10px] uppercase font-black text-indigo-400 tracking-[0.2em]">Shipping</p>
                <p className="text-sm font-black text-slate-800">Priority Hub Delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-green-50/50 rounded-3xl border border-green-100/50">
              <ShieldCheck className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-[10px] uppercase font-black text-green-400 tracking-[0.2em]">Assurance</p>
                <p className="text-sm font-black text-slate-800">Quality Certified</p>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-auto">
            <div className="flex border-b border-slate-100 mb-8">
              <button 
                onClick={() => setActiveTab('details')}
                className={`pb-4 px-4 font-black text-xs uppercase tracking-[0.2em] transition-all relative ${activeTab === 'details' ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                Specifications
                {activeTab === 'details' && <div className="absolute bottom-0 left-0 w-full h-1.5 bg-indigo-600 rounded-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`ml-10 pb-4 px-4 font-black text-xs uppercase tracking-[0.2em] transition-all relative ${activeTab === 'reviews' ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                Community Feedback ({product.reviews?.length || 0})
                {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 w-full h-1.5 bg-indigo-600 rounded-full" />}
              </button>
            </div>

            <div className="min-h-[250px]">
              {activeTab === 'details' ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {product.specifications?.map((spec, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-bold bg-slate-50 p-3 rounded-xl border border-white">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(129,140,248,0.5)]"></div>
                      {spec}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-8">
                  {product.reviews?.map(review => (
                    <div key={review.id} className="bg-slate-50/50 p-6 rounded-3xl border border-white">
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-black text-slate-900 text-base">{review.user}</p>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{review.date}</span>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <p className="text-slate-500 italic font-medium">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component: Product Card
const ProductCard: React.FC<{ product: Product; onAddToCart: () => void; onClick: () => void }> = ({ product, onAddToCart, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-[2.5rem] border border-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-2"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
          {product.isPerishable && (
            <div className="bg-orange-500 text-white text-[9px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl uppercase tracking-tighter">
              <Clock className="w-3.5 h-3.5" /> Fast Hub
            </div>
          )}
          {product.tier && (
            <div className={`text-[9px] font-black px-3 py-1.5 rounded-xl shadow-xl uppercase tracking-widest
              ${product.tier === 'Premium' ? 'bg-amber-100 text-amber-800' : 
                product.tier === 'Mid-range' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-800'}`}>
              {product.tier}
            </div>
          )}
        </div>
        
        <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-black text-slate-900 shadow-2xl border border-white/50">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {product.rating}
        </div>
      </div>

      <div className="p-7 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2">
           <h3 className="text-slate-900 font-black text-lg leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
          {product.subCategory}
        </p>
        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed h-10 mb-6 font-medium">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Listing Price</span>
            <span className="text-2xl font-black text-slate-900">₹{product.price.toLocaleString()}</span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="bg-indigo-600 text-white p-4 rounded-2xl transition-all duration-300 hover:bg-slate-900 hover:scale-110 active:scale-95 shadow-xl shadow-indigo-100"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
