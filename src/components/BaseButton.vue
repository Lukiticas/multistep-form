<template>
  <button
    class="button bold"
    :class="{
      'previous bg-secundary text-secundary': styleType === 'previous',
      'next bg-quartenary text-terciary': styleType === 'next',
    }">
    {{ title }}
  </button>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    styleType: {
      type: String,
      required: true,
    },
  });
</script>

<style scoped>
  .button {
    border: none;
    outline: none;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: 100ms all ease;
    text-transform: capitalize;
  }

  .button.next:hover {
    filter: opacity(0.8) saturate(2);
  }

  .button.previous:hover {
    color: var(--w-primary);
  }
</style>
