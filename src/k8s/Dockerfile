FROM repo-img.infocms.com.vn/infocms/builder/nodejs-web-yarn:latest AS node_base
# ------------------------------------------------------
# Production Build docker pull node:16.14.0-alpine
# ------------------------------------------------------
WORKDIR /usr/src

RUN rm -rf $(ls -A | grep -v node_modules)
COPY package-lock.json .
COPY package.json .

RUN yarn install
#RUN npm i -g rimraf
# Build project
COPY . /usr/src

RUN ls /usr/src

RUN yarn build

# ------------------------------------------------------
# Production Deploy
# ------------------------------------------------------
FROM repo-img.infocms.com.vn/infocms/builder/reactjs-web-nginx118:20231016

#RUN apt-get update && \
#    apt-get install -y iputils-ping && \
#    apt-get install -y net-tools && \
#   apt-get install -y telnet && \
#    apt-get install -y nano

#RUN mkdir /etc/nginx/sslkey

COPY --from=node_base /usr/src/target/classes/static /usr/share/nginx/html
COPY --from=node_base /usr/src/config/ssl /etc/nginx/sslkey
COPY --from=node_base /usr/src/config/admin_cms.conf /etc/nginx/conf.d/default.conf

RUN ls -l /usr/share/nginx/html
