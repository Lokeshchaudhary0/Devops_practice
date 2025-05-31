# data "azurerm_key_vault" "kv" {
#   name                = "loukeshvault"
#   resource_group_name = "rg-loukesh"
# }

# data "azurerm_key_vault_secret" "username" {
#   name         = "vmusername"
#   key_vault_id = data.azurerm_key_vault.kv.id
# }

# data "azurerm_key_vault_secret" "password" {
#   name         = "vmpassword"
#   key_vault_id = data.azurerm_key_vault.kv.id
# }
