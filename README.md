# 🤖 ChatGPT Clone

A fully functional ChatGPT clone built with React and Vite, powered by OpenAI's GPT-3.5-turbo API. Features a modern UI with a responsive chat interface, real-time message streaming, and comprehensive error handling.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.3.1-green)
![OpenAI](https://img.shields.io/badge/OpenAI-API-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- 💬 **Real-time Chat Interface** - Instant messaging with bot responses
- 🎨 **Modern UI Design** - Clean, responsive interface with smooth animations
- ⚡ **Fast Performance** - Built with Vite for instant HMR and optimized builds
- 🔑 **Secure API Key Management** - Environment variables for secure credential storage
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⌨️ **Keyboard Support** - Send messages with Enter key
- 🔄 **Auto-scroll** - Automatically scrolls to latest messages
- ⏳ **Loading Indicators** - Visual feedback during API requests
- 🐛 **Comprehensive Error Handling** - User-friendly error messages with debugging console logs
- 📝 **Well-documented Code** - Extensive inline comments for easy maintenance

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0 with Hooks (useState, useRef, useEffect)
- **Build Tool**: Vite 7.3.1 for fast development and optimized production builds
- **API**: OpenAI GPT-3.5-turbo
- **Styling**: CSS3 with Flexbox
- **HTTP Client**: Fetch API
- **Environment**: Vite environment variables

## 📋 Prerequisites

Before getting started, you need:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **OpenAI API Key** - Sign up at [platform.openai.com](https://platform.openai.com/account/api-keys)
- **Billing configured** on your OpenAI account (free trial credits or paid plan)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/workanand28/gpt_clone.git
cd gpt_clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_OPENAI_API_KEY=sk-proj-YOUR_API_KEY_HERE
```

Replace `YOUR_API_KEY_HERE` with your actual OpenAI API key from [platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys).

### 4. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5176` (or the next available port).

### 5. Build for Production

```bash
npm run build
```

Production-ready files will be in the `dist` folder.

## 📖 Usage

1. **Start the dev server**: `npm run dev`
2. **Open in browser**: `http://localhost:5176`
3. **Type a message** in the input field
4. **Send message** by:
   - Pressing `Enter` key
   - Clicking the Send button
5. **Wait for response** - The bot will respond with AI-generated text
6. **Continue chatting** - Messages are displayed in the chat area with auto-scroll

## 🔧 Configuration

### API Parameters

Edit `src/OpenAI.jsx` to customize the API behavior:

```javascript
{
  model: 'gpt-3.5-turbo',      // AI model (can change to gpt-4)
  max_tokens: 256,              // Max response length
  temperature: 0.7,             // Creativity (0-2, higher = more creative)
  top_p: 1,                      // Diversity of response
  frequency_penalty: 0,          // Penalty for repeating words
  presence_penalty: 0            // Penalty for new topics
}
```

### Styling

Customize the UI by editing `src/App.css`. The main sections are:

- **Global Styles** - General font and colors
- **Layout** - Sidebar and main content area
- **Chat Styles** - Message appearance
- **Input Styles** - Text input and send button

## 📁 Project Structure

```
chat-gpt/
├── src/
│   ├── App.jsx              # Main component with chat logic
│   ├── App.css              # Styling for the app
│   ├── OpenAI.jsx           # OpenAI API integration
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles
│   └── assets/              # SVG icons and images
├── public/                   # Static assets
├── .env.local               # Environment variables (not in git)
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies
├── vite.config.js           # Vite configuration
├── index.html               # HTML entry point
└── README.md                # This file
```

## 🐛 Troubleshooting

### "Sorry, there was an error processing your message"

**Possible Causes:**

1. **API Key not set** - Ensure `.env.local` has a valid `VITE_OPENAI_API_KEY`
2. **Insufficient quota** - Check billing in your OpenAI account
3. **Invalid API key** - Verify the key is correct and not expired
4. **Network error** - Check your internet connection
5. **API overloaded** - Try again in a few moments

**Debug Steps:**

1. Open browser **Developer Console** (F12 or Right-click → Inspect → Console)
2. Look for error messages starting with "OpenAI API Error:"
3. Check the full error details logged to console
4. Share the error message if you need help

### Scrollbar Visible

The scrollbar is hidden by default. If you see it, check that `src/App.css` includes:

```css
.chats {
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;  /* Edge */
}

.chats::-webkit-scrollbar {
  display: none;  /* Chrome/Safari */
}
```

### Port Already in Use

If port 5176 is busy, Vite will automatically use the next available port. Check the terminal output for the actual port number.

## 🔒 Security

**Important Security Notes:**

- ✅ `.env.local` is in `.gitignore` - Your API key won't be committed
- ✅ Never share your API key with anyone
- ✅ Never paste your key in public channels or Stack Overflow
- ✅ Regenerate your key immediately if it's exposed
- ✅ Use spending limits in OpenAI dashboard to prevent unexpected charges

## 💰 Cost Information

OpenAI charges for API usage:

- **GPT-3.5-turbo**: ~$0.0005 per 1K input tokens + $0.0015 per 1K output tokens
- **Typical message**: ~50-100 tokens = very small cost
- **Cost per 100 messages**: ~$0.10-0.50 depending on message length

Set spending limits in your [OpenAI dashboard](https://platform.openai.com/account/billing/overview) to avoid unexpected charges.

## 📚 Documentation

For more detailed information, see:

- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [API_KEY_SETUP.md](./API_KEY_SETUP.md) - API key configuration guide
- [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) - Developer guide with code explanations
- [CODE_COMMENTS_REFERENCE.md](./CODE_COMMENTS_REFERENCE.md) - Reference for all code comments

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variable `VITE_OPENAI_API_KEY` in Vercel dashboard.

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

Set environment variable in Netlify dashboard Site Settings → Build & Deploy → Environment.

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## ❓ FAQ

**Q: Can I use a different AI model?**
A: Yes! Change `model: 'gpt-3.5-turbo'` to `model: 'gpt-4'` in `src/OpenAI.jsx`.

**Q: How do I add chat history/memory?**
A: Modify the `messages` array in `App.jsx` to include previous messages in each API request.

**Q: Can I deploy this for free?**
A: Yes! Use Vercel or Netlify for free hosting, but you'll need a paid OpenAI account for the API.

**Q: How do I host the API key securely?**
A: Use environment variables on your hosting platform (Vercel, Netlify, etc.) to store sensitive keys.

---

**Made with ❤️ by [workanand28](https://github.com/workanand28)**

⭐ Star this repository if you found it helpful!
