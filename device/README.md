# RPI
## Client device

Install Buster OS for RaspberryPi

### Steps (type these commands)
  - `sudo rm -rf ams-main; wget -N https://github.com/Nandhu9999/agriculture_monitoring_sys/archive/refs/heads/main.zip; unzip main.zip; rm -rf main.zip; mv agriculture_monitoring_sys-main/ ams-main`
  - `chmod +x $HOME/ams-main/device/run.sh`
  - `$HOME/ams-main/device/run.sh`
  
Configuration Details
```
{
  "code_version": 0.1,
  "serial_no": "",
  "image":{
    "size":"1280x720",
    "sharpness":50,
    "brightness":70,
    "contrast":20,
    "send_at": ["08:00"]
  },
  "server_url":"https://agriculture-monitoring-system.glitch.me",
  "apikey":"APIKEY",
  "files":[
    "main.py",
    "requirements.txt"
  ]
}

```

Systemd Startup steps:
  - `sudo nano /etc/systemd/system/AMSservice.service`
  - paste the following code
```
[Unit]
Description=AMS service
After=network.target

[Service]
ExecStart=/home/pi/ams-main/device/run.sh
WorkingDirectory=/home/pi/
Restart=always
User=pi

[Install]
WantedBy=multi-user.target
```
  - `sudo systemctl daemon-reload`
  - `sudo systemctl enable AMSservice.service`
  - `sudo systemctl start AMSservice.service`
