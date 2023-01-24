<script setup>
  defineEmits(["reset-form"]);
</script>

<template>
  <section class="thank-you" @click="$emit('reset-form', $event)">
    <img src="@/assets/images/icon-thank-you.svg" alt="" />
    <h1 class="bold text-primary">Thank you!</h1>
    <p class="regular text-secundary">
      Thanks for confirming your subscription! We hope you have fun using our
      platform. If you ever need support, please feel free to email us at
      support@loremgaming.com
    </p>
  </section>
</template>

<style scoped>
  .thank-you {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    max-width: 30rem;
    text-align: center;
    margin: 0 auto;
    font-size: 1rem;
    cursor: pointer;
    transition: scale 100ms ease-in;
  }

  .thank-you img {
    margin-block-end: 1.5em;
    transition: transform 150ms ease;
  }

  .thank-you h1 {
    font-size: 2.5em;
  }

  .thank-you p {
    font-size: 1.1em;
  }

  .thank-you:hover {
    scale: 1.1;
  }

  .thank-you:hover img {
    transform: scale(1.15) rotateX(360deg);
  }

  @media only screen and (max-width: 800px) {
    .thank-you {
      justify-self: center;
      max-height: 30rem;
      margin-inline: 1rem;
      margin-block-start: -4.5rem;
      padding: 1rem;
      border-radius: 0.5rem;
      z-index: 1000;
      background-color: var(--bg-secundary);
    }
  }
</style>
