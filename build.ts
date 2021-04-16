import * as path from "std/path/mod.ts";

const rootDir = path.dirname(path.fromFileUrl(import.meta.url));
const importMapPath = path.join(rootDir, "import_map.prod.json");

const bundle = await Deno.emit("./client.tsx", {
  bundle: "esm",
  check: true,
  importMapPath: path.toFileUrl(importMapPath).href,
  compilerOptions: {
    sourceMap: false,
  },
});

const bundleDstPath = path.join(rootDir, "bundle.js");

const encoder = new TextEncoder();
const bundleData = encoder.encode(bundle.files["deno:///bundle.js"]);

await Deno.writeFile(
  bundleDstPath,
  bundleData,
);
