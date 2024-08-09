<template>
  <div class="h-full" v-if="displayAssignedToMe()">
    <div class="w-full h-[13%] px-5 py-4" >
      <div class="w-full h-full">
        <div class="w-full h-full flex gap-2 justify-start items-center">
          <div class="h-full flex justify-center items-center">
            <UserIcon class="w-10 h-6 text-green-300 flex opacity-60" />
            <p class="w-[157px] h-[70%] text-green-300 font-semibold opacity-70 text-center assing-to-me-title">Atribuído a mim</p>
          </div>
          <button class="h-[70%] flex items-center hover:bg-[#222222] rounded">
            <EllipsisHorizontalIcon class="w-8 h-[60%] text-white opacity-40" />
          </button>
        </div>
      </div>
    </div>
    <div class="w-full h-[calc(100%-13%)] flex flex-col gap-4 justify-center items-center">
      <div class="w-[20%] h-[45%] flex justify-center items-center ">
        <ClipboardDocumentCheckIcon class="w-full h-full text-white opacity-45" />
      </div>
      <div class="w-[380px] h-[55px] flex flex-col justify-center items-center">
        <p class="w-[85%] font-semibold text-white opacity-45 assigned-to-me-content">As tarefas atribuídas a voce no To Do</p>
        <p class=" font-semibold text-white assigned-to-me-content opacity-45">ou no Planner aparecem aqui</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserIcon, EllipsisHorizontalIcon, ClipboardDocumentCheckIcon } from '@heroicons/vue/24/solid';
import { toDoListStore } from '@/stores/toDoList.js'
import { ref } from 'vue';

const storeToDoList = toDoListStore()
const displayAssignedToMe = () => ref(storeToDoList.getdisplayAssignedToMe)
</script>


<style scoped>

.assing-to-me-title {
  font-size: 21px;
}

.assigned-to-me-content {
  font-size: 19px;
}

</style>