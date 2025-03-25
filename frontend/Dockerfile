# Use the official Node.js image as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY ./frontend/package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of your frontend application to the container
COPY ./frontend/ /app/

# Make port 5173 available to the world outside this container
EXPOSE 5173

# Run the app when the container launches
CMD ["npm", "run", "dev"]
