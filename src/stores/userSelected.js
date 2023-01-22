import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserSelected = defineStore("counter", () => {
  const name = ref("");
  const changeName = (newName) => {
    name.value = newName;
  };

  return { name, changeName };
});
