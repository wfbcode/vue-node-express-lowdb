const express = require("express");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

// 创建服务
const app = express();
app.use(bodyParser.json());

//静态文件
app.use(express.static("./webstatic"));

//设置跨域访问
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == "OPTIONS") {
    res.send(200); //让options请求快速返回
  } else {
    next();
  }
});
// 数据库增查
const adapter = new FileAsync("data/db.json");
low(adapter)
  .then(db => {
    //数据库默认信息
    db.defaults({ lists: [] }).write();
    //获取接口
    app.get("/list/:id", (req, res) => {
      const post = db
        .get("lists")
        .find({ id: req.params.id })
        .value();

      res.send(post || "暂无反馈数据！");
    });

    // 反馈提交接口
    app.post("/submit", (req, res) => {
      let hasId = db
        .get("lists")
        .find({ id: req.body.id })
        .value();
      //数据新增或追加
      if (hasId) {
        db.get("lists")
          .find({ id: req.body.id })
          .get("data")
          .push({
            role: req.body.role,
            time: req.body.time,
            content: req.body.content
          })
          .write();
      } else {
        db.get("lists")
          .push({
            id: req.body.id,
            data: [
              {
                role: req.body.role,
                time: req.body.time,
                content: req.body.content
              }
            ]
          })
          .write();
      }
      res.send("反馈成功！");
    });
    //数据库重置
    app.post("/reset", (req, res) => {
      db.set("lists", []).write();
      res.send("重置成功！");
    });
  })
  .then(() => {
    app.listen(3000, () => console.log("listening on port 3000"));
  });
