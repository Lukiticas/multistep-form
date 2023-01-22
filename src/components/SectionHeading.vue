<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <header class="heading-title">
    <h2 class="title bold text-primary">{{ title }}</h2>
    <p class="description semi-bold text-secundary">{{ description }}</p>
  </header>
</template>

<style scoped>
  .heading-title {
    margin-bottom: 2rem;
  }

  .title {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1.1rem;
  }
</style>
