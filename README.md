AVM SMARTHOME API
================
what do you nedd:
----------------
  - a fritzbox
  - a dect 500 lamp
  - Internet
  - nodejs v18.18.0
  - a Browser

first you have to create an .env file where you enter the USERNAME, PASSWORD and the URL of the fritzbox

## it must look something like this

- FB_URL="your url"
- FB_USERNAME="your username"
- FB_PASSWORD="your password"



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
  nano .env
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

```bash
  npm run start
```

the UI to control the lamp can be found under "http://localhost:8080/api/home"
