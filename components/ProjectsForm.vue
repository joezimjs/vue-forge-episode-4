<script setup lang="ts">
	import type { Database } from '@/supabase/schema'

	// Get categories for dropdown
	const categories = useCategories()
	categories.fetchAll()

	const form = reactive<Partial<Database['public']['Tables']['projects']['Row']>>({
		title: '',
		description: '',
		excerpt: '',
		image: '',
		categoryUuid: '',
		softCap: '',
		hardCap: '',
		startsAt: useDateFormat(new Date(), 'YYYY-MM-DD').value,
		finishesAt: useDateFormat(getDateXMonthsFromNow(6), 'YYYY-MM-DD').value
	})

	const categoryName = computed(() => {
		if (!categories.list.value || !form.categoryUuid) {
			return undefined
		}

		const category = categories.list.value.find((cat) => cat.uuid == form.categoryUuid)

		if (category) {
			return category.name
		}

		return undefined
	})

	function handleSubmit() {
		alert(JSON.stringify(form, null, '2'))
	}

	function fileUploaded(url: string) {
		form.image = url
	}

	watch(
		() => form.softCap,
		() => {
			const soft = parseInt(form.softCap ?? '0', 10)
			const hard = parseInt(form.hardCap ?? '0', 10)
			if (soft > hard) {
				const plus5k = soft + 5000
				form.hardCap = (plus5k < 10000 ? plus5k : soft).toString()
			}
		}
	)

	watch(
		() => form.hardCap,
		() => {
			const soft = parseInt(form.softCap ?? '0', 10) || 0
			const hard = parseInt(form.hardCap ?? '0', 10) || 0
			if (soft > hard) {
				const minus5k = hard - 5000
				form.softCap = (minus5k < 0 ? hard : minus5k).toString()
			}
		}
	)
</script>

<template>
	<div class="grid grid-cols-5 gap-8">
		<form class="col-span-2 col-start-2" @submit.prevent="handleSubmit">
			<FormField label="Project Name" hint="Use a very handy title that people could identify your project." name="title">
				<input type="text" id="title" v-model="form.title" class="input input-bordered w-full" />
			</FormField>

			<FormField
				label="Project Description"
				hint="Describe with full detail your project so that people understand exactly what it is about."
				name="description"
			>
				<textarea id="description" v-model="form.excerpt" class="textarea textarea-bordered h-24 w-full" />
			</FormField>

			<FormField label="Featured Image" name="image">
				<AppFileUpload bucket="projects" id="image" @file:uploaded="fileUploaded" />
			</FormField>

			<FormField label="Category" name="category">
				<input type="text" id="category" v-model="form.categoryUuid" class="input input-bordered w-full" />
			</FormField>

			<button type="submit" class="btn btn-primary btn-md ml-auto mt-10 block px-10">Submit</button>
		</form>

		<div class="col-start-4">
			<ProjectCard :project="form" :category-name="categoryName" class="col-start-4" />
		</div>
	</div>
</template>

<style scoped>
	input,
	textarea {
		--rounded-btn: 0.5rem;
	}
</style>
