@echo off
REM 🚀 GitHub Setup Script for Telco Recommendation System (Windows)
REM Pastikan Anda sudah membuat repository kosong di GitHub terlebih dahulu

echo 🚀 Setting up GitHub repository for Telco Recommendation System...
echo.

REM Get GitHub repository URL from user
set /p REPO_URL="📋 Masukkan URL GitHub repository Anda (https://github.com/username/repo-name.git): "

if "%REPO_URL%"=="" (
    echo ❌ Error: Repository URL tidak boleh kosong!
    pause
    exit /b 1
)

echo.
echo 🔧 Setting up Git configuration...

REM Add remote origin
echo 📡 Adding remote origin...
git remote add origin "%REPO_URL%"

REM Switch to main branch
echo 🌟 Switching to main branch...
git checkout main

REM Push main branch
echo 📤 Pushing main branch to GitHub...
git push -u origin main

REM Switch to dev branch and push
echo 🔀 Switching to dev branch...
git checkout dev

echo 📤 Pushing dev branch to GitHub...
git push -u origin dev

REM Set dev as current working branch
echo 🛠 Setting dev as current working branch...
git checkout dev

echo.
echo ✅ GitHub setup completed successfully!
echo.
echo 📊 Repository Status:
echo    🌟 Main branch: Production-ready code
echo    🔀 Dev branch: Current development branch
echo    📡 Remote: %REPO_URL%
echo.
echo 🎯 Next Steps:
echo    1. Go to GitHub repository settings
echo    2. Set up branch protection rules for main branch
echo    3. Set dev as default branch for development
echo    4. Start developing with: git checkout -b feat/your-feature
echo.
echo 📚 For detailed workflow, see: docs\GIT_SETUP.md
echo.
echo 🎉 Happy coding!
echo.

pause