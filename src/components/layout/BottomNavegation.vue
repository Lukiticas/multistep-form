<script setup>
  import BaseButton from "@/components/bases/BaseButton.vue";

  defineProps({
    show: Boolean,
    titleRight: String,
    titleLeft: String,
    colorDecider: Boolean,
    form: String,
  });

  defineEmits(["handle-left-clicked", "handle-right-clicked"]);
</script>

<template>
  <footer class="bottom-navegation bg-secundary">
    <BaseButton
      :show="show"
      :title="titleLeft"
      @click="$emit('handle-left-clicked', $event)"
      style-type="previous"></BaseButton>
    <BaseButton
      :form="form"
      :class="{ 'bg-accent-purple': colorDecider }"
      type="submit"
      style-type="next"
      @click="$emit('handle-right-clicked', $event)"
      :title="titleRight">
    </BaseButton>
  </footer>
</template>

<style scoped>
  .bottom-navegation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
  }

  @media only screen and (max-width: 800px) {
    .bottom-navegation {
      padding: 1rem;
    }
  }
</style>
