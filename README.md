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

##it must look something like this

- FB_URL="your url"
- FB_USERNAME="your username"
- FB_PASSWORD="your password"


after that need to use the command "nvm use"

after that you can also start it with "npm run start"

the UI to control the lamp can be found under "http://localhost:8080/api/home"
