@echo off
REM Windows Environment Setup for MyCodeHelper
setlocal enabledelayedexpansion

echo.
echo 🚀 MyCodeHelper Environment Setup (Windows)
echo ============================================================
echo.

echo This will help you configure MyCodeHelper for Windows.
echo.

:choose_provider
echo Choose your AI provider:
echo.
echo 1) Hugging Face (Cloud-based, free tier available)
echo 2) Local AI (LocalAI, Ollama, etc. - Complete privacy)
echo 3) Skip setup (configure manually later)
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto setup_huggingface
if "%choice%"=="2" goto setup_localai
if "%choice%"=="3" goto skip_setup
echo Invalid choice. Please enter 1, 2, or 3.
goto choose_provider

:setup_huggingface
echo.
echo 🤗 Setting up Hugging Face
echo ============================================================
echo.
echo To use Hugging Face, you need an API token.
echo.
echo 1. Go to: https://huggingface.co/settings/tokens
echo 2. Create a new token with 'Read' permissions
echo 3. Copy the token (starts with 'hf_')
echo.
set /p hf_token="Enter your Hugging Face API token: "

if "%hf_token%"=="" (
    echo Error: Token cannot be empty
    goto setup_huggingface
)

echo.
set /p hf_model="Enter model name (default: microsoft/DialoGPT-large): "
if "%hf_model%"=="" set hf_model=microsoft/DialoGPT-large

echo.
echo Creating .env file with Hugging Face configuration...
echo HUGGING_FACE_API_KEY=%hf_token% > .env
echo HUGGING_FACE_MODEL=%hf_model% >> .env
echo MYCODEHELPER_DEFAULT_PROVIDER=hugging-face-api-key >> .env

echo.
echo ✅ Hugging Face configured successfully!
goto finish

:setup_localai
echo.
echo 🏠 Setting up Local AI
echo ============================================================
echo.
echo Local AI options:
echo 1) LocalAI (http://localhost:8080)
echo 2) Ollama (http://localhost:11434/v1)
echo 3) Custom URL
echo.
set /p local_choice="Choose Local AI type (1-3): "

if "%local_choice%"=="1" (
    set base_url=http://localhost:8080
    set model=llama-3.1-8b
) else if "%local_choice%"=="2" (
    set base_url=http://localhost:11434/v1
    set model=llama3.1:8b
) else if "%local_choice%"=="3" (
    set /p base_url="Enter base URL: "
    set /p model="Enter model name: "
) else (
    echo Invalid choice
    goto setup_localai
)

echo.
set /p api_key="Enter API key (default: local-key): "
if "%api_key%"=="" set api_key=local-key

echo.
echo Creating .env file with Local AI configuration...
echo LOCAL_AI_API_KEY=%api_key% > .env
echo LOCAL_AI_BASE_URL=%base_url% >> .env
echo LOCAL_AI_MODEL=%model% >> .env
echo MYCODEHELPER_DEFAULT_PROVIDER=local-ai-api-key >> .env

echo.
echo ✅ Local AI configured successfully!
goto finish

:skip_setup
echo.
echo ⏭️ Skipping automatic setup
echo.
echo You can manually configure MyCodeHelper by:
echo 1. Creating a .env file in this directory
echo 2. Setting the appropriate environment variables
echo.
echo See README.md for configuration details.
goto finish

:finish
echo.
echo 🎉 Setup complete!
echo.
echo To start MyCodeHelper:
echo   1. Double-click mycodehelper.bat
echo   2. Or run: node bundle\mycodehelper.js
echo.
echo For help: See README.md or QUICKSTART.md
echo.
pause