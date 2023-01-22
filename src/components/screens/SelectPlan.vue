<script setup>
  import { ref, computed } from "vue";
  import PlanCard from "@/components/PlanCard.vue";
  import BillingSelector from "@/components/BillingSelector.vue";

  const props = defineProps({
    plans: {
      type: Object,
      required: true,
    },
    selectBilling: {
      type: Boolean,
      required: true,
    },
    period: {
      type: Array,
      required: true,
    },
  });

  const emit = defineEmits(["isValid", "update:select-billing"]);

  const cardSelected = ref([]);

  const cards = computed(() => {
    if (!props.plans) return [];

    return props.plans.map((plan) => ({
      title: plan.title,
      iconName: plan.icon,
      period: props.period[1],
      pricing: plan.pricing[props.period[0]].value,
      promo: plan.pricing[props.period[0]].promo,
    }));
  });

  const selectOne = (e) => {
    if (!cardSelected.value[0]) return;
    if (cardSelected.value[0].title !== e.target._value.title) {
      cardSelected.value[0] = e.target._value;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardSelected.value) return;
    emit("is-valid", cardSelected);
  };
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
          :pricing="card.pricing"></PlanCard>
      </label>
    </form>
    <BillingSelector
      :model-value="selectBilling"
      @update:model-value="$emit('update:select-billing', !selectBilling)"
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
