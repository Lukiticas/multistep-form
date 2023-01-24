<script setup>
  import SectionHeading from "@/components/layout/SectionHeading.vue";
  import SectionStepper from "@/components/screens/SectionStepper.vue";
  import PersonalInfoSection from "@/components/screens/PersonalInfoSection.vue";
  import SelectPlanSection from "@/components/screens/SelectPlanSection.vue";
  import AddOnsSection from "@/components/screens/addOnsSection.vue";
  import SummarySection from "@/components/screens/SummarySection.vue";
  import BottomNavegation from "@/components/layout/BottomNavegation.vue";
  import ThankYou from "@/components/screens/ThankYou.vue";

  import { useCheckoutStore } from "@/stores/checkoutStore";
  import useStepper from "@/directives/useStepper";
  import { plans, addons } from "@/utils/data";
  import { provide, ref } from "vue";

  const store = useCheckoutStore();
  provide("store", store);
  provide("addons", addons);
  provide("plans", plans);

  const isFormSubmitted = ref(false);

  const stepper = useStepper([
    {
      title: "your info",
      sectionTitle: "Personal info",
      description: "Please provide your name, email address, and phone number",
      component: PersonalInfoSection,
      formName: "form-main",
    },
    {
      title: "Select plan",
      sectionTitle: "Select your plan",
      description: "You have the options of monthly or yearly billing",
      component: SelectPlanSection,
      formName: "select-plan-form",
    },
    {
      title: "Add-ons",
      sectionTitle: "Pick add-ons",
      description: "Add-ons help enhance your gaming experience.",
      component: AddOnsSection,
      formName: "add-ons-form",
    },
    {
      title: "Summary",
      sectionTitle: "Finishing up",
      description: "Double check everything looks OK before confirming",
      component: SummarySection,
      formName: "summary-form",
    },
  ]);

  const checkFormConfirmation = () => {
    if (!stepper.isLastStep.value) return;
    isFormSubmitted.value = true;
    console.table({
      name: store.personalInfo.name,
      email: store.personalInfo.email,
      cellphone: store.personalInfo.phone,
      products: store.planSelected[0].title,
      addons: store.addOnsSelected?.map((el) => el.title),
      period: store.period,
    });
  };

  const reset = () => {
    isFormSubmitted.value = false;
    stepper.currentStep.value = 0;
    store.reset();
  };

  const handleGoBackToPlanSection = () => {
    const index = stepper.getStepIndex("title", "Select plan");
    if (index < 0) return;
    stepper.currentStep.value = index;
  };
</script>

<template>
  <main class="center-on-screen">
    <div class="bg-primary app-main">
      <SectionStepper
        :steps="stepper.steps.value"
        :current-index="stepper.currentStep.value"></SectionStepper>
      <section v-if="!isFormSubmitted" class="main-content">
        <div class="content">
          <SectionHeading
            :title="stepper.currentStepItem.value.sectionTitle"
            :description="
              stepper.currentStepItem.value.description
            "></SectionHeading>

          <component
            :is="stepper.currentComponent.value"
            @is-valid="stepper.handleIsValid"
            @go-back-to-plan="handleGoBackToPlanSection"></component>
        </div>
        <BottomNavegation
          :show="stepper.isFirstStep.value"
          title-left="Go Back"
          :title-right="stepper.isLastStep.value ? 'Confirm' : 'Next Step'"
          :form="stepper.currentStepItem.value.formName"
          :color-decider="stepper.isLastStep.value"
          @handleLeftClicked="stepper.handleGoBack"
          @handle-right-clicked="checkFormConfirmation"></BottomNavegation>
      </section>
      <ThankYou v-else @reset-form="reset"></ThankYou>
    </div>
  </main>
</template>

<style>
  .app-main {
    width: 100%;
    max-width: 60rem;
    padding: 1rem;
    border-radius: 2rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    display: grid;
    grid-template-columns: auto 1fr;
    background-color: var(--bg-secundary) !important;
  }

  .center-on-screen {
    display: grid;
    place-items: center;
    width: 100vw;
    min-height: 100vh;
  }

  .main-content {
    margin-inline: 6rem;
    padding-block: 1.5rem;
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

    .content {
      background-color: var(--bg-secundary);
      margin-inline: 1rem;
      margin-block-start: -4.5rem;
      padding: 1.5rem;
      border-radius: 0.5rem;
      z-index: 1000;
      box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    }

    .main-content {
      margin: 0;
      padding: 0;
      background-color: var(--bg-primary);
    }
  }
</style>
