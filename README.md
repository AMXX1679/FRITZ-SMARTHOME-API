# AVM SmartHome API

Welcome to the **AVM SmartHome API**! This API allows you to control and monitor your AVM SmartHome devices seamlessly.

## Table of Contents

- [What You Need](#what-you-need)
- [Tools](#tools)
- [API Reference](#api-reference)
  - [Change the Color](#change-the-color)
  - [Get Lamp Information](#get-lamp-information)
  - [Turn On/Off](#turn-onoff)
  - [Go to the Home Page](#go-to-the-home-page)
  - [Get Login Information](#get-login-information)
- [Color Reference](#color-reference)
- [Run Locally](#run-locally)
- [Screenshot](#screenshot)

## What You Need

To get started with the AVM SmartHome API, ensure you have the following:

- **Hardware:**
  - A **Fritz!Box** router
  - A **DECT 500** device
  - A **DECT 200** device
- **Software & Services:**
  - **Internet** connection
  - **Node.js** v18.18.0
  - **FRITZ!OS** version **6.35** or higher

## Tools

| Tool | Description |
| --- | :--- |
| <img src="https://www.qbssoftware.de/wp-content/uploads/2022/07/JetBrains-Intellij-IDEA.png" width="80" height="70"> | [IntelliJ IDEA](https://www.jetbrains.com/idea/) - Integrated Development Environment for developing and programming |
| <img src="https://cdn-icons-png.flaticon.com/512/919/919825.png" width="80" height="70"> | [NODE JS]([https://www.jetbrains.com/idea/](https://nodejs.org/en)) - for run |

## API Reference

### Change the Color

Change the color of the lamp.

```http
GET /api/500/color/{color}/
```

| Parameter | Type   | Description                                                 |
| :-------- | :----- | :---------------------------------------------------------- |
| `color`   | `string` | **Required**. The color of the lamp (`red`, `blue`, `green`, `yellow`). |

### Get Lamp Information

Retrieve information about the lamp.

```http
GET /api/500/info/{info}/
```

| Parameter | Type     | Description                                         |
| :-------- | :------- | :-------------------------------------------------- |
| `info`    | `string` | **Required**. The type of information (`state`, `level`, `info`). |

### Turn On/Off

Turn the lamp on or off.

```http
GET /api/500/switch/
```

| Parameter | Type     | Description                                        |
| :-------- | :------- | :------------------------------------------------- |
| `switch`  | `string` | **Required**. Use `on` to turn the lamp on or `off` to turn it off. |

### Go to the Home Page

Navigate to the home page to control the lamp.

```http
GET /home/
```

| Parameter | Type     | Description                                        |
| :-------- | :------- | :------------------------------------------------- |
| `home`    | `string` | **Required**. Access the home page to control the lamp. |

### Get Login Information

Obtain a new session ID.

```http
GET /api/login-info/
```

| Parameter     | Type     | Description                                                |
| :------------ | :------- | :--------------------------------------------------------- |
| `login-info`  | `string` | **Required**. Retrieves a new session ID in your terminal. |

## Color Reference

| Color  | HSV Values |
| ------ | ---------- |
| ![Red](https://via.placeholder.com/10/ff0000?text=+) **Red** | Hue: 358, Saturation: 180 |
| ![Blue](https://via.placeholder.com/10/00aaff?text=+) **Blue** | Hue: 225, Saturation: 204 |
| ![Green](https://via.placeholder.com/10/3fd800?text=+) **Green** | Hue: 120, Saturation: 160 |
| ![Yellow](https://via.placeholder.com/10/e8e400?text=+) **Yellow** | Hue: 52, Saturation: 153  |

## Run Locally

Follow these steps to set up and run the project on your local machine.

### Clone the Project

```bash
git clone https://github.com/AMXX1679/AVM-API.git
```

### Navigate to the Project Directory

```bash
cd AVM-API
```

### Create a `.env` File

Create a `.env` file to store your environment variables.

```bash
nano .env
```

Or

```bash
vim .env
```

### Add Environment Variables

Insert the following into the `.env` file:

```env
FB_URL="your_fritzbox_url"
FB_USERNAME="your_username"
FB_PASSWORD="your_password"
```

### Install Dependencies

Install the necessary dependencies using npm.

```bash
npm install
```

### Use Node Version Manager (nvm)

Ensure you're using the correct Node.js version.

```bash
nvm use
```

### Start the Server

Launch the API server.

```bash
npm run start
```

## Screenshot

![API Screenshot](https://github.com/AMXX1679/AVM-FRITZ-SMARTHOME-API/blob/master/Bildschirmfoto%20vom%202023-10-13%2010-36-10.png?raw=true)

---

Feel free to contribute or raise issues for any improvements!

---

## License

[MIT](LICENSE)
