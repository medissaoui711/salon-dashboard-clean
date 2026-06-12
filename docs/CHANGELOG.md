# Changelog

## [3.0.0] — 2026-06-12

### Added
- **PIN Authentication** — Manager (6-digit) / Cashier (4-digit) with numpad UI
- **Admin Panel** — Access via URL hash `admin.html#medpanel` (no visible login form)
- **Hash auto-cleared** from URL after auth via `history.replaceState`
- **403 block page** for direct access to admin.html without hash
- **Role-based permissions** — Cashier cannot see Salaries / Reports tabs
- **Session management** — 8-hour sessionStorage sessions with auto-expiry
- **Brute-force protection** — 30s lockout after 5 failed PIN attempts
- **Settings page** — Role badge, quick links, app info, logout button
- **Employee full profiles** — First/last name, ID number + expiry, health cert + expiry, photo upload
- **Photo compression** — Auto-resize to 200×200px JPEG before IndexedDB storage
- **Expiry color badges** — Green / Amber (≤30 days) / Red (expired) for ID and health cert
- **Document alerts banner** — Auto-warns when any document expires within 30 days
- **Support page** — WhatsApp contact form (support number encoded, not visible in UI)
- **Privacy Policy page**
- **FAQ page** — 13 questions with accordion UI
- **Full responsive** — 5 breakpoints + safe-area-inset + print media query
- **Inline SVG favicon + Apple Touch Icon**
- **PWA meta tags** — apple-mobile-web-app-capable, theme-color, viewport-fit=cover

### Changed
- Admin Panel auth method changed from password form to URL hash `#medpanel`
- Employee data schema extended with profile fields
- Settings tab replaces standalone settings modal

### Security
- Admin Panel URL hash cleared immediately after auth
- Support phone number encoded in base64 (not visible in rendered HTML)
- Session expires after 8 hours or on logout

---

## [2.0.0] — 2026-06-11

### Added
- Bilingual AR/EN toggle (RTL/LTR)
- IndexedDB offline-first storage + localStorage fallback
- Excel export (SheetJS) — per-report and full multi-sheet
- PDF export (jsPDF + AutoTable) — landscape, professional headers
- WhatsApp report sharing via wa.me
- JSON backup/restore
- Online/Offline status badge
- Activity feed, radar chart, employee performance bars
- Shop cost inline editing
- GitHub Actions CI/CD (Cloudflare + Vercel)

---

## [1.0.0] — 2026-06-10

### Added
- Initial dashboard: 6 tabs
- Chart.js integration
- Inline cell editing
- April 2026 sales data from Qatar barbershop Excel file
