<script setup lang="ts">
	import { nanoid } from 'nanoid'

	const props = defineProps<{
		bucket: string
	}>()

	const emit = defineEmits<{
		(e: 'file:uploaded', payload: string): void
	}>()

	const { storage } = useSupabaseClient()

	async function handleChange(e: Event) {
		const el = e.target as HTMLInputElement
		if (!el.files?.length) return
		const file = el.files[0]
		const { data, error } = await storage.from(props.bucket).upload(`${nanoid(6)}-${file.name}`, file, {
			cacheControl: '3600',
			upsert: false
		})
		if (error) {
			console.log(error.message)
			throw createError({ message: 'failed to upload image' })
		} else {
			const { data: urlData } = await storage.from(props.bucket).getPublicUrl(data.path)

			emit('file:uploaded', urlData.publicUrl)
		}
	}
</script>
<template>
	<input @change="handleChange" ref="fileInput" type="file" class="w-full file-input file-input-bordered" />
</template>
