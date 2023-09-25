const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlDict = {
    '/style.css':htmlHandler.getCSS,
    '/':htmlHandler.getIndex,
    '/success':jsonHandler.getSuccess,
    '/badRequest':jsonHandler.getBadRequest,
    '/unauthorized':jsonHandler.getUnauthorized,
    '/forbidden':jsonHandler.getForbidden,
    '/internal':jsonHandler.getInternal,
    '/notImplemented':jsonHandler.getNotImplemented
};

const handleGet = (request, response, parsedUrl, params) => {
  if (urlDict[parsedUrl.pathname]) {
    return urlDict[parsedUrl.pathname](request, response, params);
  } else {
    return jsonHandler.getNotFound(request, response);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  console.log(parsedUrl.pathname);

  handleGet(request, response, parsedUrl, params);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});