# YOUR PRODUCTION SERVER

In the last exercise, we successfully automated the deployment of a simple web
application to a Vagrant machine. In this exercise, we are going try it on a
real live server, accessible to everyone on the internet.

*Before tools like VirtualBox and Vagrant were the norm, it was commonplace to
provision servers on the internet for testing deployments. This was slow and
tedious—as you have likely seen already, there is a __lot__ of trial and error
associated with this work. Also, we had to pay for every failed attempt!*

## EXERCISE

Now it is time to spin up a new (Ubuntu) server with that provider so we can
test our configuration in the wild.

Visit https://bocoup.signin.aws.amazon.com/console with the username and
password "eagleapps". Then, browse to the EC2 control panel and speak with
the facilitator on how to start an instance.

Use a playbook to deploy an application from the previous exercises.

You'll know you've been successful when your fellow attendees can see your
application in a browser via it's public IP address (e.g. http://52.5.119.57).

## LEARNING OBJECTIVES

- How do you provision a server with your cloud provider?
- How do you deploy your application to the server?
