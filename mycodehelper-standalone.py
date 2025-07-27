#!/usr/bin/env python3
"""
MyCodeHelper Standalone Python Launcher
=======================================

Completely portable - no downloads needed!
Embeds the JavaScript app and runs it directly.

Just run: python mycodehelper-standalone.py

Requirements: Python 3.7+ and Node.js 20+
"""

import os
import sys
import subprocess
import tempfile
import json
from pathlib import Path

# Embedded MyCodeHelper JavaScript (minified)
MYCODEHELPER_JS = '''
import { createInterface } from 'readline';

const CONFIG = {
  LOCAL_AI: {
    apiKey: process.env.LOCAL_AI_API_KEY || 'local-key',
    baseUrl: process.env.LOCAL_AI_BASE_URL || 'http://localhost:8080',
    model: process.env.LOCAL_AI_MODEL || 'llama-3.1-8b'
  },
  HUGGING_FACE: {
    apiKey: process.env.HUGGING_FACE_API_KEY,
    model: process.env.HUGGING_FACE_MODEL || 'microsoft/DialoGPT-large'
  },
  maxTokens: parseInt(process.env.MYCODEHELPER_MAX_TOKENS || '4096'),
  temperature: parseFloat(process.env.MYCODEHELPER_TEMPERATURE || '0.7')
};

async function httpRequest(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
}

class LocalAIClient {
  constructor(config) { this.config = config; }
  async generateContent(message) {
    try {
      const data = await httpRequest(`${this.config.baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.config.apiKey}` },
        body: JSON.stringify({
          model: this.config.model,
          messages: [{ role: 'user', content: message }],
          temperature: CONFIG.temperature,
          max_tokens: CONFIG.maxTokens
        })
      });
      return data.choices?.[0]?.message?.content || 'No response from Local AI';
    } catch (error) { return `Error: ${error.message}`; }
  }
}

class HuggingFaceClient {
  constructor(config) { this.config = config; }
  async generateContent(message) {
    try {
      const data = await httpRequest(`https://api-inference.huggingface.co/models/${this.config.model}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.config.apiKey}` },
        body: JSON.stringify({
          inputs: message,
          parameters: { temperature: CONFIG.temperature, max_new_tokens: CONFIG.maxTokens, return_full_text: false },
          options: { wait_for_model: true }
        })
      });
      return Array.isArray(data) ? data[0]?.generated_text || 'No response' : data.generated_text || 'No response';
    } catch (error) { return `Error: ${error.message}`; }
  }
}

class MyCodeHelper {
  constructor() { this.conversation = []; }

  async initialize() {
    console.log('🚀 MyCodeHelper v0.1.13 - Local AI & Hugging Face Edition');
    console.log('============================================================\\n');

    if (CONFIG.HUGGING_FACE.apiKey) {
      this.client = new HuggingFaceClient(CONFIG.HUGGING_FACE);
      this.providerType = 'Hugging Face';
      console.log(`✅ Using Hugging Face: ${CONFIG.HUGGING_FACE.model}`);
    } else if (CONFIG.LOCAL_AI.apiKey) {
      this.client = new LocalAIClient(CONFIG.LOCAL_AI);
      this.providerType = 'Local AI';
      console.log(`✅ Using Local AI: ${CONFIG.LOCAL_AI.model} at ${CONFIG.LOCAL_AI.baseUrl}`);
    } else {
      console.log('❌ No AI provider configured!');
      console.log('Set HUGGING_FACE_API_KEY or LOCAL_AI_API_KEY environment variable.');
      process.exit(1);
    }

    console.log('\\n💡 Ready! Ask me anything about coding.');
    console.log('💡 Type "help" for commands, "exit" to quit.\\n');
  }

  async chat() {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const askQuestion = () => new Promise((resolve) => rl.question('👤 You: ', resolve));

    while (true) {
      try {
        const userInput = await askQuestion();
        
        if (userInput.toLowerCase() === 'exit' || userInput.toLowerCase() === 'quit') {
          console.log('👋 Goodbye!');
          break;
        }
        if (userInput.toLowerCase() === 'help') {
          console.log('📖 Commands: help, clear, status, exit');
          continue;
        }
        if (userInput.toLowerCase() === 'clear') {
          this.conversation = [];
          console.log('🧹 Conversation cleared.');
          continue;
        }
        if (userInput.toLowerCase() === 'status') {
          console.log(`⚙️ Provider: ${this.providerType}, Model: ${this.client.config.model}`);
          continue;
        }
        if (userInput.trim() === '') continue;

        process.stdout.write(`🤖 ${this.providerType}: `);
        const response = await this.client.generateContent(userInput);
        console.log(response + '\\n');
      } catch (error) {
        console.log(`❌ Error: ${error.message}\\n`);
      }
    }
    rl.close();
  }
}

async function main() {
  const app = new MyCodeHelper();
  await app.initialize();
  await app.chat();
}

process.on('SIGINT', () => { console.log('\\n👋 Goodbye!'); process.exit(0); });
main().catch(error => { console.error('💥 Fatal error:', error.message); process.exit(1); });
'''

# Embedded package.json
PACKAGE_JSON = {
    "name": "mycodehelper-standalone",
    "version": "0.1.13", 
    "type": "module",
    "engines": {"node": ">=20.0.0"},
    "dependencies": {}
}

def print_banner():
    """Print welcome banner"""
    print("🚀 MyCodeHelper Standalone Launcher")
    print("=" * 40)
    print()

def check_node():
    """Check Node.js installation"""
    try:
        result = subprocess.run(['node', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            version = result.stdout.strip()
            major_version = int(version[1:].split('.')[0])
            if major_version >= 20:
                print(f"✅ Node.js {version} detected")
                return True
            else:
                print(f"❌ Node.js {version} found, but version 20+ required")
        else:
            print("❌ Node.js check failed")
    except FileNotFoundError:
        print("❌ Node.js not found!")
    
    print("📥 Install Node.js 20+ from: https://nodejs.org/")
    return False

def setup_ai_config():
    """Setup AI provider configuration"""
    print("🤖 AI Provider Setup")
    print("=" * 20)
    
    # Check existing environment variables
    if os.getenv('HUGGING_FACE_API_KEY'):
        print("✅ Hugging Face configuration found in environment")
        return True
    if os.getenv('LOCAL_AI_API_KEY'):
        print("✅ Local AI configuration found in environment")
        return True
    
    print("No AI provider configured!")
    print("\\nOptions:")
    print("1) Set environment variables manually")
    print("2) Quick Hugging Face setup")
    print("3) Quick Local AI setup")
    print("4) Skip (configure later)")
    
    while True:
        choice = input("\\nChoose option (1-4): ").strip()
        
        if choice == "1":
            print("\\n📋 Manual Setup:")
            print("For Hugging Face:")
            print("  export HUGGING_FACE_API_KEY='hf_your-token'")
            print("For Local AI:")
            print("  export LOCAL_AI_API_KEY='local-key'")
            print("  export LOCAL_AI_BASE_URL='http://localhost:8080'")
            return True
            
        elif choice == "2":
            print("\\n🤗 Quick Hugging Face Setup")
            print("Get token from: https://huggingface.co/settings/tokens")
            token = input("Enter Hugging Face API token: ").strip()
            if token:
                os.environ['HUGGING_FACE_API_KEY'] = token
                print("✅ Hugging Face configured for this session")
                return True
                
        elif choice == "3":
            print("\\n🏠 Quick Local AI Setup")
            base_url = input("Base URL (default: http://localhost:8080): ").strip()
            api_key = input("API key (default: local-key): ").strip()
            
            os.environ['LOCAL_AI_BASE_URL'] = base_url or 'http://localhost:8080'
            os.environ['LOCAL_AI_API_KEY'] = api_key or 'local-key'
            print("✅ Local AI configured for this session")
            return True
            
        elif choice == "4":
            print("⏭️ Skipping configuration")
            print("Note: You'll need to set environment variables before the app will work")
            return True
            
        else:
            print("Invalid choice, please enter 1, 2, 3, or 4")

def run_mycodehelper():
    """Create and run MyCodeHelper"""
    print("🚀 Starting MyCodeHelper...")
    
    # Create temporary directory
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)
        
        # Write package.json
        package_path = temp_path / "package.json"
        with open(package_path, 'w') as f:
            json.dump(PACKAGE_JSON, f, indent=2)
        
        # Write JavaScript app
        app_path = temp_path / "mycodehelper.js"
        with open(app_path, 'w', encoding='utf-8') as f:
            f.write(MYCODEHELPER_JS)
        
        # Run the app
        try:
            subprocess.run(['node', 'mycodehelper.js'], cwd=temp_dir)
        except KeyboardInterrupt:
            print("\\n👋 Goodbye!")
        except Exception as e:
            print(f"❌ Error running MyCodeHelper: {e}")

def show_help():
    """Show help"""
    print("""
🚀 MyCodeHelper Standalone Python Launcher

Usage: python mycodehelper-standalone.py [options]

Options:
  --help, -h     Show this help
  --config       Configure AI providers

This standalone launcher:
  ✅ No downloads required
  ✅ No installation needed  
  ✅ Embeds complete MyCodeHelper app
  ✅ Works offline (with Local AI)

Requirements:
  - Python 3.7+
  - Node.js 20+

AI Providers:
  - Hugging Face: Get token from huggingface.co/settings/tokens
  - Local AI: Run LocalAI, Ollama, or compatible server

Examples:
  python mycodehelper-standalone.py           # Run with auto-setup
  python mycodehelper-standalone.py --config  # Configure AI only

Environment Variables:
  HUGGING_FACE_API_KEY=hf_your-token         # For Hugging Face
  LOCAL_AI_API_KEY=local-key                 # For Local AI
  LOCAL_AI_BASE_URL=http://localhost:8080    # Local AI server

No files created, no mess left behind!
""")

def main():
    """Main function"""
    print_banner()
    
    # Handle arguments
    if len(sys.argv) > 1:
        arg = sys.argv[1].lower()
        if arg in ['--help', '-h']:
            show_help()
            return
        elif arg == '--config':
            setup_ai_config()
            return
    
    # Check prerequisites
    if not check_node():
        return
    
    # Setup AI configuration
    setup_ai_config()
    
    # Run the app
    run_mycodehelper()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\\n👋 Goodbye!")
    except Exception as e:
        print(f"\\n💥 Unexpected error: {e}")