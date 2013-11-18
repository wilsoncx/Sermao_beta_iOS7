#!/bin/sh

rm -r build/android

ti build -p android -b

echo 'Installing Project to Device'
export PATH=/Users/wilsonalves/Documents/projetos/adt-bundle-mac-x86_64-20130917/sdk/platform-tools/; export PATH;
adb install -r build/android/bin/app.apk
PATH="/usr/bin:/bin:/usr/sbin:/usr/local/bin:/usr/X11/bin"; export PATH; 

exit