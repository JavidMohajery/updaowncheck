const http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

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

    // Get the Payload if any
    var decoder = new StringDecoder('utf-8');
    var buffer = "";
    req.on("data", function(data){
        buffer += decoder.write(data);  
    });

    req.on("end", function(){
        buffer += decoder.end();

        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        var data = {
            'trimmedPath':trimmedPath,
            'queyStringObject': queyStringObject,
            'method':method,
            'headers':headers,
            'payload':buffer
        }

        chosenHandler(data, function(statusCode, payload){
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            payload = typeof(payload) =='object' ? payload : {};

            var payloadString = JSON.stringify(payload);

            res.writeHead(statusCode);
            res.end(payloadString);

            console.log("Returning this response", statusCode, payloadString);
        });

    })
    
})
server.listen(3000, () => {
    console.log("server is listhening to port 3000");
})

var handlers = {}

handlers.sample = function(data, callback){
    callback(406, {'name':'sample handler'});
}
handlers.notFound = function(data, callback){
    callback(404);
}

var router = {
    'sample' : handlers.sample
}