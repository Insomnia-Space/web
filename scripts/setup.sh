#!/bin/bash

# Development setup script for Telco Recommendation System

echo "🚀 Setting up Telco Recommendation System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js version $NODE_VERSION is not supported. Please install Node.js 18+ ."
    exit 1
fi

echo "✅ Node.js version $NODE_VERSION detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment variables
if [ ! -f .env.local ]; then
    echo "📋 Setting up environment variables..."
    cp .env.local.example .env.local
    echo "⚠️  Please edit .env.local with your actual configuration values"
else
    echo "✅ Environment file already exists"
fi

# Setup git hooks
echo "🔧 Setting up git hooks..."
npx husky

# Run initial checks
echo "🧪 Running initial checks..."
npm run type-check
npm run lint

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your configuration"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000"
echo ""
echo "Available commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run test         - Run tests"
echo "  npm run lint         - Check code quality"
echo "  npm run commit       - Make a conventional commit"
echo ""