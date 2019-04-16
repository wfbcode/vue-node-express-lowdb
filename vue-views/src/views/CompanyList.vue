<template>
  <div class="company-list-container">
    <ul>
      <li
        v-for="(value,key) in newCompanyList"
        :key="key"
        @click="goTypeList(key,value)"
      >{{value+" >"}}</li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "companyList",
  data() {
    return {
      companyList: {
        jxsgs: "江西省公司",
        ncgs: "南昌分公司",
        ytgs: "鹰潭分公司",
        xygs: "新余分公司",
        jjgs: "九江分公司",
        gzgs: "赣州分公司",
        pxgs: "萍乡分公司",
        fzgs: "抚州分公司",
        srgs: "上饶分公司",
        ycgs: "宜春分公司",
        jags: "吉安分公司",
        jdzgs: "景德镇分公司"
      },
      newCompanyList: {}
    };
  },
  mounted() {
    document.title = "城市分公司";
    let userInfo = window.localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    if (userInfo && userInfo.role == "2") {
      let user = userInfo.user;
      let obj = {};
      obj[user] = this.companyList[user];
      this.newCompanyList = obj;
    } else {
      this.newCompanyList = this.companyList;
    }
  },
  methods: {
    goTypeList(companyKey, companyName) {
      window.localStorage.setItem("companyKey", companyKey);
      window.localStorage.setItem("companyName", companyName);
      this.$router.push({
        path: "typeList",
        query: { companyName: companyName }
      });
    }
  }
};
</script>
<style>
.company-list-container {
  padding: 15px 30px;
}
.company-list-container li {
  height: 60px;
  margin-top: 20px;
  line-height: 60px;
  background: #eaf2ff;
  border-radius: 16px;
  font-size: 18px;
  color: #5279bb;
  list-style: none;
}
</style>

