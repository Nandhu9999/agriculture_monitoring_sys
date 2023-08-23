#!/bin/bash

File=config.json
if test -f "$File"; then  
  key_value=$( curl -H "Accept: application/json" -H "Cache-Control: no-cache" https://raw.githubusercontent.com/Nandhu9999/agriculture_monitoring_system/main/device/config.json | jq -r '.code_version')
fi
echo "running AMS update.."
wget https://github.com/Nandhu9999/agriculture_monitoring_system/archive/refs/heads/main.zip -O device.zip
unzip device.zip

rm config.json main.py README.md requirements.txt

mv agriculture_monitoring_system-main/device/* ./
rm -r agriculture_monitoring_system-main/
rm device.zip

pip install -r requirements.txt
