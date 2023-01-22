<template>
  <button
    class="button bold"
    :class="{
      'previous bg-secundary text-secundary': styleType === 'previous',
      'next bg-quartenary text-terciary': styleType === 'next',
      disabled: show,
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
    disabled: {
      type: Boolean,
      required: false,
    },
    show: {
      type: Boolean,
      required: false,
    },
  });
</script>

<style scoped>
  .button {
    font-size: 1rem;
    border: none;
    outline: none;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: 200ms all ease;
    text-transform: capitalize;
  }

  .button.next:hover {
    filter: opacity(0.8) saturate(2);
  }

  .button.previous:hover {
    color: var(--w-primary);
  }

  .disabled {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
</style>
