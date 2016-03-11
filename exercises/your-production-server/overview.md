# YOUR PRODUCTION SERVER

In the last exercise, we successfully automated the deployment of a simple web
application to a Vagrant machine. In this exercise, we are going try it on a
real live server, accessible to everyone on the internet.

*Before tools like VirtualBox and Vagrant were the norm, it was commonplace to
provision servers on the internet for testing deployments. This was slow and
tedious—as you have likely seen already, there is a __lot__ of trial and error
associated with this work. Also, we had to pay for every failed attempt!*

## EXERCISE

Before coming to this workshop we asked that you create an account on a cloud
provider of your choosing (e.g. AWS, DigitalOcean, etc). Now it is time to spin
up a new (Ubuntu) server with that provider so we can test our configuration in
the wild.

Create a playbook to manage users on your server and another to deploy one of
the applications from the previous exercise.

You'll know you've been successful when your fellow attendees can see your
application in a browser via it's public IP address (e.g. http://54.23.14.31).

## LEARNING OBJECTIVES

- How do you provision a server with your cloud provider?
- How do you get a user account for yourself on the new server?
- How do you deploy your application to the server?
