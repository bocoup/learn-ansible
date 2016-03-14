# NGINX

In order for your server to respond to incoming HTTP requests from a user's web
browser, it needs to be running an HTTP server. There are plenty available, such
as [NGINX], [Apache], [IIS], [lighttpd] etc. Most modern runtimes (e.g. Ruby,
Python and Node) include HTTP servers as well.

This workshop focuses on NGINX because it is a rock solid piece of software
whose configuration files are relatively easy to understand.

## NGINX UP FRONT

Technically, you could serve a Ruby, Python or Node application without NGINX,
but it's much better to have NGINX in front, proxying requests to them.
NGINX is written in C, has a smaller memory footprint, and is faster than HTTP
servers written in high level programming languages.

Here are some things you might prefer to do in NGINX instead of your application code:

- Serve static assets
- Handle redirects
- TLS (HTTPS) negotiation
- Caching
- Access control
- Round-robin load balancing
- Gzipping responses

## CONFIGURING NGINX

Like many applications, NGINX looks inside a `conf.d` directory (located in
`/etc/nginx/`) for configuration files. It's a good idea for each service or
site being hosted to have its own descriptively named configuration file so
that it can be safely modified in isolation.

Within a NGINX configuration, an `upstream` block can be used to organize and
define a server (or group of servers) that should have traffic routed to them.

Here is how we would specify an application as an "upstream":

```
upstream app {
  server localhost:8000;
}
```

Once we have an internal "upstream" established, we can connect it to the
outside world like so:

```
server {
  listen 80 default_server;
  location / {
    proxy_pass http://app;
    include proxy_params;
  }
}
```

## PROXY PASS DIRECTIVE

By using the `proxy_pass` directive, we are telling NGINX to send all HTTP
requests that arrive at our specified server to the "upstream" running at the
specified location. It doesn't matter *what* HTTP server is running, NGINX will
blindly pass requests through. This exercise includes examples of simple
services written in Node, Python and Ruby.

## PROXY PARAMS

Be aware that using a HTTP proxy in front of an application will make it seem as
though all traffic hitting the application originated from the proxy itself.

Because of this, HTTP provides special headers such as `X-FORWARDED-FOR` and
`X-REAL-IP` to inform services which are behind a proxy where on the wider
internet the request originated.

The need to send these headers is so common that NGINX ships with a default
configuration file to handle this. We see it represented in the line:
`include proxy_params;`

## EXERCISE

Check the `playbook.yml` file which was included with this exercise, it contains
a list of tasks you will need to author. There are two stages to succeeding at
this exercise. The first is being able to browse to http://10.10.10.10 and see a
502 error (you can also use `curl -i http://10.10.10.10`). The second stage is
starting one of the applications to accept the request:

- `ssh 10.10.10.10 node /mnt/app.js`
- `ssh 10.10.10.10 python /mnt/app.py`
- `ssh 10.10.10.10 ruby /mnt/app.rb`

Once you have a running application, try visiting both http://10.10.10.10 and
http://10.10.10.10:8000. Note the difference in headers. The first address is
serving the application through NGINX. The second is hitting the application
directly (in a real production environment, application port would not be open
to the public).

## Learning Objectives

- What is NGINX?
- Why is it preferable to front an application with NGINX?
- Where does NGINX look for configuration files?
- What is an NGINX upstream?
- How do you configure NGINX to proxy requests to an upstream provider?
- What is the cause of a NGINX 502 error?
- How can you use `curl` to see the response headers from a HTTP request?
- How do you copy code from your local machine to a remote host with Ansible?

[NGINX]: http://nginx.org
[Apache]: http://httpd.apache.org
[IIS]: http://www.iis.net/
[lighttpd]: https://www.lighttpd.net/
