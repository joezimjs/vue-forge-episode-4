<script setup lang="ts">
const { alerts, success, error, warning, info, dismiss } = useAlerts();
</script>
<template>
  <div class="fixed bottom-0 z-10 w-full p-2 right-2 sm:p-0 sm:w-96 sm:bottom-5">
    <TransitionGroup name="list" tag="ul">
      <div v-for="alert in alerts" :key="alert.id" class="mb-4 shadow-xl alert" :class="'alert-' + alert.type">
        <span data-icon></span>
        <div>
          <h6 class="font-bold">{{ alert.title }}</h6>
          <p>{{ alert.message }}</p>
        </div>
        <button v-if="alert.dismissiable" @click="dismiss(alert)" class="p-1 font-bold transition rounded-full hover:bg-white h-8 w-8">&times;</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.6s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(60px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(60px) translateY(-100%);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
