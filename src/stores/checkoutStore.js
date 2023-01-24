import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useCheckoutStore = defineStore("ckeckout", () => {
  const personalInfo = ref({
    name: "",
    email: "",
    phone: "",
  });

  const planSelected = ref([]);
  const addOnsSelected = ref([]);
  const isYearlyOrMonthly = ref(true);

  const period = computed(() =>
    isYearlyOrMonthly.value
      ? ["monthly", "mo", "month"]
      : ["yearly", "yr", "year"]
  );

  const returnFormated = (name, price) => {
    return {
      name: name,
      price: price,
      period: {
        frequency: period.value[0],
        suffix: period.value[1],
        name: period.value[2],
      },
    };
  };

  const getPlanPrice = computed(() =>
    returnFormated(planSelected.value[0].title, planSelected.value[0].pricing)
  );

  const getAddons = computed(() => {
    return addOnsSelected.value.length
      ? addOnsSelected.value.map((el) => returnFormated(el.title, el.pricing))
      : [];
  });

  const getTotal = computed(() => {
    const pricePlan = planSelected.value[0].pricing;
    const addonsTotal = addOnsSelected.value
      .map((el) => el.pricing)
      .reduce((a, b) => a + b);
    const total = pricePlan + addonsTotal;
    return returnFormated("total", total);
  });

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
