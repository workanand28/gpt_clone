// Import React hooks for state management, refs, and side effects
import React, { useState, useRef, useEffect } from 'react'
// Import the OpenAI API communication function
import { sendMsgOpenAI } from './OpenAI'

// Import all SVG and image assets used in the UI
import gptLogo from './assets/chatgpt.svg' // ChatGPT logo for sidebar
import addBtn from './assets/add-30.png' // New chat button icon
import msgIcon from './assets/message.svg' // Message icon for quick queries
import homeIcon from './assets/home.svg' // Home navigation icon
import saved from './assets/bookmark.svg' // Saved chats icon
import upgradeIcon from './assets/rocket.svg' // Upgrade to pro icon
import sendIcon from './assets/send.svg' // Send message button icon
import userIcon from './assets/user-icon.png' // User avatar for chat messages
import gptimg from './assets/chatgptLogo.svg' // GPT avatar for bot responses

// Import component styles
import './App.css'

/**
 * Main App Component - ChatGPT Clone Application
 * Handles chat interface, message management, and API communication
 */
function App() {
  // State for user input in the text field
  const [input, setInput] = useState('')
  
  // State for storing all chat messages - array of {role: 'user'|'bot', content: string}
  const [messages, setMessages] = useState([])
  
  // State to track if API request is in progress (shows loading indicator)
  const [loading, setLoading] = useState(false)
  
  // Ref to the end of chat container for auto-scrolling to latest messages
  const chatsEndRef = useRef(null)

  /**
   * Auto-scrolls the chat container to the bottom to show the latest message
   * Called whenever a new message is added to the chat
   */
  const scrollToBottom = () => {
    chatsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  /**
   * Effect hook that triggers scrollToBottom whenever messages array changes
   * Ensures new messages are always visible to the user
   */
  useEffect(() => {
    scrollToBottom()
  }, [messages]) // Dependency array: run effect when messages changes

  /**
   * Handles sending a message to the OpenAI API
   * 1. Validates input is not empty
   * 2. Adds user message to chat
   * 3. Sends message to OpenAI API
   * 4. Adds bot response to chat
   * 5. Handles errors gracefully
   */
  const handleSendMessage = async () => {
    // Prevent sending empty messages
    if (!input.trim()) return
    
    // Store the user's message before clearing input
    const userMessage = input
    
    // Clear input field for next message
    setInput('')
    
    // Add user message to chat history with 'user' role
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    
    // Set loading state to show loading indicator
    setLoading(true)

    try {
      // Send message to OpenAI API and wait for response
      const res = await sendMsgOpenAI(userMessage)
      
      // Add bot response to chat history with 'bot' role
      setMessages(prev => [...prev, { role: 'bot', content: res }])
    } catch (error) {
      // Log error for debugging
      console.error('Error:', error)
      
      // Add error message to chat history so user knows something went wrong
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, there was an error processing your message.' }])
    } finally {
      // Always stop loading indicator whether success or failure
      setLoading(false)
    }
  }

  /**
   * Handles keyboard input for sending messages
   * Allows user to press Enter to send (but Shift+Enter creates new line if needed)
   * @param {KeyboardEvent} e - The keyboard event
   */
  const handleKeyPress = (e) => {
    // Check if Enter key was pressed and Shift was not held down
    if (e.key === 'Enter' && !e.shiftKey) {
      // Prevent default Enter behavior (adding newline)
      e.preventDefault()
      // Send the message
      handleSendMessage()
    }
  }
  
  return (
    <div className='App'>
      <div className="sidebar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img className='logo' src={gptLogo} alt="ChatGPT Logo" />
            <span className='brand'>ChatGPT</span>
            <button className='midBtn'> 
              <img className='addBtn' src={addBtn} alt="Add" />
              New Chat
            </button>
          </div>
          
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
        
        <div className="lowerSide">
          <div className="listItems">
            <img src={homeIcon} alt="Home" className="listitemImg" /> 
            Home
          </div>

          <div className="listItems">
            <img src={saved} alt="Saved" className="listitemImg" /> 
            Saved
          </div>

          <div className="listItems">
            <img src={upgradeIcon} alt="Upgrade" className="listitemImg" /> 
            Upgrade to pro
          </div>
        </div>
      </div>
      
      <div className="main">
        <div className="chats">
          {messages.length === 0 ? (
            <div className="chat" style={{ justifyContent: 'center', marginTop: '10rem' }}>
              <p className="txt">Start a conversation by typing a message below...</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`chat ${msg.role === 'bot' ? 'bot' : ''}`}>
                <img 
                  className='chatimg' 
                  src={msg.role === 'user' ? userIcon : gptimg} 
                  alt={msg.role === 'user' ? 'User' : 'ChatGPT'} 
                />
                <p className="txt">{msg.content}</p>
              </div>
            ))
          )}
          
          {loading && (
            <div className="chat bot">
              <img className='chatimg' src={gptimg} alt="ChatGPT" />
              <p className="txt">Thinking...</p>
            </div>
          )}
          
          <div ref={chatsEndRef} />
        </div>
        
        <div className="chatFooter">
          <div className='inp'>
            <input 
              type="text" 
              placeholder='Type your message here...' 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            
            <button 
              className='sendBtn' 
              onClick={handleSendMessage}
              disabled={loading}
              title="Send message (Enter)"
            >
              <img src={sendIcon} alt="Send" />
            </button>
          </div>
          
          <p>ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT January 11 Version</p>
        </div>
      </div>
    </div>
  )
}

// Export the App component as the default export for use in main.jsx
export default App