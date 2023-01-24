<script setup>
  import { inject } from "vue";

  const emit = defineEmits(["confirm-form", "go-back-to-plan", "is-valid"]);
  const store = inject("store");

  const plans = store.getPlanPrice;
  const addons = store.getAddons;
  const total = store.getTotal;

  const handleSubmit = (e) => {
    e.preventDefault();
    emit("is-valid", true);
  };
</script>

<template>
  <form id="summary-form" @submit="handleSubmit">
    <section class="summary-panel bg-terciary">
      <article class="summary-panel__plan">
        <div class="summary-panel__plan__details">
          <p class="plan-price text-primary bold">
            {{ plans.name }} ({{ plans.period.frequency }})
          </p>
          <a href="#" @click="$emit('go-back-to-plan')"
            ><span class="text-secundary regular link">Change</span></a
          >
        </div>
        <span class="plan-price text-primary bold"
          >${{ plans.price }}/{{ plans.period.suffix }}</span
        >
      </article>
      <div v-if="addons.length" class="summary-panel__addons-body">
        <article
          v-for="addon in addons"
          class="summary-panel__addons"
          :key="addon.name">
          <p class="plan-price-addon--title regular text-quartenary">
            {{ addon.name }}
          </p>
          <span class="plan-price-addon--price text-primary regular"
            >${{ addon.price }}/{{ addon.period.suffix }}</span
          >
        </article>
      </div>
    </section>
    <section class="summary-panel__summary">
      <span class="regular text-secundary"
        >total (per {{ total.period.name }})</span
      >
      <span class="summary-panel__summary--title text-accent-blue bold"
        >${{ total.price }}/{{ total.period.suffix }}</span
      >
    </section>
  </form>
</template>

<style scoped>
  .summary-panel {
    padding: 1.3rem;
    border-radius: 0.5rem;
  }

  .summary-panel__summary,
  .summary-panel__plan,
  .summary-panel__addons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .summary-panel__plan {
    border-block-end: 0.05rem solid var(--bg-quarternary);
    padding-block-end: 1rem;
  }

  .summary-panel__addons-body {
    padding-block-start: 1rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: start;
    gap: 0.8rem;
  }

  .plan-price-addon--title {
    font-size: 1rem;
  }

  .summary-panel__plan__details {
    text-transform: capitalize;
    font-size: 1rem;
    line-height: 1.5;
  }

  .summary-panel__summary {
    padding-inline: 1rem;
    margin-block-start: 1rem;
  }

  .summary-panel__summary--title {
    font-size: 1.5rem;
  }

  .plan-price {
    font-size: 1.1rem;
  }

  a {
    color: currentColor;
    font-size: 0.9rem;
  }

  a:hover,
  a:hover > .link {
    color: var(--accent);
  }
</style>
