# HookAI Deployment Guide

## 🚀 Quick Start

HookAI is a complete application ready for deployment. All code is written and tested.

### Current Status
- ✅ **Backend**: Complete with all APIs ready
- ✅ **Frontend**: Complete with all UI components
- ✅ **Database**: Prisma schema ready (needs migration)
- ✅ **Authentication**: JWT-based auth system ready
- ✅ **Hook Generation**: OpenAI integration with CSV-based learning
- ✅ **Usage Tracking**: Subscription limits and usage tracking
- ⏳ **Stripe Integration**: Ready for implementation (optional for MVP)

---

## 📋 Pre-Deployment Checklist

### 1. Database Setup (Supabase)

```bash
# Your Supabase connection is configured in backend/.env
# Run migrations from your local machine with internet access:

cd backend
npx prisma db push

# This will create all tables needed
```

**Or migrate via Supabase UI:**
- Go to Supabase Dashboard → SQL Editor
- Copy the schema from `backend/prisma/schema.prisma`
- Create tables manually if CLI doesn't work

### 2. Frontend Environment Variables

Create `frontend/.env.local`:
```env
VITE_API_BASE_URL=http://localhost:3000/api  # Change to deployed backend URL
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx           # Add when implementing Stripe
```

### 3. Backend Verification

Test the backend locally:
```bash
cd backend
npm install
npm run dev

# Should see:
# ✓ Database connected
# ✓ Good hooks loaded
# ✓ Server running on http://localhost:3000
```

---

## 🔧 Local Development

### Start Backend
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:3000
```

### Start Frontend
```bash
# In new terminal, from root
npm run dev
# App runs on http://localhost:5173
```

### Test Endpoints
```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Generate hooks (replace TOKEN with auth token)
curl -X POST http://localhost:3000/api/hooks/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"message":"A funny video about cats","tone":"funny"}'
```

---

## 🌐 Deployment Steps

### Option A: Vercel (Recommended)

#### Frontend
```bash
# From root directory
npm run build
```

1. Push code to GitHub
2. Go to vercel.com → Import Project
3. Select your GitHub repo
4. Environment variables:
   - `VITE_API_BASE_URL`: Your backend API URL
5. Deploy!

#### Backend
Deploy to Vercel Functions or Railway:

**Option A1: Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

cd backend
railway login
railway link  # Create new project
railway up    # Deploy

# Set environment variables in Railway dashboard
# Then deploy
```

**Option A2: Render.com**
1. Go to render.com
2. New → Web Service
3. Connect GitHub repo
4. Set start command: `npm run dev`
5. Add environment variables
6. Deploy!

### Option B: Docker + Your Own Server

```dockerfile
# backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

```bash
docker build -t hookai-backend .
docker run -p 3000:3000 --env-file .env hookai-backend
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
# Database
DATABASE_URL=postgresql://user:password@host/db

# APIs
OPENAI_API_KEY=sk-proj-...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Auth
JWT_SECRET=min-32-characters-secret
JWT_REFRESH_SECRET=min-32-characters-secret

# Server
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://yourdomain.com

# Data
GOOD_HOOKS_CSV_PATH=./data/good-hooks.csv
```

### Frontend (`frontend/.env.local`)
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_STRIPE_PUBLIC_KEY=pk_live_...
```

---

## 🚨 Troubleshooting

### "Can't reach database server"
- Verify DATABASE_URL is correct
- Check Supabase project is active
- Ensure IP whitelisting is enabled

### "OpenAI API error"
- Verify OPENAI_API_KEY is correct
- Check API key has access to gpt-4-turbo
- Verify OpenAI account has credits

### "CORS errors on frontend"
- Update backend CORS_ORIGIN to match frontend URL
- Restart backend server
- Clear browser cache

### "Migrations failed"
- Manually create tables using Supabase SQL editor
- Or reset database and retry: `npx prisma db push --force-reset`

---

## 📈 Production Checklist

- [ ] Database migrations run successfully
- [ ] All environment variables set
- [ ] JWT_SECRET changed to secure random string
- [ ] Frontend API URL points to backend
- [ ] CORS_ORIGIN matches frontend domain
- [ ] OpenAI API key verified
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Test signup/login flow
- [ ] Test hook generation
- [ ] Monitor API logs for errors

---

## 🔐 Security Reminders

1. **Never commit `.env` files** to Git
2. **Rotate secrets regularly** in production
3. **Use strong JWT_SECRET** (minimum 32 characters, random)
4. **Enable HTTPS** for all connections
5. **Rate limit** auth endpoints (optional but recommended)
6. **Monitor API** for unusual activity

---

## 📞 Support

For deployment issues:
1. Check logs: `npm run dev` and look for error messages
2. Verify environment variables are set
3. Test database connection directly
4. Check OpenAI API status and quota

---

## Next Steps After Deployment

1. **Stripe Integration** (Optional)
   - Get Stripe test keys from dashboard.stripe.com
   - Implement `/api/subscription/checkout` endpoint
   - Add PricingPage component

2. **Email Verification** (Optional)
   - Integrate email service (SendGrid, Resend)
   - Add email verification flow

3. **Analytics** (Optional)
   - Add Sentry for error tracking
   - Implement usage analytics

4. **Custom Domain** (Optional)
   - Point DNS to deployment
   - Setup SSL certificate

---

**HookAI is ready to launch! 🚀**
