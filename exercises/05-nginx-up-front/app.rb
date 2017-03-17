require 'webrick'

PORT = ENV['PORT'] || 8000

Thread.abort_on_exception = true
Thread.new do
  while true do
    if Random.rand <= 0.25
      raise Exception.new('CHAOS!')
    end
    sleep 5
  end
end

class App < WEBrick::HTTPServlet::AbstractServlet
  @@count = {}

  def do_GET (request, response)
    url = request.path
    @@count[url] = (@@count[url]||0)+1
    response.content_type = 'text/html'
    response.body = [
      '<!doctype html>',
      '<html>',
      '  <head>',
      '    <title>Learn Ansible</title>',
      '  </head>',
      '  <body>',
      "    <h1>A RUBY WEBSERVER AT #{url}</h1>",
      "    <p>YOU HAVE BEEN HERE #{@@count[url]} TIMES.</p>",
      "    <pre>#{request}</pre>",
      '  </body>',
      '</html>'
    ].join("\n")
    raise WEBrick::HTTPStatus::OK
  end

end

server = WEBrick::HTTPServer.new(:Port => PORT)
server.mount "/", App
trap("INT") {
  server.shutdown
}
server.start
