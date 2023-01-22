<script setup>
  import SectionHeading from "@/components/SectionHeading.vue";
  import BaseButton from "@/components/BaseButton.vue";
  import PersonalInfo from "@/components/screens/PersonalInfo.vue";
</script>

<template>
  <main class="center-on-screen">
    <section class="app-main bg-secundary">
      <div></div>
      <div>
        <SectionHeading
          title="Personal Info"
          description="Please provide your name, email adress, and phone number"></SectionHeading>
        <PersonalInfo></PersonalInfo>
        <footer class="bottom-navegation">
          <BaseButton
            form="form-main"
            title="Go Back"
            style-type="previous"></BaseButton>
          <BaseButton
            form="form-main"
            type="submit"
            title="Next Step"
            style-type="next">
          </BaseButton>
        </footer>
      </div>
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
    padding: 2rem;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.04) 0 3px 5px;
  }
</style>
