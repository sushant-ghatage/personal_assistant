# Personal Assistant Chatbot

A modern, responsive chatbot application built with Flask backend and React frontend, powered by local Ollama models.

## Features

- 🤖 **AI-Powered Chat**: Connect to any Ollama model for intelligent conversations
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 👤 **User Avatars**: Visual distinction between user and bot messages
- 💬 **Chat History**: Persistent conversation history with timestamps
- ⚡ **Typing Indicator**: Real-time feedback when the bot is responding
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🗑️ **Clear Chat**: Easy way to start fresh conversations
- 🔄 **Auto-scroll**: Automatically scrolls to latest messages

## Prerequisites

- Python 3.8+
- Node.js 16+
- Ollama installed and running locally

## Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd personal_assitance
```

### 2. Set up the backend
```bash
# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install flask flask-cors requests
```

### 3. Set up the frontend
```bash
cd frontend
npm install --legacy-peer-deps
```

## Configuration

### Backend Configuration
Edit `backend.py` to customize:
- **Ollama Model**: Change `OLLAMA_MODEL` to your preferred model (default: "llama3")
- **API Endpoint**: Modify `OLLAMA_API_URL` if Ollama runs on a different port
- **Server Port**: Change the port in `app.run()` if needed

### Frontend Configuration
The frontend automatically connects to `http://localhost:5001`. If your backend runs on a different port, update the fetch URL in `frontend/src/App.js`.

## Running the Application

### 1. Start Ollama
Make sure Ollama is running and your preferred model is available:
```bash
ollama serve
# In another terminal, pull your model:
ollama pull llama3
```

### 2. Start the backend
```bash
# From the project root
source venv/bin/activate
python backend.py
```
The Flask server will start on `http://localhost:5001`

### 3. Start the frontend
```bash
cd frontend
npm start
```
The React app will open on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Start chatting with your AI assistant!
3. Use the dark mode toggle (☀️/🌙) to switch themes
4. Click the trash icon (🗑️) to clear chat history

## Project Structure

```
personal_assitance/
├── backend.py              # Flask backend server
├── venv/                   # Python virtual environment
├── frontend/               # React frontend
│   ├── src/
│   │   ├── App.js         # Main chat component
│   │   ├── App.css        # Chat UI styles
│   │   └── index.css      # Global styles
│   └── package.json
└── README.md
```

## Customization

### Adding New Features
- **Sound Notifications**: Add audio feedback for new messages
- **Markdown Support**: Render formatted text in bot responses
- **File Upload**: Allow users to share images or documents
- **Voice Input**: Add speech-to-text functionality
- **Export Chat**: Save conversations as text or PDF

### Styling
- Modify `frontend/src/App.css` to customize the chat interface
- Update avatar URLs in `App.js` for different user/bot images
- Adjust color schemes for light/dark modes

### Backend Enhancements
- Add conversation context management
- Implement streaming responses
- Add support for multiple Ollama models
- Include conversation analytics

## Troubleshooting

### Common Issues

1. **Backend Connection Error**
   - Ensure Ollama is running: `ollama serve`
   - Check if the model is available: `ollama list`
   - Verify the API endpoint in `backend.py`

2. **Frontend Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install --legacy-peer-deps`
   - Update Node.js to a compatible version

3. **CORS Issues**
   - The backend includes CORS support, but if you encounter issues, check the CORS configuration in `backend.py`

### Debug Mode
- Backend: Set `debug=True` in `app.run()` for detailed error messages
- Frontend: Use browser developer tools to inspect network requests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Flask](https://flask.palletsprojects.com/) and [React](https://reactjs.org/)
- Powered by [Ollama](https://ollama.ai/) for local AI models
- UI inspired by modern chat applications 

---

### 1. Is the Backend Running?

- Make sure you have started the backend server:
  ```bash
  source venv/bin/activate
  python backend.py
  ```
- The backend should be running on http://localhost:5001 by default.

---

### 2. Is Ollama Running?

- The backend depends on Ollama. Make sure Ollama is running:
  ```bash
  ollama serve
  ```
- Also, ensure your model is available:
  ```bash
  ollama list
  ```
  If not, pull the model (e.g., llama3):
  ```bash
  ollama pull llama3
  ```

---

### 3. CORS Issues

- If you see CORS errors in the browser console, ensure the backend has CORS enabled. The README says flask-cors is installed, but double-check backend.py for:
  ```python
  from flask_cors import CORS
  CORS(app)
  ```

---

### 4. Port Mismatch

- The frontend expects the backend at http://localhost:5001.
- If you changed the backend port, update the fetch URL in frontend/src/App.js to match.

---

### 5. Check for Errors

- Look at the terminal where you started the backend for any error messages.
- Open the browser's developer tools (F12) and check the "Network" tab for failed requests and error details.

---

### 6. Firewall/Network Issues

- Make sure nothing is blocking port 5001 (firewall, VPN, etc.).

---

#### Next Steps

- Please check the above points and let me know:
  - What error message do you see in the browser (or console)?
  - Is the backend terminal showing any errors?
  - Is Ollama running and the model available?

If you can provide the error message from the browser console or backend terminal, I can give more specific help! 