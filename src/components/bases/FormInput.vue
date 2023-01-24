<script setup>
  import { ref } from "vue";
  import { nanoid } from "nanoid";

  defineProps({
    modelValue: [String, Number],
    placeholder: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    isOnError: {
      type: Boolean,
      required: false,
    },
    errorMessage: {
      type: String,
      required: false,
      default: "",
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
  });

  defineEmits(["update:modelValue"]);

  const id = ref(nanoid());
</script>

<template>
  <div class="form-input" :class="{ error: isOnError }">
    <label class="form-input__label text-primary" :for="id"
      >{{ label }}
      <span v-if="isOnError" class="form-input__error semi-bold">{{
        errorMessage
      }}</span></label
    >
    <input
      class="form-input__input text-primary bold bg-secundary"
      :id="id"
      :type="type || 'text'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<style scoped>
  .form-input {
    display: flex;
    flex-flow: column nowrap;
    gap: 0.4rem;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  .form-input__label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-input__label,
  .form-input__error {
    font-size: 0.9em;
  }

  .form-input__input {
    font-size: 1em;
    border: none;
    outline: var(--bg-quarternary) solid 0.1em;
    border-radius: 0.5rem;
    padding: 0.8em 1em;
    transition: all 100ms ease-in;
    line-height: 1;
  }

  .form-input__input::placeholder {
    font-size: 1em;
    color: var(--w-secundary);
    font-weight: 500;
  }

  .form-input__input:hover,
  .form-input__input:focus {
    outline-color: var(--accent);
  }

  .form-input.error .form-input__input {
    outline-color: var(--accent-error);
    color: var(--accent-error);
  }

  .form-input__error {
    color: var(--accent-error);
  }
</style>
