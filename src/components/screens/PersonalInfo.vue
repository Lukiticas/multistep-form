<script setup>
  import FormInput from "@/components/FormInput.vue";
  import useVuelidate from "@vuelidate/core";
  import { required, numeric, email, helpers } from "@vuelidate/validators";
  import { computed, inject } from "vue";

  const isRequired = helpers.withMessage("field cannot be empty", required);
  const isEmail = helpers.withMessage("must be a valid email", email);
  const onlyNumbers = helpers.withMessage("must contain only numbers", numeric);
  const isPhoneNumber = helpers.withMessage("must be a valid number", (value) =>
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)
  );

  const emit = defineEmits(["is-valid"]);

  const rules = computed(() => {
    return {
      name: { isRequired },
      email: { isRequired, isEmail },
      phone: {
        isRequired,
        onlyNumbers,
        isPhoneNumber,
      },
    };
  });

  const store = inject("store");

  const v$ = useVuelidate(rules, store.personalInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    v$.value.$validate();
    if (!v$.value.$error) {
      emit("is-valid", true);
    }
  };
</script>

<template>
  <form id="form-main" @submit="handleSubmit">
    <FormInput
      v-model="store.personalInfo.name"
      label="Name"
      placeholder="e.g. Stephen King"
      :error-message="v$.name.$errors[0]?.$message"
      :is-on-error="v$.name.$error">
    </FormInput>
    <FormInput
      v-model="store.personalInfo.email"
      label="Email Address"
      type="email"
      placeholder="e.g. stephenking@lorem.com"
      :error-message="v$.email.$errors[0]?.$message"
      :is-on-error="v$.email.$error"></FormInput>
    <FormInput
      v-model.trim.number="store.personalInfo.phone"
      label="Phone Number"
      type="number"
      placeholder="e.g. +1 234 567 890"
      :error-message="v$.phone.$errors[0]?.$message"
      :is-on-error="v$.phone.$error"></FormInput>
  </form>
</template>

<style scoped></style>
