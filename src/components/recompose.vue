<template>
  <div class="recompose">
    <!-- 标题 -->
    <!-- <form action=""  method="post" id="myForm"> -->
    <div class="tit">
      <el-input class="wenzhang" placeholder="请输入文章标题" v-model="input" clearable></el-input>
      <!-- {{goodinfo.title}} -->
    </div>
    <!-- 富文本 -->
    <div id="editorElem" class="edit" ref="editor" style="text-align:left"></div>
    <!-- 板块 -->
    <div class="plate">
      <span>添加板块：</span>
      <el-select v-model="catid" placeholder="请选择" @change="logs()">
        <el-option
          v-for="item in catArray"
          :key="item.catid"
          :label="item.catname"
          :value="item.catid"
        ></el-option>
      </el-select>
    </div>
    <!-- 封面-->
    <div class="fengmian">
      <span>文章封面图</span>
      <el-upload
        :action="imgUrl"
        list-type="picture-card"
        :on-remove="handleRemove"
        :on-success="succ"
        :limit="1"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
    <!-- 发表-->
    <div class="box"></div>
    <div class="publish">
      <div></div>
      <div>
        <el-button class="quick" type="primary" @click="preve">发表</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import E from "wangeditor";
import qs from "qs";
export default {
  name: "recompose",
  data() {
    return {
      editor: "",
      editorContent: "",
      goodinfo: [],
      input: "",
      fuwenben: "lll",
      dataCanshu: undefined,
      dialogImageUrl: "",
      imgUrl: "http://www.winchains.net/upload.php",
      dialogVisible: false,
      message: "",
      catArray: [],
      catid: ""
    };
  },
  created() {
    this.getDetail();
    this.options();
  },
  methods: {
    logs() {
      window.console.log(this.catid);
    },
    getContent: function() {
      alert(this.editorContent); //获取富文本内容
    },
    // 获取图片地址
    handleRemove(file, fileList) {
      window.console.log(file, fileList);
    },
    succ(response, file) {
      this.dialogImageUrl = file.url;
      window.console.log(this.dialogImageUrl);
    },
    // 获取数据
    getDetail() {
      // 拿到传过来的参数
      let dataCanshu = JSON.parse(localStorage.getItem("canshu"));
      this.dataCanshu = dataCanshu;
      window.console.log(dataCanshu);
      // 图片地址
      let imaged = dataCanshu.url;
      window.console.log(imaged);
      this.$axios
        .get(
          `${dataCanshu.url}/portal.php?mod=newdata&edit_article=1&id=${this.$route.params.id}&type=${dataCanshu.type}`
        )
        .then(res => {
          window.console.log(res);
          this.goodinfo = res.data.data;
          // 标题
          this.input = res.data.data.title;
          // 内容
          if (res.data.data.content=="") {
            this.fuwenben = res.data.data.content_resource;
          }else{
            this.fuwenben = res.data.data.content;
          }
          // 标签
          this.source = res.data.data.source;
          // window.console.log(this.source);
        });
    },
    // 发送
    preve() {
      this.$axios
        .post(
          `${this.dataCanshu.url}/portal.php?mod=newdata&add_article=1`,
          qs.stringify({
            // 标题
            title: this.input,
            // 内容
            content: this.fuwenben,
            // 标签
            source: this.source,
            // 图片
            pic: this.dialogImageUrl,
            // 标签
            catid: this.catid
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then(response => {
          // window.console.log(response);
          let err = response.data.error;
          let errs = response.data.msg;
          if (err < 0) {
            this.$message({
              message: errs,
              center: true,
              duration: 1500,
              offset: 300,
              type: "error"
            });
          } else if (err >= 0) {
            this.$message({
              message: errs,
              center: true,
              duration: 1500,
              offset: 300,
              type: "success"
            });
            setTimeout(() => {
              this.$router.go(-1);
            }, 3000);
          }
        })
        .catch(function(error) {
          window.console.log(error);
        });
    },
    // 分类
    options() {
      let dataCanshu = JSON.parse(localStorage.getItem("canshu"));
      this.dataCanshu = dataCanshu;
      this.$axios
        .get(`${dataCanshu.url}/portal.php?mod=newdata&article_type=1`)
        .then(res => {
          window.console.log(res);
          this.catArray = res.data.data;
          window.console.log(this.catArray);
          // this.catname=res.data.data.catname
          // window.console.log(catname);
        });
    }
  },
  mounted() {
    // var editor = new E('#editorElem')
    this.editor = new E(this.$refs.editor);
    // 上传图片到服务器，Base64形式
    this.editor.customConfig.uploadImgShowBase64 = true; //图片以base64形式保存
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    this.editor.customConfig.pasteTextHandle = content => {
      //支持粘贴
      return content;
    };
    // 创建一个富文本编辑器
    this.editor.create();
    // this.editor.txt.html("lll");
  },
  updated() {
    this.editor.txt.html(this.fuwenben);
    // window.console.log(this.fuwenben);
    // window.console.log(this.dialogImageUrl);
  }
};
</script>
<style lang="scss">
#editorElem /deep/ .w-e-text-container {
  height: 400px !important;
}
.tit {
  margin: 30px 250px;
  .wenzhang {
    font-size: 20px;
    color: black;
  }
}
.edit {
  margin: 0px 250px;
}
.plate {
  margin: 30px 250px;
}
.fengmian {
  margin: 0px 250px;
}
.box {
  margin: 30px 250px;
  border-bottom: 1px solid black;
}
.publish {
  margin: 0px 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>