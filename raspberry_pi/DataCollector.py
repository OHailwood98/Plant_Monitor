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

instance = dht11.DHT11(pin=6)
spi = spidev.SpiDev()
spi.open(0,0)
 
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
    return "%0.2f" % temp_c

def read_humid():
  result = instance.read()
  if result.is_valid():
    return "%0.1f" % result.humidity

def read_analog(channel):
  spi.max_speed_hz = 1350000
  adc = spi.xfer2([1,(8+channel) <<4, 0])
  data = ((adc[1]&3) << 8) + adc[2]
  return data

while True:
  now = time.localtime()
  timeSTR = time.strftime("%H:%M",now)
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
    }
  datSTR = json.dumps(data)
  print(datSTR)
  time.sleep(2)
