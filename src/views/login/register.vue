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
              <input placeholder="Número do celular ou email" class="place-holder-adjustment" @input="userEmail = $event.target.value" :class="userEmail !== '' ? 'border-transparent' : 'border-red-400'" />
              <UserIcon class="w-6 h-6 text-white absolute top-4 left-3 opacity-40" />
            </div>
            <div class="relative">
              <input placeholder="Nome completo" class="place-holder-adjustment" @input="userEmail = $event.target.value" :class="userEmail !== '' ? 'border-transparent' : 'border-red-400'" />
              <IdentificationIcon class="w-6 h-6 text-white absolute top-4 left-3 opacity-40" />
            </div>
            <div class="relative">
              <input :type="typePassWord ? '' : 'password'" v-model="userPassword" placeholder="Insira uma senha" class="place-holder-adjustment" />
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
              <button class="--btn-save">Cadastrar-se</button>
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
import { ref, computed, onMounted } from 'vue'
import Loader from '@/components/Loader.vue';
import router from '@/router';

const typePassWord = ref(false)
const typeConfirmPassWord = ref(false)
const userEmail = ref(null)
const userPassword = ref('')
const userConfirmPassword = ref(null)
const displaySection = ref(true)

const rules = computed(()=>{
  return {
    'text-white': userPassword.value === '',
    'text-red-400 transition-all duration-400': userPassword.value !== '' && userPassword.value.length < 8,
    'text-green-400 transition-all duration-400': userPassword.value.length >= 8
  }
})

const rulesCaracteres = computed(()=>{
  return {
    'text-white': userPassword.value === '',
    'text-green-400 transition-all duration-400': /[a-zA-Z]/.test(userPassword.value),
    'text-red-400 transition-all duration-400': !/[a-zA-Z]/.test(userPassword.value)
  }
})

const rulesNumber = computed(()=>{
  return {
    'text-white': userPassword.value === '',
    'text-green-400 transition-all duration-400': /\d/.test(userPassword.value),
    'text-red-400 transition-all duration-400': !/\d/.test(userPassword.value)
  }
})

const caracterSpecial = computed(()=>{
  return {
    'text-white': userPassword.value === '',
    'text-green-400 transition-all duration-400': /[!@#\$%\^\&*\)\(+=._-]/.test(userPassword.value),
    'text-red-400 transition-all duration-400': !/[!@#\$%\^\&*\)\(+=._-]/.test(userPassword.value)
  }
})

onMounted(()=>{
  setTimeout(()=>{
    displaySection.value = false
  }, 1000)
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