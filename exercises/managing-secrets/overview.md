# MANAGING SECRETS

When working with infrastructure it's only a matter of time before you'll
need to include sensitive information that you know shouldn't be committed
into source control. Maybe it's TLS certificates, or an api key. Whatever
the case, there a few common approaches to keeping your secret data secure.

### GITIGNORED FILES

In this scenario each developer has a copy of the secret data on their machine.
These secrets are enumerated in a `.gitignore` file, preventing them from being
accidentally committed.

This method works decently well on small teams, but the initial transmission of
the secrets is a problem (don't email them in the clear!), as is updating the
secrets when they change.

### POORLY ENCRYPTED FILES

You can use an ad-hoc OpenSSL command to encrypt and decrypt secret data, but
this approach is error prone.

### SECURELY ENCRYPTED FILES

If everyone on your team is using GPG and has a public/private keypair, you
can commit encrypted files without fear. Of course then everyone on your team
needs to learn [GPG], which probably won't happen.

### USE ANSIBLE VAULT

Ansible provides a way to encrypt files and decrypt them as part of the
standard Ansible run. This is useful because it doesn't require distinct out
of band decryption.

There are some downsides, the biggest being that Ansible Vault uses symmetric
encryption. This means a password must be communicated out of band. Also, there
there is no straightforward way for the decryption step to ensure the ciphertext
has not been modified since it was written.

In spite of this, Ansible Vault is probably the best choice if your team isn't
willing to adopt a more robust solution like [GPG] or a full secret storage
platform like [HashiCorp's Vault]. It is immeasurably better than committing
secret files without any encryption, or just copying and pasting secret data
via email or chat.

### USING ANSIBLE VAULT FOR SECRET MANAGEMENT

Ansible Vault is essentially a wrapper around Python's crypto module. Because
it's only using AES256 in CBC mode it doesn't provide any authentication, which
means your ciphertext could be modified at rest and still successfully decrypt.
There is also no way to know who the original author was (though `git` can
probably help there).

Here's a handy reference for common vault interactions:

- Create a new encrypted file, run: `ansible-vault create secrets.yml`
- Remove encryption from an encrypted file: `ansible-vault decrypt secrets.yml`
- Add encryption to an unencrypted file: `ansible-vault encrypt secrets.yml`
- View contents of encrypted file: `ansible-vault view secrets.yml`
- Edit encrypted file and re-encrypt on save: `ansible-vault edit secrets.yml`
- Using variables from encrypted file: `ansible-playbook --ask-vault-pass ...`

## EXERCISE

First, view the encrypted file in `solution/secrets.yml`. The password is the
same as the name of this workshop. The file contains an API key which our app
requires to function.

Next, create your own encrypted secret file sibling to the provided playbook.
It must provide a value for the variable `api_key`, which you can see used in
the upstart service file `app.conf`.

Once you have created an encrypted file, deploy your application to Vagrant with
the following command:
```
ansible-playbook \
  --ask-vault-pass \
  -u vagrant \
  --private-key .vagrant/machines/default/virtualbox/private_key \
  -i 10.10.10.10, \
  playbook.yml
```

You'll know you were successful when you can visit http://10.10.10.10 and use
the provided search box to retrieve data from a third-party API.

## LEARNING OBJECTIVES

- Why is a bad idea to commit secret data into a git repository?
- What are some of the ways to keep secret data out of a repository?
- What are the advantages of Ansible Vault?
- What are the downsides of Ansible Vault?
- How will you secure your secret data?
- What is the most ideal way to pass secret data into your application while
  it is running?

[HashiCorp's Vault]: https://www.vaultproject.io/
[GPG]: https://www.gnupg.org/
