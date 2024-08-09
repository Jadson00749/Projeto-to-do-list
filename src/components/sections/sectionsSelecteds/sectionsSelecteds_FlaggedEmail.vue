<template>
  <div class="h-full" v-if="displayFlaggedEmail()">
    <div class="w-full h-[13%] px-5 pl-5 py-4" >
      <div class="w-full h-full flex">
        <div class="w-full h-full flex gap-2 justify-start items-center">
          <div class="h-full flex justify-center items-center">
            <FlagIcon class="w-10 h-6 text-red-300 flex opacity-60" />
            <p class="w-[157px] h-[70%] text-red-300 font-semibold opacity-80 text-center assing-to-me-title">Email sinalizado</p>
          </div>
          <button class="h-[70%] flex items-center hover:bg-[#222222] rounded">
            <EllipsisHorizontalIcon class="w-8 h-[60%] text-white opacity-40" />
          </button>
        </div>
        <div class="w-[25%] h-full flex justify-end items-center ">
          <div class="w-[90%] h-[70%] flex pr-2">
            <button class="w-[50%] h-full flex gap-1 justify-center items-center text-red-300 opacity-60 hover:bg-[#333333] rounded-[4px] transition-all duration-150">
              <ArrowsUpDownIcon class="w-5 h-5 text-red-300" />
              <p class="text-sm">Classificar</p>
            </button>
            <button class="w-[50%] h-full flex gap-1 justify-center items-center text-red-300 opacity-60 hover:bg-[#333333] rounded-[4px] transition-all duration-150">
              <Battery0Icon class="w-5 h-5 text-red-300" />
              <p class="text-sm">Grupo</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-[calc(100%-13%)] flex flex-col gap-2 justify-center items-center">
      <div class="w-[12%] h-[27%] flex justify-center items-center relative mb-2">
        <EnvelopeIcon class="w-[90%] h-[90%] text-white opacity-65" />
        <div class="absolute bottom-[105px] left-[115px] bg-[#111111] rounded-[4px]">
          <FlagIcon class="w-7 h-7 text-white opacity-65" />
        </div>
      </div>
      <div class="w-[280px] h-[30px] flex flex-col justify-center items-center">
        <p class="w-[85%] h-full font-semibold text-white text-center opacity-45 assigned-to-me-content">Tarefas de email sinalizado</p>
      </div>
      <p class="font-sm text-white flagged-email-text">As mensagens que voce sinalizará serão mostradas como tarefas aqui.</p>
    </div>
  </div>
</template>

<script setup>
import { FlagIcon, EllipsisHorizontalIcon, ClipboardDocumentCheckIcon, ArrowsUpDownIcon, Battery0Icon, LightBulbIcon, EnvelopeIcon } from '@heroicons/vue/24/solid';
import { toDoListStore } from '@/stores/toDoList.js'
import { ref } from 'vue';

const storeToDoList = toDoListStore()
const displayFlaggedEmail = () => ref(storeToDoList.getdisplayFlaggedEmail)
</script>


<style scoped>

.assing-to-me-title {
  font-size: 21px;
}

.assigned-to-me-content {
  font-size: 19px;
}

.flagged-email-text {
  font-size: 14px;
}
</style>