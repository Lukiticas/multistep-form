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
      class="step-icon"
      :class="{
        'active bg-accent text-primary': active,
        'text-terciary': !active,
      }">
      {{ order }}
    </div>
    <div class="step-details">
      <span class="text-quartenary regular">STEP {{ order }}</span>
      <p class="step-title semi-bold text-terciary">{{ title }}</p>
    </div>
  </article>
</template>

<style scoped>
  .step {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    text-transform: uppercase;
  }

  .step-title {
    font-size: 1.1rem;
  }

  .step-icon {
    width: 2rem;
    display: grid;
    place-items: center;
    border-radius: 100vw;
    aspect-ratio: 1/1;
    font-size: 1rem;
    outline: 0.1rem solid var(--w-terciary);
  }

  .active.active {
    outline-color: var(--bg-accent);
  }

  @media only screen and (max-width: 800px) {
    .step-details {
      display: none;
    }
  }
</style>
