<template>
  <div class="recompose">
    <!-- 标题 -->
    <div class="tit">
      <el-input class="wenzhang" placeholder="请输入文章标题" id="bba" v-model="input" clearable></el-input>
      <!-- {{goodinfo.title}} -->
    </div>
    <!-- 富文本 -->
    <div id="editorElem" class="edit" ref="editor" style="text-align:left"></div>
    <!-- <Button shape="circle" type="primary" v-on:click="getContent">submit</Button> -->
    <!-- 板块 -->
    <!-- <div class="plate">
      <span>添加板块：</span>
      <el-select  placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>-->
    <!-- 封面图 -->
    <!-- <div class="fengmian">
      <span>文章封面图</span>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :limit="1"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div> -->
    <!-- 发表-->
    <div class="box"></div>
    <div class="publish">
      <div></div>
      <div>
        <el-button class="quick" type="primary">发表</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "recompose",
  data() {
    return {
      editor: "",
      editorContent: "",
      goodinfo: [],
      input: "",
      fuwenben: "lll"
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getContent: function() {
      alert(this.editorContent); //获取富文本内容
    },
    // 获取数据
    getDetail() {
      this.$axios
        .get(
          `http://www.winchains.net/portal.php?mod=newdata&edit_article=1&id=${this.$route.params.id}`
        )
        .then(res => {
          window.console.log(res);
          this.goodinfo = res.data.data;
          this.input = res.data.data.title;
          this.fuwenben = res.data.data.content;
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
    this.editor.txt.html("lll");
  },
  updated() {
    this.editor.txt.html(this.fuwenben);
     window.console.log(this.fuwenben);
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