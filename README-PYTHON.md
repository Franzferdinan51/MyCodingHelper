# 🐍 MyCodeHelper Python Launcher

## Zero-Installation AI Code Assistant

Run MyCodeHelper without any manual installation using Python!

## 🚀 Super Quick Start

### Option 1: Standalone (Recommended)
```bash
# Download just one file and run
python mycodehelper-standalone.py
```

### Option 2: Auto-Download
```bash
# Downloads from GitHub automatically
python mycodehelper.py
```

### Option 3: Universal Launcher
```bash
# Windows
run-mycodehelper.bat

# Linux/Mac
./run-mycodehelper.sh
```

## 📋 Requirements

- **Python 3.7+** OR **Node.js 20+**
- Internet connection (first run only for auto-download)

## 🎯 What Each Python Script Does

### `mycodehelper-standalone.py` (15KB)
- ✅ **Complete app embedded** - no downloads needed
- ✅ **Zero dependencies** - works offline with Local AI
- ✅ **One-file solution** - just download and run
- ✅ **Interactive AI setup** - guides you through configuration

### `mycodehelper.py` (12KB) 
- ✅ **Auto-downloads** latest version from GitHub
- ✅ **Caches locally** - only downloads once
- ✅ **Auto-updates** - always gets latest features
- ✅ **Full installation** - complete development environment

### `run-mycodehelper.{bat|sh}` (2KB)
- ✅ **Universal launcher** - works with any installation method
- ✅ **Smart detection** - finds Python, Node.js, or installed versions
- ✅ **Cross-platform** - Windows batch + Linux/Mac shell
- ✅ **Error handling** - guides you if something's missing

## 🤖 AI Provider Setup

Both Python launchers include interactive setup:

### Hugging Face (Cloud)
```bash
# When prompted, enter your API token from:
# https://huggingface.co/settings/tokens
```

### Local AI (Privacy)
```bash
# For Ollama:
ollama pull llama3.1:8b
ollama serve

# For LocalAI:
localai run --models-path ./models
```

## 🎯 Usage Examples

```bash
# Download and run standalone version
curl -O https://raw.githubusercontent.com/your-repo/main/mycodehelper-standalone.py
python mycodehelper-standalone.py

# Or use the auto-downloader
curl -O https://raw.githubusercontent.com/your-repo/main/mycodehelper.py  
python mycodehelper.py

# Windows users can use the batch file
curl -O https://raw.githubusercontent.com/your-repo/main/run-mycodehelper.bat
run-mycodehelper.bat
```

## 🔧 Advanced Usage

### Environment Variables
```bash
# Pre-configure before running
export HUGGING_FACE_API_KEY="hf_your-token"
python mycodehelper-standalone.py

# Or for Local AI
export LOCAL_AI_API_KEY="local-key"
export LOCAL_AI_BASE_URL="http://localhost:8080"
python mycodehelper-standalone.py
```

### Command Line Options
```bash
# Show help
python mycodehelper-standalone.py --help

# Just configure AI (don't run)
python mycodehelper-standalone.py --config

# Force re-download (auto-download version)
python mycodehelper.py --setup

# Clean install
python mycodehelper.py --clean
```

## 🔍 What Happens When You Run

1. **Checks prerequisites** - Python/Node.js versions
2. **Interactive AI setup** - helps configure Hugging Face or Local AI
3. **Creates temporary files** - no permanent installation mess
4. **Runs MyCodeHelper** - full AI code assistant experience
5. **Cleans up** - removes temporary files (standalone version)

## 🎉 Benefits

- ✅ **No npm install** required
- ✅ **No git clone** needed
- ✅ **No manual setup** - interactive configuration
- ✅ **Cross-platform** - works on Windows, Mac, Linux
- ✅ **Offline capable** - with Local AI providers
- ✅ **Always updated** - auto-download version gets latest
- ✅ **Portable** - single file solutions

## 🐛 Troubleshooting

**Python not found:**
```bash
# Install Python from python.org
# Or use Node.js version instead
```

**Node.js not found (for standalone):**
```bash
# Install Node.js 20+ from nodejs.org
# Standalone version needs Node.js to run the embedded JavaScript
```

**Download fails:**
```bash
# Check internet connection
# Try manual download from GitHub
# Use standalone version instead
```

Perfect for developers who want to try MyCodeHelper without any installation hassle! 🚀