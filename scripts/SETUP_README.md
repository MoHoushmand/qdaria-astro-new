# 🚀 Quick Setup: Zipminator Waitlist System

## Current Status
✅ **API Endpoint**: Working
✅ **SendGrid Emails**: Configured
✅ **Supabase Connection**: Connected
❌ **Database Table**: **NEEDS TO BE CREATED** ← You are here

---

## ⚡ 2-Minute Setup

### 1. Open Supabase SQL Editor
Click this link (opens in new tab):
👉 **https://supabase.com/dashboard/project/uogbylfpxvklfpkkstsf/sql/new**

### 2. Copy the SQL
Open this file: `scripts/setup-waitlist-table.sql`

**Or** copy this directly:
```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  industry TEXT NOT NULL,
  expected_volume TEXT NOT NULL,
  use_case TEXT,
  nda_consent BOOLEAN DEFAULT FALSE NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public submissions" ON waitlist
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Service role full access" ON waitlist
  TO service_role USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_waitlist_updated_at
  BEFORE UPDATE ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 3. Click "RUN" button in Supabase

### 4. Test the System
```bash
# In your terminal:
cd ~/dev/qdaria-astro-new

# Make sure dev server is running:
npm run dev

# Test form submission:
curl -X POST http://localhost:4321/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "companyName": "Test Company",
    "email": "your-email@example.com",
    "industry": "defense",
    "expectedVolume": "<10k",
    "useCase": "Testing waitlist",
    "ndaConsent": true
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Successfully joined the waitlist!",
  "submissionId": "uuid-here"
}
```

**You should receive:**
- ✅ Confirmation email to the email you entered
- ✅ Sales alert to mo@qdaria.com

---

## 🔍 Verify Everything Works

### Check Database
In Supabase SQL Editor:
```sql
SELECT * FROM waitlist ORDER BY created_at DESC LIMIT 10;
```

### Check Email Status
Visit: http://localhost:4321/api/waitlist
Should show:
```json
{
  "status": "ok",
  "environment": {
    "supabase": "configured",
    "email": "configured"
  }
}
```

---

## 📊 View Submissions

### In Supabase Dashboard
1. Go to https://supabase.com/dashboard/project/uogbylfpxvklfpkkstsf/editor
2. Click on "waitlist" table
3. See all submissions with filters and search

### Useful Queries
```sql
-- Count by industry
SELECT industry, COUNT(*)
FROM waitlist
GROUP BY industry;

-- Recent signups (last 24 hours)
SELECT full_name, company_name, email, created_at
FROM waitlist
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- High-priority leads (defense, banking, infrastructure)
SELECT *
FROM waitlist
WHERE industry IN ('defense', 'banking', 'infrastructure')
ORDER BY created_at DESC;
```

---

## 🎯 What Happens When Someone Submits

1. **Form Validation**: Zod checks all fields
2. **Rate Limiting**: Max 3 submissions/minute per IP
3. **Database Insert**: Data saved to Supabase
4. **Email #1**: User gets Fortune-500 confirmation email
5. **Email #2**: You (mo@qdaria.com) get sales alert
6. **Redirect**: User sees professional thank-you page

---

## 🐛 Troubleshooting

### "Database Error" in API
- ❌ Table doesn't exist → Run the SQL above
- ❌ RLS policies wrong → SQL creates them automatically
- ❌ Wrong credentials → Check `.env` file

### "Email Failed"
- Check SendGrid API key in `.env`
- Verify sender email is verified in SendGrid
- Check SendGrid dashboard for delivery status

### Form Not Submitting
- Open browser console (F12) for errors
- Check network tab for API response
- Verify checkbox is checked (NDA consent required)

---

## 📧 Email Templates

Your emails use **Fortune-500 grade professional tone**:
- ❌ No "Exciting news!"
- ❌ No emoji spam
- ✅ Clear, confident, factual
- ✅ Specific timelines (24-48 hours)
- ✅ Technical specifications included

Templates are in: `src/lib/email/sendgrid.ts`

---

## 🚀 Production Deployment

When ready to deploy:

1. **Netlify/Vercel**: Add environment variables in dashboard
2. **Test production build**: `npm run build`
3. **Deploy**: `git push` (if auto-deploy enabled)

Production URLs will be:
- Form: https://qdaria.com/technology/products/zipminator
- API: https://qdaria.com/api/waitlist
- Thank you: https://qdaria.com/thank-you

---

## 📚 Full Documentation

- Complete setup: `/docs/ENTERPRISE_WAITLIST_SETUP.md`
- Email templates: `/docs/WAITLIST_COMPLETION_SUMMARY.md`
- Bug fixes: `/docs/FORM_FIX_APPLIED.md`

---

**Questions?** Everything is already configured. Just run the SQL and you're live! 🎉
