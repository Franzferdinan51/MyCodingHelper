#!/bin/bash

# MyCodeHelper Environment Setup Script
# This script helps you configure environment variables for Local AI and Hugging Face

echo "🚀 MyCodeHelper Environment Setup"
echo "=================================="
echo ""

# Check if .env file exists
if [ -f ".env" ]; then
    echo "📁 Found existing .env file"
    read -p "Do you want to update it? (y/n): " update_env
    if [ "$update_env" != "y" ]; then
        echo "Setup cancelled."
        exit 0
    fi
    echo "" >> .env
    echo "# Updated by setup script $(date)" >> .env
else
    echo "📝 Creating new .env file"
    cat > .env << EOL
# MyCodeHelper Configuration
# Generated on $(date)
EOL
fi

echo ""
echo "Choose your AI provider(s):"
echo "1. Local AI (e.g., LocalAI, Ollama)"
echo "2. Hugging Face"
echo "3. Both"
echo ""
read -p "Enter your choice (1-3): " provider_choice

case $provider_choice in
    1|3)
        echo ""
        echo "🤖 Local AI Configuration"
        echo "========================="
        read -p "Enter your Local AI API key (or press Enter to use 'local-key'): " local_api_key
        local_api_key=${local_api_key:-"local-key"}
        
        read -p "Enter your Local AI base URL (default: http://localhost:8080): " local_base_url
        local_base_url=${local_base_url:-"http://localhost:8080"}
        
        read -p "Enter your preferred Local AI model (default: llama-3.1-8b): " local_model
        local_model=${local_model:-"llama-3.1-8b"}
        
        echo "" >> .env
        echo "# Local AI Configuration" >> .env
        echo "LOCAL_AI_API_KEY=\"$local_api_key\"" >> .env
        echo "LOCAL_AI_BASE_URL=\"$local_base_url\"" >> .env
        echo "LOCAL_AI_MODEL=\"$local_model\"" >> .env
        ;;
esac

case $provider_choice in
    2|3)
        echo ""
        echo "🤗 Hugging Face Configuration"
        echo "============================="
        echo "Get your token from: https://huggingface.co/settings/tokens"
        read -p "Enter your Hugging Face API token: " hf_token
        
        if [ -z "$hf_token" ]; then
            echo "❌ Hugging Face token is required!"
            exit 1
        fi
        
        read -p "Enter your preferred Hugging Face model (default: microsoft/DialoGPT-large): " hf_model
        hf_model=${hf_model:-"microsoft/DialoGPT-large"}
        
        echo "" >> .env
        echo "# Hugging Face Configuration" >> .env
        echo "HUGGING_FACE_API_KEY=\"$hf_token\"" >> .env
        echo "HUGGING_FACE_MODEL=\"$hf_model\"" >> .env
        ;;
esac

# Set default provider
if [ "$provider_choice" = "1" ]; then
    default_provider="local-ai-api-key"
elif [ "$provider_choice" = "2" ]; then
    default_provider="hugging-face-api-key"
else
    echo ""
    read -p "Which provider should be default? (1=Local AI, 2=Hugging Face): " default_choice
    if [ "$default_choice" = "1" ]; then
        default_provider="local-ai-api-key"
    else
        default_provider="hugging-face-api-key"
    fi
fi

echo "" >> .env
echo "# Default Provider" >> .env
echo "MYCODEHELPER_DEFAULT_PROVIDER=\"$default_provider\"" >> .env

# Optional advanced settings
echo ""
read -p "Do you want to configure advanced settings? (y/n): " advanced
if [ "$advanced" = "y" ]; then
    echo ""
    echo "⚙️ Advanced Configuration"
    echo "========================"
    
    read -p "Max tokens (default: 4096): " max_tokens
    max_tokens=${max_tokens:-4096}
    
    read -p "Temperature 0.0-2.0 (default: 0.7): " temperature
    temperature=${temperature:-0.7}
    
    read -p "Custom system prompt (optional): " system_prompt
    
    echo "" >> .env
    echo "# Advanced Settings" >> .env
    echo "MYCODEHELPER_MAX_TOKENS=$max_tokens" >> .env
    echo "MYCODEHELPER_TEMPERATURE=$temperature" >> .env
    if [ ! -z "$system_prompt" ]; then
        echo "MYCODEHELPER_SYSTEM_PROMPT=\"$system_prompt\"" >> .env
    fi
fi

echo ""
echo "✅ Configuration complete!"
echo ""
echo "📄 Your .env file has been created/updated with:"
echo "=============================================="
cat .env
echo ""
echo "🚀 To start MyCodeHelper:"
echo "  npm run compile  # Compile the app"
echo "  npm start         # Start the app"
echo ""
echo "💡 To load environment variables in your current shell:"
echo "  source .env"
echo ""
echo "🔧 For Local AI setup, see: https://localai.io/getting-started/"
echo "🤗 For Hugging Face setup, see: https://huggingface.co/docs/api-inference/"