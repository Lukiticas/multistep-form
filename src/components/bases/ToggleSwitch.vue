<script setup>
  import { ref } from "vue";
  import { nanoid } from "nanoid";

  defineProps(["modelValue"]);
  defineEmits(["update:modelValue"]);
  const id = ref(nanoid());
</script>

<template>
  <label class="toggle-button" :class="{ active: !modelValue }" :for="id">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', !modelValue)"
      class="toggle-button__checkbox"
      type="checkbox"
      :id="id" />
    <span class="toggle-button__switch"></span>
  </label>
</template>

<style scoped>
  .toggle-button {
    vertical-align: middle;
    user-select: none;
    cursor: pointer;
  }

  .toggle-button__checkbox {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
  }

  .toggle-button:hover .toggle-button__switch {
    scale: 1.1;
  }

  .toggle-button__switch {
    display: inline-block;
    height: 1.5rem;
    border-radius: 1rem;
    width: 3.5rem;
    background: var(--w-primary);
    box-shadow: inset 0 0 1px #000;
    position: relative;
    margin-left: 10px;
    transition: all 0.25s;
  }

  .toggle-button__switch::after,
  .toggle-button__switch::before {
    content: "";
    position: absolute;
    display: block;
    height: 1rem;
    width: 1rem;
    border-radius: 100vw;
    left: 0.4rem;
    top: 0.25rem;
    transform: translateX(0%);
    transition: all 0.25s cubic-bezier(0.5, -0.6, 0.5, 1.6);
  }

  .toggle-button__switch::after {
    background: var(--bg-primary);
    box-shadow: 0 0 1px #666;
  }

  .toggle-button__switch::before {
    background: red;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    opacity: 1;
  }

  .active .toggle-button__switch:after,
  .active .toggle-button__switch::before {
    transform: translateX(180%);
  }
</style>
