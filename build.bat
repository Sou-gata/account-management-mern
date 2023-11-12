@echo off
@REM npm i -g pkg
rmdir /s /q dist>nul
rmdir /s /q backend\ui>nul
echo\
echo Building frontend ...
cd frontend 
call npm run build>nul
cd ..
echo\
echo Copying frontend build files to backend ...
xcopy /isvy frontend\dist backend\ui>nul
echo all react build files goes here>backend\ui\readme.txt
mkdir "dist"
copy "backend\.env" "dist\.env">nul
echo\
echo building executable ...
cd backend
call pkg .>nul
cd ..
xcopy /isvy backend\dist dist>nul
echo\
echo Done!
echo\
rmdir /s /q backend\dist>nul
rmdir /s /q frontend\dist>nul
set /p choice=Do you want to run ? (y/n) : 
if %choice%==y goto run
if %choice%==Y goto run
if %choice%==yes goto run
if %choice%==Yes goto run
if %choice%==YES goto run
if %choice%==YES goto run
echo\
goto end
:run
cd dist
.\door_to_door.exe
:end
exit