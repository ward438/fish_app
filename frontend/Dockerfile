# Use an official Node.js runtime as a parent image
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY fish-app /app/
# Install dependencies
RUN npm install

# Build the Next.js app for production
ENV BACKEND_HOST=backend
# RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]
