<template>
  <div class="modal-content-container" :class="storeToDoList.getdisplayMenuLeft ? '!w-full ml-auto' : ''">
    <Loaderv2 v-if="displayLoader" :open="displayLoader" />
    <sectionsSelectedDefault v-if="displayDefault()" />
    <myDays v-if="displayMyDays() && !displayDefault()" :displayIconSun="displayIconSun" />
    <Important v-if="displayImportant()" />
    <Planned v-if="displayPlanned()" />
    <AssignedToMe v-if="displayAssignedToMe()" />
    <FlaggedEmail v-if="displayFlaggedEmail()" />
    <Tasks v-if="displayTasks()" />
    <FirstSteps v-if="displayFirstSteps()" />
    <Shopping v-if="displayShopping()" />
    <UntitledList v-if="displayUntitled()" />
  </div>
</template>

<script setup>
import myDays from '@/components/sections/sectionsSelecteds/sectionsSelecteds_MyDays.vue'
import Important from '@/components/sections/sectionsSelecteds/sectionsSelecteds_Important.vue'
import Planned from '@/components/sections/sectionsSelecteds/sectionsSelecteds_Planned.vue'
import AssignedToMe from '@/components/sections/sectionsSelecteds/sectionsSelecteds_AssignedToMe.vue'
import FlaggedEmail from '@/components/sections/sectionsSelecteds/sectionsSelecteds_FlaggedEmail.vue'
import Tasks from '@/components/sections/sectionsSelecteds/sectionsSelecteds_Tasks.vue'
import FirstSteps from '@/components/sections/sectionsSelecteds/sectionsSelecteds_FirstSteps.vue'
import Shopping from '@/components/sections/sectionsSelecteds/sectionsSelecteds_Shopping.vue'
import UntitledList from '@/components/sections/sectionsSelecteds/sectionsSelecteds_UntitledList.vue'
import sectionsSelectedDefault from '@/components/sections/sectionsSelecteds/sectionsSelectedDefault.vue'
import Loaderv2 from '@/components/Loaderv2.vue'

import { toDoListStore } from '@/stores/toDoList.js'
import {ref,onMounted,computed,watch} from 'vue'
import { useRouter } from "vue-router";

const router = useRouter();

const storeToDoList = toDoListStore();
const displayMyDays = () => storeToDoList.getDisplayMyDays
const displayImportant = () => storeToDoList.getdisplayImportant
const displayPlanned = () => storeToDoList.getdisplayPlanned
const displayAssignedToMe = () => storeToDoList.getdisplayAssignedToMe
const displayFlaggedEmail = () => storeToDoList.getdisplayFlaggedEmail
const displayTasks = () => storeToDoList.getdisplayTasks
const displayFirstSteps = () => storeToDoList.getdisplayFirstSteps
const displayShopping = () => storeToDoList.getdisplayShopping
const displayUntitled = () => storeToDoList.getdisplayUntitled
const displayDefault = () => storeToDoList.getdisplayDefault
const displayLoader = ref(true)

const defineMetaTitle = computed(()=>{
  if(storeToDoList.getDisplayMyDays) return 'Meu dia - To Do'
  return 'Tarefa não encontrada - To Do'
})

// watch(()=>returnStateTabs(),()=>{
//    console.log('Meu dia - To Do')
// })

// function defineMetaTitle(){
//   if(storeToDoList.getDisplayMyDays) return 'Meu dia - To Do'
//   return 'Tarefa não encontrada - To Do' 
// } // depois cntinuar aqui 

router.afterEach((to) => {
  document.title = defineMetaTitle.value
})

onMounted(()=>{
  setTimeout(()=>{
    displayLoader.value = false
  }, 3000)
})

</script>

<style scoped>

.modal-content-container {
  @apply w-[81%];
}

</style>