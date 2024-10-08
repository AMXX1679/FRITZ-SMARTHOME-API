# AVM SMARTHOME API

## what do you nedd:

- a fritzbox
- a dect 500 
- a dect 200
- Internet
- nodejs v18.18.0
- min(FRITZ!OS 6.35)
  
## TOOLS

| Tool | description |
| ---     | :--- |
| <img src="https://www.qbssoftware.de/wp-content/uploads/2022/07/JetBrains-Intellij-IDEA.png" width="80" height="70"></a> | to develop and program |
<nr>

## API Reference

#### change the color

```http
  GET /api/500/color/${color}/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `color` | `string` | **Required**. the color of the lamp(red, blue, green, yellow)|

#### get infos abut the lamp

```http
  GET /api/500/info/${info}/
```

| Parameter | Type     | Description                                        |
| :-------- | :------- |:---------------------------------------------------|
| `info`      | `string` | **Required**. info of the lamp(state, level, info) |

#### turn on off

```http
  GET /api/500/switch/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `switch`      | `string` | **Required**. with the switch you can turn the lamp on or off |

#### go to the home page

```http
  GET /home/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `home`      | `string` | **Required**. on the home page you can controll the lamp |

#### get infos abut the lamp

```http
  GET /api/login-info/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `login-info`      | `string` | **Required**. you get a new session ID in your terminal) |

## Color Reference

| Colors            | HSV                                                                         |
| ----------------- |-----------------------------------------------------------------------------|
| RED | ![](https://via.placeholder.com/10/ff0000?text=+) hue: 358, saturation: 180 |
| BLUE | ![](https://via.placeholder.com/10/00aaff?text=+) hue: 225, saturation: 204 |
| GREEN | ![](https://via.placeholder.com/10/3fd800?text=+) hue: 120, saturation: 160 |
| YELLOW| ![](https://via.placeholder.com/10/e8e400?text=+) hue: 52, saturation: 153  |

## Run Locally

Clone the project

```bash
  git clone https://github.com/AMXX1679/AVM-API.git
```

Go to the project directory

```bash
  cd AVM-API
```

Create a .env file

```bash
  nano .env or vim .env
```

Put this in to the env file

```env
  FB_URL="your url"
  FB_USERNAME="your username"
  FB_PASSWORD="your password"

```

Install dependencies

```bash
  npm install
```

Use nvm

```bash
  nvm use
```

Start the server

```bash
  npm run start
```

<img src="https://github.com/AMXX1679/AVM-FRITZ-SMARTHOME-API/blob/master/Bildschirmfoto%20vom%202023-10-13%2010-36-10.png?raw=true">
