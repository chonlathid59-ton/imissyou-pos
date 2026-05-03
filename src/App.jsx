import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ShoppingCart, Package, ChefHat, BarChart3, AlertTriangle,
  Plus, Minus, Trash2, Printer, Check, X, TrendingUp,
  Calendar, Coffee, Settings, Download, Upload, Sparkles,
  Wallet, Banknote, Smartphone, Gift, Heart, FileText, ChevronDown, ChevronUp, Edit3,
  Bike
} from "lucide-react";

// ========== DEFAULT DATA ==========
const DEFAULT_MENU = [
  // ==== กาแฟสด (m1-m20) ====
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
  // ==== โซดา ====
  { id: "s1", name: "พีชโซดา", category: "โซดา", price: 50, cost: 14 },
  { id: "s2", name: "แดงโซดา", category: "โซดา", price: 50, cost: 10 },
  { id: "s3", name: "แดงมะนาวโซดา", category: "โซดา", price: 50, cost: 12 },
  { id: "s4", name: "บลูฮาวาย", category: "โซดา", price: 50, cost: 13 },
  { id: "s5", name: "สตรอเบอร์รี่โซดา", category: "โซดา", price: 50, cost: 15 },
  { id: "s6", name: "ส้มยูสุโซดา", category: "โซดา", price: 50, cost: 16 },
  { id: "s7", name: "ส้มมิกซ์โซดา", category: "โซดา", price: 50, cost: 15 },
  // ==== แนะนำ ====
  { id: "r1", name: "สตรอเบอร์รี่ปั่นโยเกิร์ต", category: "แนะนำ", price: 60, cost: 22 },
  { id: "r2", name: "โกโก้มินท์", category: "แนะนำ", price: 50, cost: 18 },
  { id: "r3", name: "มินท์ลาเต้", category: "แนะนำ", price: 50, cost: 19 },
  // ==== มัทฉะ ====
  { id: "mc1", name: "เพียว มัทฉะ", category: "มัทฉะ", price: 60, cost: 22 },
  { id: "mc2", name: "มัทฉะลาเต้", category: "มัทฉะ", price: 60, cost: 24 },
  { id: "mc3", name: "มัทฉะลาเต้ไซรัป", category: "มัทฉะ", price: 60, cost: 26 },
  { id: "mc4", name: "มัทฉะคาราเมลลาเต้", category: "มัทฉะ", price: 60, cost: 27 },
  { id: "mc5", name: "มัทฉะมะพร้าว", category: "มัทฉะ", price: 60, cost: 25 },
  { id: "m1776598526930", name: "มัทฉะมะพร้าวไซรัป", category: "มัทฉะ", price: 50, cost: 0 },
  { id: "m1776928280626", name: "มัทฉะลาเต้นมโอ๊ต", category: "มัทฉะ", price: 60, cost: 15 },
  // ==== ขนม / ขนมปังโทสต์ ====
  { id: "b1", name: "ชิอะปัง", category: "ขนม", price: 39, cost: 18 },
  { id: "b2", name: "โตสต์เนยสด+นมข้น", category: "ขนม", price: 29, cost: 12 },
  { id: "b3", name: "โตสต์เนยสด+นูเทลล่า", category: "ขนม", price: 29, cost: 14 },
  { id: "b4", name: "โตสต์เนยสด+นูเทลล่า+กล้วยหอม", category: "ขนม", price: 35, cost: 17 },
  { id: "m1776786044872", name: "แฮมชีส", category: "ขนมปังโทสต์", price: 69, cost: 50 },
  // ==== กาแฟสด เพิ่มเติม (เมนูใหม่) ====
  { id: "m1776830521298", name: "อเมริกาโน่มะพร้าวไซรัปซินญอริต้า", category: "กาแฟสด", price: 50, cost: 15 },
  { id: "m1776836172244", name: "เอสเปรสโซ่ร้อน", category: "กาแฟสด", price: 40, cost: 15 },
  { id: "m1776848512768", name: "คาปูชิโน่โอ๊ต", category: "กาแฟสด", price: 50, cost: 15 },
  { id: "m1777034829146", name: "คาปูชิโน่ร้อน", category: "กาแฟสด", price: 40, cost: 15 },
  { id: "m1777035083457", name: "ปีโป้ปั่นเอ็มร้อย", category: "กาแฟสด", price: 50, cost: 15 },
  { id: "m1777116744522", name: "ลาเต้นมโอ๊ต", category: "กาแฟสด", price: 50, cost: 15 },
  { id: "m1777291055623", name: "ชาไทยนมโอ๊ต", category: "กาแฟสด", price: 50, cost: 15 },
  { id: "m1777291090558", name: "เอสเพรสโซ่ใโอ๊ต", category: "กาแฟสด", price: 50, cost: 15 },
];

const DEFAULT_STOCK = [
  // ==== เมล็ดกาแฟ ====
  { id: "i1", name: "เมล็ดกาแฟ คั่วอ่อน", unit: "กรัม", current: 500, min: 50, leadTime: 3, costPerUnit: 0.56 },
  { id: "i24", name: "เมล็ดกาแฟ คั่วกลาง", unit: "กรัม", current: 1000, min: 250, leadTime: 3, costPerUnit: 0.56 },
  { id: "i25", name: "เมล็ดกาแฟ คั่วเข้ม", unit: "กรัม", current: 1000, min: 1000, leadTime: 3, costPerUnit: 0.56 },
  { id: "i26", name: "เมล็ดกาแฟ เอธิโอเปีย", unit: "กรัม", current: 500, min: 100, leadTime: 10, costPerUnit: 0.888 },
  // ==== นม / น้ำเชื่อม ====
  { id: "i2", name: "นมสด", unit: "มล.", current: 5000, min: 100, leadTime: 1, costPerUnit: 0.05 },
  { id: "i3", name: "น้ำเชื่อม", unit: "กรัม", current: 1000, min: 100, leadTime: 1, costPerUnit: 0.0625 },
  { id: "i4", name: "น้ำแข็ง", unit: "กก.", current: 20, min: 5, leadTime: 1, costPerUnit: 40 },
  // ==== ผง ====
  { id: "i5", name: "ผงมัทฉะ", unit: "กรัม", current: 1000, min: 250, leadTime: 3, costPerUnit: 1 },
  { id: "i6", name: "ผงโกโก้", unit: "กรัม", current: 800, min: 440, leadTime: 7, costPerUnit: 0.25 },
  { id: "i7", name: "ผงชาไทย", unit: "กรัม", current: 500, min: 100, leadTime: 3, costPerUnit: 0.148 },
  { id: "i8", name: "ผงชาเขียว", unit: "กรัม", current: 500, min: 100, leadTime: 1, costPerUnit: 0.4 },
  // ==== ไซรัป / น้ำผึ้ง ====
  { id: "i9", name: "น้ำผึ้ง", unit: "มล.", current: 1000, min: 100, leadTime: 2, costPerUnit: 0.115 },
  { id: "i10", name: "ไซรัปคาราเมล", unit: "มล.", current: 750, min: 100, leadTime: 1, costPerUnit: 0.115 },
  { id: "i11", name: "ไซรัปสตรอเบอร์รี่", unit: "มล.", current: 500, min: 100, leadTime: 1, costPerUnit: 0.112 },
  { id: "i12", name: "ไซรัปพีช", unit: "มล.", current: 500, min: 100, leadTime: 3, costPerUnit: 0.19 },
  { id: "i13", name: "ไซรัปมินท์", unit: "มล.", current: 400, min: 100, leadTime: 1, costPerUnit: 0.19 },
  { id: "i14", name: "น้ำส้มยูสุ", unit: "มล.", current: 300, min: 100, leadTime: 10, costPerUnit: 0.36 },
  { id: "i15", name: "โยเกิร์ต", unit: "กรัม", current: 500, min: 125, leadTime: 1, costPerUnit: 0.15 },
  // ==== ขนมปัง / ของหวาน ====
  { id: "i16", name: "ขนมปังโทสต์ น้องบอล", unit: "แผ่น", current: 30, min: 10, leadTime: 3, costPerUnit: 18 },
  { id: "i17", name: "เนยสด", unit: "กรัม", current: 500, min: 150, leadTime: 2, costPerUnit: 0.5 },
  { id: "i18", name: "นมข้นหวาน", unit: "มล.", current: 750, min: 500, leadTime: 1, costPerUnit: 0.06 },
  { id: "i19", name: "นูเทลล่า", unit: "กรัม", current: 800, min: 300, leadTime: 1, costPerUnit: 0.8 },
  { id: "i20", name: "กล้วยหอม", unit: "ลูก", current: 10, min: 1, leadTime: 1, costPerUnit: 10 },
  // ==== โซดา / บรรจุภัณฑ์ ====
  { id: "i21", name: "โซดา", unit: "มล.", current: 2000, min: 325, leadTime: 1, costPerUnit: 0.03 },
  { id: "i22", name: "แก้วพลาสติก", unit: "ใบ", current: 1000, min: 100, leadTime: 5, costPerUnit: 2.8 },
  { id: "i23", name: "หลอด", unit: "อัน", current: 500, min: 150, leadTime: 5, costPerUnit: 0.2 },
  // ==== วัตถุดิบเพิ่มเติม (จาก production) ====
  { id: "i1776586583860", name: "ชิโอ ปัง", unit: "ชิ้น", current: 12, min: 1, leadTime: 3, costPerUnit: 25 },
  { id: "i1776587307021", name: "นมข้นจืด คาเน", unit: "มล.", current: 5000, min: 500, leadTime: 0, costPerUnit: 0.0738 },
  { id: "i1776592163834", name: "ส้มมิกซ์", unit: "มล.", current: 1000, min: 500, leadTime: 3, costPerUnit: 0.2 },
  { id: "i1776592832521", name: "น้ำแดง เฮลสบลูบอย", unit: "มล", current: 500, min: 200, leadTime: 1, costPerUnit: 0.1 },
  { id: "i1776593584468", name: "ผงมะนาว", unit: "กรัม", current: 50, min: 20, leadTime: 1, costPerUnit: 0.39 },
  { id: "i1776593814875", name: "ผงชาพีช", unit: "กรัม", current: 200, min: 100, leadTime: 3, costPerUnit: 0.33 },
  { id: "i1776596623438", name: "สตอเบิรี่แช่แข็ง", unit: "กรัม", current: 1500, min: 500, leadTime: 1, costPerUnit: 0.1 },
  { id: "i1776598239790", name: "มะพร้าว มาลีโคโค่", unit: "มล.", current: 200, min: 0, leadTime: 1, costPerUnit: 0.072 },
  { id: "i1776598404171", name: "ไซรัป ซิญญอริต้า", unit: "มล.", current: 750, min: 200, leadTime: 1, costPerUnit: 0.3 },
  { id: "i1776785944744", name: "แฮมชีส", unit: "แผ่น", current: 5, min: 1, leadTime: 3, costPerUnit: 50 },
  { id: "i1776848417249", name: "นมโอ๊ต", unit: "มิลลิลิตร", current: 1500, min: 100, leadTime: 1, costPerUnit: 0.07 },
  { id: "i1777035294249", name: "เอ็ม150", unit: "ขวด", current: 5, min: 1, leadTime: 1, costPerUnit: 12 },
  { id: "i1777035353880", name: "ปีโป้", unit: "ชิ้น", current: 5, min: 3, leadTime: 1, costPerUnit: 3 },
];

const DEFAULT_RECIPES = {
  // เมนูที่เลือกคั่วได้ ใช้ id="bean" เป็น placeholder (ระบบแปลงเป็น i1/i24/i25 ตามที่เลือก)
  m1: [{ id: "bean", amt: 18 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  m2: [{ id: "bean", amt: 18 }, { id: "i9", amt: 15 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  m4: [{ id: "bean", amt: 18 }, { id: "i14", amt: 20 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  m5: [{ id: "bean", amt: 18 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  m6: [{ id: "bean", amt: 18 }, { id: "i2", amt: 150 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  // เมนูกาแฟอื่น ๆ ใช้เมล็ดคั่วกลาง (i24) เป็น default
  m3: [{ id: "i24", amt: 18 }, { id: "i22", amt: 1 }],
  m7: [{ id: "i24", amt: 18 }, { id: "i2", amt: 120 }, { id: "i6", amt: 15 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  m8: [{ id: "i24", amt: 18 }, { id: "i2", amt: 100 }, { id: "i22", amt: 1 }],
  m9: [{ id: "i24", amt: 18 }, { id: "i2", amt: 120 }, { id: "i10", amt: 20 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  // เอธิโอเปีย ใช้เมล็ดเฉพาะ (i26)
  m20: [{ id: "i26", amt: 18 }, { id: "i4", amt: 0.2 }, { id: "i22", amt: 1 }, { id: "i23", amt: 1 }],
  // เมนูอื่น ๆ ที่ไม่มีเมล็ดกาแฟ
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
const ROAST_TO_INGREDIENT = {
  light: "i1",      // เมล็ดกาแฟ คั่วอ่อน
  medium: "i24",    // เมล็ดกาแฟ คั่วกลาง
  dark: "i25",      // เมล็ดกาแฟ คั่วเข้ม
};
const ETHIOPIA_BEAN_ID = "i26";
const ETHIOPIA_MENU_ID = "m20";
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

// Default expense categories
const DEFAULT_EXPENSE_CATEGORIES = [
  "วัตถุดิบ", "บรรจุภัณฑ์", "ค่าน้ำ-ไฟ", "ค่าเช่า", "ค่าจ้าง",
  "ค่าโฆษณา-การตลาด", "ค่าขนส่ง", "ค่าซ่อมบำรุง", "อื่นๆ"
];

export default function App() {
  const [tab, setTab] = useState("pos");
  const [menu, setMenu] = useState([]);
  const [stock, setStock] = useState([]);
  const [recipes, setRecipes] = useState({});
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [shopInfo, setShopInfo] = useState(DEFAULT_SHOP_INFO);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setMenu(loadData("menu", DEFAULT_MENU));
    setStock(loadData("stock", DEFAULT_STOCK));
    setRecipes(loadData("recipes", DEFAULT_RECIPES));
    setSales(loadData("sales", []));
    setExpenses(loadData("expenses", []));
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

        /* ===== Sticky Top Cart ===== */
        .floating-cart {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: 0 6px 20px rgba(61,40,23,0.12), 0 2px 8px rgba(61,40,23,0.06);
          position: sticky;
          top: 12px;
          z-index: 60;
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          max-height: calc(100vh - 36px);
          overflow: hidden;
        }
        .floating-cart .cart-body {
          overflow-y: auto;
          padding: 14px 18px;
          max-height: calc(100vh - 120px);
        }
        .floating-cart .cart-header {
          padding: 12px 18px;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          background: var(--brown);
          color: var(--bg-card);
          border-radius: 14px 14px 0 0;
        }
        .floating-cart.collapsed .cart-body { display: none; }
        .floating-cart.collapsed { max-height: none; }
        .floating-cart.collapsed .cart-header { border-radius: 14px; border-bottom: none; }
        .cart-target {
          position: relative;
        }
        .cart-target::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
        }

        /* ===== Coffee Bean Drop Animation ===== */
        .bean-drop {
          position: fixed;
          z-index: 9999;
          pointer-events: none;
          font-size: 22px;
          line-height: 1;
          will-change: transform, opacity;
          animation: beanDrop var(--bean-duration, 800ms) cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
          --bean-tx: 0px;
          --bean-ty: 0px;
          --bean-rot: 360deg;
        }
        @keyframes beanDrop {
          0%   { transform: translate(0,0) rotate(0); opacity: 0; }
          15%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translate(var(--bean-tx), var(--bean-ty)) rotate(var(--bean-rot)); opacity: 0; }
        }
        @keyframes cartBump {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .cart-bump { animation: cartBump 280ms ease-out; }

        /* ===== Tag pill for bill type / payment ===== */
        .pill {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 3px 10px; border-radius: 999px;
          font-size: 11px; font-weight: 600; line-height: 1;
        }
        .pill-cash { background: rgba(107,142,78,0.15); color: var(--success); }
        .pill-transfer { background: rgba(212,160,86,0.18); color: #a87028; }
        .pill-app { background: rgba(125,95,220,0.16); color: #5e3abf; }
        .pill-free { background: rgba(212,160,86,0.25); color: #8a5a1c; }
        .pill-own { background: rgba(139,99,64,0.18); color: var(--brown); }

        /* ===== Segmented buttons ===== */
        .seg {
          display: inline-flex; gap: 0; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; background: var(--bg);
        }
        .seg button {
          background: transparent; border: none; padding: 7px 12px; font-size: 13px;
          color: var(--text); cursor: pointer; font-family: inherit; transition: all 0.15s;
        }
        .seg button + button { border-left: 1px solid var(--border); }
        .seg button.active { background: var(--brown); color: var(--bg-card); }
        .seg button:hover:not(.active) { background: var(--bg-card); }
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
              { k: "accounting", label: "บัญชี", icon: Wallet },
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
        {tab === "accounting" && <AccountingView sales={sales} setSales={setSales} expenses={expenses} setExpenses={setExpenses} stock={stock} setStock={setStock} showToast={showToast} />}
        {tab === "stock" && <StockView stock={stock} setStock={setStock} showToast={showToast} />}
        {tab === "recipe" && <RecipeView menu={menu} stock={stock} recipes={recipes} setRecipes={setRecipes} showToast={showToast} />}
        {tab === "report" && <ReportView sales={sales} menu={menu} />}
        {tab === "settings" && <SettingsView menu={menu} setMenu={setMenu} sales={sales} setSales={setSales} expenses={expenses} setExpenses={setExpenses} shopInfo={shopInfo} setShopInfo={setShopInfo} setStock={setStock} setRecipes={setRecipes} showToast={showToast} />}
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
  const [billType, setBillType] = useState("normal"); // normal | free | own
  const [paymentMethod, setPaymentMethod] = useState("cash"); // cash | transfer | app
  const [note, setNote] = useState("");
  const [cartCollapsed, setCartCollapsed] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const cartIconRef = useRef(null);

  const categories = ["ทั้งหมด", ...new Set(menu.map(m => m.category))];
  const filteredMenu = category === "ทั้งหมด" ? menu : menu.filter(m => m.category === category);

  // แปลงสูตรโดยแทนที่ "bean" placeholder ด้วย ingredient id จริงตาม roast level
  const resolveRecipe = (menuId, roast) => {
    const recipe = recipes[menuId];
    if (!recipe) return [];
    if (!ROASTABLE_MENUS.has(menuId) || !roast) return recipe;
    const beanId = ROAST_TO_INGREDIENT[roast];
    if (!beanId) return recipe;
    return recipe.map(r => r.id === "bean" ? { ...r, id: beanId } : r);
  };

  const canMake = (menuId, qty = 1, roast = null) => {
    const effectiveRoast = roast || (ROASTABLE_MENUS.has(menuId) ? "medium" : null);
    const recipe = resolveRecipe(menuId, effectiveRoast);
    if (!recipe || recipe.length === 0) return true;
    // ถ้ายังมี bean placeholder หลัง resolve แสดงว่าระบบไม่รู้ roast → ถือว่าทำได้
    return recipe.every(r => {
      if (r.id === "bean") return true;
      const item = stock.find(s => s.id === r.id);
      return item && item.current >= r.amt * qty;
    });
  };

  // ===== Coffee Bean Drop Animation =====
  const flyBeanToCart = (sourceEl) => {
    if (!sourceEl || !cartIconRef.current) return;
    const sRect = sourceEl.getBoundingClientRect();
    const tRect = cartIconRef.current.getBoundingClientRect();
    const startX = sRect.left + sRect.width / 2;
    const startY = sRect.top + sRect.height / 2;
    const endX = tRect.left + tRect.width / 2;
    const endY = tRect.top + tRect.height / 2;
    // 3 beans staggered for richness
    for (let i = 0; i < 3; i++) {
      const bean = document.createElement("div");
      bean.className = "bean-drop";
      bean.textContent = "☕";
      const jitterX = (Math.random() - 0.5) * 30;
      const dx = endX - startX + jitterX;
      const dy = endY - startY;
      bean.style.left = (startX - 11) + "px";
      bean.style.top = (startY - 11) + "px";
      bean.style.setProperty("--bean-tx", dx + "px");
      bean.style.setProperty("--bean-ty", dy + "px");
      bean.style.setProperty("--bean-rot", (360 + Math.random() * 360) + "deg");
      bean.style.setProperty("--bean-duration", (650 + i * 80) + "ms");
      bean.style.animationDelay = (i * 60) + "ms";
      document.body.appendChild(bean);
      setTimeout(() => bean.remove(), 1100 + i * 80);
    }
    setCartBump(true);
    setTimeout(() => setCartBump(false), 320);
  };

  const addToCart = (item, evt) => {
    const hasRoast = ROASTABLE_MENUS.has(item.id);
    const defaultRoast = hasRoast ? "medium" : null;
    if (!canMake(item.id, 1, defaultRoast)) {
      const beanName = hasRoast ? `${getRoastLabel(defaultRoast)}` : "";
      showToast(`วัตถุดิบไม่พอสำหรับ "${item.name}"${beanName ? ` (${beanName})` : ""}`, "error");
      return;
    }
    const existing = cart.find(c => c.id === item.id && c.blended === false && c.roast === defaultRoast);
    if (existing) {
      setCart(cart.map(c => c.id === item.id && !c.blended && c.roast === defaultRoast ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1, sweetness: 100, blended: false, roast: defaultRoast, cartKey: Date.now() + Math.random() }]);
    }
    // animation
    if (evt && evt.currentTarget) {
      flyBeanToCart(evt.currentTarget);
    }
    // auto-expand cart on add (in case user collapsed it)
    if (cartCollapsed) setCartCollapsed(false);
  };

  const updateCartItem = (key, updates) => setCart(cart.map(c => c.cartKey === key ? { ...c, ...updates } : c));
  const removeFromCart = (key) => setCart(cart.filter(c => c.cartKey !== key));
  const calcLinePrice = (c) => (c.price + (c.blended ? 10 : 0) + getRoastExtra(c.roast)) * c.qty;
  const subtotal = cart.reduce((sum, c) => sum + calcLinePrice(c), 0);
  const isRevenueBill = billType === "normal";
  const finalTotal = isRevenueBill ? subtotal : 0;

  const checkout = () => {
    if (cart.length === 0) return;
    // ตรวจสต๊อกอีกครั้งก่อนตัด (เผื่อผู้ใช้เปลี่ยนจำนวน/roast จนไม่พอ)
    for (const item of cart) {
      if (!canMake(item.id, item.qty, item.roast)) {
        const beanName = item.roast ? ` (${getRoastLabel(item.roast)})` : "";
        showToast(`วัตถุดิบไม่พอสำหรับ "${item.name}"${beanName} × ${item.qty}`, "error");
        return;
      }
    }
    const newStock = [...stock];
    for (const item of cart) {
      const recipe = resolveRecipe(item.id, item.roast);
      for (const r of recipe) {
        if (r.id === "bean") continue; // skip unresolved placeholder
        const idx = newStock.findIndex(s => s.id === r.id);
        if (idx >= 0) newStock[idx] = { ...newStock[idx], current: Math.max(0, newStock[idx].current - r.amt * item.qty) };
      }
    }
    setStock(newStock);
    saveData("stock", newStock);

    const totalCost = cart.reduce((s, c) => s + c.cost * c.qty, 0);
    const sale = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      items: cart.map(c => ({
        id: c.id, name: c.name, price: c.price, cost: c.cost, qty: c.qty,
        sweetness: c.sweetness, blended: c.blended, roast: c.roast || null,
        lineTotal: calcLinePrice(c),
        lineCost: c.cost * c.qty,
      })),
      subtotal: subtotal,            // ยอดเต็มก่อน free/own
      total: finalTotal,             // ยอดที่นับเป็นรายได้จริง (0 ถ้า free/own)
      totalCost,
      profit: finalTotal - totalCost,
      billType,                       // normal | free | own
      paymentMethod: isRevenueBill ? paymentMethod : null,
      note: note.trim() || null,
    };
    const newSales = [sale, ...sales];
    setSales(newSales);
    saveData("sales", newSales);
    setReceipt(sale);
    setCart([]);
    setBillType("normal");
    setPaymentMethod("cash");
    setNote("");
    const typeLabel = billType === "free" ? "(แก้วฟรีโปรฯ)" : billType === "own" ? "(ใช้เอง)" : "";
    showToast(`บันทึกเสร็จ! ${typeLabel} ${isRevenueBill ? `ยอด ฿${finalTotal}` : "ตัดสต๊อกแล้ว"}`);
  };

  const billTypeLabel = billType === "free" ? "แก้วฟรี (โปรฯ)" : billType === "own" ? "ใช้เอง" : "ขายปกติ";

  return (
    <div className="pos-main">
      {/* ===== Sticky Cart (อยู่ข้างบนของหน้าขาย — เลื่อนตามได้) ===== */}
      <div className={`floating-cart cart-target ${cartCollapsed ? "collapsed" : ""}`}>
        <div
          className="cart-header flex items-center justify-between"
          onClick={() => setCartCollapsed(!cartCollapsed)}
          style={{ userSelect: "none" }}
        >
          <div className="flex items-center gap-2">
            <span ref={cartIconRef} className={cartBump ? "cart-bump" : ""} style={{ display: "inline-flex" }}>
              <ShoppingCart size={20} />
            </span>
            <span className="font-serif" style={{ fontSize: 18 }}>ตะกร้า ({cart.length})</span>
            {cart.length > 0 && (
              <span className="font-serif" style={{ marginLeft: 8, fontWeight: 600 }}>
                {isRevenueBill ? `฿${subtotal}` : (
                  <span className={`pill ${billType === "free" ? "pill-free" : "pill-own"}`} style={{ background: "rgba(255,245,201,0.2)", color: "var(--neon)" }}>
                    {billTypeLabel}
                  </span>
                )}
              </span>
            )}
          </div>
          {cartCollapsed ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {!cartCollapsed && (
          <div className="cart-body">
            {cart.length === 0 ? (
              <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "20px 0" }}>คลิกเมนูที่ต้องการเพื่อเพิ่ม</p>
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

                {/* ===== Bill Type ===== */}
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>ประเภทบิล</div>
                  <div className="seg" style={{ width: "100%" }}>
                    <button className={billType === "normal" ? "active" : ""} onClick={() => setBillType("normal")} style={{ flex: 1 }}>
                      <Check size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                      ขายปกติ
                    </button>
                    <button className={billType === "free" ? "active" : ""} onClick={() => setBillType("free")} style={{ flex: 1 }}>
                      <Gift size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                      แก้วฟรี
                    </button>
                    <button className={billType === "own" ? "active" : ""} onClick={() => setBillType("own")} style={{ flex: 1 }}>
                      <Heart size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                      ใช้เอง
                    </button>
                  </div>
                  {!isRevenueBill && (
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                      บิลนี้ไม่นับเป็นรายได้ — แต่จะตัดสต๊อกตามปกติ
                    </div>
                  )}
                </div>

                {/* ===== Payment Method (only for normal sale) ===== */}
                {isRevenueBill && (
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>ช่องทางชำระเงิน</div>
                    <div className="seg" style={{ width: "100%" }}>
                      <button className={paymentMethod === "cash" ? "active" : ""} onClick={() => setPaymentMethod("cash")} style={{ flex: 1 }}>
                        <Banknote size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                        เงินสด
                      </button>
                      <button className={paymentMethod === "transfer" ? "active" : ""} onClick={() => setPaymentMethod("transfer")} style={{ flex: 1 }}>
                        <Smartphone size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                        เงินโอน
                      </button>
                      <button className={paymentMethod === "app" ? "active" : ""} onClick={() => setPaymentMethod("app")} style={{ flex: 1 }}>
                        <Bike size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                        เงินในแอพ
                      </button>
                    </div>
                  </div>
                )}

                {/* ===== Note (optional) ===== */}
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
                    <FileText size={11} /> โน้ตบิลนี้ (ไม่บังคับ)
                  </div>
                  <input
                    type="text"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="เช่น โต๊ะ 3, ลูกค้าประจำ, ใส่กล่องไป..."
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="flex justify-between items-center mb-4" style={{ fontSize: 20, fontWeight: 600, paddingTop: 12, borderTop: "2px solid var(--brown)" }}>
                  <span>{isRevenueBill ? "รวม" : "ยอดเดิม (ไม่เก็บเงิน)"}</span>
                  <span className="font-serif" style={{ color: isRevenueBill ? "var(--brown)" : "var(--text-muted)", textDecoration: isRevenueBill ? "none" : "line-through" }}>
                    ฿{subtotal}
                  </span>
                </div>
                <button onClick={checkout} className="btn-primary w-full" style={{ fontSize: 16, padding: "14px" }}>
                  <Check size={18} style={{ display: "inline", marginRight: 8, verticalAlign: "middle" }} />
                  {billType === "free" ? "บันทึก (แก้วฟรี)" : billType === "own" ? "บันทึก (ใช้เอง)" : "ชำระเงิน"}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* ===== Category buttons ===== */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={category === c ? "btn-primary" : "btn-ghost"} style={{ fontSize: 14 }}>{c}</button>
        ))}
      </div>

      {/* ===== Menu grid ===== */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3" style={{ paddingBottom: 24 }}>
        {filteredMenu.map(m => {
          const available = canMake(m.id);
          return (
            <button key={m.id} onClick={(e) => addToCart(m, e)} disabled={!available} className="menu-card">
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

      {receipt && <ReceiptModal receipt={receipt} shopInfo={shopInfo} onClose={() => setReceipt(null)} />}
    </div>
  );
}

function ReceiptModal({ receipt, shopInfo, onClose }) {
  const print = () => window.print();
  const hasQR = shopInfo?.qrImage && shopInfo.qrImage.length > 0;
  const isRevenueBill = !receipt.billType || receipt.billType === "normal";
  const billTypeLabel = receipt.billType === "free" ? "🎁 แก้วฟรี (โปรโมชั่น)" : receipt.billType === "own" ? "💛 ใช้เอง" : null;
  const paymentLabel =
    receipt.paymentMethod === "transfer" ? "เงินโอน" :
    receipt.paymentMethod === "cash" ? "เงินสด" :
    receipt.paymentMethod === "app" ? "เงินในแอพเดลิเวอรี่" : null;
  // QR ใช้สำหรับโอนเข้า PromptPay เท่านั้น (ไม่แสดงสำหรับเงินสด/เงินในแอพ)
  const showQR = hasQR && isRevenueBill && receipt.paymentMethod === "transfer";
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(61,40,23,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, overflowY: "auto" }}>
      <div className="card p-6" style={{ maxWidth: 360, width: "100%", maxHeight: "95vh", overflowY: "auto" }} id="receipt">
        <div className="text-center mb-4">
          <div className="stars mb-2"></div>
          <h2 className="font-neon" style={{ fontSize: 32, color: "var(--brown)", textShadow: "0 0 4px rgba(212,160,86,0.4)", margin: 0 }}>{shopInfo?.shopName || "I Miss You"}</h2>
          <p style={{ fontSize: 11, color: "var(--text-muted)", margin: "8px 0 0 0" }}>{new Date(receipt.timestamp).toLocaleString("th-TH")}</p>
          <p style={{ fontSize: 10, color: "var(--text-muted)", margin: "2px 0 0 0" }}>#{receipt.id.slice(-6)}</p>
          {billTypeLabel && (
            <p style={{ fontSize: 12, marginTop: 6, color: "var(--brown)", fontWeight: 600, margin: "6px 0 0 0" }}>{billTypeLabel}</p>
          )}
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
        {!isRevenueBill && (
          <div className="flex justify-between" style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 6 }}>
            <span>ยอดเดิม</span>
            <span style={{ textDecoration: "line-through" }}>฿{receipt.subtotal ?? receipt.total}</span>
          </div>
        )}
        <div className="flex justify-between font-serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
          <span>{isRevenueBill ? "รวม" : "ยอดเก็บเงิน"}</span>
          <span style={{ color: "var(--brown)" }}>฿{receipt.total}</span>
        </div>
        {paymentLabel && (
          <div className="flex justify-between" style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>
            <span>ช่องทาง</span>
            <span>{paymentLabel}</span>
          </div>
        )}
        {receipt.note && (
          <div style={{ background: "var(--bg)", padding: 8, borderRadius: 6, marginBottom: 12, fontSize: 12 }}>
            <span style={{ color: "var(--text-muted)" }}>โน้ต:</span> {receipt.note}
          </div>
        )}
        {showQR && (
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

// ========================================================================
// AccountingView — บันทึกรายวัน (ขาย + รายจ่าย) + แก้ไข/ลบ + ลิงก์สต๊อก
// ========================================================================
function AccountingView({ sales, setSales, expenses, setExpenses, stock, setStock, showToast }) {
  const todayISO = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(todayISO);
  const [editingSale, setEditingSale] = useState(null);
  const [editingExp, setEditingExp] = useState(null);
  const [addingExp, setAddingExp] = useState(false);

  // Filter by selected date
  const dailySales = useMemo(
    () => sales.filter(s => s.timestamp.slice(0, 10) === date)
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
    [sales, date]
  );
  const dailyExpenses = useMemo(
    () => expenses.filter(e => e.date === date)
                  .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")),
    [expenses, date]
  );

  // Summary - daily
  const summary = useMemo(() => {
    let cash = 0, transfer = 0, app = 0, freeCount = 0, ownCount = 0, normalCount = 0, totalCogs = 0;
    dailySales.forEach(s => {
      const billType = s.billType || "normal";
      if (billType === "free") freeCount++;
      else if (billType === "own") ownCount++;
      else {
        normalCount++;
        if (s.paymentMethod === "transfer") transfer += s.total;
        else if (s.paymentMethod === "app") app += s.total;
        else cash += s.total;
      }
      totalCogs += s.totalCost || 0;
    });
    const revenue = cash + transfer + app;
    // แยกรายจ่ายตามช่องทาง (สำหรับนับเงินสดในลิ้นชัก)
    let expCash = 0, expTransfer = 0;
    dailyExpenses.forEach(e => {
      const amt = +e.amount || 0;
      if (e.paymentMethod === "transfer") expTransfer += amt;
      else expCash += amt;
    });
    const totalExp = expCash + expTransfer;
    const netProfit = revenue - totalCogs - totalExp;
    // เงินสดสุทธิในลิ้นชักวันนี้ = ขายเงินสด − จ่ายเงินสด
    const cashOnHand = cash - expCash;
    // เงินเหลือสุทธิวันนี้ (cash flow รวมทุกช่องทาง) = รายได้ทั้งหมด − รายจ่ายทั้งหมด
    const dailyNetCash = revenue - totalExp;
    return {
      cash, transfer, app, revenue,
      freeCount, ownCount, normalCount,
      totalCogs, totalExp, netProfit,
      expCash, expTransfer, cashOnHand, dailyNetCash,
    };
  }, [dailySales, dailyExpenses]);

  // ===== Monthly summary (เดือนเดียวกับวันที่ที่เลือก) =====
  const monthKey = date.slice(0, 7);   // "YYYY-MM"
  const monthlySales = useMemo(
    () => sales.filter(s => s.timestamp.slice(0, 7) === monthKey),
    [sales, monthKey]
  );
  const monthlyExpenses = useMemo(
    () => expenses.filter(e => (e.date || "").slice(0, 7) === monthKey),
    [expenses, monthKey]
  );
  const monthSummary = useMemo(() => {
    let cash = 0, transfer = 0, app = 0, freeCount = 0, ownCount = 0, normalCount = 0, totalCogs = 0;
    monthlySales.forEach(s => {
      const billType = s.billType || "normal";
      if (billType === "free") freeCount++;
      else if (billType === "own") ownCount++;
      else {
        normalCount++;
        if (s.paymentMethod === "transfer") transfer += s.total;
        else if (s.paymentMethod === "app") app += s.total;
        else cash += s.total;
      }
      totalCogs += s.totalCost || 0;
    });
    const revenue = cash + transfer + app;
    const totalExp = monthlyExpenses.reduce((sum, e) => sum + (+e.amount || 0), 0);
    // หมวดรายจ่าย breakdown
    const expByCat = {};
    monthlyExpenses.forEach(e => {
      const c = e.category || "อื่นๆ";
      expByCat[c] = (expByCat[c] || 0) + (+e.amount || 0);
    });
    // รายได้รายวัน (สำหรับ bar chart)
    const byDay = {};
    monthlySales.forEach(s => {
      const isRev = !s.billType || s.billType === "normal";
      if (!isRev) return;
      const d = s.timestamp.slice(0, 10);
      if (!byDay[d]) byDay[d] = 0;
      byDay[d] += s.total || 0;
    });
    const dailyBreakdown = Object.entries(byDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([d, v]) => ({ date: d, revenue: v }));
    const grossProfit = revenue - totalCogs;
    const netProfit = grossProfit - totalExp;
    return {
      cash, transfer, app, revenue,
      freeCount, ownCount, normalCount,
      totalCogs, totalExp, grossProfit, netProfit,
      expByCat, dailyBreakdown,
    };
  }, [monthlySales, monthlyExpenses]);

  const monthLabel = (() => {
    const [y, m] = monthKey.split("-");
    const monthNames = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
    return `${monthNames[+m - 1]} ${+y + 543}`;
  })();

  // ===== Sale operations =====
  const restoreStockForSale = (sale) => {
    // Re-add ingredients for items in the deleted/edited sale (we don't know roast resolved -
    // but the sale.items has roast value, so we need recipes - that's not available here.
    // For safety: we just give back by stored item.cost, but stock cannot be perfectly restored
    // without recipes. Skip stock restore on edit; show advisory.
  };

  const deleteSale = (sale) => {
    if (!confirm(`ลบบิล #${sale.id.slice(-6)} ยอด ฿${sale.total} ?\n\n⚠️ ระบบจะลบบิลออกจากประวัติเท่านั้น — สต๊อกที่ตัดไปแล้วจะไม่คืนกลับโดยอัตโนมัติ\n(ถ้าต้องการคืนสต๊อก กรุณาเข้าหน้าสต๊อกแล้วเพิ่มเอง)`)) return;
    const newSales = sales.filter(s => s.id !== sale.id);
    setSales(newSales);
    saveData("sales", newSales);
    showToast("ลบบิลแล้ว");
  };

  const saveSaleEdit = () => {
    if (!editingSale) return;
    const oldSale = sales.find(s => s.id === editingSale.id);
    if (!oldSale) return;
    // recompute totals if items changed
    const items = editingSale.items.map(it => ({
      ...it,
      lineTotal: (it.price + (it.blended ? 10 : 0) + getRoastExtra(it.roast)) * it.qty,
      lineCost: it.cost * it.qty,
    }));
    const subtotal = items.reduce((s, it) => s + it.lineTotal, 0);
    const totalCost = items.reduce((s, it) => s + it.lineCost, 0);
    const isRevenue = !editingSale.billType || editingSale.billType === "normal";
    const total = isRevenue ? subtotal : 0;
    const updated = {
      ...editingSale,
      items,
      subtotal,
      total,
      totalCost,
      profit: total - totalCost,
      paymentMethod: isRevenue ? (editingSale.paymentMethod || "cash") : null,
    };
    const newSales = sales.map(s => s.id === updated.id ? updated : s);
    setSales(newSales);
    saveData("sales", newSales);
    setEditingSale(null);
    showToast("บันทึกการแก้ไขแล้ว");
  };

  // ===== Expense operations =====
  const blankExp = {
    id: "",
    date,
    category: "วัตถุดิบ",
    description: "",
    amount: "",
    paymentMethod: "cash",
    stockItemId: "",       // optional link to stock
    stockQty: "",          // optional restock qty
    note: "",
    createdAt: new Date().toISOString(),
  };
  const [newExp, setNewExp] = useState(blankExp);

  useEffect(() => {
    setNewExp(b => ({ ...b, date }));
  }, [date]);

  const saveNewExp = () => {
    if (!newExp.description.trim() || !newExp.amount) {
      showToast("กรุณากรอกรายละเอียดและจำนวนเงิน", "error");
      return;
    }
    const exp = {
      ...newExp,
      id: "e" + Date.now(),
      amount: +newExp.amount,
      stockQty: newExp.stockQty ? +newExp.stockQty : null,
      createdAt: new Date().toISOString(),
    };
    const newList = [exp, ...expenses];
    setExpenses(newList);
    saveData("expenses", newList);

    // If linked to stock, auto-restock
    if (exp.stockItemId && exp.stockQty) {
      const newStock = stock.map(s => s.id === exp.stockItemId
        ? { ...s, current: (+s.current || 0) + (+exp.stockQty || 0) }
        : s);
      setStock(newStock);
      saveData("stock", newStock);
      const item = stock.find(s => s.id === exp.stockItemId);
      showToast(`บันทึกแล้ว + เพิ่มสต๊อก ${item?.name} ${exp.stockQty} ${item?.unit}`);
    } else {
      showToast("บันทึกรายจ่ายแล้ว");
    }

    setAddingExp(false);
    setNewExp({ ...blankExp, date });
  };

  const saveExpEdit = () => {
    if (!editingExp) return;
    const exp = {
      ...editingExp,
      amount: +editingExp.amount,
      stockQty: editingExp.stockQty ? +editingExp.stockQty : null,
    };
    const newList = expenses.map(e => e.id === exp.id ? exp : e);
    setExpenses(newList);
    saveData("expenses", newList);
    setEditingExp(null);
    showToast("บันทึกแล้ว");
  };

  const deleteExp = (exp) => {
    if (!confirm(`ลบรายจ่าย "${exp.description}" ฿${exp.amount} ?`)) return;
    const newList = expenses.filter(e => e.id !== exp.id);
    setExpenses(newList);
    saveData("expenses", newList);
    showToast("ลบแล้ว");
  };

  // ===== Date navigation =====
  const shiftDate = (days) => {
    const d = new Date(date + "T00:00:00");
    d.setDate(d.getDate() + days);
    setDate(d.toISOString().slice(0, 10));
  };
  const dayName = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"][new Date(date + "T00:00:00").getDay()];

  return (
    <div className="space-y-5">
      {/* ===== Date header ===== */}
      <div className="card p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button className="btn-ghost" onClick={() => shiftDate(-1)}>‹ ก่อนหน้า</button>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ fontSize: 14 }} />
          <button className="btn-ghost" onClick={() => shiftDate(1)} disabled={date >= todayISO}>วันถัดไป ›</button>
          <button className="btn-ghost" onClick={() => setDate(todayISO)}>วันนี้</button>
          <span style={{ marginLeft: 8, color: "var(--text-muted)", fontSize: 13 }}>วัน{dayName}</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
          {dailySales.length} บิล • {dailyExpenses.length} รายจ่าย
        </div>
      </div>

      {/* ===== Summary KPIs (รายวัน) ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="เงินสด" value={`฿${summary.cash.toLocaleString()}`} icon={Banknote} color="success" />
        <KPI label="เงินโอน" value={`฿${summary.transfer.toLocaleString()}`} icon={Smartphone} />
        <KPI label="เงินในแอพ" value={`฿${summary.app.toLocaleString()}`} icon={Bike} />
        <KPI label="กำไรสุทธิ" value={`฿${summary.netProfit.toLocaleString()}`} icon={TrendingUp} color={summary.netProfit >= 0 ? "success" : "muted"} />
      </div>

      {/* ===== Cash on hand / Net cash highlights ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-5" style={{ background: "linear-gradient(135deg, rgba(107,142,78,0.10), rgba(107,142,78,0.04))", borderLeft: "4px solid var(--success)" }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>
              <Banknote size={14} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
              เงินสดในลิ้นชัก (วันนี้)
            </span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>เพื่อนับเงิน</span>
          </div>
          <div className="font-serif" style={{ fontSize: 30, fontWeight: 700, color: summary.cashOnHand >= 0 ? "var(--success)" : "var(--danger)" }}>
            ฿{summary.cashOnHand.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>
            ขายสด ฿{summary.cash.toLocaleString()} − จ่ายสด ฿{summary.expCash.toLocaleString()}
          </div>
        </div>

        <div className="card p-5" style={{ background: "linear-gradient(135deg, rgba(212,160,86,0.10), rgba(212,160,86,0.04))", borderLeft: "4px solid var(--accent)" }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>
              <TrendingUp size={14} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
              เงินเหลือสุทธิทุกช่องทาง (วันนี้)
            </span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>cash flow</span>
          </div>
          <div className="font-serif" style={{ fontSize: 30, fontWeight: 700, color: summary.dailyNetCash >= 0 ? "var(--brown)" : "var(--danger)" }}>
            ฿{summary.dailyNetCash.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>
            รายได้รวม ฿{summary.revenue.toLocaleString()} − รายจ่ายรวม ฿{summary.totalExp.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="card p-4" style={{ background: "var(--bg)" }}>
        <div className="flex flex-wrap gap-3" style={{ fontSize: 13 }}>
          <span><strong>รายได้รวม:</strong> ฿{summary.revenue.toLocaleString()}</span>
          <span style={{ color: "var(--text-muted)" }}>|</span>
          <span><strong>รายจ่าย:</strong> <span style={{ color: "var(--danger)" }}>฿{summary.totalExp.toLocaleString()}</span> <span style={{ color: "var(--text-muted)", fontSize: 11 }}>(สด ฿{summary.expCash.toLocaleString()} / โอน ฿{summary.expTransfer.toLocaleString()})</span></span>
          <span style={{ color: "var(--text-muted)" }}>|</span>
          <span><strong>ต้นทุนวัตถุดิบ:</strong> ฿{summary.totalCogs.toLocaleString()}</span>
          <span style={{ color: "var(--text-muted)" }}>|</span>
          <span><strong>กำไรขั้นต้น:</strong> ฿{(summary.revenue - summary.totalCogs).toLocaleString()}</span>
          {summary.freeCount > 0 && <><span style={{ color: "var(--text-muted)" }}>|</span><span className="pill pill-free">🎁 ฟรี {summary.freeCount} บิล</span></>}
          {summary.ownCount > 0 && <><span style={{ color: "var(--text-muted)" }}>|</span><span className="pill pill-own">💛 ใช้เอง {summary.ownCount} บิล</span></>}
        </div>
      </div>

      {/* ===== Monthly Summary ===== */}
      <div className="card p-5" style={{ borderTop: "3px solid var(--accent)" }}>
        <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
          <h3 className="font-serif" style={{ fontSize: 20, margin: 0 }}>
            <Calendar size={18} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
            สรุปทั้งเดือน — {monthLabel}
          </h3>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {monthSummary.normalCount} บิลขาย • {monthSummary.freeCount + monthSummary.ownCount > 0 ? `${monthSummary.freeCount + monthSummary.ownCount} บิลฟรี/ใช้เอง • ` : ""}{monthlyExpenses.length} รายการรายจ่าย
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <KPI label="รายได้รวมเดือนนี้" value={`฿${monthSummary.revenue.toLocaleString()}`} icon={TrendingUp} color="brown" />
          <KPI label="รายจ่ายรวม" value={`฿${monthSummary.totalExp.toLocaleString()}`} icon={Wallet} color="muted" />
          <KPI label="กำไรขั้นต้น" value={`฿${monthSummary.grossProfit.toLocaleString()}`} icon={Sparkles} color={monthSummary.grossProfit >= 0 ? "success" : "muted"} />
          <KPI label="กำไรสุทธิ" value={`฿${monthSummary.netProfit.toLocaleString()}`} icon={Sparkles} color={monthSummary.netProfit >= 0 ? "success" : "muted"} />
        </div>

        {/* Revenue breakdown by payment method */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4" style={{ fontSize: 13 }}>
          <div className="card p-4" style={{ background: "var(--bg)" }}>
            <div style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 4 }}>
              <Banknote size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />เงินสด
            </div>
            <div className="font-serif" style={{ fontSize: 18, color: "var(--success)", fontWeight: 600 }}>฿{monthSummary.cash.toLocaleString()}</div>
          </div>
          <div className="card p-4" style={{ background: "var(--bg)" }}>
            <div style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 4 }}>
              <Smartphone size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />เงินโอน
            </div>
            <div className="font-serif" style={{ fontSize: 18, color: "#a87028", fontWeight: 600 }}>฿{monthSummary.transfer.toLocaleString()}</div>
          </div>
          <div className="card p-4" style={{ background: "var(--bg)" }}>
            <div style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 4 }}>
              <Bike size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />เงินในแอพ (เดลิเวอรี่)
            </div>
            <div className="font-serif" style={{ fontSize: 18, color: "#5e3abf", fontWeight: 600 }}>฿{monthSummary.app.toLocaleString()}</div>
          </div>
        </div>

        {/* Expense breakdown by category */}
        {Object.keys(monthSummary.expByCat).length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>รายจ่ายแยกตามหมวด</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(monthSummary.expByCat).sort((a, b) => b[1] - a[1]).map(([cat, amt]) => (
                <div key={cat} style={{ background: "var(--bg)", padding: "6px 12px", borderRadius: 8, fontSize: 12, border: "1px solid var(--border)" }}>
                  <span style={{ color: "var(--text-muted)" }}>{cat}:</span>
                  <strong style={{ marginLeft: 6, color: "var(--danger)" }}>฿{amt.toLocaleString()}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily revenue mini-chart */}
        {monthSummary.dailyBreakdown.length > 0 && (() => {
          const maxRev = Math.max(...monthSummary.dailyBreakdown.map(d => d.revenue), 1);
          const [y, m] = monthKey.split("-");
          const daysInMonth = new Date(+y, +m, 0).getDate();
          const dayMap = Object.fromEntries(monthSummary.dailyBreakdown.map(d => [+d.date.slice(8), d.revenue]));
          return (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>รายได้รายวันในเดือนนี้</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 100 }}>
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => {
                  const rev = dayMap[d] || 0;
                  const isSelectedDay = d === +date.slice(8);
                  return (
                    <div key={d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div
                        title={`วันที่ ${d}: ฿${rev.toLocaleString()}`}
                        style={{
                          width: "85%",
                          background: isSelectedDay ? "var(--brown)" : (rev > 0 ? "var(--accent)" : "var(--border)"),
                          height: `${(rev / maxRev) * 100}%`,
                          borderRadius: "2px 2px 0 0",
                          minHeight: 2,
                        }}
                      />
                      <div style={{ fontSize: 8, marginTop: 2, color: isSelectedDay ? "var(--brown)" : "var(--text-muted)", fontWeight: isSelectedDay ? 600 : 400 }}>{d}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>

      {/* ===== Daily Sales List ===== */}
      <div className="card p-5">
        <h3 className="font-serif mb-3" style={{ fontSize: 20, margin: "0 0 12px 0" }}>
          <ShoppingCart size={18} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
          บิลขายของวันนี้ ({dailySales.length})
        </h3>
        {dailySales.length === 0 ? (
          <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "16px 0" }}>วันนี้ยังไม่มีบิล</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>เวลา</th><th>รายการ</th><th>ประเภท</th><th>ช่องทาง</th><th style={{ textAlign: "right" }}>ยอด</th><th>โน้ต</th><th></th>
                </tr>
              </thead>
              <tbody>
                {dailySales.map(s => {
                  const time = new Date(s.timestamp).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
                  const billType = s.billType || "normal";
                  const itemSummary = s.items.map(it => `${it.name}×${it.qty}`).join(", ");
                  return (
                    <tr key={s.id}>
                      <td style={{ whiteSpace: "nowrap", fontSize: 12, color: "var(--text-muted)" }}>{time}</td>
                      <td style={{ fontSize: 13 }} title={itemSummary}>
                        {itemSummary.length > 50 ? itemSummary.slice(0, 50) + "…" : itemSummary}
                      </td>
                      <td>
                        {billType === "free" && <span className="pill pill-free">ฟรี</span>}
                        {billType === "own" && <span className="pill pill-own">ใช้เอง</span>}
                        {billType === "normal" && <span style={{ fontSize: 12, color: "var(--text-muted)" }}>ขายปกติ</span>}
                      </td>
                      <td>
                        {s.paymentMethod === "cash" && <span className="pill pill-cash"><Banknote size={10} />สด</span>}
                        {s.paymentMethod === "transfer" && <span className="pill pill-transfer"><Smartphone size={10} />โอน</span>}
                        {s.paymentMethod === "app" && <span className="pill pill-app"><Bike size={10} />แอพ</span>}
                        {!s.paymentMethod && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>—</span>}
                      </td>
                      <td style={{ textAlign: "right", fontWeight: 600, color: billType === "normal" ? "var(--brown)" : "var(--text-muted)" }}>
                        ฿{s.total}
                      </td>
                      <td style={{ fontSize: 11, color: "var(--text-muted)", maxWidth: 140 }}>
                        {s.note || "—"}
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        <button onClick={() => setEditingSale(JSON.parse(JSON.stringify(s)))} className="btn-ghost" style={{ padding: "4px 8px", fontSize: 12 }}>
                          <Edit3 size={11} />
                        </button>
                        <button onClick={() => deleteSale(s)} className="btn-ghost" style={{ padding: "4px 8px", fontSize: 12, marginLeft: 4, color: "var(--danger)" }}>
                          <Trash2 size={11} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ===== Daily Expenses List ===== */}
      <div className="card p-5">
        <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
          <h3 className="font-serif" style={{ fontSize: 20, margin: 0 }}>
            <Wallet size={18} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
            รายจ่ายของวันนี้ ({dailyExpenses.length})
          </h3>
          <button onClick={() => setAddingExp(true)} className="btn-primary">
            <Plus size={14} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
            เพิ่มรายจ่าย
          </button>
        </div>
        {dailyExpenses.length === 0 ? (
          <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "16px 0" }}>วันนี้ยังไม่มีรายจ่าย</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>หมวด</th><th>รายละเอียด</th><th>ลิงก์สต๊อก</th><th>ช่องทาง</th><th style={{ textAlign: "right" }}>จำนวนเงิน</th><th></th>
                </tr>
              </thead>
              <tbody>
                {dailyExpenses.map(e => {
                  const linkedItem = e.stockItemId ? stock.find(s => s.id === e.stockItemId) : null;
                  return (
                    <tr key={e.id}>
                      <td style={{ fontSize: 13 }}>{e.category}</td>
                      <td style={{ fontSize: 13, fontWeight: 500 }}>{e.description}</td>
                      <td style={{ fontSize: 12, color: "var(--text-muted)" }}>
                        {linkedItem ? `${linkedItem.name} +${e.stockQty} ${linkedItem.unit}` : "—"}
                      </td>
                      <td>
                        {e.paymentMethod === "transfer"
                          ? <span className="pill pill-transfer"><Smartphone size={10} />โอน</span>
                          : <span className="pill pill-cash"><Banknote size={10} />สด</span>}
                      </td>
                      <td style={{ textAlign: "right", fontWeight: 600, color: "var(--danger)" }}>−฿{(+e.amount).toLocaleString()}</td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        <button onClick={() => setEditingExp({ ...e })} className="btn-ghost" style={{ padding: "4px 8px", fontSize: 12 }}>
                          <Edit3 size={11} />
                        </button>
                        <button onClick={() => deleteExp(e)} className="btn-ghost" style={{ padding: "4px 8px", fontSize: 12, marginLeft: 4, color: "var(--danger)" }}>
                          <Trash2 size={11} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ===== Add Expense Modal ===== */}
      {addingExp && (
        <Modal onClose={() => setAddingExp(false)} title="เพิ่มรายจ่ายใหม่">
          <ExpenseForm
            value={newExp}
            onChange={setNewExp}
            stock={stock}
          />
          <div className="flex gap-2" style={{ marginTop: 12 }}>
            <button onClick={saveNewExp} className="btn-primary" style={{ flex: 1 }}>บันทึก</button>
            <button onClick={() => setAddingExp(false)} className="btn-ghost" style={{ flex: 1 }}>ยกเลิก</button>
          </div>
        </Modal>
      )}

      {/* ===== Edit Expense Modal ===== */}
      {editingExp && (
        <Modal onClose={() => setEditingExp(null)} title={`แก้ไข: ${editingExp.description || "รายจ่าย"}`}>
          <ExpenseForm
            value={editingExp}
            onChange={setEditingExp}
            stock={stock}
            isEdit
          />
          <div className="flex gap-2" style={{ marginTop: 12 }}>
            <button onClick={saveExpEdit} className="btn-primary" style={{ flex: 1 }}>บันทึก</button>
            <button onClick={() => setEditingExp(null)} className="btn-ghost" style={{ flex: 1 }}>ยกเลิก</button>
          </div>
        </Modal>
      )}

      {/* ===== Edit Sale Modal ===== */}
      {editingSale && (
        <Modal onClose={() => setEditingSale(null)} title={`แก้ไขบิล #${editingSale.id.slice(-6)}`}>
          <SaleEditForm sale={editingSale} onChange={setEditingSale} />
          <div className="flex gap-2" style={{ marginTop: 12 }}>
            <button onClick={saveSaleEdit} className="btn-primary" style={{ flex: 1 }}>บันทึก</button>
            <button onClick={() => setEditingSale(null)} className="btn-ghost" style={{ flex: 1 }}>ยกเลิก</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ===== Sub-form: Expense =====
function ExpenseForm({ value, onChange, stock, isEdit = false }) {
  const linkedItem = value.stockItemId ? stock.find(s => s.id === value.stockItemId) : null;
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label style={{ fontSize: 12, color: "var(--text-muted)" }}>วันที่</label>
          <input type="date" value={value.date} onChange={e => onChange({ ...value, date: e.target.value })} style={{ width: "100%" }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "var(--text-muted)" }}>หมวด</label>
          <select value={value.category} onChange={e => onChange({ ...value, category: e.target.value })} style={{ width: "100%" }}>
            {DEFAULT_EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label style={{ fontSize: 12, color: "var(--text-muted)" }}>รายละเอียด</label>
        <input
          value={value.description}
          onChange={e => onChange({ ...value, description: e.target.value })}
          placeholder="เช่น ซื้อนม 5 ลิตร, จ่ายค่าไฟ..."
          style={{ width: "100%" }}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label style={{ fontSize: 12, color: "var(--text-muted)" }}>จำนวนเงิน (฿)</label>
          <input
            type="number"
            step="0.01"
            value={value.amount}
            onChange={e => onChange({ ...value, amount: e.target.value })}
            placeholder="0"
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "var(--text-muted)" }}>ช่องทางจ่าย</label>
          <select value={value.paymentMethod} onChange={e => onChange({ ...value, paymentMethod: e.target.value })} style={{ width: "100%" }}>
            <option value="cash">เงินสด</option>
            <option value="transfer">เงินโอน</option>
          </select>
        </div>
      </div>

      {/* Optional stock link */}
      <div style={{ background: "var(--bg)", padding: 10, borderRadius: 8 }}>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>
          🔗 ลิงก์กับสต๊อก (ตัวเลือก) — ถ้าซื้อวัตถุดิบมาเติม ระบบจะเพิ่มสต๊อกอัตโนมัติ
          {isEdit && <span style={{ color: "var(--danger)" }}> (การแก้ไขจะไม่เปลี่ยนสต๊อกย้อนหลัง)</span>}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={value.stockItemId || ""}
            onChange={e => onChange({ ...value, stockItemId: e.target.value })}
            style={{ width: "100%", fontSize: 13 }}
          >
            <option value="">— ไม่ลิงก์ —</option>
            {stock.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <input
            type="number"
            step="0.01"
            value={value.stockQty || ""}
            onChange={e => onChange({ ...value, stockQty: e.target.value })}
            placeholder={linkedItem ? `จำนวน (${linkedItem.unit})` : "จำนวน"}
            disabled={!value.stockItemId}
            style={{ width: "100%", fontSize: 13 }}
          />
        </div>
      </div>
    </div>
  );
}

// ===== Sub-form: Edit Sale =====
function SaleEditForm({ sale, onChange }) {
  const updateItem = (idx, updates) => {
    const items = sale.items.map((it, i) => i === idx ? { ...it, ...updates } : it);
    onChange({ ...sale, items });
  };
  const removeItem = (idx) => {
    const items = sale.items.filter((_, i) => i !== idx);
    onChange({ ...sale, items });
  };
  const isRevenue = !sale.billType || sale.billType === "normal";
  return (
    <div className="space-y-3">
      <div>
        <label style={{ fontSize: 12, color: "var(--text-muted)" }}>ประเภทบิล</label>
        <div className="seg" style={{ width: "100%" }}>
          <button className={(!sale.billType || sale.billType === "normal") ? "active" : ""} onClick={() => onChange({ ...sale, billType: "normal" })} style={{ flex: 1 }}>
            <Check size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />ขายปกติ
          </button>
          <button className={sale.billType === "free" ? "active" : ""} onClick={() => onChange({ ...sale, billType: "free" })} style={{ flex: 1 }}>
            <Gift size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />แก้วฟรี
          </button>
          <button className={sale.billType === "own" ? "active" : ""} onClick={() => onChange({ ...sale, billType: "own" })} style={{ flex: 1 }}>
            <Heart size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />ใช้เอง
          </button>
        </div>
      </div>

      {isRevenue && (
        <div>
          <label style={{ fontSize: 12, color: "var(--text-muted)" }}>ช่องทางชำระเงิน</label>
          <div className="seg" style={{ width: "100%" }}>
            <button className={(sale.paymentMethod === "cash" || !sale.paymentMethod) ? "active" : ""} onClick={() => onChange({ ...sale, paymentMethod: "cash" })} style={{ flex: 1 }}>
              <Banknote size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />เงินสด
            </button>
            <button className={sale.paymentMethod === "transfer" ? "active" : ""} onClick={() => onChange({ ...sale, paymentMethod: "transfer" })} style={{ flex: 1 }}>
              <Smartphone size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />เงินโอน
            </button>
            <button className={sale.paymentMethod === "app" ? "active" : ""} onClick={() => onChange({ ...sale, paymentMethod: "app" })} style={{ flex: 1 }}>
              <Bike size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />เงินในแอพ
            </button>
          </div>
        </div>
      )}

      <div>
        <label style={{ fontSize: 12, color: "var(--text-muted)" }}>โน้ต</label>
        <input
          value={sale.note || ""}
          onChange={e => onChange({ ...sale, note: e.target.value })}
          placeholder="โน้ตบิล"
          style={{ width: "100%" }}
        />
      </div>

      <div>
        <label style={{ fontSize: 12, color: "var(--text-muted)" }}>รายการในบิล</label>
        <div className="space-y-2">
          {sale.items.map((it, idx) => (
            <div key={idx} className="flex gap-2 items-center" style={{ background: "var(--bg)", padding: 8, borderRadius: 6 }}>
              <div style={{ flex: 1, fontSize: 13 }}>
                {it.name}
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  ฿{it.price}{it.roast ? ` • ${getRoastLabel(it.roast)}` : ""}{it.blended ? " • ปั่น" : ""}
                </div>
              </div>
              <input
                type="number"
                value={it.qty}
                min="1"
                onChange={e => updateItem(idx, { qty: Math.max(1, +e.target.value) })}
                style={{ width: 60, fontSize: 13 }}
              />
              <button onClick={() => removeItem(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger)" }}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 11, color: "var(--text-muted)", padding: 8, background: "rgba(232,184,109,0.12)", borderRadius: 6 }}>
        ⚠️ การแก้ไขจะไม่ปรับสต๊อกย้อนหลัง — ถ้าจำนวนเปลี่ยน ให้ไปเพิ่ม/ลดในหน้าสต๊อกเอง
      </div>
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

  // มูลค่าเงินที่จมในสต๊อก
  const stockValue = useMemo(() => {
    let total = 0;
    let lowStockValue = 0;     // มูลค่าของที่ใกล้/หมดหรือต้องสั่ง
    let healthyValue = 0;
    const byCategory = {       // จัดกลุ่มแบบหยาบตามชื่อ
      "เมล็ดกาแฟ": 0, "นม/น้ำเชื่อม": 0, "ผง": 0, "ไซรัป/น้ำผึ้ง": 0,
      "ขนม/อาหาร": 0, "บรรจุภัณฑ์": 0, "อื่นๆ": 0,
    };
    const itemValues = stock.map(s => {
      const v = (+s.current || 0) * (+s.costPerUnit || 0);
      total += v;
      if (s.current <= s.min * 1.5) lowStockValue += v; else healthyValue += v;
      const n = s.name || "";
      if (n.includes("เมล็ดกาแฟ")) byCategory["เมล็ดกาแฟ"] += v;
      else if (n.includes("นม") || n.includes("น้ำเชื่อม")) byCategory["นม/น้ำเชื่อม"] += v;
      else if (n.includes("ผง")) byCategory["ผง"] += v;
      else if (n.includes("ไซรัป") || n.includes("น้ำผึ้ง") || n.includes("น้ำส้ม") || n.includes("น้ำแดง") || n.includes("มะพร้าว")) byCategory["ไซรัป/น้ำผึ้ง"] += v;
      else if (n.includes("แก้ว") || n.includes("หลอด")) byCategory["บรรจุภัณฑ์"] += v;
      else if (n.includes("ขนมปัง") || n.includes("ปัง") || n.includes("เนย") || n.includes("นูเทลล่า") || n.includes("กล้วย") || n.includes("แฮม") || n.includes("โยเกิร์ต") || n.includes("สตอเบิรี่") || n.includes("เอ็ม") || n.includes("ปีโป้")) byCategory["ขนม/อาหาร"] += v;
      else byCategory["อื่นๆ"] += v;
      return { id: s.id, value: v };
    });
    // เรียงตามมูลค่ามากสุด
    const topItems = stock.map((s, i) => ({ ...s, value: itemValues[i].value }))
                          .sort((a, b) => b.value - a.value)
                          .slice(0, 5);
    return { total, lowStockValue, healthyValue, byCategory, topItems, valueMap: Object.fromEntries(itemValues.map(x => [x.id, x.value])) };
  }, [stock]);

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
      {/* ===== มูลค่าเงินที่จมอยู่ในสต๊อก ===== */}
      <div className="card p-5" style={{ borderLeft: "4px solid var(--accent)", background: "linear-gradient(135deg, rgba(212,160,86,0.08), rgba(212,160,86,0.02))" }}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <h3 className="font-serif" style={{ fontSize: 20, margin: 0 }}>
            <Wallet size={18} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
            มูลค่าเงินในสต๊อก (เงินที่จมอยู่)
          </h3>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {stock.length} รายการ • คำนวณจาก คงเหลือ × ต้นทุน/หน่วย
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          <div className="card p-4" style={{ background: "var(--bg)" }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>มูลค่ารวม</div>
            <div className="font-serif" style={{ fontSize: 26, fontWeight: 700, color: "var(--brown)" }}>
              ฿{Math.round(stockValue.total).toLocaleString()}
            </div>
          </div>
          <div className="card p-4" style={{ background: "var(--bg)" }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>มูลค่าของที่ปกติ</div>
            <div className="font-serif" style={{ fontSize: 22, fontWeight: 600, color: "var(--success)" }}>
              ฿{Math.round(stockValue.healthyValue).toLocaleString()}
            </div>
          </div>
          <div className="card p-4" style={{ background: "var(--bg)" }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>มูลค่าของที่ใกล้/ต้องสั่ง</div>
            <div className="font-serif" style={{ fontSize: 22, fontWeight: 600, color: "var(--danger)" }}>
              ฿{Math.round(stockValue.lowStockValue).toLocaleString()}
            </div>
          </div>
        </div>

        {/* แยกตามหมวด */}
        <div className="flex flex-wrap gap-2 mb-3">
          {Object.entries(stockValue.byCategory).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).map(([cat, v]) => (
            <div key={cat} style={{ background: "var(--bg)", padding: "6px 12px", borderRadius: 8, fontSize: 12, border: "1px solid var(--border)" }}>
              <span style={{ color: "var(--text-muted)" }}>{cat}:</span>
              <strong style={{ marginLeft: 6, color: "var(--brown)" }}>฿{Math.round(v).toLocaleString()}</strong>
            </div>
          ))}
        </div>

        {/* Top 5 มูลค่าสูงสุด */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 6 }}>🥇 5 อันดับมูลค่าสูงสุด</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {stockValue.topItems.map((it, i) => (
              <div key={it.id} className="flex justify-between items-center" style={{ background: "var(--bg-card)", padding: "6px 10px", borderRadius: 6, fontSize: 12, border: "1px solid var(--border)" }}>
                <span><span style={{ color: "var(--text-muted)" }}>#{i + 1}</span> {it.name}</span>
                <strong style={{ color: "var(--brown)" }}>฿{Math.round(it.value).toLocaleString()}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

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
              <tr><th>วัตถุดิบ</th><th>คงเหลือ</th><th>ขั้นต่ำ</th><th>lead time</th><th>ราคา/หน่วย</th><th style={{ textAlign: "right" }}>มูลค่า</th><th>สถานะ</th><th></th></tr>
            </thead>
            <tbody>
              {stock.map(s => {
                const st = getStatus(s);
                const v = stockValue.valueMap[s.id] || 0;
                return (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 500 }}>{s.name}</td>
                    <td>{s.current.toLocaleString()} {s.unit}</td>
                    <td style={{ color: "var(--text-muted)" }}>{s.min} {s.unit}</td>
                    <td style={{ color: "var(--text-muted)" }}>{s.leadTime} วัน</td>
                    <td style={{ color: "var(--text-muted)" }}>฿{s.costPerUnit}</td>
                    <td style={{ textAlign: "right", fontWeight: 600, color: "var(--brown)" }}>฿{Math.round(v).toLocaleString()}</td>
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
    // ถ้าเป็น placeholder "bean" ใช้ต้นทุนของเมล็ดคั่วกลาง (default)
    if (r.id === "bean") {
      const item = stock.find(s => s.id === ROAST_TO_INGREDIENT.medium);
      return sum + (item ? item.costPerUnit * r.amt : 0);
    }
    const item = stock.find(s => s.id === r.id);
    return sum + (item ? item.costPerUnit * r.amt : 0);
  }, 0);

  const realCost = calcCost();
  const profit = menuItem ? menuItem.price - realCost : 0;
  const margin = menuItem ? (profit / menuItem.price * 100).toFixed(0) : 0;
  const isRoastable = menuItem && ROASTABLE_MENUS.has(menuItem.id);

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
              {isRoastable && (
                <div style={{ marginTop: 10, padding: 10, background: "var(--bg)", borderRadius: 6, fontSize: 12, color: "var(--text-muted)" }}>
                  💡 เมนูนี้เลือกระดับคั่วได้ — ใช้ <strong>เมล็ดกาแฟ (ตามคั่ว)</strong> เป็นช่องพิเศษ
                  ที่จะตัดสต๊อกจากถังตามระดับคั่วที่ลูกค้าเลือก (คั่วอ่อน/กลาง/เข้ม)
                </div>
              )}
            </div>

            <h4 style={{ fontWeight: 600, marginBottom: 10 }}>วัตถุดิบที่ใช้</h4>
            {currentRecipe.length === 0 && (
              <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 12 }}>ยังไม่มีสูตร — คลิก "เพิ่มวัตถุดิบ" เพื่อเริ่ม</p>
            )}
            <div className="space-y-2 mb-4">
              {currentRecipe.map((r, idx) => {
                const isBeanPlaceholder = r.id === "bean";
                const item = isBeanPlaceholder ? null : stock.find(s => s.id === r.id);
                const unit = isBeanPlaceholder ? "กรัม" : item?.unit;
                return (
                  <div key={idx} className="flex gap-2 items-center" style={{
                    background: isBeanPlaceholder ? "rgba(212,160,86,0.12)" : "var(--bg)",
                    padding: 8, borderRadius: 6,
                    border: isBeanPlaceholder ? "1px dashed var(--accent)" : "none"
                  }}>
                    {isBeanPlaceholder ? (
                      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                        <Coffee size={14} style={{ color: "var(--brown)" }} />
                        <span style={{ fontWeight: 500 }}>เมล็ดกาแฟ (ตามคั่ว)</span>
                        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>— ตัดจากถังตามระดับคั่ว</span>
                      </div>
                    ) : (
                      <select value={r.id} onChange={e => updateIngredient(idx, { id: e.target.value })} style={{ flex: 1 }}>
                        {stock.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    )}
                    <input type="number" step="0.1" value={r.amt} onChange={e => updateIngredient(idx, { amt: +e.target.value })} style={{ width: 80 }} />
                    <span style={{ fontSize: 13, color: "var(--text-muted)", minWidth: 40 }}>{unit}</span>
                    <button onClick={() => removeIngredient(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger)" }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={addIngredient} className="btn-ghost">
                <Plus size={14} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                เพิ่มวัตถุดิบ
              </button>
              {isRoastable && !currentRecipe.some(r => r.id === "bean") && (
                <button onClick={() => setRecipes({ ...recipes, [selected]: [...currentRecipe, { id: "bean", amt: 18 }] })} className="btn-ghost">
                  <Coffee size={14} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                  เพิ่มเมล็ดตามคั่ว
                </button>
              )}
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

    const isRev = (s) => !s.billType || s.billType === "normal";
    const revenueBills = filtered.filter(isRev);
    const totalRevenue = revenueBills.reduce((s, t) => s + (t.total || 0), 0);
    const totalCost = revenueBills.reduce((s, t) => s + (t.totalCost || 0), 0);
    const totalProfit = totalRevenue - totalCost;
    const orderCount = revenueBills.length;
    const freeOwnCount = filtered.length - revenueBills.length;
    const freeOwnCost = filtered.filter(s => !isRev(s)).reduce((s, t) => s + (t.totalCost || 0), 0);

    const menuSales = {};
    filtered.forEach(sale => {
      const includeMoney = isRev(sale);
      sale.items.forEach(it => {
        if (!menuSales[it.id]) menuSales[it.id] = { name: it.name, qty: 0, revenue: 0, profit: 0 };
        menuSales[it.id].qty += it.qty; // count cups whether free or paid
        if (includeMoney) {
          menuSales[it.id].revenue += it.lineTotal;
          menuSales[it.id].profit += it.lineTotal - it.lineCost;
        }
      });
    });
    const topByQty = Object.values(menuSales).sort((a, b) => b.qty - a.qty).slice(0, 10);
    const topByProfit = Object.values(menuSales).sort((a, b) => b.profit - a.profit).slice(0, 10);

    const daily = {};
    sales.filter(s => new Date(s.timestamp) >= daysAgo(30) && isRev(s)).forEach(s => {
      const d = s.timestamp.slice(0, 10);
      if (!daily[d]) daily[d] = { date: d, revenue: 0, profit: 0, orders: 0 };
      daily[d].revenue += s.total;
      daily[d].profit += s.profit;
      daily[d].orders += 1;
    });
    const dailyArr = Object.values(daily).sort((a, b) => a.date.localeCompare(b.date));

    const allRevenueSales = sales.filter(isRev);
    const dayOfMonth = {};
    allRevenueSales.forEach(s => {
      const day = new Date(s.timestamp).getDate();
      if (!dayOfMonth[day]) dayOfMonth[day] = { day, revenue: 0, orders: 0 };
      dayOfMonth[day].revenue += s.total;
      dayOfMonth[day].orders += 1;
    });
    const monthsInData = new Set(allRevenueSales.map(s => s.timestamp.slice(0, 7))).size || 1;
    const dayOfMonthArr = Object.values(dayOfMonth).map(d => ({ ...d, avgRevenue: d.revenue / monthsInData, avgOrders: d.orders / monthsInData })).sort((a, b) => a.day - b.day);

    const dayOfWeek = [0, 0, 0, 0, 0, 0, 0].map((_, i) => ({ day: i, revenue: 0, orders: 0 }));
    allRevenueSales.forEach(s => {
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
      const weeksInData = Math.max(1, Math.floor(allRevenueSales.length / 7));
      const avgByDow = dow.orders / weeksInData;
      const avgByDom = dom ? dom.orders / monthsInData : 0;
      const predictedOrders = ((avgByDow + avgByDom) / 2) || 0;
      const avgTicket = allRevenueSales.length > 0 ? allRevenueSales.reduce((s, x) => s + x.total, 0) / allRevenueSales.length : 0;
      forecast.push({
        date: target.toISOString().slice(0, 10),
        dayName: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"][targetDow],
        predictedOrders: Math.round(predictedOrders),
        predictedRevenue: Math.round(predictedOrders * avgTicket),
      });
    }

    return { totalRevenue, totalCost, totalProfit, orderCount, freeOwnCount, freeOwnCost, topByQty, topByProfit, dailyArr, dayOfMonthArr, dayOfWeek, forecast };
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
      {analysis.freeOwnCount > 0 && (
        <div style={{ fontSize: 12, color: "var(--text-muted)", padding: "8px 12px", background: "var(--bg-card)", borderRadius: 8, border: "1px dashed var(--border)" }}>
          🎁/💛 ในช่วงนี้มีบิลฟรี/ใช้เอง <strong>{analysis.freeOwnCount}</strong> บิล (ต้นทุนวัตถุดิบรวม ฿{analysis.freeOwnCost.toLocaleString()}) — ไม่นับเป็นยอดขาย แต่นับเป็นปริมาณแก้วที่ทำ
        </div>
      )}

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

function SettingsView({ menu, setMenu, sales, setSales, expenses, setExpenses, shopInfo, setShopInfo, setStock, setRecipes, showToast }) {
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
      expenses: loadData("expenses", []),
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
        if (data.expenses) { setExpenses(data.expenses); saveData("expenses", data.expenses); }
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

  const resetAll = () => {
    if (!confirm("⚠️ รีเซ็ตทุกอย่างเป็นค่าเริ่มต้น?\n\nจะลบ:\n- เมนูทั้งหมด (กลับเป็นเมนูเริ่มต้น)\n- สต๊อกทั้งหมด (กลับเป็นค่าเริ่มต้น)\n- สูตรทั้งหมด (กลับเป็นสูตรเริ่มต้น)\n- ประวัติการขายทั้งหมด\n\nแนะนำให้ Export ข้อมูลก่อน!\n\nยกเลิกไม่ได้หลังกด OK")) return;
    if (!confirm("ยืนยันอีกครั้ง: ต้องการรีเซ็ตทั้งหมดใช่มั้ย?")) return;
    setMenu(DEFAULT_MENU);
    setStock(DEFAULT_STOCK);
    setRecipes(DEFAULT_RECIPES);
    setSales([]);
    setExpenses([]);
    saveData("menu", DEFAULT_MENU);
    saveData("stock", DEFAULT_STOCK);
    saveData("recipes", DEFAULT_RECIPES);
    saveData("sales", []);
    saveData("expenses", []);
    showToast("รีเซ็ตเสร็จแล้ว! ข้อมูลร้าน/QR ยังอยู่");
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
        <div style={{ marginTop: 16, padding: 14, background: "rgba(198,93,58,0.08)", borderRadius: 8, border: "1px solid rgba(198,93,58,0.25)" }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--danger)", marginBottom: 6 }}>
            ⚠️ รีเซ็ตทุกอย่าง (ใช้เมื่อระบบขึ้น default ใหม่จากการอัปเดต)
          </div>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>
            กรณีอัปเดตระบบแล้วเมนู/สต๊อกเพี้ยน กดปุ่มนี้จะคืนค่าเริ่มต้นทั้งหมด (แนะนำ Export ข้อมูลเก็บไว้ก่อน)
          </p>
          <button onClick={resetAll} className="btn-ghost" style={{ color: "var(--danger)", borderColor: "var(--danger)" }}>
            <Trash2 size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
            รีเซ็ตเป็นค่าเริ่มต้น
          </button>
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
