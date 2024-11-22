import { HAapi } from './index';

const api = {
    url: 'http://localhost:8123',
    token: 'homeassistant Token'
};

async function __main() {
    const ha = new HAapi(api.url, api.token);
    // const apiStatus = await ha.getStatus();
    const config = await ha.postCheckConf()
    // const config: T = await ha.getEvents();
    // console.log(apiStatus);
    console.log(config);
}

__main();
