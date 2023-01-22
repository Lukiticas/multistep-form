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
  });

  defineEmits(["update:modelValue"]);

  const id = ref(nanoid());
</script>

<template>
  <div class="form-input" :class="{ error: isOnError }">
    <label class="form-input__label text-primary" :for="id"
      >{{ label }}
      <span v-if="isOnError" class="form-input__error bold">{{
        errorMessage
      }}</span></label
    >
    <input
      class="form-input__input text-primary bold bg-secundary"
      :id="id"
      :type="$attrs.type || 'text'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<style scoped>
  .form-input {
    display: flex;
    flex-flow: column nowrap;
    gap: 0.3rem;
    margin-bottom: 1rem;
  }

  .form-input__label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-input__input {
    border: none;
    outline: var(--bg-terciary) solid 0.1rem;
    border-radius: 0.5rem;
    padding: 0.9rem 1rem;

    transition: all 100ms ease-in;
  }

  .form-input__input::placeholder {
    color: var(--w-secundary);
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
