Vagrant.configure("2") do |config|
  config.vm.define "controller", primary: true do |vb|
    vb.vm.box = "ubuntu/trusty64"
    vb.vm.synced_folder '.', '/mnt'
    vb.vm.network :private_network, ip: '10.10.10.100'
    vb.vm.provider "virtualbox" do |v|
      v.customize ["modifyvm", :id, "--cableconnected1", "on"]
    end
    vb.vm.provision "shell", inline: [
      'echo Installing ansible on control machine...',
      'sudo apt-get install --yes software-properties-common &> /dev/null',
      'sudo apt-add-repository --yes ppa:ansible/ansible &> /dev/null',
      'sudo apt-get update &> /dev/null',
      'sudo apt-get install --yes ansible &> /dev/null',
      'sudo cat /mnt/ssh/vagrant.key >> /home/vagrant/.ssh/authorized_keys',
      'echo Done.',
    ].join("\n")
    vb.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"
    vb.ssh.insert_key = false
    vb.ssh.forward_agent = true
  end

  config.vm.define "target" do |vb|
    vb.vm.box = "ubuntu/trusty64"
    vb.vm.synced_folder '.', '/opt'
    vb.vm.network :private_network, ip: '10.10.10.10'
    vb.vm.provider "virtualbox" do |v|
      v.customize ["modifyvm", :id, "--cableconnected1", "on"]
    end
    vb.vm.provision "shell", inline:
      "sudo cat /opt/ssh/vagrant.key >> /home/vagrant/.ssh/authorized_keys"
    vb.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"
    vb.ssh.insert_key = false
    vb.ssh.forward_agent = true
  end
end
