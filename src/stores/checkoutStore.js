import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useCheckoutStore = defineStore("ckeckout", () => {
  const personalInfo = ref({
    name: "",
    email: "",
    phone: "",
  });

  const planSelected = ref();
  const addOnsSelected = ref([]);

  const isYearlyOrMonthly = ref(true);

  const period = computed(() =>
    isYearlyOrMonthly.value ? ["monthly", "mo"] : ["yearly", "yr"]
  );

  const getPlanPrice = computed(() => ({
    name: planSelected.value[0].title,
    price: planSelected.value[0].pricing,
  }));
  const getAddons = computed(() => {
    return addOnsSelected.value.length
      ? addOnsSelected.value.map((el) => ({
          name: el.title,
          price: el.pricing,
        }))
      : [];
  });

  const getTotal = computed(() => ({
    name: "total",
    price: [...getAddons.value, ...getPlanPrice.value],
  }));

  return {
    getTotal,
    getAddons,
    getPlanPrice,
    isYearlyOrMonthly,
    addOnsSelected,
    personalInfo,
    planSelected,
    period,
  };
});
