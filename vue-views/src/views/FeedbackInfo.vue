<template>
  <div class="feed-back-container">
    <p class="title-info">{{this.companyName+">"+this.carType}}</p>
    <div class="data-list-wrap">
      <ul class="data-list">
        <li
          v-for="(item,index) in list"
          :key="index"
          :class="[item.role=='0'?'role1-bg':item.role=='1'?'role2-bg':'role3-bg']"
        >
          <p>{{item.time}}</p>
          <div class="content">
            <span>{{item.role=="0"?"管理员：":item.role=="1"?"技术服务：":"客户："}}</span>
            <span>{{item.content}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="feed-back">
      <textarea placeholder="请反馈故障、发表内容" v-model.trim="content" @blur="onBlur"></textarea>
      <button class="feed-back-btn" @click="feedBack">反馈</button>
    </div>
  </div>
</template>

<script>
import { Toast, Loading } from "vant";
import axios from "axios";
/**
 * @desc  时间格式转化
 * @param  {String} format 转化格式
 * @return {String} 已转化的时间
 */
Date.prototype.format = function(format) {
  let args = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
    S: this.getMilliseconds()
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var i in args) {
    var n = args[i];
    if (new RegExp("(" + i + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length)
      );
  }
  return format;
};
export default {
  name: "feedBack",
  data() {
    return {
      id: "",
      companyName: "",
      carType: "",
      content: "",
      list: [],
      // baseUrl: "http://10.5.1.47:3000",
      baseUrl: "http://129.211.19.135:80"
    };
  },
  mounted() {
    document.title = "详情";
    this.companyName = window.localStorage.getItem("companyName") || "";
    let companyKey = window.localStorage.getItem("companyKey") || "";
    let carType = window.localStorage.getItem("carType");

    this.carType =
      carType == "1" ? "大型车" : carType == "2" ? "中型车" : "小型车";
    this.id = companyKey + carType;
    this.getData();
  },
  methods: {
    //获取数据
    getData(flag) {
      axios.get(this.baseUrl + "/list/" + this.id).then(
        res => {
          this.list = res.data.data;
          if (!flag) return;
          this.$nextTick(() => {
            document.querySelector(
              ".data-list-wrap"
            ).scrollTop = document.querySelector(
              ".data-list-wrap"
            ).scrollHeight;
          });
        },
        error => {
          Toast("服务器异常，请联系管理员！");
        }
      );
    },
    //提交反馈
    feedBack() {
      if (this.content == "") {
        Toast("反馈内容不能为空！");
        return;
      }

      let time = new Date().format("yyyy-MM-dd hh:mm:ss");
      let role = JSON.parse(window.localStorage.getItem("userInfo")).role;
      let params = {
        id: this.id,
        role,
        time,
        content: this.content
      };
      axios({
        method: "post",
        url: this.baseUrl + "/submit",
        data: params
      }).then(
        res => {
          this.content = "";
          Toast("反馈成功");
          this.getData(1);
        },
        error => {
          Toast("服务器异常，请联系管理员！");
        }
      );
    },
    //微信软键盘关闭导致页面空缺
    onBlur() {
      setTimeout(function() {
        window.scrollTo(0, 0);
      }, 100);
    }
  }
};
</script>
<style scope>
.feed-back-container {
  position: relative;
}
.title-info {
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 99999;
  height: 48px;
  line-height: 48px;
  background: #f0f0f0;
}
.data-list-wrap {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  height: 100vh;
}
.data-list {
  padding: 50px 10px 120px;
}
.data-list li {
  padding: 15px 10px;
  margin-top: 15px;
  text-align: left;
  border-radius: 12px;
}
.data-list .content {
  margin-top: 10px;
}
.role1-bg {
  color: #ef5b43;
  background: #ffedea;
}
.role2-bg {
  color: #5c9356;
  background: #d7efd7;
}
.role3-bg {
  color: #5279bb;
  background: #eaf2ff;
}
.feed-back {
  position: absolute;
  bottom: 0;
  padding: 10px 0 5px;
  width: 100%;
  background: #e6e6e6;
}
textarea {
  width: 80%;
  padding: 8px;
  border-radius: 15px;
  border: 1px solid #999;
}
.feed-back-btn {
  width: 50%;
  height: 35px;
  margin-top: 5px;
  color: #fff;
  background: #5279bb;
  border-radius: 47px;
  border: none;
}
</style>

