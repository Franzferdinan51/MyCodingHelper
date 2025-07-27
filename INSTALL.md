# 🚀 MyCodeHelper - Complete Installation Guide

## 📦 What You Get

This **15KB ZIP file** contains everything needed to run MyCodeHelper:

```
mycodehelper/
├── 📖 README.md              # Complete documentation
├── ⚡ QUICKSTART.md          # 60-second setup
├── 📄 LICENSE                # Apache 2.0 license
├── ⚙️ package.json           # Node.js configuration
├── 🔧 install.js             # Automatic installer
├── 💬 setup.js               # Interactive setup
├── 🪟 mycodehelper.bat       # Windows launcher
├── 🐧 setup-env.sh           # Linux/Mac setup
├── 🪟 setup-env.bat          # Windows setup
├── 📝 .gitignore             # Git ignore rules
└── 📁 bundle/
    └── 🚀 mycodehelper.js    # Complete AI assistant (8KB)
```

## ⚡ Super Quick Start (60 seconds)

1. **Extract the ZIP file**
2. **Run the auto-installer:**
   ```bash
   node install.js
   ```
3. **Setup your AI provider:**
   ```bash
   node setup.js
   ```
4. **Start coding with AI:**
   ```bash
   npm start
   ```

## 🔧 Manual Installation

### 1. Prerequisites
- **Node.js 20+** from [nodejs.org](https://nodejs.org/)

### 2. Setup
```bash
# Extract and enter directory
cd mycodehelper

# Install dependencies (just undici for HTTP)
npm install

# Interactive setup
node setup.js
```

### 3. Configure AI Provider

**Option A: Hugging Face (Free tier available)**
```bash
export HUGGING_FACE_API_KEY="hf_your-token"
```

**Option B: Local AI (Complete privacy)**
```bash
export LOCAL_AI_API_KEY="local-key"
export LOCAL_AI_BASE_URL="http://localhost:8080"
```

### 4. Run
```bash
# Cross-platform
npm start

# Windows easy mode
mycodehelper.bat
```

## 🤖 AI Provider Setup

### Hugging Face (Cloud)
1. Get free token: [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Set: `HUGGING_FACE_API_KEY=hf_your-token`
3. Start coding!

### Local AI (Privacy)
**Ollama (Easiest):**
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

## 🎯 Usage Examples

```
👤 You: How do I create a React component?
🤖 AI: Here's how to create a React component...

👤 You: Write a Python function to reverse a string
🤖 AI: def reverse_string(s): return s[::-1]

👤 You: Debug this JavaScript error: Cannot read property 'map' of undefined
🤖 AI: This error occurs when you try to call .map() on undefined...
```

## 🚨 Troubleshooting GitHub Upload

If GitHub upload fails:

1. **Disable ad blocker** temporarily
2. **Try incognito/private browsing**
3. **Upload files individually** instead of ZIP
4. **Use GitHub CLI:**
   ```bash
   gh repo create mycodehelper --public
   git add .
   git commit -m "Initial commit"
   git push
   ```

## 📊 File Sizes
- **Total**: 61KB (11 files)
- **ZIP**: 15KB
- **Main app**: 8KB
- **Dependencies**: Just Node.js built-ins + undici

## 🎉 Ready to Code!

Your AI assistant is ready. Ask it anything about:
- Code generation
- Debugging help
- Best practices
- Algorithm optimization
- Learning programming concepts

**Privacy-focused • No Google dependencies • Works offline with Local AI**