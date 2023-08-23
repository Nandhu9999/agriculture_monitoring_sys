#!/bin/bash

echo "running AMS update.."
wget https://github.com/Nandhu9999/agriculture_monitoring_system/archive/refs/heads/main.zip -O device.zip
unzip device.zip

rm config.json main.py README.md requirements.txt

mv agriculture_monitoring_system-main/device/* ./
rm -r agriculture_monitoring_system-main/
rm device.zip

