let theSocket;

export function openWebSocket() {
    // if (theSocket) {
    //     theSocket.onerror = null;
    //     theSocket.onopen = null;
    //     theSocket.onclose = null;
    //     theSocket.close();
    // }
    theSocket = new WebSocket("ws:localhost:9000");
    return theSocket;
}