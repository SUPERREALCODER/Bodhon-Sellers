
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
  RotateCcw
} from 'lucide-react';
import { Category, Product, CartItem } from './types';
import { PRODUCTS } from './constants';

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
          <span className="text-lg md:text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 to-purple-800 hidden sm:block">
            Bodhon <span className="font-light text-slate-500 text-sm md:text-lg">Sellers</span>
          </span>
        </div>

        <div className="flex-1 max-w-md mx-4 md:mx-8 relative group">
          <input 
            type="text" 
            placeholder="Search products..." 
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
            {/* Banner */}
            <div className="mb-8 p-6 md:p-10 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 text-white shadow-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="flex-1 text-center md:text-left z-10">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                  Premium Style, <br/> Local Taste.
                </h1>
                <p className="text-indigo-100 text-sm md:text-base max-w-lg mb-6 leading-relaxed">
                  Bodhon brings you the finest selection of dropshipped fashion and daily baked goods from your neighborhood.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <button onClick={() => setActiveCategory('Fashion')} className="bg-white text-indigo-700 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2">
                    <Gem className="w-4 h-4" /> Shop Fashion
                  </button>
                  <button onClick={() => setActiveCategory('Food')} className="bg-indigo-900/40 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-white/10 transition-all flex items-center gap-2">
                    <Store className="w-4 h-4" /> Order Bakery
                  </button>
                </div>
              </div>
              <div className="hidden md:block relative w-64 h-64 z-10">
                <img src="https://placehold.co/400x400?text=Trending+Now" alt="Featured" className="w-full h-full object-cover rounded-2xl shadow-2xl" />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between gap-6 mb-8 overflow-hidden">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 w-full">
                {(['All', 'Fashion', 'Food'] as Category[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border-2
                      ${activeCategory === cat 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' 
                        : 'bg-white text-slate-500 border-white hover:border-indigo-100'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <div className="bg-slate-200 p-6 rounded-full mb-4">
                  <Search className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">No matches for "{debouncedSearch}"</h3>
                <p className="text-slate-500 mt-2">Try different keywords or browse categories.</p>
              </div>
            )}
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

      <footer className="w-full py-12 bg-slate-900 text-slate-400 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-6 h-6 text-indigo-500" />
              <span className="text-xl font-bold text-white">Bodhon Sellers</span>
            </div>
            <p className="text-sm leading-relaxed">The destination for premium curated fashion and the freshest local bakes. Quality meets community.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li><button onClick={() => setActiveCategory('Fashion')} className="hover:text-indigo-400">Fashion Collection</button></li>
              <li><button onClick={() => setActiveCategory('Food')} className="hover:text-indigo-400">Fresh Bakery</button></li>
              <li><a href="#" className="hover:text-indigo-400">Track Order</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Get in Touch</h4>
            <p className="text-sm">Email: help@bodhon.com</p>
            <p className="text-sm mt-1">Address: 123 Bodhon Street, Retail Hub</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © 2024 Bodhon Sellers Hybrid Platform. Designed for Sellers.
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
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Collection
      </button>

      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Product Images Section */}
        <div className="p-4 md:p-8 bg-slate-50">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-inner border border-white">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-white border-2 border-transparent hover:border-indigo-200 cursor-pointer transition-all">
                <img src={`https://placehold.co/200?text=View+${i}`} className="w-full h-full object-cover opacity-60 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="p-6 md:p-12 flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {product.category} / {product.subCategory}
              </span>
              {product.isPerishable && (
                <span className="bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Same Day
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-700 px-2 py-1 rounded-lg">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{product.rating}</span>
              </div>
              <span className="text-slate-400 text-sm font-medium">{product.reviews?.length || 0} Customer Reviews</span>
            </div>
            <p className="text-2xl font-black text-indigo-700">₹{product.price.toLocaleString()}</p>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button 
              onClick={onAddToCart}
              className="flex-1 bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <ShoppingCart className="w-6 h-6" /> Add to Cart
            </button>
            <button className="sm:w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all">
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
              <Package className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tight">Shipping</p>
                <p className="text-sm font-bold text-slate-700">Free Delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
              <ShieldCheck className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tight">Assurance</p>
                <p className="text-sm font-bold text-slate-700">Quality Verified</p>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-auto">
            <div className="flex border-b border-slate-100 mb-6">
              <button 
                onClick={() => setActiveTab('details')}
                className={`pb-4 px-2 font-bold text-sm uppercase tracking-wider transition-all relative ${activeTab === 'details' ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                Specifications
                {activeTab === 'details' && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full" />}
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`ml-8 pb-4 px-2 font-bold text-sm uppercase tracking-wider transition-all relative ${activeTab === 'reviews' ? 'text-indigo-600' : 'text-slate-400'}`}
              >
                Reviews ({product.reviews?.length || 0})
                {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full" />}
              </button>
            </div>

            <div className="min-h-[200px]">
              {activeTab === 'details' ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                  {product.specifications?.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                      {spec}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-6">
                  {product.reviews?.map(review => (
                    <div key={review.id} className="border-b border-slate-50 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-slate-800">{review.user}</p>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{review.date}</span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-slate-500 italic">"{review.comment}"</p>
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
      className="group relative bg-white rounded-3xl border border-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-2"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.isPerishable && (
            <div className="bg-orange-500 text-white text-[9px] font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg uppercase tracking-tighter">
              <Clock className="w-3 h-3" /> Same Day
            </div>
          )}
          {product.tier && (
            <div className={`text-[9px] font-black px-2 py-1 rounded-lg shadow-lg uppercase tracking-widest
              ${product.tier === 'Premium' ? 'bg-amber-100 text-amber-800' : 
                product.tier === 'Mid-range' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-800'}`}>
              {product.tier}
            </div>
          )}
        </div>
        
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-2.5 py-1 rounded-xl flex items-center gap-1.5 text-[11px] font-black text-slate-800 shadow-xl border border-white/50">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> {product.rating}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-slate-900 font-black text-base leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed h-8">
          {product.description}
        </p>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pricing</span>
            <span className="text-xl font-black text-slate-900">₹{product.price.toLocaleString()}</span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="bg-slate-900 text-white p-3 rounded-2xl transition-all duration-300 hover:bg-indigo-600 hover:scale-110 active:scale-95 shadow-xl shadow-slate-100"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
