
<template>
  <div class="h-full" v-if="displayMyDays()">
    <commonHeader />
    <tableMyDays />
    <div class="w-[99.9%] h-[calc(100%-31%)] px-6 pt-1 overflow-auto z-auto">
      <div v-if="newListTask.length" class="mb-6">
          <div v-for="(ent,index) in newListTask" :key="index">
            <div class="w-full h-full pt-2 flex flex-col">
              <button @contextmenu.prevent="openModalOptions($event,index,ent)" @click="selectedItem(index)" :class="buttons === index ? 'bg-[#333333]' : ''" class="w-full h-[52px] text-white rounded-[4px] bg-[#222222] pl-5 flex justify-start items-center hover:bg-[#333333] transition-all duration-300">
                  <div @mouseover="checkButtons = index" @mouseout="checkButtons = !index" class="w-7 h-7 flex justify-center items-center ">
                    <div @click="tasksCompleted(index,ent)" class="w-[60%] h-[60%] rounded-full border border-blue-300 flex justify-center items-center">
                      <CheckIcon v-show="checkButtons === index" class="w-[10px] h-[10px] text-blue-300" />
                    </div>
                  </div>
                  <div class="flex flex-col w-[93%]">
                    <span class="text-start text-sm ml-4">{{ ent?.nameTask }}</span>
                    <div class="text-start flex">
                      <span class="text-sm text-[11.9px] opacity-45 ml-4">Tarefas</span>
                      <div v-if="newListTask[index].concluded" class="w-[14px] flex justify-center items-center">
                        <div class="w-[30%] h-[20%] ml-[5px] rounded-full bg-[#888888]"></div></div>
                        <div v-if="newListTask[index].concluded || newListTask[index].concludedToday" class="w-[90px] flex items-center gap-1 ml-2">
                          <CalendarDaysIcon class="w-4 h-4" :class="newListTask[index].concludedToday ? 'text-gray-200' : 'text-blue-300'" />
                          <p class="text-sm text-[11px]" :class="newListTask[index].concludedToday ? 'text-white' : 'text-blue-300'">
                            {{ newListTask[index].concludedToday ? 'Amanhã' : 'Hoje' }}
                          </p>
                        </div>
                    </div>
                  </div>
                  <div @click.stop="selectedStarItem(index,ent)" class="w-5 h-5 flex justify-center items-center star-icon">
                    <StarIcon class="w-5 h-5 rounded-full" :class="starActive.includes(ent) ? 'text-blue-300' : ''" />
                  </div>
                </button>
              </div>
          </div>
        </div>
      <div v-if="tasksCompletedValues.length" class="w-full h-[17%]">
        <div @click="displayCompleted = !displayCompleted" class="w-full h-[70%] flex justify-start items-center cursor-pointer">
          <button v-if="!displayCompleted" class="w-7 h-[60%] flex justify-center items-center"><ChevronRightIcon class="w-4 h-4 text-white opacity-50" /></button>
          <button v-if="displayCompleted" class="w-7 h-[60%] flex justify-center items-center"><ChevronDownIcon class="w-4 h-4 text-white opacity-50" /></button>
          <button class="w-[8.5%] h-[64%] flex gap-3 justify-center items-center p-4">
            <p class="font-semibold text-[14px] text-white">Concluída</p>
            <p class="text-white font-sm text-[14px] opacity-45">{{ tasksCompletedValues.length }}</p>
          </button>
        </div>
        <div v-if="displayCompleted" class="w-full h-full flex flex-col gap-2 mb-8 pb-3">
          <div v-for="(ent,index) in tasksCompletedValues" :key="index.id">
            <button @contextmenu.prevent="openModalOptions($event,index,ent)" @click="selectedItemCompleted(index)" :class="buttonsCompleted === index ? 'bg-[#333333]' : ''" class="w-full h-[54px] text-white rounded-[4px] bg-[#222222] pl-5 flex justify-start items-center hover:bg-[#333333] transition-all duration-300">
                <div @mouseover="checkButtons = index" @mouseout="checkButtons = !index" class="w-7 h-7 flex justify-center items-center">
                  <div @click="markOfTask(ent,index)" class="w-[60%] h-[60%] rounded-full border border-blue-300 flex justify-center items-center bg-blue-400">
                    <CheckIcon class="w-[10px] h-[10px] text-black font-semibold" />
                  </div>
                </div>
              <div class="flex flex-col w-[93%]">
                <span class="text-start text-sm ml-4">{{ ent?.nameTask }}</span>
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
      <modalOptions v-if="openModalOptionsSelected" :open="openModalOptionsSelected" @close="openModalOptionsSelected = $event" :modalTop="modalTop" :modalLeft="modalLeft" :modalRight="modalRight" :modalBottom="modalBottom" :statusActive="objSelected.important" @importantChecked="selectedStarItemDetails()" @removeDay="removeDay" @markCompleted="markCompleted($event)" :statusImportant="objSelected.completed" @completedToday="completedToday($event)" :todayConcluded="objSelected.concluded || objSelected.concludedToday" @removeTask="openDeleteTask" />
      
    </div>
  </div>
</template>

<script setup>
import modalOptions from '@/components/modal/modalOptions.vue'
import { StarIcon, CheckIcon, ChevronRightIcon, ChevronDownIcon, CalendarDaysIcon } from '@heroicons/vue/24/solid'
import {ref, onMounted, watch,computed} from 'vue';
import { toDoListStore } from '@/stores/toDoList.js'
import commonHeader from '@/components/sections/commonHeaders/commonHeader.vue'
import tableMyDays from '@/components/sections/table/table_MyDays.vue'
import { Howl } from 'howler';

const storeToDoList = toDoListStore()
const displayMyDays = () => ref(storeToDoList.getDisplayMyDays)
const newListTask = computed(() => storeToDoList.getNewListTaskCreated)
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
const modalTop = ref(0)
const modalLeft = ref(0)
const modalRight = ref(0)
const modalBottom = ref(0)
const objSelected = ref(null)
const IndexSelected = ref(null)

const notificationSounds = new Howl({
  src: ['sounds/notification2.wav']
})

const selectedItem = (index) => {
  buttons.value = index
  buttonsCompleted.value = null
}

const selectedItemCompleted = (index) => {
  buttonsCompleted.value = index
  buttons.value = null
}

const openDeleteTask = (index) => {
  openDelete.value = !openDelete.value
}

const selectedStarItemDetails = () => {
  const result = starActive.value.indexOf(objSelected.value)
  if(!newListTask.value[IndexSelected.value].important) newListTask.value[IndexSelected.value].important = true
  else newListTask.value[IndexSelected.value].important = false

  if (starActive.value.includes(objSelected.value)) {
    starActive.value.splice(result, 1)
  } else {
    if (result !== -1) {
      newListTask.value.splice(result, 1) 
    }else {
      starActive.value.push(objSelected.value)
      newListTask.value.splice(IndexSelected.value, 1)
      newListTask.value.unshift(objSelected.value)
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
      newListTask.value.splice(result, 1) 
    }else {

      starActive.value.push(ent)
      newListTask.value.splice(index, 1)
      newListTask.value.unshift(ent)

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
  notificationSounds.stop()
  newListTask.value[event].completed = true
  tasksCompletedValues.value.push(ent)
  newListTask.value.splice(event, 1)
  notificationSounds.seek(0.6)
  notificationSounds.play()
} 

const markOfTask = (ent,event) => {
  tasksCompletedValues.value[event].completed = false
  tasksCompletedValues.value.splice(event, 1)
  newListTask.value.push(ent)
} 

const openModalOptions = (event,index,ent) => {
  buttons.value = index
  objSelected.value = ent
  IndexSelected.value = index
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
  newListTask.value.splice(IndexSelected.value, 1)
  openModalOptionsSelected.value = false
}

const markCompleted = (event) => {
  if(event){
    newListTask.value[IndexSelected.value].completed = true
    tasksCompletedValues.value.push(objSelected.value)
    newListTask.value.splice(IndexSelected.value, 1)
  } 
  else {
    tasksCompletedValues.value[IndexSelected.value].completed = false
    tasksCompletedValues.value.splice(IndexSelected.value, 1)
    newListTask.value.push(objSelected.value)
  }
  openModalOptionsSelected.value = false
}

const completedToday = (event) => {
  if(event && event != 'tomorrow') {
    displaytomorrow.value = false
    newListTask.value[IndexSelected.value].concluded = true
    newListTask.value[IndexSelected.value].concludedToday = false
    displayTodayCompleted.value = true
  }
  else if(event === 'tomorrow'){
    newListTask.value[IndexSelected.value].concluded = false
    newListTask.value[IndexSelected.value].concludedToday = true
    if(displaytomorrow.value) openModalOptionsSelected.value = false
    displaytomorrow.value = !displaytomorrow.value
  }
  else {
    newListTask.value[IndexSelected.value].concluded = false
    newListTask.value[IndexSelected.value].concludedToday = false
    openModalOptionsSelected.value = false
    displaytomorrow.value = false
  } 
  openModalOptionsSelected.value = false
}

onMounted(()=>{
  console.log(storeToDoList.getNewListTaskCreated)
})

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
  @apply bg-black w-2;
}

::-webkit-scrollbar-thumb {
  @apply bg-[#444444] ;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 2s ; /* Duração da transição e propriedade a ser animada */
}
.slide-enter, .slide-leave-to {
  transform: translateY(-100%); /* Estado inicial e final da transição */
}

</style>