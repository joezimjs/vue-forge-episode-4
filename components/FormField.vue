<script setup lang="ts">
const props = defineProps<{
  label?: string;
  hint?: string;
  name: string;
}>();
</script>

<template>
  <div class="form-control w-full mb-8">
    <label class="label" :for="name" v-if="label || $slots.label || $slots.altLabel">
      <span class="label-text font-bold">
        <slot name="label">
          {{ label }}
        </slot>
      </span>
      <span class="label-text-alt">
        <slot name="altLabel" />

        <span class="inline-block ml-2 text-error">
          <slot name="error-message">
            <ErrorMessage :name="name" class="text-error" />
          </slot>
        </span>
      </span>
    </label>

    <slot />

    <label class="label" :for="name" v-if="hint || $slots.hint">
      <span class="label-text-alt">
        <slot name="hint">
          {{ hint }}
        </slot>
      </span>
    </label>
  </div>
</template>
