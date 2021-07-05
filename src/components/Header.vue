<template>
  <header>
    <section class="title">
      <img src="../assets/pokemon-name.png" width="100%" alt="title">
    </section>
  </header>
</template>

<script>
export default {
  name: 'Header'

}
</script>

<style scoped>
  .title {
    display: flex;
  }
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(#fff 90%, #9441bd 10%);
    box-shadow: 2px 2px 3px 8px rgba(106, 49, 156, 0.1);
  }
</style>