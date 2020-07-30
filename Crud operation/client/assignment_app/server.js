const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build")));

// app.get("/*", function (req, res) {
// "*" means if any of the subsequent url after the root i.e. /assignments or /students in call cases same index.html to be rendered back via resp.sendfile.
// we can restrict the URL by specifying some prefix url after / --- may be for the subdomain hosting purpose if multi app running on the same main domain
app.get("/*s*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(9000, () => {
  console.log("Custom production server has been started at 9000 ....");
});
