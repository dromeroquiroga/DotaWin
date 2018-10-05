if not exist "Dota.Web\client" mkdir Dota.Web\client
del /f /s /q Dota.Web\client\*.* > NUL
xcopy /q /e client\build\*.* Dota.Web\client
dir Dota.Web\client
