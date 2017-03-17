from os import getenv
from collections import Counter
from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
from threading import Thread
from multiprocessing import Process
from random import random
from time import sleep

PORT = getenv('process.env.PORT', 8000)

def chaos():
    while True:
        if random() <= 0.25:
            raise Exception('CHAOS!')
        sleep(5)

class App(BaseHTTPRequestHandler):
    count = Counter()
    def do_GET(self):
        url = self.path
        self.count[url] = self.count[url] + 1;
        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.end_headers()
        self.wfile.write("\n".join([
            '<!doctype html>',
            '<html>',
            '  <head>',
            '    <title>LEARN ANSIBLE</title>',
            '  </head>',
            '  <body>',
            '    <h1>A PYTHON WEBSERVER AT '+url+'</h1>',
            '    <p>YOU HAVE BEEN HERE '+str(self.count[url])+' TIMES.</p>',
            '    <h3>HEADERS</h3>',
            '    <pre>'+str(self.headers)+'</pre>',
            '  </body>',
            '</html>'
        ]))
        return

server = HTTPServer(('', PORT), App)

try:
    webserver = Thread(target=server.serve_forever)
    webserver.daemon = True
    webserver.start()
    reaper = Process(target=chaos)
    reaper.start()
    print 'Server listening on port %d...' % PORT
except KeyboardInterrupt:
    reaper.terminate()
