# Use an official Node.js image as the base
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the frontend (if applicable)
RUN npm run build

# Expose the port on which your frontend server runs
EXPOSE 3000

# Start the frontend server
CMD ["npm", "start"]
