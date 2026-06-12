<div align="center">

# ✂️ Salon Dashboard

**لوحة تحكم إدارة الصالون — ثنائية اللغة | Bilingual Salon Management Dashboard**

[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)](https://salon-dashboard.pages.dev)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://salon-dashboard.vercel.app)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)](../../actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Offline First](https://img.shields.io/badge/Works-Offline-10b981)](https://salon-dashboard.pages.dev)
[![PIN Auth](https://img.shields.io/badge/Auth-PIN-7c3aed)](public/login.html)

> لوحة تحكم احترافية لإدارة الصالون — ملف HTML واحد، بدون backend، بدون قاعدة بيانات خارجية.  
> يعمل بالكامل offline بعد أول تحميل.

</div>

---

## 🗂️ هيكل الصفحات

| الصفحة | الوصف | الوصول |
|--------|-------|--------|
| `login.html` | **نقطة الدخول** — PIN numpad | عام |
| `index.html` | **لوحة التحكم الرئيسية** | جلسة نشطة |
| `admin.html` | **Super Admin Panel** | `admin.html#medpanel` |
| `support.html` | الدعم الفني — WhatsApp | عام |
| `privacy.html` | سياسة الخصوصية | عام |
| `faq.html` | الأسئلة الشائعة | عام |

---

## 🔑 نظام المصادقة

| الدور | PIN | الصلاحيات |
|-------|-----|-----------|
| **المدير** | 6 أرقام (افتراضي: `123456`) | كاملة |
| **الكاشير** | 4 أرقام (افتراضي: `0000`) | إضافة مبيعات ومصروفات فقط |
| **Admin Panel** | URL: `admin.html#medpanel` | إدارة PINs والإعدادات |

> الـ hash يُمسح من شريط العنوان تلقائياً بعد الدخول.  
> غيّر جميع الكودات فور أول تشغيل من Admin Panel.

---

## ✨ المميزات

### 📊 Dashboard
- 8 KPIs لحظية + Hero bar (أفضل موظف، صافي الربح، مجموع اليوم)
- 5 رسوم بيانية: Bar مكدس، Bar أفقي، Donut، Radar أسبوعي، Progress bars
- تعديل تكاليف المتجر مباشرة من الـ Dashboard

### 👥 الموظفون
- بطاقة Profile لكل موظف (صورة، اسم كامل، هوية، شهادة صحية)
- Badges ملونة لحالة الوثائق: 🟢 صالحة / 🟡 تنتهي قريباً / 🔴 منتهية
- تنبيهات تلقائية للوثائق المنتهية خلال 30 يوم
- رفع الصور مع ضغط تلقائي (200×200px)

### 💰 الرواتب
- تعديل مباشر في الخلايا (click → edit → Enter)
- إعادة حساب تلقائية (35% من مبيعات كل موظف)

### 📤 التصدير والمشاركة
| الصيغة | التقارير |
|--------|----------|
| **Excel (.xlsx)** | مبيعات · رواتب · موظفون · مصروفات · شامل |
| **PDF** | نفس التقارير — landscape + header احترافي |
| **WhatsApp** | تقرير نصي منسق → wa.me |
| **JSON** | نسخ احتياطية كاملة |

### 💾 التخزين
- **IndexedDB** primary + localStorage fallback
- كل تغيير يُحفظ فورياً
- يعمل بالكامل **Offline**

---

## 🚀 تشغيل سريع

```bash
# فتح مباشر في المتصفح — لا يحتاج أي إعداد
open public/login.html

# أو مع local server
npm install && npm run dev
# → http://localhost:3000/login.html
```

---

## 🌍 النشر على GitHub + Cloudflare + Vercel

```bash
# 1. شغّل سكربت الإعداد
bash scripts/push-to-github.sh YOUR_GITHUB_USERNAME

# 2. أنشئ الريبو على github.com/new ثم:
git push -u origin main

# 3. أضف 3 Secrets في GitHub (Settings → Secrets → Actions):
#    CF_API_TOKEN   — Cloudflare API token
#    CF_ACCOUNT_ID  — Cloudflare Account ID
#    VERCEL_TOKEN   — Vercel token
```

**كل `git push` ينشر تلقائياً على Cloudflare Pages + Vercel.**

الدليل الكامل: [docs/SETUP.md](docs/SETUP.md)

---

## 📁 هيكل المشروع

```
salon-dashboard/
├── public/
│   ├── index.html       ← لوحة التحكم الرئيسية
│   ├── login.html       ← صفحة تسجيل الدخول (PIN)
│   ├── admin.html       ← Admin Panel (hash: #medpanel)
│   ├── support.html     ← الدعم الفني
│   ├── privacy.html     ← سياسة الخصوصية
│   ├── faq.html         ← الأسئلة الشائعة
│   ├── _headers         ← Cloudflare edge headers
│   └── _redirects       ← Cloudflare SPA routing
├── .github/workflows/
│   └── deploy.yml       ← CI/CD pipeline
├── docs/
│   ├── SETUP.md         ← دليل الإعداد
│   └── CHANGELOG.md     ← سجل التغييرات
├── scripts/
│   └── push-to-github.sh
├── vercel.json
├── wrangler.toml
├── package.json
└── README.md
```

---

## 🛡️ الأمان

- Admin Panel محمي بـ URL hash سري (لا يوجد فورم مرئي)
- الـ hash يُمسح من الـ URL بعد الدخول مباشرة
- رقم الدعم مُشفّر في الكود (لا يظهر في الواجهة)
- حظر مؤقت بعد 5 محاولات PIN فاشلة
- جلسات تنتهي تلقائياً بعد 8 ساعات

---

<div align="center">

MIT License · Built offline-first · Zero backend · Single-file pages

</div>
