<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex items-center h-full justify-center text-center bg-[#333333] bg-opacity-45"
          >
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
            class="w-full transform overflow-hidden rounded-[4px] bg-[#333333] p-4 pt-0 text-left align-middle shadow-xl transition-all flex flex-col items-end border border-white border-opacity-20 scroll-pdf"
            :class="widthImage ? 'w-full h-full transition-none' : 'max-w-[70%] h-[85%]'"
            >
            <span class="w-full h-[12%] flex justify-between items-center">
              <p class="text-white font-semibold opacity-75 !text-[15px]">{{ imageDetails?.name }}</p>
              <button class="flex gap-1">
                <ArrowsPointingOutIcon v-if="widthImage" @click="widthImage = !widthImage" v-tippy="{ content: 'Minimizar', placement: 'top', delay: [300, 0], theme: 'light'}"  class="w-5 h-5 text-white mr-2 opacity-75"/>
                <ArrowsPointingInIcon v-if="!widthImage" @click="widthImage = !widthImage" v-tippy="{ content: 'Maximizar', placement: 'top', delay: [300, 0], theme: 'light'}"  class="w-5 h-5 text-white mr-2 opacity-75"/>
                <XMarkIcon @click="emit('close')" v-tippy="{ content: 'Fechar', placement: 'top', delay: [300, 0], theme: 'light'}"  class="w-5 h-5 text-white mr-2 opacity-75"/>
              </button>
            </span>
            <object :data="imageDetails.content" class="w-full min-h-[90%] rounded-[3px] bg-white" />
            <!-- <img :src="imageDetails.content" class="w-full max-h-[90%] rounded-[3px]" /> -->
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, inject,computed } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { XMarkIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon } from '@heroicons/vue/24/solid';

defineProps({
  isOpen:{
    type:Boolean,
    default:false
  }
})

const emit = defineEmits(['close'])

const widthImage = ref(false)
const imageDetails = ref(inject('arquiveDetails'))

</script>

<style scoped>
.scroll-pdf::-webkit-scrollbar-thumb {
  @apply bg-[#444444];
}
</style>
