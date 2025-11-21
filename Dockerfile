FROM repo-img.infocms.com.vn/infocms/builder/nodejs-web-yarn-dong-test:latest AS node_base
# ------------------------------------------------------
# Production Build docker pull node:18.20.4
# ------------------------------------------------------
WORKDIR /usr/src

RUN echo "NODE Version:" && node --version
RUN echo "Yarn Version:" && yarn --version


RUN rm -rf $(ls -A | grep -v node_modules)
COPY yarn.lock .
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
COPY --from=node_base /usr/src/dist /usr/share/nginx/html
COPY --from=node_base /usr/src/src/config/admin_cms.conf /etc/nginx/conf.d/default.conf
