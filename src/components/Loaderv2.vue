<template>
  <div class="flex justify-center items-center fixed w-[calc(100%-19%)] h-full z-50 bg-[#333333]">
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
      <div v-for="i in numberOfRows" :key="i" :class="i % 2 === 0 ? 'px-2' : ''">
        <div :class="i % 2 === 0 ? 'bg-black opacity-50' : 'bg-[#333333] mb-[-5px]'" class="w-full h-[22px]"></div>
      </div>
      <div class="absolute top-0 inset-0 w-full h-full gradient-overlay"></div>
    </div>
    <div class="relative w-full flex flex-col items-center gap-3">
        <div class="font-normal text-blue-300 text-[13px]">Estamos preparando sua lista de tarefas...</div>
        <div class="spinner-border animate-spin inline-block w-10 h-10 border-[2px] rounded-full text-blue-500"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const numberOfRows = computed(() => Math.ceil(window.innerHeight / 0.5))
</script>

<style>
.spinner-border {
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: currentColor;
    position: relative;

  }

  .gradient-overlay {
  background: linear-gradient(90deg, rgba(51, 51, 51, 0) 0%, rgba(51, 51, 51, 0.6) 50%, rgba(51, 51, 51, 0) 100%);
  filter: blur(2px);
  animation: gradient-loop 1.5s linear infinite;
  background-position: 19% 0; 
  width: 100%;
  height: 100%;
}

@keyframes gradient-loop {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
