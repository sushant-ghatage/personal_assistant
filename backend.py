from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

OLLAMA_API_URL = "http://localhost:11434/api/chat"  # Default Ollama endpoint
OLLAMA_MODEL = "gemma3"  # Change to your preferred model name

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    # Add formatting instructions to make responses more structured
    formatted_message = f"""Please provide your response in a clear, structured format with the following guidelines:

1. Use numbered lists (1., 2., 3., etc.) for step-by-step instructions
2. Use bullet points for lists of items or features
3. Break down complex topics into clear sections
4. Use bold text (**text**) for emphasis on important points
5. Keep paragraphs short and easy to read
6. Use headings for different sections when appropriate

User question: {user_message}

Please respond with a well-structured answer:"""

    payload = {
        "model": OLLAMA_MODEL,
        "messages": [
            {"role": "user", "content": formatted_message}
        ]
    }
    try:
        response = requests.post(OLLAMA_API_URL, json=payload, timeout=60)
        response.raise_for_status()
        
        # Handle Ollama's streaming response format
        response_text = response.text.strip()
        if response_text:
            # Parse all JSON objects from the streaming response
            lines = response_text.split('\n')
            full_content = ""
            for line in lines:
                if line.strip():
                    try:
                        json_obj = json.loads(line)
                        if 'message' in json_obj and 'content' in json_obj['message']:
                            full_content += json_obj['message']['content']
                    except json.JSONDecodeError:
                        continue
            
            bot_reply = full_content if full_content else 'No response from model.'
        else:
            bot_reply = 'No response from model.'
            
        return jsonify({'response': bot_reply})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001) 