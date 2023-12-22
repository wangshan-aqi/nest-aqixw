
# Development stage
FROM node:18.14.0-alpine3.14

ENV NODE_ENV=development
ENV PATH=${PNPM_HOME}/bin:${PATH}
ENV PNPM_HOME="/pnpm"
# Install pnpm package manager
# RUN npm i -g pnpm
# Enable corepack 表示使用 corepack 作为包管理器
RUN corepack enable
WORKDIR /usr/src/app

COPY --chown=node:node package*.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/usr/local/share/.cache/pnpm \
    --mount=type=cache,target=/root/.cache/pnpm \
    pnpm install --frozen-lockfile

COPY --chown=node:node . .

# Install dependencies
RUN npm install -g @nestjs/cli
# Build the app
RUN pnpm run build

EXPOSE 3030
USER node

# Production stage
FROM node:18.14.0-alpine3.14
WORKDIR /usr/src/app

COPY --chown=node:node --from=prod /usr/src/app/dist ./dist
COPY --chown=node:node --from=prod /usr/src/app/node_modules ./node_modules

# Expose port
EXPOSE 3030

# Run the app
CMD ["node", "dist/main.js"]
