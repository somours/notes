<template>
  <div>
    <div class="components-container board">
      <Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="Todo" />
      <Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="Working" />
      <Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="Done" />
    </div>
    <div class="drag-box">
      <!--<div class="drag-item" draggable="true" @dragstart="ondragstart" @dragend="ondragend">
        drag
      </div>
      <div class="drop-box" @dragenter="ondragenter" @drop="ondrop" @dragover="ondragover">
        drop
      </div>-->
    </div>
    <div class="drag-lists">
      <div
        v-for="(item,index) in dragList"
        :key="item.text"
        draggable="true"
        class="drag-list"
        @dragstart="(e) => ondragstart(e,index)"
        @dragenter="ondragenter"
        @drop="e => ondrop(e, index)"
        @dragover="ondragover"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>
<script>
import Kanban from '@/components/Kanban'

export default {
  name: 'DragKanbanDemo',
  components: {
    Kanban
  },
  data() {
    return {
      group: 'mission',
      list1: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
        { name: 'Mission', id: 4 }
      ],
      list2: [
        { name: 'Mission', id: 5 },
        { name: 'Mission', id: 6 },
        { name: 'Mission', id: 7 }
      ],
      list3: [
        { name: 'Mission', id: 8 },
        { name: 'Mission', id: 9 },
        { name: 'Mission', id: 10 }
      ],
      dragDom: null,
      dragList: [
        { text: 11 },
        { text: 22 },
        { text: 33 },
        { text: 44 }
      ]
    }
  },
  methods: {
    ondragstart(e, index) { // 保存拖动元素的引用(ref.)
      // 使其半透明
      e.target.style.opacity = 0.5
      this.dragDom = e.target
      e.dataTransfer.setData('Text', index)
      console.log('start', e.dataTransfer)
    },
    ondragend(e) {
      console.log('end', e)
      // e.target.style.display = 'none'
    },
    ondrop(e, index) {
      // e.target.style.background = ''
      // e.target.appendChild(this.dragDom)
      // console.log('setData', e.dataTransfer.getData('Text'))
      // console.log('drop', e.dataTransfer)
      console.log('drop', index)
      const startIndex = e.dataTransfer.getData('Text')
      this.dragList.splice(index, 0, this.dragList.splice(startIndex, 1)[0])
      console.log(this.dragList)
    },
    ondragenter(e) {
      e.preventDefault()
      // if (e.target.className === 'drop-box') {
      //   e.target.style.background = 'purple'
      // }
      e.target.style.background = 'pink'
      console.log('enter', e)
    },
    ondragover(e) {
      e.preventDefault()
    }
  }
}
</script>
<style lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
  .drag-box {
    border: 1px solid #CCCCCC;
    margin: 10px auto;
    width: 500px;
    height: 300px;
    .drag-item {
      width: 100px;
      height: 30px;
      border-radius: 2px;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .drop-box {
      width: 100px;
      height: 100px;
      border: 1px solid #f00;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .drag-lists {
    width: 300px;
    height: 300px;
    margin: 20px auto;
    .drag-list  {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #cc9a9a;
      margin-bottom: 20px;
    }
  }
</style>

