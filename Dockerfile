# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Ensure prod API base is baked into the bundle
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build

# Runtime stage (serve static files)
FROM nginx:1.27-alpine
# Remove default site
RUN rm -f /etc/nginx/conf.d/default.conf
# Add our SPA config
COPY nginx.conf /etc/nginx/conf.d/site.conf
# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
