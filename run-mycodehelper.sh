#!/bin/bash
# MyCodeHelper Universal Launcher
# Works with or without installation

echo
echo "🚀 MyCodeHelper Universal Launcher"
echo "==================================="
echo

# Check if Python is available
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    PYTHON_CMD=""
fi

# Try Python standalone launcher first
if [ -n "$PYTHON_CMD" ] && [ -f "mycodehelper-standalone.py" ]; then
    echo "✅ Python detected. Using standalone launcher..."
    $PYTHON_CMD mycodehelper-standalone.py
    exit $?
fi

# Try Python download launcher
if [ -n "$PYTHON_CMD" ] && [ -f "mycodehelper.py" ]; then
    echo "✅ Python detected. Using download launcher..."
    $PYTHON_CMD mycodehelper.py
    exit $?
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Neither Python nor Node.js found!"
    echo
    echo "Please install either:"
    echo "  • Python 3.7+ from: https://python.org/"
    echo "  • Node.js 20+ from: https://nodejs.org/"
    echo
    exit 1
fi

# Try direct MyCodeHelper execution
if [ -f "bundle/mycodehelper.js" ]; then
    echo "✅ Node.js detected. Running MyCodeHelper directly..."
    node bundle/mycodehelper.js
    exit $?
fi

# Try standalone JS
if [ -f "mycodehelper.js" ]; then
    echo "✅ Node.js detected. Running standalone version..."
    node mycodehelper.js
    exit $?
fi

echo "❌ No MyCodeHelper installation found!"
echo
echo "Available options:"
echo "  1. Download mycodehelper-standalone.py and run this script"
echo "  2. Download the full MyCodeHelper package"
echo "  3. Clone from GitHub: git clone your-repo-url"
echo