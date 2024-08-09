
<template>
  <div class="h-full flex justify-end relative overflow-hidden" v-if="displayMyDays()">
    <div class="w-full">
      <commonHeader @orderList="orderList" :orderListAction="displayList" :isOpenModalLarge="isOpenModalLarge" />
      <tableMyDays @getList="updateForce = !updateForce" :isOpenModalLarge="isOpenModalLarge" />
        <div class=" h-[calc(100%-31%)] px-6 pt-1 overflow-auto z-auto" :class="isOpenModalLarge ? 'w-[calc(100%-30%)]' : 'w-full'" >
          <transition name="slide">
              <div v-if="listTask !== null && !loading()" class="mb-6">
                  <div v-for="(ent,index) in listTask" :key="index">
                    <div class="w-full h-full pt-2 flex flex-col" >
                      <button @contextmenu.prevent="openModalOptions($event,index,ent,'notCompleted')" @click="selectedItem(ent,index)" :class="buttons === index ? 'bg-[#333333]' : ''" class="w-full min-h-[52px] text-white rounded-[4px] bg-[#222222] pl-5 flex justify-start items-center hover:bg-[#333333] transition-all duration-300 py-2">
                          <div @mouseover="checkButtons = index" @mouseout="checkButtons = !index" class="w-7 h-7 flex justify-center items-center">
                            <div @click="tasksCompleted(index,ent)" class="w-[60%] h-[60%] rounded-full border border-blue-300 flex justify-center items-center">
                              <CheckIcon v-show="checkButtons === index" class="w-[10px] h-[10px] text-blue-300" />
                            </div>
                          </div>
                          <div class="flex flex-col break-words" :class="isOpenModalLarge ? 'w-[91%]' : 'w-[93%]'">
                            <span class="text-start text-sm ml-4 pr-8">{{ ent?.nameTask }}</span>
                            <div class="text-start flex">
                              <span class="text-sm text-[11.9px] opacity-45 ml-4">Tarefas</span>
                              <div v-if="listTask[index].concluded" class="w-[14px] flex justify-center items-center">
                                <div class="w-[30%] h-[20%] ml-[5px] rounded-full bg-[#888888]"></div></div>
                                <div v-if="listTask[index].concluded || listTask[index].concludedToday" class="w-[90px] flex items-center gap-1 ml-2">
                                  <CalendarDaysIcon class="w-4 h-4" :class="listTask[index].concludedToday ? 'text-gray-200' : 'text-blue-300'" />
                                  <p class="text-sm text-[11px]" :class="listTask[index].concludedToday ? 'text-white' : 'text-blue-300'">
                                    {{ listTask[index].concludedToday ? 'Amanhã' : 'Hoje' }}
                                  </p>
                                </div>
                            </div>
                          </div>
                          <div v-tippy="{ content: 'Marque a tarefa como importante', placement: 'top', delay: [300, 0], theme: 'light' }" @click.stop="selectedStarItem(index,ent)" class="w-5 h-5 flex justify-center items-center star-icon">
                            <StarIcon class="w-5 h-5 rounded-full" :class="starActive.includes(ent) ? 'text-blue-300' : ''" />
                          </div>
                        </button>
                      </div>
                  </div>
                </div>
          </transition>
          <div v-if="listTaskCompleted && !loading()" class="w-full h-[17%]">
            <div @click="displayCompleted = !displayCompleted" class="w-full h-[70%] flex justify-start items-center cursor-pointer">
              <button v-if="!displayCompleted" class="w-7 h-[60%] flex justify-center items-center"><ChevronRightIcon class="w-4 h-4 text-white opacity-50" /></button>
              <button v-if="displayCompleted" class="w-7 h-[60%] flex justify-center items-center"><ChevronDownIcon class="w-4 h-4 text-white opacity-50" /></button>
              <button class="h-[64%] flex gap-3 justify-center items-center p-4">
                <p class="font-semibold text-[14px] text-white">Concluída</p>
                <p class="text-white font-sm text-[14px] opacity-45">{{ listTaskCompleted.length }}</p>
              </button>
            </div>
            <div v-if="listTaskCompleted && displayCompleted" class="w-full h-full flex flex-col gap-2 mb-8 pb-3">
              <div v-for="(ent,index) in listTaskCompleted" :key="index.id">
                <button @contextmenu.prevent="openModalOptions($event,index,ent,'completed')" @click="selectedItemCompleted(index)" :class="buttonsCompleted === index ? 'bg-[#333333]' : ''" class="w-full h-[54px] text-white rounded-[4px] bg-[#222222] pl-5 flex justify-start items-center hover:bg-[#333333] transition-all duration-300">
                    <div @mouseover="checkButtons = index" @mouseout="checkButtons = !index" class="w-7 h-7 flex justify-center items-center">
                      <div @click="markOfTask(ent,index)" class="w-[60%] h-[60%] rounded-full border border-blue-300 flex justify-center items-center bg-blue-400">
                        <CheckIcon class="w-[10px] h-[10px] text-black font-semibold" />
                      </div>
                    </div>
                  <div class="flex flex-col w-[93%]">
                    <span class="text-start text-sm ml-4 line-through">{{ ent?.nameTask }}</span>
                    <span class="text-start text-sm text-[11.9px] opacity-45 ml-4">Tarefas</span>
                  </div>
                  <div @click.stop="selectedStarItemCompleted(index,ent)" class="w-5 h-5 flex justify-center items-center star-icon">
                    <StarIcon class="w-5 h-5 rounded-full" :class="starActiveCompleted.includes(ent) ? 'text-blue-300' : ''" />
                  </div>
                </button>
              </div>
              <!-- <div class="h-[60%] w-full border"></div> -->
            </div>
            <div class="w-full flex justify-center" v-show="!displayCompleted"><div class="w-[97%] border-b border-white opacity-30"></div></div>
          </div>
          <modalOptions v-if="openModalOptionsSelected" :open="openModalOptionsSelected" @close="openModalOptionsSelected = $event" :modalTop="modalTop" :modalLeft="modalLeft" :modalRight="modalRight" :modalBottom="modalBottom" :statusActive="objSelected.important" @importantChecked="selectedStarItemDetails()" @removeDay="removeDay" @markCompleted="markCompleted($event)" :statusImportant="objSelected.completed" @completedToday="completedToday($event)" :todayConcluded="objSelected.concluded || objSelected.concludedToday" @removeTask="openDelete = true" @createListTask="createListTask()" />
          <modalConfirmDelete v-if="openDelete" :isOpen="openDelete" @close="openDelete = $event" @closeOptions="openModalOptionsSelected = !openModalOptionsSelected" :nameTask="objSelected.nameTask" @deleteTask="deleteTask" />
        </div>
    </div>
    <modalDetailsLarge v-if="isOpenModalLarge" :isOpen="isOpenModalLarge" @closeDetails="isOpenModalLarge = $event" :nameTaskSelected="objSelected.nameTask" :indexSelected="buttons" />
    <!-- <Loaderv2 /> -->
  </div>
</template>

<script setup>
import modalOptions from '@/components/modal/modalOptions.vue'
import modalDetailsLarge from '@/components/sections/modal/content/modalDetailsLarge.vue'
import Loaderv2 from '@/components/Loaderv2.vue'
import { StarIcon, CheckIcon, ChevronRightIcon, ChevronDownIcon, CalendarDaysIcon } from '@heroicons/vue/24/solid'
import {ref, onMounted, watch,computed, onBeforeMount} from 'vue';
import { toDoListStore } from '@/stores/toDoList.js'
import commonHeader from '@/components/sections/commonHeaders/commonHeader.vue'
import tableMyDays from '@/components/sections/table/table_MyDays.vue'
import modalConfirmDelete from '@/components/modal/modalConfirmDelete.vue'
import { Howl } from 'howler';
import tippy from "tippy.js";

const storeToDoList = toDoListStore()
const displayMyDays = () => ref(storeToDoList.getDisplayMyDays)
const listTask = ref(JSON.parse(localStorage.getItem('taskList')))
const listTaskCompleted = ref(JSON.parse(localStorage.getItem('taskCompleted')))
const taskCreated = () => storeToDoList.getmyDaysCreated
const loading = () => storeToDoList.getLoading
const setLoading = (val) => storeToDoList.setLoading(val)
const checkButtons = ref(null)
const buttons = ref(null)
const buttonsCompleted = ref(null)
const starActive = ref([])
const starActiveCompleted = ref([])
const displayCompleted = ref(false)
const tasksCompletedValues = ref([])
const openModalOptionsSelected = ref(false)
const displayTodayCompleted = ref(false)
const displaytomorrow = ref(false)
const openDelete = ref(false)
const updateForce = ref(false)
const displayList = ref(false)
const isOpenModalLarge = ref(false)
const modalTop = ref(0)
const modalLeft = ref(0)
const modalRight = ref(0)
const modalBottom = ref(0)
const objSelected = ref(null)
const IndexSelected = ref(null)
const stateList = ref('');

watch(()=>updateForce.value,()=>{
  listTask.value = JSON.parse(localStorage.getItem('taskList'))
  listTaskCompleted.value = JSON.parse(localStorage.getItem('taskCompleted'))
})

const notificationSounds = new Howl({
  src: ['sounds/notification2.wav']
})

const selectedItem = (event,index) => {
  buttons.value = index
  objSelected.value = event
  buttonsCompleted.value = null
  isOpenModalLarge.value = true
}

const selectedItemCompleted = (index) => {
  buttonsCompleted.value = index
  buttons.value = null
}

const createListTask = () => {
  storeToDoList.setNewListTaskCreated([objSelected.value])
  storeToDoList.setdisplayAssignedToMe(false)
  storeToDoList.setDisplayMyDays(false)
  storeToDoList.setdisplayImportant(false)
  storeToDoList.setdisplayPlanned(false)
  storeToDoList.setdisplayFlaggedEmail(false)
  storeToDoList.setdisplayTasks(false)
  storeToDoList.setdisplayFirstSteps(false)
  storeToDoList.setdisplayShopping(false)
  storeToDoList.setdisplayUntitled(true)
  storeToDoList.setListTaskDisplay(true)
}

const selectedStarItemDetails = () => {
  const result = starActive.value.indexOf(objSelected.value)
  if(!listTask.value[IndexSelected.value].important) listTask.value[IndexSelected.value].important = true
  else listTask.value[IndexSelected.value].important = false

  if (starActive.value.includes(objSelected.value)) {
    starActive.value.splice(result, 1)
  } else {
    if (result !== -1) {
      listTask.value.splice(result, 1) 
    }else {
      starActive.value.push(objSelected.value)
      listTask.value.splice(IndexSelected.value, 1)
      listTask.value.unshift(objSelected.value)
    }
  }
  openModalOptionsSelected.value = false
}

const selectedStarItem = (index,ent) => {
  const result = starActive.value.indexOf(ent)

  if (starActive.value.includes(ent)) {
    starActive.value.splice(result, 1)
  } else {
    if (result !== -1) {
      listTask.value.splice(result, 1) 
    }else {

      starActive.value.push(ent)
      listTask.value.splice(index, 1)
      listTask.value.unshift(ent)

    }
  }
}

const selectedStarItemCompleted = (index,ent) => {
  const result = starActiveCompleted.value.indexOf(ent)

  if (starActiveCompleted.value.includes(ent)) {
    starActiveCompleted.value.splice(result, 1)
  } else {
    if (result !== -1) {
      tasksCompletedValues.value.splice(result, 1) 
    }else {

      starActiveCompleted.value.push(ent)
      tasksCompletedValues.value.splice(index, 1)
      tasksCompletedValues.value.unshift(ent)

    }
  }
}

const tasksCompleted = (event,ent) => {
  let result = []
  notificationSounds.stop()
  listTask.value[event].completed = true
  listTaskCompleted.value.push(ent)
  localStorage.setItem('taskCompleted', JSON.stringify(listTaskCompleted.value))
  result = listTask.value.filter(item => item?.id !== ent?.id)
  localStorage.setItem('taskList', JSON.stringify(result))
  updateForce.value = !updateForce.value
  notificationSounds.seek(0.6)
  notificationSounds.play()
} 

const markOfTask = (ent,event) => {
  // updateForce.value = !updateForce.value
  let result = []
  listTaskCompleted.value[event].completed = false
  listTask.value.push(ent)
  localStorage.setItem('taskList', JSON.stringify(listTask.value))
  result = listTaskCompleted.value.filter(item => item?.id !== ent?.id)
  localStorage.setItem('taskCompleted', JSON.stringify(result))
  updateForce.value = !updateForce.value
  // tasksCompletedValues.value.splice(event, 1)
  // listTask.value.push(ent)
}

const openModalOptions = (event,index,ent,state) => {
  buttons.value = index
  objSelected.value = ent
  IndexSelected.value = index
  stateList.value = state
  let maxWidth = window.innerWidth
  let maxHeight = window.innerHeight
  let componentWidth = 242
  let componentHeight = 393
  let limitWidth = maxWidth - componentWidth
  let limitHeight = maxHeight - componentHeight

  if(event.clientX > limitWidth){
    console.log('ooi 1')
    modalLeft.value = event.clientX - componentWidth
    modalTop.value = event.clientY
    modalRight.value = event.clientX - componentWidth
  }else {
    modalTop.value = event.clientY;
    modalLeft.value = event.clientX;
  }
  if(event.clientY > limitHeight){
    let result = event.clientY - limitHeight + 10
    
    modalTop.value = modalTop.value - result
    modalBottom.value = result
  }
  if(event.clientY > 467){
    modalTop.value = event.clientY - componentHeight
  }
  openModalOptionsSelected.value = !openModalOptionsSelected.value
}

const removeDay = () => {
  let result = []
  if(stateList.value === 'notCompleted'){
    result = listTask.value.filter(item => item?.id !== objSelected.value?.id)
    localStorage.setItem('taskList', JSON.stringify(result))
  } else {
    result = listTaskCompleted.value.filter(item => item?.id !== objSelected.value?.id)
    localStorage.setItem('taskCompleted', JSON.stringify(result))
  }
  updateForce.value = !updateForce.value
  openModalOptionsSelected.value = !openModalOptionsSelected.value
}

const markCompleted = (event) => {
  let result = []
  if(event){
    listTask.value[IndexSelected.value].completed = true
    listTaskCompleted.value.push(objSelected.value)
    localStorage.setItem('taskCompleted', JSON.stringify(listTaskCompleted.value))
    result = listTask.value.filter(item => item?.id !== objSelected.value?.id)
    localStorage.setItem('taskList', JSON.stringify(result))
  } 
  else {
    listTaskCompleted.value[IndexSelected.value].completed = false
    listTask.value.push(objSelected.value)
    localStorage.setItem('taskList', JSON.stringify(listTask.value))
    result = listTaskCompleted.value.filter(item => item?.id !== objSelected.value?.id)
    localStorage.setItem('taskCompleted', JSON.stringify(result))
  }
  updateForce.value = !updateForce.value
  openModalOptionsSelected.value = false
}

const completedToday = (event) => {
  if(event && event != 'tomorrow') {
    displaytomorrow.value = false
    listTask.value[IndexSelected.value].concluded = true
    listTask.value[IndexSelected.value].concludedToday = false
    displayTodayCompleted.value = true
  }
  else if(event === 'tomorrow'){
    listTask.value[IndexSelected.value].concluded = false
    listTask.value[IndexSelected.value].concludedToday = true
    if(displaytomorrow.value) openModalOptionsSelected.value = false
    displaytomorrow.value = !displaytomorrow.value
  }
  else {
    listTask.value[IndexSelected.value].concluded = false
    listTask.value[IndexSelected.value].concludedToday = false
    openModalOptionsSelected.value = false
    displaytomorrow.value = false
  } 
  openModalOptionsSelected.value = false
}

const deleteTask = () => {
  // setLoading(true)
  if(stateList.value === 'notCompleted'){
    let result = listTask.value.filter(item => item?.id !== objSelected.value?.id)
    localStorage.setItem('taskList', JSON.stringify(result))
  } else {
    let result = listTaskCompleted.value.filter(item => item?.id !== objSelected.value?.id)
    localStorage.setItem('taskCompleted', JSON.stringify(result))
  }
  openDelete.value = !openDelete.value
  updateForce.value = !updateForce.value
}

watch(()=>displayList.value,()=>{
  setLoading(true)
  setTimeout(()=>{
    setLoading(false)
  }, 150)
})

const orderList = () => {
  displayList.value = !displayList.value
  if(displayList.value) listTask.value.sort((a,b) => a?.id - b?.id)
  else listTask.value.sort((a,b) => b?.id - a?.id)
}

tippy('#myButton', {
  content: "I'm a Tippy tooltip!",
});

// onMounted(()=>{
//    console.log(listTask.value)
// })

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

.star-icon  {
  @apply stroke-blue-300 fill-none text-[#333333];
}

::-webkit-scrollbar {
  @apply bg-black w-[7.5px];
}

.slide-enter-active, .slide-leave-active {
  transition: transform 2s;
}
.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-active {
  transition: transform 0.5s;
}

.slide-enter-from {
  transform: translateY(-15%);
}

.slide-enter-to {
  transform: translateY(0);
}

.slide-leave-active {
  transition: none;
}

.slide-leave-from,
.slide-leave-to {
  transform: translateY(0);
}

</style>