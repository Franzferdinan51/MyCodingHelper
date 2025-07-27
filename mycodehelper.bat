@echo off
REM MyCodeHelper Windows Batch File
REM This makes it easy to run MyCodeHelper on Windows

echo.
echo 🚀 MyCodeHelper - Local AI ^& Hugging Face Edition
echo ============================================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Python is not installed or not in PATH
    echo.
    echo Please install Python 3.7+ from: https://python.org/
    echo.
    pause
    exit /b 1
)

REM Check if the main script exists
if not exist "mycodehelper-standalone.py" (
    echo ❌ Error: mycodehelper-standalone.py not found
    echo.
    echo Please ensure you're running this from the mycodehelper directory
    echo.
    pause
    exit /b 1
)

REM Run the application
python mycodehelper-standalone.py

REM Keep console open if there was an error
if %errorlevel% neq 0 (
    echo.
    echo ❌ MyCodeHelper exited with an error
    echo.
    pause
)