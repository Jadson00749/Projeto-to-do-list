<template>
  <section v-if="isOpen" class="log-off-section">
    <div class="--headers-section">
      <div class="--logo">
        <svg class="w-[25px] h-[25px] drop-shadow-md bg-[#343434] rounded-full p-[5px] border border-white border-opacity-10" xmlns="http://www.w3.org/2000/svg" width="299.641" height="305.19" viewBox="0 0 299.641 305.19">
          <path id="start-icon" d="M149.82,0s30.056,130.861,149.82,153.982c-.925.463-131.324,45.316-149.82,151.208ZM0,153.982C119.764,130.861,149.82,0,149.82,0V305.19C131.324,199.3.925,154.445,0,153.982Z" fill="#fff"/>
        </svg>
        <p>Power To Do</p>
      </div>
      <button>
        Sair
      </button>
    </div>

    <div class="--content">
      <UserCircleIcon class="--icon" />
      <section>
        <span>Jadson Santos</span>
        <span>Santosjadson797@hotmail.com</span>
      </section>
    </div>
  </section>
</template>

<script setup>
import { UserCircleIcon } from '@heroicons/vue/24/solid'

defineProps({
  isOpen:{
    type:Boolean,
    default:false
  }
})

</script>

<style scoped>

.log-off-section span, p {
  @apply opacity-95;
}

.log-off-section {
  @apply absolute right-0 w-[320px] h-[180px] bg-black bg-opacity-20 border-b border-b-white border-opacity-15 z-[100];
}

.log-off-section .--headers-section {
  @apply w-full h-[46px] flex justify-between items-center pl-[10px];
}

.log-off-section .--headers-section button {
  @apply w-[50px] h-full flex justify-center items-center font-semibold text-[13px];
}

.log-off-section .--headers-section .--logo {
  @apply flex gap-[5px] items-center h-full;
}

.log-off-section .--headers-section .--logo p {
  @apply font-semibold text-[14px];
}

.log-off-section .--content {
  @apply w-full h-[calc(100%-46px)] flex justify-center items-center gap-5;
}

.log-off-section .--content .--icon {
  @apply w-[90px] h-[90px] rounded-full;
}

.log-off-section .--content section {
  @apply w-[196px] h-[93px] flex flex-col gap-[3px] pl-1;
}

.log-off-section .--content section span {
  @apply font-bold text-[18px];
}

.log-off-section .--content section span:nth-child(2) {
  @apply font-semibold text-[13px] truncate;
}

</style>