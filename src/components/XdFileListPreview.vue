<template>
  <div class="xd-file-list__body">
    <div class="xd-file-list__item" v-if="item" v-for="(item,index) in dataList" :key="index">
      <div class="xd-file-list__item-icon">
        <img v-if="item['icon']" :src="item['icon']" alt="icon">
        <div v-else><i class="fileIconfont iconwenjian"></i></div>
      </div>
      <div class="xd-file-list__item-text">
        <div class="xd-file-list__item-text-title" :title="getName(item)">{{getFileName(item)}}</div>
        <div class="xd-file-list__item-text-link" @click="handleClick(item)" :style="`color: ${linkColor}`">点击查看</div>
      </div>
      <i class="fileIconfont iconyduicuowushixin" v-if="showClose" @click.stop="handleRemoveClick(item,index)"></i>
    </div>
  </div>
</template>

<script>
  import helper from "@/components/preview/helper";
  import {iconData} from "@/components/contact";

  export default {
    name: "XdFileListPreview",
    props: {
      list: {
        type: Object | Array,
        default() {
          return []
        }
      },
      showClose: {
        type: Boolean,
        default: false,
      },
      linkColor: {
        type: String,
        default: '#4285F4',
      }
    },

    data() {
      return {
        dataList: [],
      }
    },
    watch: {
      list(val) {
        this.setDataValue(val)
      }
    },

    created() {
      this.setDataValue(this.list);
    },

    methods: {
      setDataValue(val) {
        if (val.length > 0) {
          //未加载过
          let temp = [];
          val.map((item, index) => {

            if (item[status]) {
              temp[index] = item;
            } else {
              helper.getFileBase64(item.url, item.name ? item.name : '')
                .then(res => {
                  res['status'] = true;
                  temp[index] = Object.assign({source: item['url']}, item, res, );
                  console.log(temp[index])
                })
                .catch(res => {
                  temp[index] = {
                    src: iconData.loadicon,
                    status: false,
                    url: item['url'],
                    source: item['url'],
                  }
                });
            }
          });



          let timeer = setInterval(() => {
            if (temp.length === val.length) {
              this.dataList = temp;
              this.$emit('change', this.dataList, 'add');
              clearInterval(timeer);
              console.log('setInterval', temp)
            }
          }, 50);
        }
      },

      getName(item) {
        if (!item.url) return '文件不存在';

        if (item.name) {
          return item.name;
        }
        let arr = item.url.split('/');
        return arr[arr.length - 1];
      },

      getFileName(item) {
        if (!item.url) return '文件不存在';
        if (item.name) {
          return helper.cutStringLen(item.name, 23);
        }
        let arr = item.url.split('/');
        return helper.cutStringLen(arr[arr.length - 1], 23);
      },

      handleClick(item) {
        console.log('handleClick', item);
        this.$preview(item)
      },

      handleRemoveClick(item, index) {
        this.$emit('remove', item, () => {
          this.dataList.splice(index, 1);
          this.$emit('change', this.dataList,'remove');
        });
      }
    }

  }
</script>

<style scoped lang="less">
  @name: xd-file-list;
  .@{name} {
    &__body {
      padding-top: 20px;
      color: #333;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
    }


    &__item {
      position: relative;
      padding: 10px;
      box-sizing: border-box;
      height: 68px;
      background: #f6f7fa;
      border: 1px solid #cacad1;
      border-radius: 5px;
      width: 294px;
      margin: 0 20px 20px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: flex-start;
      text-align: left;
      flex-wrap: nowrap;

      &-icon {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        background: #fff;

        img {
          width: 100%;
          height: 100%;
        }

        div {
          width: 50px;
          height: 50px;
          text-align: center;
          vertical-align: middle;
        }

        i {
          margin-top: 3px;
          font-size: 40px !important;
          width: 100%;
          height: 100%;
          display: inline-block;
        }
      }

      &-text {
        flex: 1;

        &-title {

        }

        &-link {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          color: #4285f4;
          line-height: 20px;
          cursor: pointer;
        }

        &-link:hover {
          text-decoration: underline;
        }
      }

      & i.iconyduicuowushixin {
        cursor: pointer;
        display: none;
        position: absolute;
        top: 2px;
        right: -7px;
        width: 30px;
        height: 30px;
        font-size: 21px;
        color: #999;
      }

      &:hover i.iconyduicuowushixin {
        display: block;
      }
    }
  }

</style>
