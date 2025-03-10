# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls -la  # Debug: List all files after build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
# Debug: List what's in the build directory before copying
RUN mkdir -p /app/dist
COPY --from=build /app/dist /app/dist
# Debug: List what was copied
RUN ls -la /app/dist
EXPOSE 5173
# More explicit serve command
CMD ["serve", "-s", "/app/dist", "--single", "-l", "5173"]