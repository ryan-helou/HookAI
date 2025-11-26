# 🎯 YOUR EXACT TODO LIST - HookAI

Everything is built. Here's exactly what YOU need to do:

---

## ✅ PHASE 1: Setup (15 minutes)

### 1. Create `.env.local` in frontend root
```bash
# File: frontend/.env.local (or just .env.local in root)
VITE_API_BASE_URL=http://localhost:3000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx  # Get from Stripe dashboard later
```

### 2. Verify backend `.env` exists
Backend already has `.env` configured with:
- ✅ Supabase connection
- ✅ OpenAI API key
- ✅ JWT secrets

**Check:** `backend/.env` should have all values filled in. If not, fill them in.

---

## ✅ PHASE 2: Database Migration (5 minutes)

### 3. Run Prisma migrations
```bash
# From root directory
cd backend
npx prisma db push

# You'll be asked: "Do you want to continue? [y/N]"
# Type: y (yes)
```

**What this does:**
- Creates all tables in your Supabase database
- Sets up indexes for performance
- Prepares database for the app

**Expected output:**
```
✓ Database connection OK
✓ Tables created successfully
```

---

## ✅ PHASE 3: Test Locally (10 minutes)

### 4. Start Backend

**Open Terminal 1:**
```bash
cd backend
npm run dev
```

**You should see:**
```
✓ Database connected
✓ Good hooks loaded (1000 hooks)
✓ Server running on http://localhost:3000
✓ Environment: development
```

### 5. Start Frontend

**Open Terminal 2 (new terminal window):**
```bash
# From root directory (not inside backend!)
npm run dev
```

**You should see:**
```
VITE v7.2.4 ready in 123 ms

➜  Local:   http://localhost:5173/
```

### 6. Test the full flow

1. Open **http://localhost:5173** in browser
2. **Sign Up:**
   - Email: `test@example.com`
   - Password: `password123`
   - Name: `Test User`
   - Click "Sign Up"

3. **Generate Hooks:**
   - Describe video: `A funny video about cats doing silly things`
   - Select tone: `funny`
   - Click "Send"
   - Wait for AI to generate hooks (~5 seconds)

4. **Verify it works:**
   - ✅ 5 hooks appear with scores (1-100)
   - ✅ Scores have colors (Red/Yellow/Green)
   - ✅ Can click "Copy to Clipboard"
   - ✅ Can click "Regenerate" for new hooks

5. **Test Usage Tracking:**
   - Look at navbar (top right)
   - Should show: `1 / 3 hooks` (for Free plan)
   - Color bar shows usage

6. **Test Logout:**
   - Click user icon (top right)
   - Click "Logout"
   - Should redirect to login

---

## ✅ PHASE 4: Stripe Setup (10 minutes)

### 7. Get Stripe API Keys

1. Go to **https://dashboard.stripe.com**
2. Sign in (or create account if needed)
3. Go to **Developers → API keys**
4. Copy **Publishable key** (pk_test_...)
5. Copy **Secret key** (sk_test_...)

### 8. Add Stripe Keys

**Update `backend/.env`:**
```env
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
```

**Update `src/.env.local`:**
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY_HERE
```

### 9. Restart services
```bash
# Terminal 1: Stop backend (Ctrl+C) and restart
cd backend
npm run dev

# Terminal 2: Stop frontend (Ctrl+C) and restart
npm run dev
```

---

## ✅ PHASE 5: Deploy (30 minutes)

### 10. Deploy Backend to Vercel

**Option A: Railway (Easiest)**

1. Go to **https://railway.app**
2. Sign in with GitHub
3. Create new project
4. Select "Deploy from GitHub repo"
5. Connect your HookAI repo
6. Select `/backend` as root directory
7. Add Environment Variables:
   ```
   DATABASE_URL=postgresql://postgres:Ranoonoo05@...
   OPENAI_API_KEY=sk-proj-...
   STRIPE_SECRET_KEY=sk_test_...
   JWT_SECRET=your-secret-32-chars
   JWT_REFRESH_SECRET=your-refresh-secret
   NODE_ENV=production
   CORS_ORIGIN=https://yourfrontend.vercel.app
   PORT=3000
   ```
8. Click "Deploy"
9. Wait for deployment (2-5 minutes)
10. Copy the deployment URL (e.g., `https://hookai-backend.railway.app`)

**Option B: Vercel (Also simple)**

1. Go to **https://vercel.com**
2. Import project → select HookAI repo
3. Select `/backend` as root directory
4. Add same environment variables as above
5. Deploy

### 11. Deploy Frontend to Vercel

1. Go to **https://vercel.com**
2. Click "New Project"
3. Import your HookAI GitHub repo
4. **Important:** Leave root directory as `/` (not `/src`)
5. Add Environment Variables:
   ```
   VITE_API_BASE_URL=https://your-backend-url/api
   VITE_STRIPE_PUBLIC_KEY=pk_test_...
   ```
6. Click "Deploy"
7. Wait for deployment (1-2 minutes)

### 12. Update Backend CORS

Once frontend is deployed:

1. Go back to Railway/Vercel backend settings
2. Update `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```
3. Redeploy backend

### 13. Test production

Visit your deployed frontend URL and test:
- ✅ Sign up / Login works
- ✅ Generate hooks works
- ✅ Hooks have scores
- ✅ Copy button works
- ✅ Usage tracking shows

---

## ✅ CHECKLIST - WHAT YOU NEED

Before you start, gather:

- [ ] Supabase credentials (already set in .env)
- [ ] OpenAI API key (already set in .env)
- [ ] Stripe test keys (from Stripe dashboard)
- [ ] GitHub account (for Vercel deployment)
- [ ] Vercel account (free, sign up with GitHub)
- [ ] Railway OR Vercel account (for backend)

---

## ✅ COMMON ISSUES & FIXES

### "Can't connect to database"
```bash
# Verify DATABASE_URL is correct in backend/.env
# Make sure Supabase project is active
# Try running: npx prisma db push again
```

### "Backend won't start"
```bash
# Make sure you're in the backend directory:
cd backend
npm install  # If modules missing
npm run dev
```

### "Frontend won't start"
```bash
# Make sure you're in root directory (not backend):
npm run dev  # Not: cd backend && npm run dev
```

### "Port 3000 already in use"
```bash
# Kill existing process or use different port:
PORT=3001 npm run dev  # Backend on 3001
```

### "OpenAI API errors"
```bash
# Verify in backend/.env:
OPENAI_API_KEY=sk-proj-YOUR-KEY-HERE
# Make sure it's the FULL key, not truncated
```

### "Hooks not generating"
```bash
# Check backend logs in Terminal 1
# Should see: "Loaded 1000 good hooks"
# If not: make sure backend/data/good-hooks.csv exists
```

---

## 📊 TIMELINE

- **Phase 1 (Setup)**: 15 min
- **Phase 2 (Database)**: 5 min
- **Phase 3 (Local Testing)**: 10 min
- **Phase 4 (Stripe Keys)**: 10 min
- **Phase 5 (Deploy)**: 30 min

**Total: ~70 minutes**

---

## 🎯 SUCCESS CRITERIA

✅ Backend runs locally at http://localhost:3000
✅ Frontend runs locally at http://localhost:5173
✅ Can sign up / login
✅ Can generate 5 hooks with AI
✅ Hooks have color-coded scores
✅ Copy button works
✅ Usage bar shows limits
✅ Backend deployed to Railway/Vercel
✅ Frontend deployed to Vercel
✅ Production app works end-to-end

---

## 🚀 AFTER DEPLOYMENT

You're done! HookAI is live. You can:

1. Share the URL with users
2. Promote on social media
3. Collect feedback
4. Track usage in analytics
5. Add Stripe checkout (optional feature)

---

## 📞 STUCK?

If anything fails:
1. Read the error message carefully
2. Check the "COMMON ISSUES & FIXES" section above
3. Check backend logs (Terminal 1)
4. Check frontend logs (Terminal 2)
5. Verify all .env files are filled in

---

**That's it! You've got this! 🚀**
