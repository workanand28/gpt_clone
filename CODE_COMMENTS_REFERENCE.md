/**
 * ====================================================================
 * CHATGPT CLONE - COMPLETE CODE COMMENTS REFERENCE
 * ====================================================================
 * This document explains every commented section of code in the app
 * for future developers to understand the functionality.
 * ====================================================================
 */

// ==================== APP.JSX COMMENTS ====================

/**
 * IMPORTS SECTION
 * ================
 */

// Import React hooks:
// - useState: Manages state variables (input, messages, loading)
// - useRef: Creates ref to DOM element (chatsEndRef for scrolling)
// - useEffect: Runs side effects (auto-scroll when messages change)
import React, { useState, useRef, useEffect } from 'react'

// Import the OpenAI API communication function from OpenAI.jsx
// This function handles sending messages to the OpenAI API
import { sendMsgOpenAI } from './OpenAI'

// Import all visual assets (images and icons)
// gptLogo: ChatGPT branding image
// addBtn: Plus icon for "New Chat" button
// msgIcon: Message icon for quick query suggestions
// homeIcon: Home navigation icon
// saved: Bookmark icon for saved conversations
// upgradeIcon: Rocket icon for upgrade link
// sendIcon: Paper plane icon for send button
// userIcon: User avatar shown on user messages
// gptimg: GPT avatar shown on bot responses
import gptLogo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import homeIcon from './assets/home.svg'
import saved from './assets/bookmark.svg'
import upgradeIcon from './assets/rocket.svg'
import sendIcon from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import gptimg from './assets/chatgptLogo.svg'

// Import CSS stylesheet with all component styling
import './App.css'

/**
 * STATE MANAGEMENT
 * ================
 */

// input: Stores the current text being typed in the input field
// - Updated by onChange event on input element
// - Cleared after sending message
// - Used to show what user is typing
const [input, setInput] = useState('')

// messages: Stores array of all chat messages
// Structure: [
//   { role: 'user', content: 'Hello' },
//   { role: 'bot', content: 'Hi there!' },
//   ...
// ]
// - role: Either 'user' or 'bot' (determines styling and avatar)
// - content: The actual message text
// - Used to display chat history
// - Persists entire conversation
const [messages, setMessages] = useState([])

// loading: Boolean flag indicating if API request is in progress
// - Set to true when sending message
// - Set to false when response received or error occurs
// - Used to:
//   * Show "Thinking..." indicator
//   * Disable input field (prevent multiple requests)
//   * Disable send button
const [loading, setLoading] = useState(false)

// chatsEndRef: React ref to DOM element at end of messages
// - Allows us to scroll to this element automatically
// - useRef persists same reference across re-renders
// - Used in scrollToBottom() function
const chatsEndRef = useRef(null)

/**
 * EFFECT HOOKS
 * ============
 */

// useEffect: Runs scrollToBottom() when messages array changes
// Dependency array [messages] means: "run this when messages changes"
// This ensures new messages are always visible to user
useEffect(() => {
  scrollToBottom()
}, [messages])

/**
 * FUNCTION DEFINITIONS
 * ====================
 */

// scrollToBottom(): Auto-scrolls chat container to show latest message
const scrollToBottom = () => {
  // Optional chaining (?.) handles case where chatsEndRef is null
  // scrollIntoView(): Native DOM method to scroll element into view
  // behavior: 'smooth': Makes scroll animation smooth instead of instant
  chatsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
}

// handleSendMessage(): Main function called when user sends a message
// This is the core business logic of the app
const handleSendMessage = async () => {
  // Validate: Prevent sending empty messages or whitespace-only messages
  // .trim() removes leading/trailing spaces
  // Early return prevents rest of function executing
  if (!input.trim()) return
  
  // Store user's message before clearing input
  // This ensures we have the message even if input is cleared
  const userMessage = input
  
  // Clear the input field for next message
  // User sees empty field ready for next input
  setInput('')
  
  // Add user message to messages array
  // ...prev creates new array with all previous messages
  // [...prev, newMessage] adds new message to end
  // This triggers re-render and displays user message
  setMessages(prev => [...prev, { role: 'user', content: userMessage }])
  
  // Set loading to true to show "Thinking..." indicator
  // This also disables input field and send button
  setLoading(true)

  try {
    // Call OpenAI API with the user's message
    // await: Waits for response from API (could take 1-5 seconds)
    // res: Contains AI's response text
    const res = await sendMsgOpenAI(userMessage)
    
    // Add bot's response to messages array
    // This displays the AI's answer in the chat
    setMessages(prev => [...prev, { role: 'bot', content: res }])
  } catch (error) {
    // Catch any errors that occur during API call
    console.error('Error:', error)
    
    // Show user-friendly error message instead of technical error
    // User sees "Sorry, there was an error..." in chat
    setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, there was an error processing your message.' }])
  } finally {
    // Finally block runs regardless of success or failure
    // Stop loading indicator to show conversation is complete
    // Enables input field and send button for next message
    setLoading(false)
  }
}

// handleKeyPress(): Allows sending message with Enter key
// Called whenever user presses a key in the input field
const handleKeyPress = (e) => {
  // Check two conditions:
  // 1. e.key === 'Enter': Enter key was pressed
  // 2. !e.shiftKey: Shift key was NOT held down
  // This allows Shift+Enter for multiline input in future
  if (e.key === 'Enter' && !e.shiftKey) {
    // Prevent default behavior (prevents newline being added)
    e.preventDefault()
    
    // Send the message (same as clicking send button)
    handleSendMessage()
  }
}

/**
 * JSX RETURN (RENDER)
 * ===================
 */

// Main App container uses flexbox layout
// Child 1: Sidebar (25rem width, fixed)
// Child 2: Main content (takes remaining space)
<div className='App'>

  {/* SIDEBAR: Left navigation panel */}
  <div className="sidebar">
    
    {/* Upper sidebar: Logo, brand name, new chat button, quick queries */}
    <div className="upperSide">
      
      {/* Top section: ChatGPT logo and brand */}
      <div className="upperSideTop">
        <img className='logo' src={gptLogo} alt="ChatGPT Logo" />
        <span className='brand'>ChatGPT</span>
        
        {/* New Chat button: Starts fresh conversation */}
        <button className='midBtn'> 
          <img className='addBtn' src={addBtn} alt="Add" />
          New Chat
        </button>
      </div>
      
      {/* Quick query suggestions */}
      {/* These are example buttons showing common questions */}
      {/* In future, these could populate the input field on click */}
      <div className="upperSideBottom">
        <button className="query">
          <img src={msgIcon} alt="Message" />
          What is Programming ?
        </button>
        <button className="query">
          <img src={msgIcon} alt="Message" />
          What is Programming ?
        </button>
      </div>
    </div>
    
    {/* Lower sidebar: Navigation links */}
    <div className="lowerSide">
      {/* Home link */}
      <div className="listItems">
        <img src={homeIcon} alt="Home" className="listitemImg" /> 
        Home
      </div>

      {/* Saved conversations link */}
      <div className="listItems">
        <img src={saved} alt="Saved" className="listitemImg" /> 
        Saved
      </div>

      {/* Upgrade to premium link */}
      <div className="listItems">
        <img src={upgradeIcon} alt="Upgrade" className="listitemImg" /> 
        Upgrade to pro
      </div>
    </div>
  </div>
  
  {/* MAIN CONTENT: Chat area */}
  <div className="main">
    
    {/* Chat messages container: Scrollable area for all messages */}
    <div className="chats">
      
      {/* Conditional rendering: Show welcome message if NO messages */}
      {messages.length === 0 ? (
        <div className="chat" style={{ justifyContent: 'center', marginTop: '10rem' }}>
          <p className="txt">Start a conversation by typing a message below...</p>
        </div>
      ) : (
        // Map through all messages and display each one
        // .map(): Creates array of JSX elements, one for each message
        // index: Position in array (used as key - not ideal but works for demo)
        messages.map((msg, index) => (
          // Message container: Different styles for user vs bot
          // className includes conditional 'bot' class based on sender
          // 'bot' class: Adds background color and different styling
          <div key={index} className={`chat ${msg.role === 'bot' ? 'bot' : ''}`}>
            
            // Display correct avatar based on message sender
            // Ternary operator: user message = userIcon, bot = gptimg
            <img 
              className='chatimg' 
              src={msg.role === 'user' ? userIcon : gptimg} 
              alt={msg.role === 'user' ? 'User' : 'ChatGPT'} 
            />
            
            // Display the actual message text
            <p className="txt">{msg.content}</p>
          </div>
        ))
      )}
      
      // Loading indicator: Shows while waiting for API response
      // Only renders if loading state is true
      // Shows "Thinking..." so user knows app is processing
      {loading && (
        <div className="chat bot">
          <img className='chatimg' src={gptimg} alt="ChatGPT" />
          <p className="txt">Thinking...</p>
        </div>
      )}
      
      // Ref element: Not visible but used for auto-scrolling
      // Place this at end of messages list
      // scrollToBottom() scrolls to this element
      // This ensures new messages are always visible
      <div ref={chatsEndRef} />
    </div>
    
    {/* Footer: Input area and disclaimer */}
    <div className="chatFooter">
      
      {/* Input container with text input and send button */}
      <div className='inp'>
        
        {/* Text input field for typing messages */}
        <input 
          type="text" 
          placeholder='Type your message here...' 
          
          // Controlled input: Value always matches state
          // React controls what's displayed in input
          value={input}
          
          // onChange: Called every time user types a character
          // Updates input state with new value
          // (e) => setInput(e.target.value): Extract new value from input
          onChange={(e) => setInput(e.target.value)}
          
          // onKeyPress: Called when user presses a key
          // Allows sending message with Enter key
          onKeyPress={handleKeyPress}
          
          // disabled: When true, input field is grayed out and non-functional
          // Set to true while loading (prevents multiple requests)
          disabled={loading}
        />
        
        {/* Send button */}
        <button 
          className='sendBtn' 
          
          // onClick: Called when button is clicked
          // Sends the message and updates chat
          onClick={handleSendMessage}
          
          // disabled: Grays out button while loading
          // Prevents user from sending multiple messages rapidly
          disabled={loading}
          
          // title: Shows tooltip on hover
          // Tells user they can use Enter to send
          title="Send message (Enter)"
        >
          <img src={sendIcon} alt="Send" />
        </button>
      </div>
      
      {/* Disclaimer text at bottom of chat */}
      <p>ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT January 11 Version</p>
    </div>
  </div>
</div>

/**
 * EXPORT
 * ======
 */
// Export this component as default export
// Allows main.jsx to import and render it
// export default App makes it the primary export of this file


// ==================== OPENAI.JSX COMMENTS ====================

/**
 * API Configuration
 * =================
 */

// Get API key from environment variables
// import.meta.env.VITE_OPENAI_API_KEY: Vite's way to access .env.local
// Fallback: If not set, uses placeholder (will error when used)
// This approach keeps API key out of source code (security)
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || 'your-api-key-here'

// OpenAI's chat completions endpoint
// This is the API URL for GPT models
// We send POST requests to this URL with messages
const API_URL = 'https://api.openai.com/v1/chat/completions'

/**
 * Main API Function
 * =================
 */

// async: This function returns a Promise (asynchronous)
// Allows using 'await' inside and calling with 'await' outside
// message: The user's message to send to the AI
export async function sendMsgOpenAI(message) {
  
  // Validation: Check API key is properly configured
  // If missing or still placeholder value, throw error
  if (!API_KEY || API_KEY === 'your-api-key-here') {
    throw new Error('Please set your OpenAI API key in environment variables (VITE_OPENAI_API_KEY)')
  }

  try {
    // Fetch: Modern API for making HTTP requests
    // Replaces older XMLHttpRequest approach
    // fetch(URL, options): Returns a Promise that resolves to Response
    const response = await fetch(API_URL, {
      
      // method: 'POST' - We're sending data (not just retrieving)
      // POST requests typically modify or create data
      method: 'POST',
      
      // headers: Tell the server how to interpret our data
      headers: {
        // 'Content-Type': 'application/json' - We're sending JSON format
        'Content-Type': 'application/json',
        
        // 'Authorization': `Bearer ${API_KEY}` - Include API key for authentication
        // Bearer: Standard way to send API keys
        // ${API_KEY}: Interpolate actual key value using template literal
        'Authorization': `Bearer ${API_KEY}`
      },
      
      // body: The actual data we're sending
      // JSON.stringify(): Convert JavaScript object to JSON string
      body: JSON.stringify({
        
        // model: Which AI model to use
        // 'gpt-3.5-turbo': Fast, efficient, good quality
        // Other options: gpt-4 (more powerful), gpt-4-turbo (faster gpt-4)
        model: 'gpt-3.5-turbo',
        
        // messages: Array of all messages in conversation
        // Each message has a 'role' (system/user/assistant) and 'content'
        // API uses this history to maintain context
        messages: [
          {
            // role: 'user' indicates this is the user's message
            // (could also be 'system' for instructions or 'assistant' for AI)
            role: 'user',
            
            // content: The actual message text
            content: message
          }
        ],
        
        // max_tokens: Maximum length of response (in tokens, not characters)
        // Roughly: 1 token ≈ 4 characters or 1 word
        // 256 tokens ≈ 1024 characters or 256 words
        // Limiting prevents extremely long responses (and cost)
        max_tokens: 256,
        
        // temperature: Controls randomness/creativity of responses
        // Range: 0 to 2
        // 0: Deterministic (always same response for same input)
        // 0.7: Balanced (some variation but coherent)
        // 1.0: More creative
        // 2.0: Very creative/random (might be less accurate)
        // We use 0.7 for good balance of creativity and accuracy
        temperature: 0.7,
        
        // top_p: Nucleus sampling parameter
        // Range: 0 to 1
        // 1: Consider all tokens (default)
        // Lower values: More conservative (only best tokens considered)
        // We use 1 to allow full range of responses
        top_p: 1,
        
        // frequency_penalty: Penalize repeating words
        // Range: -2 to 2
        // 0: No penalty (default)
        // Positive: Discourage repetition
        // Negative: Encourage repetition
        frequency_penalty: 0,
        
        // presence_penalty: Penalize introducing new topics
        // Range: -2 to 2
        // 0: No penalty (default)
        // Similar to frequency_penalty but for new words
        presence_penalty: 0
      })
    })

    // Check if HTTP request was successful
    // response.ok: true if status 200-299, false otherwise
    // Could be false if API error, authentication failed, etc.
    if (!response.ok) {
      
      // Error response from API: Parse as JSON
      // API provides error details in response body
      const error = await response.json()
      
      // Throw error with message from API or generic fallback
      // error.error?.message: Optional chaining - only access if exists
      // This provides helpful error message to caller
      throw new Error(error.error?.message || 'API request failed')
    }

    // Parse successful response
    // await response.json(): Read response body and parse as JSON
    // Returns JavaScript object/array
    const data = await response.json()
    
    // Return the AI's message from the response
    // data.choices: Array of possible completions (usually length 1)
    // [0]: First choice (we only ask for 1)
    // .message.content: The actual message text from AI
    return data.choices[0].message.content
    
  } catch (error) {
    // Catch and handle any errors
    // Could be network error, API error, parsing error, etc.
    
    // Log error for debugging
    // console.error: Logs to browser console with error styling
    console.error('OpenAI API Error:', error)
    
    // Re-throw error so calling code (App.jsx) can handle it
    // This allows App.jsx to display error message to user
    throw error
  }
}


// ==================== CSS COMMENTS ====================

/**
 * GLOBAL STYLES - Applied to entire page
 */

// Reset all default browser margins and padding
// Ensures consistent styling across all browsers
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box; // Include padding in width calculation
}

// Set base font size for rem unit scaling
// 1rem = 10px (makes math easier)
// 1.6rem = 16px, 2.4rem = 24px, etc.
html{
  font-size: 62.5%;
}

// Global body styling - dark theme
body{
  background-color: rgb(3,0,31); // Very dark purple
  color: white; // Default text color
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; // Font choices
  font-size: 1.6rem; // Base text size (16px)
}

/**
 * MAIN APP LAYOUT - Flexbox structure
 */

// Main container - full viewport height, flex layout
.App{
  min-height: 100vh; // At least full screen height
  display: flex; // Side-by-side layout: sidebar + main
}

/**
 * SIDEBAR - Left navigation panel
 */

// Sidebar container: Fixed width on left side
.sidebar{
  width: 25rem; // 250px (fixed width)
  background-color: rgb(12,12,46); // Dark blue-purple
  padding: 2rem; // Internal spacing
  border-right: 1px solid white; // Right border
}

// Upper section of sidebar with actions
.upperSide{
  display: flex; // Stack items vertically
  flex-direction: column; // Vertical stacking
  padding: 2.5rem; // Internal padding
  border-bottom: 1px solid rgb(100, 100, 100); // Divider line
  height: 70%; // Takes 70% of sidebar
}

// Logo image styling
.logo{
  margin-right: 1rem; // Space between logo and text
}

// Brand name text styling
.brand{
  color: rgb(0, 255, 255); // Bright cyan color
  font-size: 2.4rem; // Large heading size
}

// "New Chat" button - purple accent color
.midBtn{
  background-color: #5a4bff; // Purple
  color: white; // White text
  padding: 1rem 2rem; // Internal spacing
  border: none; // No border
  cursor: pointer; // Clickable cursor
  border-radius: 0.5rem; // Slightly rounded corners
  width: 18rem; // Fixed 180px width
  display: flex; // Icon + text side by side
  align-items: center; // Center items vertically
  justify-content: center; // Center horizontally
  margin-top: 4rem; // Space above button
  margin-bottom: 3rem; // Space below button
}

// Quick query suggestion buttons
.query{
  background: transparent; // No background
  border: 1px solid white; // White outline
  color: white; // White text
  padding: 1.5rem; // Internal padding
  cursor: pointer; // Clickable cursor
  border-radius: 0.5rem; // Rounded corners
  width: 18rem; // Fixed width
  display: flex; // Icon + text layout
  align-items: center; // Center items
  justify-content: center; // Center horizontally
  margin-bottom: 2rem; // Space between buttons
  gap: 1rem; // Space between icon and text
  font-size: 1.1rem; // Small text
}

// Navigation links at bottom of sidebar
.lowerSide{
  display: flex; // Stack vertically
  flex-direction: column; // Vertical stacking
  gap: 2rem; // Space between items
  margin-top: 4rem; // Space from top
}

// Individual navigation items
.listItems{
  display: flex; // Icon + text side by side
  align-items: center; // Center items
  gap: 1.5rem; // Space between icon and text
  cursor: pointer; // Clickable cursor
}

/**
 * MAIN CONTENT AREA - Chat display and input
 */

// Main content container: Right side of app
.main{
  flex: 1; // Takes remaining space after sidebar
  display: flex; // Stack items vertically
  flex-direction: column; // Vertical stacking
  align-items: center; // Center content
  padding: 2rem; // Internal padding
  margin: 6rem 10rem; // External margins
}

// Chat messages scrollable container
.chats{
  width: 100%; // Full available width
  max-width: 70rem; // Max 700px for readability
  height: calc(100vh - 26rem); // Full height minus header/footer
  overflow-y: scroll; // Vertical scroll when content overflows
  overflow-x: hidden; // No horizontal scroll
  scroll-behavior: smooth; // Smooth scroll animation
}

// Individual chat message styling
.chat{
  display: flex; // Icon + text layout
  align-items: flex-start; // Align to top
  margin: 1rem; // Space around message
  padding: 2rem 3rem; // Internal spacing
  font-size: 1.2rem; // Text size
  text-align: justify; // Justified text alignment
}

// Chat avatar images
.chatimg{
  width: 3rem; // Avatar size
  margin: 2rem; // Space around avatar
  border-radius: 2.5rem; // Circular (2.5rem = 25px, larger than width)
  object-fit: cover; // Maintain aspect ratio
}

// Bot messages styling - different from user messages
.bot{
  background-color: rgb(12,12,46); // Dark background
  border-radius: 1rem 1rem 1rem 0; // Rounded corners (not bottom-left)
  width: fit-content; // Only as wide as content
}

/**
 * INPUT FOOTER SECTION
 */

// Footer container with input field
.chatFooter{
  width: 100%; // Full width
  display: flex; // Stack items
  flex-direction: column; // Vertically
  align-items: center; // Center items
  justify-content: center; // Center vertically
  gap: 1rem; // Space between elements
  margin-top: auto; // Push to bottom
}

// Input field container
.inp{
  width: 100%; // Full width
  max-width: 70rem; // Max 700px
  padding: 0.5rem; // Internal padding
  background: rgba(222, 222, 222, 0.1); // Subtle gray background
  display: flex; // Icon + text layout
  align-items: center; // Center items
  gap: 1rem; // Space between input and button
  border-radius: 0.5rem; // Rounded corners
}

// Text input field inside .inp
.inp>input{
  width: 100%; // Take all available space
  height: 4rem; // 40px height
  padding: 0 1rem; // Horizontal padding
  background: transparent; // No background
  border: none; // No border
  color: white; // White text
  font-size: 1.6rem; // Text size
  outline: none; // No outline when focused
}

// Send button styling
.sendBtn{
  background: transparent; // No background
  border: none; // No border
  cursor: pointer; // Clickable cursor
  display: flex; // Flex layout
  align-items: center; // Center items
  justify-content: center; // Center horizontally
  padding: 0.5rem; // Internal padding
}

// Send button when disabled (loading state)
.sendBtn:disabled{
  opacity: 0.5; // Semi-transparent (grayed out)
  cursor: not-allowed; // Show not-allowed cursor
}

// Send button icon sizing
.sendBtn img{
  height: 2rem; // Icon size
  width: 2rem; // Icon size
}

// Disclaimer text at bottom
.chatFooter>p{
  font-size: 1.2rem; // Small text
  color: rgb(180, 180, 180); // Gray color
  margin: 2rem 0; // Top and bottom margin
}

/**
 * ====================================================================
 * END OF CODE COMMENTS REFERENCE
 * ====================================================================
 * Use this document to understand:
 * - What each line of code does
 * - Why it's written that way
 * - How components interact
 * - Where to modify for new features
 * 
 * Every functional code section has a detailed comment explaining it.
 * ====================================================================
 */
