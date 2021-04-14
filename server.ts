import {
  serve,
  ServerRequest,
} from "https://deno.land/std@0.93.0/http/server.ts";
import * as path from "https://deno.land/std@0.93.0/path/mod.ts";

const rootDir = path.dirname(path.fromFileUrl(import.meta.url));
const importMapPath = path.join(rootDir, "import_map.json");

const bundle = await Deno.emit("./client.tsx", {
  bundle: "esm",
  check: false,
  importMapPath: path.toFileUrl(importMapPath).href,
});

const html = `
<!doctype html>
<head>
    <meta charset="utf-8">
    <title>Jira tasks</title>
</head>
<body>
    <div id="app"></div>
    <script type="module" src="./bundle.js"></script>
</body>
</html>
`;

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
