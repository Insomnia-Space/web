@echo off
REM Development setup script for Telco Recommendation System (Windows)

echo 🚀 Setting up Telco Recommendation System...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo ✅ Node.js detected

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Setup environment variables
if not exist .env.local (
    echo 📋 Setting up environment variables...
    copy .env.local.example .env.local
    echo ⚠️  Please edit .env.local with your actual configuration values
) else (
    echo ✅ Environment file already exists
)

REM Setup git hooks
echo 🔧 Setting up git hooks...
call npx husky

REM Run initial checks
echo 🧪 Running initial checks...
call npm run type-check
call npm run lint

echo.
echo 🎉 Setup completed successfully!
echo.
echo Next steps:
echo 1. Edit .env.local with your configuration
echo 2. Run 'npm run dev' to start development server
echo 3. Visit http://localhost:3000
echo.
echo Available commands:
echo   npm run dev          - Start development server
echo   npm run build        - Build for production
echo   npm run test         - Run tests
echo   npm run lint         - Check code quality
echo   npm run commit       - Make a conventional commit
echo.

pause