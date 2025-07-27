# 🚀 MyCodeHelper - Local AI & Hugging Face Edition

A privacy-focused AI code assistant that works with Local AI servers and Hugging Face models. No Google dependencies, completely self-contained Python application.

## ⚡ Quick Start (30 seconds)

1. **Download**: Get `mycodehelper-standalone.py`
2. **Run**: `python mycodehelper-standalone.py`
3. **Configure**: Follow the interactive setup
4. **Code**: Ask AI anything about programming!

## 📋 Requirements

- **Python 3.7+** - Download from [python.org](https://python.org/)
- **Node.js 20+** - Download from [nodejs.org](https://nodejs.org/)

## 🚀 Usage

### Windows
```cmd
python mycodehelper-standalone.py
```

### Linux/Mac
```bash
python3 mycodehelper-standalone.py
```

### Easy Windows Launch
```cmd
mycodehelper.bat
```

## 🤖 AI Provider Setup

The app will guide you through setup, or you can pre-configure:

### Hugging Face (Cloud)
```bash
export HUGGING_FACE_API_KEY="hf_your-token"
python mycodehelper-standalone.py
```

Get your token: [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

### Local AI (Privacy)
```bash
# For Ollama
ollama pull llama3.1:8b
ollama serve

# Set environment
export LOCAL_AI_BASE_URL="http://localhost:11434/v1"
export LOCAL_AI_MODEL="llama3.1:8b"
python mycodehelper-standalone.py
```

## 📖 Commands

Once running, you can use these commands:

- `help` - Show available commands
- `clear` - Clear conversation history
- `status` - Show current configuration
- `exit` - Quit the application

## 🎯 Example Conversations

```
👤 You: How do I create a React component?
🤖 AI: Here's how to create a React component...

👤 You: Write a Python function to reverse a string
🤖 AI: def reverse_string(s): return s[::-1]

👤 You: Explain this error: Cannot read property 'map' of undefined
🤖 AI: This error occurs when you try to call .map() on undefined...
```

## ⚙️ Advanced Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `HUGGING_FACE_API_KEY` | HF API token | None |
| `HUGGING_FACE_MODEL` | HF model name | `microsoft/DialoGPT-large` |
| `LOCAL_AI_API_KEY` | Local AI key | `local-key` |
| `LOCAL_AI_BASE_URL` | Local AI URL | `http://localhost:8080` |
| `LOCAL_AI_MODEL` | Local AI model | `llama-3.1-8b` |
| `MYCODEHELPER_MAX_TOKENS` | Max response length | `4096` |
| `MYCODEHELPER_TEMPERATURE` | Creativity (0.0-2.0) | `0.7` |

### Command Line Options

```bash
python mycodehelper-standalone.py --help     # Show help
python mycodehelper-standalone.py --config   # Configure AI only
```

## 🔧 Local AI Setup Guide

### Option 1: Ollama (Easiest)
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Get a model
ollama pull llama3.1:8b
ollama serve

# Configure MyCodeHelper
export LOCAL_AI_BASE_URL="http://localhost:11434/v1"
export LOCAL_AI_MODEL="llama3.1:8b"
```

### Option 2: LocalAI
```bash
# Download LocalAI
curl -Lo localai https://github.com/mudler/LocalAI/releases/latest/download/localai-linux-amd64
chmod +x localai

# Run with a model
./localai run --models-path ./models llama-3.1-8b
```

## 🐛 Troubleshooting

**Python not found:**
- Install Python 3.7+ from [python.org](https://python.org/)

**Node.js not found:**
- Install Node.js 20+ from [nodejs.org](https://nodejs.org/)

**"No AI provider configured":**
- Set `HUGGING_FACE_API_KEY` or `LOCAL_AI_API_KEY`
- Run with `--config` to setup interactively

**Connection refused (Local AI):**
- Make sure your Local AI server is running
- Check the base URL is correct

**API errors (Hugging Face):**
- Verify your API token is valid
- Some models may require approval

## 🔒 Privacy & Security

- ✅ **No Google dependencies** - Completely removed from Gemini
- ✅ **Local processing** - Data stays on your machine with Local AI
- ✅ **Open source models** - Transparent and auditable
- ✅ **No telemetry** - No usage tracking or data collection
- ✅ **Self-contained** - Single Python file, no installation required

## 📄 License

Apache 2.0 License - Use freely for personal and commercial projects.

## 🎯 Key Features

- 🤖 **Local AI Integration** - LocalAI, Ollama, or any OpenAI-compatible server
- 🤗 **Hugging Face Support** - Thousands of open-source models
- 💬 **Interactive Chat** - Real-time conversations about coding
- 🔒 **Privacy First** - No data sent to Google or other third parties
- ⚙️ **Zero Installation** - Single Python file, just download and run
- 🎯 **Code-Focused** - Specialized for programming assistance

**Ready to code with AI that respects your privacy! 🚀**