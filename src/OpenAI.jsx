/**
 * OpenAI API Integration Module
 * Handles all communication with OpenAI's GPT API
 * Uses Fetch API to send messages and receive responses
 */

// Get API key from environment variables (set in .env.local file)
// Falls back to 'your-api-key-here' if not set (will throw error when used)
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || 'your-api-key-here'

// OpenAI API endpoint for chat completions (GPT models)
const API_URL = 'https://api.openai.com/v1/chat/completions'

/**
 * Sends a message to OpenAI's GPT-3.5-turbo model and receives a response
 * 
 * @param {string} message - The user's message to send to the AI
 * @returns {Promise<string>} - The AI's response text
 * @throws {Error} - Throws error if API key is missing or API request fails
 */
export async function sendMsgOpenAI(message) {
  // Validate that API key is configured and not the placeholder value
  if (!API_KEY || API_KEY === 'your-api-key-here') {
    console.error('API Key Error: VITE_OPENAI_API_KEY not set in .env.local')
    throw new Error('Please set your OpenAI API key in environment variables (VITE_OPENAI_API_KEY)')
  }

  try {
    // Log API call for debugging (shows message is being sent)
    console.log('Sending message to OpenAI API:', message)
    console.log('Using API Key:', API_KEY.substring(0, 20) + '...')

    // Make POST request to OpenAI API
    const response = await fetch(API_URL, {
      method: 'POST', // HTTP method for sending data
      headers: {
        'Content-Type': 'application/json', // Specify we're sending JSON
        'Authorization': `Bearer ${API_KEY}` // Include API key in header for authentication
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Use GPT-3.5-turbo model (fast and cost-effective)
        messages: [
          {
            role: 'user', // Specify this is a user message
            content: message // The actual message content
          }
        ],
        // Optional parameters to control response behavior
        max_tokens: 256, // Limit response length to 256 tokens
        temperature: 0.7, // Control creativity (0-2: 0=deterministic, 1=balanced, 2=creative)
        top_p: 1, // Use nucleus sampling with 100% threshold
        frequency_penalty: 0, // No penalty for repeating words
        presence_penalty: 0 // No penalty for introducing new topics
      })
    })

    // Check if the API request was successful (status 200-299)
    if (!response.ok) {
      // Parse error response from OpenAI API
      const error = await response.json()
      // Log detailed error information for debugging
      console.error('OpenAI API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        error: error
      })
      console.error('Full Error Details:', JSON.stringify(error, null, 2))
      // Throw error with message from API or generic fallback
      throw new Error(error.error?.message || `API request failed with status ${response.status}: ${response.statusText}`)
    }

    // Parse successful response as JSON
    const data = await response.json()
    
    // Log successful response for debugging
    console.log('API Response received:', data)
    
    // Extract and return the AI's message from the response
    // Response structure: data.choices[0].message.content
    return data.choices[0].message.content
  } catch (error) {
    // Log error to console for debugging
    console.error('OpenAI API Error caught:', error)
    console.error('Error Type:', error.name)
    console.error('Error Message:', error.message)
    // Re-throw error so calling code can handle it
    throw error
  }
}