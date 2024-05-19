# Go-gost docker-compose example

This repository contains example files to run [GO Simple Tunnel v3](https://gost.run/en/) with docker compose

## Setup

### TLS

1. `cd ./configurations/tls`
2. `cp ./config.example.yml ./config.yml && cp ./example.env ./.env`
3. Edit `./config.yml` and `./.env` for your purpose (Optional)
4. Place yours certificate file and key file in the root with names `cert.pem` and `key.pem`
5. Run `docker compose up`

### Socks5

1. `cd ./configurations/socks5`
2. `cp ./config.example.yml ./config.yml && cp ./example.env ./.env`
3. Edit `./config.yml` and `./.env` for your purpose (Optional)
4. Run `docker compose up`