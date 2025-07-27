#!/usr/bin/env python3
"""
MyCodeHelper Python Launcher
============================

Portable launcher that downloads and runs MyCodeHelper without installation.
Just run: python mycodehelper.py

Requirements: Python 3.7+ and Node.js 20+
"""

import os
import sys
import json
import subprocess
import tempfile
import zipfile
import shutil
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import URLError

# Configuration
GITHUB_REPO = "your-username/mycodehelper"  # Update with actual repo
GITHUB_RELEASE_URL = f"https://api.github.com/repos/{GITHUB_REPO}/releases/latest"
GITHUB_ZIP_URL = f"https://github.com/{GITHUB_REPO}/archive/refs/heads/main.zip"
LOCAL_DIR = Path.home() / ".mycodehelper"
APP_DIR = LOCAL_DIR / "app"

def print_banner():
    """Print welcome banner"""
    print("🚀 MyCodeHelper Python Launcher")
    print("=" * 40)
    print()

def check_prerequisites():
    """Check if Node.js is installed"""
    try:
        result = subprocess.run(['node', '--version'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            version = result.stdout.strip()
            major_version = int(version[1:].split('.')[0])
            if major_version >= 20:
                print(f"✅ Node.js {version} detected")
                return True
            else:
                print(f"❌ Node.js {version} found, but version 20+ required")
                return False
    except FileNotFoundError:
        pass
    
    print("❌ Node.js not found!")
    print("📥 Install Node.js 20+ from: https://nodejs.org/")
    return False

def download_file(url, dest_path):
    """Download file from URL"""
    try:
        print(f"📥 Downloading from GitHub...")
        req = Request(url, headers={'User-Agent': 'MyCodeHelper-Launcher'})
        with urlopen(req) as response:
            with open(dest_path, 'wb') as f:
                shutil.copyfileobj(response, f)
        return True
    except URLError as e:
        print(f"❌ Download failed: {e}")
        return False

def setup_app():
    """Download and setup MyCodeHelper"""
    if APP_DIR.exists() and (APP_DIR / "bundle" / "mycodehelper.js").exists():
        print("✅ MyCodeHelper already installed")
        return True
    
    print("🔧 Setting up MyCodeHelper...")
    
    # Create directories
    LOCAL_DIR.mkdir(exist_ok=True)
    if APP_DIR.exists():
        shutil.rmtree(APP_DIR)
    APP_DIR.mkdir()
    
    # Download ZIP
    zip_path = LOCAL_DIR / "mycodehelper.zip"
    
    # Try to download from releases first, fall back to main branch
    success = False
    try:
        # Try to get latest release
        req = Request(GITHUB_RELEASE_URL, headers={'User-Agent': 'MyCodeHelper-Launcher'})
        with urlopen(req) as response:
            release_data = json.loads(response.read())
            zip_url = release_data['zipball_url']
            success = download_file(zip_url, zip_path)
    except:
        # Fall back to main branch
        success = download_file(GITHUB_ZIP_URL, zip_path)
    
    if not success:
        return False
    
    # Extract ZIP
    try:
        print("📦 Extracting files...")
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(LOCAL_DIR)
        
        # Find extracted directory (GitHub creates random folder names)
        extracted_dirs = [d for d in LOCAL_DIR.iterdir() 
                         if d.is_dir() and d.name != "app"]
        if extracted_dirs:
            shutil.move(str(extracted_dirs[0]), str(APP_DIR))
        
        # Clean up
        zip_path.unlink()
        
        print("✅ MyCodeHelper setup complete")
        return True
        
    except Exception as e:
        print(f"❌ Extraction failed: {e}")
        return False

def install_dependencies():
    """Install Node.js dependencies"""
    package_json = APP_DIR / "package.json"
    node_modules = APP_DIR / "node_modules"
    
    if not package_json.exists():
        print("❌ package.json not found")
        return False
    
    if node_modules.exists():
        print("✅ Dependencies already installed")
        return True
    
    print("📦 Installing dependencies...")
    try:
        result = subprocess.run(['npm', 'install'], 
                              cwd=APP_DIR, 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Dependencies installed")
            return True
        else:
            print(f"❌ npm install failed: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False

def configure_ai():
    """Interactive AI provider configuration"""
    env_file = APP_DIR / ".env"
    
    if env_file.exists():
        print("✅ Configuration found")
        return True
    
    print("\n🤖 AI Provider Setup")
    print("=" * 20)
    print("1) Hugging Face (Cloud-based, free tier)")
    print("2) Local AI (LocalAI, Ollama, etc.)")
    print("3) Skip configuration")
    
    while True:
        choice = input("\nChoose provider (1-3): ").strip()
        
        if choice == "1":
            print("\n🤗 Hugging Face Setup")
            print("Get token from: https://huggingface.co/settings/tokens")
            token = input("Enter Hugging Face API token: ").strip()
            if token:
                config = f"""HUGGING_FACE_API_KEY={token}
HUGGING_FACE_MODEL=microsoft/DialoGPT-large
MYCODEHELPER_DEFAULT_PROVIDER=hugging-face-api-key
"""
                env_file.write_text(config)
                print("✅ Hugging Face configured")
                return True
            
        elif choice == "2":
            print("\n🏠 Local AI Setup")
            base_url = input("Base URL (default: http://localhost:8080): ").strip()
            if not base_url:
                base_url = "http://localhost:8080"
            
            api_key = input("API key (default: local-key): ").strip()
            if not api_key:
                api_key = "local-key"
                
            model = input("Model name (default: llama-3.1-8b): ").strip()
            if not model:
                model = "llama-3.1-8b"
            
            config = f"""LOCAL_AI_API_KEY={api_key}
LOCAL_AI_BASE_URL={base_url}
LOCAL_AI_MODEL={model}
MYCODEHELPER_DEFAULT_PROVIDER=local-ai-api-key
"""
            env_file.write_text(config)
            print("✅ Local AI configured")
            return True
            
        elif choice == "3":
            print("⏭️ Skipping configuration")
            return True
            
        else:
            print("Invalid choice, please enter 1, 2, or 3")

def run_app():
    """Run MyCodeHelper"""
    main_script = APP_DIR / "bundle" / "mycodehelper.js"
    
    if not main_script.exists():
        print("❌ MyCodeHelper executable not found")
        return False
    
    print("\n🚀 Starting MyCodeHelper...")
    print("=" * 30)
    
    try:
        # Run in interactive mode
        subprocess.run(['node', str(main_script)], cwd=APP_DIR)
        return True
    except KeyboardInterrupt:
        print("\n👋 Goodbye!")
        return True
    except Exception as e:
        print(f"❌ Failed to run MyCodeHelper: {e}")
        return False

def show_help():
    """Show help information"""
    print("""
🚀 MyCodeHelper Python Launcher

Usage: python mycodehelper.py [options]

Options:
  --help, -h     Show this help
  --setup        Force re-setup
  --config       Reconfigure AI provider
  --clean        Clean installation and start fresh

Examples:
  python mycodehelper.py           # Run MyCodeHelper
  python mycodehelper.py --setup   # Force re-download
  python mycodehelper.py --config  # Reconfigure AI
  python mycodehelper.py --clean   # Clean install

Requirements:
  - Python 3.7+
  - Node.js 20+
  - Internet connection (first run only)

The launcher will:
  1. Download MyCodeHelper from GitHub
  2. Install Node.js dependencies
  3. Help configure AI providers
  4. Run the application

No manual installation required!
""")

def main():
    """Main launcher function"""
    print_banner()
    
    # Handle command line arguments
    if len(sys.argv) > 1:
        arg = sys.argv[1].lower()
        
        if arg in ['--help', '-h']:
            show_help()
            return
            
        elif arg == '--clean':
            if LOCAL_DIR.exists():
                print("🧹 Cleaning installation...")
                shutil.rmtree(LOCAL_DIR)
                print("✅ Clean complete")
            
        elif arg == '--setup':
            if APP_DIR.exists():
                print("🔄 Forcing re-setup...")
                shutil.rmtree(APP_DIR)
                
        elif arg == '--config':
            if not APP_DIR.exists():
                print("❌ MyCodeHelper not installed. Run without arguments first.")
                return
            configure_ai()
            return
    
    # Check prerequisites
    if not check_prerequisites():
        return
    
    # Setup application
    if not setup_app():
        print("❌ Setup failed")
        return
    
    # Install dependencies
    if not install_dependencies():
        print("❌ Dependency installation failed")
        return
    
    # Configure AI provider
    configure_ai()
    
    # Run the application
    run_app()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n👋 Goodbye!")
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}")
        print("Try running with --clean to start fresh")