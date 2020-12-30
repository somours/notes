<template>
  <div class="card" :class="{ 'rank-card': isRank }" @click="onClick()"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Card",
  props: ["movie", "sort"]
});
</script>

<style scoped></style>
