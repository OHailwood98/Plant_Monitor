import os
import glob
import time
import RPi.GPIO as GPIO
import dht11
import spidev
from numpy import interp
import json

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.cleanup()

base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
spi = spidev.SpiDev()
spi.open(0,0)

dataUrl = "https://fyp-plant-monitor.herokuapp.com/api/reading/add"
=======
instance = dht11.DHT11(pin=6)
spi = spidev.SpiDev()
spi.open(0,0)
>>>>>>> parent of a99a45e... add flask server to control a pump
=======
#instance = dht11.DHT11(pin=6)
spi = spidev.SpiDev()
spi.open(0,0)

dataUrl = "http://192.168.0.36:8080/api/reading/add"
>>>>>>> parent of 2771134... update dataURL to match heroku URL
=======
#instance = dht11.DHT11(pin=6)
spi = spidev.SpiDev()
spi.open(0,0)

dataUrl = "http://192.168.0.36:8080/api/reading/add"
>>>>>>> parent of 2771134... update dataURL to match heroku URL
 
def read_temp_raw():
  f = open(device_file, 'r')
  lines = f.readlines()
  f.close()
  return lines

def read_temp():
  lines = read_temp_raw()
 
  while lines[0].strip()[-3:] != 'YES':
    time.sleep(0.2)
    lines = read_temp_raw()
 
  equals_pos = lines[1].find('t=')
  
  if equals_pos != -1:
    temp_string = lines[1][equals_pos+2:]
    temp_c = float(temp_string) / 1000.0
<<<<<<< HEAD
    return temp_c
=======
    return "%0.2f" % temp_c

def read_humid():
  result = instance.read()
  if result.is_valid():
    return "%0.1f" % result.humidity
>>>>>>> parent of a99a45e... add flask server to control a pump

#def read_humid():
#  result = instance.read()
#  if result.is_valid():
#    return "%0.0f" % result.humidity

#def read_humid():
#  result = instance.read()
#  if result.is_valid():
#    return "%0.0f" % result.humidity

def read_analog(channel):
  spi.max_speed_hz = 1350000
  adc = spi.xfer2([1,(8+channel) <<4, 0])
  data = ((adc[1]&3) << 8) + adc[2]
  return data

while True:
<<<<<<< HEAD
<<<<<<< HEAD
  
  temp1 = float(read_temp())
  light1 = interp(read_analog(0), [0,1023], [0,100])
  moisture1 = interp(read_analog(2), [0,1023], [100,10])
  time.sleep(30)
  
  temp2 = float(read_temp())
  light2 = interp(read_analog(0), [0,1023], [0,100])
  moisture2 = interp(read_analog(2), [0,1023], [100,10])
  time.sleep(30)

  temp3 = float(read_temp())
  light3 = interp(read_analog(0), [0,1023], [0,100])
  moisture3 = interp(read_analog(2), [0,1023], [100,10])
  
  now = time.localtime()
  timeSTR = time.strftime("%H:%M",now)
<<<<<<< HEAD
<<<<<<< HEAD
  temp = (temp1+temp2+temp3)/3
  light = (light1+light2+light3)/3
  moisture = (moisture1+moisture2+moisture3)/3
  
  temp = "%0.01f" % temp
  light = "%0.0f" % light
=======
  now = time.localtime()
  timeSTR = time.strftime("%H:%M",now)
=======
  now = time.localtime()
  timeSTR = time.strftime("%H:%M",now)
>>>>>>> parent of 2771134... update dataURL to match heroku URL
  temp = read_temp()
  #humid = read_humid()
  light = interp(read_analog(0), [0,1023], [0,100])
  light = "%0.0f" % light
  moisture = interp(read_analog(2), [0,1023], [100,10])
<<<<<<< HEAD
>>>>>>> parent of 2771134... update dataURL to match heroku URL
=======
>>>>>>> parent of 2771134... update dataURL to match heroku URL
  moisture = "%0.0f" % moisture
  data = {
    "data":{
      "deviceID" : "47",
      "time" : timeSTR,
      "temp" : temp,
      #"humidity" : humid,
      "light" : light,
      "moisture" : moisture
      }
=======
  temp = read_temp()
  humid = read_humid()
  light = interp(read_analog(0), [0,1023], [0,100])
  light = "%0.1f" % light
  data = {
    "deviceID" : "47",
    "time" : timeSTR,
    "temp" : temp,
    "humidity" : humid,
    "light" : light
>>>>>>> parent of 7694029... remove moisture sensor (DHT11)
    }
  datSTR = json.dumps(data)
  print(datSTR)
  requests.post(url=dataUrl, json=data)
  time.sleep(840)
=======
  temp = read_temp()
  #humid = read_humid()
  light = interp(read_analog(0), [0,1023], [0,100])
  light = "%0.1f" % light
  data = {
    "deviceID" : "47",
    "time" : timeSTR,
    "temp" : temp,
    #"humidity" : humid,
    "light" : light
    }
  datSTR = json.dumps(data)
  print(datSTR)
  time.sleep(2)
>>>>>>> parent of a99a45e... add flask server to control a pump
