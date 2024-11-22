# HADemo
A demo of HomeAssistant REST API based on TypeScript.  
This is a test demo of [HomeAssistant REST API](https://developers.home-assistant.io/docs/api/rest/)

## install
you can copy this repo or use `npm` or `yarn`
### use npm
```bash
npm i hademo
```

### use yarn
```bash
yarn add hademo
```

## How to use?
`import` it and make a new Object.
```javascript
const HA = require('hademo');

const api = {
    url: 'http://localhost:8123',   // replace your homeassistant REST API host:port
    token: 'API token'  // replace your homeassistant token
};

const ha = new HA.HAapi(api.url,api.token)

async function main() {
    const apiStatus = await ha.getStatus();
    console.log(apiStatus)
}

main()
```

## API Document
building......

