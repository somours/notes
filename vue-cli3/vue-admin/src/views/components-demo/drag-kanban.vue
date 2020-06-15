<template>
  <div>
    <div class="components-container board">
      <Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="Todo" />
      <Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="Working" />
      <Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="Done" />
    </div>
    <div class="drag-box">
      <div class="drag-item" draggable="true" @dragstart="ondragstart">
        drag
      </div>
      <div class="drop-box" @dragenter="ondragenter" @drop="ondrop" @dragover="ondragover">
        drop
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
      ]
    }
  },
  methods: {
    ondragstart(e) { // 保存拖动元素的引用(ref.)
      // 使其半透明
      e.target.style.opacity = 0.5
      console.log('start', e.dataTransfer)
    },
    ondrop(e) {
      e.target.style.background = ''
      e.target.innerText = '11111'
      console.log('drop', e.dataTransfer)
    },
    ondragenter(e) {
      e.preventDefault()
      if (e.target.className === 'drop-box') {
        e.target.style.background = 'purple'
      }
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
</style>

