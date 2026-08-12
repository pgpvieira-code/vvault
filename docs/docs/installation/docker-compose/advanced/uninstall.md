---
sidebar_position: 4
sidebar_label: "Uninstall"
---
# Uninstall

To uninstall VelixVault, run the following command. This will stop and remove the VelixVault containers and remove the Docker images.

:::note
This will not delete any data stored in the database. If you wish to delete all data, you should manually delete the `database` directory and the other directories created by VelixVault.
:::

### Steps
1. Run docker compose down and remove any local Docker images related to VelixVault.
```bash
$ docker compose down --rmi all
```
