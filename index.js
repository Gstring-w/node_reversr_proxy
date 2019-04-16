const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();

app.listen(3000);

app.use(express.static("./dist"), () => {
  console.log("http://localhost:3000");
});

app.use(bodyParser.json());
app.use("/", function(res, req, next) {
  let basUrl = "http://zhuzu.top/tvcms/public/index.php" + res.originalUrl;
  console.log(res.method);
  if (res.method === "GET") {
    request.get(basUrl, function(err, response, body) {
      req.send(body);
      next();
    });
  } else {
    console.log(res.body);
    console.log(basUrl);
    request.post(
      {
        url: basUrl,
        body: res.body,
        json: true
      },
      function(res, response, body) {
        req.send(body);
        next();
      }
    );
  }
});
