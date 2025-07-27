# 🚀 MyCodeHelper - Local AI & Hugging Face Edition

A privacy-focused AI code assistant that works with Local AI servers and Hugging Face models. No Google dependencies, no data collection - just powerful AI coding help on your terms.

## 📦 Installation

### Prerequisites
- **Node.js 20+** - Download from [nodejs.org](https://nodejs.org/)
- **Git** (optional) - For cloning the repository

### Quick Install

1. **Extract the files** (if you have the zip) or clone the repository:
   ```bash
   # If cloning from git
   git clone <repository-url>
   cd mycodehelper
   
   # If using zip file
   unzip mycodehelper.zip
   cd mycodehelper
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup environment** (optional):
   ```bash
   node setup.js
   ```

4. **Set up your AI provider** (choose one):

   **Option A: Local AI (LocalAI, Ollama, etc.)**
   ```bash
   export LOCAL_AI_API_KEY="your-api-key"
   export LOCAL_AI_BASE_URL="http://localhost:8080"
   ```

   **Option B: Hugging Face**
   ```bash
   export HUGGING_FACE_API_KEY="hf_your-token-here"
   ```

   **Option C: Use the setup wizard**
   ```bash
   # Linux/Mac
   ./setup-env.sh
   
   # Windows
   setup-env.bat
   ```

5. **Run MyCodeHelper**:
   ```bash
   node bundle/mycodehelper.js
   ```

## 🚀 Usage

### Starting the App

**Windows (Easy way):**
```cmd
mycodehelper.bat
```

**Cross-platform:**
```bash
node bundle/mycodehelper.js
```

You'll see:
```
🚀 MyCodeHelper v0.1.13 - Local AI & Hugging Face Edition
============================================================

✅ Using Local AI: llama-3.1-8b at http://localhost:8080

💡 Ready! Ask me anything about coding.
💡 Type "help" for commands, "exit" to quit.

👤 You: 
```

### Basic Commands

| Command | Description |
|---------|-------------|
| `help` | Show available commands |
| `clear` | Clear conversation history |
| `status` | Show current configuration |
| `exit` | Quit the application |

### Example Conversations

**Ask coding questions:**
```
👤 You: How do I create a React component?
🤖 Local AI: To create a React component, you can use either function or class syntax...

👤 You: Write a Python function to reverse a string
🤖 Local AI: Here's a Python function to reverse a string:

def reverse_string(s):
    return s[::-1]
```

**Get debugging help:**
```
👤 You: Why isn't my JavaScript async function working?
🤖 Local AI: There could be several reasons. Let me help you debug...

👤 You: Explain this error: TypeError: Cannot read property 'map' of undefined
🤖 Local AI: This error occurs when you're trying to call .map() on undefined...
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file or export these variables:

```bash
# Local AI Configuration
LOCAL_AI_API_KEY="your-api-key"           # Default: "local-key"
LOCAL_AI_BASE_URL="http://localhost:8080" # Default: http://localhost:8080
LOCAL_AI_MODEL="llama-3.1-8b"            # Default: llama-3.1-8b

# Hugging Face Configuration
HUGGING_FACE_API_KEY="hf_your-token"     # Required for HF
HUGGING_FACE_MODEL="microsoft/DialoGPT-large" # Default model

# Advanced Settings
MYCODEHELPER_DEFAULT_PROVIDER="local-ai-api-key"  # or "hugging-face-api-key"
MYCODEHELPER_MAX_TOKENS=4096              # Max response length
MYCODEHELPER_TEMPERATURE=0.7              # Creativity (0.0-2.0)
MYCODEHELPER_SYSTEM_PROMPT="Custom prompt" # Optional system message
```

### Provider Setup

#### Local AI (Recommended for Privacy)

**Option 1: LocalAI**
```bash
# Install LocalAI
curl -Lo localai https://github.com/mudler/LocalAI/releases/latest/download/localai-linux-amd64
chmod +x localai

# Run with a model
./localai run --models-path ./models llama-3.1-8b
```

**Option 2: Ollama**
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull and run a model
ollama pull llama3.1:8b
ollama serve

# Set environment for Ollama
export LOCAL_AI_BASE_URL="http://localhost:11434/v1"
export LOCAL_AI_MODEL="llama3.1:8b"
```

#### Hugging Face

1. **Get API Token**:
   - Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
   - Create a new token with "Read" permissions
   - Copy the token (starts with `hf_`)

2. **Set Environment**:
   ```bash
   export HUGGING_FACE_API_KEY="hf_your-token-here"
   export HUGGING_FACE_MODEL="microsoft/DialoGPT-large"
   ```

3. **Choose a Model** (optional):
   - Browse models at [huggingface.co/models](https://huggingface.co/models)
   - Filter by "Text Generation" task
   - Popular options:
     - `microsoft/DialoGPT-large` (conversational)
     - `gpt2` (lightweight)
     - `EleutherAI/gpt-neo-2.7B` (powerful)

## 🔧 Development

### Project Structure

```
mycodehelper/
├── bundle/
│   └── mycodehelper.js        # ← Main executable
├── packages/
│   ├── core/                  # Core AI logic
│   │   ├── src/clients/       # AI provider clients
│   │   ├── src/config/        # Configuration
│   │   └── src/core/          # Chat logic
│   └── cli/                   # CLI interface
├── compile.js                 # Build script
├── setup-env.sh              # Environment setup
├── package.json               # Dependencies
└── README.md                  # This file
```

### Build Commands

```bash
# Auto-compile with fixes
npm run compile

# Manual build
npm run build

# Install dependencies
npm install

# Format code
npm run format

# Run linting
npm run lint
```

### Customization

**Add new AI providers**: Create a client in `packages/core/src/clients/`

**Modify chat behavior**: Edit `packages/core/src/core/localChat.ts`

**Change UI**: Update `bundle/mycodehelper.js` for the chat interface

## 🐛 Troubleshooting

### Common Issues

**❌ "No AI provider configured"**
```bash
# Solution: Set environment variables
export LOCAL_AI_API_KEY="your-key"
# OR
export HUGGING_FACE_API_KEY="hf_your-token"
```

**❌ "Connection refused" (Local AI)**
```bash
# Check if your local AI server is running
curl http://localhost:8080/v1/models

# If not running, start your Local AI server:
# For LocalAI: ./localai run
# For Ollama: ollama serve
```

**❌ "API error" (Hugging Face)**
```bash
# Verify your token is valid
curl -H "Authorization: Bearer hf_your-token" \
  https://huggingface.co/api/whoami

# Check if model exists and is accessible
# Some models require approval or payment
```

**❌ Build/compilation errors**
```bash
# Auto-fix many issues
npm run compile

# Clean install
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 20+
```

### Getting Help

1. **Check status**: Type `status` in the app to see configuration
2. **Enable debug**: Set `DEBUG=1` environment variable
3. **Test connectivity**: Use `curl` commands above to test API access
4. **Reset config**: Delete `.env` file and run `./setup-env.sh` again

## 📚 Examples

### Code Generation
```
👤 You: Create a REST API endpoint in Express.js for user registration
👤 You: Write a React hook for managing form state
👤 You: Generate SQL to find users who haven't logged in for 30 days
```

### Code Review
```
👤 You: Review this function for potential bugs: [paste code]
👤 You: How can I optimize this algorithm?
👤 You: Is this React component following best practices?
```

### Learning
```
👤 You: Explain the difference between Promise and async/await
👤 You: What are React hooks and when should I use them?
👤 You: How does garbage collection work in JavaScript?
```

## 🔒 Privacy & Security

- ✅ **No Google dependencies** - Completely removed from Gemini
- ✅ **Local processing** - Data stays on your machine with Local AI
- ✅ **Open source models** - Transparent and auditable
- ✅ **No telemetry** - No usage tracking or data collection
- ✅ **Configurable** - Full control over AI providers and settings

## 📄 License

Apache 2.0 License - Use freely for personal and commercial projects.

## 🎯 Quick Start Summary

```bash
# 1. Install dependencies
npm install

# 2. Compile
npm run compile

# 3. Set up AI provider
export HUGGING_FACE_API_KEY="hf_your-token"
# OR
export LOCAL_AI_API_KEY="your-key"

# 4. Run
node bundle/mycodehelper.js

# 5. Start coding!
👤 You: Hello! How do I use React hooks?
```

**Ready to code with AI that respects your privacy! 🚀**