export type T = boolean | Boolean | String | String[] | string | string[] | object | object[] | Object | Object[] | number | number[] | Number | Number[];
export type U = undefined | null;
export type A = T | U;
export type B = boolean | Boolean;
export type S = String | string;
export type O = object | Object;
export type N = number | Number;

export interface HA_Error {
    code: N,
    message: S | S[],
}

export interface HA_History {
    "filter_entity_id": S | S[] | N | N[],
    "end_time"?: S,
    "minimal_response"?: B,
    "no_attributes"?: B,
    "significant_changes_only"?: B
}

export interface HA_Logbook {
    entity: S,
    "end_time": S,
}

export interface HA_CalendarsParam {
    start: S,
    end: S
}


