var DEBUG = false;
let server_url = "https://ping-gaming-server.herokuapp.com/";
if (DEBUG) {
  server_url = "http://127.0.0.1:8000/";
}
export { server_url };
