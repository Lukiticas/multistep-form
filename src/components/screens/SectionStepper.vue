<script setup>
  import StepperStep from "@/components/bases/StepperStep.vue";
  defineProps({
    steps: {
      type: Array,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
  });
</script>

<template>
  <aside class="stepper">
    <picture class="stepper__background">
      <!--suppress HtmlUnknownTarget -->
      <source
        srcset="@/assets/images/bg-sidebar-mobile.svg"
        media="(max-width: 800px)" />
      <img src="@/assets/images/bg-sidebar-desktop.svg" alt="" />
    </picture>
    <div class="stepper__details">
      <StepperStep
        v-for="(step, idx) in steps"
        :key="step.title"
        :title="step.title"
        :order="idx + 1"
        :active="idx === currentIndex"></StepperStep>
    </div>
  </aside>
</template>

<style scoped>
  .stepper {
    width: 17.12rem;
    height: 35.5rem;
    position: relative;
    z-index: 10;
  }

  .stepper__background {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    border-radius: 1rem;
  }

  .stepper__background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
  }

  .stepper__details {
    z-index: 10;
    width: 100%;
    height: 100%;
    padding: 2rem;

    display: flex;
    flex-flow: column nowrap;
    gap: 1.5rem;
  }

  @media only screen and (max-width: 800px) {
    .stepper {
      width: 100%;
      height: 10.8rem;
    }

    .stepper__background {
      border-radius: 0;
    }

    .stepper__details {
      display: flex;
      flex-flow: row nowrap;
      gap: 0.2rem;
      padding: 0;
      justify-content: center;
      align-items: start;
      margin-block-start: 2.5rem;
    }
  }
</style>
