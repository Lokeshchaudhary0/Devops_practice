module "rg" {
  source = "../../Modules/azurerm_resource_group"
  rgs    = var.rgs
}
module "subnet" {
  depends_on = [module.virtual_network]
  source     = "../../Modules/azurerm_subnet"
  subnet     = var.subnet
}
module "virtual_network" {
  depends_on = [module.rg]
  source     = "../../Modules/azurerm_virtual_network"
  vnet       = var.vnet
}
module "storage_account" {
  depends_on      = [module.rg]
  source          = "../../Modules/Storage_Account"
  loukesh-storage = var.storage
}
module "vm" {
  depends_on = [module.subnet]
  source     = "../../Modules/Virtual_Machine"
  vms        = var.vms

}
