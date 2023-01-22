<script setup>
  const props = defineProps({
    isActive: Boolean,
    iconName: String,
    title: String,
    pricing: [String, Number],
    period: String,
    active: Boolean,
    promo: {
      type: String,
      required: false,
    },
  });

  const getIcon = () =>
    new URL(`../assets/images/${props.iconName}`, import.meta.url);
</script>

<template>
  <article
    class="plan-card bg-secundary"
    :class="{ 'bg-terciary outlined': isActive }">
    <img class="plan-card__image" :src="getIcon()" alt="" />
    <div class="plan-card__details">
      <p class="plan-card__title text-primary semi-bold">{{ title }}</p>
      <span class="plan-card__subtitle text-secundary regular"
        >${{ pricing }}/{{ period }}</span
      >
      <Transition>
        <div v-show="promo" class="plan-card__promo text-primary regular">
          {{ promo }}
        </div>
      </Transition>
    </div>
  </article>
</template>

<style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: all 300ms linear;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  .plan-card {
    outline: 0.15rem solid var(--bg-quarternary);
    border-radius: 0.5rem;
    padding: 1rem;
    min-width: 9rem;
    display: flex;
    align-items: start;
    justify-content: start;
    flex-flow: column nowrap;
    cursor: pointer;

    transition: all 100ms ease;
  }

  .plan-card:hover {
    outline-color: var(--accent);
    scale: 1.05;
  }

  .outlined {
    outline-color: var(--accent);
  }

  .plan-card__image {
    margin-block-end: 2rem;
  }

  .plan-card__title {
    font-size: 1.1rem;
  }
  .plan-card__subtitle {
    font-size: 1rem;
  }

  .plan-card__promo {
    font-size: 0.9rem;
  }

  @media only screen and (max-width: 800px) {
    .plan-card {
      flex-flow: row nowrap;
      align-items: start;
      gap: 1rem;
    }

    .plan-card__image {
      margin: 0;
      margin-block-start: 0.2rem;
    }
  }
</style>
