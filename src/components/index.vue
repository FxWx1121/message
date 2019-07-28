<template>
  <div class="first">
    <el-container>
      <el-header>
        <!-- 日期时间 -->
        <div class="time" style="padding: 0 0px;">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            unlink-panels
          ></el-date-picker>
          <!-- 按钮 -->
          <el-button class="quick" type="primary" @click="updateType('1','http://www.winchains.net')" icon="el-icon-search">快讯</el-button>
          <el-button class="bigv" type="primary" icon="el-icon-search">大V说</el-button>
          <el-button
            class="notice"
            type="primary"
            icon="el-icon-search"
            @click="updateType('5')"
          >搜公告</el-button>
          <el-button class="new" type="primary" icon="el-icon-search" @click="updateType('4','http://www.qingyunlian.com')">搜新闻</el-button>
          <el-button
            class="policy"
            type="primary"
            icon="el-icon-search"
            @click="updateType('3','http://www.winchains.net')"
          >搜政策</el-button>
          <el-button class="ask" type="primary" icon="el-icon-search">问董秘</el-button>
        </div>
      </el-header>
      <el-main>
        <div class="center">
          <ul>
            <li class="centerlist" v-for="(item,index) in gettp" :key="index">
              <!-- 进入详情页 -->
              <router-link :to="'/detail/'+item.id">
                <div class="title">{{item.title}}</div>
              </router-link>
              <div class="details" v-html="item.content"></div>
              <div class="mark">
                <span>标签：相关企业</span>
                <span>时间：{{item.addtime}}</span>
                <!--原文页面 -->
                <a :href="item.url">
                  <span style="color:#4ea2f5">原文链接</span>
                </a>
                <span>来源：{{item.source}}</span>
                <!-- 修改页面 -->
                <router-link :to="'/recompose/'+item.id">
                  <span>修改</span>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
//导入axios
// import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      // 时间
      value1: [
        new Date(new Date().toLocaleDateString()).getTime(),
        new Date(new Date().toLocaleDateString()).getTime() +
          (24 * 60 * 60 * 1000 - 1)
      ],
      gettp: [],
      type: "1",
      url:'http://www.winchains.net'
    };
  },
  methods: {
    // 快讯&Math.round(new Date(this.value1[0]) / 1000)
    getList() {
      this.$axios
        .get(
          `${this.url}/portal.php?mod=newdata&article_list=1&type=${
            this.type
          }&begin_time=${Math.round(
            new Date(this.value1[0]) / 1000
          )}&end_time=${Math.round(new Date(this.value1[1]) / 1000)}`
        )
        .then(res => {
          window.console.log(res);
          this.gettp = res.data.data;
        });
    },
    updateType(value1,value2) {
      this.type = value1;
      this.url = value2;
      this.getList();
      window.console.log(this.url);
      
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style lang="scss">
.first {
  height: 100%;
}
.el-header,
.el-footer {
  color: #333;
  line-height: 80px;
  height: 80px !important;
  // padding: 0 200px !important;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // padding: 0px 200px !important;
}

.el-container {
  height: 100%;
}
.time {
  padding: 0 50px !important;
  .quick {
    margin-left: 100px;
  }
  .notice {
    margin-left: 10px !important;
  }
  .policy {
    margin-left: 10px !important;
  }
  .new {
    margin: 0 0 0 10px !important;
  }
}
.center {
  .centerlist {
    height: 160px;
    background-color: white;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(100, 100, 100, 1);
      padding: 15px;
    }
    .details {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(100, 100, 100, 1);
      padding: 0px 15px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .mark {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 15px;
      span {
        font-size: 10px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
</style>
