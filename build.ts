import * as path from "std/path/mod.ts";

const rootDir = path.dirname(path.fromFileUrl(import.meta.url));

type BuildOptions = {
  check: boolean;
  importMapPath: string;
};

function build({ check, importMapPath }: BuildOptions) {
  return Deno.emit("./client.tsx", {
    bundle: "esm",
    check,
    importMapPath: path.toFileUrl(importMapPath).href,
    compilerOptions: {
      sourceMap: false,
    },
  });
}

export function buildDev() {
  const importMapPath = path.join(rootDir, "import_map.json");
  return build({ check: false, importMapPath });
}

export function buildProd() {
  const importMapPath = path.join(rootDir, "import_map.prod.json");
  return build({ check: true, importMapPath });
}

export function writeBundle(bundle: any, path: string) {
  const encoder = new TextEncoder();
  const bundleData = encoder.encode(bundle.files["deno:///bundle.js"]);

  return Deno.writeFile(
    path,
    bundleData,
  );
}

// Produce prod bundle when executed directly
if (import.meta.main) {
  const bundle = await buildProd();
  await writeBundle(bundle, path.join(rootDir, "bundle.js"));
}
