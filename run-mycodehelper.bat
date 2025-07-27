@echo off
REM MyCodeHelper Universal Windows Launcher
REM Works with or without installation

echo.
echo 🚀 MyCodeHelper Universal Launcher
echo ===================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python not found. Checking for Node.js...
    goto :check_node
)

REM Check if standalone Python launcher exists
if exist "mycodehelper-standalone.py" (
    echo ✅ Python detected. Using standalone launcher...
    python mycodehelper-standalone.py
    goto :end
)

REM Check if regular Python launcher exists
if exist "mycodehelper.py" (
    echo ✅ Python detected. Using download launcher...
    python mycodehelper.py
    goto :end
)

:check_node
REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Neither Python nor Node.js found!
    echo.
    echo Please install either:
    echo   • Python 3.7+ from: https://python.org/
    echo   • Node.js 20+ from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if MyCodeHelper JS exists
if exist "bundle\mycodehelper.js" (
    echo ✅ Node.js detected. Running MyCodeHelper directly...
    node bundle\mycodehelper.js
    goto :end
)

REM Check if there's a standalone JS file
if exist "mycodehelper.js" (
    echo ✅ Node.js detected. Running standalone version...
    node mycodehelper.js
    goto :end
)

echo ❌ No MyCodeHelper installation found!
echo.
echo Available options:
echo   1. Download mycodehelper-standalone.py and run this script
echo   2. Download the full MyCodeHelper package
echo   3. Clone from GitHub: git clone your-repo-url
echo.
pause

:end
if %errorlevel% neq 0 (
    echo.
    echo ❌ MyCodeHelper exited with an error
    echo.
    pause
)