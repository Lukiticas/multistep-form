<script setup>
  import ToggleSwitch from "@/components/ToggleSwitch.vue";

  defineProps({ modelValue: Boolean, labelRight: String, labelLeft: String });
  defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="billing-toggler bg-terciary">
    <span
      class="billing-toggler__labels"
      :class="{
        'text-primary bold': modelValue,
        'text-secundary semi-bold': !modelValue,
      }"
      >{{ labelRight }}</span
    >
    <span>
      <ToggleSwitch
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', !modelValue)" />
    </span>
    <span
      class="billing-toggler__labels"
      :class="{
        'text-primary bold': !modelValue,
        'text-secundary semi-bold': modelValue,
      }"
      >{{ labelLeft }}</span
    >
  </div>
</template>

<style scoped>
  .billing-toggler {
    width: 100%;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .billing-toggler__labels {
    font-size: 1.1rem;
  }
</style>
