const http = require('http');
var url = require('url');
const server = http.createServer((req, res) => {

    //Get the URL and parse it
    var parsedUrl =  url.parse(req.url, true);

    //Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace('/^\/+|\/+$/g','');

    //return response
    res.end("hello world\n");

    //Log the request path
    console.log("request received on path:" + trimmedPath);
})
server.listen(3000, () => {
    console.log("server is listhening to port 3000");
})