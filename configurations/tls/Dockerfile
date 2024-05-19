FROM gogost/gost:latest

WORKDIR /usr/src/gost

COPY ./config.yml ./config.yml
COPY ./cert.pem ./cert.pem
COPY ./key.pem ./key.pem

ENTRYPOINT [ "gost", "-C", "./config.yml", "-D" ]