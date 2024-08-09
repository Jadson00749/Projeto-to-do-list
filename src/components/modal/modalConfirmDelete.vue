<template>
  <div>
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
          class="flex min-h-full items-center justify-center p-4 text-center"
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
              class="min-w-[286px] h-[174px] max-h-[174px] transform overflow-hidden rounded-[4px] bg-[#222222] text-left align-middle shadow-xl transition-all border border-white border-opacity-30"
            >
            <div class="w-full h-20 p-4 flex flex-col gap-2 break-wordsz">
              <span class="text-white text-[14px] font-semibold">"{{ nameTask }}" será definitivamente excluída.</span>
              <span class="text-white opacity-50 text-[15px] text-sm">Voce não poderá desfazer esta ação.</span>
            </div>
              <div class="h-16 p-4">
                <div class="h-8 flex justify-end gap-2">
                  <button @click="emit('close')" class="w-[78px] h-8 flex justify-center items-center bg-white rounded-[4px] opacity-90">
                    <span class="text-gray-800 text-sm font-semibold">Cancelar</span>
                  </button>
                  <button @click="emit('deleteTask')" class="w-[106px] h-8 flex justify-center items-center bg-red-400 rounded-[4px] hover:bg-red-500 transition-all duration-300">
                    <span class="text-white text-sm font-semibold">Excluír tarefa</span>
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

defineProps({
  isOpen:{
    type:Boolean,
    default:false
  },
  nameTask:{
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close','closeOptions','deleteTask'])

onMounted(()=>{
  emit('closeOptions')
})

</script>
