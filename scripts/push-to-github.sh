#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# push-to-github.sh — تهيئة git ورفع المشروع لـ GitHub
# الاستخدام: bash scripts/push-to-github.sh YOUR_GITHUB_USERNAME
# ═══════════════════════════════════════════════════════════════
set -euo pipefail

USERNAME="${1:-YOUR_USERNAME}"
REPO="salon-dashboard"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀 Salon Dashboard — GitHub Push Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  GitHub User : $USERNAME"
echo "  Repo Name   : $REPO"
echo ""

# تهيئة git
git init
git add .
git commit -m "feat: Salon Dashboard v3.0.0

✨ Features:
- Bilingual AR/EN dashboard (RTL/LTR)
- PIN authentication (Manager 6-digit / Cashier 4-digit)
- Admin Panel via URL hash #medpanel
- Employee profiles (ID, health cert, photo upload)
- IndexedDB offline-first storage
- Excel + PDF export (daily, salary, expenses, full)
- WhatsApp report sharing
- JSON backup/restore
- Responsive — mobile, tablet, desktop, all browsers
- Cloudflare Pages + Vercel deployment ready
- GitHub Actions CI/CD pipeline"

git branch -M main
git remote add origin "git@github.com:${USERNAME}/${REPO}.git"

echo ""
echo "✅ Local repo initialized."
echo ""
echo "📋 الخطوات التالية:"
echo ""
echo "  1️⃣  أنشئ الريبو على GitHub:"
echo "      https://github.com/new"
echo "      الاسم: $REPO"
echo "      ⚠️  لا تضف README أو .gitignore (موجودان)"
echo ""
echo "  2️⃣  ارفع الكود:"
echo "      git push -u origin main"
echo ""
echo "  3️⃣  أضف GitHub Secrets (Settings → Secrets → Actions):"
echo "      CF_API_TOKEN   ← Cloudflare API token"
echo "      CF_ACCOUNT_ID  ← Cloudflare Account ID"
echo "      VERCEL_TOKEN   ← Vercel token"
echo ""
echo "  4️⃣  بعد git push → CI/CD يشتغل تلقائياً 🎉"
echo ""
echo "  🌐 Cloudflare: https://salon-dashboard.pages.dev"
echo "  ▲  Vercel:     https://salon-dashboard.vercel.app"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
