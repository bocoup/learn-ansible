# USER MANAGEMENT

In a previous exercise we learned how to manage user accounts on a Linux machine
using the command `adduser`. We also experienced the joy of manually creating,
managing the permissions for, and populating your `~/.ssh` directory with an
`authorized_keys` file. While this approach to user management does work, it's
tedious and prone to human error.

Ansible's [user] and [authorized_key] modules can help us to streamline and
automate these tasks in an idempotent way. It's a good idea to read through
the documentation for each new module before you start using it.

## EXERCISE

Use Ansible to add your user and the workshop user to the Vagrant box. This
exercise comes with a boilerplate playbook with commented sections to help
get you started.

You'll know you're done after you can can run the following commands without
errors:

```
cd /mnt
ansible-playbook -i 10.10.10.10, playbook.yml
ssh 10.10.10.10
ssh -i ./ssh/workshop.pem workshop@10.10.10.10
```

If you encounter errors while running your playbook, you may have to run
`vagrant destroy && vagrant up` to ensure your server is in a clean state.
Ask an instructor if you're not sure what an error is reporting.

## LEARNING OBJECTIVES
 - Can you identify the pieces that make up an Ansible playbook?
 - How do you run Ansible against a remote server?
 - How do you specify a user should be present using Ansible?
 - How do you specify a private key should be present using Ansible?

[user]: http://docs.ansible.com/ansible/user_module.html
[authorized_key]: http://docs.ansible.com/ansible/authorized_key_module.html
