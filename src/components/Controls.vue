<template>
  <section class="control-container">
    <h5>Selected generation</h5>
    <div class="generation-content">
      <button @click="pageUp">up</button>
      <input type="text" v-model="generation.name">
      <button @click="pageDown">down</button>
    </div>
  </section>
</template>

<script>
import base_url from '../api/config'
export default {
  name: 'Controls',
  props: ['pokemonSelected', '$store.state.listGeneration ', 'generation'],
  data() {
    return {
      generations: [
        {
          id: 1,
          name: 'I GENERATION'
        },
        {
          id: 2,
          name: 'II GENERATION'
        },
        {
          id: 3,
          name: 'III GENERATION'
        },
        {
          id: 4,
          name: 'IV GENERATION'
        },
        {
          id: 5,
          name: 'V GENERATION'
        },
        {
          id: 6,
          name: 'VI GENERATION'
        },
        {
          id: 7,
          name: 'VII GENERATION'
        },
        {
          id: 8,
          name: 'VIII GENERATION'
        }
      ],
      focusGeneration: null,
      count: 1
    }
  },
  created() {
    this.focusGeneration = this.generations[0]
    this.$store.commit('UPDATE_GENERATION', this.focusGeneration)
  },
  methods: {
    pageUp() {
      if (this.focusGeneration.id < 8) {
        ++this.count
        this.focusGeneration = this.generations[this.count]
        this.$store.commit('UPDATE_GENERATION', this.focusGeneration)
        this.$emit('updatePokemonList')
        this.updatePokemonGeneration()
      } else {
        alert('Max generation!')
      }
    },
    pageDown() {
      if (this.focusGeneration.id > 1) {
        --this.count
        this.focusGeneration = this.generations[this.count]
        this.$store.commit('UPDATE_GENERATION', this.focusGeneration)
        this.$emit('updatePokemonList')
        this.updatePokemonGeneration()
      } else {
        alert('Min generation!')
      }
    },
    updatePokemonGeneration() {
      return this.$store.dispatch('getPokemonSelected', `${base_url}/pokemon/${this.$store.state.listGeneration[0].name}`)
    }
  }
}
</script>

<style scoped>
  .control-container {
  }
</style>