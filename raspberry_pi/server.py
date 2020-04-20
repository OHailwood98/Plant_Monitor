from flask import Flask
import RPi.GPIO as GPIO
import time

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.cleanup()

app = Flask(__name__)

@app.route("/pump")
def pump():
    pump = 21

    GPIO.setup(pump, GPIO.OUT)

    GPIO.output(pump, True)
    time.sleep(5)
    GPIO.output(pump, False)

    return "ok"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
