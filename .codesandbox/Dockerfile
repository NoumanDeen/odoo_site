FROM node:18-bullseye

ENV PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:$PATH"

RUN apt-get update && apt-get install -y findutils grep coreutils postgresql-client && rm -rf /var/lib/apt/lists/*