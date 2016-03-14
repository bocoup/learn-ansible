# VARIABLES, LOOPS, AND FILTERS
Just because Ansible is declarative doesn't mean it has to be verbose. During the last exercise you
may have been wondering if there was a way to reduce duplication and define data structures that 
could contain our system's user information; there is! 

Ansible allows us to define data structures and loop through them using `with_` directives in task
definitions. Further, because Ansible uses the Jinja2 templating engine [several filters are supported](http://docs.ansible.com/ansible/playbooks_filters.html) 
that allow us to transform our data to better meet the needs of modules consuming it.

In Ansible it's common to refer to variables being "registered" rather than "assigned". There are 
[several valid places](http://docs.ansible.com/ansible/playbooks_variables.html#variable-precedence-where-should-i-put-a-variable) to specify and ways to register variables, but for this exercise we're going to focus on
variables that are registered directly at the top of the playbook using the `vars:` parameter, like so:

```
- hosts: all
  become: yes
  become_method: sudo
  vars:
    some_variable: some value
```
 
To reference a variable in a task wrap it in quotes and double curly braces: `"{{some_variable}}"`.
Variable names must begin with a letter and may contain letters, numbers, and underscores. The Ansible docs site 
provides a [list of reserved words that cannot be used as variable names](http://docs.ansible.com/ansible/playbooks_variables.html#what-makes-a-valid-variable-name).
If you're not sure how to define more complex data structures like dictionaries and lists using YAML
the [Ansible documentation site provides a helpful YAML overview](http://docs.ansible.com/ansible/YAMLSyntax.html#yaml-syntax). 

Rather than manually repeating task definitions in your playbook for things like adding users or installing 
packages, you can cause an single task to run multiple times by providing a data set to opperate on using
one of Ansible's looping directives. These can be added to pretty much any Ansible module as a directive.
The most basic loop is over a simple list and uses the `with_items` directive which can operate on an inlined 
data structure or a registered variable. If operating on a registered variable you do not need to use quotes 
or curly braces, and instead may reference it by name only.

**No loops**
```
- name: add user testuser1
  user: name=testuser1 state=present groups=wheel
- name: add user testuser2
  user: name=testuser2 state=present groups=wheel
```

**Loop with task level inline variable**
```
- name: add several users
  user: 
    name: "{{item}}" 
    state: present 
    groups: "sudo"
  with_items:
     - testuser1
     - testuser2
```

**Loop with a playbook defined variable**
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
        groups: "sudo"
      with_items: users
```
For more complex data structures, like a list of dictionaries, the `item` variable that is passed into 
the task will contain properties that can be accessed using dot notation (`"{{item.prop}}"`). 

**Loop with a playbook defined variable with properties**
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
        groups: "sudo"
      with_items: users
```

Besides `with_items`, Ansible can loop on parallel sets of data using `with_together`, nested sets of
data using `with_subelements`, file patterns using `with_fileglob`, dictionaries using `with_dict` and much more. 
Checkout the Ansible docs for [more looping options](http://docs.ansible.com/ansible/playbooks_loops.html). 
Only one looping directive can be used for any single task.

## EXERCISE
In this exercise we'll be refactoring our work from the `user-management` exercise to [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) up the 
playbook by defining a data structure to store user information and utilizing `with_items` directives
along with the `user` and `authorized_key` modules.

You'll know you've succeed when you're able to run the following commands without error, and your
playbook only utilizes the `user` and `authorized_key` modules once.

```
ansible-playbook \
  -u vagrant \
  --private-key .vagrant/machines/default/virtualbox/private_key \
  -i 10.10.10.10, \
  playbook.yml
ssh LOCAL_USERNAME@10.10.10.10
ssh -i ./workshop.pem workshop@10.10.10.10
```

Once you've succeeded, ask yourself whether your solution is as robust as it could be. Does it allow users
to specify multiple keys or the shell they prefer? Are there [filters](http://docs.ansible.com/ansible/playbooks_filters.html#defaulting-undefined-variables) that might help provide sensible default values 
allowing certain user properties to be optional or [modify defined values in some useful way](http://docs.ansible.com/ansible/playbooks_filters.html#other-useful-filters)?

## LEARNING OBJECTIVES
 - Where are some places variables can be registered?
 - How are variables referenced?
 - How do you loop over an array/list in Ansible?
 - What are filters used for?
 - What other looping constructs does Ansible support?