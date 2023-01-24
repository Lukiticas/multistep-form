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
    <h1 class="heading-title__title bold text-primary">{{ title }}</h1>
    <p class="heading-title__description regular text-secundary">
      {{ description }}
    </p>
  </header>
</template>

<style scoped>
  .heading-title {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .heading-title__title {
    font-size: 2em;
  }

  .heading-title__description {
    font-size: 1em;
  }

  @media screen and (max-width: 400px) {
    .heading-title__title {
      font-size: 1.5em;
    }

    .heading-title__description {
      font-size: 1em;
    }
  }
</style>
