FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY public ./public
COPY src ./src
COPY tailwind.config.js ./
COPY postcss.config.js ./
ARG REACT_APP_KAKAO_MAP_API_KEY
ENV REACT_APP_KAKAO_MAP_API_KEY=$REACT_APP_KAKAO_MAP_API_KEY
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
