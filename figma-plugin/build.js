/* Builds the single code.js that Figma loads from the src modules. */
const fs = require("fs");
const path = require("path");

const root = __dirname;
const srcDir = path.join(root, "src");
const files = fs
  .readdirSync(srcDir)
  .filter((name) => name.endsWith(".js"))
  .sort();

if (!files.length) {
  console.error("No source files found in src/.");
  process.exit(1);
}

const parts = files.map((name) => {
  const body = fs.readFileSync(path.join(srcDir, name), "utf8");
  return "/* ===== " + name + " ===== */\n" + body;
});

const output =
  "/* AfriYouth Design System Builder — generated from src/. Do not edit by hand. */\n" +
  parts.join("\n");

fs.writeFileSync(path.join(root, "code.js"), output, "utf8");
console.log("Built code.js from " + files.length + " modules (" + output.length + " bytes).");
console.log(files.join("\n"));
