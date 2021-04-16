import { serve, ServerRequest } from "std/http/server.ts";
import * as path from "std/path/mod.ts";

const rootDir = path.dirname(path.fromFileUrl(import.meta.url));
const importMapPath = path.join(rootDir, "import_map.json");

const bundle = await Deno.emit("./client.tsx", {
  bundle: "esm",
  check: false,
  importMapPath: path.toFileUrl(importMapPath).href,
  compilerOptions: {
    sourceMap: true,
  },
});

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
    case "/bundle.js.map":
      await handleGetBundleMap(req);
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
function handleGetBundleMap(req: ServerRequest) {
  const headers = new Headers({ "content-type": "application/json" });
  return req.respond({ body: bundle.files["deno:///bundle.js.map"], headers });
}
