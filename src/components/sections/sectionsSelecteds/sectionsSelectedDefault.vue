<template>
  <div class="section-default">
    <p class="section-default-content-p">Tarefa não encontrada</p>
    <label class="section-default-content-label">Não é possível encontrar a tarefa que você está procurando. Tente procurar por ela em vez disso.</label>
  </div>
</template>

<style scoped>

.section-default {
  @apply h-full border-l border-[#111111] border-opacity-30 bg-[#222222] flex flex-col justify-center items-center;
}

.section-default .section-default-content-p {
  @apply text-blue-300 text-[20px] font-semibold;
}

.section-default .section-default-content-label {
  @apply text-white opacity-40 xl:text-[18px] sm:text-[14px];
}

</style>