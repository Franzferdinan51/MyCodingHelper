#!/usr/bin/env node

/**
 * MyCodeHelper Setup Script
 * Simple setup for the minimal distribution
 */

import { createInterface } from 'readline';
import { writeFileSync, existsSync } from 'fs';

console.log('🚀 MyCodeHelper Setup');
console.log('====================\n');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};

async function setup() {
  console.log('Choose your AI provider:\n');
  console.log('1) Hugging Face (Cloud-based, free tier available)');
  console.log('2) Local AI (LocalAI, Ollama, etc. - Complete privacy)');
  console.log('3) Skip setup\n');

  const choice = await askQuestion('Enter your choice (1-3): ');

  let envContent = '';

  if (choice === '1') {
    console.log('\n🤗 Setting up Hugging Face\n');
    console.log('Get your API token from: https://huggingface.co/settings/tokens\n');
    
    const token = await askQuestion('Enter your Hugging Face API token: ');
    const model = await askQuestion('Enter model name (default: microsoft/DialoGPT-large): ') || 'microsoft/DialoGPT-large';
    
    envContent = `HUGGING_FACE_API_KEY=${token}
HUGGING_FACE_MODEL=${model}
MYCODEHELPER_DEFAULT_PROVIDER=hugging-face-api-key
`;
  } else if (choice === '2') {
    console.log('\n🏠 Setting up Local AI\n');
    
    const baseUrl = await askQuestion('Enter base URL (default: http://localhost:8080): ') || 'http://localhost:8080';
    const apiKey = await askQuestion('Enter API key (default: local-key): ') || 'local-key';
    const model = await askQuestion('Enter model name (default: llama-3.1-8b): ') || 'llama-3.1-8b';
    
    envContent = `LOCAL_AI_API_KEY=${apiKey}
LOCAL_AI_BASE_URL=${baseUrl}
LOCAL_AI_MODEL=${model}
MYCODEHELPER_DEFAULT_PROVIDER=local-ai-api-key
`;
  } else {
    console.log('\n⏭️ Skipping setup. You can manually create a .env file.\n');
    rl.close();
    return;
  }

  if (envContent) {
    writeFileSync('.env', envContent);
    console.log('\n✅ Configuration saved to .env file!\n');
  }

  console.log('🎉 Setup complete!\n');
  console.log('To start MyCodeHelper:');
  console.log('  npm start');
  console.log('  or: node bundle/mycodehelper.js\n');

  rl.close();
}

setup().catch(console.error);