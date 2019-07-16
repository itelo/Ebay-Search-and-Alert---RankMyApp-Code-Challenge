FROM node:10.13-alpine

# Create app directory
WORKDIR /usr/root

# RUN mkdir /usr/root/server
# RUN mkdir /usr/root/frontend/
RUN npm install -g yarn

# Install app dependencies
COPY ./server /usr/root/server
COPY ./frontend /usr/root/frontend
# COPY ./server/yarn.lock /usr/root/server

# COPY ./frontend/package.json ./frontend
# COPY ./frontend/yarn.lock.json ./frontend

# RUN ls

RUN cd /usr/root/server && yarn install
RUN cd /usr/root/server && yarn build
RUN ls -l /usr/root/server

RUN cd /usr/root/frontend && yarn install
RUN cd /usr/root/frontend && yarn build
RUN ls -l /usr/root/frontend

RUN cp -a /usr/root/frontend/build /usr/root/server/public

# ENVS
ENV MONGODB_URI_LOCAL mongodb://mongo:27017/rankmyapp
ENV MONGODB_URI mongodb://mongo:27017/rankmyapp
ENV SESSION_SECRET ashdfjhasdlkjfhalksdjhflak
ENV SEND_GRID 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
ENV EBAY_APP_ID IteloFil-rankmyap-SBX-8d8c7c828-9223860c

EXPOSE 3000

CMD [ "node", "server/dist/server" ]