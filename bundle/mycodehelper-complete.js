/**
 * MyCodeHelper Complete - Full Gemini CLI Feature Parity
 * Local AI & Hugging Face Edition
 * 
 * Complete AI-powered code assistant with all original Gemini CLI features
 * converted to work with Local AI and Hugging Face.
 */

import { createInterface } from 'readline';
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from 'fs';
import { join, dirname, basename, extname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simple fetch implementation for Node.js environments that don't have it
const fetch = globalThis.fetch || (await import('undici')).fetch;

// Enhanced Configuration with CLI support
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
  maxTokens: parseInt(process.env.MYCODEHELPER_MAX_TOKENS || '8192'),
  temperature: parseFloat(process.env.MYCODEHELPER_TEMPERATURE || '0.7'),
  defaultProvider: process.env.MYCODEHELPER_DEFAULT_PROVIDER || 'local-ai-api-key',
  streaming: process.env.MYCODEHELPER_STREAMING !== 'false',
  outputFormat: process.env.MYCODEHELPER_OUTPUT_FORMAT || 'text',
  contextWindow: parseInt(process.env.MYCODEHELPER_CONTEXT_WINDOW || '100000'),
  projectRoot: process.cwd()
};

// CLI Arguments Parser
class CLIParser {
  constructor() {
    this.args = this.parseArgs();
  }

  parseArgs() {
    const args = process.argv.slice(2);
    const parsed = {
      interactive: false,
      file: null,
      output: null,
      format: 'text',
      stream: true,
      help: false,
      version: false,
      prompt: null,
      analyze: false,
      codebase: false,
      config: null
    };

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      
      if (arg === '--interactive' || arg === '-i') {
        parsed.interactive = true;
      } else if (arg === '--file' || arg === '-f') {
        parsed.file = args[++i];
      } else if (arg === '--output' || arg === '-o') {
        parsed.output = args[++i];
      } else if (arg === '--format') {
        parsed.format = args[++i];
      } else if (arg === '--no-stream') {
        parsed.stream = false;
      } else if (arg === '--help' || arg === '-h') {
        parsed.help = true;
      } else if (arg === '--version' || arg === '-v') {
        parsed.version = true;
      } else if (arg === '--analyze' || arg === '-a') {
        parsed.analyze = true;
      } else if (arg === '--codebase' || arg === '-c') {
        parsed.codebase = true;
      } else if (arg === '--config') {
        parsed.config = args[++i];
      } else if (!arg.startsWith('-') && !parsed.prompt) {
        parsed.prompt = args.slice(i).join(' ');
        break;
      }
    }

    return parsed;
  }
}

// File System Utilities
class FileUtils {
  static readFile(filepath) {
    try {
      if (!existsSync(filepath)) return null;
      const content = readFileSync(filepath, 'utf-8');
      const stats = statSync(filepath);
      return {
        path: filepath,
        content,
        size: stats.size,
        modified: stats.mtime,
        extension: extname(filepath)
      };
    } catch (error) {
      console.error(`Error reading file ${filepath}:`, error.message);
      return null;
    }
  }

  static writeFile(filepath, content) {
    try {
      writeFileSync(filepath, content, 'utf-8');
      return true;
    } catch (error) {
      console.error(`Error writing file ${filepath}:`, error.message);
      return false;
    }
  }

  static analyzeCodebase(rootPath = '.', maxFiles = 100) {
    const files = [];
    const ignoreDirs = new Set(['node_modules', '.git', 'dist', 'build', '.next', '__pycache__']);
    const codeExts = new Set(['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.cpp', '.c', '.cs', '.php', '.rb', '.go', '.rs', '.swift', '.kt']);

    const scanDir = (dir, depth = 0) => {
      if (depth > 5 || files.length >= maxFiles) return;
      
      try {
        const entries = readdirSync(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          if (files.length >= maxFiles) break;
          
          const fullPath = join(dir, entry.name);
          
          if (entry.isDirectory() && !ignoreDirs.has(entry.name)) {
            scanDir(fullPath, depth + 1);
          } else if (entry.isFile() && codeExts.has(extname(entry.name))) {
            const file = this.readFile(fullPath);
            if (file && file.size < 100000) { // Skip very large files
              files.push(file);
            }
          }
        }
      } catch (error) {
        // Skip directories we can't read
      }
    };

    scanDir(rootPath);
    return files;
  }

  static getProjectSummary(rootPath = '.') {
    const files = this.analyzeCodebase(rootPath, 50);
    const summary = {
      totalFiles: files.length,
      languages: {},
      totalLines: 0,
      structure: {},
      mainFiles: []
    };

    files.forEach(file => {
      const ext = file.extension;
      summary.languages[ext] = (summary.languages[ext] || 0) + 1;
      summary.totalLines += file.content.split('\n').length;
      
      // Track main files
      const name = basename(file.path).toLowerCase();
      if (['index', 'main', 'app', 'server', 'package.json', 'readme'].some(main => name.includes(main))) {
        summary.mainFiles.push(file.path);
      }
    });

    return summary;
  }
}

// Enhanced AI Clients with streaming and file support
class LocalAIClient {
  constructor(config) {
    this.config = config;
  }

  async generateContent(message, options = {}) {
    try {
      const messages = this.buildMessages(message, options);
      
      const requestBody = {
        model: this.config.model,
        messages,
        temperature: CONFIG.temperature,
        max_tokens: CONFIG.maxTokens,
        stream: options.stream !== false && CONFIG.streaming
      };

      const response = await fetch(`${this.config.baseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Local AI API error: ${response.status} ${response.statusText}`);
      }

      if (requestBody.stream) {
        return this.handleStreamingResponse(response);
      } else {
        const data = await response.json();
        return data.choices?.[0]?.message?.content || 'No response from Local AI';
      }
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }

  buildMessages(message, options) {
    const messages = [];
    
    // Add system message if provided
    if (options.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt });
    }

    // Add file context if provided
    if (options.files && options.files.length > 0) {
      const fileContext = options.files.map(file => 
        `File: ${file.path}\n\`\`\`${file.extension}\n${file.content}\n\`\`\``
      ).join('\n\n');
      
      messages.push({ 
        role: 'system', 
        content: `Here are the relevant files for context:\n\n${fileContext}` 
      });
    }

    // Add conversation history if provided
    if (options.history && options.history.length > 0) {
      messages.push(...options.history);
    }

    // Add the current message
    messages.push({ role: 'user', content: message });

    return messages;
  }

  async handleStreamingResponse(response) {
    let fullResponse = '';
    const reader = response.body.getReader();
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return fullResponse;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || '';
              if (content) {
                process.stdout.write(content);
                fullResponse += content;
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
    
    return fullResponse;
  }
}

class HuggingFaceClient {
  constructor(config) {
    this.config = config;
  }

  async generateContent(message, options = {}) {
    try {
      const prompt = this.buildPrompt(message, options);
      
      const response = await fetch(`https://api-inference.huggingface.co/models/${this.config.model}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            temperature: CONFIG.temperature,
            max_new_tokens: CONFIG.maxTokens,
            return_full_text: false,
            do_sample: true
          },
          options: {
            wait_for_model: true,
            use_cache: false
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Hugging Face API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      const result = Array.isArray(data) ? data[0]?.generated_text || 'No response' : data.generated_text || 'No response';
      
      if (options.stream !== false && CONFIG.streaming) {
        // Simulate streaming for HF
        this.simulateStreaming(result);
      }
      
      return result;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }

  buildPrompt(message, options) {
    let prompt = '';
    
    if (options.systemPrompt) {
      prompt += `System: ${options.systemPrompt}\n\n`;
    }
    
    if (options.files && options.files.length > 0) {
      prompt += 'Files for context:\n';
      options.files.forEach(file => {
        prompt += `\n${file.path}:\n${file.content}\n`;
      });
      prompt += '\n';
    }
    
    if (options.history && options.history.length > 0) {
      options.history.forEach(msg => {
        prompt += `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}\n`;
      });
    }
    
    prompt += `Human: ${message}\nAssistant:`;
    return prompt;
  }

  simulateStreaming(text) {
    const words = text.split(' ');
    let index = 0;
    
    const printWord = () => {
      if (index < words.length) {
        process.stdout.write(words[index] + ' ');
        index++;
        setTimeout(printWord, 50);
      }
    };
    
    if (CONFIG.streaming) {
      printWord();
    }
  }
}

// Main Application with full CLI support
class MyCodeHelperComplete {
  constructor() {
    this.conversation = [];
    this.projectContext = null;
    this.cliParser = new CLIParser();
    this.client = null;
    this.providerType = '';
  }

  async initialize() {
    // Handle CLI arguments first
    if (this.cliParser.args.help) {
      this.showHelp();
      return false;
    }

    if (this.cliParser.args.version) {
      console.log('MyCodeHelper Complete v0.1.13 - Local AI & Hugging Face Edition');
      return false;
    }

    // Load configuration
    if (this.cliParser.args.config) {
      this.loadConfig(this.cliParser.args.config);
    }

    // Initialize AI provider
    if (CONFIG.HUGGING_FACE.apiKey) {
      this.client = new HuggingFaceClient(CONFIG.HUGGING_FACE);
      this.providerType = 'Hugging Face';
    } else if (CONFIG.LOCAL_AI.apiKey) {
      this.client = new LocalAIClient(CONFIG.LOCAL_AI);
      this.providerType = 'Local AI';
    } else {
      console.log('❌ No AI provider configured!');
      console.log('Set HUGGING_FACE_API_KEY or LOCAL_AI_API_KEY environment variable.');
      return false;
    }

    // Load project context if analyzing codebase
    if (this.cliParser.args.codebase || this.cliParser.args.analyze) {
      this.projectContext = FileUtils.getProjectSummary();
    }

    return true;
  }

  async run() {
    const initialized = await this.initialize();
    if (!initialized) return;

    // Handle non-interactive modes
    if (this.cliParser.args.file) {
      await this.processFile(this.cliParser.args.file);
    } else if (this.cliParser.args.prompt) {
      await this.processPrompt(this.cliParser.args.prompt);
    } else if (this.cliParser.args.analyze) {
      await this.analyzeProject();
    } else {
      // Default to interactive mode
      await this.interactiveMode();
    }
  }

  async processFile(filepath) {
    const file = FileUtils.readFile(filepath);
    if (!file) {
      console.log(`❌ Could not read file: ${filepath}`);
      return;
    }

    console.log(`🔍 Processing file: ${filepath}`);
    console.log(`📊 Size: ${file.size} bytes`);
    console.log('');

    const prompt = this.cliParser.args.prompt || `Analyze this ${file.extension} file and provide insights:`;
    
    const options = {
      files: [file],
      stream: this.cliParser.args.stream,
      systemPrompt: 'You are an expert code analyst. Provide detailed insights about the provided file.'
    };

    const response = await this.client.generateContent(prompt, options);
    
    if (!options.stream) {
      console.log(response);
    }
    console.log('');

    // Save output if requested
    if (this.cliParser.args.output) {
      FileUtils.writeFile(this.cliParser.args.output, response);
      console.log(`💾 Output saved to: ${this.cliParser.args.output}`);
    }
  }

  async processPrompt(prompt) {
    console.log(`🤖 ${this.providerType}:`);

    const options = {
      stream: this.cliParser.args.stream,
      systemPrompt: this.getSystemPrompt()
    };

    // Add project context if available
    if (this.projectContext) {
      options.systemPrompt += `\n\nProject Context: ${JSON.stringify(this.projectContext, null, 2)}`;
    }

    const response = await this.client.generateContent(prompt, options);
    
    if (!options.stream) {
      console.log(response);
    }
    console.log('');

    // Save output if requested
    if (this.cliParser.args.output) {
      FileUtils.writeFile(this.cliParser.args.output, response);
      console.log(`💾 Output saved to: ${this.cliParser.args.output}`);
    }
  }

  async analyzeProject() {
    console.log('🔍 Analyzing codebase...');
    const files = FileUtils.analyzeCodebase();
    const summary = FileUtils.getProjectSummary();

    console.log('📊 Project Summary:');
    console.log(`   Files: ${summary.totalFiles}`);
    console.log(`   Languages: ${Object.keys(summary.languages).join(', ')}`);
    console.log(`   Total Lines: ${summary.totalLines}`);
    console.log('');

    const prompt = 'Analyze this codebase structure and provide insights about the architecture, patterns, and potential improvements.';
    
    const options = {
      files: files.slice(0, 10), // Limit to first 10 files
      stream: this.cliParser.args.stream,
      systemPrompt: `You are a senior software architect. Analyze this codebase and provide insights about architecture, code quality, and recommendations.\n\nProject Summary: ${JSON.stringify(summary, null, 2)}`
    };

    console.log(`🤖 ${this.providerType} Analysis:`);
    const response = await this.client.generateContent(prompt, options);
    
    if (!options.stream) {
      console.log(response);
    }
    console.log('');
  }

  async interactiveMode() {
    console.log('🚀 MyCodeHelper Complete v0.1.13 - Local AI & Hugging Face Edition');
    console.log('============================================================');
    console.log(`✅ Using ${this.providerType}: ${this.client.config.model}`);
    
    if (this.projectContext) {
      console.log(`📁 Project context loaded: ${this.projectContext.totalFiles} files`);
    }
    
    console.log('\n💡 Enhanced features: file processing, codebase analysis, streaming');
    console.log('💡 Type "help" for commands, "exit" to quit.\n');

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const askQuestion = () => {
      return new Promise((resolve) => {
        rl.question('👤 You: ', resolve);
      });
    };

    while (true) {
      try {
        const userInput = await askQuestion();
        
        if (userInput.toLowerCase() === 'exit' || userInput.toLowerCase() === 'quit') {
          console.log('👋 Goodbye!');
          break;
        }

        if (userInput.toLowerCase() === 'help') {
          this.showInteractiveHelp();
          continue;
        }

        if (userInput.toLowerCase() === 'clear') {
          this.conversation = [];
          console.log('🧹 Conversation cleared.');
          continue;
        }

        if (userInput.toLowerCase() === 'status') {
          this.showStatus();
          continue;
        }

        if (userInput.toLowerCase() === 'analyze') {
          await this.analyzeProject();
          continue;
        }

        if (userInput.startsWith('file ')) {
          const filepath = userInput.slice(5).trim();
          await this.processFileInteractive(filepath);
          continue;
        }

        if (userInput.trim() === '') {
          continue;
        }

        // Add user message to conversation
        this.conversation.push({ role: 'user', content: userInput });

        const options = {
          history: this.conversation.slice(-10), // Keep last 10 messages
          stream: CONFIG.streaming,
          systemPrompt: this.getSystemPrompt()
        };

        if (this.projectContext) {
          options.systemPrompt += `\n\nProject Context: ${JSON.stringify(this.projectContext, null, 2)}`;
        }

        process.stdout.write(`🤖 ${this.providerType}: `);
        const response = await this.client.generateContent(userInput, options);
        
        if (!CONFIG.streaming) {
          console.log(response);
        }
        console.log('');

        // Add AI response to conversation
        this.conversation.push({ role: 'assistant', content: response });

      } catch (error) {
        console.log(`❌ Error: ${error.message}`);
        console.log('');
      }
    }

    rl.close();
  }

  async processFileInteractive(filepath) {
    const file = FileUtils.readFile(filepath);
    if (!file) {
      console.log(`❌ Could not read file: ${filepath}`);
      return;
    }

    console.log(`📁 Loaded: ${filepath} (${file.size} bytes)`);
    
    const options = {
      files: [file],
      history: this.conversation.slice(-5),
      stream: CONFIG.streaming,
      systemPrompt: this.getSystemPrompt() + '\n\nThe user has provided a file for analysis.'
    };

    const prompt = `Please analyze the file ${filepath} and provide insights.`;
    
    process.stdout.write(`🤖 ${this.providerType}: `);
    const response = await this.client.generateContent(prompt, options);
    
    if (!CONFIG.streaming) {
      console.log(response);
    }
    console.log('');

    this.conversation.push({ role: 'user', content: `[File: ${filepath}]` });
    this.conversation.push({ role: 'assistant', content: response });
  }

  getSystemPrompt() {
    return `You are MyCodeHelper, an expert AI coding assistant. You help with:
- Code analysis and debugging
- Architecture and design patterns  
- Best practices and optimization
- Documentation and explanations
- Problem solving and algorithms

Provide clear, actionable, and helpful responses. When analyzing code, be specific about improvements and potential issues.`;
  }

  loadConfig(configPath) {
    try {
      const config = JSON.parse(FileUtils.readFile(configPath).content);
      Object.assign(CONFIG, config);
      console.log(`📄 Configuration loaded from: ${configPath}`);
    } catch (error) {
      console.log(`❌ Could not load config: ${error.message}`);
    }
  }

  showHelp() {
    console.log(`
🚀 MyCodeHelper Complete - Full-Featured AI Code Assistant

USAGE:
  mycodehelper [OPTIONS] [PROMPT]

OPTIONS:
  -i, --interactive          Start interactive mode (default)
  -f, --file <path>         Process a specific file
  -o, --output <path>       Save output to file  
  -a, --analyze             Analyze current codebase
  -c, --codebase            Load project context
  --format <format>         Output format (text, json, markdown)
  --no-stream              Disable streaming responses
  --config <path>          Load configuration file
  -h, --help               Show this help
  -v, --version            Show version

EXAMPLES:
  mycodehelper                                    # Interactive mode
  mycodehelper "Explain this error message"       # Single prompt
  mycodehelper -f app.js "Review this code"       # Analyze file
  mycodehelper -a                                 # Analyze codebase
  mycodehelper --codebase "What's the architecture?" # With project context
  mycodehelper -f script.py -o analysis.md        # Save to file

INTERACTIVE COMMANDS:
  help                     Show interactive help
  clear                    Clear conversation history
  status                   Show current configuration
  analyze                  Analyze current codebase
  file <path>              Load and analyze a file
  exit                     Quit the application

ENVIRONMENT VARIABLES:
  HUGGING_FACE_API_KEY     Hugging Face API token
  HUGGING_FACE_MODEL       Hugging Face model name
  LOCAL_AI_API_KEY         Local AI API key
  LOCAL_AI_BASE_URL        Local AI server URL
  LOCAL_AI_MODEL           Local AI model name
  MYCODEHELPER_MAX_TOKENS  Maximum response tokens (default: 8192)
  MYCODEHELPER_TEMPERATURE Response creativity (default: 0.7)
  MYCODEHELPER_STREAMING   Enable streaming (default: true)

For more information, visit: https://github.com/your-repo/mycodehelper
`);
  }

  showInteractiveHelp() {
    console.log('📖 Interactive Commands:');
    console.log('========================');
    console.log('  help                     Show this help message');
    console.log('  clear                    Clear conversation history');
    console.log('  status                   Show current configuration');
    console.log('  analyze                  Analyze current codebase');
    console.log('  file <path>              Load and analyze a file');
    console.log('  exit                     Exit the application');
    console.log('');
    console.log('💡 Examples:');
    console.log('  "How do I create a React component?"');
    console.log('  "file src/app.js"');
    console.log('  "Explain the MVC pattern"');
    console.log('  "analyze"');
    console.log('');
  }

  showStatus() {
    console.log('⚙️ MyCodeHelper Status:');
    console.log('======================');
    console.log(`Provider: ${this.providerType}`);
    console.log(`Model: ${this.client.config.model}`);
    console.log(`Conversation length: ${this.conversation.length} messages`);
    console.log(`Temperature: ${CONFIG.temperature}`);
    console.log(`Max tokens: ${CONFIG.maxTokens}`);
    console.log(`Streaming: ${CONFIG.streaming ? 'enabled' : 'disabled'}`);
    console.log(`Project context: ${this.projectContext ? 'loaded' : 'not loaded'}`);
    console.log(`Working directory: ${CONFIG.projectRoot}`);
    console.log('');
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n👋 Goodbye!');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Goodbye!');
  process.exit(0);
});

// Run the application
async function main() {
  const app = new MyCodeHelperComplete();
  await app.run();
}

main().catch(error => {
  console.error('💥 Fatal error:', error.message);
  process.exit(1);
});