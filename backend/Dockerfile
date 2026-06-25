FROM ghcr.io/puppeteer/puppeteer:21.5.0

# Set working directory
WORKDIR /usr/src/app

# Copy package file
COPY package.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose backend API server port
EXPOSE 5000

# Start the Express server
CMD ["node", "index.js"]
