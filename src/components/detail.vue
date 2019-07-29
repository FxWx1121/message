<template>
  <div class="detail">
    <!-- 标题 -->
    <div class="title">{{goodinfo.title}}</div>
    <div class="record">
      <span></span>
      <span>标签：产业资讯</span>
      <a :href="goodinfo.url">
        <span style="color:#4ea2f5">原文链接</span>
      </a>
      <!-- <a  href="javascript:history.back(-1)"> -->
      <span>
        <el-button type="primary" @click="backed">返回</el-button>
      </span>
      <!-- </a> -->
    </div>
    <!-- 内容 -->
    <div class="center" v-html="goodinfo.content"></div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      goodinfo: []
    };
  },
  created() {
    this.gotDetail();
  },
  methods: {
    // 获取数据
    gotDetail() {
      this.$axios
        .get(
          `http://www.winchains.net/portal.php?mod=newdata&edit_article=1&id=${this.$route.params.id}`
        )
        .then(res => {
          window.console.log(res);
          this.goodinfo = res.data.data;
        });
    },
    backed() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.detail {
  margin: 20px 150px;

  .title {
    font-size: 20px;
    color: #555555;
    font-weight: 400;
  }
  .record {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #999999;
  }
  .center {
    margin-top: 20px;
  }
}
</style>
