#!/bin/bash

if command -v jq > /dev/null; then echo "jq command exists."
else sudo apt-get install jq
fi

if command -v fswebcam > /dev/null; then echo "fswebcam command exists."
else sudo apt install fswebcam
fi

update_json_serial() {
  local jsonStr=$(cat config.json)
  echo "***********************************"
  echo $jsonStr
  local serial_no=$(cat /sys/firmware/devicetree/base/serial-number)
  local updated_json=$(jq --arg serial "$serial_no" '.serial_no = $serial' <<<"$jsonStr")
  echo $updated_json > config.json
  echo "SERIAL NO = $serial_no"
  echo "***********************************"
}
update_json_serial

if test -f "config.json"; then
  sudo apt-get install jq
  my_code_version=$(jq -r ".code_version" "config.json")
  echo "###################################"
  echo $my_code_version
  code_version_latest=$( curl -H "Accept: application/json" -H "Cache-Control: no-cache" https://raw.githubusercontent.com/Nandhu9999/agriculture_monitoring_system/main/device/config.json | jq '.code_version')
  echo $code_version_latest
  echo "###################################"

  if [ "$my_code_version" = "$code_version_latest" ]; then
    echo "Using latest version"
    python main.py
    exit 0
  fi
fi

echo "running AMS update.."
curl -H "Cache-Control: no-cache" -LJO https://github.com/Nandhu9999/agriculture_monitoring_system/archive/refs/heads/main.zip
unzip agriculture_monitoring_system-main.zip

rm config.json main.py README.md requirements.txt

sudo mv agriculture_monitoring_system-main/device/* ./
rm -r agriculture_monitoring_system-main/
rm agriculture_monitoring_system-main.zip

update_json_serial
pip install -r requirements.txt
python main.py
