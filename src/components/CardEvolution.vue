<template>
  <section class="container">
    <p>Evolutions:</p>
    <div class="content" v-for="(pokemon, index) in listPokemonsEvolution" :key="index">
      <img :src="pokemon.sprites.other['official-artwork'].front_default" :alt="pokemon.name" width="40%">
      <p>{{ pokemon.name }}</p>
    </div> 
  </section>
</template>

<script>
import base_url from '../api/config'
export default {
  name: 'CardEvolution',
  props: ['pokemonSpecies'],
  data() {
    return {
      listName: [],
      listPokemonsEvolution: []
    }
  },
  mounted() {
    this.updateEvolution(this.pokemonSpecies.evolution_chain.url)
  },
  methods: {
    async updateEvolution(info) {
      let url = info
      await fetch(url)
              .then(res => res.json())
              .then(res => {
                let priEvol = res.chain.evolves_to[0].species.name
                this.listName.push(priEvol)
                if (res.chain.evolves_to[0].evolves_to[0]) {
                let secEvol = res.chain.evolves_to[0].evolves_to[0].species.name
                  this.listName.push(secEvol)
                }
              })
              .then(() => {
                this.listName.forEach(item => {
                  let url = `${base_url}/pokemon/${item}`
                  fetch(url)
                    .then(res => res.json())
                    .then(res => {
                      this.listPokemonsEvolution.push(res)
                    })

                })
              })
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
    background: #fff;
    border: 2px solid #000;
  }
  .container>p {
    text-align: center;
    text-transform: uppercase;
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>