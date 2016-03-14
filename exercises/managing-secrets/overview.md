# MANAGING SECRETS
When working with infrastructure it's only a matter of time before you'll 
need to include sensitive information that you know shouldn't be committed 
directly into your repository. Maybe it's TLS certificates and keys or an api
key. Whatever the case may be there are a few options available to keep your 
secret data secure.

1. Git Ignored Files
In this scenario each developer has their own copy of the secret data on 
their machine and the `.gitignore` file ensures no one accidently commits it.
This works well in some cases but presents a problem because securing the 
initial transmission can be tricky, to say nothing of sending around updates 
when things change.

1. Poorly Encrypted Committed Files
You can use some random ad-hoc OpenSSL command to encrypt and decrypt secret 
data, but it's error prone and uses OpenSSL which can be prone to random bugs and 
vulnerabilities.

1. Securely Encrypted Committed Files
If everyone on your team is using GPG and has a public/private keypair you 
can commit encrypted files without fear. Of course then everyone on your team
needs to learn [GPG], which probably won't happen.

1. Utilize Ansible Vault
Ansible provides a way to encrypt files and decrypt them as part of the 
standard Ansible run. This is useful because it doesn't require distinct out 
of band decryption. There are some downsides, specifically: Ansible vault uses 
symmetric encryption, that means a password must be communicated out of band 
and that there is no way for the decryption step to ensure the ciphertext has
not been modified since it was written (though `git log` or `git status` 
might be helpful with that).

Despite its downsides, Ansible Vault is probably the best choice if your team
isn't willing to adopt a more robust solution like [GPG] or a full secret 
storage platform like [Hashi Corp's Vault server]. It's a million times better 
than committing secret files without any encryption or just copying and 
pasting secret data around via email or chat.

### USING ANSIBLE VAULT FOR SECRET MANAGEMENT
Ansible Vault is essentially a wrapper around Python's crypto module. Because
it's only using AES256 in CBC mode it doesn't provide any authentication, which 
means your ciphertext could be modified at rest and still sucessfully decrypt. 
There is also no way to know who the original author was (though `git` can 
probably help there). Here's a handy reference for common vault interactions:

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
 - Why is a bad idea to commit secret data into a git repository?
 - What are some of the ways to keep secret data out of a repository?
 - What are the advantages of Ansible Vault?
 - What are the downsides of Ansible Vault?
 - How will you secure your secret data?

[Hashi Corp's Vault server]: https://www.vaultproject.io/
[GPG]: https://www.gnupg.org/