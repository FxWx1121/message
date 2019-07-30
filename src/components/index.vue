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
          <!-- 盈链快讯 -->
          <el-button
            class="quick"
            type="primary"
            @click="getList('1','http://www.winchains.net'),index=1"
          >盈链快讯</el-button>
          <!-- 盈链大V说 -->
          <el-button type="primary" @click="getList('2','http://www.winchains.net'),index=1">盈链大V说</el-button>
          <!-- 盈链董秘 -->
          <el-button
            class="bigv"
            type="primary"
            @click="getList('3','http://www.winchains.net'),index=2"
          >盈链董秘</el-button>
          <!-- 氢云链政策 -->
          <el-button
            class="notice"
            type="primary"
            @click="getList('4','http://www.qingyunlian.com'),index=1"
          >氢云链政策</el-button>
          <!-- 氢云链新闻 -->
          <el-button
            class="new"
            type="primary"
            @click="getList('5','http://www.qingyunlian.com'),index=1"
          >氢云链新闻</el-button>
          <!-- 氢云链董秘 -->
          <el-button
            class="ask"
            type="primary"
            @click="getList('6','http://www.qingyunlian.com'),index=2"
          >氢云链董秘</el-button>
          <!-- 氢云链公告 -->
          <el-button
            class="ask"
            type="primary"
            @click="getList('7','http://www.qingyunlian.com'),index=1"
          >氢云链公告</el-button>
          <!-- 氢云链快讯 -->
          <el-button
            class="ask"
            type="primary"
            @click="getList('8','http://www.qingyunlian.com'),index=1"
          >氢云链快讯</el-button>
          <!-- 氢云链大V说 -->
          <el-button
            class="ask"
            type="primary"
            @click="getList('9','http://www.qingyunlian.com'),index=1"
          >氢云链大V说</el-button>
        </div>
      </el-header>
      <el-main>
        <div class="center" v-show="index==1">
          <ul>
            <li class="centerlist" v-for="(item,index) in gettp" :key="index">
              <!-- 进入详情页 -->
              <router-link :to="'/detail/'+item.id">
              <!-- <router-link :to="{path:'/detail/'+item.id,params:{'type':type}}"> -->
                <div class="title">{{item.title}}</div>
              </router-link>
              <div class="details" v-html="item.content"></div>
              <div class="mark">
                <span>标签：相关企业</span>
                <span>时间：{{item.addtime}}</span>
                <!--原文页面 -->
                <a :href="item.url" target="_Blank">
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
        <!-- 问董秘 -->
        <div class="dongmi" v-show="index==2">
          <div class="quiz">
            <ul>
              <li v-for="(item,i) in gettp" :key="i">
                <div class="quize">
                  <div class="quiz1">
                    <span>
                      <img src="../assets/image/wen.png" alt />
                    </span>
                    <span>提问</span>
                    <span class="zuozhe">来自:{{item.question_author}}</span>
                  </div>
                  <div class="quiz2">问：{{item.question_content}}</div>
                  <div class="quiz3">{{item.question_update_time}}</div>
                  <div class="xian"></div>
                </div>
                <div class="replay">
                  <div class="replay1">
                    <span>
                      <img src="../assets/image/da.png" alt />
                    </span>
                    <span>回答</span>
                    <span class="zhe">来自: {{item.answer_author}}</span>
                  </div>
                  <div class="replay2">答：{{item.answer_content}}</div>
                  <div class="replay3">{{item.answer_update_time}}</div>
                </div>
              </li>
            </ul>
          </div>
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
      // 地址
      url: "http://www.winchains.net",
      // 索引
      index: 1
    };
  },
  methods: {
    // 快讯
    // loading: true,
    getList(type, url) {
      this.type = type;
      this.gettp = "";
      this.$axios
        .get(
          `${url}/portal.php?mod=newdata&article_list=1&type=${type}&begin_time=${Math.round(
            new Date(this.value1[0]) / 1000
          )}&end_time=${Math.round(new Date(this.value1[1]) / 1000)}`
        )
        .then(res => {
          // window.console.log(res.config.url);
          // window.console.log(autd);
          // let autd=type
          if (res.data.data.length <= 0) {
            this.$message({
              message: "暂无数据",
              center: true,
              duration: 1500,
              offset: 300,
              type: "error"
            });
          } else if (res.data.data.length > 0) {
            this.gettp = res.data.data;
            window.console.log(this.gettp);
          }
        });
        let dataCanshu = {
          type,
          url
        }
        window.localStorage.setItem('canshu',JSON.stringify(dataCanshu));
    }
  },
  created() {
    this.getList("1", "http://www.winchains.net");
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
  // padding: 0 50px !important;
  .quick {
    margin-left: 10px;
  }
  .notice {
    margin-left: 60px !important;
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

.dongmi {
  .quiz {
    background-color: #fff;
    // height: 220px;
    padding: 0px 450px;
    line-height: 35px;
    li {
      padding-bottom: 50px;
    }
    .quize {
      margin: 0 auto;
      .quiz1 {
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: #646464;
        display: flex;
        align-items: center;
        margin-left: 20px;
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-right: 10px;
        }
        .zuozhe {
          margin-left: 300px;
          font-size: 10px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #999999;
        }
      }
      .quiz2 {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #646464;
        margin-left: 20px;
      }
      .quiz3 {
        font-size: 10px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #999999;
        margin-left: 20px;
      }
      .xian {
        // width: 100%;
        height: 1px;
        background-color: #ccc;
      }
    }
    .replay {
      .replay1 {
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: #646464;
        display: flex;
        align-items: center;
        margin-left: 20px;
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-right: 10px;
        }
        .zhe {
          margin-left: 300px;
          font-size: 10px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #999999;
        }
      }
      .replay2 {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #646464;
        margin-left: 20px;
      }
      .replay3 {
        font-size: 10px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #999999;
        margin-left: 20px;
      }
    }
  }
}
</style>
