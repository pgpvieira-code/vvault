---
sidebar_position: 4
sidebar_label: "Uninstall"
---
# Uninstall

To uninstall VVault, run the install script with the `uninstall` option. This will stop and remove the VVault containers and remove any local VVault Docker images.

:::note
This will not delete any data stored in the database. If you wish to delete all data, you should manually delete the `database` directory and the other directories created by VVault.
:::

### Steps
1. Run the install script with the `uninstall` option
```bash
$ ./install.sh uninstall
```
