# User a Docker image as a base
FROM node:alpine
WORKDIR "/app"

# Download and Install dependencies
COPY ./package.json ./
RUN apk add --no-cache bash git openssh
RUN npm install
EXPOSE 8010
COPY ./index.js .
COPY ./tools ./tools
COPY ./contracts/abi ./contracts/abi/
RUN apk update
RUN apk --no-cache add curl
RUN apk --no-cache add tcptraceroute
CMD ["npm", "run", "start"]