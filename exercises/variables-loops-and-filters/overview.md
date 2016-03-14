# VARIABLES, LOOPS, AND FILTERS

Just because Ansible is declarative doesn't mean it has to be verbose. During
the last exercise you may have wondered if there was a way to reduce some of
the duplication in your tasks. Good news, there is!

By using mappings (hashes/dictionaries/objects), sequences (arrays/lists) and
scalars (strings/numbers), we can set up data structures for Ansible to iterate
over using `with_` directives.

Also, Ansible leverages the popular python templating engine [Jinja2], exposing
[many filters] that allow complex transformations to be applied to your
variables.

## VARIABLES

In Ansible, there are [several valid places] to specify variables. For this
exercise we're going to focus on variables registered directly on tasks, and
at the top of the playbook using the `vars:` parameter, like so:

```
- hosts: all
  become: yes
  become_method: sudo
  vars:
    some_variable: some value
```

If you're not sure how to define more complex data structures like dictionaries
and lists, the Ansible docs provide a helpful [YAML syntax overview].

## LOOPS

Rather than repeating task definitions in your playbook, you can define a single
entry that will run multiple times. The most basic form of looping uses the
`with_items` directive.

For example, this:
```
- name: add user testuser1
  user:
    name: testuser1
    state: present
    groups: wheel
- name: add user testuser2
  user:
    name: testuser2
    state: present
    groups: wheel
```

...can be equally defined like this:
```
- name: add several users
  user:
    name: "{{ item }}"
    state: present
    groups: sudo
  with_items:
     - testuser1
     - testuser2
```

...or this:
```
- hosts: all
  become: yes
  become_method: sudo
  vars:
    users:
      - testuser1
      - testuser2
  tasks:
    - name: add several users
      user:
        name: "{{ item }}"
        state: present
        groups: sudo
      with_items: "{{users}}"
```

For more complex data structures, like a list of dictionaries, the `item`
variable that is passed into the task will contain properties that can be
accessed using dot notation:

```
- hosts: all
  become: yes
  become_method: sudo
  vars:
    users:
      - name: testuser1
      - name: testuser2
  tasks:
    - name: add several users
      user:
        name: "{{ item.name }}"
        state: present
        groups: sudo
      with_items: "{{ users }}"
```

In addition to `with_items`, Ansible can loop on parallel sets of data using
`with_together`, nested sets of data using `with_subelements`, file patterns
using `with_fileglob`, dictionaries using `with_dict` and much more.

Read the Ansible docs for [more looping options].

## EXERCISE

In this exercise we'll be refactoring our work from the `user-management`
exercise to [DRY] up the playbook by defining a user's list. We'll then iterate
over it using the `with_items` directive. You'll know you've succeed when you're
able to run the following commands without error:

```
ansible-playbook \
  -u vagrant \
  --private-key .vagrant/machines/default/virtualbox/private_key \
  -i 10.10.10.10, \
  playbook.yml
ssh 10.10.10.10
ssh -i ./workshop.pem workshop@10.10.10.10
```
Your playbook should only utilize the [user] and [authorized_key] modules once.

Once you've succeeded, ask yourself whether your solution is as robust as it
could be. Does it allow multiple public keys per user? What about specifying the
shell they prefer? Are there [filters] that might help provide sensible default
values, allowing properties in the user listing to be optional?

## LEARNING OBJECTIVES
 - Where are some places variables can be registered?
 - How are variables referenced?
 - How do you loop over an list or dictionary in Ansible?
 - What are filters used for?
 - What other looping constructs does Ansible support?
 - How might you specify multiple public keys with a single invocation of
   the [authorized_key] module?

[jinja2]: http://jinja.pocoo.org/docs/dev/
[several valid places]: http://docs.ansible.com/ansible/playbooks_variables.html#variable-precedence-where-should-i-put-a-variable
[many filters]: http://docs.ansible.com/ansible/playbooks_filters.html
[reserved words]: http://docs.ansible.com/ansible/playbooks_variables.html#what-makes-a-valid-variable-name
[YAML syntax overview]: http://docs.ansible.com/ansible/YAMLSyntax.html#yaml-syntax
[more looping options]: http://docs.ansible.com/ansible/playbooks_loops.html
[DRY]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[filters]: http://docs.ansible.com/ansible/playbooks_filters.html#defaulting-undefined-variables
[user]: http://docs.ansible.com/ansible/user_module.html
[authorized_key]: http://docs.ansible.com/ansible/authorized_key_module.html
