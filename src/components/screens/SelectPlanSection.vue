<script setup>
  import { watch, ref, computed, inject, onMounted } from "vue";

  import BillingSelector from "@/components/layout/BillingSelector.vue";
  import PlanCard from "@/components/bases/PlanCard.vue";

  import createCard from "@/utils/createCard";

  const emit = defineEmits(["is-valid"]);

  const store = inject("store");
  const plans = inject("plans");

  const cardSelected = ref([]);
  const onError = ref(false);

  const cards = computed(() => {
    return createCard(plans, store.period);
  });

  const selectOne = (e) => {
    if (!cardSelected.value[0]) return;
    if (cardSelected.value[0].title !== e.target._value.title) {
      cardSelected.value[0] = e.target._value;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardSelected.value.length) {
      onError.value = true;
      return;
    }
    onError.value = false;
    emit("is-valid", true);
  };

  watch(cardSelected, () => {
    onError.value = false;
    store.planSelected = cardSelected.value;
  });

  watch(
    () => store.period,
    () => {
      cardSelected.value = [];
      store.addOnsSelected = [];
      store.planSelected = [];
    }
  );

  onMounted(() => {
    cardSelected.value = store.planSelected || [];
  });
</script>
<template>
  <section class="select-plan-section">
    <form
      v-if="plans"
      id="select-plan-form"
      class="pricing-cards"
      @submit.prevent="handleSubmit">
      <label v-for="(card, idx) in cards" :key="idx">
        <input
          type="checkbox"
          name="card-selected"
          :value="card"
          v-model="cardSelected"
          @click="selectOne"
          style="display: none" />
        <PlanCard
          :is-active="cardSelected[0] && cardSelected[0].title === card.title"
          :title="card.title"
          :icon-name="card.iconName"
          :period="card.period"
          :promo="card.promo"
          :on-error="onError"
          :pricing="card.pricing"></PlanCard>
      </label>
    </form>
    <BillingSelector
      v-model="store.isYearlyOrMonthly"
      label-left="Yearly"
      label-right="Monthly"></BillingSelector>
  </section>
</template>

<style scoped>
  .select-plan-section {
    display: flex;
    flex-flow: column;
  }

  .pricing-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: auto;
    padding-block-end: 1rem;
  }

  .select-plan-section {
    min-height: 16rem;
  }

  @media only screen and (max-width: 800px) {
    .pricing-cards {
      display: flex;
      flex-flow: column;
    }
  }
</style>
