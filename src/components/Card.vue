<template>
  <section class="container" :style='backgroundCard'>
    <div class="content">
      <p>{{ generation.name }}</p>
      <hr>
      <div class="img-initial">
        <img v-if="viewInitial" src="../assets/chuvisco.webp" width="98%" height="270px" alt="chuvisco tv">
        <div v-else class="img-content">
          <img :src="urlUpdate()" :alt="pokemon.name" width="60%">
          <p v-if="!viewInitial">{{ pokemon.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Card',
  props: ['generation'],
  data() {
    return {
      viewInitial: true
    }
  },
  computed: {
    ...mapState({
      pokemon: state => state.pokemonSelected,
      species: state => state.pokemonSpecies
    }),
    backgroundCard() {
      return {"background": this.species ? this.species.color.name : "black"}
    }
  },
  created() {
    setTimeout(() => {
      this.viewInitial = false
    }, 4000)
  },
  methods: {
    urlUpdate() {
      const url = this.pokemon.sprites.other['official-artwork'].front_default
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
  .content {
    padding: 5px 0;
  }
  .content>p {
    padding: 5px 0 0;
    margin: 0;
    font-weight: bold;
    font-size: 1.2rem;
    text-align: center;
    color: #fff;
  }
  .img-initial {
    display: flex;
    justify-content: center;
  }
  .img-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
  }
</style>