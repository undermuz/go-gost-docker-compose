# Go-gost docker-compose example

This repository contains example files to run [GO Simple Tunnel v3](https://gost.run/en/) with docker compose

1. `cp ./gost/config.example.yml ./gost/config.yml`
2. Edit `./gost/config.yml` for your purpose
3. Edit `services->gost->ports` according to your gost's config 
4. Fill `.env` file for exposing ports
5. Run `docker compose up`

The example config file and dockerfile contains tls settings with filenames `cert.pem` and `key.pem`, if you do not need TLS, just remove these lines from the files

If you need TLS then place yours certificate file and key file in the root with names `cert.pem` and `key.pem`

For using with `nginx` see `./nginx` folder