# 🔑 OpenAI API Key Setup Guide

## ❌ Current Issue
Your app is showing "Sorry, there was an error processing your message" because the `.env.local` file currently has a **placeholder API key** instead of a real one:

```
VITE_OPENAI_API_KEY=your-openai-api-key-here  ← This is a placeholder, not a real key!
```

## ✅ How to Fix This

### Step 1: Get Your OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. Sign in to your OpenAI account (create one if you don't have)
3. Click **"Create new secret key"**
4. Copy the key (you'll only see it once, so save it somewhere safe)
5. The key starts with `sk-proj-...`

### Step 2: Add Your Real API Key to .env.local
Replace the placeholder with your actual API key:

**Before:**
```
VITE_OPENAI_API_KEY=your-openai-api-key-here
```

**After:**
```
VITE_OPENAI_API_KEY=sk-proj-YOUR_ACTUAL_KEY_HERE
```

**Example (with fake key for reference):**
```
VITE_OPENAI_API_KEY=sk-proj-abcdef123456789xyz...
```

### Step 3: Restart the Development Server
1. Stop the dev server (press `Ctrl+C` in terminal)
2. Start it again with `npm run dev`
3. The new API key will be loaded

### Step 4: Test the Chat
1. Open your chatGPT clone in the browser
2. Type a message and press Enter or click Send
3. You should now see the bot respond instead of the error message

## ⚠️ Important Security Notes
- **NEVER** commit `.env.local` to version control (it's in `.gitignore`)
- **NEVER** share your API key with anyone
- **NEVER** paste your key into public channels or forums
- Keep your key secret like a password
- If you accidentally expose a key, delete it immediately from OpenAI dashboard

## 💰 Billing Information
- OpenAI charges for API usage by the token
- GPT-3.5-turbo is relatively cheap (~$0.001 per 1000 tokens)
- Set spending limits in your OpenAI account dashboard
- Monitor usage to avoid unexpected charges

## 🐛 Debugging
If it still doesn't work after adding your real API key:

1. **Open Browser Developer Tools** (F12 or Right-click → Inspect)
2. **Go to Console tab** (look for any error messages)
3. **You should see one of these:**
   - ✅ "Sending message to OpenAI API: [your message]" - Request is being sent
   - ❌ "API Key Error: VITE_OPENAI_API_KEY not set in .env.local" - Key not loaded
   - ❌ "API Error Response: {status: 401, error: {...}}" - Invalid API key
   - ❌ "API Error Response: {status: 429, error: {...}}" - Rate limited
   - ❌ "API Error Response: {status: 500, error: {...}}" - OpenAI server error

4. **Share the exact error from Console** if you need help debugging

## ✨ Next Steps
After you fix the API key and get it working:
1. ✅ Scrollbar is already hidden (fixed in App.css)
2. ✅ Chat should work with Enter key and Send button
3. ✅ Auto-scroll will move to latest message
4. ✅ Loading indicator shows while waiting for response
