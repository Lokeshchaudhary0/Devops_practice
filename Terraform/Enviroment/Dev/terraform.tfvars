rgs = {
  rg1 = {
    name     = "rg-loukesh"
    location = "westeurope"
  }
}

vnet = {
  vnet1 = {
    name                = "loukeshvnet"
    resource_group_name = "rg-loukesh"
    location            = "westeurope"
    address_space       = ["10.0.0.0/16"]
  }
}

subnet = {
  subnet1 = {
    name             = "frontend-subnet"
    rg_name          = "rg-loukesh"
    vnet_name        = "loukeshvnet"
    address_prefixes = ["10.0.1.0/24"]
  }
  subnet2 = {
    name             = "backend-subnet"
    rg_name          = "rg-loukesh"
    vnet_name        = "loukeshvnet"
    address_prefixes = ["10.0.2.0/24"]
  }

}
storage = {
  stoarge1 = {
    name                     = "staoragebeta"
    location                 = "westeurope"
    resource_group_name      = "rg-loukesh"
    account_replication_type = "LRS"
  }
}
vms = {
  vm1 = {
    subnet_name          = "frontend-subnet"
    virtual_network_name = "loukeshvnet"
    resource_group_name  = "rg-loukesh"
    nic_name             = "vm1-nic"
    location             = "westeurope"
    vm_name              = "loukeshvm1"
    size                 = "Standard_F2"
  }
  vm2 = {
    subnet_name          = "backend-subnet"
    virtual_network_name = "loukeshvnet"
    resource_group_name  = "rg-loukesh"
    nic_name             = "vm2-nic"
    location             = "westeurope"
    vm_name              = "loukeshvm"
    size                 = "Standard_F2"
  }
}
nic = {
  nic1 = {
    name                = "vm1-nic"
    location            = "westeurope"
    resource_group_name = "rg-loukesh"
  }
  nic2 = {
    name                = "vm2-nic"
    location            = "westeurope"
    resource_group_name = "rg-loukesh"
  }
}
