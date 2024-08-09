<template>
  <div class="h-[16%] px-6 py-4" :class="isOpenModalLarge ? 'w-[calc(100%-30%)]' : 'w-full'">
      <div class="h-full flex">
        <div class="h-full flex flex-col" :class="storeToDoList.getdisplayMenuLeft ? '!w-full ml-auto' : '' || isOpenModalLarge ? 'lg:w-[70%]' : 'w-[72%]'">
          <div class="h-[60%] flex items-center gap-1 pl-2">
            <button><SunIcon class="w-6 text-white" v-if="!storeToDoList.getdisplayMenuLeft" /></button>
            <button @click="displayMenuLeft(false)"><Bars3Icon class="w-5 h-[60%] text-white ml-[-10px]" v-if="storeToDoList.getdisplayMenuLeft" /></button>
            <span class="text-white text-[21px] font-semibold">Meu Dia</span>
            <div class=" h-[70%] ml-2">
              <button class="h-full flex items-center hover:bg-[#222222] rounded">
                <EllipsisHorizontalIcon class="w-8 h-[80%] text-white opacity-40" />
              </button>
            </div>
            <div @mouseover="borderActive = true" @mouseout="borderActive = false" class="h-[90%] ml-1 rounded-md hover:bg-[#333333] opacity-60 transition-all duration-150" :class="!orderListAction ? 'w-[100px]' : 'w-[130px]'">
              <button @click="emit('orderList')" class="w-full h-full flex justify-center items-center rounded-md">
                <div class="w-[90%] h-7 flex justify-center items-center gap-1">
                  <ArrowsUpDownIcon class="w-[20%] h-[23px] text-white" :class="!orderListAction ? 'w-[25%]' : 'w-[20%]'" />
                  <span v-if="!orderListAction" class="w-[70%] text-white text-[14px]">Crescente</span>
                  <span v-if="orderListAction" class="w-[70%] text-white text-[14px]">Decrescente</span>
                </div>
              </button>
              <div v-if="borderActive" class="bg-white w-full h-[2.5px] opacity-60 m-auto rounded-xl"></div>
            </div>
          </div>
          <div class="flex items-center">
              <span class="text-[#888888] pl-3 text-[12px]">{{ setDate() }}</span>
          </div>
        </div>
        <div class="h-full flex justify-center" :class="isOpenModalLarge ? '2x1:w-[36%] pt-2' : 'w-[30%] px-5 pt-3'">
          <div class="w-full h-[33px] flex justify-end">
            <button v-tippy="{ content: 'Classificar', placement: 'top', delay: [300, 0], theme: 'light' }" class="w-[110px] h-full flex justify-center items-center gap-1 opacity-60 hover:bg-[#333333] rounded-[4px] transition-all duration-150">
              <ArrowsUpDownIcon class="w-5 h-5 text-white" />
              <span class="text-sm text-white">Classificar</span>
            </button>
            <button v-tippy="{ content: 'Grupo', placement: 'top', delay: [300, 0], theme: 'light' }" class="w-[90px] h-full flex justify-center items-center gap-1 opacity-60 hover:bg-[#333333] rounded-[4px] transition-all duration-150">
              <Battery0Icon class="w-5 h-5 text-white" />
              <span class="text-sm text-white">Grupo</span>
            </button>
            <button v-tippy="{ content: 'Sugestões', placement: 'top', delay: [300, 0], theme: 'light' }" class="w-[114px] h-full flex justify-center items-center gap-1 opacity-60 hover:bg-[#333333] rounded-[4px] transition-all duration-150">
              <LightBulbIcon class="w-5 h-5 text-white" />
              <span class="text-sm text-white">Sugestões</span>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { SunIcon, EllipsisHorizontalIcon, CalendarIcon, BellIcon, ArrowPathRoundedSquareIcon, ArrowsUpDownIcon, Battery0Icon, LightBulbIcon, Bars3Icon } from '@heroicons/vue/24/solid'
import { toDoListStore } from '@/stores/toDoList.js'
import {ref} from 'vue'
import 'tippy.js/themes/light.css';

const storeToDoList = toDoListStore()
const borderActive = ref(false)

defineProps({
  orderListAction:{
    type:Boolean,
    default:false
  },
  isOpenModalLarge:{
    type:Boolean,
    default:false
  }
})

const emit = defineEmits(['orderList'])

const setDate = () => {
  let date = new Date()
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }
  return new Intl.DateTimeFormat('pt-br', options).format(date)
}

</script>
