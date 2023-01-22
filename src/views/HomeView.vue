<script setup>
  import SectionHeading from "@/components/SectionHeading.vue";
  import BaseButton from "@/components/BaseButton.vue";
  import PersonalInfo from "@/components/screens/PersonalInfo.vue";
  import SectionStepper from "@/components/SectionStepper.vue";
  import SelectPlan from "@/components/screens/SelectPlan.vue";
  import { computed, reactive, ref } from "vue";
  import AddOns from "@/components/screens/AddOns.vue";

  const plans = [
    {
      title: "Arcade",
      icon: "icon-arcade.svg",
      pricing: {
        monthly: { value: 9, promo: "" },
        yearly: { value: 90, promo: "2 months free" },
      },
    },
    {
      title: "Advanced",
      icon: "icon-advanced.svg",
      pricing: {
        monthly: { value: 12, promo: "" },
        yearly: { value: 120, promo: "2 months free" },
      },
    },
    {
      title: "Pro",
      icon: "icon-pro.svg",
      pricing: {
        monthly: { value: 15, promo: "" },
        yearly: { value: 150, promo: "2 months free" },
      },
    },
  ];

  const addons = [
    {
      title: "Online Service",
      subtitle: "Acess to multiplayer games",
      pricing: {
        monthly: 1,
        yearly: 10,
      },
    },
    {
      title: "Larger Storage",
      subtitle: "Extra 1TB of cloud save",
      pricing: {
        monthly: 2,
        yearly: 20,
      },
    },
    {
      title: "Customizable Profile",
      subtitle: "Custom themes on your profile",
      pricing: {
        monthly: 2,
        yearly: 20,
      },
    },
  ];

  const stepper = reactive({
    steps: [
      {
        title: "your info",
        sectionTitle: "Personal info",
        description:
          "Please provide your name, email address, and phone number",
        isValid: false,
        formName: "form-main",
      },
      {
        title: "Select plan",
        sectionTitle: "Select your plan",
        description: "You have the options of monthly or yearly billing",
        isValid: false,
        formName: "select-plan-form",
      },
      {
        title: "Add-ons",
        sectionTitle: "Pick add-ons",
        description: "Add-ons help enhance your gaming experience.",
        isValid: false,
        formName: "add-ons-form",
      },
    ],

    data: {
      name: "",
      email: "",
      number: "",
    },

    currentStep: 0,
  });

  const retrivesStep = (n) => {
    stepper.currentStep = stepper.currentStep - n;
  };

  const evaluateNext = () => {
    if (
      !stepper.steps[stepper.currentStep] &&
      !stepper.steps[stepper.currentStep].isValid
    )
      return;
    stepper.currentStep = stepper.currentStep + 1;
    console.log(stepper.data);
  };

  const handleIsValid = (e) => {
    stepper.steps[stepper.currentStep].isValid = !!e;
    if (stepper.currentStep === stepper.steps.length - 1) return;
    evaluateNext();
  };

  const isYearlyOrMonthly = ref(true);

  const period = computed(() =>
    isYearlyOrMonthly.value ? ["monthly", "mo"] : ["yearly", "yr"]
  );
</script>

<template>
  <main class="center-on-screen">
    <section class="app-main bg-secundary">
      <SectionStepper
        :steps="stepper.steps"
        :current-index="stepper.currentStep"></SectionStepper>
      <section class="main-content">
        <div class="content">
          <SectionHeading
            :title="stepper.steps[stepper.currentStep].sectionTitle"
            :description="
              stepper.steps[stepper.currentStep].description
            "></SectionHeading>

          <PersonalInfo
            v-if="stepper.currentStep === 0"
            :data="stepper.data"
            @update-data="(e) => (stepper.data = e)"
            @is-valid="handleIsValid"></PersonalInfo>
          <SelectPlan
            v-else-if="stepper.currentStep === 1"
            v-model:select-billing="isYearlyOrMonthly"
            @is-valid="handleIsValid"
            :period="period"
            :plans="plans"></SelectPlan>
          <AddOns
            v-else-if="stepper.currentStep === 2"
            :add-ons="addons"
            :period="period"></AddOns>
        </div>
        <footer class="bottom-navegation bg-secundary">
          <BaseButton
            :show="stepper.currentStep === 0"
            form="form-main"
            title="Go Back"
            type="text"
            @click="retrivesStep(1)"
            style-type="previous"></BaseButton>
          <BaseButton
            :form="stepper.steps[stepper.currentStep].formName"
            type="submit"
            style-type="next"
            :title="
              stepper.currentStep === stepper.steps.length - 1
                ? 'Confirm'
                : 'Next Step'
            ">
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

    .content {
      background-color: var(--bg-secundary);
      margin-inline: 1.2rem;
      margin-block-start: -3.5rem;
      padding: 1.3rem 1.8rem;
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
