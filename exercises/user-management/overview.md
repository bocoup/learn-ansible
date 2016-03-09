# USER MANAGEMENT


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
your server is in a clean state. Ask an instructor if you're not sure what an error is reporting.


## LEARNING OBJECTIVES
 - Can you identify the pieces that make up an Ansible playbook?
 - How do you run Ansible against a remote server?
 - How do you specify a user using Ansible?
 - How do you specify a private key with Ansible?

