FROM node:lts AS base

WORKDIR /app

# yarn install
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# dev stage
FROM base AS dev
ENV NODE_ENV=development
CMD ["yarn", "start:dev"]

# prod stage
FROM base AS prod
ENV NODE_ENV=production
COPY . .
RUN yarn build
CMD ["yarn", "start:prod"]
