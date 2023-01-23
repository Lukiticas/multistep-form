import { computed, ref } from "vue";

const useStepper = (stepsItems) => {
  const steps = ref(stepsItems.map((el) => ({ ...el, isValid: false })));

  const currentStep = ref(0);
  const currentStepItem = computed(() => steps.value[currentStep.value]);
  const isFirstStep = currentStep.value === 0;
  const isLastStep = currentStep.value === steps.value.length - 1;

  const handleGoBack = () => {
    currentStep.value = currentStep.value - 1;
  };

  const evaluateNext = () => {
    if (!currentStepItem.value.isValid) return;
    currentStep.value = currentStep.value + 1;
  };

  const setCurrentStep = (step) => {
    currentStep.value = step;
  };
  const handleIsValid = (e) => {
    currentStepItem.value.isValid = e;
    if (isLastStep) return;
    evaluateNext();
  };

  return {
    currentStepItem,
    setCurrentStep,
    currentStep,
    evaluateNext,
    handleIsValid,
    handleGoBack,
    isFirstStep,
    isLastStep,
    steps,
  };
};

export default useStepper;
