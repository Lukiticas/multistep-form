<template>
  <section class="stepper">
    <picture class="background">
      <!--suppress HtmlUnknownTarget -->
      <source
        srcset="@/assets/images/bg-sidebar-mobile.svg"
        media="(max-width: 800px)" />
      <img src="@/assets/images/bg-sidebar-desktop.svg" alt="" />
    </picture>
    <div class="stepper-details">
      <StepperStep
        v-for="(step, idx) in steps"
        :key="step.title"
        :title="step.title"
        :order="idx + 1"
        :active="idx === currentIndex"></StepperStep>
    </div>
  </section>
</template>

<script setup>
  import StepperStep from "@/components/StepperStep.vue";
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

<style scoped>
  .stepper {
    width: 17.12rem;
    height: 35.5rem;
    position: relative;
    z-index: 10;
  }

  .background {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    border-radius: 1rem;
  }

  .background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
  }

  .stepper-details {
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

    .background {
      border-radius: 0;
    }

    .stepper-details {
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
