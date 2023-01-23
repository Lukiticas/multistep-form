<script setup>
  import { computed, inject, onMounted, ref, watch } from "vue";
  import AddonsCard from "@/components/AddonsCard.vue";

  const props = defineProps(["add-ons"]);
  const emit = defineEmits(["is-valid"]);
  const store = inject("store");

  const cards = computed(() => {
    if (!props.addOns) return [];
    return props.addOns.map((addon) => ({
      title: addon.title,
      description: addon.subtitle,
      period: store.period[1],
      pricing: addon.pricing[store.period[0]],
    }));
  });

  const cardSelected = ref([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    emit("is-valid", true);
  };

  watch(cardSelected, () => {
    store.addOnsSelected = cardSelected.value;
  });

  onMounted(() => {
    cardSelected.value = store.addOnsSelected || [];
  });
</script>

<template>
  <section>
    <form id="add-ons-form" class="addons-list" @submit.prevent="handleSubmit">
      <label
        v-for="(card, idx) in cards"
        :for="card.title"
        :key="card.title + idx">
        <input
          :id="card.title"
          type="checkbox"
          name="card-selected"
          :value="card"
          v-model="cardSelected"
          style="display: none" />
        <AddonsCard
          :title="card.title"
          :description="card.description"
          :period="card.period"
          :pricing="card.pricing"
          :checked="
            cardSelected.some((el) => el.title === card.title)
          "></AddonsCard>
      </label>
    </form>
  </section>
</template>

<style scoped>
  .addons-list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
</style>
