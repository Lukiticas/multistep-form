<script setup>
  defineProps({
    value: Object,
    title: String,
    description: String,
    pricing: [Number, String],
    period: String,
    checked: Boolean,
  });

  defineEmits(["update:model-value"]);
</script>

<template>
  <article class="addon-card text-primary">
    <label for="addons" v-show="false"></label>
    <input
      name="addons"
      class="addon-card__checkbox text-accent-blue"
      type="checkbox"
      :checked="checked" />
    <div class="addon-card__details">
      <h3 class="text-primary bold">{{ title }}</h3>
      <p class="text-secundary regular">{{ description }}</p>
    </div>
    <span class="addon-card__pricing text-accent-blue regular">
      +${{ pricing }}/{{ period }}
    </span>
  </article>
</template>

<style scoped>
  .addon-card {
    outline: 0.1rem solid var(--bg-quarternary);
    padding: 1.2rem 1.5rem;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1.5rem;
    font-size: 1rem;
    border-radius: 0.6em;
    transition: all 200ms ease;
    cursor: pointer;
  }

  .addon-card:hover {
    outline-color: var(--accent);
    scale: 1.05;
  }

  .addon-card:has(:checked) {
    outline-color: var(--accent);
    background-color: var(--bg-terciary);
  }

  .addon-card__pricing {
    font-size: 1em;
  }

  .addon-card__details h3 {
    font-size: 1em;
    line-height: 1.3;
  }

  .addon-card__details p {
    font-size: 0.9em;
  }

  .addon-card__checkbox {
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    margin: 0;
    pointer-events: none;

    font: inherit;
    color: currentColor;
    width: 1.1em;
    height: 1.1em;
    outline: 0.1em solid var(--bg-quarternary);
    border-radius: 0.15rem;
    transform: translateY(-0.075rem);
    display: grid;
    place-content: center;
    transition: all 200ms ease;

    cursor: pointer;
  }

  .addon-card__checkbox:before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em white;
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  input[type="checkbox"]:checked {
    background-color: var(--accent);
  }

  @media only screen and (max-width: 800px) {
    .addon-card {
      padding: 1rem;
      gap: 1rem;
      font-size: 0.9rem;
    }
  }
</style>
