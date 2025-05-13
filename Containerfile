FROM node:22-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --chown=appuser:appgroup package.json package-lock.json* ./

RUN npm ci
COPY --chown=appuser:appgroup . .

EXPOSE 8080

CMD [ "node", "app.js"]
