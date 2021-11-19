/* eslint-disable */

process.on("exit", function (code) {
  return console.log(`About to exit with code ${code}`);
});

(async () => {
  const migration = require("../migrations/index.js");
  await migration();
  process.exit(0);
})();
