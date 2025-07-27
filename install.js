#!/usr/bin/env node

/**
 * MyCodeHelper Quick Install Script
 * Handles dependencies and basic setup
 */

import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';

console.log('🚀 MyCodeHelper Quick Install');
console.log('=============================\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 20) {
  console.log('❌ Error: Node.js 20+ required');
  console.log(`   Current version: ${nodeVersion}`);
  console.log('   Download from: https://nodejs.org/\n');
  process.exit(1);
}

console.log(`✅ Node.js ${nodeVersion} detected\n`);

// Install dependencies if package-lock.json doesn't exist
if (!existsSync('package-lock.json')) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed\n');
  } catch (error) {
    console.log('❌ Failed to install dependencies');
    console.log('   Try running: npm install\n');
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed\n');
}

// Check if .env exists
if (!existsSync('.env')) {
  console.log('⚙️ No .env file found');
  console.log('📋 To configure AI providers:');
  console.log('   • Run: node setup.js (interactive)');
  console.log('   • Or manually create .env file');
  console.log('   • Or set environment variables\n');
  
  // Create sample .env
  const sampleEnv = `# MyCodeHelper Configuration
# Choose ONE provider and uncomment the relevant lines:

# Hugging Face (Cloud)
# HUGGING_FACE_API_KEY=hf_your-token-here
# HUGGING_FACE_MODEL=microsoft/DialoGPT-large

# Local AI (Privacy)
# LOCAL_AI_API_KEY=local-key
# LOCAL_AI_BASE_URL=http://localhost:8080
# LOCAL_AI_MODEL=llama-3.1-8b

# Advanced Settings (Optional)
# MYCODEHELPER_MAX_TOKENS=4096
# MYCODEHELPER_TEMPERATURE=0.7
`;
  
  writeFileSync('.env.example', sampleEnv);
  console.log('📄 Created .env.example file for reference\n');
} else {
  console.log('✅ Configuration file (.env) found\n');
}

console.log('🎉 Installation complete!');
console.log('');
console.log('🚀 Quick Start:');
console.log('   1. Configure AI provider: node setup.js');
console.log('   2. Start coding: npm start');
console.log('');
console.log('📖 Need help? Check README.md or QUICKSTART.md');
console.log('');