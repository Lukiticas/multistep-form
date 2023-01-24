<script setup>
  defineProps({
    order: [String, Number],
    title: String,
    active: Boolean,
  });
</script>

<template>
  <article class="step">
    <div
      class="step__icon"
      :class="{
        'step__icon--active bg-accent text-primary': active,
        'text-terciary': !active,
      }">
      {{ order }}
    </div>
    <div class="step__details">
      <span class="step__subtitle text-quartenary regular"
        >STEP {{ order }}</span
      >
      <p class="step__title semi-bold text-terciary">{{ title }}</p>
    </div>
  </article>
</template>

<style scoped>
  .step {
    font-size: 1rem;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    text-transform: uppercase;
  }

  .step__title {
    font-size: 1.1em;
  }

  .step__icon {
    width: 2em;
    display: grid;
    place-items: center;
    border-radius: 100vw;
    aspect-ratio: 1/1;
    font-size: 1em;
    outline: 0.1rem solid var(--w-terciary);
    transition: all 200ms ease;
  }

  .step__subtitle {
    font-size: 0.9em;
  }

  .step__icon--active {
    outline-color: var(--bg-primary);
  }

  @media only screen and (max-width: 800px) {
    .step__details {
      display: none;
    }
  }
</style>
