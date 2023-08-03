<script setup lang="ts">
const { alerts, success, error, warning, info, dismiss } = useAlerts();
</script>
<template>
  <div class="fixed bottom-0 z-10 w-full p-2 right-2 sm:p-0 sm:w-96 sm:bottom-5">
    <TransitionGroup name="list" tag="ul">
      <div v-for="alert in alerts" :key="alert.id" class="mb-4 shadow-xl alert" :class="'alert-' + alert.type">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path
            v-if="alert.type == 'warning'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
          <path
            v-else-if="alert.type == 'error'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            v-else-if="alert.type == 'success'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            v-else-if="alert.type == 'info'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
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
