FROM gogost/gost:latest

WORKDIR /usr/src/gost

COPY ./config.yml ./config.yml

ENTRYPOINT [ "gost", "-C", "./config.yml", "-D" ]