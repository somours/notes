<template>
  <!-- todo 可以根据实际业务写一套常用的布局,包括样式,参数等调整好,都通过props修改 -->
  <!-- todo 可增加原组件el-upload的slot属性,不过在render组件里不好使用 -->
  <!--    :show-file-list="false"-->
  <el-upload
    class="avatar-uploader"
    :on-success="handleUploadSuccess"
    :before-upload="handleBeforeUpload"
    :action="action"
    v-bind="$attrs"
  >
    <slot>
      <template v-if="render">
      <!--  todo 可添加一个render写法, 方便在list配置编写, 外部的slot用于直接引用此组件时的编写    -->
      </template>
      <template v-else>
        <img v-if="innerValue" :src="innerValue" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">+</el-icon>
      </template>
    </slot>
  </el-upload>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
export default defineComponent({
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    action: {
      type: String,
      // required: true,
      default: 'https://mastersaas.youxinsign.com:15081/e05-bee-admin/img/upload?msa_platform=E05-BEE-ADMIN-WEB' // 默认的全局的配置地址
    },
    render: {
      type: Function,
    }
    // todo data, onSuccess, onBeforeUpload可以通过props默认值 设置为常用的配置,
  },
  setup (props, ctx) {
    const propsValue = props.value
    let innerValue = computed({
      get () {
        return propsValue
      },
      set (value) {
        ctx.emit('update:value', value)
      }
    })
    // 上传成功操作
    const handleUploadSuccess = (value:any) => {
      innerValue = value
    }
    // 上传之前的判断
    const handleBeforeUpload = () => {
      console.log('enter handleBeforeUpload')
    }
    return {
      innerValue,
      handleUploadSuccess,
      handleBeforeUpload
    }
  }
})
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-uploader-icon svg {
  margin-top: 74px; /* (178px - 28px) / 2 - 1px */
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
