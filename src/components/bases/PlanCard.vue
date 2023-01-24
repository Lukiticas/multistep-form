<script setup>
  const props = defineProps({
    onError: Boolean,
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
    new URL(`../../assets/images/${props.iconName}`, import.meta.url);
</script>

<template>
  <article
    class="plan-card bg-secundary"
    :class="{ 'bg-terciary outlined': isActive, 'on-error': onError }">
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
  .plan-card {
    font-size: 1rem;
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
    margin-block-end: 2em;
    transition: transform 250ms ease;
  }

  .plan-card__title {
    font-size: 1.1em;
  }
  .plan-card__subtitle {
    font-size: 1em;
  }

  .plan-card__promo {
    font-size: 0.9em;
  }

  .on-error {
    outline-color: var(--accent-error);
    animation: horizontal-shaking 150ms linear;
  }

  .plan-card:hover .plan-card__image {
    transform: scale(1.1) rotateX(360deg);
  }

  @media only screen and (max-width: 800px) {
    .plan-card {
      flex-flow: row nowrap;
      align-items: start;
      gap: 1rem;
    }

    .plan-card__image {
      margin: 0;
      margin-block-start: 0.2em;
    }
  }

  @keyframes horizontal-shaking {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(5px);
    }
    50% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
