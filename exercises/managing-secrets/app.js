const http = require('http');
const qs = require('querystring');
const url = require('url');

const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || 8000;

function reply (data) {
  return [
    '<!doctype html>',
    '<html>',
    '  <head>',
    '    <title>LEARN ANSIBLE</title>',
    '  </head>',
    '  <body>',
    data,
    '  </body>',
    '</html>'
  ].join('\n')
}

function apiRequest (location, cb) {
  const query = qs.stringify({
    location: location,
    api_key: API_KEY
  });
  const request = http.get({
    host: 'api.data.gov',
    path: '/nrel/alt-fuel-stations/v1/nearest.json?'+query
  }, function (response) {
    const result = [];
    const buffer = Array.prototype.push.bind(result);
    const success = cb.bind(null, null, result);
    response.on('data', buffer).on('end', success).on('error', cb);
  }).on('error', cb).end();
}

function requestHandler (request, response) {
  const query = url.parse(request.url, true).query;
  response.writeHead(200, { 'Content-Type': 'text/html' });
  if (query && query.location) {
    apiRequest(query.location, function (err, data) {
      if (err) {
        response.end(reply(['<h1>ERROR</h1>', err].join('\n')));
      } else {
        response.end(reply([
          '<h1>API Data</h1>',
          '<a href="/">make another request</a>',
          '<pre>',
          JSON.stringify(JSON.parse(data.join('')), null, 2),
          '</pre>'
        ].join('\n')));
      }
    });
  } else {
    response.end(reply([
      '<h1>Alternative Fueling Station Locator API Portal</h1>',
      '<form>',
      '  location: <input type="text" name="location">',
      '  <input type="submit" value="search">',
      '</form><br>',
      '<a href="http://www.afdc.energy.gov/locator/stations/">visit site</a>'
    ].join('\n')));
  }
};

http.createServer(requestHandler).listen(PORT, function(){
  console.log('Server listening on port '+PORT+'...');
});
