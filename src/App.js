import { useState } from "react";

const products = [
  { id: 1, name: "Sepatu Sneakers Pro", category: "Sepatu", price: 459000, originalPrice: 599000, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", badge: "Terlaris", rating: 4.8, sold: 1240 },
  { id: 2, name: "Tas Ransel Urban", category: "Tas", price: 329000, originalPrice: 429000, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80", badge: "Diskon 23%", rating: 4.6, sold: 873 },
  { id: 3, name: "Jam Tangan Minimalis", category: "Aksesoris", price: 899000, originalPrice: null, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", badge: "Baru", rating: 4.9, sold: 412 },
  { id: 4, name: "Kaos Polos Premium", category: "Pakaian", price: 129000, originalPrice: 179000, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", badge: "Diskon 28%", rating: 4.5, sold: 3201 },
  { id: 5, name: "Celana Jogger Casual", category: "Pakaian", price: 219000, originalPrice: 279000, img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80", badge: null, rating: 4.4, sold: 654 },
  { id: 6, name: "Topi Bucket Hat", category: "Aksesoris", price: 89000, originalPrice: 119000, img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80", badge: "Diskon 25%", rating: 4.3, sold: 921 },
];

const categories = ["Semua", "Sepatu", "Tas", "Pakaian", "Aksesoris"];

const fmt = (n) => "Rp " + n.toLocaleString("id-ID");

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .wrap {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f4f6fb;
    min-height: 100vh;
    color: #1a1d2e;
  }

  /* NAVBAR */
  .nav {
    background: #fff;
    border-bottom: 1px solid #e8eaf0;
    padding: 0 32px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .nav-logo { font-size: 20px; font-weight: 700; color: #4f46e5; letter-spacing: -0.5px; }
  .nav-logo span { color: #1a1d2e; }
  .nav-search {
    flex: 1;
    max-width: 360px;
    margin: 0 24px;
    background: #f4f6fb;
    border: 1px solid #e8eaf0;
    border-radius: 24px;
    padding: 8px 16px;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    color: #1a1d2e;
  }
  .nav-right { display: flex; align-items: center; gap: 16px; }
  .cart-btn {
    position: relative;
    background: #4f46e5;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 8px 18px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.2s;
  }
  .cart-btn:hover { background: #4338ca; }
  .cart-count {
    background: #f43f5e;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* HERO BANNER */
  .hero {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    margin: 20px 32px;
    border-radius: 20px;
    padding: 36px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    overflow: hidden;
    position: relative;
  }
  .hero::after {
    content: '';
    position: absolute;
    right: -40px; top: -40px;
    width: 200px; height: 200px;
    background: rgba(255,255,255,0.07);
    border-radius: 50%;
  }
  .hero-sub { font-size: 13px; letter-spacing: 2px; text-transform: uppercase; opacity: 0.75; margin-bottom: 10px; }
  .hero h1 { font-size: 28px; font-weight: 700; line-height: 1.2; }
  .hero h1 span { color: #fde68a; }
  .hero p { font-size: 14px; opacity: 0.8; margin-top: 10px; }
  .hero-btn {
    margin-top: 20px;
    background: #fff;
    color: #4f46e5;
    border: none;
    border-radius: 24px;
    padding: 11px 24px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: transform 0.2s;
  }
  .hero-btn:hover { transform: scale(1.04); }
  .hero-emoji { font-size: 80px; opacity: 0.9; }

  /* CATEGORIES */
  .cats {
    display: flex;
    gap: 10px;
    padding: 0 32px;
    margin-bottom: 20px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .cat-btn {
    flex-shrink: 0;
    border: 1.5px solid #e8eaf0;
    background: #fff;
    border-radius: 24px;
    padding: 8px 18px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    font-family: inherit;
    color: #6b7280;
    transition: all 0.18s;
  }
  .cat-btn.active {
    background: #4f46e5;
    border-color: #4f46e5;
    color: #fff;
  }
  .cat-btn:hover:not(.active) {
    border-color: #4f46e5;
    color: #4f46e5;
  }

  /* SECTION TITLE */
  .section-title {
    padding: 0 32px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .section-title h2 { font-size: 18px; font-weight: 700; }
  .section-title span { font-size: 13px; color: #4f46e5; cursor: pointer; font-weight: 500; }

  /* PRODUCT GRID */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding: 0 32px 32px;
  }

  /* PRODUCT CARD */
  .pcard {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s;
    border: 1px solid #f0f2f8;
    animation: popIn 0.4s both;
  }
  .pcard:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(79,70,229,0.12); }

  @keyframes popIn {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
  }

  .pcard:nth-child(1) { animation-delay: 0.04s; }
  .pcard:nth-child(2) { animation-delay: 0.08s; }
  .pcard:nth-child(3) { animation-delay: 0.12s; }
  .pcard:nth-child(4) { animation-delay: 0.16s; }
  .pcard:nth-child(5) { animation-delay: 0.20s; }
  .pcard:nth-child(6) { animation-delay: 0.24s; }

  .pcard-img {
    position: relative;
    height: 180px;
    overflow: hidden;
    background: #f8f9ff;
  }
  .pcard-img img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
  .pcard:hover .pcard-img img { transform: scale(1.06); }

  .badge {
    position: absolute;
    top: 10px; left: 10px;
    background: #f43f5e;
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .badge.new { background: #10b981; }
  .badge.top { background: #f59e0b; }

  .wishlist {
    position: absolute;
    top: 10px; right: 10px;
    width: 28px; height: 28px;
    background: #fff;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    border: none;
    cursor: pointer;
    transition: transform 0.2s;
  }
  .wishlist:hover { transform: scale(1.2); }

  .pcard-body { padding: 14px; }
  .pcard-cat { font-size: 11px; color: #9ca3af; font-weight: 500; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 4px; }
  .pcard-name { font-size: 14px; font-weight: 600; color: #1a1d2e; line-height: 1.4; margin-bottom: 6px; }

  .rating { display: flex; align-items: center; gap: 4px; font-size: 12px; color: #6b7280; margin-bottom: 10px; }
  .rating span:first-child { color: #f59e0b; font-weight: 600; }

  .price-row { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
  .price { font-size: 15px; font-weight: 700; color: #4f46e5; }
  .price-orig { font-size: 12px; color: #d1d5db; text-decoration: line-through; }

  .add-btn {
    width: 100%;
    background: #4f46e5;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 9px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.2s, transform 0.15s;
  }
  .add-btn:hover { background: #4338ca; }
  .add-btn:active { transform: scale(0.97); }
  .add-btn.added { background: #10b981; }

  /* TOAST */
  .toast {
    position: fixed;
    bottom: 28px; right: 28px;
    background: #1a1d2e;
    color: #fff;
    padding: 12px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    z-index: 999;
    animation: slideUp 0.3s ease;
    pointer-events: none;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* CART PANEL */
  .overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.35);
    z-index: 200;
  }
  .cart-panel {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 340px;
    background: #fff;
    z-index: 201;
    display: flex;
    flex-direction: column;
    animation: slideIn 0.3s ease;
  }
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }
  .cp-header {
    padding: 20px 24px;
    border-bottom: 1px solid #f0f2f8;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .cp-header h3 { font-size: 17px; font-weight: 700; }
  .cp-close {
    background: #f4f6fb; border: none; border-radius: 50%;
    width: 32px; height: 32px;
    cursor: pointer; font-size: 18px;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }
  .cp-close:hover { background: #e8eaf0; }
  .cp-items { flex: 1; overflow-y: auto; padding: 16px 24px; }
  .cp-empty { text-align: center; color: #9ca3af; padding-top: 60px; font-size: 14px; }
  .cp-item {
    display: flex; gap: 12px; align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f2f8;
  }
  .cp-item img { width: 52px; height: 52px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
  .cp-item-name { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
  .cp-item-price { font-size: 13px; color: #4f46e5; font-weight: 600; }
  .cp-rm {
    margin-left: auto;
    background: none; border: none;
    font-size: 18px; cursor: pointer;
    color: #d1d5db;
    flex-shrink: 0;
    transition: color 0.15s;
  }
  .cp-rm:hover { color: #f43f5e; }
  .cp-footer { padding: 20px 24px; border-top: 1px solid #f0f2f8; }
  .cp-total { display: flex; justify-content: space-between; font-size: 15px; font-weight: 700; margin-bottom: 14px; }
  .checkout-btn {
    width: 100%;
    background: #4f46e5;
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 13px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.2s;
  }
  .checkout-btn:hover { background: #4338ca; }
`;

export default function App() {
  const [activeCat, setActiveCat] = useState("Semua");
  const [cart, setCart] = useState([]);
  const [liked, setLiked] = useState({});
  const [added, setAdded] = useState({});
  const [toast, setToast] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = activeCat === "Semua" ? products : products.filter(p => p.category === activeCat);

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
    setAdded(prev => ({ ...prev, [p.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [p.id]: false })), 1000);
    setToast(`${p.name} ditambahkan ke keranjang!`);
    setTimeout(() => setToast(null), 2000);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  const badgeClass = (b) => {
    if (!b) return "badge";
    if (b === "Baru") return "badge new";
    if (b === "Terlaris") return "badge top";
    return "badge";
  };

  return (
    <div className="wrap">
      <style>{style}</style>

      {/* NAVBAR */}
      <div className="nav">
        <div className="nav-logo">Shop<span>In</span></div>
        <input className="nav-search" placeholder="🔍  Cari produk..." />
        <div className="nav-right">
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            🛒 Keranjang
            {totalQty > 0 && <div className="cart-count">{totalQty}</div>}
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <div>
          <p className="hero-sub">✦ Flash Sale Hari Ini</p>
          <h1>Belanja Hemat<br /><span>Sampai 50% OFF</span></h1>
          <p>Produk pilihan terbaik, dikirim ke seluruh Indonesia.</p>
          <button className="hero-btn">Belanja Sekarang →</button>
        </div>
        <div className="hero-emoji">🛍️</div>
      </div>

      {/* KATEGORI */}
      <div className="cats">
        {categories.map(c => (
          <button
            key={c}
            className={`cat-btn${activeCat === c ? " active" : ""}`}
            onClick={() => setActiveCat(c)}
          >{c}</button>
        ))}
      </div>

      {/* PRODUK */}
      <div className="section-title">
        <h2>Produk Unggulan</h2>
        <span>Lihat semua →</span>
      </div>

      <div className="grid">
        {filtered.map(p => (
          <div className="pcard" key={p.id}>
            <div className="pcard-img">
              <img src={p.img} alt={p.name} />
              {p.badge && <div className={badgeClass(p.badge)}>{p.badge}</div>}
              <button className="wishlist" onClick={() => setLiked(prev => ({ ...prev, [p.id]: !prev[p.id] }))}>
                {liked[p.id] ? "❤️" : "🤍"}
              </button>
            </div>
            <div className="pcard-body">
              <p className="pcard-cat">{p.category}</p>
              <h3 className="pcard-name">{p.name}</h3>
              <div className="rating">
                <span>★ {p.rating}</span>
                <span>• {p.sold.toLocaleString("id-ID")} terjual</span>
              </div>
              <div className="price-row">
                <span className="price">{fmt(p.price)}</span>
                {p.originalPrice && <span className="price-orig">{fmt(p.originalPrice)}</span>}
              </div>
              <button
                className={`add-btn${added[p.id] ? " added" : ""}`}
                onClick={() => addToCart(p)}
              >
                {added[p.id] ? "✓ Ditambahkan" : "+ Tambah ke Keranjang"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TOAST */}
      {toast && <div className="toast">🛒 {toast}</div>}

      {/* CART PANEL */}
      {cartOpen && (
        <>
          <div className="overlay" onClick={() => setCartOpen(false)} />
          <div className="cart-panel">
            <div className="cp-header">
              <h3>Keranjang ({totalQty})</h3>
              <button className="cp-close" onClick={() => setCartOpen(false)}>✕</button>
            </div>
            <div className="cp-items">
              {cart.length === 0
                ? <p className="cp-empty">🛒<br />Keranjang masih kosong</p>
                : cart.map(i => (
                  <div className="cp-item" key={i.id}>
                    <img src={i.img} alt={i.name} />
                    <div>
                      <p className="cp-item-name">{i.name}</p>
                      <p className="cp-item-price">{fmt(i.price)} × {i.qty}</p>
                    </div>
                    <button className="cp-rm" onClick={() => removeFromCart(i.id)}>×</button>
                  </div>
                ))
              }
            </div>
            {cart.length > 0 && (
              <div className="cp-footer">
                <div className="cp-total">
                  <span>Total</span>
                  <span>{fmt(total)}</span>
                </div>
                <button className="checkout-btn">Checkout Sekarang →</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}