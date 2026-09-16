# 🤖 Mini OLED Display Animation (Robotics & IoT)
> **A Project by [Funway To Science](https://www.youtube.com/@ftsankit) (Ankit Satnami)**

[![YouTube Channel](https://img.shields.io/badge/YouTube-Funway_To_Science-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@ftsankit)

Welcome to the **Mini OLED Display Animation** project! This repository contains the code for the dynamic OLED eyes featured in my robotics, engineering, and DIY projects on **Funway To Science**. 

If you enjoy practical tech builds, IoT systems, and awesome science experiments, make sure to **[Subscribe to the channel!](https://www.youtube.com/@ftsankit)** 🚀

Whether you're building a desktop companion robot, an interactive smart-home hub, or an ESP32-powered wearable, these OLED eyes will bring your hardware to life!

---

## 🌟 Key Features

- **👀 Expressive Animations**: Wakeup, sleep, blink, happy, and random saccade movements.
- **🛠️ Hardware Agnostic**: Supports Arduino Nano, Uno, ESP32, ESP8266, and Raspberry Pi Pico.
- **📚 Library Support**: Compatible with both `U8G2` and `Adafruit_SSD1306` drivers for maximum flexibility.
- **🌐 IoT & Serial Ready**: Send commands over Serial (USB/Bluetooth/WiFi via ESP32) to trigger animations dynamically based on sensor inputs or network commands.
- **🐍 Python Integration**: Includes a Python script to control the eyes via Serial - perfect for Raspberry Pi or PC-to-Microcontroller communication.
## 🎮 Interactive Web Simulator

Want to see the code in action without building the hardware? 
We've included a **Web-Based OLED Simulator** right in this repository! It perfectly mimics the C++ animation code directly in your browser.

- **How to play:** Just download the repository and double-click `web_simulation/index.html` to open it in Chrome, Edge, or Safari!
- **Features:** Click the on-screen push buttons to instantly trigger the Happy, Wakeup, Sleep, and Saccade animations.

---
## 🔌 Circuit & Wiring Diagram


### 📸 Circuit References
- **Arduino Nano**: <br/> <img src="with%20Arduino%20Nano.png" alt="With Arduino Nano" width="400"/>
- **Arduino Uno**: <br/> <img src="with%20Arduino%20Uno.png" alt="With Arduino Uno" width="400"/>
- **ESP32**: <br/> <img src="with%20ESP32.png" alt="With ESP32" width="400"/>



## 📡 Serial Commands (IoT / Robotics Integration)

You can trigger specific animations by sending commands over the serial monitor (115200 baud rate) or via your IoT network logic. 
Send `A` followed by the animation index (e.g., `A0`, `A6`).

| Command | Animation |
|---------|-----------|
| `A0`    | Wakeup    |
| `A1`    | Reset     |
| `A2`    | Move Right|
| `A3`    | Move Left |
| `A4`    | Blink Long|
| `A5`    | Blink Short|
| `A6`    | Happy     |
| `A7`    | Sleep     |
| `A8`    | Random Saccade |

### 📍 Pin Mapping Reference

| OLED Pin | Arduino Nano | Arduino Uno | ESP32 |
| :--- | :--- | :--- | :--- |
| **VCC** | 5V / 3.3V | 5V / 3.3V | 3.3V |
| **GND** | GND | GND | GND |
| **SDA** | A4 | A4 | GPIO 21 |
| **SCL** | A5 | A5 | GPIO 22 |



---

## 🐍 Python Control

Use the provided Python script `python/example.py` to control the display directly from a Raspberry Pi or PC.

```bash
pip install pyserial
python python/example.py --port COM4
```

---

## 🤝 Credits & Shoutouts
- **Original Concept**: intellar.ca
- **Robotics/IoT Customization & Redesign**: [Funway To Science](https://www.youtube.com/@ftsankit) (Ankit Satnami)

If you use this in your robotics or IoT project, feel free to give a shoutout to the channel! 🚀
