#!/bin/bash

# checking if it started..
curl https://agriculture-monitoring-system.glitch.me/ping

if command -v jq > /dev/null; then echo "jq command exists."
else sudo apt-get install jq
fi

if command -v fswebcam > /dev/null; then echo "fswebcam command exists."
else sudo apt install fswebcam
fi

prefix_url="https://raw.githubusercontent.com/Nandhu9999/agriculture_monitoring_system/main/device/"
dfolder="/ams-main/device/"

pip install -r "$HOME$dfolder"requirements.txt

update_json_serial() {
  echo "***********************************"
  serial_number=$(cat /sys/firmware/devicetree/base/serial-number)
  jq '.serial_no = "$(serial_number)"' "$HOME/ams-main/device/config.json" > tmp.json && mv tmp.json "$HOME/ams-main/device/config.json"
  echo "Updated config.json with serial_no: $serial_number"
  echo "***********************************"
}
update_json_serial

if test -f "$HOME$dfolder""config.json"; then
  my_code_version=$(jq -r ".code_version" "$HOME$dfolder""config.json")
  echo "###################################"
  echo $my_code_version
  code_version_latest=$( curl -H "Accept: application/json" -H "Cache-Control: no-cache, no-store, must-revalidate" -H "Pragma: no-cache" -H "Expires: 0" "$prefix_url""config.json" -o "$HOME$dfolder""config.json" | jq '.code_version')
  echo $code_version_latest
  echo "###################################"

  if [ "$my_code_version" = "$code_version_latest" ]; then
    echo "Using latest version"
    python "$HOME$dfolder"main.py
    exit 0
  fi
fi

list_of_files=$(jq -r '.files[]' "$HOME$dfolder"config.json)

for file in $list_of_files; do
    full_url="$prefix_url$file"
    curl -H "Cache-Control: no-cache, no-store, must-revalidate" "$full_url" -o "$HOME$dfolder$file"
done

python "$HOME$dfolder"main.py
