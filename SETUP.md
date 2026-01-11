# ChatGPT Clone - Fixed Version

A functional ChatGPT clone built with React and Vite that communicates with the OpenAI API.

## 🐛 Bugs Fixed

1. ✅ **Click handler** - Moved from input to send button
2. ✅ **Message display** - Added message history tracking and rendering
3. ✅ **API integration** - Updated to modern ChatGPT API (gpt-3.5-turbo)
4. ✅ **Security** - Removed exposed API key, now uses environment variables
5. ✅ **Module imports** - Converted to ES6 fetch instead of deprecated OpenAI library
6. ✅ **Responsive design** - Fixed input width and styling
7. ✅ **Loading states** - Added loading indicator while waiting for responses
8. ✅ **Enter key support** - Send message with Enter key

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Your OpenAI API Key
1. Go to [openai.com](https://platform.openai.com)
2. Sign in or create an account
3. Navigate to API Keys section
4. Create a new secret key
5. Copy the key (you'll only see it once)

### 3. Configure Environment
Create a `.env.local` file in the project root:
```
VITE_OPENAI_API_KEY=your-api-key-here
```

⚠️ **IMPORTANT**: Never commit this file to Git. It's already in `.gitignore`.

### 4. Run Development Server
```bash
npm run dev
```

The app will start at `http://localhost:5173` (or the port shown in terminal).

## Features

- 💬 Real-time chat with OpenAI's GPT-3.5-turbo
- 🎨 Modern dark UI with sidebar navigation
- ⚡ Smooth scrolling to latest messages
- 🔄 Loading indicators for responses
- ⌨️ Send with Enter key or button click
- 📱 Responsive design

## Build for Production
```bash
npm run build
```

## Troubleshooting

### "Please set your OpenAI API key..."
- Ensure `.env.local` file exists in project root
- Check that `VITE_OPENAI_API_KEY` is set correctly
- Restart dev server after changing .env file

### "API request failed"
- Verify your API key is valid
- Check you have API credits in your OpenAI account
- Try a simpler message to test

### No response from API
- Check browser console for error messages
- Verify internet connection
- Ensure API key has appropriate permissions

## Technologies Used

- React 19
- Vite
- OpenAI GPT-3.5-turbo API
- CSS3 for styling

---

Happy chatting! 🚀
