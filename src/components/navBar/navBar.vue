<template>
  <nav class="navbar-section">
    <div class="flex navbar-section-container">
      <button class="navbar-section-btn">
        <Bars3Icon class="w-5 h-5" />
      </button>
      <div class="navbar-section-title">
        <h1 class="w-[60px] text-center">To Do</h1>
      </div>
      <div class="navbar-section-input">
        <div class="relative h-[65%]">
          <input 
          v-model="eventInput" 
          v-tippy="{ content: 'Pesquisar', placement: 'left', delay: [300, 0], allowHTML: true, theme: 'search-tooltip'}"
          :placeholder="displayPlaceHolder" 
          @input="inputCaracters" 
          @click="visiblePlaceHolder()" 
          @blur="displayPlaceHolder = '', eventInput.length ? '' : inputClicked = false" 
          class="h-full w-[400px] rounded-[4px] bg-[#222222] pl-10 border-transparent focus:outline-none place-holder-adjustment" 
          :class="inputClicked ? 'cursor-auto' : 'cursor-pointer'" 
          />
          <button class="absolute left-2 h-full">
            <MagnifyingGlassIcon class="w-5 h-5 text-blue-400" />
          </button>
          <button v-if="eventInput != ''"  @click="limpForm()" class="absolute left-[94%] top-[7px]" v-tippy="{ content: 'Sair da pesquisa', placement: 'bottom', delay: [300, 0], theme: 'light'}">
            <XMarkIcon class="w-[17px] h-[17px] text-blue-400" />
          </button>
        </div>
      </div>
      <div class="navbar-section-icons-container">
        <button v-tippy="{ content: 'Configurações', placement: 'bottom', delay: [300, 0], theme: 'light' }" class="navbar-section-icons-container-btn"><Cog6ToothIcon class="w-5 h-5" /></button>
        <button v-tippy="{ content: 'Ajuda e comentários', placement: 'bottom', delay: [300, 0], theme: 'light' }" class="navbar-section-icons-container-btn"><QuestionMarkCircleIcon class="w-5 h-5" /></button>
        <button v-tippy="{ content: 'Novidades', placement: 'bottom', delay: [300, 0], theme: 'light' }" class="navbar-section-icons-container-btn"><NewspaperIcon class="w-5 h-5" /></button>
        <button v-tippy="{ content: 'Gerente de contas de Jadson Santos', placement: 'bottom', delay: [300, 0], theme: 'light' }" class="navbar-section-icons-container-btn"><UserCircleIcon class="w-5 h-5" /></button>
      </div>
    </div>
    <div class="relative">
      <div class="absolute inset-x-0 bottom-0 h-[0.1px] bg-white opacity-30">
      </div>
    </div>
    <modalLogOff :isOpen="true" />
  </nav>
</template>

<script setup>
import modalLogOff from '../modal/modalLogOff.vue';
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon, Cog6ToothIcon, QuestionMarkCircleIcon, NewspaperIcon, UserCircleIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue';
import { toDoListStore } from '@/stores/toDoList.js'

const storeToDoList = toDoListStore()
const inputClicked = ref(false);
const displayPlaceHolder = ref('')
const eventInput = ref('')

const inputCaracters = (event) => {
  eventInput.value = event.target.value
}

const limpForm = () => {
  eventInput.value = ''
  inputClicked.value = false
}

const visiblePlaceHolder = () => {
  inputClicked.value = true
  displayPlaceHolder.value = 'Pesquisar'
  storeToDoList.setInputDisplay(false)
}

</script>

<style scoped>

.navbar-section {
  @apply h-12 bg-[#191919] text-[#f7f7f7] ;
}

.navbar-section-container {
  @apply w-full h-full;
}

.navbar-section-btn {
  @apply h-full w-[50px] flex justify-center items-center hover:bg-[#202020];
}

.navbar-section-title {
  @apply flex justify-center items-center;
}

.navbar-section-input {
  @apply w-[80%] h-full flex justify-center items-center relative;
}
 
.navbar-section-icons-container {
  @apply w-[13%] flex;
}
 
.navbar-section-icons-container-btn {
  @apply w-[25%] flex justify-center items-center;
}

.place-holder-adjustment::placeholder {
  @apply font-[360] text-[14.5px] ;
}

</style>

