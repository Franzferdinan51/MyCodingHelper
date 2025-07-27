# 🚀 MyCodeHelper - Local AI & Hugging Face Edition

**The privacy-focused AI code assistant with complete Gemini CLI feature parity**

A powerful alternative to Google Gemini CLI and Claude Code that works with Local AI servers and Hugging Face models. No Google dependencies, complete privacy control, and enhanced features.

## 🎯 Why Choose MyCodeHelper?

### **🆚 vs Google Gemini CLI**
| Feature | Gemini CLI | MyCodeHelper | Advantage |
|---------|------------|--------------|-----------|
| **Privacy** | ❌ Data sent to Google | ✅ Local processing option | **Your data stays private** |
| **AI Providers** | 🔒 Google only | ✅ Local AI + Hugging Face | **Freedom to choose** |
| **Cost** | 💰 API limits & costs | ✅ Free local processing | **No usage fees** |
| **Setup** | 🔑 Google auth required | ✅ Zero auth needed | **Works immediately** |
| **Offline** | ❌ Internet required | ✅ Works offline (Local AI) | **No connectivity dependency** |
| **Models** | 🔒 Gemini models only | ✅ Thousands of open models | **Unlimited choice** |

### **🆚 vs Claude Code**
| Feature | Claude Code | MyCodeHelper | Advantage |
|---------|------------|--------------|-----------|
| **AI Providers** | 🔒 Anthropic only | ✅ Local AI + Hugging Face | **Multiple providers** |
| **Privacy** | ❌ Data sent to Anthropic | ✅ Local processing option | **Complete privacy** |
| **Installation** | 📦 Complex setup | ✅ Single Python file | **Zero installation** |
| **Customization** | 🔒 Limited options | ✅ Full model control | **Total flexibility** |
| **Cost** | 💰 API costs | ✅ Free local processing | **No ongoing costs** |
| **Offline** | ❌ Internet required | ✅ Works offline | **No cloud dependency** |

## 📦 Available Versions

### **🐍 Standalone Python (Recommended)**
**`mycodehelper-standalone.py` or `mycodehelper-complete.py`**
- ✅ **Single file** - Just download and run
- ✅ **Complete features** - All Gemini CLI functionality + more
- ✅ **Zero installation** - No npm, no dependencies
- ✅ **GitHub-friendly** - Uploads without issues

### **⚡ Basic Chat Version**
**`mycodehelper-standalone.py`**
- ✅ Interactive AI conversations
- ✅ Environment configuration
- ✅ Local AI + Hugging Face support
- ✅ **15KB** - Ultra-lightweight

### **🔧 Complete CLI Version**
**`mycodehelper-complete.py`**
- ✅ **All basic features** +
- ✅ **File processing** - Analyze individual files
- ✅ **Codebase analysis** - Understand entire projects
- ✅ **Command-line arguments** - Non-interactive usage
- ✅ **Streaming responses** - Real-time output
- ✅ **Output formatting** - Save results to files
- ✅ **Project context** - Smart code understanding
- ✅ **50KB** - Complete feature set

### **📁 Bundle Version (Advanced)**
**`bundle/mycodehelper-complete.js`**
- ✅ Native Node.js implementation
- ✅ All complete features
- ✅ Development environment integration
- ✅ **For power users** who prefer Node.js

## ⚡ Quick Start (30 seconds)

### **Option 1: Basic Chat (Fastest)**
```bash
# Download and run - that's it!
python mycodehelper-standalone.py
```

### **Option 2: Complete CLI (Recommended)**
```bash
# Download complete version
python mycodehelper-complete.py

# Or with file analysis
python mycodehelper-complete.py -f app.js "Review this code"

# Or analyze entire codebase
python mycodehelper-complete.py -a
```

## 📋 Requirements

- **Python 3.7+** - Download from [python.org](https://python.org/)
- **Node.js 20+** - Download from [nodejs.org](https://nodejs.org/)

## 🎯 Complete Feature Parity with Gemini CLI

**Everything the original Gemini CLI could do, MyCodeHelper does better:**

### **✅ Interactive Mode**
```bash
# Gemini CLI
gemini

# MyCodeHelper (same experience + enhanced)
python mycodehelper-complete.py
```

### **✅ Single Prompts**
```bash
# Gemini CLI
gemini "How do I implement authentication?"

# MyCodeHelper (identical + more AI options)
python mycodehelper-complete.py "How do I implement authentication?"
```

### **✅ File Processing**
```bash
# Gemini CLI (limited)
gemini < file.txt

# MyCodeHelper (enhanced)
python mycodehelper-complete.py -f file.js "Analyze this code"
python mycodehelper-complete.py -f file.py -o analysis.md
```

### **✅ Codebase Analysis**
```bash
# Gemini CLI (basic)
gemini "Analyze this codebase"

# MyCodeHelper (comprehensive)
python mycodehelper-complete.py -a
python mycodehelper-complete.py --codebase "What's the architecture?"
```

### **✅ Help & Configuration**
```bash
# Gemini CLI
gemini --help

# MyCodeHelper (more comprehensive)
python mycodehelper-complete.py --help
python mycodehelper-complete.py --config
```

## 🚀 Enhanced Features (Beyond Gemini CLI)

### **🔧 Advanced Command Line**
```bash
# File analysis with streaming
python mycodehelper-complete.py -f app.js --no-stream

# Save output to file
python mycodehelper-complete.py "Explain REST APIs" -o explanation.md

# Multiple output formats
python mycodehelper-complete.py --format markdown "Document this API"

# Project context loading
python mycodehelper-complete.py --codebase "Review the architecture"
```

### **📁 Interactive File Loading**
```bash
# Inside interactive mode
👤 You: file src/app.js
📁 Loaded: src/app.js (2.5KB)
🤖 AI: This React component implements...

👤 You: analyze
🔍 Analyzing codebase...
📊 Project Summary: 45 files, JavaScript/TypeScript
🤖 AI: Your architecture follows MVC pattern...
```

## 🤖 AI Provider Setup

MyCodeHelper supports multiple AI providers for maximum flexibility:

### **🤗 Hugging Face (Cloud)**
```bash
# Get free token: https://huggingface.co/settings/tokens
export HUGGING_FACE_API_KEY="hf_your-token"
python mycodehelper-complete.py

# Choose from thousands of models
export HUGGING_FACE_MODEL="microsoft/DialoGPT-large"
export HUGGING_FACE_MODEL="EleutherAI/gpt-neo-2.7B"
export HUGGING_FACE_MODEL="microsoft/CodeBERT-base"
```

### **🏠 Local AI (Complete Privacy)**
```bash
# Option 1: Ollama (Easiest)
ollama pull llama3.1:8b
ollama serve
export LOCAL_AI_BASE_URL="http://localhost:11434/v1"

# Option 2: LocalAI
./localai run --models-path ./models llama-3.1-8b
export LOCAL_AI_BASE_URL="http://localhost:8080"

# Option 3: Any OpenAI-compatible API
export LOCAL_AI_BASE_URL="http://your-server:8080"
export LOCAL_AI_MODEL="your-model"
```

### **⚙️ Auto Setup (Easiest)**
```bash
# Interactive configuration wizard
python mycodehelper-complete.py --config
```

## 📖 Usage Examples

### **🔍 Code Analysis**
```bash
# Analyze a specific file
python mycodehelper-complete.py -f components/Header.jsx "Review this React component"

# Analyze with output saving
python mycodehelper-complete.py -f api/auth.py -o security-review.md "Check for security issues"

# Interactive file loading
python mycodehelper-complete.py
👤 You: file package.json
📁 Loaded: package.json (1.2KB)
👤 You: What dependencies can be updated?
```

### **🏗️ Architecture Review**
```bash
# Full codebase analysis
python mycodehelper-complete.py -a

# Architecture questions with context
python mycodehelper-complete.py --codebase "How is authentication handled?"

# Project insights
python mycodehelper-complete.py --codebase "What are the main security considerations?"
```

### **💻 Development Workflow**
```bash
# Quick code review
python mycodehelper-complete.py -f new-feature.js "Is this code production ready?"

# Documentation generation
python mycodehelper-complete.py -f api.js -o docs.md "Generate API documentation"

# Debugging help
python mycodehelper-complete.py "Explain this error: TypeError: Cannot read property 'map' of undefined"
```

## ⚙️ Advanced Configuration

### **🔧 Environment Variables**
```bash
# AI Provider Selection
HUGGING_FACE_API_KEY="hf_your-token"              # HF API token
HUGGING_FACE_MODEL="microsoft/DialoGPT-large"     # HF model choice
LOCAL_AI_API_KEY="local-key"                      # Local AI key
LOCAL_AI_BASE_URL="http://localhost:8080"         # Local AI server
LOCAL_AI_MODEL="llama-3.1-8b"                     # Local AI model

# Response Configuration
MYCODEHELPER_MAX_TOKENS=8192                      # Response length
MYCODEHELPER_TEMPERATURE=0.7                      # Creativity (0.0-2.0)
MYCODEHELPER_STREAMING=true                       # Real-time output
MYCODEHELPER_OUTPUT_FORMAT="text"                 # Output format
```

### **📄 Configuration Files**
```bash
# Load custom config
python mycodehelper-complete.py --config config.json

# Example config.json
{
  "LOCAL_AI": {
    "baseUrl": "http://localhost:8080",
    "model": "llama-3.1-8b"
  },
  "maxTokens": 8192,
  "temperature": 0.7,
  "streaming": true
}
```

## 🔒 Privacy & Security Advantages

### **🛡️ Complete Privacy Control**
- ✅ **Local processing** - Your code never leaves your machine (with Local AI)
- ✅ **No Google tracking** - Zero telemetry or data collection
- ✅ **Open source models** - Transparent and auditable AI
- ✅ **Self-contained** - Works without internet (Local AI mode)

### **🔐 Security Benefits**
- ✅ **No API keys required** - For local AI setups
- ✅ **No vendor lock-in** - Switch providers anytime
- ✅ **Audit trail** - Full control over AI interactions
- ✅ **Compliance friendly** - Keep sensitive code internal

## 🏆 Why MyCodeHelper Wins

### **🆚 Compared to Other Solutions**

| Advantage | MyCodeHelper | Google Gemini CLI | Claude Code | GitHub Copilot |
|-----------|--------------|-------------------|-------------|----------------|
| **Privacy** | ✅ Local options | ❌ Google servers | ❌ Anthropic servers | ❌ Microsoft servers |
| **Cost** | ✅ Free local AI | 💰 API costs | 💰 Subscription | 💰 Subscription |
| **Offline** | ✅ Works offline | ❌ Internet required | ❌ Internet required | ❌ Internet required |
| **Models** | ✅ Thousands available | 🔒 Gemini only | 🔒 Claude only | 🔒 Codex only |
| **Setup** | ✅ Zero installation | 📦 npm + auth | 📦 Complex setup | 🔑 Account required |
| **Flexibility** | ✅ Multiple providers | 🔒 Google locked | 🔒 Anthropic locked | 🔒 Microsoft locked |

### **🎯 Perfect For**
- ✅ **Privacy-conscious developers** who want local AI
- ✅ **Teams with compliance requirements** (healthcare, finance, etc.)
- ✅ **Open source enthusiasts** who prefer transparency
- ✅ **Cost-conscious users** who want free solutions
- ✅ **Developers wanting choice** in AI providers
- ✅ **Anyone migrating from Gemini CLI** (drop-in replacement)

## 🐛 Troubleshooting

**Python not found:**
- Install Python 3.7+ from [python.org](https://python.org/)

**Node.js not found:**
- Install Node.js 20+ from [nodejs.org](https://nodejs.org/)

**"No AI provider configured":**
- Set `HUGGING_FACE_API_KEY` or `LOCAL_AI_API_KEY`
- Run `python mycodehelper-complete.py --config`

**Local AI connection issues:**
- Ensure your Local AI server is running
- Check the base URL is correct: `curl http://localhost:8080/v1/models`

**Hugging Face API errors:**
- Verify your token: `curl -H "Authorization: Bearer hf_your-token" https://huggingface.co/api/whoami`
- Some models require approval or have usage limits

## 📄 License

Apache 2.0 License - Use freely for personal and commercial projects.

## 🎉 Ready to Get Started?

### **🚀 Quick Setup**
```bash
# Download any version and run
python mycodehelper-complete.py --config

# Set your preferred AI provider
# Start coding with privacy-focused AI!
```

### **📚 Learn More**
- 📖 [Complete Feature Comparison](FEATURE-COMPARISON.md)
- ⚡ [Quick Start Guide](QUICKSTART.md)
- 🐍 [Python Launcher Guide](README-PYTHON.md)

**MyCodeHelper: All the power of Gemini CLI and Claude Code, with the privacy and flexibility you deserve!** 🚀