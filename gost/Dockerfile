FROM gogost/gost:latest

WORKDIR /usr/src/gost

COPY ./gost/config.yml ./config.yml
COPY ./cert.pem ./cert.pem
COPY ./key.pem ./key.pem

RUN gost -V

ENTRYPOINT [ "gost", "-C", "./config.yml", "-D" ]