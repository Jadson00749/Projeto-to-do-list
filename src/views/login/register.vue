<template>
  <section class="login-container-action">
    <div class="login-card-container">
      <div class="relative">
        <div class="--section relative">
          <div class="--title">
            <div class="--adjustment">
              <UserPlusIcon class="--icon" />
              <p>Cadastre-se</p>
            </div>
          </div>
          <div class="--content">
            <div class="relative mt-5">
              <input placeholder="Número do celular ou email" v-model="userInformation.email" class="place-holder-adjustment" @input="userEmail = $event.target.value" :class="userEmail !== '' ? 'border-transparent' : 'border-red-400'" />
              <UserIcon class="w-6 h-6 text-white absolute top-4 left-3 opacity-40" />
            </div>
            <div class="relative">
              <input placeholder="Nome completo" v-model="userInformation.name" class="place-holder-adjustment" @input="userEmail = $event.target.value" :class="userEmail !== '' ? 'border-transparent' : 'border-red-400'" />
              <IdentificationIcon class="w-6 h-6 text-white absolute top-4 left-3 opacity-40" />
            </div>
            <div class="relative">
              <input :type="typePassWord ? '' : 'password'" v-model="userInformation.password" placeholder="Insira uma senha" class="place-holder-adjustment" />
              <LockClosedIcon class="w-[21px] h-[21px] text-white absolute top-3 left-3 opacity-40" />
              
              <button @click="typePassWord = !typePassWord">
                <EyeIcon v-if="typePassWord" class="w-6 h-6 text-white absolute top-3 left-[90%] opacity-40 transition-all duration-300" />
                <EyeSlashIcon v-else class="w-6 h-6 text-white absolute top-3 left-[90%] opacity-40 transition-all duration-300" />
              </button>
            </div>
            <div class="relative">
              <input :type="typeConfirmPassWord ? '' : 'password'" @input="userConfirmPassword = $event?.target.value" placeholder="Confirmar senha" class="place-holder-adjustment" />
              <LockClosedIcon class="w-[21px] h-[21px] text-white absolute top-3 left-3 opacity-40" />
              <button @click="typeConfirmPassWord = !typeConfirmPassWord">
                <EyeIcon v-if="typeConfirmPassWord" class="w-6 h-6 text-white absolute top-3 left-[90%] opacity-40 transition-all duration-300" />
                <EyeSlashIcon v-else class="w-6 h-6 text-white absolute top-3 left-[90%] opacity-40 transition-all duration-300" />
              </button>
            </div>
            <div class="--info opacity-80">
              <div class="flex gap-4" :class="rules">
                <CheckCircleIcon class="w-5 h-5" />
                <span>8 caracteres</span>
              </div>
              <div class="flex gap-4" :class="caracterSpecial">
                <CheckCircleIcon class="w-5 h-5" />
                <span>1 caractere especial(!,@,*,#,%)</span>
              </div>
              <div class="flex gap-4" :class="rulesCaracteres">
                <CheckCircleIcon class="w-5 h-5" />
                <span>1 letra(a,b,c, ...)</span>
              </div>
              <div class="flex gap-4" :class="rulesNumber">
                <CheckCircleIcon class="w-5 h-5" />
                <span>1 número(1,2,3, ...)</span>
              </div>
            </div>
            <div>
              <button @click="validateLoginAndCreateAccount" class="--btn-save">Cadastrar-se</button>
            </div>
          </div>
        </div>
        <span class="--btn-section">Tem uma conta? <button @click="router.push('/')">Conecte-se</button></span>
      </div>
    </div>
    <Loader v-if="displaySection" :loading="displaySection" />
  </section>
</template>

<script setup>
import { UserIcon, KeyIcon, EyeIcon, EyeSlashIcon, UserPlusIcon, PhoneIcon, IdentificationIcon, LockClosedIcon, CheckCircleIcon } from '@heroicons/vue/24/solid';
import { ref, computed, onMounted, watch } from 'vue'
import Loader from '@/components/Loader.vue';
import router from '@/router';
import { useToast } from "vue-toastification";
import dayjs from 'dayjs';
import { dataStorage } from '@/commons/settingsData';

const toast = useToast();
const typePassWord = ref(false)
const typeConfirmPassWord = ref(false)
const userEmail = ref(null)
const userConfirmPassword = ref('')
const displaySection = ref(true)
const maxId = ref(0)
const userInformation = ref({
  id: maxId.value,
  email: '',
  name: '',
  password: '',
  creationDate: ''
})

function validateLoginAndCreateAccount() {
  if(!userInformation.value.email || !userInformation.value.name) return toast.error('Preencha todos os campos obrigatórios!')
  if(!userInformation.value.password.length) return toast.error('Por favor, insira a senha!')
  if(userInformation.value.password === userConfirmPassword.value) {
      if(validatedRules()) {
        userInformation.value.id = maxId.value += 1
        userInformation.value.creationDate = dayjs().format('DD/MM/YYYY HH:mm:ss')
        
        dataStorage.setStorage(userInformation.value.id, [userInformation.value])
        
        toast.success('Cadastro realizado com sucesso!')
        router.push('/')

      }
  } else toast.warning("As senhas devem ser iguais!", {
          position: "top-right",
          timeout: 7581,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
        });
}

function validatedRules(){
  if(rules.value['text-green-400 transition-all duration-400'] && rulesCaracteres.value['text-green-400 transition-all duration-400'] && rulesNumber.value['text-green-400 transition-all duration-400'] && caracterSpecial.value['text-green-400 transition-all duration-400']) return true
  return false
}

const rules = computed(()=>{
  return {
    'text-white': userInformation.value?.password === '',
    'text-red-400 transition-all duration-400': userInformation.value?.password !== '' && userInformation.value?.password.length < 8,
    'text-green-400 transition-all duration-400': userInformation.value?.password.length >= 8
  }
})


const rulesCaracteres = computed(()=>{
  return {
    'text-white': userInformation.value?.password === '',
    'text-green-400 transition-all duration-400': /[a-zA-Z]/.test(userInformation.value?.password),
    'text-red-400 transition-all duration-400': !/[a-zA-Z]/.test(userInformation.value?.password)
  }
})

const rulesNumber = computed(()=>{
  return {
    'text-white': userInformation.value?.password === '',
    'text-green-400 transition-all duration-400': /\d/.test(userInformation.value?.password),
    'text-red-400 transition-all duration-400': !/\d/.test(userInformation.value?.password)
  }
})

const caracterSpecial = computed(()=>{
  return {
    'text-white': userInformation.value?.password === '',
    'text-green-400 transition-all duration-400': /[!@#\$%\^\&*\)\(+=._-]/.test(userInformation.value?.password),
    'text-red-400 transition-all duration-400': !/[!@#\$%\^\&*\)\(+=._-]/.test(userInformation.value?.password)
  }
})

onMounted(()=>{
  setTimeout(()=>{
    displaySection.value = false
  }, 1000)
  maxId.value = dataStorage.biggestId().maxId
})

</script>

<style scoped>

.login-container-action {
  @apply bg-[#252525] w-full h-full absolute top-0 overflow-x-auto;
}

.login-container-action::-webkit-scrollbar {
  @apply bg-[#222222] w-[7.5px];
}

.login-card-container {
  @apply  h-[90%] flex flex-col items-center justify-between relative;
}

.login-card-container .--section {
  @apply border-[0.5px] border-white border-opacity-20 w-[400px] h-[550px] rounded-[30px] bg-[#262626] bg-opacity-70 mt-[10%];
}

.login-card-container .--title {
  @apply h-[15%] flex flex-col justify-center items-center gap-3 border-b-[0.5px] border-white border-opacity-25;
}

.login-card-container .--title .--adjustment {
  @apply flex w-full h-full justify-center gap-3 items-center mt-2;
}

.login-card-container .--title .--icon {
  @apply ml-5 w-8 h-8 text-blue-300 ;
}

.login-card-container .--title p {
  @apply text-[25px] mr-4 text-start font-normal text-blue-300;
}

.login-card-container .--content {
  @apply absolute bottom-0 h-[calc(100%-15%)] w-full flex flex-col gap-3 px-8 ;
}

.place-holder-adjustment::placeholder {
  @apply font-normal text-[16px] text-white opacity-35;
}

.login-card-container .--content input {
  @apply border w-full h-12 rounded-[8px] focus:outline-none bg-[#333333] pl-12 font-normal text-[16px] text-white border-transparent;
}

.login-card-container .--section .--info{
  @apply w-full h-full flex flex-col mt-2;
}

.login-card-container .--section .--info span{
  @apply font-semibold text-[16.5px];
}

.login-card-container .--content .--btn-save {
  @apply mb-8 w-full h-12 rounded-[30px] text-white font-semibold text-opacity-85 bg-white bg-opacity-5 border-[0.2px] border-white border-opacity-15 mt-3 hover:bg-white hover:bg-opacity-10 transition-all duration-100;
}

.login-card-container .--btn-section {
  @apply absolute mt-2 w-full text-center text-white opacity-75 text-[16px] font-normal;
}

.login-card-container .--btn-section button {
  @apply text-blue-500 font-bold;
}

</style>