<template>
  <div>
    <span @click="handleClick" v-if="column.tableView===tableView.text||column.tableView===tableView.requestText">{{getText(column)}}</span>
    <span @click="handleJumpClick" v-if="column.tableView===tableView.jump" class="JumpClick">{{data[column.key]}}</span>
    <span v-if="column.tableView===tableView.subTitle">{{getSubTitle(column)}}</span>
    <span v-if="column.tableView===tableView.prefixTitle">{{getPrefixTitle(column)}}</span>
    <span v-if="column.tableView===tableView.picture">
      <img
        @click="getView(data[column.key])"
        v-error
        class="login-page"
        :src="picturePath(data[column.key])"
      />
    </span>
    <span @click="handleClick" v-if="column.tableView===tableView.tagState">
      <el-tag :type="column.tagState[String(data[column.key])]">{{getText(column)}}</el-tag>
    </span>
    <span @click="handleClick" v-if="column.tableView===tableView.date">{{mapRecursion(data,column.key), ((column.options&&column.options.format)||'yyyy-MM-dd hh:mm:ss') | parseTimeTwo}}</span>
    <span @click="handleClick" v-if="column.tableView===tableView.colorView||column.tableView===tableView.pointerColorView" :style="getStyle">{{basics.isNull(data[column.key])?((column.options&&column.options.alternate)||'-'):data[column.key]}}</span>
  </div>
</template>

<script>
import { tableItemType, picturePath } from '../../../../../utils/config';
import { mapRecursion } from '@/utils/libs/basicsMethods';
export default {
  name: 'index',
  data () {
    return {
      tableView: tableItemType.tableView,
      picturePath: picturePath,
      mapRecursion: mapRecursion,
      tagState: ''
    };
  },
  props: {
    column: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    getStyle: function () {
      return {
        ...{},
        ...{
          color: this.column.color || '#409EFF',
          cursor:
            this.column.tableView === this.tableView.pointerColorView
              ? 'pointer'
              : 'auto'
        },
        ...(this.column.style || {}),
        ...(this.column.options && this.column.options.style
          ? this.column.options.style(this.data)
          : {})
      };
    }
  },
  methods: {
    getText (column, callback) {
      if (this.basics.isNull(column.list)) return '-';
      const index = this.data[column.key];
      const filter = column.list.filter(item => {
        if (String(item.value) === String(index)) {
          return item;
        }
      });
      if (callback) callback(filter[0]);
      return filter[0] ? filter[0].label : '-';
    },
    getSubTitle (column) {
      const data = this.data[column.key];
      if (this.basics.isNull(data)) return '-';
      return column.options.subTitle + data;
    },
    getPrefixTitle (column) {
      const data = this.data[column.key];
      if (this.basics.isNull(data)) return '-';
      return data + column.options.prefixTitle;
    },
    getView (path) {
      this.$store.commit('disposePictureInfo', picturePath(path));
    },
    handleClick () {
      try {
        if (this.column.options) {
          this.column.options.on.click(this.data, this.column);
        } else {
          this.column.tableOptions.on.click(this.data, this.column);
        }
      } catch (e) {
        console.log(e);
      }
    },
    getOptions () {
      return this.column.options || {};
    },
    async handleJumpClick () {
      if (this.column.options) {
        const data = this.column.options;
        const query = data.query || [];
        let aggieQuery = {};
        if (this.basics.isArray(query)) {
          data.query.filter(item => {
            aggieQuery[item] = data[item] || '';
          });
        } else if (this.basics.isFunction(query)) {
          aggieQuery = await query(this.data);
        }
        this.$router.push({
          name: data.name,
          query: aggieQuery
        });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.test {
  cursor: auto;
}
.login-page {
  cursor: pointer;
  max-width: 50px;
  max-height: 50px;
  &:hover {
    box-shadow: 1px 1px 8px -2px #333333;
  }
}
.JumpClick {
  color: #409eff;
  cursor: pointer;
}
div {
  white-space: nowrap;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
