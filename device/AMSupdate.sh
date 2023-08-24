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
  echo "$updated_json" > config.json
  echo "SERIAL NO = $serial_no"
  echo "***********************************"
}
update_json_serial

if test -f "config.json"; then
  sudo apt-get install jq
  my_code_version=$(jq -r ".code_version" "config.json")
  echo "###################################"
  echo $my_code_version
  code_version_latest=$( curl -H "Accept: application/json" -H "Cache-Control: no-cache, no-store, must-revalidate" -H "Pragma: no-cache" -H "Expires: 0" https://raw.githubusercontent.com/Nandhu9999/agriculture_monitoring_system/main/device/config.json | jq '.code_version')
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

# create systemd script that runs on startup

# Specify the service name
service_name="AMS_startup"
# Specify the command to run
command_to_run="chmod +x /home/pi/AMSupdate.sh ; /home/pi/AMSupdate.sh"
# Create a systemd service unit file
cat > /etc/systemd/system/${service_name}.service <<EOF
[Unit]
Description=Service to Update and Run
After=network.target

[Service]
ExecStart=${command_to_run}
Restart=always
User=root  # Change this to the appropriate user if needed

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd to read the new service unit file
systemctl daemon-reload

# Enable and start the service
systemctl enable ${service_name}
systemctl start ${service_name}

echo "Service ${service_name} created and started."



python main.py

