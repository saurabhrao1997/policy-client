# Stage 1: Build React
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Note: Use 'dist' for Vite or 'build' for Create-React-App
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]