# Stock Dashboard

### Front-end
In root folder: run command \
`npm install`\
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Back-end: 

1. `cd backend` 

2. Ensure these packages are installed:
- flask
- flask_cors
- requests
- time
- base64
- json
- decouple

3. `python -m flask --app server run`

Should be hosted on [http://127.0.0.1:5000](http://127.0.0.1:5000). \
If this is not the case, change the `proxy` header in `package.json` in root directory to the address where the backend is hosted. 
