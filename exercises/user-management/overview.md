# USER MANAGEMENT
In previous exercises we learned how to utilize the command line's `adduser` method to create accounts
on a Linux machine; and experienced the fun of manually creating, managing the permissions on, and populating the `.ssh` 
directory with an `authorized_keys` file. While this manual approach to user management does work, it's tedious and prone
to human error.

Ansible's [`user`](http://docs.ansible.com/ansible/user_module.html) and [`authorized_key`](http://docs.ansible.com/ansible/authorized_key_module.html) modules can help us to streamline and automate user management 
in an idempotent way. The exercise comes with a boilerplate playbook, but it's a good idea to read through the documentation for each module
before getting started.

## EXERCISE
Use Ansible to add your user and the workshop user to the Vagrant box. This exercise comes with a Vagrant file, 
boilerplate playbook that includes a commented out section to help get you started, and a keypair
for the workshop user.

You'll know you're done when you can run the following commands:

`vagrant up`

`
ansible-playbook -u vagrant --private-key .vagrant/machines/default/virtualbox/private_key -i 10.10.10.10, user-management.yml
`

`
ssh LOCAL_USERNAME@10.10.10.10
`

`
ssh -i ./workshop.pem workshop@10.10.10.10
`

If you encounter errors while running your playbook you may have to run `vagrant destroy` to ensure
your server is in a clean state. Ask an instructor if you're not sure what an error is reporting. Remember, Ansible is
declarative; that means your playbook should be describing the state of the machine using the `user` and `authorized_key` modules.


## LEARNING OBJECTIVES
 - Can you identify the pieces that make up an Ansible playbook?
 - How do you run Ansible against a remote server?
 - How do you specify a user using Ansible?
 - How do you specify a private key with Ansible?

