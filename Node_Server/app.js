const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa2-cors");

const index = require("./routes/index");
const saveImage = require("./routes/saveimg");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

// 解决跨域
app.use(
  cors({
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization", "Date"],
    maxAge: 100000,
    credentials: true,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Custom-Header",
      "anonymous",
      "Set-Cookie"
    ]
  })
);

app.use(
  views(__dirname + "/views", {
    extension: "ejs"
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(saveImage.routes(), saveImage.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
