FROM hayd/alpine-deno:1.9.0 as builder

COPY app app
COPY client.tsx client.tsx
COPY build.ts build.ts
COPY import_map.prod.json import_map.prod.json

RUN deno run --allow-net --allow-read --allow-write --unstable --import-map import_map.prod.json build.ts

FROM nginx

COPY --from="builder" bundle.js /usr/share/nginx/html/bundle.js
COPY index.html /usr/share/nginx/html/index.html