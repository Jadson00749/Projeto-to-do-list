<template>
  <div :class="rules">
      <div class="w-full h-full rounded-md" :class="displayInput() ? '' : 'h-[52.5px]'">
        <div class="w-full flex items-center bg-[#222222] rounded-[3px]" :class="displayInput() ? 'border-b border-white border-opacity-30 h-[55%]' : 'h-full'">
          <div v-if="displayInput()" class="w-4 h-4 rounded-full border-[1px] ml-6 border-blue-300"></div>
          <PlusIcon v-if="!displayInput()" class="w-5 h-5 ml-6 text-blue-300"/>
          <input
            v-model="enableAddition"
            placeholder="Adicionar uma tarefa"
            @click="activeInput()"
            @blur="placeHolderActive = true"
            @input="inputValueTask"
            :class="placeHolderActive ? 'placeholder-active' : 'placeholder-desactive'"
            class="w-[95%] h-[72%] text-white rounded-s-sm bg-[#222222] pl-4 border-transparent focus:outline-none" 
            >
        </div>
        <transition 
        name="slide"
        >
          <div v-if="displayInput()" class="w-full h-[45%] flex items-center justify-between bg-[#222222]">
            <div class="w-[100px] h-[65%] flex ml-5">
              <button v-tippy="{ content: 'Adicionar data de conclusão', placement: 'bottom', delay: [300, 0], theme: 'light' }" class="w-[33%] h-full flex justify-center items-center rounded-md cursor-default hover:bg-[#2c2c2c]"><CalendarIcon class="w-5 h-5 text-white opacity-50" /></button>
              <button v-tippy="{ content: 'Lembrar-me', placement: 'bottom', delay: [300, 0], theme: 'light' }" class="w-[33%] h-full flex justify-center items-center rounded-md cursor-default hover:bg-[#2c2c2c]"><BellIcon class="w-5 h-5 text-white opacity-50" /></button>
              <button v-tippy="{ content: 'Repetir', placement: 'bottom', delay: [300, 0], theme: 'light' }" class="w-[33%] h-full flex justify-center items-center rounded-md cursor-default hover:bg-[#2c2c2c]"><ArrowPathRoundedSquareIcon class="w-5 h-5 text-white opacity-50" /></button>
            </div>
            <div class="w-[70px] h-[70%] mr-5 border border-white border-opacity-30">
              <button @click="createTask" :disabled="enableAddition === ''" :class="enableAddition != '' ? 'color-add-task' : 'text-white opacity-60 cursor-not-allowed'" class="w-full h-full section-selected-add-task text-white font-semibold"
              >Adicionar</button>
            </div>
          </div>
        </transition>
      </div>
    </div>
</template>

<script setup>
import { SunIcon, EllipsisHorizontalIcon, CalendarIcon, BellIcon, ArrowPathRoundedSquareIcon, ArrowsUpDownIcon, Battery0Icon, LightBulbIcon, Bars3Icon, PlusIcon } from '@heroicons/vue/24/solid'
import { toDoListStore } from '@/stores/toDoList.js'
import { onBeforeMount, onMounted, ref, computed } from 'vue';
import dayjs from 'dayjs';
import { dataStorage } from '@/commons/settingsData';

const props = defineProps({
  isOpenModalLarge:{
    type:Boolean,
    default:false
  }
})

const emit = defineEmits('getList')

const storeToDoList = toDoListStore()
const placeHolderActive = ref(true)
const enableAddition = ref('')
const key = () => storeToDoList.getKeyName
const listValues = ref([])
const id = ref(0)
const listTask = (val) => storeToDoList.setmyDaysCreated(val)
const displayInput = () => storeToDoList.getInputDisplay
const objLocalStorage = ref(null)
const taskCompleted = ref(null)

const inputValueTask = (event) => {
  enableAddition.value = event.target.value
}

const createTask = () => {
  objLocalStorage.value = dataStorage.getStorage(key())
  let obj = {
    id: id.value += 1,
    nameTask: enableAddition.value,
    important: false,
    completed: false,
    concluded: false,
    concludedToday: false,
    selectedTask: false,
    updateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
      taskDetails:{
        descr: "",
        files: []
      }
    }
    if(objLocalStorage.value != null) {
      listValues.value = objLocalStorage.value
      listValues.value.push(obj)
      listValues.value.sort((a,b) => b?.id - a?.id)
      dataStorage.setStorage(key(), listValues.value)
    }else {
      dataStorage.setStorage(key(), [obj])
    }
    enableAddition.value = ''
    emit('getList')
}

const activeInput = () => {
  placeHolderActive.value = false
  storeToDoList.setInputDisplay(true)
}

const rules = computed(()=>{
  return {
    'h-[15%]': displayInput(),
    'h-[8.5%]': !displayInput(),
    '!w-[calc(100%-30%)] px-6': props.isOpenModalLarge,
    'w-full px-6': !props.isOpenModalLarge
  }
})

onBeforeMount(()=>{
  objLocalStorage.value = dataStorage.getStorage(key())
  taskCompleted.value = dataStorage.getStorage('taskCompleted')
  if(objLocalStorage.value){
    id.value = objLocalStorage.value[0]?.id
  }else if(taskCompleted.value) {
    id.value = taskCompleted.value.reduce((max, obj) => (obj.id > max.id ? obj : max), taskCompleted.value[0]).id
  }else{
    id.value = 0
  }
})

</script>

<style scoped>

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

.slide-enter-active, .slide-leave-active {
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1); /* Ajuste a duração e a curva de timing conforme necessário */
}

.slide-enter, .slide-leave-to {
  transform: translateY(-100%);
}

.slide-enter-to {
  transform: translateY(0);
}

</style>