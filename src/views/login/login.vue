<template>
  <section class="login-container-action">
    <div class="login-card-container">
      <div class="--section relative">
        <div class="--title">
          <div class="rounded-full w-12 h-12 bg-[#333333]"></div>
          <p>Power To Do</p>
        </div>
        <div class="--content">
          <div class="relative">
            <input placeholder="Email" class="place-holder-adjustment" v-model="user.email" :class="!validActive ? 'border border-transparent' : 'border !border-red-300'" />
            <UserIcon class="w-6 h-6 text-white absolute top-3 left-3 opacity-40" />
          </div>
          <div class="relative">
            <input :type="typePassWord ? '' : 'password'" v-model="user.password" placeholder="Password" class="place-holder-adjustment" :class="!validActive ? 'border border-transparent' : 'border !border-red-300'" />
            <LockClosedIcon class="w-[21px] h-[21px] text-white absolute top-3 left-3 opacity-40" />
            
            <button @click="typePassWord = !typePassWord">
              <EyeIcon v-if="typePassWord" class="w-6 h-6 text-white absolute top-3 left-[90%] opacity-40 transition-all duration-300" />
              <EyeSlashIcon v-else class="w-6 h-6 text-white absolute top-3 left-[90%] opacity-40 transition-all duration-300" />
            </button>
          </div>
        </div>
        <div class="--actions absolute">
          <button @click="login()">Sign in</button>
          <div class="relative">
            <button><span class="ml-8">Sign in with Google</span></button>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 48 48" class="absolute top-6 left-[80px]">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
          </div>
          <span class="--info">Não tem uma conta? <strong @click="router.push('./register')">Cadastre-se</strong></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { UserIcon, KeyIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/vue/24/solid';
import { ref, computed, watch } from 'vue'
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { dataStorage } from '@/commons/settingsData';
import { toDoListStore } from '@/stores/toDoList';

const storeToDoList = toDoListStore();
const toast = useToast();
const router = useRouter();
const typePassWord = ref(false)
const validActive = ref(false)
const storages = ref(dataStorage.biggestId().storages)
const user = ref({
  email: '',
  password: ''
})

function login() {
  if(!user.value.email || !user.value.password ) {
    validActive.value = true
    return toast.error('Preencha todos os campos obrigatórios!')
  } {
    validActive.value = false
    let emailFound = false;

    for(let i = 0; i < storages.value.length; i++) {
      for(let b = 0; b < storages.value[i].value.length; b++) {
        if(Object.keys(storages.value[i].value[b]).includes('email')){
          if(user.value?.email === storages.value[i].value[b].email && user.value?.password === storages.value[i].value[b].password && storages.value[i].key !== 'lastSession'){
            emailFound = true;
            toast.success('Bem vindo (a) ao Power To Do.')
            storeToDoList.setKeyName(storages.value[i].key)
            dataStorage.setStorage('lastSession', [storages.value[i].value[b]])
            router.push('/tasks')
            break
          }
        }
      }
    }
    if(!emailFound) {
      toast.error('Nome de usuário ou senha incorretos.')
    }
  }
}

</script>

<style scoped>

.login-container-action {
  @apply bg-[#252525] w-full h-full absolute top-0 overflow-hidden;
}
.login-container-action::-webkit-scrollbar-thumb {
  @apply bg-[#444444];
} 

.login-card-container {
  @apply w-full h-full flex justify-center items-center;
}

.login-card-container .--section {
  @apply border-[0.5px] border-white border-opacity-20 w-[400px] h-[500px] rounded-[30px] bg-[#252525] bg-opacity-70;
}

.login-card-container .--title {
  @apply h-[30%] flex flex-col justify-center items-center gap-3;
}

.login-card-container .--title p {
  @apply w-[50%] text-[30px] text-center font-normal text-white;
}

.login-card-container .--content {
  @apply  h-[30%] flex flex-col justify-center gap-3 px-8;
}

.place-holder-adjustment::placeholder {
  @apply font-normal text-[16px] text-white opacity-35;
}

.login-card-container .--content input {
  @apply border w-full h-12 rounded-[8px] focus:outline-none bg-[#333333] pl-12 font-normal text-[16px] text-white;
}

.login-card-container .--actions {
  @apply  absolute bottom-0 w-full h-[40%] flex flex-col px-8;
} 

.login-card-container .--actions button{
  @apply w-full h-12 rounded-[30px] text-white font-semibold text-opacity-45 bg-white bg-opacity-5 border-[0.2px] border-white border-opacity-15 mt-3 hover:bg-white hover:bg-opacity-10 transition-all duration-100;
} 

.login-card-container .--actions .--info{
  @apply mt-5 text-white font-normal text-[15px] text-opacity-35 text-center;
} 

.login-card-container .--actions .--info strong {
  @apply mt-2 text-blue-400 text-[15px] text-center cursor-pointer;
} 

</style>