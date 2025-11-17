# API Endpoints Documentation

This directory contains the API endpoints for the Qdaria website.

## Endpoints

### POST /api/waitlist
**Purpose**: Handle Zipminator beta waitlist form submissions

**Request Body**:
```json
{
  "fullName": "John Doe",
  "companyName": "Tech Corp",
  "email": "john@techcorp.com",
  "industry": "gaming|banking|defense|healthcare|infrastructure|other",
  "expectedVolume": "1-10k|10k-100k|100k-1m|1m+",
  "useCase": "Optional description of use case",
  "ndaConsent": true,
  "utmSource": "optional",
  "utmMedium": "optional",
  "utmCampaign": "optional"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Successfully joined the waitlist! We will contact you within 48 hours.",
  "submissionId": "uuid-here"
}
```

**Error Responses**:
- **400 Bad Request** - Validation errors
- **409 Conflict** - Duplicate email address
- **429 Too Many Requests** - Rate limit exceeded (3 per minute)
- **500 Internal Server Error** - Server error

**Features**:
- Input validation with Zod
- Rate limiting (3 submissions per minute per IP)
- Duplicate email detection
- Supabase database integration (when configured)
- SendGrid email notifications (when configured)
- UTM parameter tracking
- IP address and user agent logging

### GET /api/waitlist
**Purpose**: Health check endpoint

**Response**:
```json
{
  "status": "ok",
  "service": "waitlist-api",
  "version": "1.0.0",
  "environment": {
    "supabase": "configured|not configured",
    "email": "configured|not configured"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Testing

Run the test suite:
```bash
# Start dev server first
npm run dev

# In another terminal, run tests
node scripts/test-waitlist-api.js
```

## Configuration

See `.env.example` for required environment variables:
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SENDGRID_API_KEY` - SendGrid API key
- `SENDGRID_FROM_EMAIL` - Verified sender email
- `SALES_EMAIL` - Email for sales notifications

## Production Notes

The API works in three modes:

1. **Full Production Mode** (Supabase + SendGrid configured)
   - Saves to database
   - Sends confirmation emails
   - Full validation and rate limiting

2. **Demo Mode** (No Supabase configured)
   - Returns success response
   - Sends emails if SendGrid configured
   - Still validates input and rate limits

3. **Development Mode** (No services configured)
   - Returns mock responses
   - Useful for frontend development

## Security Features

- **Rate Limiting**: 3 requests per minute per IP
- **Input Validation**: Comprehensive Zod schemas
- **SQL Injection Prevention**: Parameterized queries via Supabase
- **XSS Prevention**: Input sanitization
- **CORS**: Configured for production domain
- **Error Handling**: No sensitive data in error responses