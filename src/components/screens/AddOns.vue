<script setup>
  import { computed, inject, onMounted, ref, watch } from "vue";
  import AddonsCard from "@/components/AddonsCard.vue";
  import createCard from "@/utils/createCard";

  const props = defineProps(["add-ons"]);
  const emit = defineEmits(["is-valid"]);
  const store = inject("store");

  const cards = computed(() => {
    return createCard(props.addOns, store.period);
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
