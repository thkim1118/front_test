FROM node:12.16.1
RUN mkdir /code
WORKDIR /code
ADD ./ /code/

EXPOSE 3000
RUN npm install -g yarn
RUN yarn
CMD [ "yarn", "start"]

