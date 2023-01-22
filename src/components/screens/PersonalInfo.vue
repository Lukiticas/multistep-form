<template>
  <form id="form-main" @submit.prevent="handleSubmit">
    <FormInput
      v-model="userData.name"
      label="Name"
      placeholder="e.g. Stephen King"
      :error-message="v$.name.$errors[0]?.$message"
      :is-on-error="v$.name.$error">
    </FormInput>
    <FormInput
      v-model.trim="userData.email"
      type="email"
      label="Email Address"
      placeholder="e.g. stephenking@lorem.com"
      :error-message="v$.email.$errors[0]?.$message"
      :is-on-error="v$.email.$error"></FormInput>
    <FormInput
      v-model.number="userData.number"
      label="Phone Number"
      type="number"
      inputmode="numeric"
      placeholder="e.g. +1 234 567 890"
      :error-message="v$.number.$errors[0]?.$message"
      :is-on-error="v$.number.$error"></FormInput>
  </form>
</template>

<script setup>
  import FormInput from "@/components/FormInput.vue";
  import useVuelidate from "@vuelidate/core";
  import { required, numeric, email, helpers } from "@vuelidate/validators";
  import { computed, reactive } from "vue";

  const isEmail = helpers.withMessage("must be a valid phone number", (value) =>
    /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{5}$/.test(
      value
    )
  );

  const userData = reactive({
    name: "",
    email: "",
    number: "",
  });

  const rules = computed(() => {
    return {
      name: { required },
      email: { required, email },
      number: {
        required,
        numeric,
        isEmail,
      },
    };
  });

  const v$ = useVuelidate(rules, userData);
  const handleSubmit = () => {
    v$.value.$validate();
    console.log(v$.value.$error ? "invalid" : "valid");
    console.log(userData);
  };
</script>

<style scoped></style>
