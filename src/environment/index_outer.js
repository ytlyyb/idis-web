const location = document && document.location || {
    hostname: '127.0.0.1',
    hostname1:'27.0.0.1',
    protocol: 'http:'
}
const DEFAULT_HTTP_PORT = 20001;
const DEFAULT_HTTP_PORT1 = 20002;
const WEB_SOCKET_PROTOCOL = 'ws:';

export default {
    HOSTHOME: location.protocol + '//' + location.hostname + ':' + DEFAULT_HTTP_PORT,
    HOSTHOME1: location.protocol + '//' + location.hostname + ':' + DEFAULT_HTTP_PORT1,
    WEBSOCKET: WEB_SOCKET_PROTOCOL + '//' + location.hostname + ':' + DEFAULT_HTTP_PORT,
    HOSTHOME2:location.protocol + '//' + location.hostname
}