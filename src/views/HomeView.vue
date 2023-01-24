<script setup>
  import SectionHeading from "@/components/SectionHeading.vue";
  import BaseButton from "@/components/BaseButton.vue";
  import PersonalInfo from "@/components/screens/PersonalInfo.vue";
  import SectionStepper from "@/components/SectionStepper.vue";
  import SelectPlan from "@/components/screens/SelectPlan.vue";
  import AddOns from "@/components/screens/AddOns.vue";
  import { plans, addons } from "@/utils/data";
  import { useCheckoutStore } from "@/stores/checkoutStore";
  import { provide, ref } from "vue";
  import useStepper from "@/directives/useStepper";
  import SummarySection from "@/components/screens/SummarySection.vue";

  const store = useCheckoutStore();

  const {
    currentStepItem,
    handleIsValid,
    handleGoBack,
    currentStep,
    isFirstStep,
    isLastStep,
    steps,
  } = useStepper([
    {
      title: "your info",
      sectionTitle: "Personal info",
      description: "Please provide your name, email address, and phone number",
      formName: "form-main",
    },
    {
      title: "Select plan",
      sectionTitle: "Select your plan",
      description: "You have the options of monthly or yearly billing",
      formName: "select-plan-form",
    },
    {
      title: "Add-ons",
      sectionTitle: "Pick add-ons",
      description: "Add-ons help enhance your gaming experience.",
      formName: "add-ons-form",
    },
    {
      title: "Summary",
      sectionTitle: "Finishing up",
      description: "Double check everything looks OK before confirming",
      formName: "summary-form",
    },
  ]);

  provide("store", store);
  const isFormSubmitted = ref(false);
  const confirmForm = () => {
    console.log("hi");
    isFormSubmitted.value = true;
  };

  const reset = () => {
    isFormSubmitted.value = false;
    currentStep.value = 0;
  };
</script>

<template>
  <main class="center-on-screen">
    <section class="bg-primary app-main">
      <SectionStepper
        :steps="steps"
        :current-index="currentStep"></SectionStepper>
      <section v-if="!isFormSubmitted" class="main-content">
        <div class="content">
          <SectionHeading
            :title="currentStepItem.sectionTitle"
            :description="currentStepItem.description"></SectionHeading>
          <PersonalInfo
            v-if="currentStep === 0"
            @is-valid="handleIsValid"></PersonalInfo>
          <SelectPlan
            v-else-if="currentStep === 1"
            @is-valid="handleIsValid"
            :plans="plans"></SelectPlan>
          <AddOns
            v-else-if="currentStep === 2"
            @is-valid="handleIsValid"
            :add-ons="addons"></AddOns>
          <SummarySection
            v-else-if="currentStep === 3"
            @confirm-form="confirmForm"></SummarySection>
        </div>
        <footer class="bottom-navegation bg-secundary">
          <BaseButton
            :show="isFirstStep"
            title="Go Back"
            type="text"
            @click="handleGoBack"
            style-type="previous"></BaseButton>
          <BaseButton
            :form="currentStepItem.formName"
            :class="{ 'bg-accent-purple': isLastStep }"
            type="submit"
            style-type="next"
            :title="isLastStep ? 'Confirm' : 'Next Step'">
          </BaseButton>
        </footer>
      </section>
      <section v-else class="thank-you" @click="reset">
        <img src="@/assets/images/icon-thank-you.svg" alt="" />
        <h1 class="bold text-primary">Thank you!</h1>
        <p class="regular text-secundary">
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com
        </p>
      </section>
    </section>
  </main>
</template>

<style>
  .thank-you {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    max-width: 30rem;
    text-align: center;
    margin: 0 auto;
    font-size: 1rem;
  }
  .thank-you img {
    margin-block-end: 1.5rem;
  }

  .thank-you h1 {
    font-size: 2.5rem;
  }

  .thank-you p {
    font-size: 1.1rem;
  }

  .bottom-navegation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .center-on-screen {
    display: grid;
    place-items: center;

    width: 100vw;
    min-height: 100vh;
  }

  .app-main {
    padding: 1rem;
    width: 100%;
    max-width: 60rem;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.04) 0 3px 5px;
    display: grid;
    grid-template-columns: auto 1fr;
    background-color: var(--bg-secundary) !important;
  }

  .main-content {
    margin-inline: 6rem;
    padding-block: 1rem;
    max-height: 100%;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-flow: column;
  }

  @media only screen and (max-width: 800px) {
    .app-main {
      width: 100vw;
      min-height: 100vh;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      padding: 0;
      background-color: var(--bg-primary) !important;
    }

    .center-on-screen {
      min-height: 0;
    }

    .thank-you {
      justify-self: center;
      max-height: 30rem;
      margin-inline: 1rem;
      margin-block-start: -4.5rem;
      padding: 1rem;
      border-radius: 0.5rem;
      z-index: 1000;
      background-color: var(--bg-secundary);
    }

    .content {
      background-color: var(--bg-secundary);
      margin-inline: 1rem;
      margin-block-start: -4.5rem;
      padding: 1.5rem;
      border-radius: 0.5rem;
      z-index: 1000;
    }

    .main-content {
      margin: 0;
      padding: 0;
      background-color: var(--bg-primary);
    }

    .bottom-navegation {
      padding: 1rem;
    }
  }
</style>
