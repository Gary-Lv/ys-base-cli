const router = require("koa-router")();
const fs = require("fs");

// router.prefix("/");

router.post("/saveImage", function(ctx, next) {
  let imageInfo = ctx.request.body;
  let imageData = imageInfo.imgData;
  let base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
  let dataBuffer = new Buffer(base64Data, "base64");
  // 获取当前时间戳 用来做图片名称
  let timestamp = new Date().valueOf();
  //写入文件
  fs.writeFile(`public/images/${timestamp}.png`, dataBuffer, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log("保存成功");
    }
  });
});

module.exports = router;
