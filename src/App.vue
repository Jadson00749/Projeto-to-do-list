<template>
  <div class="container-top">
      <navBar />
      <div class="flex h-[calc(100%-48px)] w-full">
        <menuLeft />
         <modalContent :displayIconSun="displayIconSun" />
      </div>
      <Loader :loading="loading()" />
    </div>
</template>
<script setup>
// import axios from 'axios';
// import { TrashIcon, PencilIcon, CheckCircleIcon, PaperAirplaneIcon } from '@heroicons/vue/24/solid'
import { onMounted, ref,watch } from 'vue'
import navBar from '@/components/navBar/navBar.vue'
import menuLeft from '@/components/sections/menuLeft.vue'
import modalContent from '@/components/sections/modal/content/modalContent.vue'
import Loader from '@/components/Loader.vue'
import Loaderv2 from '@/components/Loaderv2.vue'
import { toDoListStore } from '@/stores/toDoList.js'

const storeToDoList = toDoListStore()
const displayIconSun = ref(false)
const loading = () => storeToDoList.loading
const setLoading = (val) => storeToDoList.setLoading(val)
const setDefault = (val) => storeToDoList.setdisplayDefault(val)

onMounted(()=>{
  setLoading(true)
  setTimeout(()=>{
    setLoading(false)
    setDefault(true)
  }, 1000)
})

</script>

<style scoped>
/* 
body {
  @apply bg-black;
} */

.container-top {
  @apply h-[100vh] w-full bg-[#111111] absolute;
}
/* .section-list-items {
  @apply h-[695px] w-[500px] bg-[#202020] text-[#f7f7f7];
} */
</style>
