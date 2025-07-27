@echo off
REM MyCodeHelper Windows Batch File
REM This makes it easy to run MyCodeHelper on Windows

echo.
echo 🚀 MyCodeHelper - Local AI ^& Hugging Face Edition
echo ============================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Node.js is not installed or not in PATH
    echo.
    echo Please install Node.js 20+ from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if the main script exists
if not exist "bundle\mycodehelper.js" (
    echo ❌ Error: mycodehelper.js not found in bundle directory
    echo.
    echo Please ensure you're running this from the mycodehelper directory
    echo.
    pause
    exit /b 1
)

REM Run the application
node bundle\mycodehelper.js

REM Keep console open if there was an error
if %errorlevel% neq 0 (
    echo.
    echo ❌ MyCodeHelper exited with an error
    echo.
    pause
)