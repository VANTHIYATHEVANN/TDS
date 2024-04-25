ARG REGISTRY_URI
FROM ${REGISTRY_URI}/alpine:3.16.2 as build

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN apk add --update nodejs npm
RUN npm install -g yarn
RUN yarn install
COPY . ./
RUN yarn
ARG ENVIRONMENT
ARG PUBLIC_HOSTNAME_AND_PORT
ARG REACT_APP_ON_EC2

# All env variables in React must begin with prefix REACT_APP_

ENV REACT_APP_ENVIRONMENT $ENVIRONMENT
ENV REACT_APP_PUBLIC_HOSTNAME_AND_PORT $PUBLIC_HOSTNAME_AND_PORT
ENV REACT_APP_ON_EC2 $REACT_APP_ON_EC2
RUN yarn build

FROM ${REGISTRY_URI}/nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
