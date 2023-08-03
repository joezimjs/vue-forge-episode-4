<script setup lang="ts">
import type { Database } from "@/supabase/schema";

const props = defineProps<{
  project: Partial<Database["public"]["Tables"]["projects"]["Row"]>;
  categoryName?: string;
  isPreview?: boolean;
}>();

const project = computed(() => {
  if (props.isPreview) {
    return {
      ...props.project,
      title: props.project.title ?? "Your Title Here",
      excerpt: (props.project.excerpt || props.project.description) ?? "This is a description of your project.",
      backers: props.project.backers ?? 0,
      pledged: props.project.pledged ?? 0,
    };
  }

  return props.project;
});
</script>

<template>
  <div class="flex flex-col items-start justify-start col-span-1 space-y-4 shadow card glass">
    <figure>
      <img :src="project.image || 'https://placehold.co/500x320'" :alt="project.title" class="w-[500px] aspect-video object-cover" />
    </figure>
    <div class="card-body">
      <h2 class="flex items-start justify-start capitalize card-title min-h-12">
        <span>{{ project.title }}</span>
      </h2>
      <p>
        {{ project.excerpt }}
      </p>

      <div class="flex items-center justify-between">
        <div class="badge badge-secondary badge-outline">
          <span>Backers:&nbsp;</span>
          {{ project.backers }}
        </div>

        <div class="badge badge-accent badge-outline">
          <span>Pledged:&nbsp;</span>
          <Money :amount="project.pledged" short />
        </div>
      </div>
      <div class="w-full">
        <progress class="w-full progress progress-primary" :value="project.pledged" :max="Number(project.hardCap)"></progress>
      </div>

      <div class="flex items-center justify-between">
        <div v-if="categoryName" class="text-xs badge badge-primary badge-outline">
          {{ categoryName }}
        </div>
        <span class="text-primary"><Money :amount="project.softCap" short /> / <Money :amount="project.hardCap" short /></span>
      </div>

      <div class="justify-between mt-8 card-actions">
        <span class="text-sm text-primary">
          <TimeAgo :date="project.finishesAt" />
        </span>
        <nuxt-link v-if="project.uuid" :to="{ name: 'projects-uuid', params: { uuid: project.uuid } }" class="btn btn-primary btn-sm">
          More details!
        </nuxt-link>

        <span v-else class="btn btn-primary btn-sm"> More details! </span>
      </div>
    </div>
  </div>
</template>
