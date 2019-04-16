<template>
  <div class="login-container">
    <img src="@/assets/images/ydlogo.png" width="120" height="120">
    <p>中国移动</p>
    <p>江西省应急通讯车管理系统</p>
    <div class="item">
      <span>账号：</span>
      <input type="text" v-model.trim="user" @blur="onBlur">
    </div>
    <div class="item">
      <span>密码：</span>
      <input type="password" v-model.trim="password" @blur="onBlur">
    </div>
    <button class="login-btn" @click="login">登录</button>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "login",
  data() {
    return {
      user: "",
      password: "",
      userList: [
        //role 0管理员 1技术服务 2分公司
        { user: "gly01", password: "000000", role: "0" },
        { user: "gly02", password: "000000", role: "0" },
        { user: "gly03", password: "000000", role: "0" },
        { user: "jsfw01", password: "000001", role: "1" },
        { user: "jsfw02", password: "000001", role: "1" },
        { user: "jsfw03", password: "000001", role: "1" },
        { user: "jsfw04", password: "000001", role: "1" },
        { user: "jxsgs", password: "000002", role: "2" },
        { user: "ncgs", password: "000002", role: "2" },
        { user: "ytgs", password: "000002", role: "2" },
        { user: "xygs", password: "000002", role: "2" },
        { user: "jjgs", password: "000002", role: "2" },
        { user: "gzgs", password: "000002", role: "2" },
        { user: "pxgs", password: "000002", role: "2" },
        { user: "fzgs", password: "000002", role: "2" },
        { user: "srgs", password: "000002", role: "2" },
        { user: "ycgs", password: "000002", role: "2" },
        { user: "jags", password: "000002", role: "2" },
        { user: "jdzgs", password: "000002", role: "2" },
        { user: "byhao1", password: "000002", role: "2" },
        { user: "byhao2", password: "000002", role: "2" }
      ]
    };
  },
  methods: {
    login() {
      if (this.user == "") {
        Toast("请输入账号！");
        return;
      } else if (this.password == "") {
        Toast("请输入密码！");
        return;
      }
      //判断账号密码
      for (let i = 0; i < this.userList.length; i++) {
        if (
          this.userList[i].user == this.user &&
          this.userList[i].password == this.password
        ) {
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(this.userList[i])
          );
          this.$router.push({ path: "/companyList" });
          return;
        }
      }
      Toast("请输入正确的账号或密码！");
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
<style>
.login-container {
  padding: 80px 50px 0;
}
.login-container p {
  margin-top: 10px;
  font-size: 20px;
  color: #5279bb;
}
.item {
  position: relative;
  padding-left: 63px;
  padding-right: 10px;
  margin-top: 20px;
  color: #999;
  text-align: left;
  border: 1px solid #979797;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.06);
  border-radius: 8px;
}
.item span {
  position: absolute;
  left: 16px;
  width: 50px;
  height: 43px;
  line-height: 43px;
}
.item input {
  width: 100%;
  height: 43px;
  line-height: 43px;
  background: transparent;
}
.login-btn {
  width: 85%;
  height: 47px;
  margin-top: 60px;
  color: #fff;
  background: #5279bb;
  border-radius: 47px;
  border: none;
}
</style>

