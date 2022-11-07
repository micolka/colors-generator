<script setup>
import ColorItem from './components/ColorItem.vue'
import { onMounted, ref } from 'vue'
import { getRandomColor } from './utils'

let itemsList = ref(initState());

onMounted(() => {
  document.body.addEventListener('keyup', (e) => {
    if(e.code === 'Space') regenColors();
  });
  updateHash();
})

function initState() {
  let colors = getColorsFromHash();
  
  return new Array(6).fill('').map((_, idx) => {
    return {
      id: idx,
      color: colors[idx] ? `#${colors[idx]}` : getRandomColor(),
      isLocked: false
    };
  });
}

function regenColors() {
  itemsList.value.forEach((item, i, arr) => {
    if(!item.isLocked) arr[i] = {...item, color: getRandomColor()}
  })
  updateHash();
}

function updateHash() {
  let hash = '';
  itemsList.value.forEach(item => hash += `-${item.color.substring(1)}`);
  document.location.hash = hash;
}

function getColorsFromHash() {
  if(document.location.hash) return document.location.hash.split('-').slice(1);

  return [];
}

function toggleLock(color) {
  itemsList.value.forEach((item, i, arr) => {
    if(item.color === color) arr[i] = {...item, isLocked: !item.isLocked};
  });
}
</script>

<template>
    <div class="wrapper">
      <template v-for="item in itemsList" :key="item.id">
        <ColorItem :item="item" @toggle-lock="toggleLock"/>
      </template>
    </div>
</template>

<style scoped>
  .wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
