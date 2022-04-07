<template>
  <div id="app">
    <h1>列表展示</h1>
    <xd-file-list-preview :show-close="true" :list="list" @remove="handleRemoveClick"></xd-file-list-preview>
    <hr>
    <h1>文件预览模式</h1>
    <a @click="handleClick" style="color: #4285f4">9958ff80d202f91b347b14b5c56f14e811</a>
  </div>
</template>

<script>
  import XdFileListPreview from "@/components/XdFileListPreview";

  export default {
    name: 'app',
    components: {XdFileListPreview},
    data() {
      return {
        list: [
          {
            url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
            name: 'test.pdf',
            fid: 'test.pdf',
            download: false
          },

          {
            url: 'https://jfb-public-images.oss-cn-qingdao.aliyuncs.com/admin-upload/202111081034429231.png?x-oss-process=style/common',
            name: 'test.png',
            fid: 'test.png',
            download: false
          },
          {
            url: 'https://jfb-public-images.oss-cn-qingdao.aliyuncs.com/uploads/20220407/7e11e47b25c1048edb6eb82c2445aa13.pconline.com.cn_images_upload_upc_tx_photoblog_1511_15_c4_15264230_15264230_1447554198988.jpg&refer=http___img.pconline.com.jpeg',
            name: 'test.jpg',
            fid: 'test.jpg',
            download: false
          },

          {
            url: 'http://static.e56buy.com/Xd9EfP1YFgdaYbI6H3RBiG6E3HAF6udj.PlayerAPI_v1.0.6.pdf',
            name: 'Xd9EfP1YFgdaYbI6H3RBiG6E3HAF6udj.pdf',
            fid: 'Xd9EfP1YFgdaYbI6H3RBiG6E3HAF6udj.pdf',
            download: false
          },

          {
            url: 'http://static.e56buy.com/XdgfsqR2INp7uFxTuLQtnMstYLY4K8rr.蛋糕缺少内容.docx',
            name: 'Xd9EfP1YFgdaYbI6H3RBiG6E3HAF6udj.docx',
            fid: 'Xd9EfP1YFgdaYbI6H3RBiG6E3HAF6udj.docx',
            download: false
          },

          {
            url: 'http://static.e56buy.com/XdU9Tmy2x6OGydRUQpWmThRaZKL1gkbd.ceshiyo.xlsx',
            name: 'ka.xlsx',
            fid: 'ka.xlsx',
            download: false
          },

        ]
      }
    },
    created() {
    },
    methods: {
      /**
       * @description 删除图片事件
       * @param item {Object} 当前被删除的文件对象
       * @param done {function} 删除文件完成回调函数
       */
      handleRemoveClick(item, done) {
        setTimeout(() => {
          console.log('handleRemoveClick', item);
          done()
        }, 100);
      },

      /**
       * @description 点击查看预览功能
       */
      handleClick() {
        this.$preview({
          //url: 'http://static.e56buy.com/XdU9Tmy2x6OGydRUQpWmThRaZKL1gkbd.ceshiyo.xlsx', // xlsx
          //url: 'http://static.e56buy.com/XdgfsqR2INp7uFxTuLQtnMstYLY4K8rr.蛋糕缺少内容.docx', //doc,
          url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
          fid: 'aadadads',
          download: false
        })
      },
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
