// Minimal DOM + browser API stubs
const { JSDOM } = require("jsdom");
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://localhost"
});
const { window } = dom;
global.window = window;
global.document = window.document;
global.navigator = window.navigator;

// Capture errors
const errors = [];
window.addEventListener("error", e => errors.push(e.message));

// Load bundle
const fs = require("fs");
const bundle = fs.readFileSync("./bundle.js", "utf8");
try {
  const result = new Function("window","document","navigator", bundle)(window, window.document, window.navigator);
  setTimeout(() => {
    const root = window.document.getElementById("root");
    console.log("root innerHTML length:", root ? root.innerHTML.length : "null");
    console.log("errors:", errors);
  }, 500);
} catch(e) {
  console.error("BUNDLE ERROR:", e.message);
  console.error(e.stack.split("\n").slice(0,5).join("\n"));
}