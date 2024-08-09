
<template>
  <div class="h-full" v-if="displayFirstSteps()">
    <div class="w-full h-[12%] px-6 py-4">
      <div class="h-full flex items-center">
        <div class="h-[80%] w-[82%] flex flex-col" :class="storeToDoList.getdisplayMenuLeft ? '!w-full ml-auto' : ''">
          <div class="h-full flex items-center gap-2 pl-2">
            <button><RocketLaunchIcon class="w-[23px] h-[60%] text-blue-200" v-if="!storeToDoList.getdisplayMenuLeft" /></button>
            <button @click="displayMenuLeft(false)"><Bars3Icon class="w-5 h-[60%] text-white ml-[-10px]" v-if="storeToDoList.getdisplayMenuLeft" /></button>
            <span class="color-btn-classific font-semibold important-font-title">Primeiros passos</span>
            <div class=" h-full">
              <button class="h-full flex items-center hover:bg-[#222222] rounded">
                <EllipsisHorizontalIcon class="w-8 h-[80%] text-white opacity-40" />
              </button>
            </div>
          </div>
        </div>
        <div class="w-[35%] h-full flex justify-end items-center">
          <div class="w-[90%] h-[70%] flex pr-2">
            <button class="w-[50%] h-full flex gap-1 justify-center items-center color-btn-classific hover:bg-[#333333] rounded-[4px] transition-all duration-150 px-2">
              <ArrowsUpDownIcon class="w-5 h-5 text-blue-300" />
              <p class="text-sm">Classificar</p>
            </button>
            <button class="w-[50%] h-full flex gap-1 justify-center items-center color-btn-classific hover:bg-[#333333] rounded-[4px] transition-all duration-150">
              <Battery0Icon class="w-5 h-5 text-blue-300" />
              <p class="text-sm">Grupo</p>
            </button>
            <button class="w-[50%] h-full flex gap-1 justify-center items-center color-btn-classific hover:bg-[#333333] rounded-[4px] transition-all duration-150 px-2">
              <UserPlusIcon class="w-5 h-5 text-blue-300" />
              <p class="text-sm">Compartilhar</p>
            </button>
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
      <div class="w-full h-[calc(100%-27%)] px-6">
        <div class="w-full h-full pt-3 flex flex-col gap-2">
          <button @click="buttons = 1" :class="buttons == 1 ? 'bg-[#333333]' : ''" class="w-full h-[54px] text-white rounded-[4px] bg-[#222222] pl-5 flex justify-start items-center hover:bg-[#333333] transition-all duration-300">
            <div @mouseover="checkButtons = 1" @mouseout="checkButtons = 0" class="w-7 h-7 flex justify-center items-center">
              <div class="w-[60%] h-[60%] rounded-full border border-blue-300 flex justify-center items-center">
                <CheckIcon v-if="checkButtons == 1" class="w-[10px] h-[10px] text-blue-300" />
              </div>
            </div>
            <div class="flex w-[93%]">
              <span class="text-start text-sm ml-4">Adicione sua primeira tarefa clicando em</span>
              <PlusIcon class="w-[21px] h-[22px] text-purple-400 ml-[1px]" />
              <span class="text-start text-sm">Adicionar uma tarefa</span>
            </div>
            <div @click.stop="starActive1 = !starActive1" class="w-5 h-5 flex justify-center items-center star-icon">
              <StarIcon class="w-5 h-5 rounded-full" :class="starActive1 ? 'text-blue-300' : ''" />
            </div>
          </button>
          <button @click="buttons = 2" :class="buttons == 2 ? 'bg-[#333333]' : ''" class="w-full h-[54px] text-white rounded-[4px] bg-[#222222] pl-5 flex justify-start items-center hover:bg-[#333333] transition-all duration-300">
            <div @mouseover="checkButtons = 2" @mouseout="checkButtons = 0" class="w-7 h-7 flex justify-center items-center">
              <div class="w-[60%] h-[60%] rounded-full border border-blue-300 flex justify-center items-center">
                <CheckIcon v-if="checkButtons == 2" class="w-[10px] h-[10px] text-blue-300" />
              </div>
            </div>
            <div class="flex flex-col w-[93%]">
              <span class="text-start text-sm ml-4">Confira nossa amostra de lista de compras e personalize-a para voce</span>
              <div class="flex ml-4 items-center">
                <PencilSquareIcon class="w-5 h-4 text-white opacity-45" />
                <span class="text-start text-sm text-[12px] opacity-45">Anotação</span>
              </div>
            </div>
            <div @click.stop="starActive2 = !starActive2" class="w-5 h-5 flex justify-center items-center star-icon">
              <StarIcon class="w-5 h-5 rounded-full" :class="starActive2 ? 'text-blue-300' : ''" />
            </div>
          </button>
          <button @click="buttons = 3" :class="buttons == 3 ? 'bg-[#333333]' : ''" class="w-full h-[54px] text-white rounded-[4px] bg-[#222222] pl-5 flex justify-start items-center hover:bg-[#333333] transition-all duration-300">
            <div @mouseover="checkButtons = 3" @mouseout="checkButtons = 0" class="w-7 h-7 flex justify-center items-center">
              <div class="w-[60%] h-[60%] rounded-full border border-blue-300 flex justify-center items-center">
                <CheckIcon v-if="checkButtons == 3" class="w-[10px] h-[10px] text-blue-300" />
              </div>
            </div>
            <div class="flex flex-col w-[93%]">
              <span class="text-start text-sm ml-4">Divida esta tarefa em etapas menores</span>
              <div class="flex ml-4 items-center">
                <span class="text-start text-sm text-[12px] opacity-45">0 de 1</span>
              </div>
            </div>
            <div @click.stop="starActive3 = !starActive3" class="w-5 h-5 flex justify-center items-center star-icon">
              <StarIcon class="w-5 h-5 rounded-full" :class="starActive3 ? 'text-blue-300' : ''" />
            </div>
          </button>
          <button @click="buttons = 4" :class="buttons == 4 ? 'bg-[#333333]' : ''" class="w-full h-[54px] text-white rounded-[4px] bg-[#222222] pl-5 flex justify-start items-center hover:bg-[#333333] transition-all duration-300">
            <div @mouseover="checkButtons = 4" @mouseout="checkButtons = 0" class="w-7 h-7 flex justify-center items-center">
              <div class="w-[60%] h-[60%] rounded-full border border-blue-300 flex justify-center items-center">
                <CheckIcon v-if="checkButtons == 4" class="w-[10px] h-[10px] text-blue-300" />
              </div>
            </div>
            <div class="flex flex-col w-[93%]">
              <div class="flex w-full gap-2">
                <span class="text-start text-sm ml-4">Abra a visualização de detalhes desta tarefa para adicioná-la a Meu Dia</span>
                <SunIcon class="w-5 h-5 text-yellow-500" />
              </div>
              <div class="flex ml-4 items-center">
                <PencilSquareIcon class="w-5 h-4 text-white opacity-45" />
                <span class="text-start text-sm text-[12px] opacity-45">Anotação</span>
              </div>
            </div>
            <div @click.stop="starActive4 = !starActive4" class="w-5 h-5 flex justify-center items-center star-icon">
              <StarIcon class="w-5 h-5 rounded-full" :class="starActive4 ? 'text-blue-300' : ''" />
            </div>
          </button>
          <button @click="buttons = 5" :class="buttons == 5 ? 'bg-[#333333]' : ''" class="w-full h-[54px] text-white rounded-[4px] bg-[#222222] pl-5 flex justify-start items-center hover:bg-[#333333] transition-all duration-300">
            <div @mouseover="checkButtons = 5" @mouseout="checkButtons = 0" class="w-7 h-7 flex justify-center items-center">
              <div class="w-[60%] h-[60%] rounded-full border border-blue-300 flex justify-center items-center">
                <CheckIcon v-if="checkButtons == 5" class="w-[10px] h-[10px] text-blue-300" />
              </div>
            </div>
            <div class="flex flex-col w-[93%]">
              <span class="text-start text-sm ml-4">Selecione esta tarefa para adicionar um lembrete e uma data de vencimento</span>
              <div class="flex ml-4 items-center">
                <PencilSquareIcon class="w-5 h-4 text-white opacity-45" />
                <span class="text-start text-sm text-[12px] opacity-45">Anotação</span>
              </div>
            </div>
            <div @click.stop="starActive5 = !starActive5" class="w-5 h-5 flex justify-center items-center star-icon">
              <StarIcon class="w-5 h-5 rounded-full" :class="starActive5 ? 'text-blue-300' : ''" />
            </div>
          </button>
          <button @click="buttons = 6" :class="buttons == 6 ? 'bg-[#333333]' : ''" class="w-full h-[54px] text-white rounded-[4px] bg-[#222222] pl-5 flex justify-start items-center hover:bg-[#333333] transition-all duration-300">
            <div @mouseover="checkButtons = 6" @mouseout="checkButtons = 0" class="w-7 h-7 flex justify-center items-center">
              <div class="w-[60%] h-[60%] rounded-full border border-blue-300 flex justify-center items-center">
                <CheckIcon v-if="checkButtons == 6" class="w-[10px] h-[10px] text-blue-300" />
              </div>
            </div>
            <div class="flex flex-col w-[93%]">
              <span class="text-start text-sm ml-4">Adicione #hashtags ao titulo de uma tarefa para categoriza-la</span>
              <div class="flex ml-4 items-center">
                <PencilSquareIcon class="w-5 h-4 text-white opacity-45" />
                <span class="text-start text-sm text-[12px] opacity-45">Anotação</span>
              </div>
            </div>
            <div @click.stop="starActive6 = !starActive6" class="w-5 h-5 flex justify-center items-center star-icon">
              <StarIcon class="w-5 h-5 rounded-full" :class="starActive6 ? 'text-blue-300' : ''" />
            </div>
          </button>
          <button @click="buttons = 7" :class="buttons == 7 ? 'bg-[#333333]' : ''" class="w-full h-[54px] text-white rounded-[4px] bg-[#222222] pl-5 flex justify-start items-center hover:bg-[#333333] transition-all duration-300">
            <div @mouseover="checkButtons = 7" @mouseout="checkButtons = 0" class="w-7 h-7 flex justify-center items-center">
              <div class="w-[60%] h-[60%] rounded-full border border-blue-300 flex justify-center items-center">
                <CheckIcon v-if="checkButtons == 7" class="w-[10px] h-[10px] text-blue-300" />
              </div>
            </div>
            <div class="flex gap-2 w-[93%]">
              <span class="text-start text-sm ml-4">Toque em todos os circulos nesta lista para completar suas tarefas</span>
              <CheckIcon class="w-4 h-4 text-white bg-green-500 rounded-sm" />
            </div>
            <div @click.stop="starActive7 = !starActive7" class="w-5 h-5 flex justify-center items-center star-icon">
              <StarIcon class="w-5 h-5 rounded-full" :class="starActive7 ? 'text-blue-300' : ''" />
            </div>
          </button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { EllipsisHorizontalIcon, HomeIcon, CalendarIcon, BellIcon, ArrowPathRoundedSquareIcon, Bars3Icon, StarIcon, ArrowsUpDownIcon, Battery0Icon, RocketLaunchIcon, UserPlusIcon, CheckIcon, PlusIcon, PencilSquareIcon, SunIcon } from '@heroicons/vue/24/solid'
import {ref, onMounted, watch} from 'vue';
import { toDoListStore } from '@/stores/toDoList.js'

const placeHolderActive = ref(true)
const starActive1 = ref(false)
const starActive2 = ref(false)
const starActive3 = ref(false)
const starActive4 = ref(false)
const starActive5 = ref(false)
const starActive6 = ref(false)
const starActive7 = ref(false)
const buttons = ref(0)
const checkButtons = ref(0)
const enableAddition = ref('')
const storeToDoList = toDoListStore()
const displayFirstSteps = () => ref(storeToDoList.getdisplayFirstSteps)
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

.star-icon  {
  @apply stroke-blue-300 fill-none text-[#333333];
}
</style>