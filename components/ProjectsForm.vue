<script setup lang="ts">
import { ProjectCreationFormSchema } from "@/types/ProjectCreationFormSchema";

// const form = reactive<ProjectCreationFormSchema>({
//   title: "",
//   description: "",
//   image: "",
//   categoryUuid: "",
//   softCap: 10_000,
//   hardCap: 25_000,
//   startsAt: useDateFormat(new Date(), "YYYY-MM-DD").value,
//   finishesAt: useDateFormat(getDateXMonthsFromNow(6), "YYYY-MM-DD").value,
// });

const {
  values: form,
  handleSubmit,
  setFieldValue,
} = useForm({
  initialValues: {
    title: "",
    description: "",
    image: "",
    categoryUuid: "",
    softCap: 10_000,
    hardCap: 25_000,
    startsAt: useDateFormat(new Date(), "YYYY-MM-DD").value,
    finishesAt: useDateFormat(getDateXMonthsFromNow(6), "YYYY-MM-DD").value,
  } as ProjectCreationFormSchema,
  validationSchema: toTypedSchema(ProjectCreationFormSchema),
});

// Get categories for dropdown
const categories = useCategories();
categories.fetchAll();

const categoryName = computed(() => {
  if (!categories.list.value || !form.categoryUuid) {
    return undefined;
  }

  const category = categories.list.value.find((cat) => cat.uuid == form.categoryUuid);

  if (category) {
    return category.name;
  }

  return undefined;
});

function submitForm() {
  useAlerts().success("Your project has been published!");
  // alert(JSON.stringify(form, null, "2"));
}

const submitHandler = handleSubmit(submitForm);

function fileUploaded(url: string) {
  form.image = url;
}

watch(
  () => form.softCap,
  () => {
    const soft = form.softCap ?? 0;
    const hard = form.hardCap ?? 0;
    if (soft > hard) {
      const plus5k = soft + 5000;
      setFieldValue("hardCap", plus5k < 100_000 ? plus5k : soft);
    }
  }
);

watch(
  () => form.hardCap,
  () => {
    const soft = form.softCap ?? 0;
    const hard = form.hardCap ?? 0;
    if (soft > hard) {
      const minus5k = hard - 5000;
      setFieldValue("softCap", minus5k < 0 ? hard : minus5k);
    }
  }
);
</script>

<template>
  <div class="grid grid-cols-5 gap-8 mb-10">
    <form class="col-span-2 col-start-2" @submit.prevent="submitHandler">
      <h1 class="text-xl font-bold mb-3">Create Your Project</h1>
      <FormField label="Project Name" hint="Use a very handy title that people could identify your project." name="title">
        <Field id="title" name="title" v-model="form.title" class="input input-bordered w-full" />
      </FormField>

      <FormField
        label="Project Description"
        hint="Describe with full detail your project so that people understand exactly what it is about."
        name="description"
      >
        <Field as="textarea" id="description" name="description" v-model="form.description" class="textarea textarea-bordered h-24 w-full" />
      </FormField>

      <FormField label="Cover Image" name="image">
        <Field v-slot="{ handleChange }" name="image">
          <AppFileUpload bucket="projects" id="image" name="image" @file:uploaded="handleChange" />
        </Field>
      </FormField>

      <FormField label="Category" name="categoryUuid">
        <Field as="select" id="categoryUuid" name="categoryUuid" v-model="form.categoryUuid" class="select select-bordered w-full">
          <option value="" disabled>Choose a Category</option>
          <option v-for="category in categories.list.value" :key="category.uuid" :value="category.uuid">{{ category.name }}</option>
        </Field>
      </FormField>

      <FormField label="Soft Cap" name="softCap" hint="Soft cap is the minimum amount of money that you need to raise in order to start your project.">
        <template #altLabel>
          <Money :amount="form.softCap" />
        </template>
        <Field type="range" id="softCap" name="softCap" v-model.number="form.softCap" class="range w-full" min="0" max="100000" step="5000" />
        <div class="flex justify-between w-full px-3 text-xs"><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span></div>
        <div class="flex justify-between w-full px-2 text-xs">
          <span class="basis-0 grow-1 shrink-0"><Money :amount="0" short /></span>
          <span class="basis-0 grow-1 shrink-0"><Money :amount="25000" short /></span>
          <span class="basis-0 grow-1 shrink-0"><Money :amount="50000" short /></span>
          <span class="basis-0 grow-1 shrink-0"><Money :amount="75000" short /></span>
          <span class="basis-0 grow-1 shrink-0"><Money :amount="100000" short /></span>
        </div>
      </FormField>

      <FormField label="Hard Cap" name="hardCap" hint="Hard cap is the maximum amount of money that you need to raise in order to start your project.">
        <template #altLabel>
          <Money :amount="form.hardCap" />
        </template>
        <Field type="range" id="hardCap" name="hardCap" v-model.number="form.hardCap" class="range w-full" min="0" max="100000" step="5000" />
        <div class="flex justify-between w-full px-3 text-xs"><span>|</span><span>|</span><span>|</span><span>|</span><span>|</span></div>
        <div class="flex justify-between w-full px-2 text-xs">
          <span class="basis-0 grow-1 shrink-0"><Money :amount="0" short /></span>
          <span class="basis-0 grow-1 shrink-0"><Money :amount="25000" short /></span>
          <span class="basis-0 grow-1 shrink-0"><Money :amount="50000" short /></span>
          <span class="basis-0 grow-1 shrink-0"><Money :amount="75000" short /></span>
          <span class="basis-0 grow-1 shrink-0"><Money :amount="100000" short /></span>
        </div>
      </FormField>

      <FormField label="Start Date" hint="This is the date that your project will open to start receiving funds." name="startsAt">
        <Field type="date" id="startsAt" name="startsAt" v-model="form.startsAt" class="input input-bordered w-full" />
      </FormField>

      <FormField label="End Date" hint="This is the date that your project will stop receiving funds." name="finishesAt">
        <Field type="date" id="finishesAt" name="finishesAt" v-model="form.finishesAt" class="input input-bordered w-full" />
      </FormField>

      <button type="submit" class="btn btn-primary btn-md ml-auto mt-10 block px-10">Publish Your Project</button>
    </form>

    <div class="col-start-4">
      <ClientOnly>
        <ProjectCard
          :project="{
            ...form,
            softCap: form.softCap?.toString(),
            hardCap: form.hardCap?.toString(),
          }"
          :category-name="categoryName"
          class="col-start-4"
          is-preview
        />
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
input,
textarea,
select {
  --rounded-btn: 0.5rem;
}
</style>
