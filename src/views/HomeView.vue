<script setup>
  import SectionHeading from "@/components/SectionHeading.vue";
  import BaseButton from "@/components/BaseButton.vue";
  import PersonalInfo from "@/components/screens/PersonalInfo.vue";
  import SectionStepper from "@/components/SectionStepper.vue";
  import SelectPlan from "@/components/screens/SelectPlan.vue";
  import AddOns from "@/components/screens/AddOns.vue";
  import { plans, addons } from "@/utils/data";
  import { useCheckoutStore } from "@/stores/checkoutStore";
  import { provide } from "vue";
  import useStepper from "@/directives/useStepper";
  import SummarySection from "@/components/screens/SummarySection.vue";

  const store = useCheckoutStore();
  const {
    currentStepItem,
    isLastStep,
    handleGoBack,
    isFirstStep,
    handleIsValid,
    currentStep,
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
</script>

<template>
  <main class="center-on-screen">
    <section class="app-main bg-secundary">
      <SectionStepper
        :steps="steps"
        :current-index="currentStep"></SectionStepper>
      <section class="main-content">
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
          <SummarySection v-else-if="currentStep === 3"></SummarySection>
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
            type="submit"
            style-type="next"
            :title="isLastStep ? 'Confirm' : 'Next Step'">
          </BaseButton>
        </footer>
      </section>
    </section>
  </main>
</template>

<style>
  .bottom-navegation {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .center-on-screen {
    display: grid;
    place-items: center;

    width: 100vw;
    min-height: 100vh;
  }

  .app-main {
    padding: 1rem;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.04) 0 3px 5px;
    display: grid;
    grid-template-columns: auto 1fr;
  }

  .main-content {
    margin-inline: 6rem;
    padding-block: 1rem;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-flow: column;
  }

  @media only screen and (max-width: 800px) {
    .app-main {
      background-color: var(--bg-primary);
      width: 100vw;
      min-height: 100vh;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      padding: 0;
    }

    .center-on-screen {
      min-height: 0;
    }

    .content {
      background-color: var(--bg-secundary);
      margin-inline: 1.2rem;
      margin-block-start: -3.5rem;
      padding: 1.5rem 1.3rem;
      border-radius: 1rem;
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
