<template>
  <TransitionRoot class="overflow-hidden" appear :show="isOpen" as="template"
      enter="transform transition ease-in-out duration-50 sm:duration-100"
      enter-from="translate-x-full"
      enter-to="translate-x-0"
      leave="transform transition ease-in-out duration-50 sm:duration-100"
      leave-from="translate-x-0"
      leave-to="translate-x-full">
      <section class="modal-details-container-section">
        <div class="modal-details-container">
          <div class="modal-details-group">
            <div class="modal-details-primary hover:bg-[#333333] flex justify-between" @mouseover="hoverActive = true" @mouseout="hoverActive = false">
              <div class="--button">
                <button class="button-check"></button>
              </div>
              <div class="w-[75%] break-words">
                <input @click="cursorActive = !cursorActive" class="--input" :class="cursorActive ? 'cursor-auto' : 'cursor-default'" v-model="props.nameTaskSelected" />
                <!-- {{  }} adicionar nome da tarefa aqui -->
              </div>
              <button v-tippy="{ content: 'Marque a tarefa como importante', placement: 'top', delay: [300, 0], theme: 'light'}" class="w-5 h-5 flex justify-center items-center star-icon mr-5">
                <StarIcon class="w-5 h-5 rounded-full fill-none stroke-blue-300" />
              </button>
            </div>
            <div class="modal-details-primary" @mouseover="hoverActive = true" @mouseout="hoverActive = false">
              <div v-if="!placeHolderActive" class="--button">
                <button class="w-5 h-5">
                  <PlusIcon class="w-full h-full text-blue-400" />
                </button>
    
              </div>
              <div v-if="placeHolderActive" class="--button">
                <button class="button-check"></button>
              </div>
              <div class="w-[80%] break-words">
                <input @blur="placeHolderActive = false" @click="placeHolderActive = true" class="--input" :class="rules" placeholder="Adicionar etapa" />
                <!-- {{  }} adicionar nome da tarefa aqui -->
              </div>
            </div>
          </div>
          <div class="modal-group-two flex justify-between" @mouseover="dayHoverActive = true" @mouseout="dayHoverActive = false">
           <div class="gap-4 flex">
             <div class="flex items-center ml-4">
             <SunIcon class="w-5 h-5 text-blue-400" />
            </div>
            <div class="flex items-center cursor-default">
              <p class="--p">Adicionada a Meu Dia</p>
            </div>
           </div>
           <button v-if="dayHoverActive" class="mr-3 flex items-center transition-all duration-100">
            <XMarkIcon class="w-5 h-5 text-white" />
           </button>
          </div>
          <div class="modal-group-tre">
            <button class="--btn" @mouseover="remindmeHoverActive = 1" @mouseout="remindmeHoverActive = 0">
              <BellIcon class="--icon" :class="remindmeHoverActive === 1 ? 'text-white' : 'text-white opacity-55'" />
              <p :class="remindmeHoverActive === 1 ? 'text-white' : 'text-white opacity-55'">Lembrar-me</p>
            </button>
            <hr class="opacity-15"/>
            <button class="--btn" @mouseover="remindmeHoverActive = 2" @mouseout="remindmeHoverActive = 0">
              <CalendarDaysIcon class="--icon" :class="remindmeHoverActive === 2 ? 'text-white' : 'text-white opacity-55'" />
              <p :class="remindmeHoverActive === 2 ? 'text-white' : 'text-white opacity-55'">Adicionar data de conclusão</p>
            </button>
            <hr class="opacity-15"/>
            <button class="--btn" @mouseover="remindmeHoverActive = 3" @mouseout="remindmeHoverActive = 0">
              <ArrowPathRoundedSquareIcon class="w-5 h-5 ml-4" :class="remindmeHoverActive === 3 ? 'text-white' : 'text-white opacity-55'" />
              <p :class="remindmeHoverActive === 3 ? 'text-white' : 'text-white opacity-55'">Repetir</p>
            </button>
          </div>
          <div class="modal-group-four">
            <button class="--btn" @mouseover="remindmeHoverActive = 4" @mouseout="remindmeHoverActive = 0">
              <TagIcon class="--icon" :class="remindmeHoverActive === 4 ? 'text-white' : 'text-white opacity-55'" />
              <p :class="remindmeHoverActive === 4 ? 'text-white' : 'text-white opacity-55'">Escolha uma categoria</p>
            </button>
          </div>

          <div class="upload-container">

            <a :href="fileURL" target="_blank" v-if="dataUpload !== null" class="modal-group-upload">
              <div class="--selected">
                  <span>{{ dataUpload[0].name.split('.')[1].toUpperCase() }}</span>
              </div>
              <div class="--info">
                <div><span class="text-sm --name">{{ dataUpload[0]?.name }}</span></div>
                <div class="flex">
                  <span class="text-[12px] font-normal">{{ formatFileSize(dataUpload[0]?.size) }} - Arquivo</span>
                </div>
              </div>
              <button>
                <XMarkIcon class="--x-mark" />
              </button>
            </a>
            <hr v-if="dataUpload !== null" class="opacity-15"/>
            <div class="modal-group-upload">
  
                <button @click="uploadFilesActive" class="--btn" @mouseover="remindmeHoverActive = 5" @mouseout="remindmeHoverActive = 0">
                  <PaperClipIcon class="w-5 h-5 ml-4" :class="remindmeHoverActive === 5 ? 'text-white' : 'text-white opacity-55'" />
                  <p :class="remindmeHoverActive === 5 ? '!text-white' : '!text-white opacity-55'">Adicione arquivo</p>
                  <input
                    ref="fileInput"
                    type="file"
                    @change="uploadFiles"
                    class="hidden"
                  />
                </button>
  
            </div>
          </div>

          <div class="text-area-button" :class="taskModel.taskDetails.descr === '' ? 'h-[76px]' : 'h-[92px]'">
            <div>
              <input placeholder="Adicionar anotação" @input="dataInput" v-model="taskModel.taskDetails.descr" />
                <div v-if="taskModel.taskDetails.descr !== ''">
                  <!-- <p>Atualizado há poucos segundos</p> -->
                  <p>{{ diffDay >= 30 ? 'Atualizado em' : 'Atualizado' }} {{ previosTime }}</p>
                </div>
            </div>
          </div>
        </div>
        <div class="line-display">
          <hr/>
        </div>
        <div class="container-bottom-section">
          <button @click="emit('closeDetails')" v-tippy="{ content: 'Ocultar exibição de detalhes', placement: 'top', delay: [300, 0], theme: 'light'}" ><ArrowRightEndOnRectangleIcon class="w-5 h-5 text-white" /></button>
           <span>Criada Hoje</span>
          <button v-tippy="{ content: 'Excluír tarefa', placement: 'top', delay: [300, 0], theme: 'light'}"><TrashIcon class="--btn" /></button>
        </div>
      </section>
  </TransitionRoot>
</template>

<script setup>
import { StarIcon, CheckIcon, PlusIcon, SunIcon, XMarkIcon, BellIcon, CalendarDaysIcon, ArrowPathRoundedSquareIcon, TagIcon, PaperClipIcon, ArrowRightEndOnRectangleIcon, TrashIcon, GlobeAmericasIcon } from '@heroicons/vue/24/solid'
import { 
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionRoot, 
        TransitionChild 
    } from '@headlessui/vue'
  import {ref,computed, onMounted, watch} from 'vue'
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import 'dayjs/locale/pt-br';
  import {formatFileSize} from '@/commons/settingsData'

const props = defineProps({
  isOpen:{
    type:Boolean,
    default:false
  },
  nameTaskSelected:{
    type: String,
    default: ''
  },
  indexSelected:{
    type: Number
  }
})

const emit = defineEmits(['closeDetails'])

dayjs.extend(relativeTime)
dayjs.locale('pt-br');
const cursorActive = ref(false)
const hoverActive = ref(false)
const placeHolderActive = ref(false)
const dayHoverActive = ref(false)
const remindmeHoverActive = ref(0)
const taskModel = computed(()=> JSON.parse(localStorage.getItem('taskList'))[props.indexSelected])
const savedDate = ref(dayjs(JSON.parse(localStorage.getItem('taskList'))[props.indexSelected].updateTime))
const caractersInput = ref('')
const forceUpdate = ref(false)
const currentDate = ref(savedDate.value);
const fileInput = ref(null)
const fileName = ref('')
const dataUpload = ref(null)
const fileURL = ref('')
const hover = ref(false);


let diffDay = ref(0)
const previosTime = computed(() => {
  if (!savedDate.value) return null;

  const now = dayjs();
  const diffInDays = now.diff(savedDate.value, 'day');
  
  diffDay.value = diffInDays
  if (diffInDays >= 30) {
    return savedDate.value.format('DD/MM/YYYY');
  } else {
    return savedDate.value.from();
  }
});

const rules = computed(()=>{
  return {
    'cursor-auto': cursorActive.value,
    'cursor-default': cursorActive.value,
    'placeholder-active': !placeHolderActive.value,
    'placeholder-desactive': placeHolderActive.value,
  }
})

watch(()=>props.nameTaskSelected,()=>{
  console.log('entrei vou atualizar variavel')
  savedDate.value = dayjs(JSON.parse(localStorage.getItem('taskList'))[props.indexSelected].updateTime)
  taskModel.value = JSON.parse(localStorage.getItem('taskList'))[props.indexSelected]
})

const dataInput = (event) => {
  console.log('entrei digitei input')
  forceUpdate.value = !forceUpdate.value
  caractersInput.value = event.target.value

  let result = JSON.parse(localStorage.getItem('taskList')) || []
  result[props.indexSelected].updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')  
  result[props.indexSelected].taskDetails.descr = caractersInput.value
  localStorage.setItem('taskList', JSON.stringify(result))

  savedDate.value = dayjs(JSON.parse(localStorage.getItem('taskList'))[props.indexSelected].updateTime)
  taskModel.value = JSON.parse(localStorage.getItem('taskList'))[props.indexSelected]
}

const updatesPeriodically = () => {
  setInterval(()=>{
    if(currentDate.value) {
      currentDate.value = dayjs(currentDate.value).format('YYYY-MM-DD HH:mm:ss');
    }
  }, 60000)
}

const uploadFilesActive = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const uploadFiles = (event) => {
  if(fileURL.value) URL.revokeObjectURL(fileURL.value);
  dataUpload.value = event.target.files
  
  if (dataUpload.value.length > 0) {
    fileName.value = dataUpload.value[0].name
    console.log(event.target.files[0])
    fileURL.value = URL.createObjectURL(event.target.files[0])
    console.log(fileURL.value)

    const reader = new FileReader();

    reader.onload = (e) => {
      console.log(e.target.result); 

      const blob = new Blob([e.target.result], { type: event.target.files[0].type })
      const newUrl = URL.createObjectURL(blob)
      console.log(newUrl)

      // window.open(newUrl)
    };

    reader.readAsText(event.target.files[0]);
  } else fileName.value = ''
}

onMounted(()=>{
  updatesPeriodically();
})

</script>

<style scoped>

.modal-details-container-section{
  @apply absolute w-[30%] h-full flex flex-col;
}

.modal-details-container {
  @apply w-full h-full bg-[#222222] overflow-hidden px-6 border-white border-t border-opacity-25 overflow-y-auto;
}

.modal-group-two {
  @apply w-full h-[52px] flex gap-3 mt-2 bg-[#272727] hover:bg-[#333333] rounded-[5px] transition-all duration-75;
}

.modal-group-two:nth-child(2) button {
  @apply w-8 justify-center ml-20 ;
}

.modal-group-two .--p {
  @apply text-blue-300 text-sm font-normal;
}

.modal-group-tre {
  @apply w-full h-[156px] flex flex-col gap-0 mt-2 bg-[#272727] rounded-[5px] transition-all duration-75;
}

.modal-group-two .--btn {
  @apply w-full h-[33%] flex gap-4 items-center hover:bg-[#333333] transition-all duration-75;
}

.modal-group-tre .--btn {
  @apply w-full h-[33%] flex gap-4 items-center hover:bg-[#333333] transition-all duration-75;
}

.modal-group-tre .--btn .--icon {
  @apply w-5 h-5 ml-4 stroke-white fill-none;
}

.modal-group-tre p {
  @apply text-sm font-normal;
}

.modal-group-four {
  @apply w-full h-[52px] flex gap-3 mt-2 bg-[#272727] hover:bg-[#333333] rounded-[5px] transition-all duration-75;
}

.modal-group-four .--btn {
  @apply w-full flex gap-4 items-center hover:bg-[#333333] transition-all duration-75;
}

.modal-group-four .--icon {
  @apply w-5 h-5 ml-4 stroke-white fill-none;
}

.modal-group-four p {
  @apply text-sm font-normal;
}
.modal-group-four input {
  @apply text-sm font-normal w-full h-[22px] border-transparent focus:outline-none bg-transparent cursor-pointer;
}

.modal-group-four input::placeholder{
  @apply text-white;
}

/*  */

.upload-container {
  @apply mt-2;
}

.upload-container .modal-group-upload {
  @apply w-full h-[52px] flex gap-3 bg-[#272727] hover:bg-[#333333] rounded-[5px] transition-all duration-75;
}

.upload-container .modal-group-upload .--btn {
  @apply w-full flex gap-4 items-center hover:bg-[#333333] transition-all duration-75;
}

.upload-container .modal-group-upload .--icon {
  @apply w-5 h-5 ml-4 stroke-white fill-none;
}

.upload-container .modal-group-upload p {
  @apply text-sm font-normal;
}
.upload-container .modal-group-upload input {
  @apply text-sm font-normal w-full h-[22px] border-transparent focus:outline-none bg-transparent cursor-pointer;
}

.upload-container .modal-group-upload {
  @apply flex items-center;
}

.upload-container .modal-group-upload .--selected {
  @apply h-9 w-9 bg-blue-600 ml-3 rounded-[4px] flex justify-center items-center text-white text-[12px] font-semibold;
}

.modal-group-upload input::placeholder{
  @apply text-white;
}

.modal-group-upload .--info {
  @apply w-[80%] my-2;
}

.modal-group-upload .--info span{
  @apply text-white font-normal opacity-45;
}

.modal-group-upload button {
  @apply sticky right-[3%];
}

.modal-group-upload .--x-mark {
  @apply w-[18px] h-[18px] text-white;
}

.modal-group-upload:hover .--info .--name {
  @apply hover:border-b-[1px] hover:border-blue-300;
}

.text-area-button {
  @apply w-full p-4 mt-2 bg-[#272727] hover:border-[1px] hover:border-white hover:border-opacity-25 rounded-[5px];
} 


.text-area-button div {
  @apply w-full h-full flex flex-col justify-between;
}

.text-area-button div div {
  @apply h-[17px] flex justify-center !transition-all !duration-1000;
}

.text-area-button p {
  @apply h-[18px] font-normal text-[12px] text-white opacity-30;
}

.text-area-button input {
  @apply w-full h-[20px] text-white font-normal text-[14px] border-transparent focus:outline-none bg-transparent transition-all duration-75 outline-none;
}

.text-area-button input::placeholder{
  @apply text-white opacity-55;
}

.modal-details-group {
  @apply w-full h-[104px] mt-5 bg-[#272727] rounded-[5px];
}

.modal-details-primary {
  @apply min-h-[50%] flex items-center;
}

.modal-details-container .--button {
  @apply w-7 h-7 flex justify-center items-center ml-3 transition-all duration-75;
}

.modal-details-container .--button .button-check {
  @apply w-[60%] h-[60%] rounded-full border border-blue-300 flex justify-center items-center;
}

.modal-details-container .--input {
  @apply text-white font-semibold ml-3 border-transparent focus:outline-none bg-transparent transition-all duration-75 outline-none;
}

::placeholder{
  @apply text-blue-400 text-sm font-normal;
}

.placeholder-active::placeholder {
  color: rgb(147, 184, 253);
  font-size: 14px;
}

.placeholder-desactive::placeholder {
  @apply text-[14px] text-[#888888];
}

.container-bottom-section {
  @apply w-full h-[60px] bg-[#222222] p-6 flex justify-between items-center;
}

.container-bottom-section span {
  @apply text-white font-light text-[13px] opacity-60 cursor-default;
}

.container-bottom-section .--btn {
  @apply w-5 h-5 text-white stroke-white fill-none;
}

.line-display {
  @apply w-full bg-[#444444] px-6 flex justify-center opacity-30;
}

.line-display hr{
  @apply w-full;
}

::-webkit-scrollbar {
  @apply bg-[#222222] w-[7.5px];
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.8s ease, opacity 0.8s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to, .slide-leave {
  transform: translateX(0);
  opacity: 1;
}

</style>