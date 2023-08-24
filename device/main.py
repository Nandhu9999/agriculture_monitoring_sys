import os
import sys
import json
import schedule
import requests
import subprocess
from PIL import Image
from time import sleep
from gpiozero import Button

class Script:
  
  # Assign necessary variables to be used throughout the 
  # script; such as configuration attributes
  # Schedules are initialized to be called later to check
  # for pending tasks
  def __init__(self):
    self.output_file = "image.jpg"
    self.processed_file = "processed.jpg"
    self.Xfactor = 0.5
    self.Yfactor = 0.5
    self.delay = 1
    with open('config.json') as f:
      self.config = json.load(f)
    for time_str in self.config["image"]["send_at"]:
      schedule.every().day.at(str(time_str)).do(self.main)

  # Main function which calls all the subfunctions in
  # order to be executed.
  def main(self):
    self.capture()
    self.preprocess()
    self.upload()

  # Background function that runs throughout the lifecycle.
  # Executes the main functions at the appropriate times
  # given by the configuration.  
  # GPIO button connection enables to force the execution
  # of main functions.
  def beginloop(self):
    # button connected to GPIO2 and GROUND
    button = Button(2)
    print("background script is running...")
    while True:
      sleep(self.delay)
      sys.stdout.write(". ")
      schedule.run_pending()
      if button.is_pressed:
        self.main()
        sleep(1)

  # Takes an image using the fswebcam library with appropriate 
  # configuration details as mentained.
  # Images need to be skipped and delayed for more detailed
  # shots. It is later saved as the output file path mentioned
  def capture(self):
    
    try:
      cmd = "fswebcam -d /dev/video0 -r 1280x720 --no-banner -p YUYV -S 30 --set sharpness=50 --set brightness=70 --set Contrast=20 --delay 2 -F 2 " + self.output_file
      
      subprocess.check_call(cmd, shell=True)
    except subprocess.CalledProcessError as e:
      print("Error capturing image: " + e)

  # Images are resized to based on the X and Y factors
  # to improve model recognition. 
  # [!] SEGMENTATION yet to be completed...
  def preprocess(self):
    img = Image.open(self.output_file)
    width, height = img.size
    new_img = img.resize((int(width*self.Xfactor), int(height*self.Yfactor)))
    new_img.save(self.processed_file)

  # Processed image is uploaded the server url with
  # details of appropriate product to ensure security
  # [!] Errors need to be logged for further study.
  def upload(self):
    server_url = self.config["server_url"] + "/upload"
    files = {"file":open(self.processed_file, "rb")}
    content = {"serial_no":self.config["serial_no"], "api": self.config["apikey"]}
    try:
      x = requests.post(server_url,files=files,data=content)
      response = json.load(x.text)
      
      print("status:", response["status"])
      if(response["status"] != "success"): print(response["reason"])
    except:
      print(None)

    # Clearing the images after it has been uploaded.
    os.remove(self.output_file)
    os.remove(self.processed_file)

if __name__ == "__main__":
  x = requests.get("https://agriculture-monitoring-system.glitch.me/ping")
  print(x.text)
  script = Script()
  script.beginloop()
