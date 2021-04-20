import { serve, ServerRequest } from "std/http/server.ts";

import { buildDev } from "./build.ts";

const bundle = await buildDev();

console.info("Compiled client files:");
for (const file of Object.keys(bundle.files)) {
  console.info("- ", file);
}

const html = await Deno.readTextFile("./index.html");

const addr = "localhost:3000";
const server = serve(addr);
console.info(`Listening at http://${addr}`);

for await (const req of server) {
  switch (req.url) {
    case "/":
      await req.respond({ body: html });
      break;
    case "/bundle.js":
      await handleGetBundle(req);
      break;
    default:
      await req.respond({ status: 404, body: "Not Found" });
      break;
  }
}

function handleGetBundle(req: ServerRequest) {
  const headers = new Headers({ "content-type": "application/javascript" });
  return req.respond({ body: bundle.files["deno:///bundle.js"], headers });
}
