<template>
  <div class="type-list-container">
    <ul>
      <li @click="goFeedBack('1')">
        <img src="@/assets/images/big.png" alt="大型车" width="27" height="15">
        <span>大型车</span>
      </li>
      <li @click="goFeedBack('2')">
        <img src="@/assets/images/middle.png" alt="中型车" width="27" height="15">
        <span>中型车</span>
      </li>
      <li @click="goFeedBack('3')">
        <img src="@/assets/images/small.png" alt="中型车" width="27" height="15">
        <span>小型车</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "typeList",
  data() {
    return {};
  },
  mounted() {
    document.title = this.$route.query.companyName + "配置车辆";
  },
  methods: {
    goFeedBack(carType) {
      window.localStorage.setItem("carType", carType);
      this.$router.push({ path: "feedbackinfo" });
    }
  }
};
</script>
<style scope>
.type-list-container {
  padding: 15px 30px;
}
.type-list-container li {
  padding: 0 20px;
  height: 60px;
  margin-top: 20px;
  line-height: 60px;
  background: #eaf2ff;
  border-radius: 16px;
  font-size: 18px;
  color: #5279bb;
  list-style: none;
}
.type-list-container li img {
  margin-right: 10px;
  vertical-align: middle;
}
</style>

