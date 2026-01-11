# ChatGPT Clone - Developer Documentation

## Overview
This is a fully functional ChatGPT clone built with React and Vite. It communicates with OpenAI's GPT-3.5-turbo API to provide real-time chat responses.

---

## 🏗️ Architecture & Code Structure

### Project Structure
```
chat-gpt/
├── src/
│   ├── App.jsx           # Main component with chat logic and UI
│   ├── App.css           # Styling with comprehensive comments
│   ├── OpenAI.jsx        # API communication module
│   ├── main.jsx          # Application entry point
│   ├── index.css         # Global styles
│   └── assets/           # Images and icons
├── .env.local            # Environment variables (API key)
├── vite.config.js        # Vite build configuration
└── package.json          # Dependencies and scripts
```

---

## 📝 Code Documentation

### App.jsx - Main Component

**Key State Variables:**
- `input` - Current text in the input field
- `messages` - Array of all chat messages with {role, content}
- `loading` - Boolean indicating if API request is in progress
- `chatsEndRef` - Ref to auto-scroll to latest messages

**Key Functions:**

#### scrollToBottom()
```javascript
const scrollToBottom = () => {
  chatsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
};
```
- Scrolls the chat container to show the latest message
- Uses the ref `chatsEndRef` placed at the end of messages
- Called via useEffect whenever messages array changes

#### handleSendMessage()
```javascript
const handleSendMessage = async () => {
  if (!input.trim()) return; // Prevent empty messages
  
  const userMessage = input;
  setInput(''); // Clear input field
  
  // Add user message to chat
  setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
  
  setLoading(true); // Show loading indicator
  
  try {
    const res = await sendMsgOpenAI(userMessage); // Call OpenAI API
    setMessages(prev => [...prev, { role: 'bot', content: res }]); // Add response
  } catch (error) {
    console.error('Error:', error);
    // Show error message in chat
    setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, there was an error...' }]);
  } finally {
    setLoading(false); // Stop loading indicator
  }
};
```
**Flow:**
1. Check if input is not empty
2. Store message and clear input field
3. Add user message to chat
4. Set loading state to true
5. Send to OpenAI API
6. Add bot response to chat
7. Handle errors gracefully
8. Stop loading state

#### handleKeyPress()
```javascript
const handleKeyPress = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
};
```
**Purpose:** Allows sending messages with Enter key without creating new lines

---

### OpenAI.jsx - API Integration

**Constants:**
```javascript
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || 'your-api-key-here';
const API_URL = 'https://api.openai.com/v1/chat/completions';
```
- `API_KEY` - Retrieved from environment variables
- `API_URL` - OpenAI's chat completion endpoint

**Function: sendMsgOpenAI(message)**

```javascript
export async function sendMsgOpenAI(message) {
  // 1. Validate API key exists
  if (!API_KEY || API_KEY === 'your-api-key-here') {
    throw new Error('Please set your OpenAI API key...');
  }

  try {
    // 2. Make API request
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 256,
        temperature: 0.7,
        // ... other parameters
      })
    });

    // 3. Check for API errors
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API request failed');
    }

    // 4. Parse and return response
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}
```

**Parameters Explained:**
- `model: 'gpt-3.5-turbo'` - Fast and cost-effective GPT model
- `max_tokens: 256` - Limit response length
- `temperature: 0.7` - Creativity level (0=deterministic, 1=balanced, 2=creative)
- `top_p: 1` - Use all tokens with full probability
- `frequency_penalty: 0` - No penalty for repeating tokens
- `presence_penalty: 0` - No penalty for new tokens

---

## 🎨 CSS Organization

All CSS is organized into 5 main sections with comments:

### 1. Global Styles & Reset
- Default margins/padding reset
- Font size scaling
- Body styling

### 2. Main App Layout
- Flexbox structure for sidebar + main content

### 3. Sidebar Section
- Logo and branding
- Navigation buttons
- Quick query suggestions

### 4. Main Content Area
- Chat display container
- Message styling

### 5. Chat Input Footer
- Input field styling
- Send button styling
- Disabled states

---

## 🔧 Setup Instructions

### 1. Environment Setup
Create `.env.local` file:
```
VITE_OPENAI_API_KEY=sk-proj-xxxxx
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Development Server
```bash
npm run dev
```
- Opens at `http://localhost:5173`
- Hot module reloading enabled

### 4. Build for Production
```bash
npm run build
```
- Creates optimized build in `dist/` folder

---

## 🐛 How Bugs Were Fixed

### Bug 1: Click Handler on Wrong Element
**Issue:** onClick was on input field instead of send button
**Fix:** Moved onClick to button element, onKeyPress to input

### Bug 2: No Message Display
**Issue:** Messages weren't being stored or displayed
**Fix:** Added messages state array and map to render them

### Bug 3: Deprecated OpenAI API
**Issue:** Using old text-davinci-003 model with require() imports
**Fix:** Updated to gpt-3.5-turbo with modern fetch API

### Bug 4: Exposed API Key
**Issue:** Hardcoded API key in source code
**Fix:** Moved to environment variables in .env.local

### Bug 5: Input Width Issue
**Issue:** Fixed input width (80rem) breaking on smaller screens
**Fix:** Changed to width: 100% with max-width

### Bug 6: No Loading Indicator
**Issue:** No feedback while waiting for API response
**Fix:** Added loading state and "Thinking..." message

### Bug 7: No Auto-scroll
**Issue:** Messages not visible at bottom when added
**Fix:** Added ref-based scrolling in useEffect

---

## 🚀 Features Implemented

✅ Real-time chat with GPT-3.5-turbo
✅ Message history display
✅ Auto-scroll to latest messages
✅ Loading indicators
✅ Error handling with user feedback
✅ Enter key to send messages
✅ Disabled state while loading
✅ User and bot avatars
✅ Responsive design
✅ Dark theme UI
✅ Security (API key in environment)

---

## 🔐 Security Best Practices

1. **API Key Protection**
   - Stored in .env.local (not committed to Git)
   - Never logged or exposed to browser console

2. **Environment Variables**
   - Used Vite's `import.meta.env` for access
   - Fallback check if key is missing

3. **Error Handling**
   - API errors caught and handled gracefully
   - User-friendly error messages displayed

4. **Input Validation**
   - Empty input prevented before sending
   - Trim whitespace from input

---

## 📚 How to Extend/Modify

### Add New Features:

1. **Conversation History**
   - Save messages to localStorage
   - Add load/clear history buttons

2. **Different Models**
   - Change `model: 'gpt-3.5-turbo'` in OpenAI.jsx
   - Options: gpt-4, gpt-4-turbo, etc.

3. **System Prompts**
   - Add system message to guide AI behavior
   - Example:
   ```javascript
   messages: [
     { role: 'system', content: 'You are a helpful assistant' },
     { role: 'user', content: message }
   ]
   ```

4. **Voice Input/Output**
   - Integrate speech recognition API
   - Add text-to-speech for responses

5. **User Accounts**
   - Add authentication system
   - Save chat histories per user

---

## 🧪 Testing Checklist

- [ ] Test sending messages
- [ ] Test Enter key functionality
- [ ] Test error handling (invalid API key)
- [ ] Test loading state
- [ ] Test message display
- [ ] Test auto-scroll
- [ ] Test empty input prevention
- [ ] Test Shift+Enter for new lines (future)
- [ ] Test on mobile (responsive)
- [ ] Test with long messages

---

## 📞 Troubleshooting

### Issue: "API key is not set"
**Solution:** Check .env.local exists and VITE_OPENAI_API_KEY is set

### Issue: No response from API
**Solution:** 
- Verify API key is valid
- Check OpenAI account has credits
- Check internet connection

### Issue: Messages not scrolling
**Solution:** Verify chatsEndRef is properly attached to div

### Issue: Input field not working
**Solution:** Check input element is not disabled (loading state)

---

## 📖 Code Comments Reference

Every major section of code includes:
- Purpose of the code
- What it does
- Why it's needed
- How it works

This makes it easy for future developers to:
- Understand the logic flow
- Make modifications
- Debug issues
- Add new features

---

## 📦 Dependencies

- **React 19.2.0** - UI framework
- **Vite 7.2.4** - Build tool and dev server
- **Fetch API** - For making HTTP requests (built-in)

---

## 🎯 Performance Optimization

1. **Code Splitting** - Handled by Vite automatically
2. **Lazy Loading** - Assets loaded on demand
3. **Smooth Scrolling** - CSS scroll-behavior: smooth
4. **Optimized Re-renders** - React manages component updates
5. **CSS Organization** - Minimal CSS, well-structured

---

Generated: January 11, 2026
Last Updated: ChatGPT Clone v1.0
