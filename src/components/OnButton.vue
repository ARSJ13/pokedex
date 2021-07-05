<template>
  <button class="body-button"
  @click="eButton"
  ></button>
</template>

<script>
export default {
  name: 'OnButton',
  methods: {
    eButton() {
      return this.$emit('evButton', {toggle : true})
    }
  }
}
</script>

<style scoped>
  .body-button {
    position: absolute;
    top: 500px;
    left: 64px;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    background: red;
    cursor: pointer;
  }
</style>