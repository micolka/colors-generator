<script setup>
import { ref, watchEffect } from 'vue'
import { getFontColor } from '../utils'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  }
})
const successMsg = ref('');
const fontColor = ref('');

watchEffect(() => {
  fontColor.value = getFontColor(props.item.color);
})

function copyToClipBoard() {
  navigator.clipboard.writeText(props.item.color)
  successMsg.value = 'Copied!';
  setTimeout(() => {
    successMsg.value = '';
  }, 500);
}
</script>

<template>
  <div class="column" :style="{'background': item.color}">
    <h2 
      :style="{'color': fontColor }" 
      @mouseup="copyToClipBoard"
    >
      {{successMsg ? successMsg : item.color}}
    </h2>
    <button @mouseup="$emit('toggleLock', item.color)">
      <i
       :class="[`fa-solid ${item.isLocked ? 'fa-lock' : 'fa-lock-open'}`]" 
       :style="{'color': fontColor }"
      ></i>
    </button>
  </div>
</template>

<style scoped>
  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 1px solid black;
  }

  .column button {
    background: transparent;
    border: none;
    font-size: 1.5rem;
  }

  .column h2,
  .column button {
    color: inherit;
    padding: 10px;
    border-radius: 10px;
    transition: background 0.3s;
  }

  .column h2:hover,
  .column button:hover {
    background: rgba(0,0 ,0, 0.1);
    cursor: pointer;
  }
</style>
