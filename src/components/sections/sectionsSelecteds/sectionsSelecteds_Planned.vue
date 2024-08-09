
<template>
  <div class="h-full" v-if="displayPlanned()">
    <div class="w-full h-[12%] px-6 py-4">
      <div class="h-full flex items-center">
        <div class="h-[80%] w-[98%] flex flex-col" :class="storeToDoList.getdisplayMenuLeft ? '!w-full ml-auto' : ''">
          <div class="h-full flex items-center gap-2 pl-2">
            <button><CalendarIcon class="w-[23px] h-[60%] color-btn-classific" v-if="!storeToDoList.getdisplayMenuLeft" /></button>
            <button @click="displayMenuLeft(false)"><Bars3Icon class="w-5 h-[60%] text-white ml-[-10px]" v-if="storeToDoList.getdisplayMenuLeft" /></button>
            <span class="color-btn-classific font-semibold important-font-title">Planejado</span>
            <div class=" h-full">
              <button class="h-full flex items-center hover:bg-[#222222] rounded">
                <EllipsisHorizontalIcon class="w-8 h-[80%] text-white opacity-40" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-[15%] px-6">
      <div class="w-full h-full bg-[#222222] rounded-md">
        <div class="w-full h-[55%] flex items-center border-b border-white border-opacity-30">
          <div class="w-4 h-4 rounded-full border-[1px] ml-6 border-blue-300"></div>
          <input 
          placeholder="Adicionar uma tarefa"
          @click="placeHolderActive = false"
          @blur="placeHolderActive = true"
          @input="inputValueTask"
          :class="placeHolderActive ? 'placeholder-active' : 'placeholder-desactive'"
          class="w-[95%] h-[72%] text-white rounded-s-sm bg-[#222222] pl-5 border-transparent focus:outline-none" 
          >
        </div>
        <div class="w-full h-[45%] flex items-center justify-between">
          <div class="w-[100px] h-[65%] flex ml-5">
            <button class="w-[33%] h-full flex justify-center items-center rounded-md cursor-default hover:bg-[#2c2c2c]"><CalendarIcon class="w-5 h-5 text-white opacity-50" /></button>
            <button class="w-[33%] h-full flex justify-center items-center rounded-md cursor-default hover:bg-[#2c2c2c]"><BellIcon class="w-5 h-5 text-white opacity-50" /></button>
            <button class="w-[33%] h-full flex justify-center items-center rounded-md cursor-default hover:bg-[#2c2c2c]"><ArrowPathRoundedSquareIcon class="w-5 h-5 text-white opacity-50" /></button>
          </div>
          <div class="w-[70px] h-[70%] mr-5 border border-white border-opacity-30">
            <button :class="enableAddition != '' ? 'color-add-task' : 'text-white opacity-60 cursor-not-allowed'" class="w-full h-full section-selected-add-task text-white font-semibold"
            >Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EllipsisHorizontalIcon, CalendarIcon, BellIcon, ArrowPathRoundedSquareIcon, Bars3Icon, StarIcon } from '@heroicons/vue/24/solid'
import {ref, onMounted, watch} from 'vue';
import { toDoListStore } from '@/stores/toDoList.js'

const placeHolderActive = ref(true)
const enableAddition = ref('')
const storeToDoList = toDoListStore()
const displayPlanned = () => ref(storeToDoList.getdisplayPlanned)
const displayMenuLeft = (val) => storeToDoList.setdisplayMenuLeft(val)
// const displaySunIcon = ref(storeToDoList.getdisplayMenuLeft)


const inputValueTask = (event) => {
  enableAddition.value = event.target.value
}

</script>

<style scoped>

.new-date-label {
  font-size: 11px;
}

.section-selected-add-task {
  font-size: 12px;
}

.placeholder-active::placeholder {
  color: rgb(147, 184, 253);
  font-size: 14px;
}

.placeholder-desactive::placeholder {
  color: white;
  font-size: 14px;
}

.color-add-task {
  color: rgb(147, 170, 253);
}

.color-btn-classific{
  color: rgb(147, 184, 253);
}

.important-font-title{
  font-size: 20px;
}

.important-font-p{
  font-size: 12px;
}
</style>