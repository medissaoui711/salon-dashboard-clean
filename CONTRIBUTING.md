# Contributing to Salon Dashboard

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/salon-dashboard.git
cd salon-dashboard
npm install
npm run dev  # → http://localhost:3000/login.html
```

All code lives in individual HTML files under `public/`. No build step.

## Commit Convention

| Prefix | When |
|--------|------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `style:` | CSS/layout only |
| `chore:` | Config, CI/CD |

## PR Checklist

- [ ] Tested in Chrome + Firefox (open files directly)
- [ ] Arabic RTL and English LTR both work correctly
- [ ] PIN auth flow works (login → dashboard → logout)
- [ ] Admin Panel only accessible via `admin.html#medpanel`
- [ ] Offline behavior unchanged
- [ ] IndexedDB save/load cycle works

## Code Style

- ES2022 vanilla JS — no framework, no transpilation
- Arabic comments above complex logic
- `const`/`let` only, never `var`
- Functions ≤ 40 lines — split if longer
