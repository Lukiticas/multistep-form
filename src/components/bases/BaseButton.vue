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

<template>
  <button
    class="button bold"
    :class="{
      'button--previous bg-secundary text-secundary semi-bold':
        styleType === 'previous',
      'button--next bg-button text-terciary semi-bold': styleType === 'next',
      'button--disabled': show,
    }">
    {{ title }}
  </button>
</template>

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

  .button--next:hover {
    filter: opacity(0.8) saturate(2);
  }

  .button--previous:hover {
    color: var(--w-primary);
  }

  .button--disabled {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
</style>
