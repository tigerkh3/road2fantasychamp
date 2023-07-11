# syntax=docker/dockerfile:1

FROM node:18-alpine

# copy the application files into the container
COPY ./ ./

#Expose Port 3000
EXPOSE 3000

# install dependencies
RUN npm install

# Start the Server
CMD ["npm", "start"]
