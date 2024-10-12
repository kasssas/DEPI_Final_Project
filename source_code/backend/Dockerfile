# Use an official Node.js image as the base
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the environment to production
ENV NODE_ENV=production

# Expose the port on which your backend server runs
EXPOSE 8000

# Start the backend server
CMD ["node","index.js"]
