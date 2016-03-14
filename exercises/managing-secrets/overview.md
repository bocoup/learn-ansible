# MANAGING SECRETS
Explain what secrets are in the context of infrastructure management.

### ANSIBLE VAULT FOR SECRET MANAGEMENT
Explain what it is, why it works.

- Create a new encrypted file, run: `ansible-vault create secrets.yml`
- Remove encryption from an encrypted file: `ansible-vault decrypt secrets.yml`
- Add encryption to an unencrypted file: `ansible-vault encrypt secrets.yml`
- View contents of encrypted file: `ansible-vault view secrets.yml`
- Edit encrypted file and re-encrypt on save: `ansible-vault edit secrets.yml`
- Using variables from encrypted file: `ansible-playbook --ask-vault-pass ...`

## EXERCISE

View the encrypted file in solution/secrets.yml. The password is learn-ansible.
Create your own encrypted file sibling to the ansible playbook. Include it with
the playbook level directive `var_files`.

## LEARNING OBJECTIVES
