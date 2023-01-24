import { computed, ref, shallowRef } from "vue";

const useStepper = (stepsItems) => {
  const steps = shallowRef(stepsItems.map((el) => ({ ...el, isValid: false })));

  const currentStep = ref(0);
  const currentStepItem = computed(() => steps.value[currentStep.value]);
  const currentComponent = computed(
    () => steps.value[currentStep.value].component
  );
  const isFirstStep = computed(() => currentStep.value === 0);
  const isLastStep = computed(
    () => currentStep.value === steps.value.length - 1
  );

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
    if (isLastStep.value) return;
    evaluateNext();
  };

  const getStepIndex = (identifier, value) => {
    return steps.value.findIndex((el) => el[identifier] === value);
  };

  return {
    currentStepItem,
    setCurrentStep,
    currentComponent,
    getStepIndex,
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
