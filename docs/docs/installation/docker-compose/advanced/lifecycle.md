---
sidebar_position: 2
sidebar_label: "Stop/start"
---
# Stopping and starting VVault
You can stop and start VVault via the default docker compose commands. Run these commands from the directory where your VVault `docker-compose.yml` is located.

## Stop
To stop VVault:
```bash
$ docker compose down
```

## Start
To start VVault:

```bash
$ docker compose up -d
```

## Restart
To restart VVault (note: when making changes to the `docker-compose.yml`, you'll need to manually stop and start to make the new changes be applied)

```bash
$ docker compose restart
```
