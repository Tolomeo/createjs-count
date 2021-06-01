const path = require("path");
const fs = require("fs");

const rootPath = fs.realpathSync(process.cwd());
const resolveRoot = (relativePath) => path.resolve(rootPath, relativePath);

const src = resolveRoot("src");
const html = resolveRoot("html");
const dist = resolveRoot("dist");
const nodeModules = resolveRoot("node_modules");

module.exports = {
  src,
  html,
  dist,
  nodeModules,
};
