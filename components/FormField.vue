<script setup lang="ts">
	defineProps<{
		label?: string
		hint?: string
		name?: string
	}>()
</script>

<template>
	<div class="form-control w-full mt-10">
		<label class="label" :for="name" v-if="label || $slots.label || $slots.altLabel">
			<span class="label-text font-bold">
				<slot name="label">
					{{ label }}
				</slot>
			</span>
			<span class="label-text-alt" v-if="$slots.altLabel">
				<slot name="altLabel" />
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
