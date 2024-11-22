// All of the api based on https://developers.home-assistant.io/docs/api/rest/
import axios from 'axios';
import { S, U, T, HA_Error, HA_History, HA_Logbook, N, HA_CalendarsParam } from './types';

export class HAapi {
    private apiUrl: string;
    private token: string;
    private header: any;

    constructor(apiUrl: string, token: string) {
        this.apiUrl = apiUrl;
        this.token = token;
        this.header = {
            "Authorization": `Bearer ${this.token}`,
            "content-type": 'application/json'
        };
    }

    /** Example
    curl \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" http://localhost:8123/api/
    */
    async getStatus(): Promise<HA_Error | any> {
        try {
            const data = await axios.get(this.apiUrl + '/api/', { headers: this.header });
            return data.data?.message || '';
        } catch (err) {
            const error: HA_Error = {code: 0, message: `Api fetch error: ${err}`}
            return error;
        }
    }

    /** Example
    curl \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" http://localhost:8123/api/config
    */
    async getConfig(): Promise<HA_Error | any> {
        try {
            const data = await axios.get(this.apiUrl + '/api/config', { headers: this.header });
            const confJSON = <T>data.data;
            return confJSON;
        } catch (err) {
            const error: HA_Error = {code: 1, message: `get config error: ${err}`}
            return error;
        }
    }

    /** Example
    curl \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" http://localhost:8123/api/events
    */
    async getEvents(): Promise<HA_Error | any> {
        try {
            const data = await axios.get(this.apiUrl + '/api/events', { headers: this.header });
            return <T>data.data;
        } catch (err) {
            const error: HA_Error = {code: 2 , message: `get events error: ${err}`}
            return error;
        }
    }

    /** Example
    curl \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" http://localhost:8123/api/services
    */
    async getServices(): Promise<HA_Error | any> {
        try {
            const data = await axios.get(this.apiUrl + '/api/services', { headers: this.header });
            return <T>data.data;
        } catch (err) {
            const error: HA_Error = {code: 3, message: `get services error: ${err}`}
            return error;
        }
    }

    /** Example
    # Minimal history of the entity 'sensor.temperature' and 'sensor.kitchen_temperature' of the past day where the beginning date is set manually to 2023-09-04
    curl \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" \
    "http://localhost:8123/api/history/period/2023-09-04T00:00:00+02:00?filter_entity_id=sensor.temperature,sensor.kitchen_temperature&minimal_response"
    */
    async getHistory(option: S | HA_History , timestamp?: S): Promise<HA_Error | any> {
        const param: S | U = typeof option === 'string'? option : null;
        try {
            const data = await axios.get(this.apiUrl+`/api/history/period/${timestamp || ''}`, { headers: this.header, params: param? {"filter_entity_id": param} : option });
            return data.data;
        } catch (err) {
            const error: HA_Error = {code: 4, message: `get history error: ${err}`}
            return error;
        }
    }

    /** Example
    curl \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" \
    "http://localhost:8123/api/logbook/2016-12-29T00:00:00+02:00?end_time=2099-12-31T00%3A00%3A00%2B02%3A00&entity=sensor.temperature"
    */
    async getLogbook(option: S | HA_Logbook , timestamp?: S): Promise<HA_Error | any> {
        const param: S | U = typeof option === 'string'? option : null;
        try {
            const data = await axios.get(this.apiUrl+`/api/history/period/${timestamp || ''}`, { headers: this.header, params: param? {entity: param} : option });
            return data.data;
        } catch (err) {
            const error: HA_Error = {code: 5, message: `get logbook error: ${err}`}
            return error;
        }
    }

    async getStates(): Promise<HA_Error | any> {
        try {
            const data = await axios.get(this.apiUrl + '/api/states', { headers: this.header });
            return data.data;
        } catch (err) {
            const error: HA_Error = {code: 6, message: `get states error: ${err}`}
            return error;
        }
    }

    /** Example
    curl \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" \
    http://localhost:8123/api/states/sensor.kitchen_temperature
    */
    async getStatesByID(id: S): Promise<HA_Error | any> { // id = entity_id
        try {
            const data = await axios.get(this.apiUrl + '/api/states/'+id, { headers: this.header });
            return data.data;
        } catch (err) {
            const error: HA_Error = {code: 6, message: `get states error: ${err}`}
            return error;
        }
    }

    /** Example
    curl \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" \
    http://localhost:8123/api/error_log
    */
    async getErrorLog(): Promise<HA_Error | any> {
        try {
            const data = await axios.get(this.apiUrl + '/api/error_log', { headers: this.header });
            return data.data;
        } catch (err) {
            const error: HA_Error = {code: 7, message: `get Error log error: ${err}`}
            return error;
        }
    }

    /** Example
    curl \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" \
    -o image.jpg \
    "http://localhost:8123/api/camera_proxy/camera.my_sample_camera?time=1462653861261"
    */
    async getImgData(cameraID: S, time?: N): Promise<HA_Error | any> {
        try {
            const data = await axios.get(this.apiUrl + '/api/camera_proxy/'+cameraID, { headers: this.header, params: {time: time} });
            return data.data;
        } catch (err) {
            const error: HA_Error = {code: 8, message: `get image data error: ${err}`}
            return error;
        }
    }

    /** Example
    curl \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" \
    "http://localhost:8123/api/calendars/calendar.holidays?start=2022-05-01T07:00:00.000Z&end=2022-06-12T07:00:00.000Z"
    */
    async getCalendars(calendarsID?: S, calendarsParam?: HA_CalendarsParam): Promise<HA_Error | any> {
        try {
            const data = await axios.get(this.apiUrl + '/api/calendars/'+(calendarsID || ''), { headers: this.header, params: calendarsParam });
            return data.data;
        } catch (err) {
            const error: HA_Error = {code: 9, message: `get calendars error: ${err}`}
            return error;
        }
    }

    /** Example
    curl \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"state": "25", "attributes": {"unit_of_measurement": "°C"}}' \
    http://localhost:8123/api/states/sensor.kitchen_temperature
    */
    async postStates(id: S, option?: any): Promise<HA_Error | any> {
        try {
            const data = await axios.post(this.apiUrl + '/api/states/'+id, option, { headers: this.header } );
            return data.data;
        } catch (err) {
            const error: HA_Error = {code: 10, message: `post states error: ${err}`}
            return error;
        }
    }

    async postEvents(eventType: S, eventData: any): Promise<HA_Error | any> {
        try {

            const data = await axios.post(this.apiUrl + '/api/events/'+eventType, eventData, { headers: this.header } );
            return data.data;
        } catch (err) {
            const error: HA_Error = {code: 11, message: `post events error: ${err}`}
            return error;
        }
    }

    // see https://developers.home-assistant.io/docs/api/rest/
    /** Example
     curl \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"entity_id": "switch.christmas_lights"}' \
    http://localhost:8123/api/services/switch/turn_on
    */
    async postServices(domain: S, service: S, serviceData: any): Promise<HA_Error | any> {
        try {

            const data = await axios.post(this.apiUrl + `/api/services/${domain}/${service}`, serviceData, { headers: this.header } );
            return data.data;
        } catch (err) {
            const error: HA_Error = {code: 12, message: `post services error: ${err}`}
            return error;
        }
    }

    // see https://www.home-assistant.io/docs/configuration/templating
    /** Example
    curl \
    -H "Authorization: Bearer TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"template": "It is {{ now() }}!"}' http://localhost:8123/api/template
    */
    async postTemplate(template: any): Promise<HA_Error | any> {
        try {
            const data = await axios.post(this.apiUrl + `/api/template`, template, { headers: this.header } );
            return data.data;
        } catch (err) {
            const error: HA_Error = {code: 13, message: `post template error: ${err}`}
            return error;
        }
    }

    // No paramater
    async postCheckConf(): Promise<HA_Error | any> {
        try {
            const data = await axios.post(this.apiUrl + `/api/config/core/check_config`, {}, { headers: this.header } );
            return data.data;
        } catch (err) {
            const error: HA_Error = {code: 14, message: `check config error: ${err}`}
            return error;
        }
    }

    // You must add intent: to your configuration.yaml to enable this endpoint.
    /** Example
    curl \
    -H "Authorization: Bearer TOKEN" \
    -H 'Content-Type: application/json' \
    -d '{ "name": "SetTimer", "data": { "seconds": "30" } }' \
    http://localhost:8123/api/intent/handle
    */
    async postIntentHandle(intentData: any): Promise<HA_Error | any> {
        try {
            const data = await axios.post(this.apiUrl + `/api/intent/handle`, intentData, { headers: this.header } );
            return data.data;
        } catch (err) {
            const error: HA_Error = {code: 15, message: `intent handle error: ${err}`}
            return error;
        }
    }
}
