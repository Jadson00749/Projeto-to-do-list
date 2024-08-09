<template>
  <div class="menu-left-container overflow-hidden" v-if="!storeToDoList.getdisplayMenuLeft">
    <div class="w-full h-[calc(100%-50px)] flex flex-col">
      <div class="flex items-center h-14 mt-4">
        <button @click="displayMenuLeft(true)" class="ml-6 text-white"><Bars3Icon class="w-5 h-5" /></button>
      </div>
      <div class="w-full h-full cursor-pointer">
        <ul class="list-items">
          <li @click="displayMyDays()" class="h-11 flex items-center gap-4" :class="tab === 1 && !displayListTask() ? 'bg-[#444444] font-semibold' : 'hover:bg-[#333333] transition-all duration-300'" >
            <SunIcon class="w-5 h-5 text-white ml-6" />
            <label class="menu-left-btn font-sm text-white cursor-pointer">Meu Dia</label>
          </li>
          <li @click="displayImportant()" class="h-11 flex items-center gap-4" :class="tab === 2 ? 'bg-[#444444] font-semibold' : 'hover:bg-[#333333] transition-all duration-300'">
            <StarIcon class="w-[18px] h-[18px] text-white ml-6 icons-component" />
            <label class="menu-left-btn flex justify-between pr-3 font-sm text-white cursor-pointer">Importante
              <h1 class="text-white">1</h1>
            </label>
          </li>
          <li @click="displayPlanned()" class="h-11 flex items-center gap-4" :class="tab === 3 ? 'bg-[#444444] font-semibold' : 'hover:bg-[#333333] transition-all duration-300'">
            <CalendarDaysIcon class="w-5 h-5 text-white ml-6" />
            <label class="menu-left-btn flex justify-between pr-3 font-sm text-white cursor-pointer">Planejado
              <h1 class="text-white">5</h1>
            </label>
          </li>
          <li @click="displayAssignedToMe()" class="h-11 flex items-center gap-4" :class="tab === 4 ? 'bg-[#444444] font-semibold' : 'hover:bg-[#333333] transition-all duration-300'">
            <UserIcon class="w-5 h-5 text-white ml-6 icons-component" />
            <label class="menu-left-btn flex justify-between pr-3 font-sm text-white cursor-pointer">Atribuído a mim
              <h1 class="text-white">2</h1>
            </label>
          </li>
          <li @click="displayFlaggedEmail()" class="h-11 flex items-center gap-4" :class="tab === 5 ? 'bg-[#444444] font-semibold' : 'hover:bg-[#333333] transition-all duration-300'">
            <FlagIcon class="w-5 h-5 text-white ml-6 icons-component" />
            <label class="menu-left-btn flex justify-between pr-3 font-sm text-white cursor-pointer">Email sinalizado
              <h1 class="text-white">1</h1>
            </label>
          </li>
          <li @click="displayTasks()" class="h-11 flex items-center gap-4" :class="tab === 6 ? 'bg-[#444444] font-semibold' : 'hover:bg-[#333333] transition-all duration-300'">
            <HomeIcon class="w-5 h-5 text-white ml-6 icons-component" />
            <label class="menu-left-btn flex justify-between pr-3 font-sm text-white cursor-pointer">Tarefas
              <h1 class="text-white">4</h1>
            </label>
          </li>
        </ul>
        <div class="w-full h-5 flex justify-center items-center px-4">
          <hr class="border-1 border-white opacity-15 w-full">
        </div>
        <ul>
          <li @click="displayFirstSteps()" class="h-11 flex items-center gap-4" :class="tab === 7 ? 'bg-[#444444] font-semibold' : 'hover:bg-[#333333] transition-all duration-300'">
            <RocketLaunchIcon class="w-5 h-5 text-white ml-6 icons-component" />
            <label class="menu-left-btn flex justify-between pr-3 font-sm text-white cursor-pointer">Primeiro passos
              <h1 class="text-white">7</h1>
            </label>
          </li>
          <li @click="displayShopping()" class="h-11 flex items-center gap-4" :class="tab === 8 ? 'bg-[#444444] font-semibold' : 'hover:bg-[#333333] transition-all duration-300'">
            <ShoppingCartIcon class="w-5 h-5 text-white ml-6 transform scale-x-[-1] icons-component" />
            <label class="menu-left-btn flex justify-between pr-3 font-sm text-white cursor-pointer">Compras
              <h1 class="text-white">3</h1>
            </label>
          </li>
          <li v-if="displayListTask()" @click="displayUntitledList()" class="h-11 flex items-center gap-4" :class="tab === 9 || hoverActive ? 'bg-[#444444] font-semibold' : 'hover:bg-[#333333] transition-all duration-300'">
            <Bars3Icon class="w-5 h-5 text-white ml-6 icons-component" />
            <label class="menu-left-btn flex justify-between pr-3 font-sm text-white cursor-pointer">Lista sem título
              <h1 class="text-white">1</h1>
            </label>
          </li>
          <li class="h-11 flex items-center gap-4 hover:bg-[#444444] transition-all duration-300">
            <div class="h-full w-[76%] flex gap-4 items-center">
              <PlusIcon class="w-5 h-5 text-blue-400 ml-6 transform scale-x-[-1]" />
              <label class="menu-left-btn font-sm text-blue-300 cursor-pointer">Nova lista</label>
            </div>
            <div class="w-[10%] relative flex justify-center items-center z-0">
              <Battery50Icon class="w-5 h-5 text-blue-400" />
            </div>
            <!-- <PlusCircleIcon class="w-3 h-3 text-blue-400 absolute left-[253px] top-[550px] z-1" /> -->
          </li>
          </ul>
          </div>
    </div>
    <div class="h-[50px] flex">
      <button class="w-[20%] h-full flex justify-center items-center"><EnvelopeIcon class="w-5 h-5 text-white" /></button>
      <button class="w-[20%] h-full flex justify-center items-center"><CalendarDaysIcon class="w-5 h-5 text-white" /></button>
      <button class="w-[20%] h-full flex justify-center items-center"><UsersIcon class="w-5 h-5 text-white" /></button>
      <button class="w-[20%] h-full flex justify-center items-center"><PaperClipIcon class="w-5 h-5 text-white" /></button>
      <button class="w-[20%] h-full flex justify-center items-center"><CheckIcon class="w-5 h-5 text-blue-300" /></button>
    </div>
  </div>
</template>

<script setup>

import { Bars3Icon, SunIcon, StarIcon, CalendarDaysIcon, UserIcon, FlagIcon, HomeIcon, RocketLaunchIcon, ShoppingCartIcon, PlusIcon, Battery50Icon, PlusCircleIcon, EnvelopeIcon, UsersIcon, PaperClipIcon, CheckIcon } from '@heroicons/vue/24/solid'
import { ref, watch, onMounted } from 'vue';
import { toDoListStore } from '@/stores/toDoList.js'

const emit = defineEmits(['myDays','displayIconSun'])

const storeToDoList = toDoListStore()
const displayListTask = () => storeToDoList.getListTaskDisplay
const setLoading = (val) => storeToDoList.setLoading(val)
const tab = ref(0)
const hoverActive = ref(false)

watch(()=>tab.value,()=>{
  if(tab.value !== 9) {
    hoverActive.value = false
  }
})

watch(()=>displayListTask(),(val)=>{
  if(val) {
    hoverActive.value = true
  }
})

const displayMyDays = () => {
  setLoading(true)
  storeToDoList.setdisplayDefault(false)
  storeToDoList.setdisplayUntitled(false)
  storeToDoList.setdisplayShopping(false)
  storeToDoList.setdisplayFirstSteps(false)
  storeToDoList.setdisplayTasks(false)
  storeToDoList.setdisplayAssignedToMe(false)
  storeToDoList.setdisplayImportant(false)
  storeToDoList.setdisplayPlanned(false)
  storeToDoList.setdisplayFlaggedEmail(false)
  storeToDoList.setDisplayMyDays(true)
  tab.value = 1
  setTimeout(()=>{
    setLoading(false)
  }, 900)
}
const displayImportant = () => {
  storeToDoList.setdisplayDefault(false)
  storeToDoList.setdisplayUntitled(false)
  storeToDoList.setdisplayShopping(false)
  storeToDoList.setdisplayFirstSteps(false)
  storeToDoList.setdisplayTasks(false)
  storeToDoList.setdisplayAssignedToMe(false)
  storeToDoList.setDisplayMyDays(false)
  storeToDoList.setdisplayPlanned(false)
  storeToDoList.setdisplayFlaggedEmail(false)
  storeToDoList.setdisplayImportant(true)
  tab.value = 2
}
const displayPlanned = () => {
  storeToDoList.setdisplayDefault(false)
  storeToDoList.setdisplayUntitled(false)
  storeToDoList.setdisplayShopping(false)
  storeToDoList.setdisplayFirstSteps(false)
  storeToDoList.setdisplayTasks(false)
  storeToDoList.setdisplayAssignedToMe(false)
  storeToDoList.setDisplayMyDays(false)
  storeToDoList.setdisplayImportant(false)
  storeToDoList.setdisplayFlaggedEmail(false)
  storeToDoList.setdisplayPlanned(true)
  tab.value = 3
}
const displayAssignedToMe = () => {
  storeToDoList.setdisplayDefault(false)
  storeToDoList.setdisplayUntitled(false)
  storeToDoList.setdisplayShopping(false)
  storeToDoList.setdisplayFirstSteps(false)
  storeToDoList.setdisplayTasks(false)
  storeToDoList.setDisplayMyDays(false)
  storeToDoList.setdisplayImportant(false)
  storeToDoList.setdisplayPlanned(false)
  storeToDoList.setdisplayFlaggedEmail(false)
  storeToDoList.setdisplayAssignedToMe(true)
  tab.value = 4
}
const displayFlaggedEmail = () => {
  storeToDoList.setdisplayDefault(false)
  storeToDoList.setdisplayUntitled(false)
  storeToDoList.setdisplayShopping(false)
  storeToDoList.setdisplayFirstSteps(false)
  storeToDoList.setdisplayTasks(false)
  storeToDoList.setdisplayAssignedToMe(false)
  storeToDoList.setDisplayMyDays(false)
  storeToDoList.setdisplayImportant(false)
  storeToDoList.setdisplayPlanned(false)
  storeToDoList.setdisplayFlaggedEmail(true)
  tab.value = 5
}
const displayTasks = () => {
  storeToDoList.setdisplayDefault(false)
  storeToDoList.setdisplayUntitled(false)
  storeToDoList.setdisplayShopping(false)
  storeToDoList.setdisplayFirstSteps(false)
  storeToDoList.setdisplayAssignedToMe(false)
  storeToDoList.setDisplayMyDays(false)
  storeToDoList.setdisplayImportant(false)
  storeToDoList.setdisplayPlanned(false)
  storeToDoList.setdisplayFlaggedEmail(false)
  storeToDoList.setdisplayTasks(true)
  tab.value = 6
}
const displayFirstSteps = () => {
  storeToDoList.setdisplayDefault(false)
  storeToDoList.setdisplayUntitled(false)
  storeToDoList.setdisplayShopping(false)
  storeToDoList.setdisplayAssignedToMe(false)
  storeToDoList.setDisplayMyDays(false)
  storeToDoList.setdisplayImportant(false)
  storeToDoList.setdisplayPlanned(false)
  storeToDoList.setdisplayFlaggedEmail(false)
  storeToDoList.setdisplayTasks(false)
  storeToDoList.setdisplayFirstSteps(true)
  tab.value = 7
}
const displayShopping = () => {
  storeToDoList.setdisplayDefault(false)
  storeToDoList.setdisplayUntitled(false)
  storeToDoList.setdisplayAssignedToMe(false)
  storeToDoList.setDisplayMyDays(false)
  storeToDoList.setdisplayImportant(false)
  storeToDoList.setdisplayPlanned(false)
  storeToDoList.setdisplayFlaggedEmail(false)
  storeToDoList.setdisplayTasks(false)
  storeToDoList.setdisplayFirstSteps(false)
  storeToDoList.setdisplayShopping(true)
  tab.value = 8
}
const displayUntitledList = () => {
  storeToDoList.setdisplayDefault(false)
  storeToDoList.setdisplayAssignedToMe(false)
  storeToDoList.setDisplayMyDays(false)
  storeToDoList.setdisplayImportant(false)
  storeToDoList.setdisplayPlanned(false)
  storeToDoList.setdisplayFlaggedEmail(false)
  storeToDoList.setdisplayTasks(false)
  storeToDoList.setdisplayFirstSteps(false)
  storeToDoList.setdisplayShopping(false)
  storeToDoList.setdisplayUntitled(true)
  tab.value = 9
}

const displayMenuLeft = (val) => storeToDoList.setdisplayMenuLeft(val)


</script>

<style scoped>

.menu-left-container {
  @apply w-[19%] bg-[#222222];
}

.menu-left-btn {
  font-size: 14px;
  width: 75%;
}

.icons-component  {
  @apply stroke-white stroke-[1.5px] fill-none text-[#333333];
}

/* .animate-border {
  transition: height 0.3s ease;
  height: 0; 
}

.animate-border.active {
  height: 100%;
} */

.list-items li {
  position: relative;
}

.list-items li::after {
  @apply w-[2px] h-0 bg-blue-500 absolute top-0 left-0;
  content: " ";
  transition: 0.5s ease-in-out;
}

.list-items li:hover::after{
  height: 100%;
}


</style>