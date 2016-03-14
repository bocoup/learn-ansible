# SERVICES, TEMPLATES, AND REGISTERING VARIABLES

Say you've written a web application and you'd like to make it available on the
internet. So, you copy the application to your server, start it, and walk away.
Success ...right!?

Not quite.

While this approach could work in theory, in practice it is inadvisable for many
reasons. Here are a few:

- If the application crashes for any reason, you'll have to restart it manually.
- If the server is restarted, the application will not start at startup.
- There is no clear way to start, stop, restart, or check the status of the
  application.
- Unless you took care to pipe the output somewhere, there will be no record of
  the application's activity.


## SERVICES

Typically speaking, the easiest way to handle all of these concerns is to use
the default "init system" that ships with the OS on the server.

At the time of this writing, this workshop targets Ubuntu 14.04. As a result,
the init system we will be using to create our service will be Upstart. The
code below is a very minimal example of a service script for Upstart.

```
description "daemon for node app"

start on startup
stop on shutdown
respawn

script
  /usr/bin/nodejs /mnt/app
end script
```

If this text was placed in the file `/etc/init/app.conf`, it would become the
"app" service. As you might imagine looking at the configuration, this would
automatically start at startup, stop at shutdown, and respawn if it crashes.

It also becomes possible to control via the `service` command.

For example:
```
sudo service app start
sudo service app stop
sudo service app restart
sudo service app status
```

### LOGGING

Upstart stores log files in `/var/log/upstart/<servicename>.log`. If you have
trouble starting your service, or need to monitor its output while running, try
the command `sudo tailf /var/log/upstart/node-app.log`.

## TEMPLATES

In our previous exercise `variables-loops-and-filters` we mentioned that Ansible
utilizes the Jinja2 templating engine. This means it can compile template files
and copy them to a remote server using the [template module]:

```
- name: install service
  template:
    src: relative/path/app.conf # path on your machine
    dest: /etc/nginx/conf.d/    # path on target host
```

Templates have access to all variables defined in a playbook. They will be
interpolated if they are wrapped in curly brackets, like so: `{{ var_name }}`.

The default filter will be handy if you wish to provide sane defaults:

```
{{ var_name | default('Some Default Value') }}
```

## REGISTERING VARIABLES

All Ansible tasks have output. That output can be stored in a variable by
using the `register` directive. Just like variables defined at the top of a
playbook, these can be referenced in templates, conditionals, loops, etc.

Here is a simple example, registering the output of a command to a variable:

```
- command: which nodejs
  register: which_nodejs

- debug var=which_nodejs
```

Note that the output of the command is **not** the only thing stored. In
addition to capturing stdout, you can also access the return code, stderr,
the start and end time and more.

## EXERCISE

In this exercise we'll configure a service to run a small NodeJS application
and serve it via NGINX. A working example has been provided, but the
implementation is brittle—everything is hard coded.

Refactor the included upstart script (`node-app.conf`) as a template that
accepts variables containing the full path to the NodeJS runtime and the
application script (`node-app.js`). Then, refactor the included playbook to
`register` the needed variables before the template task is called.

You'll know you've been successful when you're able to visit http://10.10.10.10
and your deployment scripts are using templates and variables.

## Learning Objectives
 - What is upstart for, and why should it be used?
 - What is the default location for an upstart log file?
 - How do you control a service with Ansible?
 - What is the templating engine used by Ansible?
 - How do you interpolate a variable into a template?
 - How can variables be registered during the Ansible run?

[template module]: http://docs.ansible.com/ansible/template_module.html
