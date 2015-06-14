import os
import struct
import serial
import time
import ConfigParser

from flask import Flask, Response, render_template, request

   
app = Flask(__name__)







@app.route('/')
def root(): 
  return render_template('index.html')
    

if __name__ == '__main__':
  app.run(port=80,host='0.0.0.0')



