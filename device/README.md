# RPI
## Client device

Install Buster OS for RaspberryPi

### Steps (type these commands)
  - `curl -H "Cache-Control: no-cache, no-store, must-revalidate" -O https://raw.githubusercontent.com/Nandhu9999/agriculture_monitoring_system/main/device/AMSupdate.sh`
  - `chmod +x AMSupdate.sh ; ./AMSupdate.sh`
  
Configuration Details
```
{
  "code_version": 1,
  "serial_no": "",
  "image":{
    "size":"1280x720",
    "sharpness":50,
    "brightness":70,
    "contrast":20,
    "send_at": ["08:00"]
  },
  "server_url":"https://agriculture-monitoring-system.glitch.me",
  "apikey":"APIKEY"
}
```

Systemd Startup steps:
  - `sudo nano /lib/systemd/system/AMS_startup.service`
  - paste the following code
```
[Unit]
 Description=AMS_startup
 After=multi-user.target

[Service]
 Type=idle
 ExecStart=/usr/bin/python /home/pi/main.py

[Install]
 WantedBy=multi-user.target
```
  - `sudo systemctl daemon-reload`
  - `sudo systemctl enable AMS_startup.service; sudo systemctl AMS_startup.service start`
