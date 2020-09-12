# TODO: node_docker_image
FROM xxx.aliyuncs.com/your-repositry/node-12.18.3

RUN mkdir -p /home/projects/pwsp
WORKDIR /home/projects/pwsp

ENV EGG_SERVER_ENV prod
ENV NODE_ENV production

EXPOSE 6001

COPY . .

RUN npm install --no-package-lock --production=false --registry=https://registry.npm.taobao.org
RUN npm run build

CMD ["dumb-init", "npm", "start"]
