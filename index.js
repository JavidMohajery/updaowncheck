const http = require('http');
var url = require('url');
const server = http.createServer((req, res) => {

    //Get the URL and parse it
    var parsedUrl =  url.parse(req.url, true);

    //Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');

    //Get query string
    var queyStringObject = parsedUrl.query;

    //Get method
    var method = req.method.toLowerCase();

    //Get headers
    var headers = req.headers;

    //return response
    res.end("hello world\n");

    //Log the request path
    console.log("request received on path: " + trimmedPath + " with method: " + method + " with query string object: ", queyStringObject);
    console.log('request header is ', headers);
})
server.listen(3000, () => {
    console.log("server is listhening to port 3000");
})