# WHAT IS PERMISSION ELEVATION AND HOW/WHEN/WHY IS IT USED?

It can be tempting to log in to your server as the administrator or root user.
This is risky for several reasons. For starters, it is easy to accidentally run
a destructive command when your account has access to do anything. Likewise, if
your session is ever compromised, or rogue software is running on your machine,
it will have a much broader reach into your infrastructure.

For these reasons and more it's a best practice to create a non-root user for
each administrator. That user will need permission to "elevate" their level of
access when needed.

### SUDO

In a Linux environment permissions elevation is most commonly handled with the
`sudo` command. Prefixing any command with `sudo` causes it to be executed with
administrative privileges.

### SU

Sometimes, it's necessary for one user to assume the identity of another for
an extended period. In these cases, the command `su` is used.

An administrator is able to `su - USERNAME` to "become" the user specified,
provided they are allowed to authenticate or elevate permissions to that user.
The `exit` command can be used to end the session and return to the previous
user's prompt.

Without diving into the bowels of how command shells initialize, know that the
presence of `-` in the `su` command indicates that the profile of the user you
are becoming should be processed. For example, if the user has customized their
shell, your new identity will only assume that customization when `-` is
present.

There are *many* uses for the `su` command, but for the majority of everyday
tasks `sudo` will likely be sufficient and preferred.

*Note: Invoking `su` with no arguments is the same as running `su - root`.*

### SUDOERS

One way to control who is able to run `sudo` is by editing the `/etc/sudoers`
file. This arcane configuration can be used to control a great number of things
around permissions elevation. For the purposes of this workshop we will focus
on giving your account full administrative rights. For a deep dive into what is
possible, check out [the sudo manual](http://www.sudo.ws/sudo/man/1.8.2/sudoers.man.html).

### ON PASSWORDLESS SUDO

In the [learn-ssh](https://github.com/bocoup/learn-ssh) workshop we talked about
the importance of protecting your SSH private key with a password to prevent it
from being used even if the file was stolen. This, along with only allowing
users to authenticate using SSH to non-root accounts should mean that we can
feel pretty secure that only known users can access our server.

By default `sudo` will prompt a user for their password before executing a
command with elevated permissions. This is not meant to prevent bad actors from
accessing the system. Instead, the password prompt for permission elevation is
meant to guard against the scenario of an unattended workstation with an active
session. It also provides time for fast fingered users to reflect on the command
they are about to run.

While using password-less sudo in a local developement environment is risk free,
there is a choice to be made for remote environments. Our recommendation is that
remote servers require a password in order to elevate permission. We'll cover
how to securely set a user's password in the user-management section.

## EXERCISE

Log in to VM you created in the last exercise (as the user `vagrant`). Next,
configure your machine such that your personal account can `sudo` without a
password.

Hint: look up the command `visudo`.

You will know you have completed the exercise when you can log in with your
personal account and run these commands:
  - `sudo cat /etc/sudoers`
  - `sudo su`
  - `sudo su -`

## LEARNING OBJECTIVES

- Why is logging in as the root user a bad idea?
- How can an administrator assume the role of any user on the box?
- How can a regular user execute a single command as an administrator?
- How do you give your account sudo access without a password?
- When using `su` what does the `-` do?
