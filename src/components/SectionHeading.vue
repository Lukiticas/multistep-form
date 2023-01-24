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
    <p class="description regular text-secundary">{{ description }}</p>
  </header>
</template>

<style scoped>
  .heading-title {
    margin-bottom: 2rem;
  }

  .title {
    font-size: 2rem;
  }

  .description {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 400px) {
    .title {
      font-size: 1.5rem;
    }

    .description {
      font-size: 1rem;
    }
  }
</style>
