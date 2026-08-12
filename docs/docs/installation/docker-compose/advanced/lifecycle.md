---
sidebar_position: 2
sidebar_label: "Stop/start"
---
# Stopping and starting VelixVault
You can stop and start VelixVault via the default docker compose commands. Run these commands from the directory where your VelixVault `docker-compose.yml` is located.

## Stop
To stop VelixVault:
```bash
$ docker compose down
```

## Start
To start VelixVault:

```bash
$ docker compose up -d
```

## Restart
To restart VelixVault (note: when making changes to the `docker-compose.yml`, you'll need to manually stop and start to make the new changes be applied)

```bash
$ docker compose restart
```
