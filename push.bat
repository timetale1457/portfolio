@echo off
chcp 65001 > nul
cd /d %~dp0

echo ========================
echo 🔄 Git add & commit 시작
echo ========================
git add .

set /p "msg=💬 커밋 메시지를 입력하세요 (예: feat: 초기 세팅): "

IF "%msg%"=="" (
    set msg=chore: 기본 커밋 메시지
)

git commit -m "%msg%"
git push origin main

echo.
echo ✅ Push 완료!
pause
