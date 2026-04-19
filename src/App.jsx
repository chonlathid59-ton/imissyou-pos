import React, { useState, useEffect, useMemo } from "react";
import {
  ShoppingCart, Package, ChefHat, BarChart3, AlertTriangle,
  Plus, Minus, Trash2, Printer, Check, X, TrendingUp,
  Calendar, Coffee, Settings, Download, Upload, Sparkles
} from "lucide-react";

// ========== DEFAULT DATA ==========
const DEFAULT_MENU = [
  { id: "m1", name: "อเมริกาโน่", category: "กาแฟสด", price: 50, cost: 12 },
  { id: "m2", name: "อเมริกาโน่น้ำผึ้ง", category: "กาแฟสด", price: 50, cost: 15 },
  { id: "m3", name: "เอสเพรสโซ่", category: "กาแฟสด", price: 50, cost: 10 },
  { id: "m4", name: "อเมริกาโน่ส้มยูสุ", category: "กาแฟสด", price: 50, cost: 18 },
  { id: "m5", name: "อเมริกาโน่ส้ม", category: "กาแฟสด", price: 50, cost: 16 },
  { id: "m6", name: "ลาเต้", category: "กาแฟสด", price: 50, cost: 17 },
  { id: "m7", name: "มอคค่า", category: "กาแฟสด", price: 50, cost: 19 },
  { id: "m8", name: "คาปูชิโน่", category: "กาแฟสด", price: 50, cost: 17 },
  { id: "m9", name: "คาราเมลมัคคิอาโต้", category: "กาแฟสด", price: 50, cost: 20 },
  { id: "m10", name: "โกโก้", category: "กาแฟสด", price: 50, cost: 15 },
  { id: "m11", name: "ชาไทย", category: "กาแฟสด", price: 50, cost: 13 },
  { id: "m12", name: "ชาเขียว", category: "กาแฟสด", price: 50, cost: 15 },
  { id: "m13", name: "นมชมพู", category: "กาแฟสด", price: 50, cost: 12 },
  { id: "m14", name: "นมสดน้ำผึ้ง", category: "กาแฟสด", price: 50, cost: 15 },
  { id: "m15", name: "นมสดคาราเมล", category: "กาแฟสด", price: 50, cost: 16 },
  { id: "m16", name: "นมสด", category: "กาแฟสด", price: 50, cost: 12 },
  { id: "m17", name: "ชามะนาว", category: "กาแฟสด", price: 50, cost: 10 },
  { id: "m18", name: "ชาพีช", category: "กาแฟสด", price: 50, cost: 14 },
  { id: "m19", name: "ชาดำเย็น", category: "กาแฟสด", price: 50, cost: 8 },
  { id: "m20", name: "อเมริกาโน่เอธิโอเปีย", category: "กาแฟสด", price: 65, cost: 25 },
  { id: "s1", name: "พีชโซดา", category: "โซดา", price: 50, cost: 14 },
  { id: "s2", name: "แดงโซดา", category: "โซดา", price: 50, cost: 10 },
  { id: "s3", name: "แดงมะนาวโซดา", category: "โซดา", price: 50, cost: 12 },
  { id: "s4", name: "บลูฮาวาย", category: "โซดา", price: 50, cost: 13 },
  { id: "s5", name: "สตรอเบอร์รี่โซดา", category: "โซดา", price: 50, cost: 15 },
  { id: "s6", name: "ส้มยูสุโซดา", category: "โซดา", price: 50, cost: 16 },
  { id: "s7", name: "ส้มมิกซ์โซดา", category: "โซดา", price: 50, cost: 15 },
  { id: "r1", name: "สตรอเบอร์รี่ปั่นโยเกิร์ต", category: "แนะนำ", price: 60, cost: 22 },
  { id: "r2", name: "โกโก้มินท์", category: "แนะนำ", price: 50, cost: 18 },
  { id: "r3", name: "มินท์ลาเต้", category: "แนะนำ", price: 50, cost: 19 },
  { id: "mc1", name: "เพียว มัทฉะ", category: "มัทฉะ", price: 60, cost: 22 },
  { id: "mc2", name: "มัทฉะลาเต้", category: "มัทฉะ", price: 60, cost: 24 },
  { id: "mc3", name: "มัทฉะลาเต้ไซรัป", category: "มัทฉะ", price: 60, cost: 26 },
  { id: "mc4", name: "มัทฉะคาราเมลลาเต้", category: "มัทฉะ", price: 60, cost: 27 },
  { id: "mc5", name: "มัทฉะมะพร้าว", category: "มัทฉะ", price: 60, cost: 25 },
  { id: "b1", name: "ชิอะปัง", category: "ขนม", price: 39, cost: 18 },
  { id: "b2", name: "โตสต์เนยสด+นมข้น", category: "ขนม", price: 29, cost: 12 },
  { id: "b3", name: "โตสต์เนยสด+นูเทลล่า", category: "ขนม", price: 29, cost: 14 },
  { id: "b4", name: "โตสต์เนยสด+นูเทลล่า+กล้วยหอม", category: "ขนม", price: 35, cost: 17 },
];

const DEFAULT_STOCK = [
  { id: "i1", name: "เมล็ดกาแฟ", unit: "กรัม", current: 2000, min: 500, leadTime: 3, costPerUnit: 1.2 },
  { id: "i2", name: "นมสด", unit: "มล.", current: 5000, min: 2000, leadTime: 1, costPerUnit: 0.05 },
  { id: "i3", name: "น้ำตาล", unit: "กรัม", current: 3000, min: 1000, leadTime: 2, costPerUnit: 0.03 },
  { id: "i4", name: "น้ำแข็ง", unit: "กก.", current: 20, min: 5, leadTime: 1, costPerUnit: 8 },
  { id: "i5", name: "ผงมัทฉะ", unit: "กรัม", current: 500, min: 150, leadTime: 7, costPerUnit: 4 },
  { id: "i6", name: "ผงโกโก้", unit: "กรัม", current: 600, min: 200, leadTime: 5, costPerUnit: 2.5 },
  { id: "i7", name: "ผงชาไทย", unit: "กรัม", current: 800, min: 200, leadTime: 3, costPerUnit: 1.8 },
  { id: "i8", name: "ผงชาเขียว", unit: "กรัม", current: 500, min: 150, leadTime: 3, costPerUnit: 2.2 },
  { id: "i9", name: "น้ำผึ้ง", unit: "มล.", current: 1000, min: 300, leadTime: 2, costPerUnit: 0.2 },
  { id: "i10", name: "ไซรัปคาราเมล", unit: "มล.", current: 750, min: 250, leadTime: 5, costPerUnit: 0.3 },
  { id: "i11", name: "ไซรัปสตรอเบอร์รี่", unit: "มล.", current: 500, min: 200, leadTime: 5, costPerUnit: 0.3 },
  { id: "i12", name: "ไซรัปพีช", unit: "มล.", current: 500, min: 200, leadTime: 5, costPerUnit: 0.3 },
  { id: "i13", name: "ไซรัปมินท์", unit: "มล.", current: 400, min: 150, leadTime: 7, costPerUnit: 0.35 },
  { id: "i14", name: "น้ำส้มยูสุ", unit: "มล.", current: 300, min: 100, leadTime: 10, costPerUnit: 1.5 },
  { id: "i15", name: "โยเกิร์ต", unit: "กรัม", current: 1500, min: 500, leadTime: 2, costPerUnit: 0.15 },
  { id: "i16", name: "ขนมปังโฮลวีต", unit: "แผ่น", current: 40, min: 10, leadTime: 1, costPerUnit: 5 },
  { id: "i17", name: "เนยสด", unit: "กรัม", current: 500, min: 150, leadTime: 2, costPerUnit: 0.5 },
  { id: "i18", name: "นมข้นหวาน", unit: "มล.", current: 500, min: 200, leadTime: 2, costPerUnit: 0.08 },
  { id: "i19", name: "นูเทลล่า", unit: "กรัม", current: 800, min: 300, leadTime: 3, costPerUnit: 0.6 },
  { id: "i20", name: "กล้วยหอม", unit: "ลูก", current: 15, min: 5, leadTime: 1, costPerUnit: 8 },
  { id: "i21", name: "โซดา", unit: "มล.", current: 5000, min: 1500, leadTime: 1, costPerUnit: 0.02 },
  { id: "i22", name: "แก้วพลาสติก", unit: "ใบ", current: 300, min: 100, leadTime: 5, costPerUnit: 2 },
  { id: "i23", name: "หลอด", unit: "อัน", current: 500, min: 150, leadTime: 5, costPerUnit: 0.3 },
];

const DEFAULT_RECIPES = {
  m1: [{ id: "i1", amt: 18 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  m2: [{ id: "i1", amt: 18 }, { id: "i9", amt: 15 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  m3: [{ id: "i1", amt: 18 }, { id: "i22", amt: 1 }],
  m6: [{ id: "i1", amt: 18 }, { id: "i2", amt: 150 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  m7: [{ id: "i1", amt: 18 }, { id: "i2", amt: 120 }, { id: "i6", amt: 15 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  m8: [{ id: "i1", amt: 18 }, { id: "i2", amt: 100 }, { id: "i22", amt: 1 }],
  m9: [{ id: "i1", amt: 18 }, { id: "i2", amt: 120 }, { id: "i10", amt: 20 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  m10: [{ id: "i6", amt: 20 }, { id: "i2", amt: 150 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  m11: [{ id: "i7", amt: 15 }, { id: "i2", amt: 100 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  m12: [{ id: "i8", amt: 15 }, { id: "i2", amt: 150 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  mc1: [{ id: "i5", amt: 6 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  mc2: [{ id: "i5", amt: 6 }, { id: "i2", amt: 150 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  mc4: [{ id: "i5", amt: 6 }, { id: "i2", amt: 150 }, { id: "i10", amt: 20 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  r1: [{ id: "i11", amt: 25 }, { id: "i15", amt: 80 }, { id: "i4", amt: 0.3 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  s1: [{ id: "i12", amt: 25 }, { id: "i21", amt: 200 }, { id: "i4", amt: 0.3 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  s4: [{ id: "i13", amt: 20 }, { id: "i21", amt: 200 }, { id: "i4", amt: 0.3 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  s5: [{ id: "i11", amt: 25 }, { id: "i21", amt: 200 }, { id: "i4", amt: 0.3 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  b1: [{ id: "i16", amt: 2 }, { id: "i17", amt: 15 }],
  b2: [{ id: "i16", amt: 2 }, { id: "i17", amt: 15 }, { id: "i18", amt: 20 }],
  b3: [{ id: "i16", amt: 2 }, { id: "i17", amt: 15 }, { id: "i19", amt: 20 }],
  b4: [{ id: "i16", amt: 2 }, { id: "i17", amt: 15 }, { id: "i19", amt: 20 }, { id: "i20", amt: 0.5 }],
};

const SWEETNESS_LEVELS = [0, 25, 50, 100];
const ROAST_LEVELS = [
  { value: "light", label: "คั่วอ่อน", extraPrice: 5 },
  { value: "medium", label: "คั่วกลาง", extraPrice: 0 },
  { value: "dark", label: "คั่วเข้ม", extraPrice: 0 },
];
const ROASTABLE_MENUS = new Set(["m1", "m2", "m4", "m5", "m6"]);
const getRoastLabel = (v) => ROAST_LEVELS.find(r => r.value === v)?.label || "";
const getRoastExtra = (v) => ROAST_LEVELS.find(r => r.value === v)?.extraPrice || 0;

// ========== STORAGE (localStorage) ==========
const KEY_PREFIX = "imissyou_";
const loadData = (key, defaultVal) => {
  try {
    const v = localStorage.getItem(KEY_PREFIX + key);
    return v ? JSON.parse(v) : defaultVal;
  } catch { return defaultVal; }
};
const saveData = (key, val) => {
  try { localStorage.setItem(KEY_PREFIX + key, JSON.stringify(val)); } catch (e) { console.error(e); }
};

// ========== MAIN APP ==========
const DEFAULT_SHOP_INFO = {
  shopName: "I Miss You",
  qrImage: "", // base64 data URL
  qrNote: "สแกนเพื่อชำระเงิน",
  footerNote: "ขอบคุณที่อุดหนุนนะคะ 💛",
};

export default function App() {
  const [tab, setTab] = useState("pos");
  const [menu, setMenu] = useState([]);
  const [stock, setStock] = useState([]);
  const [recipes, setRecipes] = useState({});
  const [sales, setSales] = useState([]);
  const [shopInfo, setShopInfo] = useState(DEFAULT_SHOP_INFO);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setMenu(loadData("menu", DEFAULT_MENU));
    setStock(loadData("stock", DEFAULT_STOCK));
    setRecipes(loadData("recipes", DEFAULT_RECIPES));
    setSales(loadData("sales", []));
    setShopInfo(loadData("shopInfo", DEFAULT_SHOP_INFO));
    setLoading(false);
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div style={{ textAlign: "center" }}>
          <Coffee size={64} style={{ color: "var(--accent)" }} className="animate-pulse" />
          <p style={{ marginTop: 16, fontFamily: "Playfair Display, serif", fontSize: 20 }}>กำลังเปิดร้าน...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <style>{`
        :root {
          --bg: #f4ead5;
          --bg-card: #fef9ee;
          --bg-dark: #3d2817;
          --accent: #d4a056;
          --accent-hot: #e8b86d;
          --brown: #6b4423;
          --brown-light: #8b6340;
          --text: #3d2817;
          --text-muted: #8b6340;
          --neon: #fff5c9;
          --danger: #c65d3a;
          --success: #6b8e4e;
          --border: #d4c3a0;
        }
        .font-serif { font-family: 'Playfair Display', 'Kanit', serif; }
        .font-neon { 
          font-family: 'Dancing Script', 'Kanit', cursive;
          color: var(--neon);
          text-shadow: 0 0 8px var(--accent-hot), 0 0 16px var(--accent), 0 0 24px rgba(232,184,109,0.5);
        }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .card { 
          background: var(--bg-card); 
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(61,40,23,0.06);
        }
        .card-dark {
          background: var(--bg-dark);
          color: var(--neon);
          border-radius: 12px;
        }
        .btn-primary {
          background: var(--brown);
          color: var(--bg-card);
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }
        .btn-primary:hover { background: var(--brown-light); transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .btn-ghost {
          background: transparent;
          color: var(--text);
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .btn-ghost:hover { background: var(--bg-card); border-color: var(--brown); }
        .tab-btn {
          padding: 12px 20px;
          background: transparent;
          border: none;
          color: var(--neon);
          opacity: 0.6;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          transition: all 0.2s;
          border-bottom: 2px solid transparent;
          font-family: inherit;
        }
        .tab-btn.active { opacity: 1; border-bottom-color: var(--accent); }
        .tab-btn:hover { opacity: 0.9; }
        .menu-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
          font-family: inherit;
          color: var(--text);
        }
        .menu-card:hover:not(:disabled) {
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(212,160,86,0.2);
        }
        .menu-card:disabled { opacity: 0.4; cursor: not-allowed; }
        input, select, textarea {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 8px 12px;
          font-family: inherit;
          color: var(--text);
          font-size: 14px;
        }
        input:focus, select:focus { outline: none; border-color: var(--accent); }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid var(--border); }
        th { background: var(--bg); font-weight: 600; font-size: 13px; color: var(--text-muted); }
        .badge {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }
        .badge-ok { background: rgba(107,142,78,0.15); color: var(--success); }
        .badge-warn { background: rgba(232,184,109,0.2); color: #a87028; }
        .badge-danger { background: rgba(198,93,58,0.15); color: var(--danger); }
        .toast {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 20px;
          border-radius: 8px;
          z-index: 1000;
          animation: slideIn 0.3s;
        }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .stars::before {
          content: '✦ ✧ ✦';
          color: var(--accent);
          letter-spacing: 4px;
          opacity: 0.5;
        }
        .grid { display: grid; }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .gap-2 { gap: 8px; } .gap-3 { gap: 12px; } .gap-4 { gap: 16px; } .gap-5 { gap: 20px; }
        .flex { display: flex; }
        .flex-wrap { flex-wrap: wrap; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .space-y-2 > * + * { margin-top: 8px; }
        .space-y-3 > * + * { margin-top: 12px; }
        .space-y-5 > * + * { margin-top: 20px; }
        .mb-2 { margin-bottom: 8px; } .mb-3 { margin-bottom: 12px; } .mb-4 { margin-bottom: 16px; }
        .p-4 { padding: 16px; } .p-5 { padding: 20px; } .p-6 { padding: 24px; } .p-8 { padding: 32px; }
        .w-full { width: 100%; }
        .text-center { text-align: center; }
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .md\\:col-span-2 { grid-column: span 2 / span 2; }
        }
        @media (min-width: 1024px) {
          .lg\\:col-span-2 { grid-column: span 2 / span 2; }
          .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
      `}</style>

      <header className="card-dark" style={{ borderRadius: 0, borderBottom: "3px solid var(--accent)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="stars mb-2"></div>
            <h1 className="font-neon" style={{ fontSize: 38, lineHeight: 1, margin: 0 }}>I Miss You</h1>
            <p style={{ fontSize: 11, marginTop: 4, opacity: 0.7, margin: "4px 0 0 0" }}>ระบบจัดการร้าน • POS & Stock</p>
          </div>
          <nav className="flex gap-2 flex-wrap">
            {[
              { k: "pos", label: "ขาย", icon: ShoppingCart },
              { k: "stock", label: "สต๊อก", icon: Package },
              { k: "recipe", label: "สูตร", icon: ChefHat },
              { k: "report", label: "รายงาน", icon: BarChart3 },
              { k: "settings", label: "ตั้งค่า", icon: Settings },
            ].map(({ k, label, icon: Icon }) => (
              <button key={k} onClick={() => setTab(k)} className={`tab-btn ${tab === k ? "active" : ""}`}>
                <Icon size={18} /> {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "24px" }}>
        {tab === "pos" && <POSView menu={menu} stock={stock} recipes={recipes} setStock={setStock} sales={sales} setSales={setSales} shopInfo={shopInfo} showToast={showToast} />}
        {tab === "stock" && <StockView stock={stock} setStock={setStock} showToast={showToast} />}
        {tab === "recipe" && <RecipeView menu={menu} stock={stock} recipes={recipes} setRecipes={setRecipes} showToast={showToast} />}
        {tab === "report" && <ReportView sales={sales} menu={menu} />}
        {tab === "settings" && <SettingsView menu={menu} setMenu={setMenu} sales={sales} setSales={setSales} shopInfo={shopInfo} setShopInfo={setShopInfo} showToast={showToast} />}
      </main>

      {toast && (
        <div className={`toast ${toast.type === "error" ? "badge-danger" : "badge-ok"}`} style={{ fontSize: 15, padding: "14px 22px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

function POSView({ menu, stock, recipes, setStock, sales, setSales, shopInfo, showToast }) {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("ทั้งหมด");
  const [receipt, setReceipt] = useState(null);

  const categories = ["ทั้งหมด", ...new Set(menu.map(m => m.category))];
  const filteredMenu = category === "ทั้งหมด" ? menu : menu.filter(m => m.category === category);

  const canMake = (menuId, qty = 1) => {
    const recipe = recipes[menuId];
    if (!recipe || recipe.length === 0) return true;
    return recipe.every(r => {
      const item = stock.find(s => s.id === r.id);
      return item && item.current >= r.amt * qty;
    });
  };

  const addToCart = (item) => {
    if (!canMake(item.id, 1)) {
      showToast(`วัตถุดิบไม่พอสำหรับ "${item.name}"`, "error");
      return;
    }
    const hasRoast = ROASTABLE_MENUS.has(item.id);
    const defaultRoast = hasRoast ? "medium" : null;
    const existing = cart.find(c => c.id === item.id && c.blended === false && c.roast === defaultRoast);
    if (existing) {
      setCart(cart.map(c => c.id === item.id && !c.blended && c.roast === defaultRoast ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1, sweetness: 100, blended: false, roast: defaultRoast, cartKey: Date.now() + Math.random() }]);
    }
  };

  const updateCartItem = (key, updates) => setCart(cart.map(c => c.cartKey === key ? { ...c, ...updates } : c));
  const removeFromCart = (key) => setCart(cart.filter(c => c.cartKey !== key));
  const calcLinePrice = (c) => (c.price + (c.blended ? 10 : 0) + getRoastExtra(c.roast)) * c.qty;
  const subtotal = cart.reduce((sum, c) => sum + calcLinePrice(c), 0);

  const checkout = () => {
    if (cart.length === 0) return;
    const newStock = [...stock];
    for (const item of cart) {
      const recipe = recipes[item.id] || [];
      for (const r of recipe) {
        const idx = newStock.findIndex(s => s.id === r.id);
        if (idx >= 0) newStock[idx] = { ...newStock[idx], current: Math.max(0, newStock[idx].current - r.amt * item.qty) };
      }
    }
    setStock(newStock);
    saveData("stock", newStock);

    const sale = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      items: cart.map(c => ({
        id: c.id, name: c.name, price: c.price, cost: c.cost, qty: c.qty,
        sweetness: c.sweetness, blended: c.blended, roast: c.roast || null,
        lineTotal: calcLinePrice(c),
        lineCost: c.cost * c.qty,
      })),
      total: subtotal,
      totalCost: cart.reduce((s, c) => s + c.cost * c.qty, 0),
      profit: subtotal - cart.reduce((s, c) => s + c.cost * c.qty, 0),
    };
    const newSales = [sale, ...sales];
    setSales(newSales);
    saveData("sales", newSales);
    setReceipt(sale);
    setCart([]);
    showToast(`ขายเสร็จ! ยอด ฿${subtotal}`);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-5" style={{ gridTemplateColumns: "1fr" }}>
      <div className="lg:col-span-2">
        <div className="flex gap-2 mb-4 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={category === c ? "btn-primary" : "btn-ghost"} style={{ fontSize: 14 }}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filteredMenu.map(m => {
            const available = canMake(m.id);
            return (
              <button key={m.id} onClick={() => addToCart(m)} disabled={!available} className="menu-card">
                <div className="flex items-center justify-between mb-2">
                  <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3 }}>{m.name}</div>
                  {!available && <AlertTriangle size={14} style={{ color: "var(--danger)" }} />}
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{m.category}</span>
                  <span className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: "var(--brown)" }}>฿{m.price}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="card p-5" style={{ position: "sticky", top: 20, alignSelf: "start", maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>
        <h3 className="font-serif flex items-center gap-2" style={{ fontSize: 22, marginBottom: 16 }}>
          <ShoppingCart size={22} /> ตะกร้า ({cart.length})
        </h3>
        {cart.length === 0 ? (
          <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "30px 0" }}>คลิกเมนูที่ต้องการเพื่อเพิ่ม</p>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              {cart.map(c => (
                <div key={c.cartKey} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
                  <div className="flex items-center justify-between mb-2">
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{c.name}</div>
                    <button onClick={() => removeFromCart(c.cartKey)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger)" }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <button className="btn-ghost" style={{ padding: "2px 8px" }} onClick={() => c.qty > 1 && updateCartItem(c.cartKey, { qty: c.qty - 1 })}>
                      <Minus size={12} />
                    </button>
                    <span style={{ fontWeight: 500, minWidth: 24, textAlign: "center" }}>{c.qty}</span>
                    <button className="btn-ghost" style={{ padding: "2px 8px" }} onClick={() => updateCartItem(c.cartKey, { qty: c.qty + 1 })}>
                      <Plus size={12} />
                    </button>
                    <span style={{ marginLeft: "auto", fontWeight: 600 }}>฿{calcLinePrice(c)}</span>
                  </div>
                  <div className="flex gap-3 flex-wrap" style={{ fontSize: 12 }}>
                    <label>หวาน:&nbsp;
                      <select value={c.sweetness} onChange={e => updateCartItem(c.cartKey, { sweetness: +e.target.value })} style={{ padding: "2px 6px", fontSize: 12 }}>
                        {SWEETNESS_LEVELS.map(s => <option key={s} value={s}>{s}%</option>)}
                      </select>
                    </label>
                    {c.roast && (
                      <label>คั่ว:&nbsp;
                        <select value={c.roast} onChange={e => updateCartItem(c.cartKey, { roast: e.target.value })} style={{ padding: "2px 6px", fontSize: 12 }}>
                          {ROAST_LEVELS.map(r => (
                            <option key={r.value} value={r.value}>
                              {r.label}{r.extraPrice > 0 ? ` +${r.extraPrice}` : ""}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                    <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <input type="checkbox" checked={c.blended} onChange={e => updateCartItem(c.cartKey, { blended: e.target.checked })} />
                      ปั่น (+10)
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-4" style={{ fontSize: 20, fontWeight: 600, paddingTop: 12, borderTop: "2px solid var(--brown)" }}>
              <span>รวม</span>
              <span className="font-serif" style={{ color: "var(--brown)" }}>฿{subtotal}</span>
            </div>
            <button onClick={checkout} className="btn-primary w-full" style={{ fontSize: 16, padding: "14px" }}>
              <Check size={18} style={{ display: "inline", marginRight: 8, verticalAlign: "middle" }} />
              ชำระเงิน
            </button>
          </>
        )}
      </div>

      {receipt && <ReceiptModal receipt={receipt} shopInfo={shopInfo} onClose={() => setReceipt(null)} />}
    </div>
  );
}

function ReceiptModal({ receipt, shopInfo, onClose }) {
  const print = () => window.print();
  const hasQR = shopInfo?.qrImage && shopInfo.qrImage.length > 0;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(61,40,23,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, overflowY: "auto" }}>
      <div className="card p-6" style={{ maxWidth: 360, width: "100%", maxHeight: "95vh", overflowY: "auto" }} id="receipt">
        <div className="text-center mb-4">
          <div className="stars mb-2"></div>
          <h2 className="font-neon" style={{ fontSize: 32, color: "var(--brown)", textShadow: "0 0 4px rgba(212,160,86,0.4)", margin: 0 }}>{shopInfo?.shopName || "I Miss You"}</h2>
          <p style={{ fontSize: 11, color: "var(--text-muted)", margin: "8px 0 0 0" }}>{new Date(receipt.timestamp).toLocaleString("th-TH")}</p>
          <p style={{ fontSize: 10, color: "var(--text-muted)", margin: "2px 0 0 0" }}>#{receipt.id.slice(-6)}</p>
        </div>
        <div style={{ borderTop: "1px dashed var(--border)", borderBottom: "1px dashed var(--border)", padding: "12px 0", marginBottom: 12 }}>
          {receipt.items.map((it, i) => (
            <div key={i} style={{ fontSize: 13, marginBottom: 6 }}>
              <div className="flex justify-between">
                <span>{it.name} x{it.qty}</span>
                <span>฿{it.lineTotal}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", paddingLeft: 8 }}>
                หวาน {it.sweetness}%{it.roast ? ` • ${getRoastLabel(it.roast)}` : ""}{it.blended ? " • ปั่น +10" : ""}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
          <span>รวม</span>
          <span style={{ color: "var(--brown)" }}>฿{receipt.total}</span>
        </div>
        {hasQR && (
          <div style={{ borderTop: "1px dashed var(--border)", paddingTop: 12, marginBottom: 12, textAlign: "center" }}>
            <p style={{ fontSize: 12, fontWeight: 500, margin: "0 0 8px 0", color: "var(--brown)" }}>
              {shopInfo.qrNote || "สแกนเพื่อชำระเงิน"}
            </p>
            <img src={shopInfo.qrImage} alt="PromptPay QR"
              style={{ width: 180, height: 180, objectFit: "contain", borderRadius: 6, border: "1px solid var(--border)" }} />
            <p style={{ fontSize: 10, color: "var(--text-muted)", margin: "6px 0 0 0" }}>
              ยอด ฿{receipt.total} (กรอกยอดในแอปธนาคาร)
            </p>
          </div>
        )}
        <p className="text-center" style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 16 }}>
          {shopInfo?.footerNote || "ขอบคุณที่อุดหนุนนะคะ 💛"}
        </p>
        <div className="flex gap-2 no-print">
          <button onClick={print} className="btn-primary" style={{ flex: 1 }}>
            <Printer size={16} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
            พิมพ์
          </button>
          <button onClick={onClose} className="btn-ghost" style={{ flex: 1 }}>ปิด</button>
        </div>
      </div>
      <style>{`@media print { body * { visibility: hidden; } #receipt, #receipt * { visibility: visible; } #receipt { position: absolute; left: 0; top: 0; width: 100%; max-height: none !important; overflow: visible !important; } .no-print { display: none !important; } }`}</style>
    </div>
  );
}

function StockView({ stock, setStock, showToast }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", unit: "กรัม", current: 0, min: 0, leadTime: 1, costPerUnit: 0 });

  const getStatus = (s) => {
    if (s.current <= 0) return { label: "หมด", cls: "badge-danger" };
    if (s.current <= s.min) return { label: "ต้องสั่งด่วน", cls: "badge-danger" };
    if (s.current <= s.min * 1.5) return { label: "ใกล้หมด", cls: "badge-warn" };
    return { label: "ปกติ", cls: "badge-ok" };
  };

  const needOrder = stock.filter(s => s.current <= s.min * 1.5).sort((a, b) => a.current / a.min - b.current / b.min);

  const saveEdit = () => {
    const newStock = stock.map(s => s.id === editing.id ? editing : s);
    setStock(newStock);
    saveData("stock", newStock);
    setEditing(null);
    showToast("บันทึกแล้ว");
  };

  const addItem = () => {
    if (!newItem.name) return;
    const item = { ...newItem, id: "i" + Date.now(), current: +newItem.current, min: +newItem.min, leadTime: +newItem.leadTime, costPerUnit: +newItem.costPerUnit };
    const newStock = [...stock, item];
    setStock(newStock);
    saveData("stock", newStock);
    setAdding(false);
    setNewItem({ name: "", unit: "กรัม", current: 0, min: 0, leadTime: 1, costPerUnit: 0 });
    showToast("เพิ่มวัตถุดิบแล้ว");
  };

  const deleteItem = (id) => {
    if (!confirm("ลบวัตถุดิบนี้?")) return;
    const newStock = stock.filter(s => s.id !== id);
    setStock(newStock);
    saveData("stock", newStock);
    showToast("ลบแล้ว");
  };

  return (
    <div className="space-y-5">
      {needOrder.length > 0 && (
        <div className="card p-5" style={{ borderLeft: "4px solid var(--danger)" }}>
          <h3 className="flex items-center gap-2 font-serif mb-3" style={{ fontSize: 20, margin: "0 0 12px 0" }}>
            <AlertTriangle style={{ color: "var(--danger)" }} /> ต้องสั่งของเพิ่ม ({needOrder.length} รายการ)
          </h3>
          <div className="grid md:grid-cols-2 gap-2" style={{ gridTemplateColumns: "1fr" }}>
            {needOrder.map(s => (
              <div key={s.id} className="flex justify-between items-center" style={{ background: "var(--bg)", borderRadius: 6, padding: 8 }}>
                <div>
                  <div style={{ fontWeight: 500 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>เหลือ {s.current} {s.unit} • ส่งของ {s.leadTime} วัน</div>
                </div>
                <span className={`badge ${getStatus(s).cls}`}>{getStatus(s).label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card p-5">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h3 className="font-serif" style={{ fontSize: 22, margin: 0 }}>วัตถุดิบทั้งหมด ({stock.length})</h3>
          <button onClick={() => setAdding(true)} className="btn-primary">
            <Plus size={16} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
            เพิ่มวัตถุดิบ
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr><th>วัตถุดิบ</th><th>คงเหลือ</th><th>ขั้นต่ำ</th><th>lead time</th><th>ราคา/หน่วย</th><th>สถานะ</th><th></th></tr>
            </thead>
            <tbody>
              {stock.map(s => {
                const st = getStatus(s);
                return (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 500 }}>{s.name}</td>
                    <td>{s.current.toLocaleString()} {s.unit}</td>
                    <td style={{ color: "var(--text-muted)" }}>{s.min} {s.unit}</td>
                    <td style={{ color: "var(--text-muted)" }}>{s.leadTime} วัน</td>
                    <td style={{ color: "var(--text-muted)" }}>฿{s.costPerUnit}</td>
                    <td><span className={`badge ${st.cls}`}>{st.label}</span></td>
                    <td>
                      <button onClick={() => setEditing(s)} className="btn-ghost" style={{ padding: "4px 10px", fontSize: 12 }}>แก้</button>
                      <button onClick={() => deleteItem(s.id)} className="btn-ghost" style={{ padding: "4px 10px", fontSize: 12, marginLeft: 4, color: "var(--danger)" }}>ลบ</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <Modal onClose={() => setEditing(null)} title={`แก้ไข: ${editing.name}`}>
          <div className="space-y-3">
            <div><label style={{ fontSize: 13, color: "var(--text-muted)" }}>ชื่อ</label>
              <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} style={{ width: "100%" }} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label style={{ fontSize: 13, color: "var(--text-muted)" }}>คงเหลือ</label>
                <input type="number" value={editing.current} onChange={e => setEditing({ ...editing, current: +e.target.value })} style={{ width: "100%" }} /></div>
              <div><label style={{ fontSize: 13, color: "var(--text-muted)" }}>หน่วย</label>
                <input value={editing.unit} onChange={e => setEditing({ ...editing, unit: e.target.value })} style={{ width: "100%" }} /></div>
              <div><label style={{ fontSize: 13, color: "var(--text-muted)" }}>ขั้นต่ำ</label>
                <input type="number" value={editing.min} onChange={e => setEditing({ ...editing, min: +e.target.value })} style={{ width: "100%" }} /></div>
              <div><label style={{ fontSize: 13, color: "var(--text-muted)" }}>Lead Time (วัน)</label>
                <input type="number" value={editing.leadTime} onChange={e => setEditing({ ...editing, leadTime: +e.target.value })} style={{ width: "100%" }} /></div>
              <div style={{ gridColumn: "span 2" }}><label style={{ fontSize: 13, color: "var(--text-muted)" }}>ต้นทุน/หน่วย (฿)</label>
                <input type="number" step="0.01" value={editing.costPerUnit} onChange={e => setEditing({ ...editing, costPerUnit: +e.target.value })} style={{ width: "100%" }} /></div>
            </div>
            <button onClick={saveEdit} className="btn-primary w-full">บันทึก</button>
          </div>
        </Modal>
      )}

      {adding && (
        <Modal onClose={() => setAdding(false)} title="เพิ่มวัตถุดิบใหม่">
          <div className="space-y-3">
            <input placeholder="ชื่อวัตถุดิบ" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} style={{ width: "100%" }} />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="คงเหลือ" value={newItem.current} onChange={e => setNewItem({ ...newItem, current: e.target.value })} style={{ width: "100%" }} />
              <input placeholder="หน่วย" value={newItem.unit} onChange={e => setNewItem({ ...newItem, unit: e.target.value })} style={{ width: "100%" }} />
              <input type="number" placeholder="ขั้นต่ำ" value={newItem.min} onChange={e => setNewItem({ ...newItem, min: e.target.value })} style={{ width: "100%" }} />
              <input type="number" placeholder="Lead time (วัน)" value={newItem.leadTime} onChange={e => setNewItem({ ...newItem, leadTime: e.target.value })} style={{ width: "100%" }} />
            </div>
            <input type="number" step="0.01" placeholder="ต้นทุน/หน่วย" value={newItem.costPerUnit} onChange={e => setNewItem({ ...newItem, costPerUnit: e.target.value })} style={{ width: "100%" }} />
            <button onClick={addItem} className="btn-primary w-full">เพิ่ม</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function RecipeView({ menu, stock, recipes, setRecipes, showToast }) {
  const [selected, setSelected] = useState(menu[0]?.id);
  const [category, setCategory] = useState("ทั้งหมด");
  const categories = ["ทั้งหมด", ...new Set(menu.map(m => m.category))];
  const filteredMenu = category === "ทั้งหมด" ? menu : menu.filter(m => m.category === category);

  const currentRecipe = recipes[selected] || [];
  const menuItem = menu.find(m => m.id === selected);

  const addIngredient = () => {
    const avail = stock.find(s => !currentRecipe.find(r => r.id === s.id));
    if (!avail) return;
    setRecipes({ ...recipes, [selected]: [...currentRecipe, { id: avail.id, amt: 1 }] });
  };

  const updateIngredient = (idx, updates) => {
    const newRecipe = [...currentRecipe];
    newRecipe[idx] = { ...newRecipe[idx], ...updates };
    setRecipes({ ...recipes, [selected]: newRecipe });
  };

  const removeIngredient = (idx) => setRecipes({ ...recipes, [selected]: currentRecipe.filter((_, i) => i !== idx) });

  const save = () => {
    saveData("recipes", recipes);
    showToast("บันทึกสูตรแล้ว");
  };

  const calcCost = () => currentRecipe.reduce((sum, r) => {
    const item = stock.find(s => s.id === r.id);
    return sum + (item ? item.costPerUnit * r.amt : 0);
  }, 0);

  const realCost = calcCost();
  const profit = menuItem ? menuItem.price - realCost : 0;
  const margin = menuItem ? (profit / menuItem.price * 100).toFixed(0) : 0;

  return (
    <div className="grid md:grid-cols-3 gap-5" style={{ gridTemplateColumns: "1fr" }}>
      <div className="card p-4">
        <h3 className="font-serif mb-3" style={{ fontSize: 18, margin: "0 0 12px 0" }}>เลือกเมนู</h3>
        <div className="flex gap-2 mb-3 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={category === c ? "btn-primary" : "btn-ghost"} style={{ fontSize: 12, padding: "4px 10px" }}>{c}</button>
          ))}
        </div>
        <div style={{ maxHeight: 500, overflowY: "auto" }}>
          {filteredMenu.map(m => (
            <button key={m.id} onClick={() => setSelected(m.id)} className="menu-card" style={{ width: "100%", marginBottom: 6, borderColor: selected === m.id ? "var(--accent)" : "var(--border)", background: selected === m.id ? "var(--bg)" : "var(--bg-card)" }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{m.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>฿{m.price} • {(recipes[m.id] || []).length} วัตถุดิบ</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card p-5 md:col-span-2">
        {menuItem ? (
          <>
            <div className="mb-4">
              <h3 className="font-serif" style={{ fontSize: 24, margin: 0 }}>{menuItem.name}</h3>
              <div className="flex gap-4 flex-wrap" style={{ fontSize: 13, marginTop: 8 }}>
                <div>ราคาขาย: <strong>฿{menuItem.price}</strong></div>
                <div>ต้นทุนจริง: <strong style={{ color: "var(--brown)" }}>฿{realCost.toFixed(2)}</strong></div>
                <div>กำไร: <strong style={{ color: "var(--success)" }}>฿{profit.toFixed(2)} ({margin}%)</strong></div>
              </div>
            </div>

            <h4 style={{ fontWeight: 600, marginBottom: 10 }}>วัตถุดิบที่ใช้</h4>
            {currentRecipe.length === 0 && (
              <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 12 }}>ยังไม่มีสูตร — คลิก "เพิ่มวัตถุดิบ" เพื่อเริ่ม</p>
            )}
            <div className="space-y-2 mb-4">
              {currentRecipe.map((r, idx) => {
                const item = stock.find(s => s.id === r.id);
                return (
                  <div key={idx} className="flex gap-2 items-center" style={{ background: "var(--bg)", padding: 8, borderRadius: 6 }}>
                    <select value={r.id} onChange={e => updateIngredient(idx, { id: e.target.value })} style={{ flex: 1 }}>
                      {stock.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    <input type="number" step="0.1" value={r.amt} onChange={e => updateIngredient(idx, { amt: +e.target.value })} style={{ width: 80 }} />
                    <span style={{ fontSize: 13, color: "var(--text-muted)", minWidth: 40 }}>{item?.unit}</span>
                    <button onClick={() => removeIngredient(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger)" }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2">
              <button onClick={addIngredient} className="btn-ghost">
                <Plus size={14} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                เพิ่มวัตถุดิบ
              </button>
              <button onClick={save} className="btn-primary">บันทึกสูตร</button>
            </div>
          </>
        ) : <p>เลือกเมนูจากซ้าย</p>}
      </div>
    </div>
  );
}

function ReportView({ sales, menu }) {
  const [period, setPeriod] = useState("today");

  const analysis = useMemo(() => {
    const now = new Date();
    const startOfDay = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
    const daysAgo = n => { const x = new Date(); x.setDate(x.getDate() - n); return startOfDay(x); };

    let filtered = sales;
    if (period === "today") filtered = sales.filter(s => new Date(s.timestamp) >= startOfDay(now));
    else if (period === "7days") filtered = sales.filter(s => new Date(s.timestamp) >= daysAgo(7));
    else if (period === "30days") filtered = sales.filter(s => new Date(s.timestamp) >= daysAgo(30));

    const totalRevenue = filtered.reduce((s, t) => s + t.total, 0);
    const totalCost = filtered.reduce((s, t) => s + t.totalCost, 0);
    const totalProfit = filtered.reduce((s, t) => s + t.profit, 0);
    const orderCount = filtered.length;

    const menuSales = {};
    filtered.forEach(sale => {
      sale.items.forEach(it => {
        if (!menuSales[it.id]) menuSales[it.id] = { name: it.name, qty: 0, revenue: 0, profit: 0 };
        menuSales[it.id].qty += it.qty;
        menuSales[it.id].revenue += it.lineTotal;
        menuSales[it.id].profit += it.lineTotal - it.lineCost;
      });
    });
    const topByQty = Object.values(menuSales).sort((a, b) => b.qty - a.qty).slice(0, 10);
    const topByProfit = Object.values(menuSales).sort((a, b) => b.profit - a.profit).slice(0, 10);

    const daily = {};
    sales.filter(s => new Date(s.timestamp) >= daysAgo(30)).forEach(s => {
      const d = s.timestamp.slice(0, 10);
      if (!daily[d]) daily[d] = { date: d, revenue: 0, profit: 0, orders: 0 };
      daily[d].revenue += s.total;
      daily[d].profit += s.profit;
      daily[d].orders += 1;
    });
    const dailyArr = Object.values(daily).sort((a, b) => a.date.localeCompare(b.date));

    const dayOfMonth = {};
    sales.forEach(s => {
      const day = new Date(s.timestamp).getDate();
      if (!dayOfMonth[day]) dayOfMonth[day] = { day, revenue: 0, orders: 0 };
      dayOfMonth[day].revenue += s.total;
      dayOfMonth[day].orders += 1;
    });
    const monthsInData = new Set(sales.map(s => s.timestamp.slice(0, 7))).size || 1;
    const dayOfMonthArr = Object.values(dayOfMonth).map(d => ({ ...d, avgRevenue: d.revenue / monthsInData, avgOrders: d.orders / monthsInData })).sort((a, b) => a.day - b.day);

    const dayOfWeek = [0, 0, 0, 0, 0, 0, 0].map((_, i) => ({ day: i, revenue: 0, orders: 0 }));
    sales.forEach(s => {
      const d = new Date(s.timestamp).getDay();
      dayOfWeek[d].revenue += s.total;
      dayOfWeek[d].orders += 1;
    });

    const forecast = [];
    for (let i = 1; i <= 2; i++) {
      const target = new Date();
      target.setDate(target.getDate() + i);
      const targetDay = target.getDate();
      const targetDow = target.getDay();
      const dom = dayOfMonth[targetDay];
      const dow = dayOfWeek[targetDow];
      const weeksInData = Math.max(1, Math.floor(sales.length / 7));
      const avgByDow = dow.orders / weeksInData;
      const avgByDom = dom ? dom.orders / monthsInData : 0;
      const predictedOrders = ((avgByDow + avgByDom) / 2) || 0;
      const avgTicket = sales.length > 0 ? sales.reduce((s, x) => s + x.total, 0) / sales.length : 0;
      forecast.push({
        date: target.toISOString().slice(0, 10),
        dayName: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"][targetDow],
        predictedOrders: Math.round(predictedOrders),
        predictedRevenue: Math.round(predictedOrders * avgTicket),
      });
    }

    return { totalRevenue, totalCost, totalProfit, orderCount, topByQty, topByProfit, dailyArr, dayOfMonthArr, dayOfWeek, forecast };
  }, [sales, period]);

  if (sales.length === 0) {
    return (
      <div className="card p-8 text-center">
        <Coffee size={48} style={{ color: "var(--text-muted)", margin: "0 auto 16px" }} />
        <p style={{ color: "var(--text-muted)" }}>ยังไม่มีข้อมูลการขาย — เริ่มขายเมนูแรกเพื่อดูรายงาน</p>
      </div>
    );
  }

  const maxDaily = Math.max(...analysis.dailyArr.map(d => d.revenue), 1);
  const maxDom = Math.max(...analysis.dayOfMonthArr.map(d => d.avgRevenue), 1);

  return (
    <div className="space-y-5">
      <div className="flex gap-2 flex-wrap">
        {[{ k: "today", label: "วันนี้" }, { k: "7days", label: "7 วัน" }, { k: "30days", label: "30 วัน" }, { k: "all", label: "ทั้งหมด" }].map(p => (
          <button key={p.k} onClick={() => setPeriod(p.k)} className={period === p.k ? "btn-primary" : "btn-ghost"}>{p.label}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="ยอดขาย" value={`฿${analysis.totalRevenue.toLocaleString()}`} icon={TrendingUp} />
        <KPI label="กำไร" value={`฿${analysis.totalProfit.toLocaleString()}`} icon={Sparkles} color="success" />
        <KPI label="ต้นทุน" value={`฿${analysis.totalCost.toLocaleString()}`} icon={Package} color="muted" />
        <KPI label="จำนวนบิล" value={analysis.orderCount} icon={ShoppingCart} />
      </div>

      <div className="card-dark p-5">
        <h3 className="font-serif flex items-center gap-2 mb-3" style={{ fontSize: 20, color: "var(--neon)", margin: "0 0 12px 0" }}>
          <Sparkles size={20} /> ทำนายยอดขาย 2 วันข้างหน้า
        </h3>
        <div className="grid md:grid-cols-2 gap-4" style={{ gridTemplateColumns: "1fr" }}>
          {analysis.forecast.map(f => (
            <div key={f.date} style={{ background: "rgba(255,245,201,0.08)", padding: 16, borderRadius: 8, border: "1px solid rgba(212,160,86,0.3)" }}>
              <div style={{ fontSize: 13, opacity: 0.7 }}>วัน{f.dayName} • {new Date(f.date).toLocaleDateString("th-TH")}</div>
              <div className="font-serif" style={{ fontSize: 28, color: "var(--accent-hot)", marginTop: 8 }}>~{f.predictedOrders} บิล</div>
              <div style={{ fontSize: 14, opacity: 0.85 }}>คาดรายได้ ฿{f.predictedRevenue.toLocaleString()}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, opacity: 0.6, marginTop: 10 }}>* คาดการณ์จาก pattern วันในสัปดาห์ + วันในเดือน (ยิ่งมีข้อมูลเยอะ ยิ่งแม่นขึ้น)</p>
      </div>

      {analysis.dailyArr.length > 0 && (
        <div className="card p-5">
          <h3 className="font-serif mb-3" style={{ fontSize: 20, margin: "0 0 12px 0" }}>ยอดขายรายวัน (30 วันล่าสุด)</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 180, paddingTop: 20 }}>
            {analysis.dailyArr.map(d => (
              <div key={d.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", minWidth: 20 }}>
                <div style={{ fontSize: 10, marginBottom: 4, color: "var(--text-muted)" }}>฿{d.revenue > 999 ? (d.revenue / 1000).toFixed(1) + "k" : d.revenue}</div>
                <div style={{ width: "80%", background: "linear-gradient(to top, var(--brown), var(--accent))", height: `${(d.revenue / maxDaily) * 100}%`, borderRadius: "4px 4px 0 0", minHeight: 2, transition: "height 0.3s" }} title={`${d.date}: ฿${d.revenue}`}></div>
                <div style={{ fontSize: 9, marginTop: 4, color: "var(--text-muted)" }}>{d.date.slice(8)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card p-5">
        <h3 className="font-serif mb-3" style={{ fontSize: 20, margin: "0 0 12px 0" }}>
          <Calendar size={20} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
          Pattern วันในเดือน (เฉลี่ย)
        </h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 100 }}>
          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
            const d = analysis.dayOfMonthArr.find(x => x.day === day);
            const val = d?.avgRevenue || 0;
            return (
              <div key={day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "80%", background: val > 0 ? "var(--accent)" : "var(--border)", height: `${(val / maxDom) * 100}%`, borderRadius: "2px 2px 0 0", minHeight: 2 }} title={`วันที่ ${day}: ฿${Math.round(val)}`}></div>
                <div style={{ fontSize: 8, marginTop: 2, color: "var(--text-muted)" }}>{day}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5" style={{ gridTemplateColumns: "1fr" }}>
        <div className="card p-5">
          <h3 className="font-serif mb-3" style={{ fontSize: 18, margin: "0 0 12px 0" }}>🏆 เมนูขายดี (จำนวน)</h3>
          {analysis.topByQty.length === 0 ? <p style={{ color: "var(--text-muted)" }}>ยังไม่มี</p> :
            <table><tbody>
              {analysis.topByQty.map((m, i) => (
                <tr key={m.name}>
                  <td style={{ width: 30, color: "var(--text-muted)" }}>{i + 1}</td>
                  <td>{m.name}</td>
                  <td style={{ textAlign: "right", fontWeight: 500 }}>{m.qty}</td>
                  <td style={{ textAlign: "right", color: "var(--text-muted)", fontSize: 12 }}>฿{m.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody></table>}
        </div>
        <div className="card p-5">
          <h3 className="font-serif mb-3" style={{ fontSize: 18, margin: "0 0 12px 0" }}>💰 เมนูกำไรเยอะ</h3>
          {analysis.topByProfit.length === 0 ? <p style={{ color: "var(--text-muted)" }}>ยังไม่มี</p> :
            <table><tbody>
              {analysis.topByProfit.map((m, i) => (
                <tr key={m.name}>
                  <td style={{ width: 30, color: "var(--text-muted)" }}>{i + 1}</td>
                  <td>{m.name}</td>
                  <td style={{ textAlign: "right", color: "var(--success)", fontWeight: 500 }}>฿{Math.round(m.profit).toLocaleString()}</td>
                </tr>
              ))}
            </tbody></table>}
        </div>
      </div>
    </div>
  );
}

function KPI({ label, value, icon: Icon, color = "brown" }) {
  const colors = { brown: "var(--brown)", success: "var(--success)", muted: "var(--text-muted)" };
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{label}</span>
        <Icon size={18} style={{ color: colors[color] }} />
      </div>
      <div className="font-serif" style={{ fontSize: 24, fontWeight: 600, color: colors[color] }}>{value}</div>
    </div>
  );
}

function SettingsView({ menu, setMenu, sales, setSales, shopInfo, setShopInfo, showToast }) {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [newM, setNewM] = useState({ name: "", category: "กาแฟสด", price: 50, cost: 15 });
  const [shopDraft, setShopDraft] = useState(shopInfo);

  useEffect(() => { setShopDraft(shopInfo); }, [shopInfo]);

  const handleQRUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast("รูปใหญ่เกินไป (เกิน 2MB) กรุณาเลือกรูปเล็กลง", "error");
      return;
    }
    if (!file.type.startsWith("image/")) {
      showToast("กรุณาเลือกไฟล์รูปภาพ", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      setShopDraft({ ...shopDraft, qrImage: evt.target.result });
    };
    reader.readAsDataURL(file);
  };

  const removeQR = () => setShopDraft({ ...shopDraft, qrImage: "" });

  const saveShopInfo = () => {
    setShopInfo(shopDraft);
    saveData("shopInfo", shopDraft);
    showToast("บันทึกข้อมูลร้านแล้ว");
  };

  const addMenu = () => {
    if (!newM.name) return;
    const item = { ...newM, id: "m" + Date.now(), price: +newM.price, cost: +newM.cost };
    const nm = [...menu, item];
    setMenu(nm);
    saveData("menu", nm);
    setAdding(false);
    setNewM({ name: "", category: "กาแฟสด", price: 50, cost: 15 });
    showToast("เพิ่มเมนูแล้ว");
  };

  const saveEdit = () => {
    const nm = menu.map(m => m.id === editing.id ? editing : m);
    setMenu(nm);
    saveData("menu", nm);
    setEditing(null);
    showToast("บันทึกแล้ว");
  };

  const deleteMenu = (id) => {
    if (!confirm("ลบเมนูนี้?")) return;
    const nm = menu.filter(m => m.id !== id);
    setMenu(nm);
    saveData("menu", nm);
    showToast("ลบแล้ว");
  };

  const exportData = () => {
    const data = {
      menu: loadData("menu", []),
      stock: loadData("stock", []),
      recipes: loadData("recipes", {}),
      sales: loadData("sales", []),
      shopInfo: loadData("shopInfo", DEFAULT_SHOP_INFO),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `imissyou-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("ดาวน์โหลดแล้ว");
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (data.menu) { setMenu(data.menu); saveData("menu", data.menu); }
        if (data.stock) saveData("stock", data.stock);
        if (data.recipes) saveData("recipes", data.recipes);
        if (data.sales) { setSales(data.sales); saveData("sales", data.sales); }
        if (data.shopInfo) { setShopInfo(data.shopInfo); saveData("shopInfo", data.shopInfo); }
        showToast("นำเข้าสำเร็จ! กรุณารีเฟรช");
      } catch { showToast("ไฟล์ไม่ถูกต้อง", "error"); }
    };
    reader.readAsText(file);
  };

  const clearSales = () => {
    if (!confirm("ล้างข้อมูลการขายทั้งหมด? (ยกเลิกไม่ได้)")) return;
    setSales([]);
    saveData("sales", []);
    showToast("ล้างแล้ว");
  };

  return (
    <div className="space-y-5">
      <div className="card p-5">
        <h3 className="font-serif mb-3" style={{ fontSize: 20, margin: "0 0 4px 0" }}>ข้อมูลร้าน & QR ชำระเงิน</h3>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
          ชื่อร้านและ QR PromptPay จะแสดงบนใบเสร็จทุกใบ
        </p>
        <div className="space-y-3">
          <div>
            <label style={{ fontSize: 13, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ชื่อร้าน (แสดงบนใบเสร็จ)</label>
            <input value={shopDraft.shopName || ""} onChange={e => setShopDraft({ ...shopDraft, shopName: e.target.value })}
              placeholder="I Miss You" style={{ width: "100%" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ข้อความใต้ QR</label>
            <input value={shopDraft.qrNote || ""} onChange={e => setShopDraft({ ...shopDraft, qrNote: e.target.value })}
              placeholder="สแกนเพื่อชำระเงิน" style={{ width: "100%" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>ข้อความท้ายใบเสร็จ</label>
            <input value={shopDraft.footerNote || ""} onChange={e => setShopDraft({ ...shopDraft, footerNote: e.target.value })}
              placeholder="ขอบคุณที่อุดหนุนนะคะ 💛" style={{ width: "100%" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>รูป QR PromptPay</label>
            {shopDraft.qrImage ? (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                <img src={shopDraft.qrImage} alt="QR Preview"
                  style={{ width: 160, height: 160, objectFit: "contain", borderRadius: 8, border: "1px solid var(--border)", background: "white", padding: 4 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label className="btn-ghost" style={{ cursor: "pointer", fontSize: 13 }}>
                    <Upload size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
                    เปลี่ยนรูป
                    <input type="file" accept="image/*" onChange={handleQRUpload} style={{ display: "none" }} />
                  </label>
                  <button onClick={removeQR} className="btn-ghost" style={{ fontSize: 13, color: "var(--danger)" }}>
                    <Trash2 size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
                    ลบรูป
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ padding: 20, border: "2px dashed var(--border)", borderRadius: 8, textAlign: "center", background: "var(--bg)" }}>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>ยังไม่ได้อัปโหลดรูป QR</p>
                <label className="btn-primary" style={{ cursor: "pointer", display: "inline-block" }}>
                  <Upload size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
                  อัปโหลดรูป QR
                  <input type="file" accept="image/*" onChange={handleQRUpload} style={{ display: "none" }} />
                </label>
                <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 10, margin: "10px 0 0 0" }}>
                  รองรับ PNG, JPG • ขนาดไม่เกิน 2MB
                </p>
              </div>
            )}
          </div>
          <button onClick={saveShopInfo} className="btn-primary" style={{ width: "100%" }}>
            บันทึกข้อมูลร้าน
          </button>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-serif mb-3" style={{ fontSize: 20, margin: "0 0 12px 0" }}>สำรอง & นำเข้าข้อมูล</h3>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>ดาวน์โหลดข้อมูลทั้งหมดเป็นไฟล์ .json เก็บไว้ หรือย้ายไปอุปกรณ์อื่น</p>
        <div className="flex gap-2 flex-wrap">
          <button onClick={exportData} className="btn-primary">
            <Download size={16} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
            ดาวน์โหลดข้อมูล
          </button>
          <label className="btn-ghost" style={{ cursor: "pointer" }}>
            <Upload size={16} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
            นำเข้าข้อมูล
            <input type="file" accept=".json" onChange={importData} style={{ display: "none" }} />
          </label>
          <button onClick={clearSales} className="btn-ghost" style={{ color: "var(--danger)" }}>ล้างประวัติการขาย</button>
        </div>
      </div>

      <div className="card p-5">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h3 className="font-serif" style={{ fontSize: 20, margin: 0 }}>จัดการเมนู ({menu.length})</h3>
          <button onClick={() => setAdding(true)} className="btn-primary">
            <Plus size={16} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
            เพิ่มเมนู
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>ชื่อ</th><th>หมวด</th><th>ราคา</th><th>ต้นทุน (ประมาณ)</th><th></th></tr></thead>
            <tbody>
              {menu.map(m => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 500 }}>{m.name}</td>
                  <td style={{ color: "var(--text-muted)" }}>{m.category}</td>
                  <td>฿{m.price}</td>
                  <td style={{ color: "var(--text-muted)" }}>฿{m.cost}</td>
                  <td>
                    <button onClick={() => setEditing(m)} className="btn-ghost" style={{ padding: "4px 10px", fontSize: 12 }}>แก้</button>
                    <button onClick={() => deleteMenu(m.id)} className="btn-ghost" style={{ padding: "4px 10px", fontSize: 12, marginLeft: 4, color: "var(--danger)" }}>ลบ</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {adding && (
        <Modal onClose={() => setAdding(false)} title="เพิ่มเมนูใหม่">
          <div className="space-y-3">
            <input placeholder="ชื่อเมนู" value={newM.name} onChange={e => setNewM({ ...newM, name: e.target.value })} style={{ width: "100%" }} />
            <input placeholder="หมวด (เช่น กาแฟสด, โซดา)" value={newM.category} onChange={e => setNewM({ ...newM, category: e.target.value })} style={{ width: "100%" }} />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="ราคา" value={newM.price} onChange={e => setNewM({ ...newM, price: e.target.value })} style={{ width: "100%" }} />
              <input type="number" placeholder="ต้นทุน" value={newM.cost} onChange={e => setNewM({ ...newM, cost: e.target.value })} style={{ width: "100%" }} />
            </div>
            <button onClick={addMenu} className="btn-primary w-full">เพิ่ม</button>
          </div>
        </Modal>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)} title={`แก้ไข: ${editing.name}`}>
          <div className="space-y-3">
            <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} style={{ width: "100%" }} />
            <input value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} style={{ width: "100%" }} />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" value={editing.price} onChange={e => setEditing({ ...editing, price: +e.target.value })} style={{ width: "100%" }} />
              <input type="number" value={editing.cost} onChange={e => setEditing({ ...editing, cost: +e.target.value })} style={{ width: "100%" }} />
            </div>
            <button onClick={saveEdit} className="btn-primary w-full">บันทึก</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ onClose, title, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(61,40,23,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div className="card p-5" style={{ maxWidth: 480, width: "100%" }} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-serif" style={{ fontSize: 20, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
