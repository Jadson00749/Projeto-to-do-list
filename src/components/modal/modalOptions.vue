<template>
  <div class="inset-0 flex items-center justify-center">
    <TransitionRoot appear :show="open" as="template">
      <Dialog as="div" @close="emit('close')" class="relative z-0">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed bg-black/25" />
        </TransitionChild>
  
        <div class="fixed overflow-y-hidden w-[242px] h-[393px]" :style="{ top: modalTop + 'px', left: modalLeft + 'px', right: modalRight + 'px', bottom: modalBottom + 'px'}">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-sm  transform overflow-hidden rounded-[5px] bg-[#222222] text-left align-middle shadow-xl transition-all pt-[10px] z-50"
              >
              <button @click="emit('removeDay')" class="w-full h-[36px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <SunIcon class="ml-4 h-[21px] w-[21px] text-white" />
                <p class="text-white font-sm text-[15px]">Remover de Meu Dia</p>
              </button>
              <button v-if="!statusActive" @click="emit('importantChecked')" class="w-full h-[36px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <StarIcon class="ml-4 h-[21px] w-[21px] stroke-white fill-none text-[#333333]" />
                <p class="text-white font-sm text-[15px]">Marcar como Importante</p>
              </button>
              <button v-if="statusActive" @click="emit('importantChecked')" class="relative w-full h-[36px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <StarIcon class="ml-4 h-[21px] w-[21px] stroke-white fill-none text-[#333333]" />
                <MinusIcon class="ml-4 h-[36px] w-[36px] text-white absolute transform rotate-45 left-[-7px] top-[1px] opacity-90" />
                <p class="text-white font-sm text-[15px]">Remover a importancia</p>
              </button>
              <button v-if="!statusImportant" @click="emit('markCompleted', true)" class="w-full h-[36px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <CheckCircleIcon class="ml-4 h-[21px] w-[21px] text-white stroke-white fill-none" />
                <p class="text-white font-sm text-[15px]">Marcar como concluída</p>
              </button>
              <button v-if="statusImportant" @click="emit('markCompleted', false)" class="w-full h-[36px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <div class="ml-[19px] h-[16px] w-[16px] stroke-white fill-none text-white border border-white rounded-full"></div>
                <p class="text-white font-sm text-[15px]">Marcar como não concluída</p>
              </button>
              <hr class="opacity-20 mt-2 mb-2">
              <button v-if="!todayConcluded" @click="emit('completedToday', true)" class="w-full h-[36px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <DocumentArrowUpIcon class="ml-4 h-[21px] w-[21px] stroke-white fill-none text-white" />
                <p class="text-white font-sm text-[15px]">Concluír hoje</p>
              </button>
              <button v-if="todayConcluded" @click="emit('completedToday', false)" class="relative w-full h-[36px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <DocumentArrowUpIcon class="ml-4 h-[21px] w-[21px] stroke-white fill-none text-white" />
                <div class="absolute left-[10px] top-[19px]">
                  <XCircleIcon class="ml-4 h-3 w-3 text-white" />
                </div>
                <p class="text-white font-sm text-[15px] truncate">Remover data conclusão</p>
              </button>
              <button @click="emit('completedToday', 'tomorrow')" class="relative w-full h-[36px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <ClipboardIcon class="ml-4 h-[21px] w-[21px] stroke-white fill-none text-white" />
                <div class="absolute left-[10px] top-[19px]">
                  <ArrowRightCircleIcon class="absolute ml-4 h-3 w-3 text-white" />
                </div>
                <p class="text-white font-sm text-[15px]">Concluír amanhã</p>
              </button>
              <hr class="opacity-20 mt-2 mb-2">
              <button @click="emit('createListTask')" class="relative w-full h-[36px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <Bars3Icon class="ml-4 h-[21px] w-[21px] text-white" />
                <div class="absolute left-[10px] top-[17px]">
                  <PlusCircleIcon class="absolute ml-4 h-3 w-3 text-white" />
                </div>
                <p class="text-white font-sm text-[15px]">Criar nova lista desta tarefa</p>
              </button>
              <button @mouseenter="moveTaskTo" @mouseleave="hideOptions" class="first-div relative w-full h-[36px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <Bars3Icon class="ml-4 h-[21px] w-[21px] text-white" />
                <div class="absolute left-[10px] top-[17px]">
                  <ArrowLeftCircleIcon class="absolute ml-4 h-3 w-3 text-white" />
                </div>
                <div class="w-full text-start flex items-center">
                  <p class="text-white font-sm text-[15px]">Mover tarefa para...</p>
                  <ChevronRightIcon v-if="!moveTaskCopy" class="h-[18px] w-[18px] text-white ml-9 opacity-45" />
                </div>
              </button>
              <button @click="openModalOptionsCopyAndMove = !openModalOptionsCopyAndMove" @mouseover="moveTaskActive = !moveTaskActive" @mouseout="moveTaskActive = !moveTaskActive" class="w-full h-[36px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <DocumentDuplicateIcon class="ml-4 h-[21px] w-[21px] stroke-white fill-none text-white" />
                <div class="w-full text-start flex items-center">
                  <p class="text-white font-sm text-[15px]">Copiar tarefa para...</p>
                  <ChevronRightIcon v-if="!moveTaskActive" class="h-[18px] w-[18px] text-white ml-9 opacity-45" />
                </div>
              </button>
              <hr class="opacity-20 mt-2 mb-2">
              <button @click="emit('removeTask')" class="mb-2 w-full h-[36px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <TrashIcon class="ml-4 h-[21px] w-[21px] text-red-400" />
                <p class="text-red-400 font-sm text-[15px]">Excluír tarefa</p>
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>

        <transition name="slide">
        <div v-if="displayMoveTask"
                class="second-div w-[185px] h-[180px] fixed transform overflow-hidden rounded-[5px] bg-[#222222] text-left align-middle shadow-xl transition-all z-50" :style="{ top: 218 + modalTop + 'px', left: !activeAdjustModal ? 242 + modalLeft + 'px' : modalLeft - 185 + 'px', right: rightMoveTask + 'px', bottom: bottomMoveTask + 'px'}"
              >
              <button class="w-full h-[36px] mt-[6px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <FlagIcon class="ml-4 h-4 w-4 text-white stroke-white fill-none" />
                <p class="text-white font-sm text-[14px]">Flagged Emails</p>
              </button>
              <button class="w-full h-[36px] mt-[6px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <HomeIcon class="ml-4 h-4 w-4 text-white stroke-white fill-none" />
                <p class="text-white font-sm text-[14px]">Tarefas</p>
              </button>
              <button class="w-full h-[36px] mt-[6px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <Bars3Icon class="ml-4 h-4 w-4 text-white stroke-white fill-none" />
                <p class="text-white font-sm text-[14px]">Primeiros passos</p>
              </button>
              <button class="w-full h-[36px] mt-[6px] flex items-center gap-3 hover:bg-[#333333] transition-all duration-100"> 
                <Bars3Icon class="ml-4 h-4 w-4 text-white stroke-white fill-none" />
                <p class="text-white font-sm text-[14px]">Compras</p>
              </button>
          </div>
        </transition>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { SunIcon, StarIcon, CheckCircleIcon, DocumentArrowUpIcon, ClipboardIcon, Bars3Icon, DocumentDuplicateIcon, TrashIcon, MinusIcon, XCircleIcon, ArrowRightCircleIcon, PlusCircleIcon, ArrowLeftCircleIcon, ChevronRightIcon, FlagIcon, HomeIcon } from '@heroicons/vue/24/solid'
import { TransitionGroup, onMounted, ref } from 'vue'
import { defineProps } from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const props = defineProps({
  open:{
    type: Boolean,
    default: false
  },
  modalLeft:{
    type: Number
  },
  modalTop:{
    type: Number
  },
  modalRight:{
    type: Number
  },
  modalBottom:{
    type: Number
  },
  statusActive:{
    type: Boolean,
    default:false
  },
  statusImportant:{
    type: Boolean,
    default:false
  },
  todayConcluded:{
    type: Boolean,
    default:false
  }
})

const emit = defineEmits(['importantChecked','close','removeDay','markCompleted','completedToday','removeTask','createListTask'])

let moveTaskActive = ref(false)
let moveTaskCopy = ref(false)
let openModalOptionsCopyAndMove = ref(false)
let displayMoveTask = ref(false)
let activeAdjustModal = ref(false)
const leftMoveTask = ref(0)
const rightMoveTask = ref(0)
const topMoveTask = ref(0)
const bottomMoveTask = ref(0)

const moveTaskTo = (event) => {
  moveTaskCopy.value = !moveTaskCopy.value
  let maxWidth = window.innerWidth
  let componentWidth = 390
  let limitWidth = maxWidth - componentWidth
  
  topMoveTask.value = event.clientY
  leftMoveTask.value = event.clientX
  
  if(event.clientX > limitWidth){
    activeAdjustModal.value = true
  }else {
    activeAdjustModal.value = false
  }

  displayMoveTask.value = true

}

const hideOptions = (event) => {
  const firstDiv = document.querySelector('.first-div');
  if (firstDiv) {
    const rect = firstDiv.getBoundingClientRect();
    const isInFirstDiv = rect.left <= event.clientX && event.clientX <= rect.right && rect.top <= event.clientY && event.clientY <= rect.bottom;
    if (!isInFirstDiv) {
      displayMoveTask.value = false;
    }
  } else {
    displayMoveTask.value = false;
  }
}

</script>

<style scoped>

.slide-enter-active {
  transition: transform 0.5s;
}

.slide-enter-from {
  transform: translateX(-15%);
}

.slide-enter-to {
  transform: translateX(0);
}

/* Removendo a transição para a saída */
.slide-leave-active {
  transition: none;
}

.slide-leave-from,
.slide-leave-to {
  transform: translateX(0);
}

</style>
