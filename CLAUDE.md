# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MyCodeHelper is an AI-powered code assistant that provides complete Gemini CLI feature parity while supporting Local AI servers and Hugging Face models. It offers privacy-focused alternatives to cloud-based AI coding assistants.

## Development Commands

### Python Version (Primary)
```bash
# Run the complete version (recommended)
python mycodehelper-complete.py

# Run standalone chat version
python mycodehelper-standalone.py

# Interactive configuration setup
python mycodehelper-complete.py --config

# File analysis
python mycodehelper-complete.py -f <filename> "analyze this code"

# Codebase analysis
python mycodehelper-complete.py -a
```

### Node.js Version
```bash
# Install dependencies
npm install

# Run the bundled version
npm start:node
# or
node bundle/mycodehelper-complete.js

# Setup configuration
npm run setup
```

### Environment Setup
```bash
# Linux/Mac
./setup-env.sh

# Windows
setup-env.bat
# or
mycodehelper.bat
```

## Architecture

### Core Components

1. **Python Implementation** (`mycodehelper-complete.py`)
   - Primary implementation with full CLI feature parity
   - Handles file processing, codebase analysis, and interactive mode
   - Embeds JavaScript code for Node.js compatibility

2. **Node.js Bundle** (`bundle/mycodehelper-complete.js`)
   - Native Node.js implementation 
   - Generated from embedded JavaScript in Python version
   - Uses undici for fetch compatibility

3. **Standalone Version** (`mycodehelper-standalone.py`)
   - Lightweight chat-only version (~15KB)
   - Basic AI conversation functionality

### AI Provider Support

The application supports multiple AI providers:

- **Local AI**: For complete privacy (Ollama, LocalAI, OpenAI-compatible APIs)
- **Hugging Face**: Cloud-based with thousands of available models

### Configuration System

Configuration is handled through:
- Environment variables (preferred)
- JSON config files
- Interactive setup wizard (`--config` flag)

Key environment variables:
- `HUGGING_FACE_API_KEY`: HF API token
- `LOCAL_AI_BASE_URL`: Local AI server URL  
- `LOCAL_AI_MODEL`: Local AI model name
- `MYCODEHELPER_MAX_TOKENS`: Response length limit
- `MYCODEHELPER_TEMPERATURE`: AI creativity level

### CLI Features

The tool provides comprehensive CLI functionality:
- Interactive and non-interactive modes
- File processing with `-f` flag
- Codebase analysis with `-a` flag
- Output formatting and saving
- Streaming responses
- Project context understanding

## Requirements

- **Python 3.7+** (primary runtime)
- **Node.js 20+** (for Node.js version)
- No external dependencies for Python version (self-contained)
- `undici` package for Node.js fetch compatibility

## Privacy and Security

The codebase is designed with privacy as a core principle:
- Supports complete local processing via Local AI
- No telemetry or data collection
- Self-contained operation without internet (in local mode)
- Zero Google or cloud provider dependencies required