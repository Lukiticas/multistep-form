<script setup>
  import FormInput from "@/components/FormInput.vue";
  import useVuelidate from "@vuelidate/core";
  import { required, numeric, email, helpers } from "@vuelidate/validators";
  import { computed, reactive, watch } from "vue";

  const isRequired = helpers.withMessage("field cannot be empty", required);
  const isEmail = helpers.withMessage("must be a valid email", email);
  const onlyNumbers = helpers.withMessage("must contain only numbers", numeric);
  const isPhoneNumber = helpers.withMessage("must be a valid number", (value) =>
    /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{5}$/.test(value)
  );

  const props = defineProps(["data"]);
  const emit = defineEmits(["is-valid", "update-data"]);

  const userData = reactive({
    name: "",
    email: "",
    number: "",
  });

  const rules = computed(() => {
    return {
      name: { isRequired },
      email: { isRequired, isEmail },
      number: {
        isRequired,
        onlyNumbers,
        isPhoneNumber,
      },
    };
  });

  const v$ = useVuelidate(rules, userData);
  const handleSubmit = (e) => {
    e.preventDefault();
    v$.value.$validate();
    if (!v$.value.$error) {
      emit("is-valid", userData);
    }
  };

  watch(userData, () => {
    emit("update-data", userData);
  });
</script>

<template>
  <form id="form-main" @submit="handleSubmit">
    <FormInput
      v-model="userData.name"
      label="Name"
      placeholder="e.g. Stephen King"
      :error-message="v$.name.$errors[0]?.$message"
      :is-on-error="v$.name.$error">
    </FormInput>
    <FormInput
      v-model="userData.email"
      label="Email Address"
      type="email"
      placeholder="e.g. stephenking@lorem.com"
      :error-message="v$.email.$errors[0]?.$message"
      :is-on-error="v$.email.$error"></FormInput>
    <FormInput
      v-model="userData.number"
      label="Phone Number"
      type="number"
      placeholder="e.g. +1 234 567 890"
      :error-message="v$.number.$errors[0]?.$message"
      :is-on-error="v$.number.$error"></FormInput>
  </form>
</template>

<style scoped></style>
