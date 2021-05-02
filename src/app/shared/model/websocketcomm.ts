// A wrapper for a JSON-style message sent over websocket
export interface WebsocketComm{
    type: string;
    content: string;
}