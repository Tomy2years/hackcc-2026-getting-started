#!/usr/bin/env node

/**
 * HackCC Pre-Commit & CI Secret Scanner
 * Lightweight safety net designed to prevent hackathon teams from accidentally
 * pushing sensitive API keys or .env files to public GitHub repositories.
 */

import fs from 'fs';
import path from 'path';

const SECRET_PATTERNS = [
  { name: 'OpenAI API Key', regex: /sk-[a-zA-Z0-9]{20,}/ },
  { name: 'Anthropic API Key', regex: /sk-ant-[a-zA-Z0-9]{20,}/ },
  { name: 'GitHub Personal Access Token', regex: /(ghp_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9_]{50,})/ },
  { name: 'AWS Access Key', regex: /AKIA[0-9A-Z]{16}/ },
  { name: 'Private Key Block', regex: /-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/ },
  { name: 'Google / Gemini API Key', regex: /AIza[0-9A-Za-z-_]{35}/ },
  { name: 'Slack Bot Token', regex: /xoxb-[0-9]{10,}-[0-9]{10,}-[a-zA-Z0-9]{24}/ },
];

const IGNORED_DIRS = new Set([
  'node_modules',
  'dist',
  'build',
  '.git',
  '.devcontainer',
  'assets',
]);

const IGNORED_FILES = new Set([
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  '.env.example',
  'check-secrets.js',
]);

let violations = [];

function scanFile(filePath) {
  const fileName = path.basename(filePath);
  
  // Guard against committing actual .env files
  if (fileName.startsWith('.env') && fileName !== '.env.example') {
    violations.push({
      file: filePath,
      line: 1,
      rule: 'Committed .env File',
      detail: `File '${fileName}' contains private environment variables. Never commit actual .env files!`,
    });
    return;
  }

  if (IGNORED_FILES.has(fileName)) return;

  try {
    const stats = fs.statSync(filePath);
    if (stats.size > 2 * 1024 * 1024) {
      // Over 2MB warning (often large binaries / media accidentally committed)
      violations.push({
        file: filePath,
        line: 0,
        rule: 'Large File (>2MB)',
        detail: `File is ${(stats.size / 1024 / 1024).toFixed(1)}MB. Avoid committing large media files to git.`,
      });
      return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const pattern of SECRET_PATTERNS) {
        if (pattern.regex.test(line)) {
          violations.push({
            file: filePath,
            line: i + 1,
            rule: pattern.name,
            detail: `Found potential secret matching pattern '${pattern.name}'. Use .env with .gitignore instead!`,
          });
        }
      }
    }
  } catch (err) {
    // Binary or unreadable file, ignore safely
  }
}

function traverse(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        traverse(fullPath);
      }
    } else {
      scanFile(fullPath);
    }
  }
}

console.log('🔍 [HackCC Git Guard] Scanning repository for secrets & sensitive files...');
traverse(process.cwd());

if (violations.length > 0) {
  console.error('\n❌ [HackCC Git Guard] SECRETS OR DANGEROUS COMMITS DETECTED:');
  for (const v of violations) {
    console.error(`   - ${v.file}:${v.line} [${v.rule}] -> ${v.detail}`);
  }
  console.error('\n💡 How to fix:');
  console.error('   1. Move your API keys/secrets into a local `.env` file.');
  console.error('   2. Ensure `.env` is listed in your `.gitignore`.');
  console.error('   3. Put template placeholder keys in `.env.example`.');
  console.error('   4. Use `import.meta.env.VITE_YOUR_KEY` in your React code.\n');
  process.exit(1);
} else {
  console.log('✅ [HackCC Git Guard] Scan passed! No leaked secrets or hazardous files found.\n');
  process.exit(0);
}
