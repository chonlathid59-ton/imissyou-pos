# ☕ I Miss You Café — ระบบ POS

ระบบจัดการร้านกาแฟ — บันทึกการขาย + ตัดสต๊อกอัตโนมัติ + วิเคราะห์ยอดขาย + ทำนายล่วงหน้า 2 วัน

---

## 🚀 วิธี Deploy ขึ้นเว็บฟรี (แนะนำ: Vercel)

### ✅ สิ่งที่ต้องมีก่อน
- บัญชี **GitHub** (ถ้ายังไม่มี → สมัครที่ https://github.com/signup ฟรี)
- บัญชี **Vercel** (สมัครด้วย GitHub ได้เลย)

**ไม่ต้องลง Node.js, ไม่ต้องเขียนโค้ด — ทำทุกอย่างบนเว็บได้**

---

### 📝 ขั้นตอนที่ 1: อัปโหลดโค้ดขึ้น GitHub

1. เข้า https://github.com/new
2. ตั้งชื่อ repository: `imissyou-pos` (หรือชื่อไหนก็ได้)
3. เลือก **Public** (เพื่อให้ Vercel ฟรีใช้ได้)
4. ✅ ติ๊ก **"Add a README file"**
5. กด **Create repository**

6. ในหน้า repository ที่สร้างเสร็จ → กด **"Add file"** → **"Upload files"**
7. ลาก **ทุกไฟล์** ในโฟลเดอร์นี้เข้าไป (ยกเว้น `node_modules` ถ้ามี)
   - ไฟล์สำคัญที่ต้องมี: `package.json`, `vite.config.js`, `index.html`, `src/`, `public/`, `.gitignore`
8. กด **Commit changes**

---

### 📝 ขั้นตอนที่ 2: Deploy ขึ้น Vercel

1. เข้า https://vercel.com/signup
2. กด **"Continue with GitHub"** → อนุญาต Vercel เข้าถึง GitHub
3. ในหน้า Dashboard → กด **"Add New..."** → **"Project"**
4. เจอ repository `imissyou-pos` ของพี่ → กด **"Import"**
5. ในหน้า Configure:
   - **Framework Preset**: Vite (Vercel จะตรวจเจอเอง)
   - **Root Directory**: `./` (ค่าเริ่มต้น)
   - **Build Command**: `npm run build` (ค่าเริ่มต้น)
   - **Output Directory**: `dist` (ค่าเริ่มต้น)
   - ไม่ต้องแก้อะไร กด **"Deploy"** ได้เลย
6. รอประมาณ 1-2 นาที → Vercel จะให้ URL เช่น `imissyou-pos-xxxxx.vercel.app`
7. **🎉 เสร็จแล้ว!** เปิด URL นั้นบนเครื่องไหนก็ได้

---

### 🌐 ขั้นตอนที่ 3 (ถ้าอยากได้ URL ที่สวยขึ้น)

- ในหน้า Vercel project → **Settings** → **Domains**
- สามารถเปลี่ยนเป็น `imissyou-cafe.vercel.app` หรืออะไรก็ได้ที่ยังว่าง
- ถ้าซื้อ domain ของตัวเอง (เช่น `imissyou.cafe`) ก็ผูกกับ Vercel ได้ฟรี

---

## 🔄 วิธีอัปเดตระบบในอนาคต

ทุกครั้งที่ผมส่งโค้ดใหม่ให้ พี่แค่:
1. เข้า GitHub repository
2. แก้ไขไฟล์ (หรือ upload ทับ)
3. Commit
4. Vercel จะ **deploy อัตโนมัติ** ภายใน 1-2 นาที URL เดิมจะเป็นเวอร์ชันใหม่ทันที

---

## 💻 ถ้าอยากทดสอบบนเครื่องตัวเองก่อน (optional)

ต้องลง Node.js ก่อน (https://nodejs.org)

```bash
npm install
npm run dev
```

จะเปิดที่ `http://localhost:5173`

---

## ⚠️ สิ่งที่ต้องรู้เกี่ยวกับข้อมูล

- ข้อมูลทั้งหมด (เมนู, สต๊อก, ยอดขาย) เก็บใน **localStorage ของ browser**
- หมายความว่า: **แต่ละเครื่อง/browser มีข้อมูลของตัวเอง**
- พี่ใช้ที่บ้าน, แฟนใช้ที่ร้าน → ข้อมูลจะไม่ sync กันอัตโนมัติ
- **วิธีแก้**: ใช้ปุ่ม "ดาวน์โหลดข้อมูล" ในหน้า ตั้งค่า แล้วส่งไฟล์ .json ให้อีกคน "นำเข้าข้อมูล"
- **Backup อย่างน้อยสัปดาห์ละครั้ง** กันข้อมูลหาย

ถ้าอยากให้ข้อมูลซิงก์ข้ามเครื่องแบบเรียลไทม์ จะต้องเพิ่ม database (เช่น Supabase) — ผมช่วยทำให้ได้เมื่อพี่เริ่มใช้จริงและพร้อม

---

## 🖨️ เครื่องพิมพ์ใบเสร็จ

ระบบใช้ browser's print dialog — ใช้ได้กับ thermal printer ทุกรุ่นที่ลง driver ใน Windows/Mac
แนะนำ: **Epson TM-T82X-II** (80mm) — ราคา ~฿4,000-5,500

---

**สร้างด้วย ❤️ สำหรับร้าน I Miss You**
