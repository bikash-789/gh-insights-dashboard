# Build stage
FROM node:18.19-alpine3.19 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps --only=production  # Install only production dependencies
COPY . .
RUN mkdir -p public  # Ensure public directory exists
RUN npm run build
RUN rm -rf node_modules && npm ci --legacy-peer-deps --only=production  # Reinstall production dependencies

# Production stage
FROM node:18.19-alpine3.19
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["node_modules/.bin/next", "start"] 