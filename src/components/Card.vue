<template>
  <section class="container">
    <div class="content">
      <p>{{ generation.name }}</p>
      <hr>
      <div class="img-content">
        <img v-if="viewInitial" src="../assets/chuvisco.webp" width="98%" height="270px" alt="chuvisco tv">
        <img v-else :src="urlUpdate()" :alt="pokemonSelected.name" width="60%">
      </div>
      <p v-if="!viewInitial">{{ pokemonSelected.name }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Card',
  props: ['generation', 'pokemons', 'pokemonSelected'],
  data() {
    return {
      viewInitial: true
    }
  },
  created() {
    setTimeout(() => {
      this.viewInitial = false
    }, 5000)
    console.log(this.pokemons)
  },
  methods: {
    urlUpdate() {
      const url = this.$store.state.pokemonSelected.sprites.other['official-artwork'].front_default
      return url
    }
  }
}

</script>

<style scoped>
  .container {
    position: absolute;
    top: 150px;
    left: 27px;
    width: 335px;
    height: 340px;
    background: black;
  }
  .content>p {
    padding: 5px 0 0;
    margin: 0;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    color: #fff;
  }
  .img-content{
    display: flex;
    justify-content: center;
  }
</style>