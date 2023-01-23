<script setup>
  import { inject } from "vue";

  const store = inject("store");
  const plans = store.getPlanPrice;
  console.log(plans);
</script>

<template>
  <form name="summary-form">
    <section class="summary-panel bg-terciary">
      <div class="summary-panel__plan">
        <p class="text-primary bold">{{ plans.name }}</p>
        <button class="link text-secundary regular">Change</button>
      </div>
      <span class="text-primary bold">price</span>
      <div class="summary-panel__addons">
        <div class="text-secundary">
          <p class="semi-bold">services</p>
          <span class="text-primary regular">price</span>
        </div>
        <div class="text-secundary">
          <p class="semi-bold">services</p>
          <span class="text-primary regular">price</span>
        </div>
      </div>
    </section>
    <section>
      <div class="text-secundary">
        <span class="semi-bold">total (per year)</span>
        <span class="text-primary">price</span>
      </div>
    </section>
  </form>
</template>

<style scoped></style>
