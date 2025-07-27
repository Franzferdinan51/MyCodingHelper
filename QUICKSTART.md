# 🚀 MyCodeHelper - Quick Start Guide

## ⚡ 60-Second Setup

1. **Prerequisites**: Node.js 20+ ([download here](https://nodejs.org/))

2. **Install & Run**:
   ```bash
   npm install
   npm run compile
   export HUGGING_FACE_API_KEY="hf_your-token"  # Get from: https://huggingface.co/settings/tokens
   node bundle/mycodehelper.js
   ```

3. **Start Coding**:
   ```
   👤 You: How do I create a React component?
   🤖 AI: Here's how to create a React component...
   ```

## 🤖 AI Provider Options

### Option 1: Hugging Face (Cloud, Free Tier Available)
```bash
# Get token from: https://huggingface.co/settings/tokens
export HUGGING_FACE_API_KEY="hf_your-token"
export HUGGING_FACE_MODEL="microsoft/DialoGPT-large"  # Optional
```

### Option 2: Local AI (Complete Privacy)
```bash
# Install Ollama (easiest local option)
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull llama3.1:8b
ollama serve

# Configure MyCodeHelper
export LOCAL_AI_API_KEY="local-key"
export LOCAL_AI_BASE_URL="http://localhost:11434/v1"
export LOCAL_AI_MODEL="llama3.1:8b"
```

### Option 3: Automated Setup
```bash
# Linux/Mac
./setup-env.sh

# Windows
setup-env.bat
```

## 📁 What's Included

```
mycodehelper/
├── README.md              # Full documentation
├── bundle/mycodehelper.js  # ← Ready-to-run executable
├── packages/               # Source code
├── compile.js              # Auto-compile script
├── setup-env.sh           # Environment setup
└── package.json            # Dependencies
```

## 🎯 Example Commands

```bash
# Development setup
npm install && npm run compile

# Quick test (with Hugging Face)
export HUGGING_FACE_API_KEY="hf_your-token"
node bundle/mycodehelper.js

# Status check
echo 'status' | node bundle/mycodehelper.js

# Help
echo 'help' | node bundle/mycodehelper.js
```

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| "No AI provider configured" | Set `HUGGING_FACE_API_KEY` or `LOCAL_AI_API_KEY` |
| "Connection refused" | Start your Local AI server (e.g., `ollama serve`) |
| "API error" | Check your Hugging Face token is valid |
| "Command not found" | Install Node.js 20+ |

## 🚀 Ready in 60 seconds!

**Linux/Mac:**
```bash
npm install && npm run compile
export HUGGING_FACE_API_KEY="hf_your-token"
node bundle/mycodehelper.js
```

**Windows:**
```cmd
npm install && npm run compile
set HUGGING_FACE_API_KEY=hf_your-token
mycodehelper.bat
```

**🎉 Start coding with AI!**

See `README.md` for complete documentation.