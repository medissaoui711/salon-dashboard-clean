# دليل الإعداد والنشر — Deployment Guide

## المتطلبات الأساسية

- حساب GitHub
- حساب Cloudflare (مجاني)
- حساب Vercel (مجاني)

---

## الخطوة 1 — رفع الكود لـ GitHub

```bash
# شغّل السكربت مع اسم مستخدمك
bash scripts/push-to-github.sh YOUR_GITHUB_USERNAME

# أنشئ الريبو على: https://github.com/new
# ثم ارفع الكود
git push -u origin main
```

---

## الخطوة 2 — Cloudflare Pages

### أول مرة (Dashboard):
1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages → Create project → Connect Git**
2. اختر الريبو
3. الإعدادات:
   - Framework preset: `None`
   - Build command: *(فارغ)*
   - Output directory: `public`
4. **Save and Deploy**

### الحصول على API Token و Account ID:
- **Account ID**: الشريط الجانبي في أي صفحة Cloudflare
- **API Token**: Profile → API Tokens → Create Token → "Edit Cloudflare Workers" + أضف "Cloudflare Pages: Edit"

---

## الخطوة 3 — Vercel

### أول مرة:
1. [vercel.com/new](https://vercel.com/new) → Import
2. الإعدادات:
   - Framework Preset: `Other`
   - Output Directory: `public`
   - Build Command: *(فارغ)*
3. **Deploy**

### Vercel Token:
- [vercel.com/account/tokens](https://vercel.com/account/tokens) → Create

---

## الخطوة 4 — GitHub Secrets

**Settings → Secrets and variables → Actions → New repository secret**

| Secret | من أين |
|--------|--------|
| `CF_API_TOKEN` | Cloudflare → API Tokens |
| `CF_ACCOUNT_ID` | Cloudflare Dashboard Sidebar |
| `VERCEL_TOKEN` | Vercel → Account Tokens |

بعد إضافة الـ Secrets → كل `git push` على `main` ينشر تلقائياً.

---

## كودات الدخول الافتراضية

| الدور | PIN / Key |
|-------|-----------|
| المدير | `123456` |
| الكاشير | `0000` |
| Admin Panel | URL: `admin.html#medpanel` |

> ⚠️ **غيّر الكودات** فور أول تشغيل من Admin Panel.

---

## تشغيل محلي

```bash
npm install
npm run dev
# → http://localhost:3000/login.html
```
