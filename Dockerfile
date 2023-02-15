FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
ENV NODE_END production
EXPOSE 3000
CMD ["npx","serve","build"] //zjebane