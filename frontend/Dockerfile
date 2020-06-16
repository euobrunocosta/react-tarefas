FROM node:13-alpine
WORKDIR /app/
COPY . ./
RUN yarn
RUN yarn build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80