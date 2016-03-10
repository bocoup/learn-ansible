const http = require('http');

const PORT = process.env.PORT || '8000';

const count = {};

function getHeaders(headers) {
  const headerKeys = Object.keys(headers);
  return headerKeys.map(function (key) {
    return key+': '+headers[key];
  }).join('\n');
}

function chaos() {
  if (Math.random() <= 0.25) {
    throw new Error('CHAOS!');
  }
}

function handler (request, response) {
  const url = request.url;
  count[url] = (count[url]||0)+1;
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.end([
    '<!doctype html>',
    '<html>',
    '  <head>',
    '    <title>LEARN ANSIBLE</title>',
    '  </head>',
    '  <body>',
    '    <h1>A JS WEBSERVER AT '+url+'</h1>',
    '    <p>YOU HAVE BEEN HERE '+count[url]+' TIMES.</p>',
    '    <pre>'+getHeaders(request.headers)+'</pre>',
    '  </body>',
    '</html>'
  ].join('\n'));
};

http.createServer(handler).listen(PORT, function(){
  console.log('Server listening on port '+PORT+'...');
  setInterval(chaos, 5000);
});
