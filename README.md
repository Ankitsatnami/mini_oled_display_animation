# 🤖 Mini OLED Display Animation (Robotics & IoT)
> **Designed & Developed with ❤️ by // Ankit Satnami**

Welcome to the **Mini OLED Display Animation** project! This repository provides a dynamic, animated "eye" display perfect for giving a personality to your robotics, IoT devices, ESP32, and Arduino projects. 

Whether you're building a desktop companion robot, an interactive smart-home hub, or an ESP32-powered wearable, these OLED eyes will bring your hardware to life!

---

## 🌟 Key Features

- **👀 Expressive Animations**: Wakeup, sleep, blink, happy, and random saccade movements.
- **🛠️ Hardware Agnostic**: Supports Arduino Nano, Uno, ESP32, ESP8266, and Raspberry Pi Pico.
- **📚 Library Support**: Compatible with both `U8G2` and `Adafruit_SSD1306` drivers for maximum flexibility.
- **🌐 IoT & Serial Ready**: Send commands over Serial (USB/Bluetooth/WiFi via ESP32) to trigger animations dynamically based on sensor inputs or network commands.
- **🐍 Python Integration**: Includes a Python script to control the eyes via Serial - perfect for Raspberry Pi or PC-to-Microcontroller communication.

---

## 🚀 Getting Started

### 1. Hardware Components & Details

| Component | Description | Reference Image |
| :--- | :--- | :--- |
| **Arduino Nano** | The brain of the project. You can also use an ESP32, Uno, or Raspberry Pi Pico. | <img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Arduino_Nano.jpg" width="150" alt="Arduino Nano"/> |
| **0.96" OLED I2C** | The display used for the eyes. (SSD1306 or SH1107). Needs an I2C interface (4 pins). | <img src="oled%20Display.jpg" width="150" alt="OLED Display"/> |
| **Jumper Wires** | 4x wires to connect the display to the microcontroller. | |

---

## 🔌 Circuit & Wiring Diagram

Wiring the OLED to an Arduino Nano is very simple via the I2C interface:

```mermaid
graph LR
    subgraph Arduino Nano
        5V[5V / 3V3]
        GND[GND]
        A4[A4 - SDA]
        A5[A5 - SCL]
    end

    subgraph 0.96" OLED Display
        VCC[VCC]
        O_GND[GND]
        SDA[SDA]
        SCL[SCL]
    end

    5V -->|Power| VCC
    GND -->|Ground| O_GND
    A4 -->|Data| SDA
    A5 -->|Clock| SCL
```

**Pin Mapping Reference:**
- **VCC** -> 5V (or 3.3V depending on your display's rating)
- **GND** -> GND
- **SDA** -> A4 (Arduino Nano/Uno) or GPIO 21 (ESP32)
- **SCL** -> A5 (Arduino Nano/Uno) or GPIO 22 (ESP32)

### 📸 Circuit References
- **Arduino Nano**: <br/> <img src="with%20Arduino%20Nano.png" alt="With Arduino Nano" width="400"/>
- **Arduino Uno**: <br/> <img src="with%20Arduino%20Uno.png" alt="With Arduino Uno" width="400"/>
- **ESP32**: <br/> <img src="with%20ESP32.png" alt="With ESP32" width="400"/>

### 2. Software Setup
1. **Download the Code**: Click the green **"Code"** button at the top of this GitHub page and select **"Download ZIP"**. Extract the downloaded ZIP file.
2. Install the [Arduino IDE](https://www.arduino.cc/en/software).
3. Install the required libraries via the Arduino Library Manager (`Sketch -> Include Library -> Manage Libraries`):
   - `U8g2` by oliver
   - `Adafruit SSD1306` and `Adafruit GFX Library`
4. Open the `mini_oled_animation/mini_oled_animation.ino` file from your extracted ZIP. The Arduino IDE will automatically load the accompanying `.h` files.
5. Configure your display library by editing `config.h` (Uncomment either `#define USE_U8G2` or `#define USE_ADAFRUIT_SSD1306`).
6. Compile and upload!

---

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
- **Robotics/IoT Customization & Redesign**: // Ankit Satnami

If you use this in your robotics or IoT project, feel free to give a shoutout! 🚀
