<script setup>
  import { RouterView } from "vue-router";
  import { useDark, useToggle } from "@vueuse/core";
  import ToggleSwitch from "@/components/bases/ToggleSwitch.vue";
  import { ref, watch } from "vue";

  const isDark = useDark({
    valueDark: "dark",
    valueLight: "light",
  });

  const isActive = ref(false);

  const toggleDark = useToggle(isDark);
  watch(isActive, () => toggleDark());
</script>

<template>
  <header class="floating-header">
    <toggle-switch v-model="isActive"></toggle-switch>
  </header>
  <RouterView />
</template>

<style scoped>
  .floating-header {
    position: absolute;
    right: 1rem;
    top: 1rem;
    z-index: 10000;
  }
</style>
